import { getPage } from "@/lib/db";
import GoalsSection from "@/components/shared/GoalsSection";

export default async function GoalsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("goals");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <GoalsSection title={title} lang={lang} />
    </>
  );
}
