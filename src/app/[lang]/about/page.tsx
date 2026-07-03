import { getPage, getPagesBySection } from "@/lib/db";
import { getPageMeta } from "@/lib/pageMeta";
import AboutContentSection from "@/components/shared/AboutContentSection";
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
  const meta = getPageMeta("about", lang);

  const subRoutes: Record<string, string> = {
    background: `${base}/about/background`,
    culture: `${base}/about/culture`,
    goals: `${base}/about/goals`,
    board: `${base}/about/board`,
    governance: `${base}/about/governance`,
  };

  const filteredSubpages = subpages.filter((s) => s.id !== "about");
  const isOddCount = filteredSubpages.length % 2 !== 0;

  return (
    <div style={{ backgroundColor: "#F8FAFE" }}>
      <AboutContentSection
        title={title}
        content={content || ""}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
        bodyFontSize={15}
      />
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSubpages
              .map((s, idx) => {
                const isLast = idx === filteredSubpages.length - 1;
                return (
                <Link
                  key={s.id}
                  href={subRoutes[s.id] || `${base}/about/${s.id}`}
                  className={`block rounded-xl p-8 border border-[#E6EEFB] hover:-translate-y-0.5 transition-all duration-300 group ${
                    isLast && isOddCount ? "md:col-span-2 md:justify-self-center md:w-[calc(50%-0.75rem)]" : ""
                  }`}
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow:
                      "0 1px 3px rgba(15, 36, 82, 0.06), 0 4px 16px rgba(15, 36, 82, 0.07), 0 8px 32px rgba(15, 36, 82, 0.05)",
                  }}
                >
                  {/* ═══ 了解更多按鈕 hover 樣式 ═══ */}
                  <style>{`
                    .about-card-link {
                      transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
                      cursor: pointer;
                    }
                    .about-card-link:hover {
                      background-color: #0F2452;
                      color: #FFFFFF;
                      box-shadow: 0 4px 12px rgba(15, 36, 82, 0.2);
                    }
                    .about-card-link:hover .about-card-arrow {
                      stroke: #FFFFFF;
                      transform: translateX(2px);
                    }
                    .about-card-arrow {
                      transition: stroke 0.25s ease, transform 0.25s ease;
                    }
                  `}</style>

                  {/* 標題行：左側主副標題 + 右側了解更多按鈕 */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 8,
                      gap: 12,
                    }}
                  >
                    {/* 左：標題區 */}
                    <div>
                      <h3
                        style={{
                          fontSize: 30,
                          fontWeight: 700,
                          color: "#0A1429",
                          marginBottom: 4,
                        }}
                      >
                        {lang === "zh" ? s.title_zh : s.title_en}
                      </h3>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#888E9C",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {lang === "zh" ? s.title_en : s.title_zh}
                      </p>
                    </div>

                    {/* 右：了解更多按鈕 */}
                    <span
                      className="about-card-link"
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
                        className="about-card-arrow"
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
                      fontSize: 15,
                      color: "#444A58",
                      lineHeight: 1.6,
                      textIndent: "2em",
                    }}
                  >
                    {lang === "zh" ? s.content_zh?.substring(0, 40) : s.content_en?.substring(0, 60)}
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
