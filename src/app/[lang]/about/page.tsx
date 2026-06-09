import { getPage, getPagesBySection } from "@/lib/db";
import ContentSection from "@/components/shared/ContentSection";
import Link from "next/link";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = `/${lang}`;
  const page = await getPage("about");
  const subpages = await getPagesBySection("about");

  if (!page) return <p className="p-20 text-center text-text-secondary">Content not found.</p>;

  const title = lang === "zh" ? page.title_zh : page.title_en;
  const content = lang === "zh" ? page.content_zh : page.content_en;

  const subRoutes: Record<string, string> = {
    background: `${base}/about/background`,
    culture: `${base}/about/culture`,
    goals: `${base}/about/goals`,
    board: `${base}/about/board`,
    governance: `${base}/about/governance`,
  };

  return (
    <>
      <ContentSection title={title} content={content || ""} />
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subpages
              .filter((s) => s.id !== "about")
              .map((s) => (
                <Link
                  key={s.id}
                  href={subRoutes[s.id] || `${base}/about/${s.id}`}
                  className="block bg-bg-secondary rounded-2xl p-8 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-brand transition-colors">
                    {lang === "zh" ? s.title_zh : s.title_en}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {lang === "zh" ? s.content_zh?.substring(0, 80) : s.content_en?.substring(0, 80)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
