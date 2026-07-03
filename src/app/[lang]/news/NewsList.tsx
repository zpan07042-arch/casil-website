"use client";

import { useI18n } from "@/components/data/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import type { CompanyNews, Lang } from "@/lib/types";

// ============================================================
// Fallback data — from investor website
// ============================================================
const FALLBACK_ITEMS = [
  { date: "2026-05-29", dateKey: "news_item0_date", titleKey: "news_item0_title" },
  { date: "2026-05-13", dateKey: "news_item1_date", titleKey: "news_item1_title" },
  { date: "2026-04-15", dateKey: "news_item2_date", titleKey: "news_item2_title" },
  { date: "2026-04-01", dateKey: "news_item3_date", titleKey: "news_item3_title" },
  { date: "2026-01-19", dateKey: "news_item4_date", titleKey: "news_item4_title" },
  { date: "2026-01-19", dateKey: "news_item5_date", titleKey: "news_item5_title" },
  { date: "2025-11-17", dateKey: "news_item6_date", titleKey: "news_item6_title" },
  { date: "2025-09-29", dateKey: "news_item7_date", titleKey: "news_item7_title" },
  { date: "2025-02-02", dateKey: "news_item8_date", titleKey: "news_item8_title" },
  { date: "2024-01-17", dateKey: "news_item9_date", titleKey: "news_item9_title" },
];

// ============================================================
// Available years for filter
// ============================================================
const YEARS = ["2026", "2025", "2024"];

// ============================================================
// Placeholder image colors
// ============================================================
const CARD_COLORS = [
  "from-[#0A2463] to-[#1A4098]",
  "from-[#0D3B7A] to-[#1565C0]",
  "from-[#0F2D5E] to-[#1E88E5]",
  "from-[#0A2463] to-[#1976D2]",
  "from-[#1A3A6B] to-[#2980B9]",
  "from-[#0B2D5B] to-[#1B5FA0]",
  "from-[#123A6A] to-[#2471C5]",
  "from-[#0A3058] to-[#1D6EB8]",
  "from-[#0F2A50] to-[#1A5090]",
  "from-[#0C3360] to-[#2070B0]",
];

// ============================================================
// Animation variants
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

// ============================================================
// Helpers
// ============================================================
function getCardColor(idx: number): string {
  return CARD_COLORS[idx % CARD_COLORS.length];
}

/** Extract the year from a date string like "2026-05-29" or "2026年5月29日" */
function extractYear(dateStr: string): string {
  const m = dateStr.match(/^(\d{4})/);
  return m ? m[1] : "";
}

interface Props {
  news: CompanyNews[];
  lang: Lang;
}

export default function NewsList({ news, lang }: Props) {
  const { t } = useI18n();
  const [yearFilter, setYearFilter] = useState("");

  const hasData = news && news.length > 0;

  // Build display list: prefer DB data, fallback to i18n
  const allItems = useMemo(() => {
    if (hasData) {
      return news.map((item) => ({
        id: String(item.id),
        date: item.date || "",
        title: lang === "zh" ? item.title_zh : (item.title_en || item.title_zh),
        year: item.date ? extractYear(item.date) : "",
      }));
    }
    return FALLBACK_ITEMS.map((item) => ({
      id: item.titleKey,
      date: t(item.dateKey),
      title: t(item.titleKey),
      year: extractYear(item.date),
    }));
  }, [hasData, news, lang, t]);

  // Filter by selected year
  const filteredItems = useMemo(() => {
    if (!yearFilter) return allItems;
    return allItems.filter((item) => item.year === yearFilter);
  }, [allItems, yearFilter]);

  return (
    <section className="flex justify-center px-6 md:px-8 py-12 md:py-16">
      <div className="w-full max-w-[1100px]">
        {/* ── 年份筛选 ── */}
        <div className="flex items-center justify-start mb-6">
          <label className="text-sm text-[#86868B] mr-2 font-medium">
            {lang === "zh" ? "年份篩選" : "Filter by Year"}
          </label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="block w-32 pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-md
              bg-white text-[#2D3142] focus:outline-none focus:ring-2 focus:ring-[#0A2463]/20
              focus:border-[#0A2463]/40 appearance-none cursor-pointer
              bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2386868B%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')]
              bg-[length:12px] bg-[right_10px_center] bg-no-repeat"
          >
            <option value="">{lang === "zh" ? "全部" : "All"}</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {lang === "zh" ? `${y}年` : y}
              </option>
            ))}
          </select>
        </div>

        {/* ── 卡片列表 ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {filteredItems.length === 0 && (
            <p className="text-center text-[#86868B] py-16 text-sm">
              {lang === "zh" ? "暫無相關新聞" : "No news found"}
            </p>
          )}

          <AnimatePresence mode="wait">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={idx}
              >
                <div
                  className={`
                    group flex items-center gap-6 md:gap-10 px-8 md:px-14 py-9 md:py-12
                    hover:bg-gray-50/60 transition-colors duration-300
                    ${idx < filteredItems.length - 1 ? "border-b border-gray-100" : ""}
                  `}
                >
                  {/* 左侧：图片占位 */}
                  <div
                    className={`
                      shrink-0 w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-lg bg-gradient-to-br
                      flex items-center justify-center overflow-hidden
                      ${getCardColor(idx)}
                    `}
                  >
                    <svg
                      className="w-10 h-10 md:w-14 md:h-14 text-white/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>

                  {/* 中间：标题 + 日期（日期在下方） */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg text-[#2D3142] font-medium leading-relaxed line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <span className="inline-block text-sm text-[#86868B] font-medium tracking-wide">
                      {item.date}
                    </span>
                  </div>

                  {/* 右侧：箭头 */}
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-100 group-hover:bg-[#0A2463] transition-colors duration-300">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
