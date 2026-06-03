import { getPage } from "@/lib/db";
import CompanyTimeline from "@/components/shared/CompanyTimeline";

export default async function BackgroundPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("background");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <CompanyTimeline title={title} content={content || ""} />
    </>
  );
}
