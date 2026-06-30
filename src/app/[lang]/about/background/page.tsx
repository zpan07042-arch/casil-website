import { getPage } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import AboutHeader from "@/components/shared/AboutHeader";
import CompanyTimeline from "@/components/about/CompanyTimeline";

export default async function BackgroundPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("background");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? "背景" : "Background";
  const meta = getPageMeta("background", lang);

  return (
    <div style={{ backgroundColor: "#F8FAFE" }}>
      <AboutHeader
        title={title}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />
      <CompanyTimeline title={title} content={content || ""} />
    </div>
  );
}
