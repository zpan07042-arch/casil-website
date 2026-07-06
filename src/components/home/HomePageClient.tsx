"use client";

import { useI18n } from "@/components/data/I18nProvider";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BusinessDomains from "@/components/home/BusinessDomains";
import { getImageSrc } from "@/lib/image";
import type { CompanyNews, Lang } from "@/lib/types";

// ============================================================
// Animation variants
// ============================================================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

// ============================================================
// Fallback news items — used when no DB data is available
// ============================================================
const FALLBACK_NEWS_KEYS = [
  { dateKey: "news_item0_date", titleKey: "news_item0_title" },
  { dateKey: "news_item1_date", titleKey: "news_item1_title" },
  { dateKey: "news_item2_date", titleKey: "news_item2_title" },
  { dateKey: "news_item3_date", titleKey: "news_item3_title" },
];

// ============================================================
// Format a date string for display
// ============================================================
function formatNewsDate(dateStr: string, lang: Lang): string {
  if (!dateStr) return "";

  // If the date is already in a display format (e.g. "2026年5月29日" or "May 29, 2026"), return as-is
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

  // Parse ISO date
  const parts = dateStr.split("-");
  const year = parts[0];
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (lang === "zh") {
    return `${year}年${month}月${day}日`;
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

export default function HomePageClient({
  latestNews,
}: {
  latestNews: CompanyNews[];
}) {
  const { lang, t } = useI18n();
  const base = `/${lang}`;

  // Parallax ref for news image
  const newsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: newsRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // ============================================================
  // Build news list: prefer DB data (first 5), fallback to i18n keys
  //   - featured: latestNews[0] (最新一條，用於大圖展示)
  //   - grid: latestNews[1..4] (第二～第五條，用於 2×2 網格)
  // ============================================================
  const hasDbData = latestNews && latestNews.length > 0;

  // Featured news text for the image overlay — uses latest news title, falls back to i18n
  const featuredNewsText = hasDbData
    ? (lang === "zh"
        ? latestNews[0].title_zh
        : (latestNews[0].title_en || latestNews[0].title_zh))
    : t("news_featured_desc");

  const featuredNewsDate = hasDbData
    ? formatNewsDate(latestNews[0].date || "", lang)
    : t("news_featured_date");

  // Featured news cover image — use latest news cover, fallback to static image
  const featuredImage = hasDbData && latestNews[0].cover_image
    ? getImageSrc(latestNews[0].cover_image)
    : "/images/bback.jpg";

  const newsItems = hasDbData
    ? latestNews.slice(1, 5).map((item) => ({
        id: String(item.id),
        date: formatNewsDate(item.date || "", lang),
        title: lang === "zh" ? item.title_zh : (item.title_en || item.title_zh),
      }))
    : FALLBACK_NEWS_KEYS.map((item) => ({
        id: item.titleKey,
        date: t(item.dateKey),
        title: t(item.titleKey),
      }));

  return (
    <div className="w-full flex flex-col [&>:not(:first-child)]:mt-8">
      {/* ============================================================ */}
      {/* Section 1 — Hero (full screen, centered)                      */}
      {/* ============================================================ */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ marginTop: "-56px" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${featuredImage}')` }}
        />
        {/* Deep dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75 z-[1]" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 flex flex-col items-center text-center">
                    {/* Orbit decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center mb-10"
          >
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border border-white/15" />
              <div className="absolute inset-3 rounded-full border border-white/25" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white/70 shadow-lg shadow-white/20" />
              </div>
              <div
                className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-blue-300/80"
                style={{ boxShadow: "0 0 8px rgba(147,197,253,0.6)" }}
              />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-7xl font-bold tracking-tight text-white"
          >
            {t("home_name")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto w-24 h-[1px] bg-white/30 my-6 md:my-8 transform origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xl md:text-2xl text-white/90"
          >
            {t("home_stock")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href={`${base}/business`}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                bg-[#0A2463] text-white text-base md:text-lg font-medium
                hover:bg-[#0A2463]/30 backdrop-blur-md border border-[#0A2463]/50 hover:text-white hover:border-[#0A2463]/50
                transition-all duration-500 ease-out"
            >
              <span>{t("home_explore_business")}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="http://www.casil-group.com:8080/investor/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                bg-white/10 backdrop-blur-md border border-white/25 text-white text-base md:text-lg font-medium
                hover:bg-white hover:text-[#0A0E17] hover:border-white
                transition-all duration-500 ease-out"
            >
              <span>{t("home_investor_relations")}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* Section 2 — News Center (image-driven featured story)        */}
      {/* ============================================================ */}
      <section id="news" className="relative bg-white pt-8 pb-0 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-32">
          {/* Section header — English title + Chinese subtitle, divider below */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-12 md:mb-16 text-center"
          >
            <p className="mt-3 text-base md:text-lg text-[#86868B] font-light tracking-wide">
              {t("news_center_subtitle")}
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0E17] tracking-tight">
              {t("news_center_title")}
            </p>
            <div className="mx-auto mt-8 w-20 h-[2px] bg-[#3E92CC] rounded-xl" />
          </motion.div>

          {/* Featured image area — clickable link to news detail */}
          <div
            className="relative w-full overflow-hidden rounded-3xl group cursor-pointer"
            style={{ height: "calc(100vh * 5 / 7)" }}
          >
            <Link
              href={hasDbData ? `${base}/news/${latestNews[0].id}` : `${base}/news`}
              className="absolute inset-0 z-20"
              aria-label={featuredNewsText}
            />
            <motion.div
              ref={newsRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeIn}
              className="relative w-full h-full"
            >
              {/* Parallax image */}
              <motion.div
                style={{
                  y: parallaxY,
                  backgroundImage: `url('${featuredImage}')`,
                }}
                className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 z-[1]" />

              {/* Featured news overlay — 黑色通栏底边字幕栏 */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0.3}
                className="absolute bottom-0 inset-x-0 z-10 bg-black/60 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 group-hover:bg-black/70 transition-colors"
              >
                <p className="text-xs md:text-sm text-white/80 leading-relaxed line-clamp-2 max-w-[1400px] mx-auto text-center">
                  {featuredNewsText}
                </p>
                <p className="text-xs text-white/50 mt-1 text-center">
                  {featuredNewsDate}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* 集團要文 — 2×2 grid layout                                  */}
          {/* ============================================================ */}
          <div style={{ marginTop: "64px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {newsItems.map((item, itemIdx) => (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={itemIdx * 0.1}
                >
                  <Link
                    href={hasDbData ? `${base}/news/${item.id}` : `${base}/news`}
                    className="group flex items-center gap-3 md:gap-4 py-4 md:py-5 border-b border-gray-100
                      hover:bg-gray-50/50 transition-colors duration-400 -mx-2 px-2 rounded-sm"
                  >
                    {/* 日期标签 */}
                    <span className="text-xs md:text-sm text-[#86868B] font-medium tracking-wide whitespace-nowrap w-20 md:w-24 shrink-0">
                      {item.date}
                    </span>

                    {/* 新闻标题 */}
                    <span className="flex-1 text-sm md:text-base text-[#2D3142] font-medium leading-snug
                      group-hover:text-[#0A2463] transition-colors duration-400 truncate">
                      {item.title}
                    </span>

                    {/* 箭头 — hover 向右滑出消失 */}
                    <span className="shrink-0 text-[#2D3142] text-lg font-light
                      transform translate-x-0 opacity-100
                      group-hover:translate-x-6 group-hover:opacity-0
                      transition-all duration-400 ease-out">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 3 — Business Domains (業務領域)                       */}
      {/* ============================================================ */}
      <BusinessDomains />

      {/* ============================================================ */}
      {/* Section 4 — Geographic Presence (地理位置)                    */}
      {/* ============================================================ */}
      <section id="location" className="bg-white pt-12 pb-16">
        {/* Section header — subtitle + title + divider */}
        <div className="mb-16 md:mb-24 text-center px-6">
          <p className="text-[#5BA4D6] text-xs md:text-sm tracking-[0.28em] uppercase font-medium mb-4">
            {t("loc_subtitle")}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0E17] tracking-wide mb-5">
            {t("loc_title")}
          </h2>
          <div className="mx-auto w-20 h-[2px] bg-[#3E92CC] rounded-xl" />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col"
          >
            <div className="border border-gray-200 rounded-2xl p-8 md:p-10 h-full flex flex-col justify-center">
              <div className="space-y-5 text-left">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#0A2463] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {t("loc_addr")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#0A2463] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {t("loc_tel")}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#0A2463] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {t("loc_email")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex-1 min-h-[400px] lg:min-h-0"
          >
            <iframe
              title="公司位置"
              src="https://map.baidu.com/poi/中国航天国际控股有限公司/@12713179.251287216,2533430.9058669005,13.29z?uid=c7168b4709219f8eaf04570e&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&en_uid=c7168b4709219f8eaf04570e&pcevaname=pc4.1&querytype=detailConInfo&da_src=shareurl"
              className="w-full h-full rounded-2xl border border-gray-200"
              style={{ minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Section 5 — Get In Touch (CTA)                                */}
      {/* ============================================================ */}
      <section
        id="get-in-touch"
        className="relative pt-16 pb-28 md:pt-24 md:pb-28 overflow-hidden !mb-0"
        style={{ background: "#001433" }}
      >
        {/* ---- 外层大光晕 ---- */}
        <div
          className="absolute pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,58,140,0.5) 0%, transparent 70%)",
            width: "700px",
            height: "700px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* ---- 内层小光晕 ---- */}
        <div
          className="absolute pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(21,101,192,0.35) 0%, transparent 70%)",
            width: "350px",
            height: "350px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* ---- 网格纹理叠层 ---- */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.04,
          }}
        />

        {/* ---- 内容 ---- */}
        <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-16 text-center">
          {/* 小标签 — 蓝色 */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-[#3E92CC] text-xs md:text-sm tracking-[0.28em] uppercase font-medium mb-5"
          >
            {t("get_in_touch_label")}
          </motion.p>

          {/* 大标题 — 白色 */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.1}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6"
          >
            {t("get_in_touch_title")}
          </motion.h2>

          {/* 副标题 — 浅蓝色 */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.2}
            className="text-base md:text-lg text-[#8DB8E8] font-light leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {t("get_in_touch_subtitle")}
          </motion.p>

          {/* CTA 按钮组 — 与 Hero 区按钮风格一致 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* 立即联络我们 — 主按钮 */}
            <Link
              href={`${base}/contact`}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                bg-[#0A2463]/30 backdrop-blur-md border border-[#0A2463]/50 text-white text-base md:text-lg font-medium
                hover:bg-[#0A2463] hover:text-white hover:border-[#0A2463]
                transition-all duration-500 ease-out"
            >
              <span>{t("get_in_touch_contact_btn")}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            {/* 查看投资者资料 — 次按钮 */}
            <Link
              href="http://www.casil-group.com:8080/investor/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl
                bg-white/10 backdrop-blur-md border border-white/25 text-white text-base md:text-lg font-medium
                hover:bg-white hover:text-[#0A0E17] hover:border-white
                transition-all duration-500 ease-out"
            >
              <span>{t("get_in_touch_investor_btn")}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
