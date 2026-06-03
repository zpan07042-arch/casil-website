"use client";

import { useI18n } from "@/components/data/I18nProvider";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" as const },
  }),
};

const bgImages = ["/images/hback.png", "/images/bback.jpg"];

export default function HomePage() {
  const { lang, t } = useI18n();
  const base = `/${lang}`;
  const [bgIndex, setBgIndex] = useState(0);
  const [isPause, setIsPause] = useState(false);

  // 轮播 3s切换
  useEffect(() => {
    if (isPause) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPause]);

  // 锚点路由定位 #four
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const dom = document.querySelector(hash);
      if (dom) dom.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const businessCards = [
    { title: t("nav_subsidiary"), desc: t("card_subsidiary_desc"), href: `${base}/business/subsidiaries` },
    { title: t("nav_products"), desc: t("card_products_desc"), href: `${base}/business/products` },
    { title: t("nav_electronics"), desc: t("card_electronics_desc"), href: `${base}/business/electronics` },
  ];

  const cardIcons = [
    <svg key="topology" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="2" width="16" height="12" rx="2" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="22" y1="14" x2="22" y2="21" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="8" y1="21" x2="36" y2="21" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="8" y1="21" x2="8" y2="28" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="36" y1="21" x2="36" y2="28" stroke="#0F3478" strokeWidth="1.5" />
      <circle cx="8" cy="33" r="4.5" stroke="#0F3478" strokeWidth="1.5" />
      <circle cx="8" cy="33" r="2" fill="#3E92CC" />
      <circle cx="36" cy="33" r="4.5" stroke="#0F3478" strokeWidth="1.5" />
      <circle cx="36" cy="33" r="2" fill="#0F3478" />
      <line x1="12.5" y1="33" x2="31.5" y2="33" stroke="#0F3478" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.4" />
    </svg>,
    <svg key="component" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2.5L38.5 12V31L22 40.5L5.5 31V12L22 2.5Z" stroke="#0F3478" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="22" cy="21.5" r="8.5" stroke="#3E92CC" strokeWidth="1.25" />
      <circle cx="22" cy="21.5" r="3" fill="#0F3478" />
      <line x1="13.5" y1="21.5" x2="19" y2="21.5" stroke="#3E92CC" strokeWidth="1.25" />
      <line x1="25" y1="21.5" x2="30.5" y2="21.5" stroke="#3E92CC" strokeWidth="1.25" />
      <line x1="22" y1="13" x2="22" y2="18.5" stroke="#3E92CC" strokeWidth="1.25" />
      <line x1="22" y1="24.5" x2="22" y2="30" stroke="#3E92CC" strokeWidth="1.25" />
    </svg>,
    <svg key="pcb" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="10" width="20" height="24" rx="2" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="6" y1="16" x2="12" y2="16" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="32" y1="16" x2="38" y2="16" stroke="#0F3478" strokeWidth="1.25" />
      <line x1="6" y1="22" x2="12" y2="22" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="32" y1="22" x2="38" y2="22" stroke="#0F3478" strokeWidth="1.25" />
      <line x1="6" y1="28" x2="12" y2="28" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="32" y1="28" x2="38" y2="28" stroke="#0F3478" strokeWidth="1.25" />
      <circle cx="6" cy="16" r="2" fill="#0F3478" />
      <circle cx="38" cy="16" r="2" fill="#3E92CC" />
      <circle cx="6" cy="22" r="2" fill="#3E92CC" />
      <circle cx="38" cy="22" r="2" fill="#0F3478" />
      <circle cx="6" cy="28" r="2" fill="#0F3478" />
      <circle cx="38" cy="28" r="2" fill="#3E92CC" />
      <rect x="17" y="13" width="10" height="18" rx="1" stroke="#3E92CC" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.5" />
      <line x1="22" y1="31" x2="22" y2="32" stroke="#0F3478" strokeWidth="1.5" />
      <line x1="18" y1="32" x2="26" y2="32" stroke="#0F3478" strokeWidth="1.5" />
      <circle cx="18" cy="33.5" r="1.5" fill="#0F3478" />
      <circle cx="26" cy="33.5" r="1.5" fill="#0F3478" />
    </svg>,
  ];

  const announceCategories = [
    { title: t("cat_perf"), desc: t("cat_perf_sub"), href: `${base}/news/category/results` },
    { title: t("cat_coop"), desc: t("cat_coop_sub"), href: `${base}/news/category/cooperation` },
    { title: t("cat_rnd"), desc: t("cat_rnd_sub"), href: `${base}/news/category/rd` },
    { title: t("cat_major"), desc: t("cat_major_sub"), href: `${base}/news/category/major` },
  ];

  // 5个投资者分类、去掉desc
  const investorCards = [
    {
      title: lang === "zh" ? "公告和通函" : "Announcements & Circulars",
      href: "http://www.casil-group.com:8080/investor/announcements/",
      isOuter: true
    },
    {
      title: lang === "zh" ? "財務報告和環境、社會及管治報告" : "Financial & ESG Reports",
      href: "http://www.casil-group.com:8080/investor/reports/",
      isOuter: true
    },
    {
      title: lang === "zh" ? "動態資訊" : "IR News",
      href: "http://www.casil-group.com:8080/investor/news/",
      isOuter: true
    },
    {
      title: lang === "zh" ? "社會責任" : "Social Responsibility",
      href: "http://www.casil-group.com:8080/investor/social-responsibility/",
      isOuter: true
    },
    {
      title: lang === "zh" ? "投資者查詢" : "Investor Inquiry",
      href: "http://www.casil-group.com:8080/investor/inquiry/",
      isOuter: true
    },
  ];

  return (
    <div className="w-full">
      {/*  轮播  */}
      <section
        id="one"
        className="relative h-screen flex items-center overflow-hidden !my-0 !mx-[-1.25rem] md:!mx-[-2rem]"
        onMouseEnter={() => setIsPause(true)}
        onMouseLeave={() => setIsPause(false)}
      >
        {bgImages.map((img, i) => (
          <div
            key={img}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2s] ease-in-out"
            style={{
              backgroundImage: `url('${img}')`,
              opacity: bgIndex === i ? 1 : 0,
            }}
          />
        ))}
        {/* 淡渐变蒙版 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/10 z-[1]" />

        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {t("home_name")}
            </h1>
            <p className="mt-5 text-lg text-white/90">
              {t("home_stock")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="http://www.casil-group.com:8080/investor/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand text-white px-9 py-4 rounded-md font-medium hover:bg-brand-light transition-all"
              >
                {t("home_cta_investor")}
              </a>
              <Link
                href={`${base}/news`}
                className="border border-white text-white px-9 py-4 rounded-md font-medium hover:bg-white/10 transition-all"
              >
                {t("home_cta_announce")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 指示器 */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {bgImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBgIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${bgIndex === idx ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </section>

      {/* 产业与业务 */}
      <section id="two" className="min-h-screen flex flex-col justify-center bg-white px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs md:text-sm text-gray-400 tracking-[0.2em] mb-5"
        >
          {t("business_slogan")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-24 md:mb-32"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] tracking-tight mb-5">
            {t("business_title")}
          </h2>
          <div className="w-20 h-1 bg-[#0F3478] rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {businessCards.map((card, i) => (
            <motion.div
              key={card.href}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href={card.href}
                className="group block bg-white/40 backdrop-blur-[12px] border border-gray-100 rounded-2xl p-8 md:p-10 h-full
                  hover:-translate-y-1.5 hover:shadow-[0_16px_48px_-12px_rgba(15,52,120,0.18)] hover:border-[#0F3478]/20
                  transition-all duration-500 ease-out"
              >
                <div className="mb-8 w-11 h-11 flex items-center justify-center">
                  {cardIcons[i]}
                </div>
                <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  {card.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-[#0F3478]/20 text-[#0F3478] text-sm font-medium
                  group-hover:bg-[#0F3478] group-hover:text-white group-hover:border-[#0F3478]
                  transition-all duration-300">
                  {t("home_learn_more")}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 公告 */}
      <section id="three" className="min-h-screen flex flex-col justify-center bg-[#F7F8FA] px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] tracking-tight mb-5">
            {t("nav_announce")}
          </h2>
          <div className="w-20 h-1 bg-[#0F3478] rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {announceCategories.map((card, i) => (
            <motion.div
              key={card.href}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href={card.href}
                className="group block bg-white/40 backdrop-blur-[12px] border border-gray-100 rounded-2xl p-8 md:p-10 h-full
                  hover:-translate-y-1.5 hover:shadow-[0_16px_48px_-12px_rgba(15,52,120,0.18)] hover:border-[#0F3478]/20
                  transition-all duration-500 ease-out"
              >
                <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  {card.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-[#0F3478]/20 text-[#0F3478] text-sm font-medium
                  group-hover:bg-[#0F3478] group-hover:text-white group-hover:border-[#0F3478]
                  transition-all duration-300">
                  {t("home_learn_more")}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href={`${base}/news/all`}
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full border border-[#0F3478]/20 text-[#0F3478] font-medium hover:bg-[#0F3478] hover:text-white hover:border-[#0F3478] transition-all duration-300"
          >
            {t("home_cta_announce")} →
          </Link>
        </div>
      </section>

      {/*  投资者【卡片固定min-h统一高度，一屏全容纳】  */}
      <section id="four" className="h-screen flex flex-col justify-center bg-brand text-white px-6 md:px-16 lg:px-24 py-4 md:py-6 relative overflow-hidden">
        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.06] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-5 lg:gap-8">
          {/* left column */}
          <div className="flex-1 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
                {t("nav_investor")}
              </h2>
              <div className="w-20 h-1 bg-white rounded-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/85 text-lg mb-6"
            >
              {t("home_stock")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="http://www.casil-group.com:8080/investor/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-brand font-medium hover:bg-white/95 transition-all"
              >
                {t("home_cta_investor")}
              </a>
            </motion.div>
          </div>

          <div className="flex-1 w-full">
            {/*外层浅色面板*/}
            <div className="bg-white/12 rounded-3xl p-3 md:p-4 border-[0.5px] border-white/12 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {investorCards.map((card, i) => (
                  <motion.div
                    key={card.href}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={i >=3 ? "lg:col-span-1" : ""}
                  >
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-2xl bg-white/10 backdrop-blur-[12px] border-[0.5px] border-white/14 p-4 md:p-5 h-full min-h-[150px] flex flex-col justify-between
                        hover:-translate-y-1.5 hover:shadow-[0_16px_48px_-12px_rgba(255,255,255,0.15)] hover:border-white/40
                        transition-all duration-500 ease-out"
                    >
                      <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">
                        {card.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border-[0.5px] border-white/30 text-white text-sm font-medium
                        group-hover:bg-white group-hover:text-[#0F3478]
                        transition-all duration-300">
                        {t("home_learn_more")}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  联系地址  */}
      <section id="five" className="min-h-screen flex items-center bg-white px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold mb-8 text-text-primary"
            >
              {lang === "zh" ? "地理位置" : "Location"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-text-secondary leading-relaxed max-w-xl"
            >
              {lang === "zh"
                ? "地址：香港九龙红磡德丰街十八号海滨广场一座11字楼1103-1107A室"
                : "Address: Room 1103-1107A, 11/F, Tower 1, Harbourfront Plaza, 18 Tak Fung Street, Hung Hom, Kowloon, Hong Kong"}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="text-lg text-text-secondary leading-relaxed mt-4"
            >
              {lang === "zh"
                ? "电话：( 852 ) 2193 8888  传真：( 852 ) 2193 8899"
                : "Tel: (852) 2193 8888  Fax: (852) 2193 8899"}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-lg text-text-secondary leading-relaxed mt-4"
            >
              {lang === "zh"
                ? "电邮：public@casil-group.com"
                : "Email: public@casil-group.com"}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65 }}
            className="w-[280px] md:w-[400px] h-[280px] md:h-[400px]"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.google.com/maps/place/中国航天国际控股有限公司/@22.302271,114.191669,16z/data=!4m6!3m5!1s0x3404011e29a1b33d:0xcb9a3120a373ba70!8m2!3d22.302271!4d114.191669!16s%2Fg%2F12hv22z0m?hl=zh-CN&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
            >
              <img
                src="/images/location.png"
                alt="Map"
                className="w-full h-full object-contain rounded-md hover:scale-105 transition-transform duration-300"
              />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}