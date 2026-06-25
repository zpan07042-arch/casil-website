import { getDb } from "../../../../../data/database";
import { TABLE_CONFIG, ALLOWED_TABLES, checkAuth } from "@/lib/admin-config";

// ── GET ─ 列表查詢 ─────────────────────────────────────────

export async function GET(
  request: Request,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!ALLOWED_TABLES.has(table)) {
    return Response.json({ error: "無效的表名" }, { status: 400 });
  }

  if (!(await checkAuth(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const config = TABLE_CONFIG[table];
    const db = await getDb();
    const rows = db.listAll(table, config.orderBy);
    return Response.json({ data: rows });
  } catch (err) {
    console.error(`[admin:GET:${table}]`, err);
    return Response.json({ error: "查詢失敗" }, { status: 500 });
  }
}

// ── POST ─ 新增記錄 ────────────────────────────────────────

export async function POST(
  request: Request,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!ALLOWED_TABLES.has(table)) {
    return Response.json({ error: "無效的表名" }, { status: 400 });
  }

  if (!(await checkAuth(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const config = TABLE_CONFIG[table];

    // 驗證必填字段
    const missing = config.requiredFields.filter((f) => {
      const val = body[f];
      return val === undefined || val === null || val === "";
    });
    if (missing.length > 0) {
      return Response.json(
        { error: `缺少必填字段: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const db = await getDb();
    const inserted = db.insert(table, body);
    return Response.json({ data: inserted }, { status: 201 });
  } catch (err: any) {
    // SQLite UNIQUE constraint violation
    if (err?.message?.includes("UNIQUE constraint")) {
      return Response.json(
        { error: "記錄已存在，ID 重複" },
        { status: 409 }
      );
    }
    console.error(`[admin:POST:${table}]`, err);
    return Response.json({ error: "新增失敗" }, { status: 500 });
  }
}
