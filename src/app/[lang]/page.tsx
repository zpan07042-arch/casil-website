"use client";

import { useI18n } from "@/components/data/I18nProvider";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (isPause) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPause]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const dom = document.querySelector(hash);
      if (dom) dom.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const businessCards = [
    { title: t("nav_overview"), desc: t("card_subsidiary_desc"), href: `${base}/about/background` },
    { title: t("nav_dierction"), desc: t("card_products_desc"), href: `${base}/about/goals` },
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

  return (
    <div className="w-full flex flex-col gap-4 [&_section]:!m-0">
      <section
        id="one"
        className="relative h-[78vh] flex items-center overflow-hidden"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/10 z-[1]" />

        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full text-white flex flex-col items-center justify-center"
          >
            <h1 className="text-center text-4xl md:text-6xl font-bold tracking-tight">
              {t("home_name")}
            </h1>
            <p className="text-center mt-1 text-xl md:text-2xl text-white/90">
              {t("home_stock")}
            </p>
          </motion.div>
        </div>

        <button
          onClick={() => setBgIndex((prev) => (prev - 1 + bgImages.length) % bgImages.length)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 px-3 py-4 text-white/50 hover:text-white transition-all duration-300"
          aria-label="上一張"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={() => setBgIndex((prev) => (prev + 1) % bgImages.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 px-3 py-4 text-white/50 hover:text-white transition-all duration-300"
          aria-label="下一張"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          {bgImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setBgIndex(idx)}
              className={`rounded-full transition-all duration-500 ease-out ${
                bgIndex === idx
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`切换到第 ${idx + 1} 张`}
            />
          ))}
        </div>
      </section>

      <section id="two" className="relative h-[90vh] flex flex-col justify-center bg-white px-6 md:px-16 lg:px-24 pt-16 md:pt-20 pb-24 md:pb-32 text-center overflow-hidden">
        <div
          className="absolute left-0 right-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/baback.jpg')",
            opacity: 0.5,
            top: "4%",
            bottom: "4%",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative z-10 mb-6 md:mb-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] tracking-tight mb-5">
            {t("cbg_title")}
          </h2>
          <div className="mx-auto w-16 h-[4px] bg-[#0F3478] rounded-full" />
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl mx-auto w-full">
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

      <section id="four" className="h-[80vh] flex flex-col justify-center relative overflow-hidden px-6 md:px-16 lg:px-24">
        {/* 雲層背景圖 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/oback.png')" }}
        />
        {/* 半透明深色遮罩 */}
        <div className="absolute inset-0 bg-[#0A2463]/55 backdrop-brightness-70" />

        <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto w-full gap-8 md:gap-10">
          {/* 標題 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5">
              {t("company_goal_title")}
            </h2>
            <div className="mx-auto w-20 h-1 bg-white/60 rounded-full" />
          </motion.div>

          {/* 第一個文本框：目標描述 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full bg-white/10 backdrop-blur-[16px] border border-white/20 rounded-2xl p-6 md:p-8 text-center"
          >
            <p className="text-white/90 text-base md:text-lg leading-relaxed">
              {t("company_goal_desc")}
            </p>
          </motion.div>

          {/* 第二個文本框：業務範圍 + 按鈕 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full bg-white/10 backdrop-blur-[16px] border border-white/20 rounded-2xl p-6 md:p-8 text-center"
          >
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6">
              {t("company_goal_scope")}
            </p>
            <Link
              href={`${base}/about/goals`}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-white/40 text-white text-sm font-medium
                hover:bg-white hover:text-[#0A2463] hover:border-white
                transition-all duration-300"
            >
              {t("home_learn_more")}
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="five" className="bg-white px-6 md:px-16 lg:px-24 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-6xl mx-auto">
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