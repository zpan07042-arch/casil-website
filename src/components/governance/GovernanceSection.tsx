"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { GovernanceDoc } from "@/lib/types";

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

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 1h6l4 4v12a2 2 0 01-2 2H6a2 2 0 01-2-2V3a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M12 1v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 10h6M7 13h6M7 16h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path d="M7.5 1.5v8m0 0L4.5 6.5m3 3l3-3M2 11v1.5A1.5 1.5 0 003.5 14h8a1.5 1.5 0 001.5-1.5V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function GovernanceSection({
  title,
  content,
  docs,
  lang,
}: {
  title: string;
  content: string;
  docs: GovernanceDoc[];
  lang: string;
}) {
  const isZh = lang === "zh";

  const committees = isZh
    ? ["審覈委員會", "薪酬委員會", "提名委員會", "環境、社會及管治委員會"]
    : ["Audit Committee", "Remuneration Committee", "Nomination Committee", "ESG Committee"];

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
        </motion.div>

        {/* ========== MODULE 1: GOVERNANCE INTRODUCTION ========== */}
        <FadeSection className="mb-12 md:mb-16">
          <div
            className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm
              hover:shadow-md hover:border-brand/10 transition-all duration-500"
          >
            {/* Subtle corner accent */}
            <div
              className="absolute top-0 right-0 w-36 h-36 rounded-bl-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, #0A2463, transparent 70%)" }}
            />

            <div className="relative">
              <SectionTitle>
                {isZh ? "企業管治介紹" : "Corporate Governance Overview"}
              </SectionTitle>

              {/* Intro text */}
              <p
                className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl mb-8"
                style={{ lineHeight: 1.7 }}
              >
                {content}
              </p>

              {/* Committee structure cards */}
              <h4 className="text-sm font-semibold text-text-primary mb-4">
                {isZh ? "管治架構" : "Governance Structure"}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {committees.map((name, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-divider/60
                      bg-[#F8F9FA] hover:bg-white hover:border-brand/25 hover:shadow-sm
                      transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-light flex-shrink-0" />
                    <span className="text-[13px] font-medium text-text-primary leading-snug">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Compliance highlight */}
              <div
                className="flex items-start gap-3 p-4 rounded-xl border border-brand/10"
                style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.04), rgba(62,146,204,0.04))" }}
              >
                <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L2 3v3.5c0 2.5 1.7 4.3 4 4.7 2.3-.4 4-2.2 4-4.7V3L6 1z" stroke="#0A2463" strokeWidth="1" strokeLinejoin="round" />
                    <path d="M4 6l1.2 1.2 2.6-2.4" stroke="#0A2463" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-brand mb-0.5">
                    {isZh ? "合規依據" : "Compliance Framework"}
                  </p>
                  <p className="text-[13px] text-text-secondary leading-relaxed"
                    style={{ lineHeight: 1.6 }}
                  >
                    {isZh
                      ? "本公司定期檢討企業管治守則，確保符合香港聯合交易所有限公司證券上市規則附錄C1《企業管治守則》的要求。"
                      : "The Company regularly reviews its corporate governance practices to ensure compliance with the Corporate Governance Code set out in Appendix C1 of the Rules Governing the Listing of Securities on The Stock Exchange of Hong Kong Limited."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ========== MODULE 2: GOVERNANCE DOCUMENTS ========== */}
        <FadeSection>
          <div
            className="relative rounded-2xl p-8 md:p-10 border border-divider/50
              hover:shadow-md hover:border-brand/10 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.02), rgba(62,146,204,0.02))" }}
          >
            {/* Subtle corner accent */}
            <div
              className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at bottom left, #3E92CC, transparent 70%)" }}
            />

            <div className="relative">
              <SectionTitle>
                {isZh ? "管治文件下載" : "Governance Document Downloads"}
              </SectionTitle>

              <div className="space-y-3">
                {docs.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <a
                      href={doc.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 p-4 rounded-xl
                        bg-white border border-divider/50
                        hover:border-brand/25 hover:shadow-sm hover:bg-white
                        transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="text-brand/40 group-hover:text-brand transition-colors duration-300 flex-shrink-0">
                          <FileIcon />
                        </div>
                        <span className="text-sm text-text-primary group-hover:text-brand transition-colors duration-300 truncate"
                          style={{ lineHeight: 1.5 }}
                        >
                          {isZh ? doc.title_zh : (doc.title_en || doc.title_zh)}
                        </span>
                      </div>

                      <span
                        className="flex items-center gap-1.5 flex-shrink-0 px-3.5 py-1.5 rounded-full
                          text-[12px] font-medium
                          bg-brand/5 text-brand border border-brand/15
                          group-hover:bg-brand group-hover:text-white group-hover:border-brand group-hover:scale-105
                          transition-all duration-300"
                      >
                        <DownloadIcon />
                        <span className="hidden sm:inline">
                          {isZh ? "下載 PDF" : "Download PDF"}
                        </span>
                      </span>
                    </a>
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
