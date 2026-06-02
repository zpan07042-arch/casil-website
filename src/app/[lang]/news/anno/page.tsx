import { getPage } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import AnnoSection from "@/components/shared/AnnoSection";

export default async function AnnoPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("anno");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <BackButton href={`/${lang}/news`} />
      <AnnoSection title={title} lang={lang} />
    </>
  );
}
