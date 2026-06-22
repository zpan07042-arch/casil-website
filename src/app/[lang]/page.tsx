"use client";

import { useI18n } from "@/components/data/I18nProvider";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export default function HomePage() {
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
  // News grid data — 3 columns × 4 items
  // ============================================================
  const newsColumns = [
    {
      titleKey: "news_col1_title",
      href: `${base}/news`,
      items: [
        { dateKey: "news_c1_item1_date", titleKey: "news_c1_item1_title" },
        { dateKey: "news_c1_item2_date", titleKey: "news_c1_item2_title" },
        { dateKey: "news_c1_item3_date", titleKey: "news_c1_item3_title" },
        { dateKey: "news_c1_item4_date", titleKey: "news_c1_item4_title" },
      ],
    },
  ];

  return (
    <div className="w-full">
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
          style={{ backgroundImage: "url('/images/bback.jpg')" }}
        />
        {/* Deep dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75 z-[1]" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            {t("home_name")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-1 text-xl md:text-2xl text-white/90"
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
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full
                bg-white/10 backdrop-blur-md border border-white/25 text-white text-base md:text-lg font-medium
                hover:bg-white hover:text-[#0A0E17] hover:border-white
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
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full
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
      <section id="news" className="relative bg-white pt-16 pb-24 md:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-32">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mb-12 md:mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0E17] tracking-tight">
              {t("news_center_title")}
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#86868B] font-light tracking-wide">
              {t("news_center_subtitle")}
            </p>
          </motion.div>

          {/* Featured image area */}
          <motion.div
            ref={newsRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="relative w-full overflow-hidden rounded-3xl"
            style={{ height: "calc(100vh * 4 / 9)" }}
          >
            {/* Parallax image */}
            <motion.div
              style={{
                y: parallaxY,
                backgroundImage: "url('/images/bback.jpg')",
              }}
              className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 z-[1]" />
            {/* Glow points */}
            <div className="orchid-glow" style={{ top: "20%", left: "15%" }} />
            <div className="orchid-glow" style={{ top: "50%", right: "20%", animationDelay: "1.5s" }} />
            <div className="orchid-glow" style={{ bottom: "25%", left: "55%", animationDelay: "0.8s", width: "80px", height: "80px" }} />

            {/* Featured news overlay — bottom-left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.3}
              className="absolute bottom-0 left-0 z-10 p-8 md:p-12 lg:p-16 max-w-3xl"
            >
              <span className="inline-block text-xs md:text-sm font-medium text-[#3E92CC] tracking-widest uppercase mb-4">
                {t("news_featured_date")}
              </span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-4">
                {t("news_featured_title")}
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed line-clamp-3">
                {t("news_featured_desc")}
              </p>
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* 集團要文 — horizontal list layout                           */}
          {/* ============================================================ */}
          <div style={{ marginTop: "64px" }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0E17] tracking-tight mb-8 md:mb-10 text-center">
              {t("news_col1_title")}
            </h2>

            <div className="flex flex-col">
              {newsColumns[0].items.map((item, itemIdx) => (
                <motion.div
                  key={item.titleKey}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={itemIdx * 0.1}
                >
                  <Link
                    href={newsColumns[0].href}
                    className="news-row group flex items-center gap-4 md:gap-6 py-5 md:py-6 border-b border-gray-100
                      hover:bg-gray-50/50 transition-colors duration-400 -mx-2 px-2 rounded"
                  >
                    {/* 左侧：日期标签 */}
                    <span className="text-xs md:text-sm text-[#86868B] font-medium tracking-wide whitespace-nowrap w-20 md:w-24 shrink-0">
                      {t(item.dateKey)}
                    </span>

                    {/* 中间：新闻标题 */}
                    <span className="flex-1 text-sm md:text-base text-[#2D3142] font-medium leading-snug
                      group-hover:text-[#0A2463] transition-colors duration-400">
                      {t(item.titleKey)}
                    </span>

                    {/* 右侧：箭头 — hover 向右滑出消失 */}
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
      {/* Section 4 — Location & Map (preserved from original)         */}
      {/* ============================================================ */}
      <section id="location" className="bg-white py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-6xl mx-auto px-6 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col"
          >
            <div className="border border-gray-200 rounded-2xl p-8 md:p-10 h-full flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a2e] mb-8 text-left">
                {t("loc_title")}
              </h2>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.4768248333967!2d114.189094!3d22.302271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404011e29a1b33d%3A0xcb9a3120a373ba70!2z5Lit5ZyL6Iiq5aSp5ZyL6Zqb5o6n6IKh5pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-CN!2shk!4v1718000000000"
              className="w-full h-full rounded-2xl border border-gray-200"
              style={{ minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
