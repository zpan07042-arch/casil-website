import initSqlJs, { Database as SqlJsDb, SqlJsStatic, SqlValue } from "sql.js";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "casil.db");

const WASM_PATH = path.join(process.cwd(), "node_modules", "sql.js", "dist", "sql-wasm.wasm");

let SQL: SqlJsStatic | null = null;
let db: CompatDatabase | null = null;

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

  exec(sql: string): this {
    this.db.run(sql);
    return this;
  }

  prepare(sql: string): CompatStatement {
    return new CompatStatement(this.db, sql);
  }

  close(): void {
    const data = this.db.export();
    fs.writeFileSync(this.dbPath, Buffer.from(data));
    this.db.close();
  }
}

// ── Singleton ────────────────────────────────────────────────────

export async function getDb(): Promise<CompatDatabase> {
  if (!db) {
    const SQL = await getSqlJs();
    let buffer: Uint8Array | undefined;
    if (fs.existsSync(DB_PATH)) {
      buffer = new Uint8Array(fs.readFileSync(DB_PATH));
    }
    const sqlJsDb = new SQL.Database(buffer);
    db = new CompatDatabase(sqlJsDb, DB_PATH);
    db.pragma("journal_mode = WAL");
    initTables(db);
  }
  return db;
}

// ── Schema ───────────────────────────────────────────────────────

function initTables(database: CompatDatabase) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS pages (
      id TEXT PRIMARY KEY,
      section TEXT NOT NULL,
      title_zh TEXT NOT NULL,
      title_en TEXT NOT NULL,
      content_zh TEXT,
      content_en TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER NOT NULL,
      date TEXT,
      title_zh TEXT NOT NULL,
      title_en TEXT,
      category TEXT,
      pdf_url TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS board_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_zh TEXT NOT NULL,
      name_en TEXT,
      title_zh TEXT NOT NULL,
      title_en TEXT,
      bio_zh TEXT,
      bio_en TEXT,
      member_type TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS governance_docs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_zh TEXT NOT NULL,
      title_en TEXT,
      pdf_url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS company_news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      title_zh TEXT NOT NULL,
      title_en TEXT,
      pdf_url TEXT
    );

    CREATE TABLE IF NOT EXISTS subsidiaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_zh TEXT NOT NULL,
      name_en TEXT,
      description_zh TEXT,
      description_en TEXT,
      sub_type TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_zh TEXT NOT NULL,
      name_en TEXT,
      url TEXT,
      sort_order INTEGER DEFAULT 0
    );
  `);
}
