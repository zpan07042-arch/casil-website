"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ========== Fade wrapper ========== */
function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-6 rounded-full bg-brand" />
      <h2 className="text-xl md:text-2xl font-bold text-text-primary">
        {children}
      </h2>
    </div>
  );
}

/* ========== Product SVGs ========== */
function IconIC() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="6" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="12" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1" />
      <path d="M14 17h12M14 20h12M14 23h8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="28" cy="27" r="1" fill="currentColor" />
    </svg>
  );
}

function IconPower() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="12" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 12V8a2 2 0 012-2h8a2 2 0 012 2v4M14 32v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M17 22v4m3-6v6m3-7v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconPCB() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="10" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
      <circle cx="14" cy="14" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="26" cy="26" r="2" fill="currentColor" opacity="0.6" />
      <path d="M20 10v4M20 26v4M10 20h4m12 0h4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/* ========== Main component ========== */
export default function ProductsSection({
  title,
  content,
  lang,
}: {
  title: string;
  content: string;
  lang: string;
}) {
  const isZh = lang === "zh";
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  /* ---- Product data ---- */
  const products = [
    {
      icon: <IconIC />,
      nameZh: "IC 封裝載板",
      nameEn: "IC Packaging Substrate",
      descZh: "高端封裝基板，南通康源項目總投資 50 億元，一期設計年產能 24 萬平方米，工藝水準躋身國內前列，瞄準國內載板前三。",
      descEn: "High-end packaging substrates. Nantong Kangyuan project with total investment of RMB 5 billion. Phase I designed annual capacity of 240,000 m², ranking among the top in China.",
      detailsZh: "IC 封裝載板是芯片封裝的核心基礎材料，廣泛應用於通訊、消費電子、汽車電子等領域的芯片封裝。南通康源項目採用國際先進工藝，產品覆蓋 WB-CSP、FC-CSP 等主流封裝形式，有效填補本土高端載板產業缺口。",
      detailsEn: "IC packaging substrates are core foundational materials for chip packaging. The Nantong Kangyuan project adopts internationally advanced processes, covering mainstream packaging formats including WB-CSP and FC-CSP, effectively filling the domestic high-end substrate industry gap.",
      tagsZh: ["FC-CSP", "WB-CSP", "高端封裝"],
      tagsEn: ["FC-CSP", "WB-CSP", "Advanced Packaging"],
    },
    {
      icon: <IconPower />,
      nameZh: "車規級功率模塊",
      nameEn: "Automotive-grade Power Module",
      descZh: "智能功率模組（IPM），車規級高可靠性設計，適配新能源汽車電驅系統及工業控制場景。",
      descEn: "Intelligent Power Modules (IPM) with automotive-grade high-reliability design, suitable for new energy vehicle drive systems and industrial control.",
      detailsZh: "車規級功率模塊通過嚴苛的 AEC-Q 可靠性認證，具備高功率密度、低熱阻、強抗干擾能力等特性。產品廣泛應用於新能源汽車主驅逆變器、車載充電機（OBC）及工業變頻器，是國內自主可控功率半導體的重要力量。",
      detailsEn: "Automotive-grade power modules pass rigorous AEC-Q reliability certification, featuring high power density, low thermal resistance and strong anti-interference. Widely used in EV traction inverters, OBC and industrial inverters.",
      tagsZh: ["車規級", "IPM", "高可靠性"],
      tagsEn: ["Automotive", "IPM", "High-Reliability"],
    },
    {
      icon: <IconPCB />,
      nameZh: "精密 PCB 電路板",
      nameEn: "Precision PCB Circuit Boards",
      descZh: "多層精密線路板，依託成熟製造工藝與規模化產能，廣泛服務於消費電子、通訊設備及工業控制領域。",
      descEn: "Multi-layer precision circuit boards, leveraging mature manufacturing processes and scale production capacity, serving consumer electronics, communication equipment and industrial control.",
      detailsZh: "精密 PCB 產品覆蓋多層板、HDI 板及特種基板，擁有完整的工藝鏈和品控體系。產品廣泛應用於通訊基站、服務器、消費終端等，以穩定的品質和交付能力獲得頭部客戶認可。",
      detailsEn: "Precision PCB products cover multi-layer boards, HDI boards and specialty substrates with complete process chain and quality control. Widely used in communication base stations, servers and consumer terminals.",
      tagsZh: ["多層板", "HDI", "規模化"],
      tagsEn: ["Multi-layer", "HDI", "Scale Production"],
    },
  ];

  /* ---- Application scenarios ---- */
  const scenarios = [
    {
      zh: "AI 算力設備",
      en: "AI Computing",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="3" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M7 19h8M11 15v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M8 8l2 2 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      zh: "新能源汽車",
      en: "NEV",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M5 13h12l-1.5-5h-9L5 13z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="15" cy="16" r="2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3 13H2m18 0h1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      zh: "低空無人機",
      en: "Low-altitude Drones",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 3v4M7 7l4-4 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="6" y="10" width="10" height="2" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 12v3a3 3 0 006 0v-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      zh: "智能機器人",
      en: "Smart Robotics",
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="6" y="5" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="9" cy="9" r="1.2" stroke="currentColor" strokeWidth="1" />
          <circle cx="13" cy="9" r="1.2" stroke="currentColor" strokeWidth="1" />
          <path d="M11 14v3M8 17h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  /* ---- Advantages ---- */
  const advantages = [
    {
      zh: "技術研發",
      en: "R&D Innovation",
      descZh: "手握多項技術專利，積澱深厚技術壁壘",
      descEn: "Multiple technology patents with deep technical barriers",
    },
    {
      zh: "生產製造",
      en: "Manufacturing",
      descZh: "成熟精密加工體系，工藝水準國內前列",
      descEn: "Mature precision manufacturing, top-tier processes in China",
    },
    {
      zh: "市場供貨",
      en: "Market Supply",
      descZh: "優質頭部客戶資源，一體化供應體系",
      descEn: "Premium key client base, integrated supply system",
    },
    {
      zh: "國產替代",
      en: "Domestic Substitution",
      descZh: "填補本土產業缺口，強化行業競爭力",
      descEn: "Filling domestic industry gaps, strengthening competitiveness",
    },
  ];

  return (
    <section className="pb-20 md:pb-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">

        {/* ========== HEADER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 md:mb-20"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            {title}
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="w-16 h-[3px] mb-6 rounded-full"
            style={{ background: "linear-gradient(90deg, #0A2463, #3E92CC)", transformOrigin: "left" }}
          />
          <p className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-3xl whitespace-pre-line">
            {content}
          </p>
        </motion.div>

        {/* ========== MODULE 1: CORE PRODUCTS ========== */}
        <FadeSection className="mb-16 md:mb-24">
          <SectionTitle>
            {isZh ? "核心產品分類" : "Core Products"}
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((p, i) => {
              const isOpen = expandedProduct === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div
                    onClick={() => setExpandedProduct(isOpen ? null : i)}
                    className={`relative bg-white rounded-2xl border transition-all duration-300 cursor-pointer
                      ${isOpen
                        ? "border-brand/30 shadow-lg shadow-brand/5"
                        : "border-divider hover:border-brand/20 hover:-translate-y-1 hover:shadow-md"
                      }`}
                  >
                    {/* Card body */}
                    <div className="p-6 md:p-7">
                      {/* Icon + name */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`transition-colors duration-300 ${isOpen ? "text-brand" : "text-brand/60"}`}>
                          {p.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary">
                            {isZh ? p.nameZh : p.nameEn}
                          </h3>
                        </div>
                      </div>

                      {/* Short description */}
                      <p className="text-sm text-text-secondary leading-[1.65] mb-3">
                        {isZh ? p.descZh : p.descEn}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(isZh ? p.tagsZh : p.tagsEn).map((tag, j) => (
                          <span key={j} className="text-[11px] px-2 py-0.5 rounded-md bg-brand/5 text-brand/80 font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Expand toggle */}
                      <div className="flex items-center gap-1 text-[12px] font-medium text-brand/60">
                        <span>{isOpen ? (isZh ? "收起詳情" : "Collapse") : (isZh ? "展開詳情" : "Expand Details")}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Expandable detail */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-6 md:px-7 pb-6 pt-2 border-t border-divider/50"
                            style={{ background: "linear-gradient(180deg, rgba(10,36,99,0.02), transparent)" }}
                          >
                            <p className="text-[13px] text-text-secondary leading-[1.7]">
                              {isZh ? p.detailsZh : p.detailsEn}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeSection>

        {/* ========== MODULE 2: KEY TECHNOLOGIES ========== */}
        <FadeSection className="mb-16 md:mb-20">
          <div
            className="relative rounded-2xl p-8 md:p-10 border border-divider/50"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.03), rgba(62,146,204,0.03))" }}
          >
            <div className="absolute top-0 right-0 w-36 h-36 rounded-bl-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, #0A2463, transparent 70%)" }}
            />
            <div className="relative">
              <SectionTitle>
                {isZh ? "關鍵技術" : "Key Technologies"}
              </SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    zh: "高端 IC 封裝載板製造技術",
                    en: "Advanced IC Packaging Substrate Manufacturing",
                    descZh: "掌握 FC-CSP、WB-CSP 等先進封裝基板工藝，南通康源項目採用國際領先設備與製程，填補國內高端載板產能缺口。",
                    descEn: "Mastering advanced packaging substrate processes including FC-CSP and WB-CSP. The Nantong Kangyuan project adopts internationally leading equipment and processes.",
                  },
                  {
                    zh: "車規級功率模塊封裝技術",
                    en: "Automotive-grade Power Module Packaging",
                    descZh: "通過 AEC-Q 車規可靠性認證，具備高功率密度、低熱阻設計能力，適配嚴苛的車載與工業應用環境。",
                    descEn: "AEC-Q automotive-grade certified with high power density and low thermal resistance design, suitable for demanding automotive and industrial environments.",
                  },
                  {
                    zh: "精密多層 PCB 工藝",
                    en: "Precision Multi-layer PCB Process",
                    descZh: "覆蓋多層板、HDI 板及特種基板，擁有完整工藝鏈與品控體系，支撐規模化、高一致性生產。",
                    descEn: "Covering multi-layer, HDI and specialty substrates with complete process chain and quality control for scale production.",
                  },
                ].map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    className="bg-white rounded-xl border border-divider/60 p-5 hover:border-brand/15 hover:shadow-sm transition-all duration-300"
                  >
                    <h4 className="text-sm font-semibold text-brand mb-2">
                      {isZh ? tech.zh : tech.en}
                    </h4>
                    <p className="text-[13px] text-text-secondary leading-[1.65]">
                      {isZh ? tech.descZh : tech.descEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ========== MODULE 3: APPLICATION SCENARIOS ========== */}
        <FadeSection className="mb-16 md:mb-20">
          <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm">
            <SectionTitle>
              {isZh ? "應用場景" : "Application Scenarios"}
            </SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {scenarios.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl border border-divider/40
                    bg-[#F8F9FA] hover:bg-white hover:border-brand/20 hover:shadow-sm
                    transition-all duration-300 group cursor-default"
                >
                  <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center
                    text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300"
                  >
                    {s.icon}
                  </div>
                  <span className="text-sm font-semibold text-text-primary text-center">
                    {isZh ? s.zh : s.en}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="text-[13px] text-text-secondary mt-5 text-center leading-[1.6]">
              {isZh
                ? "產品廣泛適配 AI 算力、新能源汽車、低空經濟、智能機器人等高景氣領域，爲客戶提供專業、高效、可靠的產品與服務。"
                : "Products are widely applied in high-growth sectors including AI computing, NEV, low-altitude economy and smart robotics."}
            </p>
          </div>
        </FadeSection>

        {/* ========== MODULE 4: ENTERPRISE ADVANTAGES ========== */}
        <FadeSection>
          <div
            className="relative rounded-2xl p-8 md:p-10 border border-divider/50"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.02), rgba(62,146,204,0.02))" }}
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at bottom left, #3E92CC, transparent 70%)" }}
            />
            <div className="relative">
              <SectionTitle>
                {isZh ? "企業優勢" : "Enterprise Advantages"}
              </SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {advantages.map((adv, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="text-center p-5 rounded-xl bg-white border border-divider/60
                      hover:border-brand/20 hover:shadow-sm transition-all duration-300"
                  >
                    {/* Number */}
                    <div className="w-9 h-9 rounded-full bg-brand/5 text-brand text-sm font-bold
                      flex items-center justify-center mx-auto mb-3"
                    >
                      {i + 1}
                    </div>
                    <h4 className="text-sm font-bold text-text-primary mb-1.5">
                      {isZh ? adv.zh : adv.en}
                    </h4>
                    <p className="text-[12px] text-text-secondary leading-[1.6]">
                      {isZh ? adv.descZh : adv.descEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

      </div>
    </section>
  );
}
