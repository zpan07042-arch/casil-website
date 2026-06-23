// 中国航天国际控股有限公司 — 集团组织架构图 数据
// 严格匹配参考图：所有文字、符号、括号类型一字不差

export interface OrgNode {
  name: string;           // 主体名称
  subtitle?: string;      // 括号备注（不含括号本身，渲染时添加）
  tag?: string;           // 状态标签
  children?: OrgNode[];   // 下属子节点
}

export interface OrgColumn {
  title: string;
  indicator?: string;     // 如 "▶ 三、四級一體管理"
  nodes: OrgNode[];
}

export interface OrgData {
  rootName: string;
  departments: { name: string; subtitle?: string; vertical?: boolean }[];
  columns: OrgColumn[];
}

export const orgData: OrgData = {
  rootName: "航天控股",

  departments: [
    { name: "董事局辦公室", subtitle: "企業集團辦公室", vertical: true },
    { name: "綜合管理部", subtitle: "集團運行辦公室", vertical: true },
    { name: "財務部" },
    { name: "經營發展部" },
    { name: "人力資源部" },
    { name: "企業文化部" },
    { name: "監督與審計法務部" },
    { name: "數智化辦公室" },
    { name: "企業管治與策略研究所" },
  ],

  columns: [
    // ── 板块1：先進製造業 ──
    {
      title: "先進製造業",
      indicator: "▶ 三、四級一體管理",
      nodes: [
        {
          name: "東莞康源",
          subtitle: "電路印板業務",
          children: [
            { name: "香港康源電路" },
            { name: "南通康源" },
          ],
        },
        {
          name: "航科半導體",
          subtitle: "液晶顯示器件業務",
          children: [
            { name: "康惠半導體" },
          ],
        },
        {
          name: "香港志源",
          subtitle: "注塑及表面處理業務",
          children: [
            { name: "深圳志源" },
            { name: "惠州志源" },
            { name: "志源表面" },
            { name: "志源電科" },
            { name: "越南志源" },
          ],
        },
        {
          name: "香港志順",
          subtitle: "電源產品業務",
          children: [
            { name: "惠州志順" },
          ],
        },
        {
          name: "志豪微電子",
          subtitle: "智能功率模組業務",
        },
      ],
    },
    // ── 板块2：現代服務業 ──
    {
      title: "現代服務業",
      indicator: "▶ 三、四級一體管理",
      nodes: [
        {
          name: "航天高科",
          children: [
            { name: "高科物業" },
            { name: "工業園公司" },
          ],
        },
        {
          name: "航科進出口",
          subtitle: "集團授託管理",
        },
        { name: "航天結算" },
      ],
    },
    // ── 板块3：參股公司 ──
    {
      title: "參股公司",
      nodes: [
        { name: "深圳瑞華泰", subtitle: "688323.SH" },
        { name: "航天新商務" },
        { name: "航天數聯", tag: "正在清理退出" },
        { name: "航天新世界", tag: "已完成清理" },
        { name: "海南航天", tag: "已完成清理" },
      ],
    },
    // ── 板块4：投資平台 ──
    {
      title: "投資平台",
      nodes: [
        { name: "康源投資", subtitle: "境外—香港" },
        { name: "航科新世紀", subtitle: "境內—深圳" },
      ],
    },
    // ── 板块5：技術研發中心 ──
    {
      title: "技術研發中心",
      nodes: [
        { name: "智慧研究所", subtitle: "非法人實體" },
        { name: "數智化辦公室（掛靠）" },
      ],
    },
  ],
};
