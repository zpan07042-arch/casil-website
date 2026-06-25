import { getPage } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import ContentSection from "@/components/shared/ContentSection";

// ============================================================
// [新增] 团青风采子页面
// ============================================================
export default async function PartyYouthPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("party_youth");

  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;
  const content = lang === "zh" ? page.content_zh : page.content_en;
  const meta = getPageMeta("party_youth", lang);

  return (
    <ContentSection
      title={title}
      content={content || ""}
      breadcrumb={meta.breadcrumb}
      enLabel={meta.enLabel}
      description={meta.description}
    />
  );
}
