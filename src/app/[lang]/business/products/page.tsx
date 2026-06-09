import { getPage } from "@/lib/db";
import ProductsSection from "@/components/products/ProductsSection";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("products");
  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;

  return (
    <>
      <ProductsSection title={title} lang={lang} />
    </>
  );
}
