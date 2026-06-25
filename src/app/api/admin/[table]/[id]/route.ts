import { getDb } from "../../../../../../data/database";
import { TABLE_CONFIG, ALLOWED_TABLES, checkAuth } from "@/lib/admin-config";

/** 解析 id 值：text 表保留原值，integer 表轉為數字 */
function parseId(raw: string, idType: "text" | "integer"): string | number {
  if (idType === "integer") {
    const n = parseInt(raw, 10);
    if (isNaN(n)) throw new Error("無效的 ID");
    return n;
  }
  return raw;
}

// ── GET ─ 查詢單條記錄 ─────────────────────────────────────

export async function GET(
  request: Request,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id: rawId } = await params;

  if (!ALLOWED_TABLES.has(table)) {
    return Response.json({ error: "無效的表名" }, { status: 400 });
  }
  if (!(await checkAuth(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = TABLE_CONFIG[table];
    const id = parseId(rawId, config.idType);
    const db = await getDb();
    const row = db.getById(table, id, config.idColumn);

    if (!row) {
      return Response.json({ error: "記錄不存在" }, { status: 404 });
    }
    return Response.json({ data: row });
  } catch (err) {
    console.error(`[admin:GET:${table}:${rawId}]`, err);
    return Response.json({ error: "查詢失敗" }, { status: 500 });
  }
}

// ── PATCH ─ 更新記錄 ───────────────────────────────────────

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id: rawId } = await params;

  if (!ALLOWED_TABLES.has(table)) {
    return Response.json({ error: "無效的表名" }, { status: 400 });
  }
  if (!(await checkAuth(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = TABLE_CONFIG[table];
    const id = parseId(rawId, config.idType);
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return Response.json({ error: "沒有要更新的數據" }, { status: 400 });
    }

    const db = await getDb();
    const updated = db.update(table, id, body, config.idColumn);

    if (!updated) {
      return Response.json({ error: "記錄不存在" }, { status: 404 });
    }
    return Response.json({ data: updated });
  } catch (err) {
    console.error(`[admin:PATCH:${table}:${rawId}]`, err);
    return Response.json({ error: "更新失敗" }, { status: 500 });
  }
}

// ── DELETE ─ 刪除記錄 ──────────────────────────────────────

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ table: string; id: string }> }
) {
  const { table, id: rawId } = await params;

  if (!ALLOWED_TABLES.has(table)) {
    return Response.json({ error: "無效的表名" }, { status: 400 });
  }
  if (!(await checkAuth(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = TABLE_CONFIG[table];
    const id = parseId(rawId, config.idType);
    const db = await getDb();
    const result = db.delete(table, id, config.idColumn);

    if (!result.deleted) {
      return Response.json({ error: "記錄不存在" }, { status: 404 });
    }
    return Response.json({ success: true });
  } catch (err) {
    console.error(`[admin:DELETE:${table}:${rawId}]`, err);
    return Response.json({ error: "刪除失敗" }, { status: 500 });
  }
}
