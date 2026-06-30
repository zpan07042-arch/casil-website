"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/data/I18nProvider";

/* ========== Types ========== */
interface StageEvent {
  date: string;
  text: string;
}

interface Stage {
  year: string;
  title: string;
  events: StageEvent[];
}

/* ========== Data ========== */
const zhEvents1975 = [
  { date: "1975-07-25", text: "康力投資有限公司（Conic Investment）在香港註冊成立，創始人柯俊文（Alex Au），為康力集團控股公司，旗下涵蓋康力電子、志遠實業等，主營電子製造（電視機、音響、塑料件），擁有「Contec（康藝）」品牌。" },
  { date: "1979", text: "成立康力電影製作，涉足影視與唱片（簽約許冠文、徐小鳳等）；設康力電視工作室（後為先濤數碼前身）。" },
  { date: "1980", text: "成為香港最大電子製造商之一，員工超萬人，產品外銷全球。" },
  { date: "1984", text: "資金鏈危機，華潤 + 中銀集團通過新瓊公司收購 35% 股權入主；柯俊文等 6 名董事辭職，後涉財務醜聞（虛假會計、挪用資金），多名高管被捕，柯俊文離港。" },
  { date: "1986", text: "巨額虧損，主業轉向內地市場。" },
  { date: "1987", text: "新瓊嘗試私有化退市，未果。" },
];

const enEvents1975 = [
  { date: "1975-07-25", text: "Conic Investment Co., Ltd. was incorporated in Hong Kong by founder Alex Au (Ko Chun-man), serving as the holding company of the Conic Group. Its subsidiaries included Conic Electronics and Zhiyuan Industries, primarily engaged in electronics manufacturing (TV sets, audio equipment, plastic components) under the 'Contec' brand." },
  { date: "1979", text: "Established Conic Film Production, venturing into film, television and music records (signed Michael Hui, Paula Tsui and others); set up Conic Television Studio (later the predecessor of Centro Digital Pictures)." },
  { date: "1980", text: "Became one of Hong Kong's largest electronics manufacturers, with over 10,000 employees and products exported worldwide." },
  { date: "1984", text: "Capital chain crisis: China Resources and Bank of China Group acquired a 35% stake through Xinqiong Company; Alex Au and five other directors resigned. A financial scandal followed (false accounting, misappropriation of funds), multiple executives were arrested, and Alex Au left Hong Kong." },
  { date: "1986", text: "Massive losses; core business pivoted to the mainland China market." },
  { date: "1987", text: "Xinqiong attempted to privatize and delist the company, but the effort failed." },
];

const zhEvents1993 = [
  { date: "1993", text: "中國航天工業總公司（後重組為中國航天科技集團公司 CASC）通過子公司收購康力投資控股權，實現借殼上市。" },
  { date: "1995", text: "公司更名為「中國航天國際控股有限公司」，簡稱「航天控股」，正式納入航天系版圖。" },
  { date: "1997", text: "剝離部分非核心電子製造業務，聚焦航天相關產業方向。" },
  { date: "2000", text: "確立以航天服務、科技工業為核心的戰略定位。" },
  { date: "2005", text: "開始佈局衛星應用、航天技術轉化等新興業務領域。" },
  { date: "2008", text: "中國航天科技集團公司重組，航天控股作為集團海外資本平台地位進一步鞏固。" },
];

const enEvents1993 = [
  { date: "1993", text: "China Aerospace Industry Corporation (later restructured into CASC) acquired control of Conic Investment through a subsidiary, achieving a backdoor listing." },
  { date: "1995", text: "Renamed 'China Aerospace International Holdings Limited' (CASIL), officially incorporated into the aerospace group." },
  { date: "1997", text: "Divested some non-core electronics manufacturing operations, focusing on aerospace-related business directions." },
  { date: "2000", text: "Established strategic positioning with aerospace services and technological industries as the core." },
  { date: "2005", text: "Began laying out emerging business areas such as satellite applications and aerospace technology transfer." },
  { date: "2008", text: "CASC restructured; CASIL's position as the group's overseas capital platform was further consolidated." },
];

const zhEvents2010 = [
  { date: "2010", text: "加速發展航天服務業，涵蓋航天技術應用、信息服務等領域。" },
  { date: "2012", text: "深化高端製造佈局，切入精密零部件、新材料等細分賽道。" },
  { date: "2015", text: "響應「中國製造2025」戰略，加大智能製造投入，推動產業升級。" },
  { date: "2018", text: "優化業務結構，形成航天服務 + 科技工業雙輪驅動格局。" },
];

const enEvents2010 = [
  { date: "2010", text: "Accelerated development of aerospace service businesses, covering aerospace technology applications and information services." },
  { date: "2012", text: "Deepened high-end manufacturing layout, entering precision components and new materials sub-sectors." },
  { date: "2015", text: "Responded to the 'Made in China 2025' strategy, increased investment in smart manufacturing to drive industrial upgrading." },
  { date: "2018", text: "Optimized business structure, forming a dual-engine model of aerospace services + technological industries." },
];

const zhEvents2020 = [
  { date: "2020", text: "戰略性切入半導體封裝載板領域，啟動重大產業項目投資。" },
  { date: "2022", text: "半導體載板產線建設穩步推進，逐步形成產能規模。" },
  { date: "2024", text: "載板業務實現關鍵技術突破，產品良率達行業領先水平，市場認可度提升。" },
  { date: "2026", text: "持續強化半導體材料賽道佈局，推動產業價值重估，助力國家芯片產業自主可控。" },
];

const enEvents2020 = [
  { date: "2020", text: "Strategically entered the semiconductor packaging substrate sector, initiating major industrial project investments." },
  { date: "2022", text: "Semiconductor substrate production line construction progressed steadily, gradually building production capacity." },
  { date: "2024", text: "Achieved key technology breakthroughs in substrate business; product yield rates reached industry-leading levels with growing market recognition." },
  { date: "2026", text: "Continued strengthening semiconductor materials sector presence, driving industry value reassessment and supporting national chip industry self-reliance." },
];

const stagesData: Record<"zh" | "en", Stage[]> = {
  zh: [
    { year: "1975-1993", title: "康力時代（1975—1993）：香港電子業巨頭", events: zhEvents1975 },
    { year: "1993-2009", title: "航天入主（1993—2009）：央企借殼，更名轉型", events: zhEvents1993 },
    { year: "2010-2019", title: "轉型突破（2010—2019）：佈局航天服務，深耕高端製造", events: zhEvents2010 },
    { year: "2020-2026", title: "戰略升級（2020—2026）：半導體載板發力，產業價值重估", events: zhEvents2020 },
  ],
  en: [
    { year: "1975-1993", title: "Conic Era (1975–1993): Hong Kong Electronics Giant", events: enEvents1975 },
    { year: "1993-2009", title: "Aerospace Takeover (1993–2009): Central Enterprise Backdoor Listing & Transformation", events: enEvents1993 },
    { year: "2010-2019", title: "Transformation Breakthrough (2010–2019): Expanding Aerospace Services & Advancing High-End Manufacturing", events: enEvents2010 },
    { year: "2020-2026", title: "Strategic Upgrade (2020–2026): Semiconductor Substrate Push & Industry Value Reassessment", events: enEvents2020 },
  ],
};

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

/* ========== FadeInSection Wrapper ========== */
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
  const stages = stagesData[lang] || stagesData.zh;
  const isZh = lang === "zh";

  /* ---- horizontal timeline scroll detection ---- */
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, stages]);

  /* ---- highlight CASIL & CASC names in content ---- */
  function renderContent(text: string) {
    if (!isZh) return <p className="text-base leading-[1.6] text-[#333333] text-justify" style={{ textIndent: "2em" }}>{text}</p>;

    // Split text to highlight specific terms
    const cascName = "中國航天科技集團公司";
    const casilName = "中國航天國際控股有限公司";

    // Build regex that matches either term
    const regex = new RegExp(`(${cascName}|${casilName})`, "g");
    const parts = text.split(regex);

    return (
      <p className="text-lg leading-[1.8] text-[#333333] text-justify" style={{ textIndent: "2em" }}>
        {parts.map((part, i) => {
          if (part === cascName) {
            return (
              <strong key={i} className="font-bold text-[#C8102E]">
                {part}
              </strong>
            );
          }
          if (part === casilName) {
            return (
              <strong key={i} className="font-bold text-[#111111]">
                {part}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  }

  return (
    <div className="w-full" style={{ background: "#F8FAFC" }}>
      {/* Text selection styling per design spec */}
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
      <div className="mx-auto px-5 md:px-0" style={{ maxWidth: "800px" }}>

        {/* ==================== MAIN TITLE ==================== */}
        <FadeInSection className="pt-[120px] text-center">
          <p className="text-base md:text-lg text-[#333333]">
            {isZh
              ? "China Aerospace International Holdings Limited"
              : "中國航天國際控股有限公司 (股份代號：31)"}
          </p>
          <h1 className="mt-2 text-xl md:text-2xl lg:text-3xl font-bold text-[#0F4C81] leading-tight">
            {isZh ? "中國航天國際控股有限公司" : "China Aerospace International Holdings Limited"}
            {isZh && (
              <>
                {" "}
                <span className="text-xs md:text-sm">(股份代號：00031)</span>
              </>
            )}
          </h1>
        </FadeInSection>

        {/* ==================== DIVIDER 1 ==================== */}
        <FadeInSection className="flex justify-center py-16">
          <div className="h-px bg-[#0F4C81]" style={{ width: "64px" }} />
        </FadeInSection>

        {/* ==================== BACKGROUND SECTION ==================== */}
        <FadeInSection>
          <div className="mb-6">
            <h2 className="text-[24px] font-bold text-[#555555] leading-none">
              {isZh ? "背景" : "Background"}
            </h2>
            <p className="text-[16px] text-[#555555] mt-2 leading-none">
              {isZh ? "Background" : "背景"}
            </p>
          </div>
          <div className="mt-6">
            {content ? (
              renderContent(content)
            ) : (
              <p className="text-lg leading-[1.8] text-[#333333] text-justify" style={{ textIndent: "2em" }}>
                {isZh
                  ? "中國航天國際控股有限公司 ( 航天控股 ) 是中國航天科技集團公司 ( 中國航天 ) 在香港的上市公司 ( 股份代號：31 )。中國航天作為航天控股的大股東，是中國進行空間技術和產品 ( 航天器、運載火箭、衞星等 ) 的開發、研究、生產和商用的企業，擁有雄厚的專業人才資源和技術力量優勢。 為配合集團新的發展戰略和發展方向，本公司已將其中文名稱改為「中國航天國際控股有限公司」（股份簡稱 ：「航天控股」)。新名稱亦藴涵了本公司與主要股東中國航天緊密相連的關係和未來在業務上互動發展的深層意義。"
                  : "China Aerospace International Holdings Limited (CASIL) is a Hong Kong-listed company (Stock Code: 31) of China Aerospace Science and Technology Corporation (CASC). As the majority shareholder of CASIL, CASC is an enterprise engaged in the development, research, production and commercial application of space technology and products (spacecraft, launch vehicles, satellites, etc.), possessing strong professional talent resources and technological advantages."}
              </p>
            )}
          </div>
        </FadeInSection>

        {/* ==================== DIVIDER 2 ==================== */}
        <FadeInSection className="flex justify-center py-16">
          <div className="h-px bg-[#0F4C81]" style={{ width: "64px" }} />
        </FadeInSection>

        {/* ==================== TIMELINE SECTION ==================== */}
        <FadeInSection>
          <div className="mb-6">
            <h2 className="text-[24px] font-bold text-[#555555] leading-none">
              {isZh ? "發展歷程" : "Development History"}
            </h2>
            <p className="text-[16px] text-[#555555] mt-2 leading-none">
              {isZh ? "Development History" : "發展歷程"}
            </p>
          </div>
        </FadeInSection>

        {/* ========== DESKTOP/TABLET: Dropship-Style Horizontal Timeline (≥768px) ========== */}
        <div className="hidden md:block relative">
          <div className="overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
            <div className="relative" style={{ minWidth: "max-content" }}>
              {/* Horizontal connector line: positioned at year-bottom(36px) + 16px gap */}
              <div
                className="absolute left-8 right-8 h-px"
                style={{ top: "52px", background: "#0F4C81", opacity: 0.5 }}
              />
              {/* Nodes row */}
              <div className="flex px-8 gap-16 lg:gap-24">
                {stages.map((stage, stageIdx) => (
                  <FadeInSection key={stageIdx}>
                    <div
                      className="group flex flex-col items-center"
                      style={{ width: stage.events.length > 0 ? "320px" : "200px" }}
                    >
                      {/* Year — above the line */}
                      <span className="text-[32px] lg:text-[36px] font-bold text-[#0F4C81] text-center leading-none whitespace-nowrap">
                        {stage.year}
                      </span>
                      {/* Spacer: 16px to line + 1px line + 16px from line = 33px */}
                      <div style={{ height: "33px", flexShrink: 0 }} />
                      {/* Stage title — below the line, centered */}
                      <span className="text-[16px] lg:text-[18px] font-bold text-[#333333] text-center leading-snug md:group-hover:text-[#0F4C81]">
                        {stage.title}
                      </span>
                      {/* Events list */}
                      {stage.events.length > 0 && (
                        <div className="mt-6 w-full space-y-4">
                          {stage.events.map((event, eventIdx) => (
                            <div key={eventIdx} className="flex gap-2">
                              <span className="text-[14px] lg:text-[16px] font-bold text-[#555555] whitespace-nowrap flex-shrink-0 leading-[1.8]">
                                {event.date}
                              </span>
                              <span className="text-[14px] lg:text-[16px] text-[#333333] leading-[1.8]">
                                {event.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </div>

          {/* Right-edge scroll indicator */}
          {canScrollRight && (
            <div
              className="absolute right-0 top-0 bottom-0 pointer-events-none"
              style={{
                width: "64px",
                background: "linear-gradient(90deg, transparent, rgba(248, 250, 252, 0.95))",
              }}
            />
          )}
        </div>

        {/* ========== MOBILE: Vertical Timeline (<768px) ========== */}
        <div className="md:hidden relative" style={{ paddingLeft: "32px", paddingRight: "32px" }}>
          {/* Continuous vertical line */}
          <div
            className="absolute top-0 bottom-0"
            style={{ left: "32px", width: "1px", background: "#0F4C81", opacity: 0.5 }}
          />
          {stages.map((stage, stageIdx) => (
            <FadeInSection key={stageIdx}>
              <div className="group" style={{ marginTop: stageIdx === 0 ? "0px" : "48px" }}>
                {/* Dot + header */}
                <div className="relative flex items-center" style={{ marginLeft: "-32px" }}>
                  <div
                    className="absolute rounded-full bg-[#0F4C81]"
                    style={{ left: "32px", width: "8px", height: "8px", transform: "translateX(-3.5px)" }}
                  />
                  <div className="ml-4">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-[20px] font-bold text-[#0F4C81] whitespace-nowrap">
                        {stage.year}
                      </span>
                      <span className="text-[18px] font-bold text-[#333333]">
                        {stage.title}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Events */}
                {stage.events.length > 0 && (
                  <div className="mt-4 space-y-6">
                    {stage.events.map((event, eventIdx) => (
                      <div key={eventIdx} className="flex gap-4">
                        <span
                          className="text-[16px] font-bold text-[#555555] whitespace-nowrap flex-shrink-0 leading-[1.8]"
                          style={{ width: isZh ? "100px" : "110px" }}
                        >
                          {event.date}
                        </span>
                        <p className="text-[16px] text-[#333333] leading-[1.8] text-justify">
                          {event.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>

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
