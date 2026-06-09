import { getPage } from "@/lib/db";
import ContentSection from "@/components/shared/ContentSection";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("location");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <ContentSection title={title} content={content || ""} />
    </>
  );
}
