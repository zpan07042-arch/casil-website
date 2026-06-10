import { getPage } from "@/lib/db";
import ContentSection from "@/components/shared/ContentSection";
import Link from "next/link";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = `/${lang}`;
  const page = await getPage("contact");

  const title = lang === "zh"
    ? (page?.title_zh || "聯繫我們")
    : (page?.title_en || "Contact Us");
  const content = lang === "zh"
    ? (page?.content_zh || "")
    : (page?.content_en || "");

  const cards = [
    {
      title: lang === "zh" ? "全球分支機構" : "Global Branches",
      desc: lang === "zh" ? "查看航天控股全球分支機構分佈與聯繫方式" : "View our global branch locations and contact information",
      href: `${base}/contact/branches`,
    },
    {
      title: lang === "zh" ? "政企合作入口" : "Government & Enterprise",
      desc: lang === "zh" ? "政府與企業合作對接渠道與服務窗口" : "Government and enterprise cooperation channels and services",
      href: `${base}/contact/government`,
    },
    {
      title: lang === "zh" ? "投資者諮詢通道" : "Investor Inquiries",
      desc: lang === "zh" ? "投資者關係諮詢與信息查詢服務" : "Investor relations inquiries and information services",
      href: `${base}/contact/investor`,
    },
    {
      title: lang === "zh" ? "人才招聘模塊" : "Careers",
      desc: lang === "zh" ? "加入航天控股，查看最新招聘信息與職位機會" : "Join CASIL and explore career opportunities",
      href: `${base}/contact/careers`,
    },
  ];

  return (
    <>
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
