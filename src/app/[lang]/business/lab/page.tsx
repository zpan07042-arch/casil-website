import { getPage } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import ContentSection from "@/components/shared/ContentSection";

export default async function LabPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("lab");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <BackButton href={`/${lang}/business`} />
      <ContentSection title={title} content={content || ""} />
    </>
  );
}
