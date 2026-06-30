import { getDb } from "../../data/database";
import crypto from "crypto";

/** 生成隨機會話 token（64 字符十六進制） */
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * 驗證 session 是否有效（token 存在且未過期）
 *
 * 注意：由於 Next.js 生產模式可能啓用多 worker，每個 worker 持有獨立的 sql.js 內存數據庫。
 * 驗證前需要先從磁盤重新加載，確保能讀到其他 worker 剛寫入的 session 數據。
 */
export async function validateSession(token: string): Promise<boolean> {
  const db = await getDb();
  await db.reloadFromDisk();
  const row = db.prepare(
    "SELECT token FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')"
  ).get(token);
  return !!row;
}

/** 創建 session（登錄時調用），默認 24 小時有效 */
export async function createSession(token: string, ttlHours = 24): Promise<void> {
  const db = await getDb();
  db.prepare(
    "INSERT INTO admin_sessions (token, expires_at) VALUES (?, datetime('now', ?))"
  ).run(token, `+${ttlHours} hours`);
  db.saveToDisk();
}

/** 刪除 session（登出時調用） */
export async function deleteSession(token: string): Promise<void> {
  const db = await getDb();
  db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
  db.saveToDisk();
}

/** 清理過期的 sessions */
export async function cleanExpiredSessions(): Promise<void> {
  const db = await getDb();
  db.prepare("DELETE FROM admin_sessions WHERE expires_at <= datetime('now')").run();
  db.saveToDisk();
}
