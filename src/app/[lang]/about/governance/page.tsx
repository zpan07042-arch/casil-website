import { getPage, getGovernanceDocs } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import PageBanner from "@/components/shared/PageBanner";
import GovernanceSection from "@/components/governance/GovernanceSection";

export default async function GovernancePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("governance");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? page.title_zh : page.title_en;
  const meta = getPageMeta("governance", lang);
  const docs = await getGovernanceDocs();

  return (
    <>
      <PageBanner
        title={title}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />
      <GovernanceSection title={title} content={content || ""} docs={docs} lang={lang} />
    </>
  );
}
