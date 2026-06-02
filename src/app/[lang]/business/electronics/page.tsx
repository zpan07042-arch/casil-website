import { getPage } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import ElectronicsSection from "@/components/shared/ElectronicsSection";

export default async function ElectronicsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("electronics");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <BackButton href={`/${lang}/business`} />
      <ElectronicsSection title={title} lang={lang} />
    </>
  );
}
