"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-6 rounded-full bg-brand" />
      <h2 className="text-xl md:text-2xl font-bold text-text-primary">
        {children}
      </h2>
    </div>
  );
}

/* ========== Contact card icons ========== */
function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 3h8a1 1 0 011 1v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9 15h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 6l8 5.5L18 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 2C6.7 2 4 4.7 4 7.9c0 4.4 6 9.1 6 9.1s6-4.7 6-9.1C16 4.7 13.3 2 10 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="10" cy="10" rx="4" ry="8" stroke="currentColor" strokeWidth="0.8" />
      <path d="M2 10h16" stroke="currentColor" strokeWidth="0.8" />
      <path d="M10 2c2 2.2 2 6.4 0 8-2-1.6-2-5.8 0-8" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 5v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ShareholderSection({
  title,
  lang,
}: {
  title: string;
  lang: string;
}) {
  const isZh = lang === "zh";

  const contactCards = [
    {
      icon: <IconPhone />,
      label: isZh ? "电话" : "Phone",
      value: "(852) 2980 1333",
      href: "tel:+85229801333",
    },
    {
      icon: <IconEmail />,
      label: isZh ? "电邮" : "Email",
      value: "casil-31-ecom@vistra.com",
      href: "mailto:casil-31-ecom@vistra.com",
    },
    {
      icon: <IconLocation />,
      label: isZh ? "地址" : "Address",
      value: isZh
        ? "香港夏慤道16号 远东金融中心17楼"
        : "17/F, Far East Finance Centre, 16 Harcourt Road, Hong Kong",
      href: "https://maps.google.com/?q=Far+East+Finance+Centre+16+Harcourt+Road+Hong+Kong",
    },
    {
      icon: <IconWeb />,
      label: isZh ? "网址" : "Website",
      value: "www.srhk.vistra.com",
      href: "https://www.srhk.vistra.com",
    },
    {
      icon: <IconClock />,
      label: isZh ? "办公时间" : "Office Hours",
      value: isZh
        ? "上午九时至下午四时三十分（星期一至星期五，公众假期除外）"
        : "9:00 a.m. – 4:30 p.m. (Mon–Fri, except public holidays)",
      href: null,
    },
  ];

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
        </motion.div>

        {/* ========== MODULE 1: COMMUNICATION TYPES ========== */}
        <FadeSection className="mb-12 md:mb-16">
          <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm
            hover:shadow-md hover:border-brand/10 transition-all duration-500">
            <div className="absolute top-0 right-0 w-36 h-36 rounded-bl-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, #0A2463, transparent 70%)" }}
            />
            <div className="relative">
              <SectionTitle>
                {isZh ? "通讯类型" : "Communication Types"}
              </SectionTitle>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-5"
                style={{ lineHeight: 1.7 }}
              >
                {isZh
                  ? "本公司的公司通讯包括以下类型，均刊载于香港交易及结算所有限公司及本公司网站："
                  : "The Company's corporate communications include the following types, published on the websites of HKEX and the Company:"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { zh: "股东通函", en: "Shareholders' Circulars" },
                  { zh: "年报（含 ESG 报告）", en: "Annual Reports (incl. ESG)" },
                  { zh: "中期报告", en: "Interim Reports" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3 p-4 rounded-xl border border-divider/50
                      bg-[#F8F9FA] hover:bg-white hover:border-brand/20 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-brand-light flex-shrink-0" />
                    <span className="text-sm font-semibold text-text-primary">
                      {isZh ? item.zh : item.en}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ========== MODULE 2: DISTRIBUTION METHODS ========== */}
        <FadeSection className="mb-12 md:mb-16">
          <div className="relative rounded-2xl p-8 md:p-10 border border-divider/50
            hover:shadow-md hover:border-brand/10 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.03), rgba(62,146,204,0.03))" }}>
            <div className="relative">
              <SectionTitle>
                {isZh ? "发放方式" : "Distribution Methods"}
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl border border-divider/60 p-6 hover:border-brand/20 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-lg bg-brand/5 flex items-center justify-center text-brand/60 flex-shrink-0">
                      <IconEmail />
                    </div>
                    <h4 className="text-sm font-bold text-text-primary">
                      {isZh ? "电子邮件通知" : "Email Notification"}
                    </h4>
                  </div>
                  <p className="text-[13px] text-text-secondary leading-relaxed"
                    style={{ lineHeight: 1.65 }}
                  >
                    {isZh
                      ? "公司通讯以电邮方式发送通知予已登记电邮地址的股东，股东可通过股份过户登记处更新电邮地址。"
                      : "Notifications are sent by email to shareholders who have registered their email addresses. Shareholders may update their email via the share registrar."}
                  </p>
                </motion.div>

                {/* Printed copy */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl border border-divider/60 p-6 hover:border-brand/20 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-9 h-9 rounded-lg bg-brand/5 flex items-center justify-center text-brand/60 flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M6 7h8M6 10h8M6 13h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold text-text-primary">
                      {isZh ? "印刷本索取" : "Printed Copy Request"}
                    </h4>
                  </div>
                  <p className="text-[13px] text-text-secondary leading-relaxed"
                    style={{ lineHeight: 1.65 }}
                  >
                    {isZh
                      ? "股东可经本公司股份过户登记处卓佳证券登记有限公司向本公司提出要求，索取公司通讯的印刷本。"
                      : "Shareholders may request printed copies of corporate communications through Tricor Secretaries Limited, the Company's share registrar."}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ========== MODULE 3: CONTACT INFORMATION ========== */}
        <FadeSection>
          <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm
            hover:shadow-md hover:border-brand/10 transition-all duration-500">
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at bottom left, #3E92CC, transparent 70%)" }}
            />
            <div className="relative">
              <SectionTitle>
                {isZh ? "联系信息" : "Contact Information"}
              </SectionTitle>

              {/* Registrar name */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-text-primary mb-1">
                  {isZh ? "股份过户登记处" : "Share Registrar"}
                </h4>
                <p className="text-[15px] font-semibold text-brand">
                  {isZh ? "卓佳证券登记有限公司" : "Tricor Secretaries Limited"}
                </p>
              </div>

              {/* Contact cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {contactCards.map((card, i) => {
                  const isLink = !!card.href;
                  const Comp = isLink ? "a" : "div";

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                    >
                      <Comp
                        href={isLink ? card.href! : undefined}
                        target={isLink ? "_blank" : undefined}
                        rel={isLink ? "noopener noreferrer" : undefined}
                        className={`flex items-start gap-3 p-4 rounded-xl border border-divider/50
                          bg-[#F8F9FA] hover:bg-white hover:border-brand/20 hover:shadow-sm
                          transition-all duration-300 group cursor-default
                          ${isLink ? "cursor-pointer" : ""}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-brand/5 flex items-center justify-center
                          text-brand/50 group-hover:text-brand group-hover:bg-brand/10
                          transition-all duration-300 flex-shrink-0 mt-0.5">
                          {card.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] text-text-secondary/60 mb-0.5 uppercase tracking-wider font-medium">
                            {card.label}
                          </p>
                          <p className="text-[13px] font-semibold text-text-primary leading-snug
                            group-hover:text-brand transition-colors duration-300 break-all"
                            style={{ lineHeight: 1.5 }}
                          >
                            {card.value}
                          </p>
                        </div>
                      </Comp>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeSection>

      </div>
    </section>
  );
}
