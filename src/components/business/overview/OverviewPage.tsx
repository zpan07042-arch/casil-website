"use client";

import OverviewHeader from "./OverviewHeader";
import OverviewCategoryLabel from "./OverviewCategoryLabel";
import OverviewBusinessCard from "./OverviewBusinessCard";
import OverviewBanner from "./OverviewBanner";
import { OVERVIEW_CONFIG, type OverviewCardData } from "./overviewData";
import { getPageMeta } from "@/lib/pageMeta";
import type { LinkItem } from "@/lib/types";

/**
 * 產品與業務 - 業務總覽 長頁面
 *
 * 「use client」組件，無 framer-motion 動畫，靜態渲染八個模塊。
 * 所有文字由上層 page.tsx 傳入的 lang 決定中/英文。
 * 業務卡片數據由服務端從數據庫獲取並通過 props 傳入。
 */
export default function OverviewPage({
  lang,
  cards,
  links,
}: {
  lang: string;
  cards: OverviewCardData[];
  links: LinkItem[];
}) {
  const meta = getPageMeta("business", lang);
  const isZh = lang === "zh";
  const config = OVERVIEW_CONFIG;

  // 解析統計數據為當前語言
  const stats = config.stats.map((s) => ({
    value: isZh ? s.value.zh : s.value.en,
    label: isZh ? s.label.zh : s.label.en,
  }));

  // 解析 banner
  const bannerText = isZh ? config.banner.text.zh : config.banner.text.en;
  const bannerButton = isZh
    ? config.banner.buttonText.zh
    : config.banner.buttonText.en;
  const bannerHref = `/${lang}`;

  // 解析分類標籤
  const catA = {
    title: isZh ? config.categoryA.title.zh : config.categoryA.title.en,
    subtitle: "",
  };
  const catB = {
    title: isZh ? config.categoryB.title.zh : config.categoryB.title.en,
    subtitle: "",
  };

  // 按 category 分組卡片
  const advancedCards = cards.filter((c) => c.category === "advanced_manufacturing");
  const aeroCards = cards.filter((c) => c.category === "aerospace_services");

  return (
    <div style={{ backgroundColor: "#F8FAFE" }}>
      {/* ═══════ 模塊1：頁首標題區 ═══════ */}
      <OverviewHeader
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        title={isZh ? "產品與業務" : "Products & Business"}
        description={meta.description || ""}
        stats={stats}
      />

      {/* ═══════ 模塊2：A 先進製造業 分類條 ═══════ */}
      <OverviewCategoryLabel
        title={catA.title}
        subtitle={catA.subtitle}
      />

      {/* ═══════ 模塊3：先進製造業卡片 ═══════ */}
      {advancedCards.map((card) => (
        <OverviewBusinessCard key={card.id} lang={lang} cardData={card} links={links} />
      ))}

      {/* ═══════ 模塊4：B 航天產業服務業 分類條 ═══════ */}
      <OverviewCategoryLabel
        title={catB.title}
        subtitle={catB.subtitle}
      />

      {/* ═══════ 模塊5：航天產業服務業卡片 ═══════ */}
      {aeroCards.map((card) => (
        <OverviewBusinessCard key={card.id} lang={lang} cardData={card} links={links} />
      ))}

      {/* ═══════ 模塊8：滿版深藍 Banner ═══════ */}
      <OverviewBanner
        text={bannerText}
        buttonText={bannerButton}
        buttonHref={bannerHref}
      />
    </div>
  );
}
