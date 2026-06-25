import { getPage } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import ContentSection from "@/components/shared/ContentSection";

// ============================================================
// [新增] 职工之家子页面
// ============================================================
export default async function PartyStaffPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("party_staff");

  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;
  const content = lang === "zh" ? page.content_zh : page.content_en;
  const meta = getPageMeta("party_staff", lang);

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
