import type { FieldConfig } from "@/components/admin/AdminModal";
import type { Column } from "@/components/admin/AdminTable";

// ════════════════════════════════════════════════════════════
// 字段配置
// ════════════════════════════════════════════════════════════

export const PAGES_FIELDS: FieldConfig[] = [
  {
    name: "id",
    label: "頁面ID",
    type: "text",
    required: true,
    placeholder: "例如: about, background, culture",
  },
  {
    name: "section",
    label: "所屬欄目",
    type: "select",
    required: true,
    options: [
      { value: "about", label: "關於我們" },
      { value: "business", label: "產業與業務" },
      { value: "party", label: "黨建" },
      { value: "other", label: "其他" },
    ],
  },
  {
    name: "title_zh",
    label: "中文標題",
    type: "text",
    required: true,
    lang: "zh",
  },
  {
    name: "title_en",
    label: "English Title",
    type: "text",
    required: true,
    lang: "en",
  },
  {
    name: "content_zh",
    label: "中文內容",
    type: "textarea",
    lang: "zh",
  },
  {
    name: "content_en",
    label: "English Content",
    type: "textarea",
    lang: "en",
  },
  {
    name: "sort_order",
    label: "排序",
    type: "number",
  },
];

export const PAGES_COLUMNS: Column<Record<string, unknown>>[] = [
  { key: "id", label: "ID" },
  { key: "section", label: "欄目" },
  { key: "title_zh", label: "中文標題" },
  { key: "title_en", label: "英文標題" },
  { key: "sort_order", label: "排序" },
];

// ────────────────────────────────────────────────────────────

export const ANNOUNCEMENTS_FIELDS: FieldConfig[] = [
  {
    name: "year",
    label: "年份",
    type: "number",
    required: true,
  },
  {
    name: "date",
    label: "日期",
    type: "text",
    placeholder: "YYYY-MM-DD",
  },
  {
    name: "title_zh",
    label: "中文標題",
    type: "text",
    required: true,
    lang: "zh",
  },
  {
    name: "title_en",
    label: "English Title",
    type: "text",
    lang: "en",
  },
  {
    name: "category",
    label: "分類",
    type: "select",
    options: [
      { value: "perf", label: "業績公告" },
      { value: "coop", label: "合作動態" },
      { value: "rnd", label: "科研資訊" },
      { value: "major", label: "公司重大事項" },
    ],
  },
  {
    name: "pdf_url",
    label: "PDF 鏈接",
    type: "url",
    placeholder: "https://...",
  },
  {
    name: "sort_order",
    label: "排序",
    type: "number",
  },
];

export const ANNOUNCEMENTS_COLUMNS: Column<Record<string, unknown>>[] = [
  { key: "id", label: "ID" },
  { key: "year", label: "年份" },
  { key: "date", label: "日期" },
  { key: "title_zh", label: "中文標題" },
  { key: "category", label: "分類" },
  { key: "sort_order", label: "排序" },
];

// ────────────────────────────────────────────────────────────

export const BOARD_MEMBERS_FIELDS: FieldConfig[] = [
  {
    name: "name_zh",
    label: "中文姓名",
    type: "text",
    required: true,
    lang: "zh",
  },
  {
    name: "name_en",
    label: "English Name",
    type: "text",
    lang: "en",
  },
  {
    name: "title_zh",
    label: "中文職位",
    type: "text",
    required: true,
    lang: "zh",
  },
  {
    name: "title_en",
    label: "English Title",
    type: "text",
    lang: "en",
  },
  {
    name: "bio_zh",
    label: "中文簡歷",
    type: "textarea",
    lang: "zh",
  },
  {
    name: "bio_en",
    label: "English Bio",
    type: "textarea",
    lang: "en",
  },
  {
    name: "member_type",
    label: "成員類型",
    type: "select",
    required: true,
    options: [
      { value: "executive", label: "執行董事" },
      { value: "non-executive", label: "非執行董事" },
      { value: "independent", label: "獨立非執行董事" },
    ],
  },
  {
    name: "sort_order",
    label: "排序",
    type: "number",
  },
];

export const BOARD_MEMBERS_COLUMNS: Column<Record<string, unknown>>[] = [
  { key: "name_zh", label: "中文姓名" },
  { key: "title_zh", label: "中文職位" },
  { key: "member_type", label: "類型" },
  { key: "sort_order", label: "排序" },
];

// ────────────────────────────────────────────────────────────

export const GOVERNANCE_DOCS_FIELDS: FieldConfig[] = [
  {
    name: "title_zh",
    label: "中文標題",
    type: "text",
    required: true,
    lang: "zh",
  },
  {
    name: "title_en",
    label: "English Title",
    type: "text",
    lang: "en",
  },
  {
    name: "pdf_url",
    label: "PDF 鏈接",
    type: "url",
    required: true,
    placeholder: "https://...",
  },
  {
    name: "sort_order",
    label: "排序",
    type: "number",
  },
];

export const GOVERNANCE_DOCS_COLUMNS: Column<Record<string, unknown>>[] = [
  { key: "id", label: "ID" },
  { key: "title_zh", label: "中文標題" },
  { key: "title_en", label: "英文標題" },
  { key: "pdf_url", label: "PDF 鏈接" },
  { key: "sort_order", label: "排序" },
];

// ────────────────────────────────────────────────────────────

export const COMPANY_NEWS_FIELDS: FieldConfig[] = [
  {
    name: "date",
    label: "日期",
    type: "text",
    placeholder: "YYYY-MM-DD",
  },
  {
    name: "title_zh",
    label: "中文標題",
    type: "text",
    required: true,
    lang: "zh",
  },
  {
    name: "title_en",
    label: "English Title",
    type: "text",
    lang: "en",
  },
  {
    name: "pdf_url",
    label: "PDF 鏈接",
    type: "url",
    placeholder: "https://...",
  },
];

export const COMPANY_NEWS_COLUMNS: Column<Record<string, unknown>>[] = [
  { key: "id", label: "ID" },
  { key: "date", label: "日期" },
  { key: "title_zh", label: "中文標題" },
  { key: "title_en", label: "英文標題" },
];

// ────────────────────────────────────────────────────────────

export const SUBSIDIARIES_FIELDS: FieldConfig[] = [
  {
    name: "name_zh",
    label: "中文名稱",
    type: "text",
    required: true,
    lang: "zh",
  },
  {
    name: "name_en",
    label: "English Name",
    type: "text",
    lang: "en",
  },
  {
    name: "description_zh",
    label: "中文描述",
    type: "textarea",
    lang: "zh",
  },
  {
    name: "description_en",
    label: "English Description",
    type: "textarea",
    lang: "en",
  },
  {
    name: "sub_type",
    label: "子公司類型",
    type: "select",
    required: true,
    options: [
      { value: "wholly_owned", label: "全資子公司" },
      { value: "controlled", label: "控股子公司" },
      { value: "invested", label: "參股企業" },
    ],
  },
  {
    name: "sort_order",
    label: "排序",
    type: "number",
  },
];

export const SUBSIDIARIES_COLUMNS: Column<Record<string, unknown>>[] = [
  { key: "name_zh", label: "中文名稱" },
  { key: "name_en", label: "英文名稱" },
  { key: "sub_type", label: "類型" },
  { key: "sort_order", label: "排序" },
];

// ────────────────────────────────────────────────────────────

export const LINKS_FIELDS: FieldConfig[] = [
  {
    name: "name_zh",
    label: "中文名稱",
    type: "text",
    required: true,
    lang: "zh",
  },
  {
    name: "name_en",
    label: "English Name",
    type: "text",
    lang: "en",
  },
  {
    name: "url",
    label: "URL",
    type: "url",
    placeholder: "https://...",
  },
  {
    name: "sort_order",
    label: "排序",
    type: "number",
  },
];

export const LINKS_COLUMNS: Column<Record<string, unknown>>[] = [
  { key: "name_zh", label: "中文名稱" },
  { key: "name_en", label: "英文名稱" },
  { key: "url", label: "URL" },
  { key: "sort_order", label: "排序" },
];

// ════════════════════════════════════════════════════════════
// 表名與配置映射
// ════════════════════════════════════════════════════════════

export const TABLE_META: Record<
  string,
  {
    label: string;
    fields: FieldConfig[];
    columns: Column<Record<string, unknown>>[];
    apiPath: string;
    isTextPk?: boolean;
  }
> = {
  pages: {
    label: "頁面",
    fields: PAGES_FIELDS,
    columns: PAGES_COLUMNS,
    apiPath: "pages",
    isTextPk: true,
  },
  announcements: {
    label: "公告",
    fields: ANNOUNCEMENTS_FIELDS,
    columns: ANNOUNCEMENTS_COLUMNS,
    apiPath: "announcements",
  },
  board_members: {
    label: "董事局成員",
    fields: BOARD_MEMBERS_FIELDS,
    columns: BOARD_MEMBERS_COLUMNS,
    apiPath: "board_members",
  },
  governance_docs: {
    label: "企業管治文件",
    fields: GOVERNANCE_DOCS_FIELDS,
    columns: GOVERNANCE_DOCS_COLUMNS,
    apiPath: "governance_docs",
  },
  company_news: {
    label: "公司資訊",
    fields: COMPANY_NEWS_FIELDS,
    columns: COMPANY_NEWS_COLUMNS,
    apiPath: "company_news",
  },
  subsidiaries: {
    label: "子公司",
    fields: SUBSIDIARIES_FIELDS,
    columns: SUBSIDIARIES_COLUMNS,
    apiPath: "subsidiaries",
  },
  links: {
    label: "友情鏈接",
    fields: LINKS_FIELDS,
    columns: LINKS_COLUMNS,
    apiPath: "links",
  },
};
