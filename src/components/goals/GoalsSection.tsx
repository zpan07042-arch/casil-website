"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

function highlightText(text: string, terms: string[], brandClass = "text-brand font-semibold") {
  let result = text;
  terms.forEach((term) => {
    result = result.replace(new RegExp(`(${term})`, "g"), `<span class="${brandClass}">$1</span>`);
  });
  return result;
}

export default function GoalsSection({
  title,
  content,
  lang,
}: {
  title: string;
  content: string;
  lang: string;
}) {
  const isZh = lang === "zh";

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
            style={{
              background: "linear-gradient(90deg, #0A2463, #3E92CC)",
              transformOrigin: "left",
            }}
          />
          {content && (
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl whitespace-pre-line"
              style={{ lineHeight: 1.7 }}
            >
              {content}
            </p>
          )}
        </motion.div>

        {/* ========== MODULE 1: DEVELOPMENT GOALS ========== */}
        <FadeSection className="mb-12 md:mb-16">
          <div
            className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm
              hover:shadow-md hover:border-brand/10 transition-all duration-500"
          >
            {/* Subtle corner accent */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-bl-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, #0A2463, transparent 70%)" }}
            />

            <div className="relative">
              <SectionTitle>
                {isZh ? "企业发展目标" : "Enterprise Development Goals"}
              </SectionTitle>

              <p
                className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl"
                style={{ lineHeight: 1.75 }}
              >
                {content?.split("\n\n")[0] || ""}
              </p>

              {/* Key indicators row */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    zh: "科学化管理体系",
                    en: "Scientific Management System",
                    descZh: "建立现代化、高效的科学管理框架",
                    descEn: "Establish a modern and efficient management framework",
                  },
                  {
                    zh: "强势市场竞争力",
                    en: "Strong Market Competitiveness",
                    descZh: "构建整体竞争优势，巩固行业地位",
                    descEn: "Build overall competitive advantages and strengthen industry position",
                  },
                  {
                    zh: "为股东创造价值",
                    en: "Shareholder Value Creation",
                    descZh: "持续创造优质投资回报与长期价值",
                    descEn: "Continuously create excellent investment returns and long-term value",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3 p-4 rounded-xl border border-divider/50
                      bg-[#F8F9FA] hover:bg-white hover:border-brand/20 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-light mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-brand mb-1">
                        {isZh ? item.zh : item.en}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed"
                        style={{ lineHeight: 1.6 }}
                      >
                        {isZh ? item.descZh : item.descEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ========== MODULE 2: CORE BUSINESS DIRECTION ========== */}
        <FadeSection>
          <div
            className="relative rounded-2xl p-8 md:p-10 border border-divider/50
              hover:shadow-md hover:border-brand/10 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.03), rgba(62,146,204,0.03))" }}
          >
            {/* Subtle corner accent */}
            <div
              className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at bottom left, #3E92CC, transparent 70%)" }}
            />

            <div className="relative">
              <SectionTitle>
                {isZh ? "核心业务方向" : "Core Business Direction"}
              </SectionTitle>

              <p
                className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl"
                style={{ lineHeight: 1.75 }}
              >
                {content?.split("\n\n")[1] || ""}
              </p>

              {/* Business focus badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { zh: "科技工业", en: "Technology Industry" },
                  { zh: "航天服务", en: "Aerospace Services" },
                  { zh: "先进制造", en: "Advanced Manufacturing" },
                  { zh: "现代服务", en: "Modern Services" },
                  { zh: "产业升级", en: "Industrial Upgrading" },
                  { zh: "技术创新", en: "Technological Innovation" },
                ].map((badge, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium
                      bg-white border border-brand/15 text-brand
                      hover:bg-brand hover:text-white hover:border-brand
                      transition-all duration-300 cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-light group-hover:bg-white" />
                    {isZh ? badge.zh : badge.en}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

      </div>
    </section>
  );
}
