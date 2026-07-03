import { getCompanyNews } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import AboutHeader from "@/components/shared/AboutHeader";
import NewsList from "./NewsList";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (["zh", "en"].includes(lang) ? lang : "zh") as Lang;

  const news = await getCompanyNews();
  const meta = getPageMeta("news", validLang);

  return (
    <div style={{ backgroundColor: "#F8FAFE" }}>
      <AboutHeader
        title={t("news_center_title", validLang)}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />

      <NewsList news={news} lang={validLang} />
    </div>
  );
}
