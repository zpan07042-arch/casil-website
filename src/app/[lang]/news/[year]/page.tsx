import { getAnnouncementsByYear, getAllYears } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import Link from "next/link";
import { notFound } from "next/navigation";

const categoryLabels: Record<string, { zh: string; en: string }> = {
  results: { zh: "业绩报告", en: "Results Announcements" },
  cooperation: { zh: "合作动态", en: "Cooperation Updates" },
  rd: { zh: "科研资讯", en: "R&D News" },
  major: { zh: "公司重大事项", en: "Major Corporate Events" },
};

const categoryOrder = ["results", "cooperation", "rd", "major"];

export default async function NewsYearPage({
  params,
}: {
  params: Promise<{ lang: string; year: string }>;
}) {
  const { lang, year } = await params;
  const base = `/${lang}`;
  const yearNum = parseInt(year);
  if (isNaN(yearNum)) notFound();

  const announcements = await getAnnouncementsByYear(yearNum);
  const years = await getAllYears();

  if (announcements.length === 0) notFound();

  const grouped = announcements.reduce(
    (acc, a) => {
      const cat = a.category || "major";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(a);
      return acc;
    },
    {} as Record<string, typeof announcements>
  );

  return (
    <>
      <BackButton href={`${base}/news`} />
      <section className="pt-4 pb-16 md:pt-6 md:pb-24">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary mb-10">
            {lang === "zh" ? `${year} 年公告` : `${year} Announcements`}
          </h1>

          {years.length > 0 && (
            <div className="mb-16 bg-bg-secondary/50 rounded-none py-5 px-5 -mx-5 md:-mx-8 md:px-8">
              <div className="flex flex-wrap gap-3">
                {years.map((y) => (
                  <Link
                    key={y}
                    href={`/${lang}/news/${y}`}
                    className={`inline-flex items-center px-5 py-2.5 rounded-none text-base font-medium transition-colors ${
                      Number(y) === yearNum
                        ? "bg-brand text-white"
                        : "bg-white text-text-secondary hover:bg-brand/10 hover:text-brand border border-divider"
                    }`}
                  >
                    {y}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {categoryOrder.map((cat) => {
            const items = grouped[cat];
            if (!items || items.length === 0) return null;
            const label = categoryLabels[cat];
            return (
              <div key={cat} className="mb-12 last:mb-0">
                <h2 className="text-lg font-semibold text-brand mb-4 tracking-wide">
                  {lang === "zh" ? label.zh : label.en}
                  <span className="text-text-secondary font-normal text-sm ml-2">
                    ({items.length})
                  </span>
                </h2>
                <div className="space-y-2">
                  {items.map((a) => (
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
            );
          })}
        </div>
      </section>
    </>
  );
}