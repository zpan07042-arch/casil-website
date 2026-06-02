import { getPage } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import ShareholderSection from "@/components/shared/ShareholderSection";

export default async function ShareholderPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("shareholder");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <BackButton href={`/${lang}/news`} />
      <ShareholderSection title={title} lang={lang} />
    </>
  );
}
