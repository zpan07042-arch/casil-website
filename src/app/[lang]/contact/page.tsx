import { getPage } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import AboutContentSection from "@/components/shared/AboutContentSection";
import Link from "next/link";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = `/${lang}`;
  const page = await getPage("contact");
  const meta = getPageMeta("contact", lang);

  const title = lang === "zh"
    ? (page?.title_zh || "聯繫我們")
    : (page?.title_en || "Contact Us");
  const content = lang === "zh"
    ? (page?.content_zh || "")
    : (page?.content_en || "");

  const cards = [
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
    <div style={{ backgroundColor: "#F8FAFE" }}>
      <AboutContentSection
        title={title}
        content={content}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => {
              const enLabels: Record<string, string> = {
                "投資者諮詢通道": "Investor Inquiries",
                "Investor Inquiries": "Investor Inquiries",
                "人才招聘模塊": "Careers",
                "Careers": "Careers",
              };
              const enLabel = enLabels[card.title] || "";
              return (
              <Link
                key={card.href}
                href={card.href}
                className="block rounded-xl p-8 border border-[#E6EEFB] hover:-translate-y-0.5 transition-all duration-300 group"
              style={{
                backgroundColor: "#FFFFFF",
                boxShadow:
                  "0 1px 3px rgba(15, 36, 82, 0.06), 0 4px 16px rgba(15, 36, 82, 0.07), 0 8px 32px rgba(15, 36, 82, 0.05)",
              }}
              >
                {/* ═══ 了解更多按鈕 hover 樣式 ═══ */}
                <style>{`
                  .contact-card-link {
                    transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
                    cursor: pointer;
                  }
                  .contact-card-link:hover {
                    background-color: #0F2452;
                    color: #FFFFFF;
                    box-shadow: 0 4px 12px rgba(15, 36, 82, 0.2);
                  }
                  .contact-card-link:hover .contact-card-arrow {
                    stroke: #FFFFFF;
                    transform: translateX(2px);
                  }
                  .contact-card-arrow {
                    transition: stroke 0.25s ease, transform 0.25s ease;
                  }
                `}</style>

                {/* 標題行 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 8,
                    gap: 12,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: 30,
                        fontWeight: 700,
                        color: "#0A1429",
                        marginBottom: 4,
                      }}
                    >
                      {card.title}
                    </h3>
                    {enLabel && (
                      <p
                        style={{
                          fontSize: 11,
                          color: "#888E9C",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {enLabel}
                      </p>
                    )}
                  </div>

                  {/* 了解更多按鈕 */}
                  <span
                    className="contact-card-link"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      backgroundColor: "#E6EEFB",
                      color: "#0F2452",
                      fontSize: 13,
                      fontWeight: 500,
                      padding: "8px 18px",
                      borderRadius: 6,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {lang === "zh" ? "了解更多" : "Learn More"}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="contact-card-arrow"
                      style={{ flexShrink: 0 }}
                    >
                      <path
                        d="M1 11L11 1M11 1H3.5M11 1V8.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* 分割線 */}
                <div
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#E9EEF7",
                    marginBottom: 12,
                  }}
                />
                <p
                  style={{
                    fontSize: 18,
                    color: "#444A58",
                    lineHeight: 1.6,
                    textIndent: "2em",
                  }}
                >
                  {card.desc}
                </p>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
