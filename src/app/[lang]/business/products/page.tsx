import { getPage } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import ProductsSection from "@/components/shared/ProductsSection";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = getPage("products");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <BackButton href={`/${lang}/business`} />
      <ProductsSection title={title} lang={lang} />
    </>
  );
}
