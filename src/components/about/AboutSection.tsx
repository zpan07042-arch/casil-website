"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { PageContent } from "@/lib/types";

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

/* ========== Card icons ========== */
function IconBackground() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 3v3.5M16 25.5v3.5M3 16h3.5m19 0H29" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M16 8v16M8 16h16" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconCulture() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 4l3 6 6.5 1-4.7 4.6 1.1 6.4-5.9-3.1-5.9 3.1 1.1-6.4L6.5 11l6.5-1 3-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function IconGoals() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="1.2" fill="currentColor" />
      <path d="M16 4v3M16 25v3M4 16h3m18 0h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconBoard() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="12" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 22c2.5-3.5 7-5 7-5s4.5 1.5 7 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="20" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 25h0.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconGovernance() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 3L6 7v8c0 7 4.5 12 10 13 5.5-1 10-6 10-13V7L16 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11 15l3.5 3.5 6.5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface CardData {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

export default function AboutSection({
  title,
  content,
  subpages,
  lang,
  base,
}: {
  title: string;
  content: string;
  subpages: PageContent[];
  lang: string;
  base: string;
}) {
  const isZh = lang === "zh";

  const subRoutes: Record<string, string> = {
    background: `${base}/about/background`,
    culture: `${base}/about/culture`,
    goals: `${base}/about/goals`,
    board: `${base}/about/board`,
    governance: `${base}/about/governance`,
  };

  const cardConfigs: Record<string, { icon: React.ReactNode; tagline: { zh: string; en: string } }> = {
    background: {
      icon: <IconBackground />,
      tagline: {
        zh: "從康力時代到航天控股，跨越半世紀的傳承與蛻變",
        en: "From Conic era to CASIL — half a century of legacy and transformation",
      },
    },
    culture: {
      icon: <IconCulture />,
      tagline: {
        zh: "愛國、創新、誠信、和諧、盡責",
        en: "Patriotism, Innovation, Integrity, Harmony, Responsibility",
      },
    },
    goals: {
      icon: <IconGoals />,
      tagline: {
        zh: "建設科學化管理體系，爲股東創造持久價值",
        en: "Building a scientific management system to create lasting shareholder value",
      },
    },
    board: {
      icon: <IconBoard />,
      tagline: {
        zh: "專業多元的董事團隊，引領企業戰略方向",
        en: "A professional and diverse board leading strategic direction",
      },
    },
    governance: {
      icon: <IconGovernance />,
      tagline: {
        zh: "恪守高水平企業管治標準，保障股東權益",
        en: "Upholding high corporate governance standards to protect shareholder rights",
      },
    },
  };

  const cards: CardData[] = subpages
    .filter((s) => s.id !== "about")
    .map((s) => {
      const cfg = cardConfigs[s.id] || { icon: <IconBackground />, tagline: { zh: "", en: "" } };
      return {
        id: s.id,
        title: isZh ? s.title_zh : s.title_en,
        tagline: isZh ? cfg.tagline.zh : cfg.tagline.en,
        desc: (isZh ? s.content_zh ?? "" : s.content_en ?? s.content_zh ?? "").substring(0, 80) + "…",
        href: subRoutes[s.id] || `${base}/about/${s.id}`,
        icon: cfg.icon,
      };
    });

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
          {content && (
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl"
              style={{ lineHeight: 1.7 }}
            >
              {content}
            </p>
          )}
        </motion.div>

        {/* ========== CARD GRID ========== */}
        <FadeSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={card.href}
                  className="group relative flex flex-col bg-white rounded-2xl border border-divider/60 p-7 h-full
                    hover:-translate-y-1.5 hover:shadow-lg hover:shadow-brand/5 hover:border-brand/25
                    transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(circle at 30% 20%, rgba(10,36,99,0.03), transparent 60%)" }}
                  />

                  <div className="relative flex flex-col h-full">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-brand/4 flex items-center justify-center
                      text-brand/50 group-hover:text-brand group-hover:bg-brand/10 group-hover:scale-110
                      transition-all duration-300 mb-5">
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-brand transition-colors duration-300">
                      {card.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm font-medium text-brand/70 leading-snug mb-3"
                      style={{ lineHeight: 1.55 }}
                    >
                      {card.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-[13px] text-text-secondary/70 leading-relaxed flex-1"
                      style={{ lineHeight: 1.6 }}
                    >
                      {card.desc}
                    </p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center gap-1 text-brand/40 group-hover:text-brand group-hover:gap-2 transition-all duration-300">
                      <span className="text-[12px] font-medium">
                        {isZh ? "瞭解更多" : "Learn More"}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M4 2.5L7.5 6 4 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </FadeSection>

      </div>
    </section>
  );
}
