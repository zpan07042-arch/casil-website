"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/data/I18nProvider";
import type { LinkItem } from "@/lib/types";

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
// AerospaceData — 从后端 business_cards 表获取的航天服务数据
// ============================================================
export interface AerospaceData {
  mainTitle: string;   // 默认态大字标题（如"物業租賃服務"）
  subTitle: string;    // 分割线下方小字（如"航天高科"）
  desc: string;        // hover 展开的描述
  imageSrc: string;    // 左侧图片路径
  learnMoreHref: string;
}

/** 从 product_images JSON 中提取第一张图片路径 */
function parseFirstImage(json: string): string {
  try {
    const arr = JSON.parse(json);
    return arr[0]?.img || "/images/gaoke.jpg";
  } catch {
    return "/images/gaoke.jpg";
  }
}

// ============================================================
// 业务数据 — 中英双语（先进製造業 5大板块）
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
// BusinessDomains — 统一业务领域板块
// 上半：先進製造業（5张等宽卡片）
// 下半：航天產業服務業（横向大卡片）
// 共用深藏蓝背景 + 点阵暗纹，视觉完全统一
// ============================================================

/**
 * 根據業務卡片主標題匹配對應的友情鏈接 URL。
 * 遍歷 links，若 link.name_zh 與 mainTitle 有共同的關鍵字片段則返回其 url。
 */
function findLinkUrlForCard(mainTitle: string, links: LinkItem[]): string | null {
  const parts: string[] = [];
  for (let i = 0; i < mainTitle.length - 1; i++) {
    parts.push(mainTitle.substring(i, i + 2));
  }
  for (let i = 0; i < mainTitle.length - 2; i++) {
    parts.push(mainTitle.substring(i, i + 3));
  }
  parts.sort((a, b) => b.length - a.length);
  for (const part of parts) {
    const found = links.find((l) => l.name_zh.includes(part) && l.url);
    if (found) return found.url;
  }
  return null;
}

export default function BusinessDomains() {
  const { lang, t } = useI18n();
  const domains = BUSINESS_DOMAINS[lang] || BUSINESS_DOMAINS.zh;

  // ---- 从后端获取航天服务数据 ----
  const [aerospaceData, setAerospaceData] = useState<AerospaceData | null>(null);

  // ---- 从后端获取友情链接数据 ----
  const [links, setLinks] = useState<LinkItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/links")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return;
        setLinks(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/home/aerospace")
      .then((r) => r.json())
      .then((row) => {
        if (cancelled || !row) return;
        setAerospaceData({
          // 中文: sub_title="物業租賃服務"; 英文: 无对应英文字段，留空让组件走 i18n fallback
          mainTitle: lang === "zh" ? row.sub_title : "",
          // 中文: main_title="航天高科"; 英文: en_name="Aerospace Hightech"
          subTitle: lang === "zh" ? row.main_title : row.en_name,
          desc: lang === "zh" ? row.body_zh : row.body_en,
          imageSrc: parseFirstImage(row.product_images),
          learnMoreHref: `/${lang}/business`,
        });
      })
      .catch(() => {}); // 静默降级到 i18n
    return () => { cancelled = true; };
  }, [lang]);

  return (
    <section
      id="business-domains"
      className="relative w-full pt-16 pb-16 md:pb-20 overflow-hidden"
      style={{ background: "#001433" }}
    >
      {/* ---- 规则点阵纹理叠层 ---- */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
          opacity: 0.12,
        }}
      />

      {/* ============================================================ */}
      {/* 主标题 — 業務領域                                             */}
      {/* ============================================================ */}
      <div className="relative z-10 mb-4 md:mb-6 text-center px-6">
        <p className="text-[#5BA4D6] text-xs md:text-sm tracking-[0.28em] uppercase font-medium mb-4">
          {t("business_domains_main_subtitle")}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-5">
          {t("business_domains_main_title")}
        </h2>
        <div className="mx-auto w-20 h-[2px] bg-[#3E92CC] rounded-full" />
      </div>

      {/* ============================================================ */}
      {/* 上半部分 — 先進製造業 ADVANCED MANUFACTURING                  */}
      {/* ============================================================ */}
      <div className="relative z-10">
        {/* ---- 标题区 — 与卡片网格左侧对齐 ---- */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-8 md:mb-12">
          <p className="text-[#5BA4D6] text-xs md:text-sm tracking-[0.28em] uppercase font-medium mb-4">
            {t("business_domains_subtitle")}
          </p>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide mb-5">
            {t("business_domains_title")}
          </h3>
          <div className="w-20 h-[2px] bg-[#3E92CC] rounded-full" />
        </div>

        {/* ---- 5卡片网格 ---- */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-start">
            {domains.map((domain, i) => {
              const CARD_IDS = ["card-pcb", "card-display", "card-ipm", "card-power", "card-injection"];
              return (
                <div key={domain.title} id={CARD_IDS[i]} style={{ scrollMarginTop: "80px" }}>
                  <BusinessCard domain={domain} lang={lang} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 下半部分 — 航天產業服務業 AEROSPACE INDUSTRY SERVICES         */}
      {/* ============================================================ */}
      <div className="relative z-10 mt-12 md:mt-16">
        {/* ---- 标题区 — 与卡片网格左侧对齐 ---- */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-6 md:mb-8">
          <p className="text-[#5BA4D6] text-xs md:text-sm tracking-[0.28em] uppercase font-medium mb-4">
            {t("aerospace_services_subtitle")}
          </p>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide mb-5">
            {t("aerospace_services_title")}
          </h3>
          <div className="w-20 h-[2px] bg-[#3E92CC] rounded-full" />
        </div>

        {/* ---- 横向业务卡片 ---- */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <AerospaceCard lang={lang} data={aerospaceData} links={links} />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// BusinessCard — 单张业务卡片（先进製造業用，保持不变）
// ============================================================
function BusinessCard({
  domain,
  lang,
}: {
  domain: BusinessDomain;
  lang: string;
}) {
  const { t } = useI18n();
  const imgPath = `/images/${domain.imgSrc}`;

  return (
    <div className="group/card relative z-10 hover:z-30">
      <div className="rounded-3xl overflow-hidden bg-white/[0.1] backdrop-blur-sm ring-1 ring-white/10 group-hover/card:bg-[#5BA4D6]/[0.22] group-hover/card:ring-[#5BA4D6]/80 transition-all duration-500">
        {/* 图片区域 */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "4 / 3" }}
        >
          <Image
            src={imgPath}
            alt={domain.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
            loading="lazy"
            quality={90}
          />
          {/* 渐变遮罩 — 仅覆盖图片区域底部 1/3 */}
          <div
            className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
            style={{
              height: "33.33%",
              background:
                "linear-gradient(to top, rgba(10,26,58,0.90) 0%, rgba(10,26,58,0.40) 45%, transparent 100%)",
            }}
          />
        </div>

        {/* 图文分隔线 */}
        <div
          className="mx-5"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(180,190,200,0.35) 15%, rgba(180,190,200,0.22) 50%, rgba(180,190,200,0.35) 85%, transparent 100%)",
          }}
        />

        {/* 静态文字区域 */}
        <div className="px-5 pt-4 pb-3">
          <h3 className="text-white text-lg md:text-xl font-bold leading-snug mb-1.5 tracking-wide">
            {domain.title}
          </h3>
          <p className="text-white/45 text-xs md:text-[13px] font-light leading-relaxed">
            {domain.desc}
          </p>
        </div>

        {/* 下拉详情面板 */}
        <div
          className="overflow-hidden
            max-h-0
            group-hover/card:max-h-[500px]
            transition-[max-height] duration-500 ease-out"
        >
          <div className="px-5 pt-2 pb-5">
            <p className="text-white/80 text-xs md:text-sm leading-relaxed md:leading-loose mb-5">
              {domain.detail}
            </p>
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

// ============================================================
// AerospaceCard — 航天產業服務業横向业务卡片
// 左侧：香港维多利亚港写字楼城市夜景（固定）
// 右侧：默认态显示大字标题+蓝色分割线+小字；hover 展开多层级文字
// ============================================================
function AerospaceCard({
  lang,
  data,
  links,
}: {
  lang: string;
  data: AerospaceData | null;
  links: LinkItem[];
}) {
  const { t } = useI18n();

  // 后端数据优先，fallback 到 i18n（mainTitle 用 || 以便空字符串时回退）
  const mainTitle = data?.mainTitle || t("property_leasing_title");
  const subTitle = data?.subTitle ?? t("property_leasing_subtitle");
  const desc = t("property_leasing_desc");
  const imageSrc = data?.imageSrc ?? "/images/gaoke.jpg";

  // 優先使用友情鏈接匹配 URL，若無匹配則使用卡片自身的 learnMoreHref
  const matchedLinkUrl = findLinkUrlForCard(subTitle, links);
  const learnMoreHref = matchedLinkUrl || data?.learnMoreHref || `/${lang}/business`;

  return (
    <div className="group/aero relative w-full">
      {/* ========================================================== */}
      {/* 卡片容器 — 横向布局，细浅蓝圆角边框                         */}
      {/* ========================================================== */}
      <div
        className="relative flex flex-col md:flex-row w-full rounded-2xl overflow-hidden
          ring-1 ring-[#3E92CC]/30 bg-[#0A1A3A]/60 backdrop-blur-sm
          group-hover/aero:ring-[#3E92CC]/60
          transition-all duration-500 ease-out"
      >
        {/* ======================================================== */}
        {/* 左侧：固定图片 — 香港维多利亚港写字楼城市夜景              */}
        {/* ======================================================== */}
        <div className="relative w-full md:w-[45%] lg:w-[42%] shrink-0 overflow-hidden">
          <div
            className="relative w-full"
            style={{ aspectRatio: "21 / 9", minHeight: "210px" }}
          >
            <Image
              src={imageSrc}
              alt={mainTitle}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
              quality={90}
            />
            {/* 图片右侧渐变过渡 — 平滑融入右侧遮罩 */}
            <div
              className="absolute inset-y-0 right-0 w-16 md:w-24 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to left, rgba(10,26,58,1) 0%, rgba(10,26,58,0.6) 40%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* 右侧：信息面板 — 半透明深藏蓝遮罩                          */}
        {/* ======================================================== */}
        <div
          className="relative flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-14 py-4 md:py-0 min-h-[165px]"
          style={{ background: "rgba(10,26,58,0.75)" }}
        >
          {/* ---- 默认状态：大字纯白标题 + 蓝色分割线 + 小字 ---- */}
          <div
            className="group-hover/aero:opacity-0 group-hover/aero:translate-y-[-8px]
              transition-all duration-500 ease-out"
          >
            <h3 className="text-white text-xl md:text-2xl font-bold leading-snug tracking-wide mb-3">
              {mainTitle}
            </h3>
          </div>

          {/* ---- Hover 展开：多层级文字 ---- */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 lg:px-14
              opacity-0 translate-y-4
              group-hover/aero:opacity-100 group-hover/aero:translate-y-0
              transition-all duration-500 ease-out"
          >
            {/* ① 白色粗体大标题 */}
            <h3 className="text-white text-xl md:text-2xl font-bold leading-snug tracking-wide mb-2">
              {mainTitle}
            </h3>



            {/* ④ 浅灰色正文 */}
            <p className="text-white/70 text-xs md:text-[13px] leading-relaxed max-w-xl mb-6">
              {desc}
            </p>

            {/* ⑤ 底部可点击交互链接 — 浅蓝色文字 + 箭头 */}
            <Link
              href={learnMoreHref}
              className="inline-flex items-center gap-1.5 text-[#3E92CC] text-xs md:text-sm font-medium
                hover:text-[#5BA4D6] transition-colors duration-300
                group/link w-fit"
            >
              <span>{t("property_leasing_learn_more")}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
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
  );
}
