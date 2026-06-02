import { getPage } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import CultureSection from "@/components/shared/CultureSection";

export default async function CulturePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("culture");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <BackButton href={`/${lang}/about`} />
      <CultureSection title={title} lang={lang} />
    </>
  );
}
