import initSqlJs, { Database as SqlJsDb, SqlJsStatic, SqlValue } from "sql.js";
import path from "path";
import fs from "fs";

// DB 文件放在 data/db/ 子目錄，方便 Docker volume 只掛載這個目錄
// 遷移文件放在 data/migrations/，隨鏡像發佈，不會被 volume 覆蓋
const DB_PATH = path.join(process.cwd(), "data", "db", "casil.db");
const MIGRATIONS_DIR = path.join(process.cwd(), "data", "migrations");
const WASM_PATH = path.join(process.cwd(), "node_modules", "sql.js", "dist", "sql-wasm.wasm");

let SQL: SqlJsStatic | null = null;
let db: CompatDatabase | null = null;
let dbInitPromise: Promise<CompatDatabase> | null = null;

async function getSqlJs(): Promise<SqlJsStatic> {
  if (!SQL) {
    const wasmBinary = new Uint8Array(fs.readFileSync(WASM_PATH)).buffer;
    SQL = await initSqlJs({ wasmBinary });
  }
  return SQL;
}

// ── CompatStatement ──────────────────────────────────────────────

class CompatStatement {
  private db: SqlJsDb;
  private sql: string;

  constructor(db: SqlJsDb, sql: string) {
    this.db = db;
    this.sql = sql;
  }

  get(...params: SqlValue[]): unknown {
    const stmt = this.db.prepare(this.sql);
    stmt.bind(params);
    let row: unknown = undefined;
    if (stmt.step()) {
      row = stmt.getAsObject();
    }
    stmt.free();
    return row;
  }

  all(...params: SqlValue[]): unknown[] {
    const stmt = this.db.prepare(this.sql);
    stmt.bind(params);
    const rows: unknown[] = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  }

  run(...params: SqlValue[]): { changes: number; lastInsertRowid: number } {
    const stmt = this.db.prepare(this.sql);
    stmt.bind(params);
    stmt.step();
    const changes = this.db.getRowsModified();
    // sql.js 中 lastInsertRowid 需要通過額外查詢獲取
    let lastInsertRowid = 0;
    try {
      const result = this.db.exec("SELECT last_insert_rowid()");
      if (result.length > 0 && result[0].values.length > 0) {
        lastInsertRowid = result[0].values[0][0] as number;
      }
    } catch {
      // 非 INSERT 語句可能報錯，忽略
    }
    stmt.free();
    return { changes, lastInsertRowid };
  }
}

// ── CompatDatabase ────────────────────────────────────────────────

export class CompatDatabase {
  public db: SqlJsDb;
  private dbPath: string;

  constructor(db: SqlJsDb, dbPath: string) {
    this.db = db;
    this.dbPath = dbPath;
  }

  pragma(sql: string): this {
    this.db.run(`PRAGMA ${sql}`);
    return this;
  }

  /** 執行多條 SQL（使用 sql.js 原生 exec，正確處理字符串內的分號） */
  exec(sql: string): this {
    this.db.exec(sql);
    return this;
  }

  prepare(sql: string): CompatStatement {
    return new CompatStatement(this.db, sql);
  }

  // ── CRUD 便捷方法 ──────────────────────────────────────────

  /** 查詢所有行 */
  listAll(table: string, orderBy?: string): unknown[] {
    const sql = orderBy
      ? `SELECT * FROM ${table} ORDER BY ${orderBy}`
      : `SELECT * FROM ${table}`;
    return this.prepare(sql).all();
  }

  /** 按 ID 查詢單行 */
  getById(table: string, id: unknown, idColumn = "id"): unknown {
    return this.prepare(`SELECT * FROM ${table} WHERE ${idColumn} = ? LIMIT 1`).get(id as SqlValue);
  }

  /** 插入一行，返回完整行數據 */
  insert(table: string, data: Record<string, unknown>): unknown {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => data[k]);
    const sql = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`;
    const result = this.prepare(sql).run(...(values as SqlValue[]));
    this.saveToDisk();

    // 對於 INTEGER AUTOINCREMENT 主鍵，獲取插入的 id
    const idColumn = "id";
    if (result.lastInsertRowid > 0) {
      return this.prepare(`SELECT * FROM ${table} WHERE rowid = ?`).get(result.lastInsertRowid);
    }
    // 對於 TEXT 主鍵（如 pages），用提供的 id 查詢
    if (data[idColumn] !== undefined) {
      return this.prepare(`SELECT * FROM ${table} WHERE ${idColumn} = ?`).get(data[idColumn] as SqlValue);
    }
    return data;
  }

  /** 更新一行，返回更新後的行數據 */
  update(table: string, id: unknown, data: Record<string, unknown>, idColumn = "id"): unknown | undefined {
    const keys = Object.keys(data);
    if (keys.length === 0) return this.getById(table, id, idColumn);
    const setClauses = keys.map((k) => `${k} = ?`).join(", ");
    const values: SqlValue[] = keys.map((k) => data[k] as SqlValue);
    const sql = `UPDATE ${table} SET ${setClauses} WHERE ${idColumn} = ?`;
    values.push(id as SqlValue);
    this.prepare(sql).run(...values);
    this.saveToDisk();
    return this.prepare(`SELECT * FROM ${table} WHERE ${idColumn} = ?`).get(id as SqlValue);
  }

  /** 刪除一行 */
  delete(table: string, id: unknown, idColumn = "id"): { deleted: boolean } {
    const sql = `DELETE FROM ${table} WHERE ${idColumn} = ?`;
    const result = this.prepare(sql).run(id as SqlValue);
    this.saveToDisk();
    return { deleted: result.changes > 0 };
  }

  /** 將內存中的數據庫寫入磁盤 */
  saveToDisk(): void {
    const dir = path.dirname(this.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const data = this.db.export();
    fs.writeFileSync(this.dbPath, Buffer.from(data));
  }

  close(): void {
    this.saveToDisk();
    this.db.close();
  }
}

// ── 遷移系統 ────────────────────────────────────────────────────

/**
 * 自動讀取 data/migrations/ 下的 .sql 文件，
 * 按文件名排序後，執行尚未應用的遷移。
 */
function runMigrations(database: CompatDatabase): void {
  // 1) 先建 _migrations 追蹤表（不依賴其他表）
  database.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // 2) 查詢已應用的遷移
  const applied = database
    .prepare("SELECT name FROM _migrations ORDER BY name")
    .all() as { name: string }[];
  const appliedNames = new Set(applied.map((r) => r.name));

  // 3) 掃描遷移文件
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    throw new Error(
      `[migrate] Migrations directory not found: ${MIGRATIONS_DIR}. Cannot initialize database.`
    );
  }

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("[migrate] No migration files found.");
    return;
  }

  // 4) 按序執行未應用的遷移
  let appliedCount = 0;
  for (const file of files) {
    if (appliedNames.has(file)) {
      continue;
    }

    console.log(`[migrate] Applying: ${file}`);
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf-8");

    try {
      database.exec(sql);
      database
        .prepare("INSERT INTO _migrations (name) VALUES (?)")
        .run(file);
      console.log(`[migrate] ✓ Applied: ${file}`);
      appliedCount++;
    } catch (err) {
      console.error(`[migrate] ✗ Failed: ${file}`, err);
      throw err;
    }
  }

  if (appliedCount > 0) {
    // 遷移執行後立即持久化到磁盤
    database.saveToDisk();
    console.log(`[migrate] ${appliedCount} migration(s) applied and saved to disk.`);
  } else {
    console.log("[migrate] All migrations up to date.");
  }
}

// ── Types ───────────────────────────────────────────────────────

export interface AdminSession {
  token: string;
  created_at: string;
  expires_at: string;
}

// ── Singleton ────────────────────────────────────────────────────

export async function getDb(): Promise<CompatDatabase> {
  if (db) return db;
  if (!dbInitPromise) {
    dbInitPromise = (async () => {
      const SQL = await getSqlJs();

      // 確保 DB 目錄存在
      const dbDir = path.dirname(DB_PATH);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      let buffer: Uint8Array | undefined;
      if (fs.existsSync(DB_PATH)) {
        buffer = new Uint8Array(fs.readFileSync(DB_PATH));
      }

      const sqlJsDb = new SQL.Database(buffer);
      db = new CompatDatabase(sqlJsDb, DB_PATH);
      db.pragma("journal_mode = WAL");

      // 啓動時自動運行遷移
      runMigrations(db);

      // 註冊進程退出時自動保存
      registerShutdownHandlers(db);

      return db;
    })();
  }
  return dbInitPromise;
}

// ── 優雅退出：保存數據庫 ────────────────────────────────────────

// 使用 Symbol.for 在 process 上持久化 handler 引用，避免 Next.js 熱重載導致監聽器累積
const DB_HANDLERS = Symbol.for("__db_shutdown_handlers__");

interface ShutdownHandlers {
  sigterm: () => void;
  sigint: () => void;
  uncaughtException: (err: Error) => void;
}

function registerShutdownHandlers(database: CompatDatabase): void {
  // 先移除上一次註冊的監聽器（熱重載場景）
  const prev = (process as unknown as Record<symbol, ShutdownHandlers | undefined>)[DB_HANDLERS];
  if (prev) {
    process.off("SIGTERM", prev.sigterm);
    process.off("SIGINT", prev.sigint);
    process.off("uncaughtException", prev.uncaughtException);
  }

  const save = () => {
    try {
      database.saveToDisk();
      console.log("[db] Database saved to disk.");
    } catch (err) {
      console.error("[db] Failed to save database:", err);
    }
  };

  const onSigterm = () => {
    console.log("[db] SIGTERM received, saving...");
    save();
    process.exit(0);
  };

  const onSigint = () => {
    console.log("[db] SIGINT received, saving...");
    save();
    process.exit(0);
  };

  const onUncaughtException = (err: Error) => {
    console.error("[db] uncaughtException, saving before exit...", err);
    save();
    process.exit(1);
  };

  // 持久化 handler 引用，供下次熱重載時清理
  (process as unknown as Record<symbol, ShutdownHandlers>)[DB_HANDLERS] = {
    sigterm: onSigterm,
    sigint: onSigint,
    uncaughtException: onUncaughtException,
  };

  process.on("SIGTERM", onSigterm);
  process.on("SIGINT", onSigint);
  process.on("uncaughtException", onUncaughtException);
}
