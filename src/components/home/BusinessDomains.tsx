"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/data/I18nProvider";

// ============================================================
// TypeScript interface — 业务卡片完整数据类型
// ============================================================
export interface BusinessDomain {
  imgSrc: string;
  title: string;
  desc: string;
  detail: string;
}

// ============================================================
// 业务数据 — 中英双语
// ============================================================
const BUSINESS_DOMAINS: Record<"zh" | "en", BusinessDomain[]> = {
  zh: [
    {
      imgSrc: "PCBback.png",
      title: "印製電路板（PCB）",
      desc: "電子製造核心基礎",
      detail:
        "本集團PCB業務涵蓋單層至多層高密度板、HDI板及軟硬結合板，廣泛應用於航天、通訊、汽車電子及消費電子領域，年產能逾500萬平方米，位居行業領先地位。",
    },
    {
      imgSrc: "SHOWback.png",
      title: "顯示器件研發與生產",
      desc: "前沿顯示技術",
      detail:
        "專注於TFT-LCD、OLED及Micro-LED顯示模組的研發與量產，產品覆蓋工業儀器、航空航天儀表、車載顯示及特種顯示等高端應用場景。",
    },
    {
      imgSrc: "IPMback.png",
      title: "IPM智能功率模組封裝",
      desc: "功率電子前沿技術",
      detail:
        "自主研發IPM智能功率模組封裝技術，廣泛應用於工業變頻器、新能源汽車驅動、太陽能逆變器及智能家電，實現高效節能，服務全球客戶。",
    },
    {
      imgSrc: "BATTERY.png",
      title: "電源領域",
      desc: "穩定可靠的能源方案",
      detail:
        "提供覆蓋AC-DC、DC-DC轉換器及UPS不間斷電源系統的完整電源解決方案，服務數據中心、醫療設備、工業自動化及航天地面設備等關鍵行業。",
    },
    {
      imgSrc: "PLASTICback.png",
      title: "注塑領域",
      desc: "精密製造與材料科學",
      detail:
        "專業從事高精密工程塑料注塑成型，涵蓋結構件、功能件及光學元件，廣泛配套PCB、顯示模組及電子整機外殼，實現一站式製造服務。",
    },
  ],
  en: [
    {
      imgSrc: "PCBback.png",
      title: "Printed Circuit Boards (PCB)",
      desc: "Core Foundation of Electronics Manufacturing",
      detail:
        "Our PCB business covers single-layer to multi-layer high-density boards, HDI boards, and rigid-flex boards, widely applied in aerospace, communications, automotive electronics, and consumer electronics. With an annual production capacity exceeding 5 million square meters, we hold a leading position in the industry.",
    },
    {
      imgSrc: "SHOWback.png",
      title: "Display Device R&D and Manufacturing",
      desc: "Cutting-Edge Display Technology",
      detail:
        "Focused on the R&D and mass production of TFT-LCD, OLED, and Micro-LED display modules, our products serve high-end application scenarios including industrial instruments, aerospace instruments, automotive displays, and specialty displays.",
    },
    {
      imgSrc: "IPMback.png",
      title: "IPM Intelligent Power Module Packaging",
      desc: "Advanced Power Electronics Technology",
      detail:
        "Independently developed IPM intelligent power module packaging technology, widely applied in industrial inverters, new energy vehicle drives, solar inverters, and smart home appliances, achieving high efficiency and energy savings while serving global customers.",
    },
    {
      imgSrc: "BATTERY.png",
      title: "Power Supply Solutions",
      desc: "Stable and Reliable Energy Solutions",
      detail:
        "Providing complete power solutions covering AC-DC, DC-DC converters, and UPS uninterruptible power supply systems, serving critical industries such as data centers, medical equipment, industrial automation, and aerospace ground equipment.",
    },
    {
      imgSrc: "PLASTICback.png",
      title: "Injection Molding",
      desc: "Precision Manufacturing & Material Science",
      detail:
        "Specializing in high-precision engineering plastics injection molding, covering structural components, functional parts, and optical elements, providing comprehensive one-stop manufacturing services for PCB, display modules, and electronic device enclosures.",
    },
  ],
};

// ============================================================
// 星空纹理背景 — 深蓝色底 + 均匀白色细星点（~65颗）
// ============================================================
const STARRY_BG_STYLE: Record<string, string> = {
  backgroundColor: "#0A1A3A",
  backgroundImage: `
    radial-gradient(1px 1px at 5% 3%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 12% 8%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 20% 5%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 28% 12%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 35% 4%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 42% 10%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 50% 6%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 58% 14%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 65% 7%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 72% 11%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 80% 5%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 88% 13%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 95% 7%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 8% 22%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 18% 28%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 32% 18%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 45% 25%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 55% 20%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 68% 28%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 78% 18%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 85% 25%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 93% 22%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 3% 38%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 15% 35%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 25% 42%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 38% 32%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 48% 40%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 60% 35%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 70% 42%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 82% 32%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 90% 38%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 10% 50%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 22% 48%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 35% 55%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 48% 50%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 58% 52%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 68% 46%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 78% 55%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 88% 50%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 5% 62%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 18% 68%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 30% 62%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 42% 68%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 55% 60%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 65% 66%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 75% 62%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 85% 68%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 95% 60%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 8% 78%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 20% 82%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 33% 75%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 45% 80%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 58% 75%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 70% 82%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 82% 78%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 92% 82%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 12% 90%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 28% 92%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1px 1px at 42% 88%, rgba(255,255,255,0.30), transparent),
    radial-gradient(1px 1px at 55% 92%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1px 1px at 68% 88%, rgba(255,255,255,0.40), transparent),
    radial-gradient(1px 1px at 80% 92%, rgba(255,255,255,0.35), transparent),
    radial-gradient(1px 1px at 90% 88%, rgba(255,255,255,0.45), transparent),
    radial-gradient(1.5px 1.5px at 15% 15%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 52% 8%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1.5px 1.5px at 75% 45%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 38% 70%, rgba(255,255,255,0.50), transparent),
    radial-gradient(1.5px 1.5px at 62% 85%, rgba(255,255,255,0.55), transparent)
  `,
};

// ============================================================
// BusinessDomains — 業務領域板块
// ============================================================
export default function BusinessDomains() {
  const { lang, t } = useI18n();
  const domains = BUSINESS_DOMAINS[lang] || BUSINESS_DOMAINS.zh;

  return (
    <section
      id="business-domains"
      className="relative w-full pt-16 pb-24 md:pb-36"
      style={STARRY_BG_STYLE}
    >
      {/* ============================================================ */}
      {/* 标题区 — 居中排版，加大上下留白                              */}
      {/* ============================================================ */}
      <div className="mb-16 md:mb-24 text-center px-6">
        {/* 浅蓝英文小字 — 柔和浅蓝细字，非白色 */}
        <p className="text-[#5BA4D6] text-xs md:text-sm tracking-[0.28em] uppercase font-medium mb-4">
          {t("business_domains_subtitle")}
        </p>

        {/* 白色粗体大标题 */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-5">
          {t("business_domains_title")}
        </h2>

        {/* 浅蓝色短水平分割线 — 与标题宽度匹配 */}
        <div className="mx-auto w-20 h-[2px] bg-[#3E92CC] rounded-full" />
      </div>

      {/* ============================================================ */}
      {/* 卡片区域 — items-start 保证每张卡片高度独立                   */}
      {/* ============================================================ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-start">
          {domains.map((domain) => (
            <BusinessCard key={domain.title} domain={domain} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BusinessCard — 单张业务卡片（下拉面板完全内嵌于卡片容器）
// ============================================================
function BusinessCard({
  domain,
  lang,
}: {
  domain: BusinessDomain;
  lang: string;
}) {
  const { t } = useI18n();
  const imgPath = `/images/business/${domain.imgSrc}`;

  return (
    <div className="group/card relative z-10 hover:z-30">
      {/* ========================================================== */}
      {/* 卡片容器 — rounded-3xl + overflow-hidden 硬性约束边界       */}
      {/* 所有内容（图、文字、下拉面板）全程不超出此容器              */}
      {/* ========================================================== */}
      <div className="rounded-3xl overflow-hidden bg-white/[0.07] backdrop-blur-sm ring-1 ring-white/10">
        {/* ======================================================== */}
        {/* 图片区域 — 仅占卡片上 2/3 区域，object-contain + 内边距  */}
        {/* ======================================================== */}
        <div
          className="relative w-full bg-[#141e33]/50"
          style={{ aspectRatio: "4 / 3" }}
        >
          {/* 产品图片 — object-contain 保留全图，不裁切、不贴边 */}
          <Image
            src={imgPath}
            alt={domain.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-contain p-3 md:p-4 transition-transform duration-500 ease-out group-hover/card:scale-105"
            loading="lazy"
            quality={90}
          />

          {/* ====================================================== */}
          {/* 渐变遮罩 — 仅覆盖图片区域底部 1/3，上方完全通透            */}
          {/* ====================================================== */}
          <div
            className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
            style={{
              height: "33.33%",
              background:
                "linear-gradient(to top, rgba(10,26,58,0.90) 0%, rgba(10,26,58,0.40) 45%, transparent 100%)",
            }}
          />
        </div>

        {/* ======================================================== */}
        {/* 图文分隔线 — 细浅灰色水平线，过渡图片区与文字区            */}
        {/* ======================================================== */}
        <div
          className="mx-5"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(180,190,200,0.35) 15%, rgba(180,190,200,0.22) 50%, rgba(180,190,200,0.35) 85%, transparent 100%)",
          }}
        />

        {/* ======================================================== */}
        {/* 静态文字区域 — 标题加粗 + 副标弱化，底部充足留白          */}
        {/* ======================================================== */}
        <div className="px-5 pt-4 pb-3">
          <h3 className="text-white text-sm md:text-base font-bold leading-snug mb-1.5 tracking-wide">
            {domain.title}
          </h3>
          <p className="text-white/45 text-xs md:text-[13px] font-light leading-relaxed">
            {domain.desc}
          </p>
        </div>

        {/* ======================================================== */}
        {/* 下拉详情面板 — 内嵌于卡片容器，max-height 驱动滑入/滑出  */}
        {/* 所有介绍文字+按钮全程不超出 rounded-3xl 容器边界          */}
        {/* ======================================================== */}
        <div
          className="overflow-hidden
            max-h-0
            group-hover/card:max-h-[500px]
            transition-[max-height] duration-500 ease-out"
        >
          <div
            className="px-5 pt-2 pb-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(10,20,48,0.88) 0%, rgba(8,18,44,0.94) 100%)",
            }}
          >
            {/* 长篇介绍文字 — 白色、宽松行高 */}
            <p className="text-white/80 text-xs md:text-sm leading-relaxed md:leading-loose mb-5">
              {domain.detail}
            </p>

            {/* 「瞭解更多」按钮 — 右下角，hover 浅蓝高亮 */}
            <div className="flex justify-end">
              <Link
                href={`/${lang}/business`}
                className="inline-flex items-center gap-1.5 text-[#3E92CC] text-xs md:text-sm font-medium
                  hover:text-[#5BA4D6] transition-colors duration-300
                  group/link"
              >
                <span>{t("business_learn_more")}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
