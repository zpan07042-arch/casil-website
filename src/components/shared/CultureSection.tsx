"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ========== SVG Icons for Core Values ========== */
function IconPatriotism() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="6" y="8" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 14h24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8V6a2 2 0 012-2h8a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function IconInnovation() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 6v3M18 27v3M6 18h3m18 0h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 9.5l2.1 2.1M24.4 24.4l2.1 2.1M9.5 26.5l2.1-2.1M24.4 11.6l2.1-2.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconIntegrity() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 4L6 9v10c0 7.5 5 13 12 14 7-1 12-6.5 12-14V9L18 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 18l3.5 3.5 8-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHarmony() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="13" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="14" r="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="23" cy="14" r="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 24c2.5-3 6-5 10-5s7.5 2 10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconResponsibility() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 6v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 18l4-4h8l4 4v8a2 2 0 01-2 2H12a2 2 0 01-2-2v-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 28v-6h8v6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

interface ValueItem {
  key: string;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  Icon: React.FC;
}

const values: ValueItem[] = [
  {
    key: "patriotism",
    titleZh: "爱国",
    titleEn: "Patriotism",
    descZh: "爱国、爱港、爱航天、爱企业",
    descEn: "Love the country, love Hong Kong, love aerospace, love the enterprise",
    Icon: IconPatriotism,
  },
  {
    key: "innovation",
    titleZh: "创新",
    titleEn: "Innovation",
    descZh: "坚持新发展理念，以创新驱动发展",
    descEn: "Adhere to new development concepts and drive development through innovation",
    Icon: IconInnovation,
  },
  {
    key: "integrity",
    titleZh: "诚信",
    titleEn: "Integrity",
    descZh: "恪守诚信，以廉洁及公平为原则，依法守法，坚持合作共赢，善待各持份者",
    descEn: "Uphold integrity, adhere to honesty and fairness, comply with the law, and treat all stakeholders well",
    Icon: IconIntegrity,
  },
  {
    key: "harmony",
    titleZh: "和谐",
    titleEn: "Harmony",
    descZh: "以德治企，坚持团结共事，和谐共享",
    descEn: "Govern the enterprise with virtue, adhere to unity and collaboration, and share harmony",
    Icon: IconHarmony,
  },
  {
    key: "responsibility",
    titleZh: "尽责",
    titleEn: "Responsibility",
    descZh: "敢担当、负责任",
    descEn: "Dare to take on responsibility and be accountable",
    Icon: IconResponsibility,
  },
];

/* ========== Fade-in section wrapper ========== */
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

/* ========== Section title ========== */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-6 rounded-full bg-brand" />
      <h2 className="text-xl md:text-2xl font-bold text-text-primary">
        {children}
      </h2>
    </div>
  );
}

/* ========== Main component ========== */
export default function CultureSection({
  title,
  lang,
}: {
  title: string;
  lang: string;
}) {
  const isZh = lang === "zh";

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
            className="w-16 h-[3px] mb-8 rounded-full"
            style={{
              background: "linear-gradient(90deg, #0A2463, #3E92CC)",
              transformOrigin: "left",
            }}
          />
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl"
            style={{ lineHeight: 1.7 }}
          >
            {isZh
              ? "「爱国、创新、诚信、和谐、尽责」为本公司企业文化的核心，是企业使命和业务发展原则，也是全体员工日常业务运作的指导方向。"
              : '"Patriotism, Innovation, Integrity, Harmony, Responsibility" are the core values of our corporate culture, guiding our mission, business principles, and daily operations.'}
          </p>
        </motion.div>

        {/* ========== 1. CORE VALUES ========== */}
        <FadeSection className="mb-16 md:mb-24">
          <SectionTitle>
            {isZh ? "核心价值观" : "Core Values"}
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                className="group relative bg-white rounded-xl border border-divider p-5 md:p-6
                  hover:-translate-y-1.5 hover:shadow-lg hover:shadow-brand/5 hover:border-brand/30
                  transition-all duration-300 cursor-default"
              >
                {/* Background subtle pattern */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(10,36,99,0.04), transparent 70%)" }}
                  />
                </div>

                <div className="relative">
                  <div className="text-brand mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
                    <v.Icon />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-brand transition-colors duration-300">
                    {isZh ? v.titleZh : v.titleEn}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed"
                    style={{ lineHeight: 1.65 }}
                  >
                    {isZh ? v.descZh : v.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeSection>

        {/* ========== 2. MISSION ========== */}
        <FadeSection className="mb-16 md:mb-20">
          <div className="relative bg-[#F8F9FA] rounded-2xl p-8 md:p-10 border border-divider/50"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.03), rgba(62,146,204,0.03))" }}
          >
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl opacity-[0.06]"
              style={{ background: "radial-gradient(circle at top right, #0A2463, transparent 70%)" }}
            />

            <SectionTitle>
              {isZh ? "企业使命" : "Our Mission"}
            </SectionTitle>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl"
              style={{ lineHeight: 1.7 }}
            >
              {isZh
                ? "为客户、股东、员工及社会缔造持久的价值和效益。"
                : "To create lasting value and benefits for customers, shareholders, employees and society."}
            </p>
          </div>
        </FadeSection>

        {/* ========== 3. VISION ========== */}
        <FadeSection className="mb-16 md:mb-20">
          <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm">
            <SectionTitle>
              {isZh ? "企业愿景" : "Our Vision"}
            </SectionTitle>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl"
              style={{ lineHeight: 1.7 }}
            >
              {isZh
                ? "本公司致力推动技术创新和专业化制造，专注以高品质和高效率为供应链及产业链服务，聚焦先进制造业及现代服务业作为核心能力，冀成为面向未来、具有显著创新能力和持续为客户创造价值的国际化企业，为客户提供专业、高效、安全和环保的产品和服务。"
                : "The Company is committed to promoting technological innovation and specialized manufacturing, focusing on serving the supply chain and industrial chain with high quality and efficiency, aspiring to become a future-oriented international enterprise with significant innovation capabilities that continuously creates value for customers."}
            </p>
          </div>
        </FadeSection>

        {/* ========== 4. COMPLIANCE ========== */}
        <FadeSection className="mb-16 md:mb-20">
          <div className="relative bg-[#F8F9FA] rounded-2xl p-8 md:p-10 border border-divider/50"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.02), rgba(62,146,204,0.02))" }}
          >
            <SectionTitle>
              {isZh ? "合规守则" : "Compliance & Ethics"}
            </SectionTitle>
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-3xl mb-5"
              style={{ lineHeight: 1.7 }}
            >
              {isZh
                ? "本公司以审慎的态度经营及管理业务，以确保业务能在将来持续发展，为社会经济作出贡献。我们制定了清晰的合规政策，将企业价值观融入日常业务运作和作业方式中。"
                : "The Company operates with a prudent approach to ensure sustainable development and contribute to social and economic progress. Clear compliance policies are established to integrate corporate values into daily operations."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  zh: "《员工合规经营行为守则》",
                  en: "Employee Compliance Conduct Code",
                  descZh: "清晰向员工传达所需的合规经营意识，确保公司以高道德水平及专业操守营运",
                  descEn: "Clearly communicates compliance awareness to employees, ensuring high ethical and professional standards",
                },
                {
                  zh: "《反贪污政策》",
                  en: "Anti-Corruption Policy",
                  descZh: "缔造廉洁守正的经营团队，防范贪污及不当行为",
                  descEn: "Foster a clean and honest management team, prevent corruption and misconduct",
                },
                {
                  zh: "《举报政策》",
                  en: "Whistleblowing Policy",
                  descZh: "建立透明、负责任的举报机制，保障举报人权益",
                  descEn: "Establish a transparent and responsible reporting mechanism to protect whistleblowers",
                },
              ].map((policy, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl border border-divider p-5 hover:border-brand/20 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-light flex-shrink-0" />
                    <h4 className="text-sm font-semibold text-brand">
                      {isZh ? policy.zh : policy.en}
                    </h4>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed"
                    style={{ lineHeight: 1.6 }}
                  >
                    {isZh ? policy.descZh : policy.descEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ========== 5. CULTURE IMPLEMENTATION ========== */}
        <FadeSection>
          <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm">
            <SectionTitle>
              {isZh ? "文化落地" : "Culture in Practice"}
            </SectionTitle>

            {/* Org structure */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                {isZh ? "组织保障" : "Organizational Support"}
              </h4>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed"
                style={{ lineHeight: 1.7 }}
              >
                {isZh
                  ? "本公司设有企业文化部，负责定期举办内部对企业使命与理念贯彻的活动和讲座，凝聚员工对公司的归属感，搭建分享想法的平台，以缔造爱国、创新，以及具诚信、和谐、负责任的团队。"
                  : "The Company has established a Corporate Culture Department responsible for organizing internal activities and seminars on corporate mission and values, fostering employee belonging and building a team of patriotism, innovation, integrity, harmony and responsibility."}
              </p>
            </div>

            {/* Monitoring */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                {isZh ? "监督评估" : "Monitoring & Evaluation"}
              </h4>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed"
                style={{ lineHeight: 1.7 }}
              >
                {isZh
                  ? "本公司采取多种沟通渠道，并以骨干员工流失率、举报数据等评估和监测企业文化的贯彻性。同时，要求领导层及管理人员在日常工作中积极实践企业价值及贯彻良好操守，为属下员工树立榜样。"
                  : "The Company adopts various communication channels and monitors the implementation of corporate culture through key employee turnover rates and whistleblowing data. Leadership and management are required to actively practice corporate values in daily work and set an example for their teams."}
              </p>
            </div>

            {/* Strategy */}
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">
                {isZh ? "长远策略" : "Long-term Strategy"}
              </h4>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed"
                style={{ lineHeight: 1.7 }}
              >
                {isZh
                  ? "本公司制定了长远的规划纲要，并持续评估面对的潜在机遇与挑战。通过企业文化核心价值的贯彻，持续提升员工的道德操守、完善公司管治制度、防范合规经营风险，为员工及公司建立竞争优势，让各项业务稳定发展。"
                  : "The Company has formulated a long-term planning outline and continuously evaluates potential opportunities and challenges. Through the implementation of core cultural values, we enhance employee ethics, improve governance, prevent compliance risks, and establish competitive advantages for sustainable business development."}
              </p>
            </div>
          </div>
        </FadeSection>

      </div>
    </section>
  );
}
