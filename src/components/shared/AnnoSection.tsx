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

export default function AnnoSection({
  title,
  lang,
}: {
  title: string;
  lang: string;
}) {
  const isZh = lang === "zh";

  const steps = isZh
    ? [
        { title: "第一步：报失", desc: "股东发现股份证明书遗失后，应尽快向本公司股份过户登记处卓佳證券登記有限公司报失。" },
        { title: "第二步：申请补发", desc: "向过户登记处提交补发申请，办理新股份证明书的补发手续。" },
        { title: "第三步：刊发公告", desc: "根据《公司条例》（香港法例第622章），本公司须在网站上刊发拟发出新股份证明书的公告及取消原有股份证明书的公告。" },
        { title: "第四步：发出新证明书", desc: "公告刊发后，完成补发程序，向股东发出新的股份证明书。" },
      ]
    : [
        { title: "Step 1: Report Loss", desc: "Shareholders should promptly report the loss to Tricor Secretaries Limited, the Company's share registrar." },
        { title: "Step 2: Apply for Replacement", desc: "Submit a replacement application to the share registrar for issuance of new share certificates." },
        { title: "Step 3: Publish Announcement", desc: "Pursuant to the Companies Ordinance (Cap. 622), the Company must publish announcements on its website regarding the proposed issuance and cancellation of share certificates." },
        { title: "Step 4: Issue New Certificates", desc: "After the announcement is published, complete the replacement process and issue new share certificates to the shareholder." },
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

        {/* ========== MODULE 1: INTRODUCTION ========== */}
        <FadeSection className="mb-12 md:mb-16">
          <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm
            hover:shadow-md hover:border-brand/10 transition-all duration-500">
            <div className="absolute top-0 right-0 w-36 h-36 rounded-bl-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, #0A2463, transparent 70%)" }}
            />
            <div className="relative">
              <SectionTitle>
                {isZh ? "公告说明" : "Announcement Overview"}
              </SectionTitle>

              <div className="space-y-4">
                <p className="text-sm md:text-base text-text-secondary leading-relaxed"
                  style={{ lineHeight: 1.7 }}
                >
                  {isZh
                    ? "本公司发行的"
                    : "Share certificates issued by the Company are "}
                  <span className="text-brand font-semibold">
                    {isZh ? "股份证明书" : "proof of shareholders' ownership"}
                  </span>
                  {isZh
                    ? "乃股东对本公司股份的所有权的证明。如股东遗失任何股份证明书，应尽快向本公司的股份过户登记处"
                    : " of the Company's shares. If any shareholder loses any share certificate, they should promptly report the loss to the Company's share registrar, "}
                  <a
                    href="https://srhk.vistra.com/pdf/TIS%209B-loss%20of%20shares.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand font-semibold underline underline-offset-2 hover:text-brand-light transition-colors duration-200"
                  >
                    {isZh ? "卓佳證券登記有限公司" : "Tricor Secretaries Limited"}
                  </a>
                  {isZh
                    ? "报失及申请补发新的股份证明书。"
                    : " and apply for the issuance of replacement share certificates."}
                </p>

                <div className="flex items-start gap-3 p-4 rounded-xl border border-brand/10"
                  style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.04), rgba(62,146,204,0.04))" }}
                >
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="#0A2463" strokeWidth="1" />
                      <path d="M6 3v3.5M6 9.5v.01" stroke="#0A2463" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-brand mb-0.5">
                      {isZh ? "法律依据" : "Legal Basis"}
                    </p>
                    <p className="text-[13px] text-text-secondary leading-relaxed"
                      style={{ lineHeight: 1.6 }}
                    >
                      {isZh
                        ? "根据《公司条例》（香港法例第622章），本公司于补发已遗失的股份证明书前，须刊发符合指明格式的公告，包括在其网站上刊发拟发出新股份证明书的公告及有关取消原有股份证明书及发出新股份证明书的公告。"
                        : "Pursuant to the Companies Ordinance (Cap. 622 of the Laws of Hong Kong), before issuing replacement share certificates, the Company must publish announcements in the specified format on its website, including announcements regarding the proposed issuance and cancellation of share certificates."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ========== MODULE 2: PROCESSING PROCEDURE ========== */}
        <FadeSection className="mb-12 md:mb-16">
          <div className="relative rounded-2xl p-8 md:p-10 border border-divider/50
            hover:shadow-md hover:border-brand/10 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.03), rgba(62,146,204,0.03))" }}>
            <div className="relative">
              <SectionTitle>
                {isZh ? "办理流程" : "Processing Procedure"}
              </SectionTitle>

              <div className="space-y-3">
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex gap-4 p-5 rounded-xl bg-white border border-divider/60
                      hover:border-brand/20 hover:shadow-sm transition-all duration-300"
                  >
                    {/* Step number */}
                    <div className="w-8 h-8 rounded-full bg-brand/5 text-brand text-[13px] font-bold
                      flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-primary mb-1">
                        {step.title}
                      </h4>
                      <p className="text-[13px] text-text-secondary leading-relaxed"
                        style={{ lineHeight: 1.65 }}
                        dangerouslySetInnerHTML={{
                          __html: step.desc.replace(
                            isZh ? "卓佳證券登記有限公司" : "Tricor Secretaries Limited",
                            `<a href="https://srhk.vistra.com/pdf/TIS%209B-loss%20of%20shares.pdf" target="_blank" rel="noopener noreferrer" class="text-brand font-semibold underline underline-offset-2 hover:text-brand-light transition-colors duration-200">${isZh ? "卓佳證券登記有限公司" : "Tricor Secretaries Limited"}</a>`
                          ),
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ========== MODULE 3: RELATED LINKS ========== */}
        <FadeSection>
          <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm
            hover:shadow-md hover:border-brand/10 transition-all duration-500">
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at bottom left, #3E92CC, transparent 70%)" }}
            />
            <div className="relative">
              <SectionTitle>
                {isZh ? "相关链接" : "Related Links"}
              </SectionTitle>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Link 1: Guidance */}
                <a
                  href="https://srhk.vistra.com/pdf/TIS%209B-loss%20of%20shares.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 p-5 rounded-xl border border-divider/50
                    bg-[#F8F9FA] hover:bg-white hover:border-brand/25 hover:shadow-sm hover:-translate-y-0.5
                    transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center
                      text-brand/60 group-hover:text-brand group-hover:bg-brand/10 transition-all duration-300 flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M6 2h6l4 4v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                        <path d="M12 2v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                        <path d="M7 11h6M7 14h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-text-primary group-hover:text-brand transition-colors duration-300">
                        {isZh ? "办理指引 (PDF)" : "Processing Guide (PDF)"}
                      </h4>
                      <p className="text-[12px] text-text-secondary/70 mt-0.5">
                        {isZh ? "跳转至办理指引 — 卓佳证券登记有限公司" : "Go to processing guide — Tricor Secretaries Limited"}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-brand text-sm font-medium group-hover:translate-x-0.5 transition-transform duration-300 flex-shrink-0">
                    {isZh ? "打开" : "Open"}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M4 3h7v7M11 3L3 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>

                {/* Link 2: Announcements list */}
                <a
                  href="https://www.tricor.com.hk/eNotice/lostcert_00031_tc.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 p-5 rounded-xl border border-divider/50
                    bg-[#F8F9FA] hover:bg-white hover:border-brand/25 hover:shadow-sm hover:-translate-y-0.5
                    transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-brand/5 flex items-center justify-center
                      text-brand/60 group-hover:text-brand group-hover:bg-brand/10 transition-all duration-300 flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="3" y="4" width="14" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M7 8h6M7 11h6M7 14h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-text-primary group-hover:text-brand transition-colors duration-300">
                        {isZh ? "公告列表" : "Announcement List"}
                      </h4>
                      <p className="text-[12px] text-text-secondary/70 mt-0.5">
                        {isZh ? "查阅已刊发的补发股份证明书公告" : "View published replacement share certificate announcements"}
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-brand text-sm font-medium group-hover:translate-x-0.5 transition-transform duration-300 flex-shrink-0">
                    {isZh ? "打开" : "Open"}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M4 3h7v7M11 3L3 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </FadeSection>

      </div>
    </section>
  );
}
