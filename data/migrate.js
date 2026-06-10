/**
 * Docker 数据库迁移脚本（纯 JS，无 TS 依赖）
 *
 * 在容器启动时，先于 Next.js 运行：
 *   1. 扫描 data/migrations/ 中的 .sql 文件
 *   2. 对比 _migrations 表，只执行新增的
 *   3. 将 casil.db 保存到磁盘
 *
 * 每次部署时，如果 data/migrations/ 有新文件，这里会自动执行。
 */
const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "db", "casil.db");
const WASM_PATH = path.join(__dirname, "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm");
const MIGRATIONS_DIR = path.join(__dirname, "migrations");

async function main() {
  // 加载 sql.js
  const wasmBinary = fs.readFileSync(WASM_PATH);
  const SQL = await initSqlJs({ wasmBinary });

  // 确保 DB 目录存在
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  // 打开或创建数据库
  let buffer;
  if (fs.existsSync(DB_PATH)) {
    buffer = fs.readFileSync(DB_PATH);
  }
  const database = new SQL.Database(buffer);

  // ── 1. 创建迁移追踪表 ──
  database.run(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── 2. 查询已应用的迁移 ──
  const applied = [];
  const stmt = database.prepare("SELECT name FROM _migrations ORDER BY name");
  while (stmt.step()) {
    applied.push(stmt.getAsObject().name);
  }
  stmt.free();
  const appliedSet = new Set(applied);

  // ── 3. 扫描并应用未执行的迁移 ──
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

  // ── 4. 保存到磁盘 ──
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
