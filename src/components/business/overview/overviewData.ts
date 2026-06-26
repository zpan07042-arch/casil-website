/**
 * 產品與業務 - 業務總覽 頁面配置
 *
 * 僅包含統計數據、分類標籤和 Banner 等頁面框架配置。
 * 業務卡片數據已遷移至數據庫 business_cards 表，由後台管理。
 */

/* ──────────── 類型定義 ──────────── */

export interface Bilingual {
  zh: string;
  en: string;
}

export interface StatItem {
  value: Bilingual;
  label: Bilingual;
}

export interface ProductPlaceholder {
  labelZh: string;
  labelEn: string;
  imagePath?: string;
}

export interface OverviewCardData {
  id: string;
  category: string;
  mainTitle: string;
  subTitle: string;
  enName: string;
  body: Bilingual;
  clients: string[];
  learnMoreHref: string;
  productPlaceholders: ProductPlaceholder[];
  imageLayout: "grid" | "single";
}

export interface CategoryLabelData {
  letter: "A" | "B";
  title: Bilingual;
  subtitle: string;
}

export interface OverviewConfig {
  stats: StatItem[];
  categoryA: CategoryLabelData;
  categoryB: CategoryLabelData;
  banner: {
    text: Bilingual;
    buttonText: Bilingual;
  };
}

/* ──────────── 頁面框架配置 ──────────── */

export const OVERVIEW_CONFIG: OverviewConfig = {
  /* ──── 模塊1：三欄統計數據 ──── */
  stats: [
    {
      value: { zh: "5", en: "5" },
      label: { zh: "製造子公司", en: "Manufacturing Subsidiaries" },
    },
    {
      value: { zh: "50 萬 +", en: "500,000+" },
      label: { zh: "㎡ 物業面積", en: "sqm Property Area" },
    },
    {
      value: { zh: "2", en: "2" },
      label: { zh: "核心業務板塊", en: "Core Business Segments" },
    },
  ],

  /* ──── 模塊2：A 先進製造業 ──── */
  categoryA: {
    letter: "A",
    title: { zh: "先進製造業", en: "Advanced Manufacturing" },
    subtitle: "ADVANCED MANUFACTURING",
  },

  /* ──── 模塊6：B 航天產業服務業 ──── */
  categoryB: {
    letter: "B",
    title: { zh: "航天產業服務業", en: "Aerospace Industry Services" },
    subtitle: "AEROSPACE INDUSTRY SERVICES",
  },

  /* ──── 模塊8：底部深藍 Banner ──── */
  banner: {
    text: {
      zh: "立足電子製造與精密工業核心優勢，集團前瞻布局新一代信息技術、高端裝備及戰略性新興產業，以深度融入航天產業生態為使命，借力國際化平台持續擴大全球產業影響力，矢志構建面向未來的持續競爭優勢。",
      en: "Building on core strengths in electronics manufacturing and precision industries, the Group proactively deploys in next-generation information technology, high-end equipment and strategic emerging industries. With a mission to deeply integrate into the aerospace industry ecosystem, we leverage our international platform to continuously expand global industrial influence and are committed to building sustainable competitive advantages for the future.",
    },
    buttonText: {
      zh: "返回首頁",
      en: "Back to Home",
    },
  },
};
