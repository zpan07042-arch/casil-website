import Database from "better-sqlite3";
import path from "path";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(path.join(process.cwd(), "data", "casil.db"));
    db.pragma("journal_mode = WAL");
    initTables(db);
  }
  return db;
}

function initTables(db: Database.Database) {
  db.exec(`
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
      sub_type TEXT
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
