"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/components/data/I18nProvider";

interface StageEvent {
  date: string;
  text: string;
}

interface Stage {
  year: string;
  title: string;
  events: StageEvent[];
}

const stagesData: Record<"zh" | "en", Stage[]> = {
  zh: [
    {
      year: "1975-1993",
      title: "康力時代（1975—1993）：香港電子業巨頭",
      events: [
        { date: "1975-07-25", text: "康力投資有限公司（Conic Investment）在香港註冊成立，創始人柯俊文（Alex Au），為康力集團控股公司，旗下涵蓋康力電子、志遠實業等，主營電子製造（電視機、音響、塑料件），擁有「Contec（康藝）」品牌。" },
        { date: "1979", text: "成立康力電影製作，涉足影視與唱片（簽約許冠文、徐小鳳等）；設康力電視工作室（後為先濤數碼前身）。" },
        { date: "1980", text: "成為香港最大電子製造商之一，員工超萬人，產品外銷全球。" },
        { date: "1984", text: "資金鏈危機，華潤 + 中銀集團通過新瓊公司收購 35% 股權入主；柯俊文等 6 名董事辭職，後涉財務醜聞（虛假會計、挪用資金），多名高管被捕，柯俊文離港。" },
        { date: "1986", text: "巨額虧損，主業轉向內地市場。" },
        { date: "1987", text: "新瓊嘗試私有化退市，未果。" },
      ],
    },
    {
      year: "1993-2009",
      title: "航天入主（1993—2009）：央企借殼，更名轉型",
      events: [
        { date: "1993", text: "中國航天工業總公司收購康力投資，實現借殼上市；更名為中國航天國際控股有限公司（CASIL），英文名稱 China Aerospace International Holdings 沿用至今。" },
        { date: "1999-07-01", text: "母公司重組，隸屬新成立的中國航天科技集團（CASC）。" },
        { date: "2008", text: "中文簡稱正式定為航天控股，強化航天品牌定位。" },
        { date: "2009", text: "業務以注塑、智能充電器、線路板（PCB）等電子製造為主，同時持有深圳航天科技廣場物業，「有航天之名，無航天之實」。" },
      ],
    },
    {
      year: "2010-2019",
      title: "轉型突破（2010—2019）：佈局航天服務，深耕高端製造",
      events: [
        { date: "2010-02", text: "配股募資 5.81 億港元，宣佈轉型宇航服務與航天地產；核心投向海南文昌發射場配套區（6100 畝）與深圳航天國際中心，規劃航天主題公園（2013 年目標）。" },
        { date: "2011-2015", text: "推進小衛星研發、航天配套服務、高端物業運營；工業製造升級，拓展液晶顯示器、智能功率模組等。" },
        { date: "2016-2020", text: "十三五期間，營收由 30.88 億港元增至 35.80 億港元，淨利潤 3.79—12.03 億港元，累計分紅 2.78 億港元；深圳航天科技廣場投入運營；退出海南文昌項目，聚焦主業。" },
        { date: "2019", text: "啟動市場化改革與法人治理完善，剝離非核心資產，確立先進製造 + 物業運營雙主業。" },
      ],
    },
    {
      year: "2020-2026",
      title: "戰略升級（2020—2026）：半導體載板發力，產業價值重估",
      events: [
        { date: "2021-04", text: "聯營公司深圳瑞華泰（PI 薄膜）上市，持股 23.38%，佈局高端材料。" },
        { date: "2022-08", text: "1 億元認購瑞華泰可轉債，強化先進材料協同。" },
        { date: "2023-2024", text: "南通康源 IC 載板項目啟動，總投資 50 億元，一期 15 億元，設計年產能 24 萬平方米，瞄準國內載板前三。" },
        { date: "2025", text: "上半年南通項目試產 + 量產爬坡，載板業務收入同比增 11.42%；集團營收 40.31 億港元（+4.9%），工業製造（注塑、PCB）貢獻主要利潤。" },
        { date: "2026-05", text: "當前業務：工業製造（注塑/模具）、電子製造（PCB/載板）、資產運營（深圳航天科技廣場）；南通載板項目成為核心增長引擎，深度綁定半導體國產替代。" },
      ],
    },
  ],
  en: [
    {
      year: "1975-1993",
      title: "Conic Era (1975–1993): Hong Kong Electronics Giant",
      events: [
        { date: "1975-07-25", text: "Conic Investment Co., Ltd. was incorporated in Hong Kong by founder Alex Au (Ko Chun-man), serving as the holding company of the Conic Group. Its subsidiaries included Conic Electronics and Zhiyuan Industries, primarily engaged in electronics manufacturing (TV sets, audio equipment, plastic components) under the 'Contec' (Kangyi) brand." },
        { date: "1979", text: "Established Conic Film Production, venturing into film, television and music records (signed Michael Hui, Paula Tsui and others); set up Conic Television Studio (later the predecessor of Centro Digital Pictures)." },
        { date: "1980", text: "Became one of Hong Kong's largest electronics manufacturers, with over 10,000 employees and products exported worldwide." },
        { date: "1984", text: "Capital chain crisis: China Resources and Bank of China Group acquired a 35% stake through Xinqiong Company; Alex Au and five other directors resigned. A financial scandal followed (false accounting, misappropriation of funds), multiple executives were arrested, and Alex Au left Hong Kong." },
        { date: "1986", text: "Massive losses; core business pivoted to the mainland China market." },
        { date: "1987", text: "Xinqiong attempted to privatize and delist the company, but the effort failed." },
      ],
    },
    {
      year: "1993-2009",
      title: "Aerospace Takeover (1993–2009): Central Enterprise Backdoor Listing & Transformation",
      events: [
        { date: "1993", text: "China Aerospace Industry Corporation acquired Conic Investment, achieving a backdoor listing. The company was renamed China Aerospace International Holdings Limited (CASIL), a name that remains in use today." },
        { date: "1999-07-01", text: "Parent company restructured; CASIL became a subsidiary of the newly established China Aerospace Science and Technology Corporation (CASC)." },
        { date: "2008", text: "The Chinese short name was officially designated as 航天控股 (Aerospace Holdings), strengthening the aerospace brand positioning." },
        { date: "2009", text: "Business primarily consisted of injection molding, smart chargers, PCB and other electronics manufacturing, while also holding the Shenzhen Aerospace Technology Plaza property — described as having 'the name of aerospace without the substance of aerospace.'" },
      ],
    },
    {
      year: "2010-2019",
      title: "Transformation Breakthrough (2010–2019): Expanding Aerospace Services & Advancing High-End Manufacturing",
      events: [
        { date: "2010-02", text: "Raised HK$581 million through a rights issue, announcing a strategic transformation into aerospace services and aerospace real estate. Core investments targeted the Hainan Wenchang Launch Site support zone (6,100 mu) and the Shenzhen Aerospace International Center, with plans for an aerospace theme park (targeted for 2013)." },
        { date: "2011-2015", text: "Advanced small satellite R&D, aerospace support services, and high-end property operations; upgraded industrial manufacturing, expanding into LCD displays, intelligent power modules and more." },
        { date: "2016-2020", text: "During the 13th Five-Year Plan period, revenue grew from HK$3.088 billion to HK$3.580 billion, with net profit ranging from HK$379 million to HK$1.203 billion, and cumulative dividends of HK$278 million. Shenzhen Aerospace Technology Plaza commenced operations. Exited the Hainan Wenchang project to refocus on core businesses." },
        { date: "2019", text: "Initiated market-oriented reforms and improved corporate governance; divested non-core assets and established a dual-core business model of advanced manufacturing + property operations." },
      ],
    },
    {
      year: "2020-2026",
      title: "Strategic Upgrade (2020–2026): Semiconductor Substrate Push & Industry Value Reassessment",
      events: [
        { date: "2021-04", text: "Associated company Shenzhen Rayitek (PI film) went public, with CASIL holding a 23.38% stake, establishing a presence in high-end materials." },
        { date: "2022-08", text: "Subscribed to RMB 100 million of Rayitek convertible bonds, strengthening synergies in advanced materials." },
        { date: "2023-2024", text: "Launched the Nantong Kangyuan IC substrate project with a total investment of RMB 5 billion (Phase I: RMB 1.5 billion) and a designed annual capacity of 240,000 m², targeting a top-three position among domestic substrate manufacturers." },
        { date: "2025", text: "In H1, the Nantong project began trial production and volume ramp-up, with substrate business revenue up 11.42% year-on-year. Group revenue reached HK$4.031 billion (+4.9%), with industrial manufacturing (injection molding, PCB) contributing the majority of profits." },
        { date: "2026-05", text: "Current operations: industrial manufacturing (injection molding/molds), electronics manufacturing (PCB/substrates), and asset operations (Shenzhen Aerospace Technology Plaza). The Nantong substrate project has become the core growth engine, deeply tied to the domestic substitution of semiconductors." },
      ],
    },
  ],
};

export default function CompanyTimeline({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const { lang } = useI18n();
  const stages = stagesData[lang] || stagesData.zh;

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scrollTo = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const stage = stages[activeIndex];

  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* ========== HEADER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            {title}
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="w-16 h-[3px] mb-8 rounded-full"
            style={{
              background: "linear-gradient(90deg, #0A2463, #3E92CC)",
              transformOrigin: "left",
            }}
          />
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl mb-12">
            {content}
          </p>
        </motion.div>

        {/* ========== DESKTOP: Horizontal Timeline ========== */}
        <div className="hidden md:block">
          {/* Scrollable track */}
          <div className="relative mb-12">
            {/* Scroll buttons */}
            {canScrollLeft && (
              <button
                onClick={() => scrollTo("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-divider flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all duration-300"
                aria-label="Scroll left"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scrollTo("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-divider flex items-center justify-center hover:bg-brand hover:text-white hover:border-brand transition-all duration-300"
                aria-label="Scroll right"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}

            {/* Track container */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="overflow-x-auto scrollbar-hide px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="relative min-w-max py-4">
                {/* Timeline line */}
                <div className="absolute top-[58px] left-0 right-0 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #0A2463, #3E92CC, #0A2463)" }}
                />

                {/* Stage cards */}
                <div className="flex gap-6 min-w-max px-4">
                  {stages.map((s, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={s.year}
                        onClick={() => setActiveIndex(i)}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`group flex flex-col items-center gap-3 transition-all duration-300 cursor-pointer ${
                          isActive ? "" : ""
                        }`}
                      >
                        {/* Card above timeline */}
                        <div
                          className={`relative w-[180px] rounded-xl px-4 py-3.5 text-center transition-all duration-300 ${
                            isActive
                              ? "bg-brand text-white shadow-lg shadow-brand/25 scale-105"
                              : "bg-white border border-divider text-text-primary hover:shadow-md hover:border-brand/30 hover:-translate-y-0.5"
                          }`}
                        >
                          <div className="text-xs font-semibold tracking-wider opacity-70 mb-1">
                            {s.year}
                          </div>
                          <div className="text-[13px] leading-snug font-medium">
                            {s.title.split("：")[1] || s.title.split(": ")[1] || s.title}
                          </div>
                        </div>

                        {/* Dot on timeline */}
                        <div className="relative z-10">
                          <div
                            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? "bg-brand-light shadow-md shadow-brand/40 scale-125"
                                : "bg-divider group-hover:bg-brand/50"
                            }`}
                          />
                          {isActive && (
                            <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-brand-light animate-ping opacity-30" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Detail panel for active stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative bg-white rounded-2xl shadow-lg shadow-black/5 border border-divider overflow-hidden"
            >
              {/* Stage header */}
              <div className="px-8 md:px-10 pt-8 pb-5 border-b border-divider"
                style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.03), rgba(62,146,204,0.04))" }}
              >
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-brand/5 text-brand text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-light" />
                  {stage.year}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-text-primary">
                  {stage.title}
                </h3>
              </div>

              {/* Events list */}
              <div className="px-8 md:px-10 py-6">
                <div className="space-y-4">
                  {stage.events.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
                      className="flex gap-4 group/item"
                    >
                      <span className="text-[11px] font-medium text-brand whitespace-nowrap mt-0.5 w-[100px] flex-shrink-0 text-right leading-relaxed">
                        {event.date}
                      </span>
                      <p className="text-sm text-text-secondary leading-relaxed flex-1"
                        style={{ lineHeight: 1.7 }}
                      >
                        {event.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ========== MOBILE: Vertical Timeline ========== */}
        <div className="md:hidden">
          <div className="relative pl-6">
            {/* Vertical line */}
            <div className="absolute left-2 top-0 bottom-0 w-[2px] rounded-full"
              style={{ background: "linear-gradient(180deg, #0A2463, #3E92CC, #0A2463)" }}
            />

            <div className="space-y-8">
              {stages.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <div key={s.year} className="relative">
                    {/* Dot */}
                    <button
                      onClick={() => setActiveIndex(isActive ? -1 : i)}
                      className={`absolute -left-[22px] top-1 z-10 w-[18px] h-[18px] rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-brand-light border-brand-light shadow-md shadow-brand/40 scale-125"
                          : "bg-white border-divider hover:border-brand/50"
                      }`}
                    />

                    {/* Card */}
                    <motion.div
                      layout
                      onClick={() => setActiveIndex(isActive ? -1 : i)}
                      className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-white border-brand/30 shadow-lg shadow-brand/5"
                          : "bg-white/80 border-divider hover:border-brand/20 hover:shadow-sm"
                      }`}
                    >
                      <div className="px-5 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div
                              className={`text-xs font-semibold tracking-wider mb-1 transition-colors duration-300 ${
                                isActive ? "text-brand" : "text-text-secondary"
                              }`}
                            >
                              {s.year}
                            </div>
                            <h3 className="text-[15px] font-bold text-text-primary leading-snug">
                              {s.title}
                            </h3>
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className={`shrink-0 text-text-secondary/50 transition-transform duration-300 ${
                              isActive ? "rotate-180 text-brand" : ""
                            }`}
                          >
                            <path d="M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-divider/50 space-y-3">
                              {s.events.map((event, j) => (
                                <motion.div
                                  key={j}
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: j * 0.05, duration: 0.25 }}
                                  className="flex gap-3"
                                >
                                  <span className="text-[11px] font-medium text-brand whitespace-nowrap mt-0.5 w-[75px] flex-shrink-0 text-right leading-relaxed">
                                    {event.date}
                                  </span>
                                  <p className="text-[13px] text-text-secondary leading-relaxed"
                                    style={{ lineHeight: 1.7 }}
                                  >
                                    {event.text}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
