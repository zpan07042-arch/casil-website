"use client";

import { useI18n } from "@/components/data/I18nProvider";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const bgImages = ["/images/hback.png", "/images/bback.jpg"];

export default function HomePage() {
  const { lang, t } = useI18n();
  const base = `/${lang}`;
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
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
      {/* Hero Section - 100%居中 */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 bg-black/60 z-[1]" />

        {/* 核心：flex + text-center + max-width三重居中 */}
        <div className="relative z-10 w-full flex justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-semibold tracking-tight text-white"
            >
              {t("home_name")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-6 text-lg md:text-xl text-white/90"
            >
              {t("home_stock")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="http://www.casil-group.com:8080/investor/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-brand text-white px-8 py-3 rounded-full text-[17px] font-medium hover:bg-brand-light hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("home_cta_investor")} →
              </a>
              <Link
                href={`${base}/news`}
                className="inline-flex items-center justify-center border border-white text-white px-8 py-3 rounded-full text-[17px] font-medium hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("home_cta_announce")} →
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-text-secondary/30 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-2 bg-text-secondary/40 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Business Cards - 强制居中 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full flex justify-center">
          <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-14"
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
                    className="block bg-bg-secondary rounded-3xl p-8 text-center hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group h-full"
                  >
                    <h3 className="text-xl font-semibold text-text-primary mb-3">
                      {card.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {card.desc}
                    </p>
                    <span className="text-brand text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      {t("home_learn_more")}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Categories - 居中容器 */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="w-full flex justify-center">
          <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-20"
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
                    className="block bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 group h-full"
                  >
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-brand transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-text-secondary text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href={`${base}/news/all`}
                  className="text-brand text-sm font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  {t("home_cta_announce")} →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 完全居中 */}
      <section className="py-20 md:py-28 bg-brand text-white">
        <div className="w-full flex justify-center">
          <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-6"
            >
              {t("nav_investor")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-white/80 text-lg mb-8"
            >
              {t("home_stock")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex justify-center"
            >
              <a
                href="http://www.casil-group.com:8080/investor/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-brand px-8 py-3 rounded-full text-[17px] font-medium hover:bg-white/95 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                {t("home_cta_investor")} →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-shrink-0">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
              >
                {lang === "zh" ? "地理位置" : "Location"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
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
                transition={{ delay: 0.35, duration: 0.6 }}
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
                transition={{ delay: 0.5, duration: 0.6 }}
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
              transition={{ delay: 0.65, duration: 0.6 }}
              className="w-[280px] md:w-[400px] h-[280px] md:h-[400px] flex-shrink-0"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.google.com/maps/place/中国航天国际控股有限公司/@22.302271,114.191669,16z/data=!4m6!3m5!1s0x3404011e29a1b33d:0xcb9a3120a373ba70!8m2!3d22.302271!4d114.191669!16s%2Fg%2F12hv22z0m?hl=zh-CN&entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D"
              >
                <img
                  src="/images/location.png"
                  alt="Map"
                  className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}