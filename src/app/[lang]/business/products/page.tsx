import { getPage } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import PageBanner from "@/components/shared/PageBanner";
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
  const content = lang === "zh" ? page.content_zh : page.content_en;
  const meta = getPageMeta("products", lang);

  return (
    <>
      <PageBanner
        title={title}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />
      <ProductsSection title={title} content={content || ""} lang={lang} />
    </>
  );
}
