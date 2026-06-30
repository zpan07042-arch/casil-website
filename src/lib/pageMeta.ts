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
      zh: "首頁 > 關於我們 > 發展歷程",
      en: "Home > About Us > Development History",
    },
    enLabel: "DEVELOPMENT HISTORY",
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
      zh: "首頁 > 關於我們 > 戰略目標",
      en: "Home > About Us > Strategic Goals",
    },
    enLabel: "STRATEGIC GOALS",
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
  electronics: {
    breadcrumb: {
      zh: "首頁 > 產品與業務 > 消費電子",
      en: "Home > Business > Consumer Electronics",
    },
    enLabel: "CONSUMER ELECTRONICS",
    desc: {
      zh: "深耕消費電子領域，提供高品質智能終端產品",
      en: "Deep expertise in consumer electronics, delivering high-quality smart terminal products",
    },
  },
  products: {
    breadcrumb: {
      zh: "首頁 > 產品與業務 > 產品中心",
      en: "Home > Business > Products",
    },
    enLabel: "PRODUCTS",
    desc: {
      zh: "覆蓋 IC 封裝載板、車規級功率模塊、精密 PCB 等核心產品線",
      en: "Covering IC packaging substrates, automotive-grade power modules, precision PCBs and more",
    },
  },
  subsidiaries: {
    breadcrumb: {
      zh: "首頁 > 產品與業務 > 旗下企業",
      en: "Home > Business > Subsidiaries",
    },
    enLabel: "SUBSIDIARIES",
    desc: {
      zh: "全資、控股及參股企業矩陣，協同發展共創價值",
      en: "A matrix of wholly-owned, controlled and invested enterprises creating value through synergy",
    },
  },
  global: {
    breadcrumb: {
      zh: "首頁 > 產品與業務 > 全球佈局",
      en: "Home > Business > Global Presence",
    },
    enLabel: "GLOBAL PRESENCE",
    desc: {
      zh: "立足香港，輻射全球的產業與市場佈局",
      en: "Headquartered in Hong Kong with a global industrial and market presence",
    },
  },
  lab: {
    breadcrumb: {
      zh: "首頁 > 產品與業務 > 研發中心",
      en: "Home > Business > R&D Center",
    },
    enLabel: "R&D CENTER",
    desc: {
      zh: "持續投入技術研發，驅動產業創新與升級",
      en: "Continuous investment in technology R&D to drive industrial innovation and upgrading",
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

  /* ======================== 黨的建設 ======================== */
  party: {
    breadcrumb: { zh: "首頁 > 黨的建設", en: "Home > Party Building" },
    enLabel: "PARTY BUILDING",
    desc: {
      zh: "堅持黨的領導，以高质量黨建引領企業高質量發展",
      en: "Upholding Party leadership to drive high-quality enterprise development",
    },
  },
  party_dynamic: {
    breadcrumb: {
      zh: "首頁 > 黨的建設 > 黨建動態",
      en: "Home > Party Building > Party Dynamics",
    },
    enLabel: "PARTY DYNAMICS",
    desc: {
      zh: "黨建工作最新動態與學習教育資訊",
      en: "Latest updates on Party building and educational activities",
    },
  },
  party_pioneer: {
    breadcrumb: {
      zh: "首頁 > 黨的建設 > 黨員先鋒",
      en: "Home > Party Building > Pioneer Members",
    },
    enLabel: "PIONEER MEMBERS",
    desc: {
      zh: "黨員先鋒模範事蹟，榜樣力量引領前行",
      en: "Exemplary deeds of Party pioneers — role models leading the way forward",
    },
  },
  party_staff: {
    breadcrumb: {
      zh: "首頁 > 黨的建設 > 職工之家",
      en: "Home > Party Building > Staff Home",
    },
    enLabel: "STAFF HOME",
    desc: {
      zh: "關愛職工生活，建設和諧溫馨的企業大家庭",
      en: "Caring for employee well-being and building a harmonious corporate family",
    },
  },
  party_youth: {
    breadcrumb: {
      zh: "首頁 > 黨的建設 > 團青風采",
      en: "Home > Party Building > Youth League",
    },
    enLabel: "YOUTH LEAGUE",
    desc: {
      zh: "共青團員與青年員工的活力舞台與成長園地",
      en: "A vibrant platform for Youth League members and young professionals",
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
  links: {
    breadcrumb: { zh: "首頁 > 航天聯結", en: "Home > Aerospace Links" },
    enLabel: "AEROSPACE LINKS",
    desc: {
      zh: "航天系統內相關單位與合作夥伴鏈接",
      en: "Links to aerospace affiliates and collaboration partners",
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
