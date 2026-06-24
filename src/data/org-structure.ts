// 中国航天国际控股有限公司 — 集团组织架构图 数据
// China Aerospace International Holdings Limited — Group Organization Chart Data
// 严格匹配参考图：所有文字、符号、括号类型一字不差

import type { Lang } from "@/lib/types";

export interface OrgNode {
  name: string;           // 主体名称
  subtitle?: string;      // 括号备注（不含括号本身，渲染时添加）
  tag?: string;           // 状态标签
  children?: OrgNode[];   // 下属子节点
  enlarged?: boolean;     // 是否放大显示
  dimmed?: boolean;       // 是否半透明显示
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

const orgDataZh: OrgData = {
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
          enlarged: true,
          children: [
            { name: "香港康源電路" },
            { name: "南通康源" },
          ],
        },
        {
          name: "航科半導體",
          subtitle: "液晶顯示器件業務",
          enlarged: true,
          children: [
            { name: "康惠半導體" },
          ],
        },
        {
          name: "香港志源",
          subtitle: "注塑及表面處理業務",
          enlarged: true,
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
          enlarged: true,
          children: [
            { name: "惠州志順" },
          ],
        },
        {
          name: "志豪微電子",
          subtitle: "智能功率模組業務",
          enlarged: true,
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
          enlarged: true,
          children: [
            { name: "高科物業" },
          ],
        },
        { name: "工業園公司",
            enlarged: true,
        },
        {
          name: "航科進出口",
          subtitle: "集團授託管理",
          enlarged: true,
        },
        {
          name: "航天結算",
          enlarged: true,
        },
      ],
    },
    // ── 板块3：參股公司 ──
    {
      title: "參股公司",
      nodes: [
        { name: "深圳瑞華泰", subtitle: "688323.SH", enlarged: true },
        { name: "航天新商務", enlarged: true },
        { name: "航天數聯", tag: "正在清理退出", enlarged: true },
        { name: "航天新世界", tag: "已完成清理", enlarged: true, dimmed: true },
        { name: "海南航天", tag: "已完成清理", enlarged: true, dimmed: true },
      ],
    },
    // ── 板块4：投資平台 ──
    {
      title: "投資平台",
      nodes: [
        { name: "康源投資", subtitle: "境外—香港", enlarged: true },
        { name: "航科新世紀", subtitle: "境內—深圳", enlarged: true },
      ],
    },
    // ── 板块5：技術研發中心 ──
    {
      title: "技術研發中心",
      nodes: [
        { name: "智慧研究所", subtitle: "非法人實體", enlarged: true },
        { name: "數智化辦公室（掛靠）" },
      ],
    },
  ],
};

const orgDataEn: OrgData = {
  rootName: "CASIL",

  departments: [
    { name: "Board Office", subtitle: "Corporate Group Office", vertical: true },
    { name: "General Management Dept.", subtitle: "Group Operations Office", vertical: true },
    { name: "Finance Department" },
    { name: "Business Development Dept." },
    { name: "Human Resources Dept." },
    { name: "Corporate Culture Dept." },
    { name: "Supervision, Audit & Legal Dept." },
    { name: "Digital Intelligence Office" },
  ],

  columns: [
    // ── Column 1: Advanced Manufacturing ──
    {
      title: "Advanced Manufacturing",
      indicator: "▶ L3 & L4 Integrated Mgmt.",
      nodes: [
        {
          name: "Dongguan KangYuan",
          subtitle: "PCB Business",
          enlarged: true,
          children: [
            { name: "HK KangYuan Circuit" },
            { name: "Nantong KangYuan" },
          ],
        },
        {
          name: "CASIL Semiconductor",
          subtitle: "LCD Business",
          enlarged: true,
          children: [
            { name: "KangHui Semiconductor" },
          ],
        },
        {
          name: "HK ZhiYuan",
          subtitle: "Injection Molding & Surface Treatment",
          enlarged: true,
          children: [
            { name: "Shenzhen ZhiYuan" },
            { name: "Huizhou ZhiYuan" },
            { name: "ZhiYuan Surface" },
            { name: "ZhiYuan Electronics" },
            { name: "Vietnam ZhiYuan" },
          ],
        },
        {
          name: "HK ZhiShun",
          subtitle: "Power Supply Products",
          enlarged: true,
          children: [
            { name: "Huizhou ZhiShun" },
          ],
        },
        {
          name: "ZhiHao Microelectronics",
          subtitle: "IPM Business",
          enlarged: true,
        },
      ],
    },
    // ── Column 2: Modern Services ──
    {
      title: "Modern Services",
      indicator: "▶ L3 & L4 Integrated Mgmt.",
      nodes: [
        {
          name: "Aerospace Hi-Tech",
          enlarged: true,
          children: [
            { name: "Hi-Tech Property" },
            { name: "Industrial Park Co." },
          ],
        },
        {
          name: "CASIL Import & Export",
          subtitle: "Group Entrusted Mgmt.",
          enlarged: true,
        },
        {
          name: "Aerospace Settlement",
          enlarged: true,
        },
      ],
    },
    // ── Column 3: Equity Investments ──
    {
      title: "Equity Investments",
      nodes: [
        { name: "Shenzhen RayiTech", subtitle: "688323.SH", enlarged: true },
        { name: "Aerospace New Commerce", enlarged: true },
        { name: "Aerospace Digital Link", tag: "Exiting (Cleanup)", enlarged: true },
        { name: "Aerospace New World", tag: "Cleanup Completed", enlarged: true, dimmed: true },
        { name: "Hainan Aerospace", tag: "Cleanup Completed", enlarged: true, dimmed: true },
      ],
    },
    // ── Column 4: Investment Platforms ──
    {
      title: "Investment Platforms",
      nodes: [
        { name: "KangYuan Investment", subtitle: "Offshore — HK", enlarged: true },
        { name: "CASIL New Century", subtitle: "Onshore — Shenzhen", enlarged: true },
      ],
    },
    // ── Column 5: Technology R&D Center ──
    {
      title: "Technology R&D Center",
      nodes: [
        { name: "Smart Research Institute", subtitle: "Unincorporated Entity", enlarged: true },
        { name: "Digital Intelligence Office (Affiliated)" },
      ],
    },
  ],
};

/** 根据语言返回对应的组织架构数据 */
export function getOrgData(lang: Lang): OrgData {
  return lang === "en" ? orgDataEn : orgDataZh;
}

/** 保留中文数据向后兼容 */
export const orgData: OrgData = orgDataZh;
