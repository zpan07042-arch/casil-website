import initSqlJs, { Database as SqlJsDb, SqlJsStatic, SqlValue } from "sql.js";
import path from "path";
import fs from "fs";

// DB 文件放在 data/db/ 子目录，方便 Docker volume 只挂载这个目录
// 迁移文件放在 data/migrations/，随镜像发布，不会被 volume 覆盖
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
    stmt.free();
    return { changes: 1, lastInsertRowid: 0 };
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

  /** 执行多条 SQL（使用 sql.js 原生 exec，正确处理字符串内的分号） */
  exec(sql: string): this {
    this.db.exec(sql);
    return this;
  }

  prepare(sql: string): CompatStatement {
    return new CompatStatement(this.db, sql);
  }

  /** 将内存中的数据库写入磁盘 */
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

// ── 迁移系统 ────────────────────────────────────────────────────

/**
 * 自动读取 data/migrations/ 下的 .sql 文件，
 * 按文件名排序后，执行尚未应用的迁移。
 */
function runMigrations(database: CompatDatabase): void {
  // 1) 先建 _migrations 追踪表（不依赖其他表）
  database.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // 2) 查询已应用的迁移
  const applied = database
    .prepare("SELECT name FROM _migrations ORDER BY name")
    .all() as { name: string }[];
  const appliedNames = new Set(applied.map((r) => r.name));

  // 3) 扫描迁移文件
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

  // 4) 按序执行未应用的迁移
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
    // 迁移执行后立即持久化到磁盘
    database.saveToDisk();
    console.log(`[migrate] ${appliedCount} migration(s) applied and saved to disk.`);
  } else {
    console.log("[migrate] All migrations up to date.");
  }
}

// ── Singleton ────────────────────────────────────────────────────

export async function getDb(): Promise<CompatDatabase> {
  if (db) return db;
  if (!dbInitPromise) {
    dbInitPromise = (async () => {
      const SQL = await getSqlJs();

      // 确保 DB 目录存在
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

      // 启动时自动运行迁移
      runMigrations(db);

      // 注册进程退出时自动保存
      registerShutdownHandlers(db);

      return db;
    })();
  }
  return dbInitPromise;
}

// ── 优雅退出：保存数据库 ────────────────────────────────────────

let shutdownRegistered = false;

function registerShutdownHandlers(database: CompatDatabase): void {
  if (shutdownRegistered) return;
  shutdownRegistered = true;

  const save = () => {
    try {
      database.saveToDisk();
      console.log("[db] Database saved to disk.");
    } catch (err) {
      console.error("[db] Failed to save database:", err);
    }
  };

  // Next.js 在生产环境收到 SIGTERM / SIGINT 时触发
  process.on("SIGTERM", () => {
    console.log("[db] SIGTERM received, saving...");
    save();
    process.exit(0);
  });

  process.on("SIGINT", () => {
    console.log("[db] SIGINT received, saving...");
    save();
    process.exit(0);
  });

  // 未捕获异常时也尝试保存
  process.on("uncaughtException", (err) => {
    console.error("[db] uncaughtException, saving before exit...", err);
    save();
    process.exit(1);
  });
}
