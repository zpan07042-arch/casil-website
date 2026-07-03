import { getPage, getLinks } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import ContentSection from "@/components/shared/ContentSection";

export default async function LinksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const page = await getPage("links");
  const links = await getLinks();

  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const content = lang === "zh" ? page.content_zh : page.content_en;
  const title = lang === "zh" ? page.title_zh : page.title_en;
  const meta = getPageMeta("links", lang);

  return (
    <>
      <ContentSection
        title={title}
        content={content || ""}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
        bodyFontSize={18}
      />
      {links.length > 0 && (
        <section className="py-16 bg-bg-secondary">
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl p-6 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand transition-colors">
                    {lang === "zh" ? link.name_zh : (link.name_en || link.name_zh)}
                  </h3>
                  <span className="text-brand text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    {lang === "zh" ? "訪問網站" : "Visit"} →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
