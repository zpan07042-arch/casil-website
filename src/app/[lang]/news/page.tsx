import { getPage } from "@/lib/db";
import BackButton from "@/components/shared/BackButton";
import ContentSection from "@/components/shared/ContentSection";
import Link from "next/link";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = `/${lang}`;
  const page = getPage("news");

  const title = page && lang === "zh" ? page.title_zh : (page?.title_en || "News Center");
  const content = page && lang === "zh" ? (page.content_zh || "") : (page?.content_en || "");

  const cards = [
    {
      title: lang === "zh" ? "公告" : "Announcements",
      desc: lang === "zh" ? "查看按年份分类的公司公告及业绩报告" : "Browse company announcements and results reports by year",
      href: `${base}/news/all`,
    },
    {
      title: lang === "zh" ? "公告（补发已遗失的股份证明书）" : "Replacement of Lost Share Certificates",
      desc: lang === "zh" ? "补发已遗失股份证明书的公告" : "Announcements on replacement of lost share certificates",
      href: `${base}/news/anno`,
    },
    {
      title: lang === "zh" ? "公司资讯" : "Company News",
      desc: lang === "zh" ? "了解公司最新动态与发展资讯" : "Latest company developments and news",
      href: `${base}/company-news`,
    },
    {
      title: lang === "zh" ? "向股东发放公司通讯的渠道" : "Means of Communication with Shareholders",
      desc: lang === "zh" ? "公司向股东发送通讯的方式与渠道说明" : "How the company communicates with its shareholders",
      href: `${base}/shareholder`,
    },
  ];

  return (
    <>
      <BackButton href={base} />
      <ContentSection title={title} content={content} />
      <section className="pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="block bg-bg-secondary rounded-2xl p-8 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group"
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-brand transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
