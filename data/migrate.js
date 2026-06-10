/**
 * Docker 數據庫遷移腳本（純 JS，無 TS 依賴）
 *
 * 在容器啓動時，先於 Next.js 運行：
 *   1. 掃描 data/migrations/ 中的 .sql 文件
 *   2. 對比 _migrations 表，只執行新增的
 *   3. 將 casil.db 保存到磁盤
 *
 * 每次部署時，如果 data/migrations/ 有新文件，這裏會自動執行。
 */
const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "db", "casil.db");
const WASM_PATH = path.join(__dirname, "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm");
const MIGRATIONS_DIR = path.join(__dirname, "migrations");

async function main() {
  // 加載 sql.js
  const wasmBinary = fs.readFileSync(WASM_PATH);
  const SQL = await initSqlJs({ wasmBinary });

  // 確保 DB 目錄存在
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // 打開或創建數據庫
  let buffer;
  if (fs.existsSync(DB_PATH)) {
    buffer = fs.readFileSync(DB_PATH);
  }
  const database = new SQL.Database(buffer);

  // ── 1. 創建遷移追蹤表 ──
  database.run(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── 2. 查詢已應用的遷移 ──
  const applied = [];
  const stmt = database.prepare("SELECT name FROM _migrations ORDER BY name");
  while (stmt.step()) {
    applied.push(stmt.getAsObject().name);
  }
  stmt.free();
  const appliedSet = new Set(applied);

  // ── 3. 掃描並應用未執行的遷移 ──
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.error(`[migrate] Migrations directory not found: ${MIGRATIONS_DIR}`);
    database.close();
    process.exit(1);
  }

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("[migrate] No migration files found.");
    database.close();
    return;
  }

  let appliedCount = 0;
  for (const file of files) {
    if (appliedSet.has(file)) {
      console.log(`[migrate] ⏭  Skip: ${file}`);
      continue;
    }

    console.log(`[migrate] ▶  Apply: ${file}`);
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf-8");

    try {
      database.exec(sql);
      database.run("INSERT INTO _migrations (name) VALUES (?)", [file]);
      console.log(`[migrate] ✓  Done: ${file}`);
      appliedCount++;
    } catch (err) {
      console.error(`[migrate] ✗  Failed: ${file}`, err);
      database.close();
      process.exit(1);
    }
  }

  // ── 4. 保存到磁盤 ──
  if (appliedCount > 0) {
    const data = database.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
    console.log(`[migrate] ${appliedCount} migration(s) applied and saved.`);
  } else {
    console.log("[migrate] All migrations up to date, nothing to run.");
  }

  database.close();
}

main().catch((err) => {
  console.error("[migrate] Fatal error:", err);
  process.exit(1);
});
