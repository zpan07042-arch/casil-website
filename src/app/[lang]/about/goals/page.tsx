import { getPage } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import AboutHeader from "@/components/shared/AboutHeader";
import GoalsSection from "@/components/goals/GoalsSection";

export default async function GoalsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("goals");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? "目標" : "Goals";
  const content = lang === "zh" ? page.content_zh : page.content_en;
  const meta = getPageMeta("goals", lang);

  return (
    <>
      <AboutHeader
        title={title}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />
      <GoalsSection title={title} content={content || ""} lang={lang} />
    </>
  );
}
