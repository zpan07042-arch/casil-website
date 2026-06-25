-- ============================================================
-- Migration 004: admin_sessions 表
-- 存儲後台管理登錄會話 token，帶過期時間
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);
