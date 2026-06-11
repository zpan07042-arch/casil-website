"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Subsidiary } from "@/lib/types";

/* ========== Business icon SVGs by keyword ========== */
function getBizIcon(desc: string) {
  if (/PCB|pcb|封裝|載板|載板|substrate/i.test(desc)) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.2" />
        <rect x="4" y="4" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="0.8" />
        <path d="M6 7h6M6 9h6M6 11h3" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (/半導體|半導體|semiconductor/i.test(desc)) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="5" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 5V3a1 1 0 011-1h4a1 1 0 011 1v2M6 13v2a1 1 0 001 1h4a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }
  if (/顯示|模組|display|sensor|傳感器/i.test(desc)) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 16h6M9 13v3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }
  if (/儲能|電池|energy|battery/i.test(desc)) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="4" y="1" width="6" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="2" y="4" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 8v4M11 8v4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }
  if (/塑膠|結構|結構件|precision/i.test(desc)) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 5h14v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 5V3h8v2M3 7h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }
  if (/工業互聯網|智能|industrial|smart/i.test(desc)) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1" />
        <path d="M9 2v2M9 14v2M2 9h2m10 0h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }
  if (/物業|產業投|property/i.test(desc)) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L2 7v8h5v-4h4v4h5V7L9 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="8" y="10" width="2" height="4" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    );
  }
  if (/薄膜|film|PI|新材料/i.test(desc)) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 4h12c.5 0 1 .5 1 1v8c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1V5c0-.5.5-1 1-1z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 7h14M2 10h14" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 2" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 5v8M5 9h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

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

/* ========== Main component ========== */
export default function SubsidiarySection({
  title,
  content,
  subsidiaries,
  lang,
}: {
  title: string;
  content: string;
  subsidiaries: Subsidiary[];
  lang: string;
}) {
  const isZh = lang === "zh";
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const typeLabels: Record<string, { zh: string; en: string; color: string }> = {
    wholly_owned: { zh: "全資子公司", en: "Wholly-owned", color: "#0A2463" },
    controlled: { zh: "控股子公司", en: "Controlled", color: "#3E92CC" },
    invested: { zh: "參股企業", en: "Invested", color: "#5BA0D9" },
  };

  const grouped = subsidiaries.reduce(
    (acc, s) => {
      const t = s.sub_type;
      if (!acc[t]) acc[t] = [];
      acc[t].push(s);
      return acc;
    },
    {} as Record<string, Subsidiary[]>
  );

  const typeOrder = ["wholly_owned", "controlled", "invested"];

  return (
    <section className="pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-5 md:px-8">

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
            style={{
              background: "linear-gradient(90deg, #0A2463, #3E92CC)",
              transformOrigin: "left",
            }}
          />
          {content && (
            <p className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-3xl"
            >
              {content}
            </p>
          )}
        </motion.div>

        {/* ========== DESKTOP: Relationship Graph ========== */}
        <FadeSection className="hidden md:block">
          {/* Parent node */}
          <div className="flex justify-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-sm font-bold shadow-lg"
              style={{
                background: "linear-gradient(135deg, #0A2463, #1a3a7a)",
                boxShadow: "0 4px 24px rgba(10,36,99,0.3)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
                <path d="M10 2v4m0 8v4M2 10h4m8 0h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              CASIL
            </div>
          </div>

          {/* Connecting lines container */}
          <div className="relative">
            {/* Vertical line from parent */}
            <div className="flex justify-center mb-2">
              <div className="w-[2px] h-8 bg-gradient-to-b from-brand to-brand/40" />
            </div>

            {/* Horizontal distribution line */}
            <div className="hidden" />

            {/* Three columns */}
            <div className="grid grid-cols-3 gap-6">
              {typeOrder.map((type, colIdx) => {
                const group = grouped[type] || [];
                const label = typeLabels[type];
                if (!label) return null;

                return (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: colIdx * 0.15, duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    {/* Column header node */}
                    <div className="relative mb-5">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-gradient-to-b from-brand/40 to-brand/60" />
                      <div
                        className="px-4 py-1.5 rounded-full text-white text-[11px] font-semibold tracking-wider whitespace-nowrap shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${label.color}, ${label.color}dd)`,
                        }}
                      >
                        {isZh ? label.zh : label.en}
                      </div>
                      {/* Arrow down */}
                      <div className="flex justify-center mt-1.5">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1l4 4 4-4" stroke={label.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Subsidiary cards */}
                    <div className="w-full space-y-3">
                      {group.map((s, i) => {
                        const desc = isZh ? s.description_zh : (s.description_en || s.description_zh);
                        const name = isZh ? s.name_zh : (s.name_en || s.name_zh);
                        const isHovered = hoveredId === s.id;

                        return (
                          <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: colIdx * 0.1 + i * 0.07, duration: 0.4 }}
                            className="relative"
                            onMouseEnter={() => setHoveredId(s.id)}
                            onMouseLeave={() => setHoveredId(null)}
                          >
                            {/* Card */}
                            <div
                              className={`relative bg-white rounded-xl border px-4 py-3.5 transition-all duration-300 cursor-default
                                ${isHovered ? "border-brand/30 shadow-lg shadow-brand/5 -translate-y-1 scale-[1.02]" : "border-divider/60 hover:border-brand/15 hover:shadow-sm"}`}
                            >
                              {/* Left accent line */}
                              <div
                                className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300"
                                style={{
                                  background: isHovered
                                    ? `linear-gradient(180deg, ${label.color}, ${label.color}99)`
                                    : `linear-gradient(180deg, ${label.color}30, ${label.color}10)`,
                                }}
                              />

                              <div className="pl-2">
                                {/* Name */}
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-brand/50 group-hover:text-brand transition-colors duration-300">
                                    {desc ? getBizIcon(desc) : getBizIcon("")}
                                  </span>
                                  <h3 className="text-[13px] font-semibold text-text-primary leading-snug">
                                    {name}
                                  </h3>
                                </div>

                                {/* Description */}
                                <AnimatePresence>
                                  {desc && (
                                    <motion.p
                                      initial={{ height: "auto", opacity: 1 }}
                                      className="text-[12px] text-text-secondary leading-[1.6]"
                                    >
                                      {desc}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeSection>

        {/* ========== MOBILE: Vertical List ========== */}
        <div className="md:hidden space-y-12">
          {typeOrder.map((type, idx) => {
            const group = grouped[type] || [];
            const label = typeLabels[type];
            if (!label) return null;

            return (
              <FadeSection key={type}>
                {/* Tier header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: label.color }}
                  />
                  <h2 className="text-lg font-bold text-text-primary">
                    {isZh ? label.zh : label.en}
                  </h2>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-brand/20 to-transparent" />
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {group.map((s, i) => {
                    const desc = isZh ? s.description_zh : (s.description_en || s.description_zh);
                    const name = isZh ? s.name_zh : (s.name_en || s.name_zh);

                    return (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="bg-white rounded-xl border border-divider/60 p-4
                          active:border-brand/30 active:shadow-sm transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="text-brand/50 flex-shrink-0">
                            {desc ? getBizIcon(desc) : getBizIcon("")}
                          </span>
                          <h3 className="text-[15px] font-semibold text-text-primary leading-snug">
                            {name}
                          </h3>
                        </div>
                        {desc && (
                          <p className="text-[13px] text-text-secondary leading-[1.6] pl-7"
                          >
                            {desc}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </FadeSection>
            );
          })}
        </div>

      </div>
    </section>
  );
}
