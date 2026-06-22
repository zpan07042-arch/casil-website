import { getPage } from "@/lib/db";
import ContentSection from "@/components/shared/ContentSection";

// ============================================================
// [新增] 党员先锋子页面
// ============================================================
export default async function PartyPioneerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("party_pioneer");

  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;
  const content = lang === "zh" ? page.content_zh : page.content_en;

  return <ContentSection title={title} content={content || ""} />;
}
