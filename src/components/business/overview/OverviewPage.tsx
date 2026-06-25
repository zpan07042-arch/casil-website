"use client";

import OverviewHeader from "./OverviewHeader";
import OverviewCategoryLabel from "./OverviewCategoryLabel";
import OverviewBusinessCard from "./OverviewBusinessCard";
import OverviewBanner from "./OverviewBanner";
import { OVERVIEW_DATA } from "./overviewData";
import { getPageMeta } from "@/lib/pageMeta";

/**
 * 產品與業務 - 業務總覽 長頁面
 *
 * 「use client」組件，無 framer-motion 動畫，靜態渲染八個模塊。
 * 所有文字由上層 page.tsx 傳入的 lang 決定中/英文。
 */
export default function OverviewPage({ lang }: { lang: string }) {
  const meta = getPageMeta("business", lang);
  const isZh = lang === "zh";
  const data = OVERVIEW_DATA;

  // 解析統計數據為當前語言
  const stats = data.stats.map((s) => ({
    value: isZh ? s.value.zh : s.value.en,
    label: isZh ? s.label.zh : s.label.en,
  }));

  // 解析分類標籤
  const catA = {
    letter: data.categoryA.letter,
    title: isZh ? data.categoryA.title.zh : data.categoryA.title.en,
    subtitle: data.categoryA.subtitle,
  };
  const catB = {
    letter: data.categoryB.letter,
    title: isZh ? data.categoryB.title.zh : data.categoryB.title.en,
    subtitle: data.categoryB.subtitle,
  };

  // 解析 banner
  const bannerText = isZh ? data.banner.text.zh : data.banner.text.en;
  const bannerButton = isZh
    ? data.banner.buttonText.zh
    : data.banner.buttonText.en;
  const bannerHref = `/${lang}`;

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
        letter={catA.letter}
        title={catA.title}
        subtitle={catA.subtitle}
      />

      {/* ═══════ 模塊3：東莞康源 PCB ═══════ */}
      <OverviewBusinessCard lang={lang} cardData={data.cards[0]} />

      {/* ═══════ 模塊4：航科半導體 顯示器件 ═══════ */}
      <OverviewBusinessCard lang={lang} cardData={data.cards[1]} />

      {/* ═══════ 模塊5：志豪微電子 IPM模組 ═══════ */}
      <OverviewBusinessCard lang={lang} cardData={data.cards[2]} />

      {/* ═══════ 模塊5-1：香港志順 電源領域 ═══════ */}
      <OverviewBusinessCard lang={lang} cardData={data.cards[3]} />

      {/* ═══════ 模塊5-2：香港志源 注塑及表面處理業務 ═══════ */}
      <OverviewBusinessCard lang={lang} cardData={data.cards[4]} />

      {/* ═══════ 模塊6：B 航天產業服務業 分類條 ═══════ */}
      <OverviewCategoryLabel
        letter={catB.letter}
        title={catB.title}
        subtitle={catB.subtitle}
      />

      {/* ═══════ 模塊7：航天高科 物業租賃 ═══════ */}
      <OverviewBusinessCard lang={lang} cardData={data.cards[5]} />

      {/* ═══════ 模塊8：滿版深藍 Banner ═══════ */}
      <OverviewBanner
        text={bannerText}
        buttonText={bannerButton}
        buttonHref={bannerHref}
      />
    </div>
  );
}
