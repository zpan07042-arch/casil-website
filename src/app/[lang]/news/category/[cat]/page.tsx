import { getAnnouncementsByCategory } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import Link from "next/link";
import { notFound } from "next/navigation";

const categoryLabels: Record<string, { zh: string; en: string }> = {
  results: { zh: "业绩公告", en: "Results Announcements" },
  cooperation: { zh: "合作动态", en: "Cooperation Updates" },
  rd: { zh: "科研资讯", en: "R&D News" },
  major: { zh: "公司重大事项", en: "Major Corporate Events" },
};

export default async function NewsCategoryPage({
  params,
}: {
  params: Promise<{ lang: string; cat: string }>;
}) {
  const { lang, cat } = await params;
  const base = `/${lang}`;

  const announcements = getAnnouncementsByCategory(cat);
  if (announcements.length === 0) notFound();

  const catLabel = categoryLabels[cat];

  return (
    <>
      <BackButton href={`${base}/news`} />
      <section className="pt-4 pb-16 md:pt-6 md:pb-24">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary mb-12">
            {catLabel ? (lang === "zh" ? catLabel.zh : catLabel.en) : cat}
          </h1>

          <div className="space-y-1">
            {announcements.map((a) => (
              <Link
                key={a.id}
                href={a.pdf_url || "#"}
                target={a.pdf_url ? "_blank" : undefined}
                rel={a.pdf_url ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-black/[0.03] transition-colors group"
              >
                <span className="text-sm text-text-primary group-hover:text-brand transition-colors">
                  {lang === "zh" ? a.title_zh : (a.title_en || a.title_zh)}
                </span>
                <span className="text-xs text-text-secondary flex-shrink-0 ml-4">
                  {a.date || a.year}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
