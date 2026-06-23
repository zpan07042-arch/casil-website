"use client";

import CorporateDiagram from "@/components/about/CorporateDiagram";
import type { Lang } from "@/lib/types";

/* ──────────── 配色 ──────────── */
const Navy    = "#0A2463";
const GoldAcc = "rgba(255,255,255,0.65)";
const White   = "#FFFFFF";
const MutedW  = "rgba(255,255,255,0.50)";
const FaintW  = "rgba(255,255,255,0.18)";

const content = {
  zh: {
    breadcrumb: "首頁 > 關於我們 > 企業架構",
    enLabel:    "CORPORATE STRUCTURE",
    title:      "企業架構",
    desc:       "中國航天國際控股有限公司集團組織架構圖",
    note:       "｜ 未標註持股比例者為全資公司",
  },
  en: {
    breadcrumb: "Home > About Us > Corporate Structure",
    enLabel:    "CORPORATE STRUCTURE",
    title:      "Corporate Structure",
    desc:       "China Aerospace International Holdings Limited — Group Organization Chart",
    note:       " ｜ Wholly-owned unless ownership percentage indicated",
  },
};

export default function StructurePageClient({ lang }: { lang: Lang }) {
  const t = content[lang];

  return (
    <div style={{ backgroundColor: "#F7F7FA" }}>

      {/* ═══════════════════════════════════════════════════
          顶部深蓝色横幅
          ═══════════════════════════════════════════════════ */}
      <section
        className="pt-20 pb-10 md:pt-24 md:pb-12 px-5"
        style={{
          background: `linear-gradient(135deg, ${Navy} 0%, #0F2D6E 100%)`,
        }}
      >
        <div className="max-w-[1200px] mx-auto text-center">

          {/* 面包屑 */}
          <p
            className="text-xs tracking-wide mb-3"
            style={{ color: MutedW }}
          >
            {(() => {
              const parts = t.breadcrumb.split(" > ");
              return parts.map((part, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color: MutedW }}> &gt; </span>}
                  <span style={{ color: i === parts.length - 1 ? White : MutedW }}>
                    {part}
                  </span>
                </span>
              ));
            })()}
          </p>

          {/* 英文小标 */}
          <p
            className="text-[11px] tracking-[0.22em] uppercase mb-3"
            style={{ color: GoldAcc, fontWeight: 300 }}
          >
            {t.enLabel}
          </p>

          {/* 大标题 */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider mb-5"
            style={{ color: White }}
          >
            {t.title}
          </h1>

          {/* 水平分割线 */}
          <div
            style={{
              width: 60,
              height: 1,
              backgroundColor: FaintW,
              margin: "0 auto 14px",
            }}
          />

          {/* 说明文字 */}
          <p
            className="text-xs md:text-sm leading-relaxed"
            style={{ color: MutedW }}
          >
            {t.desc}
            <span style={{ color: GoldAcc }}>{t.note}</span>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          组织架构树形图
          ═══════════════════════════════════════════════════ */}
      <CorporateDiagram />

    </div>
  );
}
