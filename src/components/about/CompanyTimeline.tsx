"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
      { year: "1975.7", title: "成立", body: "航天控股前身 —— 康力投資有限公司（以下簡稱康力投資）在中國香港成立。", color: "#FF6B6B" },
      { year: "1981.8", title: "上市", body: "康力投資在香港聯交所上市，是香港當時規模最大的電子信息產業集團，主要從事電視機生產銷售。", color: "#4ECDC4" },
      { year: "1993.5", title: "收購", body: "航天總公司收購康力投資股權進入香港資本市場，康力投資更名為航天科技國際集團有限公司。", color: "#FFD93D" },
      { year: "1999.7", title: "劃歸集團", body: "航天科技國際集團有限公司劃歸中國航天科技集團公司管理。", color: "#6BCB77" },
      { year: "2008.1", title: "更名", body: "為適應集團公司第四次工作會確定的發展戰略，公司更名為中國航天國際控股有限公司。", color: "#45B7D1" },
    ];
    const en = [
      { year: "1975.7", title: "Founded", body: "The predecessor of CASIL — Conic Investment Co., Ltd. was established in Hong Kong, China.", color: "#FF6B6B" },
      { year: "1981.8", title: "Listed", body: "Conic Investment was listed on the Hong Kong Stock Exchange, becoming the largest electronics & information industry group in Hong Kong at that time, primarily engaged in TV manufacturing and sales.", color: "#4ECDC4" },
      { year: "1993.5", title: "Acquired", body: "China Aerospace Corporation acquired Conic Investment shares to enter the Hong Kong capital market; Conic Investment was renamed Aerospace Science and Technology International Group Limited.", color: "#FFD93D" },
      { year: "1999.7", title: "Transferred", body: "Aerospace Science and Technology International Group Limited was transferred to China Aerospace Science and Technology Corporation (CASC).", color: "#6BCB77" },
      { year: "2008.1", title: "Renamed", body: "To align with the development strategy set at CASC's 4th Work Conference, the Company was renamed China Aerospace International Holdings Limited.", color: "#45B7D1" },
    ];
    return isZh ? zh : en;
  }, [isZh]);

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const toggleEvent = useCallback((i: number) => {
    setActiveIdx(prev => prev === i ? null : i);
  }, []);

  const activeContent = activeIdx !== null ? events[activeIdx] : null;
  const contentColor = activeIdx !== null ? events[activeIdx].color : "#ffffff";

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
          {/* Line 3: English / Chinese name */}
          <p className="mt-2 text-sm md:text-base text-[#555555]">
            {isZh
              ? "China Aerospace International Holdings Limited"
              : "中國航天國際控股有限公司"}
          </p>
        </FadeInSection>

        {/* ==================== DIVIDER 1 ==================== */}
        <FadeInSection className="flex justify-center py-6 md:py-8">
          <div className="h-px bg-[#0F4C81]" style={{ width: "64px" }} />
        </FadeInSection>

        {/* ==================== BACKGROUND SECTION HEADER ==================== */}
        <FadeInSection>
          <div className="mb-6">
            <p style={{ fontSize: 11, color: "#888E9C", letterSpacing: "0.06em", lineHeight: 1 }}>
              BACKGROUND
            </p>
            <h2 style={{ fontSize: 30, fontWeight: 700, color: "#0A1429", marginTop: 8 }}>
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
            <div style={{ fontSize: 15, lineHeight: 1.6, color: "#444A58", textAlign: "justify", textIndent: "2em" }}>
              {content || (
                isZh
                  ? "中國航天國際控股有限公司 ( 航天控股 ) 是中國航天科技集團公司 ( 中國航天 ) 在香港的上市公司 ( 股份代號：31 )。中國航天作為航天控股的大股東，是中國進行空間技術和產品 ( 航天器、運載火箭、衞星等 ) 的開發、研究、生產和商用的企業，擁有雄厚的專業人才資源和技術力量優勢。 為配合集團新的發展戰略和發展方向，本公司已將其中文名稱改為「中國航天國際控股有限公司」（股份簡稱 ：「航天控股」)。新名稱亦藴涵了本公司與主要股東中國航天緊密相連的關係和未來在業務上互動發展的深層意義。"
                  : "China Aerospace International Holdings Limited (CASIL) is a Hong Kong-listed company (Stock Code: 31) of China Aerospace Science and Technology Corporation (CASC). As the majority shareholder of CASIL, CASC is an enterprise engaged in the development, research, production and commercial application of space technology and products (spacecraft, launch vehicles, satellites, etc.), possessing strong professional talent resources and technological advantages."
              )}
            </div>
          </div>
        </FadeInSection>

        {/* ==================== DEVELOPMENT HISTORY SECTION ==================== */}
        <FadeInSection>
          <div className="mb-10">
            {/* English uppercase label on top — matches standard helper color */}
            <p style={{ fontSize: 11, color: "#888E9C", letterSpacing: "0.06em", lineHeight: 1 }} className="leading-none">
              DEVELOPMENT HISTORY
            </p>
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

            <div className="relative z-10 px-8 md:px-16 py-12 md:py-16 flex flex-col justify-center" style={{ minHeight: 480 }}>
              {/* Main horizontal timeline */}
              <div className="relative flex items-center">
                <div
                  className="absolute inset-y-1/2 left-0 right-0 -translate-y-1/2"
                  style={{ height: 2, background: "rgba(255,255,255,0.15)" }}
                />
                {events.map((ev, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center relative z-10 py-2">
                      <button onClick={() => toggleEvent(i)} className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div
                          className="rounded-full border-2 border-[#001433] transition-all duration-300 flex items-center justify-center"
                          style={{
                            width: isActive ? 22 : 16,
                            height: isActive ? 22 : 16,
                            background: ev.color,
                            boxShadow: isActive ? `0 0 20px ${ev.color}` : `0 0 8px ${ev.color}60`,
                          }}
                        >
                          {isActive && <div className="w-2 h-2 rounded-full bg-white/60" />}
                        </div>
                        <span
                          className="text-sm md:text-base font-bold transition-colors duration-200 mt-1"
                          style={{ color: "#FFFFFF" }}
                        >
                          {ev.title}
                        </span>
                        <span
                          className="text-[13px] transition-colors duration-200"
                          style={{ color: "#FFFFFF", fontFamily: "var(--font-mono)", opacity: 0.75 }}
                        >
                          {ev.year}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Content panel */}
              <div
                className="overflow-hidden transition-all duration-400"
                style={{ maxHeight: activeContent ? 300 : 0, opacity: activeContent ? 1 : 0 }}
              >
                {activeContent && (
                  <div
                    className="mt-8 rounded-xl px-6 py-5 relative"
                    style={{ background: `${contentColor}12`, border: `1px solid ${contentColor}30` }}
                  >
                    <button
                      className="absolute top-3 right-3 text-white/40 hover:text-white/80 transition-colors"
                      onClick={() => setActiveIdx(null)}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg font-bold" style={{ color: "#FFFFFF", fontFamily: "var(--font-mono)" }}>{activeContent.year}</span>
                      <span className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>{activeContent.title}</span>
                    </div>
                    <p className="text-base leading-relaxed" style={{ color: "#FFFFFF", opacity: 0.85 }}>{activeContent.body}</p>
                  </div>
                )}
              </div>

              {/* Hint */}
              <p className="text-center text-[13px] mt-10" style={{ color: "#FFFFFF", opacity: 0.5, fontFamily: "var(--font-mono)" }}>
                {isZh ? "點擊時間節點查看詳情 · Click a point to view details" : "Click a point to view details · 點擊時間節點查看詳情"}
              </p>
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
