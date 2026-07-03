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

function SectionTitle({ children, enLabel }: { children: React.ReactNode; enLabel: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 30, fontWeight: 700, marginBottom: 4 }} className="text-text-primary">
        {children}
      </h2>
      <p
        style={{
          fontSize: 11,
          color: "#888E9C",
          margin: "0 0 16px",
          letterSpacing: "0.06em",
        }}
      >
        {enLabel}
      </p>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#E9EEF7",
        }}
      />
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

  return (
    <section className="pt-12 md:pt-20 pb-20 md:pb-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">

        {/* ========== MODULE 1: GOVERNANCE DOCUMENTS ========== */}
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
              <SectionTitle enLabel="Governance Document Downloads">
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
                        <span style={{ fontSize: 18 }} className="text-text-primary group-hover:text-brand transition-colors duration-300 truncate leading-normal">
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
