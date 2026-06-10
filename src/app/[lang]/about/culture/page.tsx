import { getPage } from "@/lib/db";
import CultureSection from "@/components/culture/CultureSection";

export default async function CulturePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("culture");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;
  const content = lang === "zh" ? page.content_zh : page.content_en;

  return (
    <>
      <CultureSection title={title} content={content || ""} lang={lang} />
    </>
  );
}
