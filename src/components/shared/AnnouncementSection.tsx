"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Announcement } from "@/lib/types";

/* ========== Robust date parser for mixed formats ========== */
function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  // If first part has 4 digits → YYYY-MM-DD
  if (parts[0].length === 4) {
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }
  // If last part has 4 digits → DD-MM-YYYY
  if (parts[2].length === 4) {
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }
  return null;
}

function formatDate(dateStr: string | null, lang: string): string {
  if (!dateStr) return "";
  const d = parseDate(dateStr);
  if (!d || isNaN(d.getTime())) return dateStr;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  if (lang === "zh") return `${y}/${m}/${day}`;
  return `${m}/${day}/${y}`;
}

/* ========== Category config ========== */
const categories = [
  { key: "all", zh: "全部", en: "All" },
  { key: "results", zh: "业绩报告", en: "Results" },
  { key: "major", zh: "重大事项", en: "Major Events" },
  { key: "cooperation", zh: "合作动态", en: "Cooperation" },
  { key: "rd", zh: "科研资讯", en: "R&D" },
];

const PAGE_SIZE = 20;

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

/* ========== SVG icons ========== */
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8m0 0L4.5 6.5M7 9l2.5-2.5M2 10.5v1.5A1 1 0 003 13h8a1 1 0 001-1v-1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/* ========== Main component ========== */
export default function AnnouncementSection({
  title,
  announcements,
  years,
  lang,
}: {
  title: string;
  announcements: Announcement[];
  years: number[];
  lang: string;
}) {
  const isZh = lang === "zh";

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filtered & sorted
  const filtered = useMemo(() => {
    let list = [...announcements];

    // Year filter
    if (selectedYear !== null) {
      list = list.filter((a) => a.year === selectedYear);
    }

    // Category filter
    if (activeCategory !== "all") {
      list = list.filter((a) => (a.category || "major") === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((a) => {
        const tzh = a.title_zh.toLowerCase();
        const ten = (a.title_en || "").toLowerCase();
        return tzh.includes(q) || ten.includes(q);
      });
    }

    // Sort by date descending (using parsed date), then by sort_order
    list.sort((a, b) => {
      const da = a.date ? parseDate(a.date) : null;
      const db = b.date ? parseDate(b.date) : null;
      if (da && db) return db.getTime() - da.getTime();
      if (da) return -1;
      if (db) return 1;
      return (a.sort_order || 0) - (b.sort_order || 0);
    });

    return list;
  }, [announcements, selectedYear, activeCategory, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="pb-20 md:pb-28">
      <div className="max-w-4xl mx-auto px-5 md:px-8">

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
                placeholder={isZh ? "搜索公告标题…" : "Search announcements…"}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-divider bg-white text-sm text-text-primary
                  placeholder:text-text-secondary/40 outline-none
                  focus:border-brand/40 focus:ring-2 focus:ring-brand/5 transition-all duration-200"
              />
            </div>

            {/* Year selector */}
            <select
              value={selectedYear ?? ""}
              onChange={(e) => { setSelectedYear(e.target.value ? +e.target.value : null); setVisibleCount(PAGE_SIZE); }}
              className="px-4 py-2.5 rounded-xl border border-divider bg-white text-sm text-text-primary
                outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/5 transition-all duration-200
                appearance-none cursor-pointer"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: "32px" }}
            >
              <option value="">{isZh ? "全部年份" : "All Years"}</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
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
              ? `共 ${filtered.length} 条公告`
              : `${filtered.length} announcements`}
          </p>
        </div>

        {/* ========== ANNOUNCEMENT LIST ========== */}
        <FadeSection>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {visible.map((a, i) => {
                const href = a.pdf_url || "#";
                const isPDF = !!a.pdf_url;

                return (
                  <motion.a
                    key={a.id}
                    href={href}
                    target={isPDF ? "_blank" : undefined}
                    rel={isPDF ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: Math.min(i * 0.015, 0.3), duration: 0.3 }}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl
                      bg-white border border-divider/60
                      hover:border-brand/20 hover:shadow-sm hover:-translate-y-0.5
                      transition-all duration-200 group cursor-pointer"
                  >
                    {/* Left: title */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-text-primary group-hover:text-brand transition-colors duration-200 leading-snug line-clamp-2"
                        style={{ lineHeight: 1.5 }}
                      >
                        {isZh ? a.title_zh : (a.title_en || a.title_zh)}
                      </h3>
                    </div>

                    {/* Middle: date + category tag */}
                    <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-text-secondary whitespace-nowrap">
                        {formatDate(a.date, lang)}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-brand/5 text-brand/70 font-medium whitespace-nowrap">
                        {(() => {
                          const cat = categories.find((c) => c.key === (a.category || "major"));
                          return isZh ? (cat?.zh || a.category) : (cat?.en || a.category);
                        })()}
                      </span>
                    </div>

                    {/* Right: download button */}
                    <span
                      className={`flex items-center gap-1.5 flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-300 ${
                        isPDF
                          ? "bg-brand/5 text-brand border border-brand/15 group-hover:bg-brand group-hover:text-white group-hover:border-brand"
                          : "bg-[#F8F9FA] text-text-secondary border border-divider/50"
                      }`}
                    >
                      <DownloadIcon />
                      <span className="hidden sm:inline">
                        {isPDF ? (isZh ? "下载" : "Download") : (isZh ? "查看" : "View")}
                      </span>
                    </span>

                    {/* Mobile: date below title */}
                    <div className="flex sm:hidden items-center gap-2 flex-shrink-0 text-xs text-text-secondary/60 whitespace-nowrap">
                      {formatDate(a.date, lang)}
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
                {isZh ? "未找到匹配的公告" : "No matching announcements found"}
              </p>
            </div>
          )}
        </FadeSection>

        {/* ========== LOAD MORE ========== */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
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
