"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/data/I18nProvider";

/* ========== Scroll Fade-In Hook ========== */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 300ms ease-out, transform 300ms ease-out",
      }}
    >
      {children}
    </div>
  );
}

/* ========== Main Component ========== */
export default function CompanyTimeline({
  title: _title,
  content,
}: {
  title: string;
  content: string;
}) {
  const { lang } = useI18n();
  const isZh = lang === "zh";
  const events = useMemo(() => {
    const zh = [
      { year: "1975.7", title: "成立", body: "航天控股前身 —— 康力投資有限公司（以下簡稱康力投資）在中國香港成立。", color: "#E09090" },
      { year: "1981.8", title: "上市", body: "康力投資在香港聯交所上市，是香港當時規模最大的電子信息產業集團，主要從事電視機生產銷售。", color: "#E0C06A" },
      { year: "1993.5", title: "收購", body: "航天總公司收購康力投資股權進入香港資本市場，康力投資更名為航天科技國際集團有限公司。", color: "#D4A870" },
      { year: "1999.7", title: "劃歸集團", body: "航天科技國際集團有限公司劃歸中國航天科技集團公司管理。", color: "#C0A0D0" },
      { year: "2008.1", title: "更名", body: "為適應集團公司第四次工作會確定的發展戰略，公司更名為中國航天國際控股有限公司。", color: "#70B0D8" },
    ];
    const en = [
      { year: "1975.7", title: "Founded", body: "The predecessor of CASIL — Conic Investment Co., Ltd. was established in Hong Kong, China.", color: "#E09090" },
      { year: "1981.8", title: "Listed", body: "Conic Investment was listed on the Hong Kong Stock Exchange, becoming the largest electronics & information industry group in Hong Kong at that time, primarily engaged in TV manufacturing and sales.", color: "#E0C06A" },
      { year: "1993.5", title: "Acquired", body: "China Aerospace Corporation acquired Conic Investment shares to enter the Hong Kong capital market; Conic Investment was renamed Aerospace Science and Technology International Group Limited.", color: "#D4A870" },
      { year: "1999.7", title: "Transferred", body: "Aerospace Science and Technology International Group Limited was transferred to China Aerospace Science and Technology Corporation (CASC).", color: "#C0A0D0" },
      { year: "2008.1", title: "Renamed", body: "To align with the development strategy set at CASC's 4th Work Conference, the Company was renamed China Aerospace International Holdings Limited.", color: "#70B0D8" },
    ];
    return isZh ? zh : en;
  }, [isZh]);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const activeContent = hoveredIdx !== null ? events[hoveredIdx] : null;

  return (
    <div className="w-full" style={{ backgroundColor: "#F8FAFE" }}>
      <style>{`
        .timeline-page *::selection {
          background: rgba(15, 76, 129, 0.2);
          color: #ffffff;
        }
        .timeline-page *::-moz-selection {
          background: rgba(15, 76, 129, 0.2);
          color: #ffffff;
        }
      `}</style>
      <div className="timeline-page">
      <div className="mx-auto px-5 md:px-8" style={{ maxWidth: "1200px" }}>

        {/* ==================== HEADER: Company Name + Stock Code + English Name ==================== */}
        <FadeInSection className="pt-8 md:pt-12 text-center">
          {/* Line 1: Company name (Chinese) */}
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#000000] leading-tight">
            {isZh ? "中國航天國際控股有限公司" : "China Aerospace International Holdings Limited"}
          </h1>
          {/* Line 2: Stock code (no brackets) */}
          <p className="mt-3 text-sm md:text-base text-[#555555]">
            {isZh ? "股份代號：00031" : "Stock Code: 00031"}
          </p>
          {/* Line 3: English name (Chinese page only) */}
          {isZh && (
            <p className="mt-2 text-sm md:text-base text-[#555555]">
              China Aerospace International Holdings Limited
            </p>
          )}
        </FadeInSection>

        {/* ==================== DIVIDER 1 ==================== */}
        <FadeInSection className="flex justify-center py-6 md:py-8">
          <div className="h-px bg-[#0F4C81]" style={{ width: "64px" }} />
        </FadeInSection>

        {/* ==================== BACKGROUND SECTION HEADER ==================== */}
        <FadeInSection>
          <div className="mb-6">
            <h2 style={{ fontSize: 30, fontWeight: 700, color: "#0A1429", marginTop: 8 }} className="leading-none">
              {isZh ? "背景" : "Background"}
            </h2>
          </div>
        </FadeInSection>

        {/* ==================== COMPANY PROFILE CARD ==================== */}
        <FadeInSection className="mb-16 md:mb-20">
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 12,
              border: "1px solid #E6EEFB",
              padding: 32,
              boxShadow:
                "0 1px 3px rgba(15, 36, 82, 0.06), 0 4px 16px rgba(15, 36, 82, 0.07), 0 8px 32px rgba(15, 36, 82, 0.05)",
            }}
          >
            {/* ── 正文 ── */}
            <div style={{ fontSize: 18, lineHeight: 1.6, color: "#444A58", textAlign: "justify" }}>
              {(() => {
                const paragraphs = content
                  ? content.split("\n\n").filter(Boolean)
                  : isZh
                    ? [
                        "中國航天國際控股有限公司 ( 航天控股 ) 是中國航天科技集團公司 ( 中國航天 ) 在香港的上市公司 ( 股份代號：31 )。中國航天作為航天控股的大股東，是中國進行空間技術和產品 ( 航天器、運載火箭、衞星等 ) 的開發、研究、生產和商用的企業，擁有雄厚的專業人才資源和技術力量優勢。",
                        "為配合集團新的發展戰略和發展方向，本公司已將其中文名稱改為「中國航天國際控股有限公司」（股份簡稱 ：「航天控股」)。新名稱亦藴涵了本公司與主要股東中國航天緊密相連的關係和未來在業務上互動發展的深層意義。",
                      ]
                    : [
                        "China Aerospace International Holdings Limited (CASIL) is a Hong Kong-listed company (Stock Code: 31) of China Aerospace Science and Technology Corporation (CASC). As the majority shareholder of CASIL, CASC is an enterprise engaged in the development, research, production and commercial application of space technology and products (spacecraft, launch vehicles, satellites, etc.), possessing strong professional talent resources and technological advantages.",
                      ];
                return paragraphs.map((p, i) => (
                  <p key={i} style={{ textIndent: "2em", margin: i < paragraphs.length - 1 ? "0 0 18px" : "0" }}>
                    {p}
                  </p>
                ));
              })()}
            </div>
          </div>
        </FadeInSection>

        {/* ==================== DEVELOPMENT HISTORY SECTION ==================== */}
        <FadeInSection>
          <div className="mb-10">
            <h2 style={{ fontSize: 30, fontWeight: 700, color: "#0A1429", marginTop: 8 }} className="leading-none">
              {isZh ? "發展歷程" : "Development History"}
            </h2>
          </div>
        </FadeInSection>

        {/* ==================== DARK CARD TIMELINE ==================== */}
        <FadeInSection className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden" style={{ background: "#001433" }}>
            {/* Background image — screen blend */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                backgroundImage: "url('/images/yback.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center bottom",
                mixBlendMode: "screen",
                opacity: 0.55,
              }}
            />
            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,20,51,0.7) 100%)" }}
            />

            {/* Keyframe animations */}
            <style>{`
              @keyframes pulse-breath {
                0%, 100% { opacity: 0.5; transform: scale(1); }
                50% { opacity: 0.85; transform: scale(1.3); }
              }
              @keyframes popup-enter {
                from { opacity: 0; transform: translateY(8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            <div
              className="relative z-10 px-4 md:px-16 py-10 md:py-16"
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="relative w-full max-w-4xl mx-auto">

                {/* ---- Row 1: Dots + Line Segments ---- */}
                <div className="flex items-center justify-between w-full">
                  {events.map((ev, i) => {
                    const isHovered = hoveredIdx === i;
                    const dotSize = "clamp(12px, 1.8vw, 18px)";

                    return (
                      <Fragment key={i}>
                        {/* Node wrapper */}
                        <div
                          className="relative flex-shrink-0 flex items-center justify-center"
                          style={{ width: "clamp(38px, 5vw, 52px)", height: "clamp(38px, 5vw, 52px)" }}
                          onMouseEnter={() => setHoveredIdx(i)}
                        >
                          {/* Glow ring behind dot — pulses on hover */}
                          <div
                            className="absolute rounded-full pointer-events-none"
                            style={{
                              width: `calc(${dotSize} * 2.4)`,
                              height: `calc(${dotSize} * 2.4)`,
                              background: `radial-gradient(circle, ${ev.color}50 0%, ${ev.color}20 35%, transparent 70%)`,
                              opacity: isHovered ? 1 : 0,
                              animation: isHovered ? "pulse-breath 1.8s ease-in-out infinite" : "none",
                              transition: "opacity 300ms ease-out",
                            }}
                          />

                          {/* Dot */}
                          <div
                            className="rounded-full block relative transition-all duration-300 ease-out"
                            style={{
                              width: dotSize,
                              height: dotSize,
                              background: ev.color,
                              boxShadow: isHovered
                                ? `inset 0 0 0 1px rgba(255,255,255,0.3), 0 0 12px ${ev.color}60, 0 0 28px ${ev.color}30`
                                : "inset 0 0 0 1px rgba(255,255,255,0.25)",
                              filter: isHovered ? "saturate(1.4)" : "none",
                              transform: isHovered ? "scale(1.2)" : "scale(1)",
                              opacity: hoveredIdx !== null && !isHovered ? 0.35 : 1,
                            }}
                          />
                        </div>

                        {/* Line segment between nodes */}
                        {i < events.length - 1 && (
                          <div
                            className="flex-1 mx-1 transition-opacity duration-300 ease-out"
                            style={{
                              height: "2px",
                              background: "rgba(255,255,255,0.5)",
                              opacity:
                                hoveredIdx === i || hoveredIdx === i + 1
                                  ? 0.85
                                  : 0.5,
                            }}
                          />
                        )}
                      </Fragment>
                    );
                  })}
                </div>

                {/* ---- Row 2: Text Labels ---- */}
                <div className="flex items-center justify-between w-full" style={{ marginTop: 4 }}>
                  {events.map((ev, i) => {
                    const isHovered = hoveredIdx === i;

                    return (
                      <Fragment key={i}>
                        <div
                          className="flex flex-col items-center flex-shrink-0 gap-1 transition-all duration-300 ease-out"
                          style={{
                            width: "clamp(38px, 5vw, 52px)",
                            opacity: hoveredIdx !== null && !isHovered ? 0.35 : 1,
                            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                          }}
                          onMouseEnter={() => setHoveredIdx(i)}
                        >
                          <span
                            className="text-[11px] md:text-sm font-bold transition-all duration-300 text-center leading-tight"
                            style={{
                              color: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                              fontFamily: "var(--font-sans)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {ev.title}
                          </span>
                          <span
                            className="text-[10px] md:text-[13px] transition-all duration-300"
                            style={{
                              color: isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {ev.year}
                          </span>
                        </div>
                        {i < events.length - 1 && <div className="flex-1 mx-1" />}
                      </Fragment>
                    );
                  })}
                </div>

                {/* ---- Popup Panel ---- */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    maxHeight: activeContent ? "320px" : "0px",
                    opacity: activeContent ? 1 : 0,
                    marginTop: activeContent ? 28 : 0,
                  }}
                >
                  {activeContent && (
                    <div
                      className="rounded-xl px-6 py-5 mx-auto"
                      style={{
                        maxWidth: 520,
                        background: "rgba(10, 20, 41, 0.78)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        animation: "popup-enter 0.3s ease-out",
                      }}
                    >
                      {/* Event details */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold" style={{ color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>
                          {activeContent.year}
                        </span>
                        <span className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
                          {activeContent.title}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                        {activeContent.body}
                      </p>
                    </div>
                  )}
                </div>

                {/* ---- Hint ---- */}
                <p
                  className="text-center text-[13px] transition-opacity duration-300"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontFamily: "var(--font-mono)",
                    marginTop: 28,
                    opacity: activeContent ? 0 : 1,
                  }}
                >
                  {isZh ? "懸停時間節點查看詳情" : "Hover over a point to view details"}
                </p>

              </div>
            </div>
          </div>
        </FadeInSection>

        {/* ==================== FOOTER ==================== */}
        <FadeInSection>
          <div className="mt-[120px] mb-0">
            <div className="h-px w-full bg-[#0F4C81]" />
            <div className="py-8 text-center text-[14px] text-[#555555] leading-[1.6]">
              <p>
                {isZh
                  ? "© 2026 中國航天國際控股有限公司 版權所有"
                  : "© 2026 China Aerospace International Holdings Limited. All Rights Reserved."}
              </p>
              <p className="mt-1">
                {isZh
                  ? "香港聯合交易所有限公司上市編號：00031"
                  : "Stock Code on The Stock Exchange of Hong Kong Limited: 00031"}
              </p>
            </div>
          </div>
        </FadeInSection>

      </div>
      </div>
    </div>
  );
}
