import { getPage, getSubsidiaries } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import SubsidiarySection from "@/components/shared/SubsidiarySection";

export default async function SubsidiariesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("subsidiaries");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? page.title_zh : page.title_en;
  const subsidiaries = getSubsidiaries();

  return (
    <>
      <BackButton href={`/${lang}/business`} />
      <SubsidiarySection title={title} content={content || ""} subsidiaries={subsidiaries} lang={lang} />
    </>
  );
}
