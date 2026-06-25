import { getPage, getSubsidiaries } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import PageBanner from "@/components/shared/PageBanner";
import SubsidiarySection from "@/components/subsidiaries/SubsidiarySection";

export default async function SubsidiariesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("subsidiaries");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? page.title_zh : page.title_en;
  const meta = getPageMeta("subsidiaries", lang);
  const subsidiaries = await getSubsidiaries();

  return (
    <>
      <PageBanner
        title={title}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />
      <SubsidiarySection title={title} content={content || ""} subsidiaries={subsidiaries} lang={lang} />
    </>
  );
}
