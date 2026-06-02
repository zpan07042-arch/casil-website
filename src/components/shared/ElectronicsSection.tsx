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

/* ========== Product/component type icons ========== */
function ProductIcon({ type }: { type: string }) {
  switch (type) {
    case "ic":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="3" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.3" />
          <rect x="6" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="0.9" />
          <path d="M8 10h6M8 12h6" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        </svg>
      );
    case "hdi":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="3" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6 7h10M6 10h10M6 13h7M6 16h4" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
          <circle cx="17" cy="15" r="1.2" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      );
    case "fpc":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 11c0-1 0.5-2 1.5-2.5L14 4c1-0.5 2 0 2 1v12c0 1-1 1.5-2 1L4.5 13.5C3.5 13 3 12 3 11z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5 11l11-5" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 1.5" />
        </svg>
      );
    case "rigid-flex":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="6" width="6" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <rect x="14" y="6" width="6" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 11h6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.5" />
          <path d="M8 9V7a1 1 0 011-1h0.5M14 9V7a1 1 0 00-1-1h-0.5" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      );
    default:
      return null;
  }
}

/* ========== Application field icons ========== */
function AppIcon({ type }: { type: string }) {
  switch (type) {
    case "5g":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l2-2 2 2 4-4 2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 20l2-2 2 2 4-4 2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19" cy="5" r="1.5" stroke="currentColor" strokeWidth="1" />
        </svg>
      );
    case "ai":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1" />
          <path d="M12 7v6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      );
    case "auto":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="8" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="18" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.1" />
          <path d="M4 12h2l1.5-3h9l1.5 3h2" stroke="currentColor" strokeWidth="1" />
          <path d="M4 13v-0.5l1.5-3h13l1.5 3V13" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
        </svg>
      );
    case "medical":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="1.3" />
          <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M7 19h10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      );
    case "aero":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
          <path d="M12 3v2.5M12 18.5v2.5M3 12h2.5m13 0H21" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

/* ========== Main component ========== */
export default function ElectronicsSection({
  title,
  lang,
}: {
  title: string;
  lang: string;
}) {
  const isZh = lang === "zh";

  const products = [
    {
      type: "ic",
      nameZh: "IC 封装载板",
      nameEn: "IC Packaging Substrate",
      attrsZh: ["高密度互连", "精细线路", "先进封装"],
      attrsEn: ["High-density Interconnect", "Fine Line", "Advanced Packaging"],
      descZh: "为芯片提供电气连接与机械支撑的核心基板，广泛应用于通讯、消费电子及汽车芯片封装领域。",
      descEn: "Core substrate providing electrical connection and mechanical support for chips, widely used in communication, consumer electronics and automotive chip packaging.",
    },
    {
      type: "hdi",
      nameZh: "高密度互连板（HDI）",
      nameEn: "High-Density Interconnect (HDI)",
      attrsZh: ["微盲孔技术", "高布线密度", "轻量化"],
      attrsEn: ["Micro-via Technology", "High Routing Density", "Lightweight"],
      descZh: "采用微盲孔及积层工艺实现更高布线密度与小型化设计，满足智能终端、服务器等高端应用需求。",
      descEn: "Achieving higher routing density and miniaturization through micro-via and build-up processes, meeting high-end application needs for smart terminals and servers.",
    },
    {
      type: "fpc",
      nameZh: "柔性电路板（FPC）",
      nameEn: "Flexible Printed Circuit (FPC)",
      attrsZh: ["可弯折", "轻薄", "三维布线"],
      attrsEn: ["Bendable", "Ultra-thin", "3D Routing"],
      descZh: "以柔性基材制成，可自由弯曲折叠，满足狭小空间与动态弯折场景下的互连需求。",
      descEn: "Made with flexible substrates, freely bendable and foldable, meeting interconnection needs in tight spaces and dynamic bending scenarios.",
    },
    {
      type: "rigid-flex",
      nameZh: "刚挠结合板",
      nameEn: "Rigid-Flex Board",
      attrsZh: ["刚柔一体", "高可靠性", "三维组装"],
      attrsEn: ["Rigid-Flex Integrated", "High Reliability", "3D Assembly"],
      descZh: "结合刚性板与柔性板优势，实现三维空间内一体化互连，广泛应用于航空航天及医疗设备。",
      descEn: "Combining advantages of rigid and flexible boards for integrated 3D interconnection, widely used in aerospace and medical equipment.",
    },
  ];

  const applications = [
    {
      type: "5g",
      zh: "5G 通信",
      en: "5G Communication",
      descZh: "基站设备、天线系统、高速背板",
      descEn: "Base station equipment, antenna systems, high-speed backplanes",
    },
    {
      type: "ai",
      zh: "AI 服务器",
      en: "AI Servers",
      descZh: "GPU 载板、交换机、加速卡",
      descEn: "GPU substrates, switches, accelerator cards",
    },
    {
      type: "auto",
      zh: "自动驾驶",
      en: "Autonomous Driving",
      descZh: "车载雷达、域控制器、传感器模块",
      descEn: "Automotive radar, domain controllers, sensor modules",
    },
    {
      type: "medical",
      zh: "医疗电子",
      en: "Medical Electronics",
      descZh: "影像设备、监护仪器、植入器械",
      descEn: "Imaging equipment, monitoring instruments, implantable devices",
    },
    {
      type: "aero",
      zh: "航空航天",
      en: "Aerospace",
      descZh: "卫星通讯、航电系统、地面终端",
      descEn: "Satellite communication, avionics, ground terminals",
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
          <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl"
            style={{ lineHeight: 1.7 }}
          >
            {isZh
              ? "高精密电子组件业务涵盖 IC 封装载板、高密度互连板（HDI）、柔性电路板（FPC）及刚挠结合板等高端 PCB 产品的研发、制造与销售，致力于为全球客户提供高品质、高可靠性的电子互连解决方案。"
              : "The precision electronic components business covers the R&D, manufacturing and sales of high-end PCB products including IC packaging substrates, HDI boards, FPC and rigid-flex boards, delivering high-quality, high-reliability electronic interconnection solutions to global customers."}
          </p>
        </motion.div>

        {/* ========== MODULE 1: BUSINESS SCOPE ========== */}
        <FadeSection className="mb-16 md:mb-24">
          <div className="relative bg-white rounded-2xl p-8 md:p-10 border border-divider shadow-sm">
            <div className="absolute top-0 right-0 w-36 h-36 rounded-bl-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, #0A2463, transparent 70%)" }}
            />
            <div className="relative">
              <SectionTitle>
                {isZh ? "业务范围" : "Business Scope"}
              </SectionTitle>

              <div className="space-y-4">
                {products.map((p, i) => (
                  <motion.div
                    key={p.type}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl border border-divider/50
                      bg-[#F8F9FA] hover:bg-white hover:border-brand/20 hover:shadow-sm
                      hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    {/* Left icon */}
                    <div className="w-11 h-11 rounded-lg bg-brand/5 flex items-center justify-center
                      text-brand flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-all duration-300"
                    >
                      <ProductIcon type={p.type} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                        <h3 className="text-[15px] font-bold text-text-primary group-hover:text-brand transition-colors duration-300">
                          {isZh ? p.nameZh : p.nameEn}
                        </h3>
                        {/* Attributes */}
                        <div className="flex flex-wrap gap-1">
                          {(isZh ? p.attrsZh : p.attrsEn).map((attr, j) => (
                            <span key={j} className="text-[11px] px-1.5 py-0.5 rounded bg-brand/5 text-brand/70 font-medium">
                              {attr}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-[13px] text-text-secondary leading-relaxed"
                        style={{ lineHeight: 1.6 }}
                      >
                        {isZh ? p.descZh : p.descEn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

        {/* ========== MODULE 2: APPLICATION FIELDS ========== */}
        <FadeSection>
          <div
            className="relative rounded-2xl p-8 md:p-10 border border-divider/50"
            style={{ background: "linear-gradient(135deg, rgba(10,36,99,0.02), rgba(62,146,204,0.02))" }}
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-3xl opacity-[0.04] pointer-events-none"
              style={{ background: "radial-gradient(circle at bottom left, #3E92CC, transparent 70%)" }}
            />
            <div className="relative">
              <SectionTitle>
                {isZh ? "应用领域" : "Application Fields"}
              </SectionTitle>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {applications.map((app, i) => (
                  <motion.div
                    key={app.type}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex flex-col items-center text-center gap-2.5 p-5 rounded-xl border border-divider/40
                      bg-white hover:border-brand/25 hover:shadow-md hover:-translate-y-1
                      transition-all duration-300 group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand/5 flex items-center justify-center
                      text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300"
                    >
                      <AppIcon type={app.type} />
                    </div>
                    <span className="text-sm font-bold text-text-primary group-hover:text-brand transition-colors duration-300">
                      {isZh ? app.zh : app.en}
                    </span>
                    <span className="text-[11px] text-text-secondary leading-relaxed"
                      style={{ lineHeight: 1.5 }}
                    >
                      {isZh ? app.descZh : app.descEn}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>

      </div>
    </section>
  );
}
