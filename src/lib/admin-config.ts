import { validateSession } from "@/lib/auth";

/**
 * Admin API 表配置
 *
 * 定義所有允許的表名、主鍵類型、排序字段和必填字段。
 * 在 [table]/route.ts 和 [table]/[id]/route.ts 之間共享。
 */

export interface TableConfig {
  idColumn: string;
  idType: "text" | "integer";
  orderBy: string;
  requiredFields: string[];
}

export const TABLE_CONFIG: Record<string, TableConfig> = {
  pages: {
    idColumn: "id",
    idType: "text",
    orderBy: "sort_order",
    requiredFields: ["id", "section", "title_zh", "title_en"],
  },
  announcements: {
    idColumn: "id",
    idType: "integer",
    orderBy: "year DESC, sort_order",
    requiredFields: ["year", "title_zh"],
  },
  board_members: {
    idColumn: "id",
    idType: "integer",
    orderBy: "sort_order",
    requiredFields: ["name_zh", "title_zh", "member_type"],
  },
  governance_docs: {
    idColumn: "id",
    idType: "integer",
    orderBy: "sort_order",
    requiredFields: ["title_zh", "pdf_url"],
  },
  company_news: {
    idColumn: "id",
    idType: "integer",
    orderBy: "date DESC",
    requiredFields: ["title_zh"],
  },
  subsidiaries: {
    idColumn: "id",
    idType: "integer",
    orderBy: "sort_order",
    requiredFields: ["name_zh", "sub_type"],
  },
  links: {
    idColumn: "id",
    idType: "integer",
    orderBy: "sort_order",
    requiredFields: ["name_zh"],
  },
  business_cards: {
    idColumn: "id",
    idType: "text",
    orderBy: "sort_order",
    requiredFields: ["id", "category", "main_title", "sub_title", "en_name", "body_zh", "body_en"],
  },
};

export const ALLOWED_TABLES = new Set(Object.keys(TABLE_CONFIG));

/**
 * 從 cookie 中提取 admin_token 並驗證 session 有效性
 */
export async function checkAuth(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  const token = match?.[1];
  if (!token) return false;
  return validateSession(token);
}
