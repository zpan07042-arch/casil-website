/**
 * 数据库完整性验证脚本
 *
 * 在迁移完成后，验证数据是否完整。
 * 确认 pages 表有数据，防止空数据库启动。
 */
const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "db", "casil.db");
const WASM_PATH = path.join(__dirname, "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm");

async function main() {
  const wasmBinary = fs.readFileSync(WASM_PATH);
  const SQL = await initSqlJs({ wasmBinary });

  if (!fs.existsSync(DB_PATH)) {
    console.error("[verify] ERROR: Database file not found!");
    process.exit(1);
  }

  const buffer = fs.readFileSync(DB_PATH);
  const db = new SQL.Database(buffer);

  const r = db.exec("SELECT COUNT(*) as cnt FROM pages");
  const cnt = r.length > 0 ? r[0].values[0][0] : 0;
  console.log(`[verify] pages table has ${cnt} rows`);

  if (cnt === 0) {
    console.error("[verify] ERROR: pages table is empty!");
    db.close();
    process.exit(1);
  }

  db.close();
  console.log("[verify] Database integrity check passed.");
}

main().catch((err) => {
  console.error("[verify] Fatal error:", err);
  process.exit(1);
});
