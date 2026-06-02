"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { CompanyNews } from "@/lib/types";

/* ========== Category detection & config ========== */
function detectCategory(title: string): string {
  const t = title.toLowerCase();
  if (/会议|工作會|大會|工作会|會議|座談|座谈|论坛|論壇|研讨|研討|conference|meeting|forum/i.test(t)) return "meeting";
  if (/培训|培訓|讲座|講座|学习|學習|讲习|講習|training|seminar|workshop/i.test(t)) return "training";
  return "culture";
}

const categories = [
  { key: "all", zh: "全部", en: "All" },
  { key: "meeting", zh: "工作会议", en: "Work Meetings" },
  { key: "training", zh: "员工培训", en: "Staff Training" },
  { key: "culture", zh: "企业文化活动", en: "Cultural Activities" },
];

const PAGE_SIZE = 9;

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

/* ========== Category thumbnail icon ========== */
function ThumbIcon({ category }: { category: string }) {
  switch (category) {
    case "meeting":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M9 6V3h10v3M3 12h22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="9" cy="17" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="14" cy="17" r="1.5" fill="currentColor" opacity="0.6" />
          <circle cx="19" cy="17" r="1.5" fill="currentColor" opacity="0.6" />
        </svg>
      );
    case "training":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="5" width="22" height="18" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M3 10h22M9 5v18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M6 14l4-3v6l-4-3zM15 14l4-3v6l-4-3z" fill="currentColor" opacity="0.5" />
        </svg>
      );
    default:
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="10" cy="12" r="3" stroke="currentColor" strokeWidth="0.9" />
          <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="0.9" />
          <path d="M7 20c2-2.5 4.5-4 7-4s5 1.5 7 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
  }
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ========== Main component ========== */
export default function CompanyNewsSection({
  title,
  news,
  lang,
}: {
  title: string;
  news: CompanyNews[];
  lang: string;
}) {
  const isZh = lang === "zh";

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categorized = useMemo(() => {
    return news.map((n) => ({
      ...n,
      _cat: detectCategory(isZh ? n.title_zh : (n.title_en || n.title_zh)),
    }));
  }, [news, isZh]);

  const filtered = useMemo(() => {
    let list = [...categorized];

    if (activeCategory !== "all") {
      list = list.filter((n) => n._cat === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((n) => {
        const tzh = n.title_zh.toLowerCase();
        const ten = (n.title_en || "").toLowerCase();
        return tzh.includes(q) || ten.includes(q);
      });
    }

    return list;
  }, [categorized, activeCategory, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="pb-20 md:pb-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">

        {/* ========== HEADER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 md:mb-14"
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
        </motion.div>

        {/* ========== FILTERS BAR ========== */}
        <FadeSection className="mb-8 md:mb-10">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/40 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
                placeholder={isZh ? "搜索公司资讯…" : "Search company news…"}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-divider bg-white text-sm text-text-primary
                  placeholder:text-text-secondary/40 outline-none
                  focus:border-brand/40 focus:ring-2 focus:ring-brand/5 transition-all duration-200"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setVisibleCount(PAGE_SIZE); }}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-brand text-white shadow-sm shadow-brand/20"
                    : "bg-white border border-divider text-text-secondary hover:text-brand hover:border-brand/30"
                }`}
              >
                {isZh ? cat.zh : cat.en}
              </button>
            ))}
          </div>
        </FadeSection>

        {/* ========== RESULTS COUNT ========== */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[13px] text-text-secondary">
            {isZh
              ? `共 ${filtered.length} 条资讯`
              : `${filtered.length} articles`}
          </p>
        </div>

        {/* ========== NEWS CARD GRID ========== */}
        <FadeSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => {
                const catLabel = categories.find((c) => c.key === item._cat);
                const href = item.pdf_url || "#";
                const isPDF = !!item.pdf_url;

                return (
                  <motion.a
                    key={item.id}
                    href={href}
                    target={isPDF ? "_blank" : undefined}
                    rel={isPDF ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.4 }}
                    className="group bg-white rounded-2xl border border-divider/60 overflow-hidden
                      hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5 hover:border-brand/20
                      transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {/* Thumbnail area */}
                    <div
                      className="relative h-32 flex items-center justify-center overflow-hidden"
                      style={{
                        background: item._cat === "meeting"
                          ? "linear-gradient(135deg, rgba(10,36,99,0.06), rgba(10,36,99,0.02))"
                          : item._cat === "training"
                            ? "linear-gradient(135deg, rgba(62,146,204,0.06), rgba(62,146,204,0.02))"
                            : "linear-gradient(135deg, rgba(10,36,99,0.04), rgba(62,146,204,0.04))",
                      }}
                    >
                      {/* Abstract pattern background */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-brand" />
                        <div className="absolute bottom-2 left-6 w-10 h-10 rounded-full border border-brand-light" />
                        <div className="absolute top-8 left-10 w-1 h-1 rounded-full bg-brand" />
                        <div className="absolute bottom-6 right-8 w-1.5 h-1.5 rounded-full bg-brand-light" />
                      </div>

                      <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                        item._cat === "meeting" ? "text-brand/50" : item._cat === "training" ? "text-brand-light/60" : "text-brand/40"
                      }`}>
                        <ThumbIcon category={item._cat} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 flex flex-col">
                      {/* Category + date */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${
                          item._cat === "meeting"
                            ? "bg-brand/5 text-brand/70"
                            : item._cat === "training"
                              ? "bg-brand-light/10 text-brand-light/80"
                              : "bg-brand/5 text-brand/70"
                        }`}>
                          {isZh ? (catLabel?.zh || "") : (catLabel?.en || "")}
                        </span>
                        <span className="text-[11px] text-text-secondary/60">
                          {item.date || ""}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-semibold text-text-primary leading-snug mb-3 group-hover:text-brand transition-colors duration-200 line-clamp-2"
                        style={{ lineHeight: 1.55 }}
                      >
                        {isZh ? item.title_zh : (item.title_en || item.title_zh)}
                      </h3>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* View button */}
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-brand
                        group-hover:gap-2.5 transition-all duration-300">
                        {isPDF ? (isZh ? "下载 PDF" : "Download PDF") : (isZh ? "查看详情" : "View Details")}
                        <ArrowIcon />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-sm">
                {isZh ? "未找到匹配的资讯" : "No matching articles found"}
              </p>
            </div>
          )}
        </FadeSection>

        {/* ========== LOAD MORE ========== */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 text-center"
          >
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-brand/20
                text-sm font-medium text-brand bg-white
                hover:bg-brand hover:text-white hover:border-brand
                transition-all duration-300"
            >
              {isZh
                ? `加载更多（${filtered.length - visibleCount} 条剩余）`
                : `Load More (${filtered.length - visibleCount} remaining)`}
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
}
