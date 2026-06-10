import { getPage } from "@/lib/db";
import ElectronicsSection from "@/components/electronics/ElectronicsSection";

export default async function ElectronicsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("electronics");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;
  const content = lang === "zh" ? page.content_zh : page.content_en;

  return (
    <>
      <ElectronicsSection title={title} content={content || ""} lang={lang} />
    </>
  );
}
