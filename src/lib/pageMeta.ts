/**
 * 页面横幅元数据配置
 *
 * 每个 section 包含：
 * - breadcrumb: 中/英文面包屑导航
 * - enLabel:    英文大写标签（显示在面包屑下方、标题上方）
 * - desc:       分割线下方简短说明文字（可选）
 */
const PAGE_META: Record<
  string,
  {
    breadcrumb: { zh: string; en: string };
    enLabel: string;
    desc?: { zh: string; en: string };
  }
> = {
  /* ======================== 關於我們 ======================== */
  about: {
    breadcrumb: { zh: "首頁 > 關於我們", en: "Home > About Us" },
    enLabel: "ABOUT US",
    desc: {
      zh: "中國航天國際控股有限公司 — 航天科技與工業的全球領航者",
      en: "China Aerospace International Holdings Limited — A Global Leader in Aerospace Technology & Industry",
    },
  },
  background: {
    breadcrumb: {
      zh: "首頁 > 關於我們 > 背景",
      en: "Home > About Us > Background",
    },
    enLabel: "BACKGROUND",
    desc: {
      zh: "從康力時代到航天控股，跨越半世紀的傳承與蛻變",
      en: "From Conic era to CASIL — half a century of legacy and transformation",
    },
  },
  culture: {
    breadcrumb: {
      zh: "首頁 > 關於我們 > 企業文化",
      en: "Home > About Us > Corporate Culture",
    },
    enLabel: "CORPORATE CULTURE",
    desc: {
      zh: "愛國、創新、誠信、和諧、盡責 — 航天精神引領企業前行",
      en: "Patriotism, Innovation, Integrity, Harmony, Responsibility — Guided by the Aerospace Spirit",
    },
  },
  goals: {
    breadcrumb: {
      zh: "首頁 > 關於我們 > 目標",
      en: "Home > About Us > Goals",
    },
    enLabel: "GOALS",
    desc: {
      zh: "建設科學化管理體系，爲股東創造持久價值",
      en: "Building a scientific management system to create lasting shareholder value",
    },
  },
  board: {
    breadcrumb: {
      zh: "首頁 > 關於我們 > 董事局與管理層",
      en: "Home > About Us > Board & Management",
    },
    enLabel: "BOARD & MANAGEMENT",
    desc: {
      zh: "專業多元的董事團隊與經驗豐富的管理層，引領企業戰略方向",
      en: "A professional and diverse board with experienced management leading the company's strategic direction",
    },
  },
  governance: {
    breadcrumb: {
      zh: "首頁 > 關於我們 > 企業管治",
      en: "Home > About Us > Corporate Governance",
    },
    enLabel: "CORPORATE GOVERNANCE",
    desc: {
      zh: "恪守高水平企業管治標準，保障股東權益",
      en: "Upholding high corporate governance standards to protect shareholder rights",
    },
  },

  /* ======================== 產品與業務 ======================== */
  business: {
    breadcrumb: { zh: "首頁 > 產品與業務", en: "Home > Business" },
    enLabel: "BUSINESS OVERVIEW",
    desc: {
      zh: "兩大核心業務板塊，涵蓋先進製造業與航天產業服務業",
      en: "Two core business segments spanning advanced manufacturing and aerospace industry services",
    },
  },

  /* ======================== 聯繫我們 ======================== */
  contact: {
    breadcrumb: { zh: "首頁 > 聯繫我們", en: "Home > Contact Us" },
    enLabel: "CONTACT US",
    desc: {
      zh: "歡迎與我們取得聯繫，我們將竭誠爲您服務",
      en: "We welcome your inquiries and look forward to serving you",
    },
  },

  /* ======================== 新聞資訊 ======================== */
  news: {
    breadcrumb: { zh: "首頁 > 新聞資訊", en: "Home > News Center" },
    enLabel: "NEWS CENTER",
    desc: {
      zh: "掌握航天控股最新動態與行業資訊",
      en: "Stay updated with the latest news and industry insights from CASIL",
    },
  },

  /* ======================== 其他 ======================== */
  location: {
    breadcrumb: { zh: "首頁 > 地理位置", en: "Home > Location" },
    enLabel: "LOCATION",
    desc: {
      zh: "中國航天國際控股有限公司 — 香港總部及全球分支機構",
      en: "CASIL — Hong Kong Headquarters & Global Branches",
    },
  },
};

export interface PageMeta {
  breadcrumb: string;
  enLabel: string;
  description?: string;
}

export function getPageMeta(section: string, lang: string): PageMeta {
  const meta = PAGE_META[section];
  if (!meta) {
    return { breadcrumb: "", enLabel: "" };
  }
  return {
    breadcrumb: lang === "zh" ? meta.breadcrumb.zh : meta.breadcrumb.en,
    enLabel: meta.enLabel,
    description: meta.desc
      ? lang === "zh"
        ? meta.desc.zh
        : meta.desc.en
      : undefined,
  };
}
