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

  const announceCategories = [
    { title: t("cat_perf"), desc: t("cat_perf_sub"), href: `${base}/news/category/results` },
    { title: t("cat_coop"), desc: t("cat_coop_sub"), href: `${base}/news/category/cooperation` },
    { title: t("cat_rnd"), desc: t("cat_rnd_sub"), href: `${base}/news/category/rd` },
    { title: t("cat_major"), desc: t("cat_major_sub"), href: `${base}/news/category/major` },
  ];

  return (
    <div className="w-full">
      {/*  轮播  */}
      <section
        id="one"
        className="relative h-screen flex items-center overflow-hidden"
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

      {/*  业务  */}
      <section id="two" className="h-screen flex flex-col justify-center bg-white px-6 md:px-16 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-12 text-text-primary"
        >
          {t("business_title")}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="block bg-white rounded-md p-7 border border-gray-100 hover:-translate-y-[4px] transition-all duration-300 group h-full"
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {card.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>
                <span className="text-brand text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                  {t("home_learn_more")} →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 公告 */}
      <section id="three" className="h-screen flex flex-col justify-center bg-[#F7F8FA] px-6 md:px-16 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-12 text-text-primary"
        >
          {t("nav_announce")}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                className="block bg-white rounded-md p-6 hover:-translate-y-[4px] transition-all duration-300 group h-full"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {card.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {card.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href={`${base}/news/all`}
            className="text-brand text-base font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            {t("home_cta_announce")} →
          </Link>
        </div>
      </section>

      {/*  投资者  */}
      <section id="four" className="h-screen flex flex-col justify-center bg-brand text-white px-6 md:px-16 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-6"
        >
          {t("nav_investor")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/85 text-lg mb-8 max-w-2xl"
        >
          {t("home_stock")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="http://www.casil-group.com:8080/investor/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-brand px-7 py-3 rounded-md font-medium hover:bg-white/95 transition-all"
          >
            {t("home_cta_investor")} →
          </a>
        </motion.div>
      </section>

      {/*  联系地址  */}
      <section id="five" className="h-screen flex items-center bg-white px-6 md:px-16 lg:px-24">
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