/**
 * 将 company_news 表中 ID 1-10 的 cover_image 更新为对应的 /images/X.png
 * 用法: node scripts/update-news-images.mjs
 */

import initSqlJs from "sql.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "data", "db", "casil.db");
const WASM_PATH = path.join(__dirname, "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm");

async function main() {
  const wasmBinary = new Uint8Array(fs.readFileSync(WASM_PATH)).buffer;
  const SQL = await initSqlJs({ wasmBinary });

  if (!fs.existsSync(DB_PATH)) {
    console.error("❌ 数据库文件不存在:", DB_PATH);
    process.exit(1);
  }

  const buffer = new Uint8Array(fs.readFileSync(DB_PATH));
  const db = new SQL.Database(buffer);

  // 开启 WAL 模式
  db.run("PRAGMA journal_mode = WAL");

  // 先查看当前 ID 1-10 的记录
  console.log("=== 当前 company_news 记录 (ID 1-10) ===\n");
  for (let id = 1; id <= 10; id++) {
    const stmt = db.prepare("SELECT id, date, title_zh, cover_image FROM company_news WHERE id = ?");
    stmt.bind([id]);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      console.log(`ID ${row.id}: ${row.title_zh || "(无标题)"} | 封面: ${row.cover_image || "(空)"}`);
    }
    stmt.free();
  }

  console.log("\n=== 开始更新 cover_image ===\n");

  for (let id = 1; id <= 10; id++) {
    const imagePath = `/images/${id}.png`;
    const stmt = db.prepare("UPDATE company_news SET cover_image = ? WHERE id = ?");
    stmt.bind([imagePath, id]);
    stmt.step();
    const changes = db.getRowsModified();
    stmt.free();
    console.log(`ID ${id}: cover_image -> ${imagePath} ${changes > 0 ? "✅" : "⚠️ 未找到记录"}`);
  }

  // 保存到磁盘
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
  console.log("\n✅ 数据库已保存:", DB_PATH);

  // 验证更新结果
  console.log("\n=== 验证更新结果 ===\n");
  for (let id = 1; id <= 10; id++) {
    const stmt = db.prepare("SELECT id, title_zh, cover_image FROM company_news WHERE id = ?");
    stmt.bind([id]);
    if (stmt.step()) {
      const row = stmt.getAsObject();
      console.log(`ID ${row.id}: ${row.title_zh || "(无标题)"} | 封面: ${row.cover_image || "(空)"}`);
    }
    stmt.free();
  }

  db.close();
}

main().catch((err) => {
  console.error("❌ 更新失败:", err);
  process.exit(1);
});
