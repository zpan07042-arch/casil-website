import { getPage, getCompanyNews } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import CompanyNewsSection from "@/components/shared/CompanyNewsSection";

export default async function CompanyNewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("company-news");

  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;
  const news = getCompanyNews();

  return (
    <>
      <BackButton href={`/${lang}/news`} />
      <CompanyNewsSection title={title} news={news} lang={lang} />
    </>
  );
}
