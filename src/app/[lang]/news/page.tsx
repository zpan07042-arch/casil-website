import { Suspense } from "react";
import { getCompanyNews } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import AboutHeader from "@/components/shared/AboutHeader";
import NewsList from "./NewsList";

// 強制動態渲染，後台修改數據後刷新頁面即可看到最新內容
export const dynamic = "force-dynamic";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (["zh", "en"].includes(lang) ? lang : "zh") as Lang;

  const news = await getCompanyNews();
  const meta = getPageMeta("news", validLang);

  // 从数据中提取所有可用年份
  const yearsSet = new Set<string>();
  news.forEach((item) => {
    if (item.date) {
      const year = item.date.substring(0, 4);
      if (year) yearsSet.add(year);
    }
  });
  const availableYears = Array.from(yearsSet).sort((a, b) => b.localeCompare(a));

  return (
    <div style={{ backgroundColor: "#F8FAFE" }}>
      <AboutHeader
        title={t("news_center_title", validLang)}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />

      <section className="flex justify-center px-6 md:px-8 pt-2 md:pt-4 pb-12 md:pb-16">
        <div className="w-full max-w-[1100px]">
          <Suspense fallback={<div className="text-center py-12 text-gray-500">載入中...</div>}>
            <NewsList
              posts={news}
              detailUrlPrefix={`/${validLang}/news`}
              lang={validLang}
              availableYears={availableYears}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
