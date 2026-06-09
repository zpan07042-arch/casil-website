import { getPage, getGovernanceDocs } from "@/lib/db";
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
  const docs = await getGovernanceDocs();

  return (
    <>
      <GovernanceSection title={title} content={content || ""} docs={docs} lang={lang} />
    </>
  );
}
