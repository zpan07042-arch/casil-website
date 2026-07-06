"use client";

import Link from "next/link";
import { useI18n } from "@/components/data/I18nProvider";

export default function Footer() {
  const { lang, t } = useI18n();
  const base = `/${lang}`;

  const navColumns = [
    {
      title: t("nav_about"),
      links: [
        { label: t("nav_bg"), href: `${base}/about/background` },
        { label: t("nav_culture"), href: `${base}/about/culture` },
        { label: t("nav_goal"), href: `${base}/about/goals` },
        { label: t("nav_board"), href: `${base}/about/board` },
        { label: t("nav_gov"), href: `${base}/about/governance` },
        { label: t("nav_arc"), href: `${base}/about/structure` },
      ],
    },
    {
      title: t("nav_industry"),
      links: [
        { label: t("nav_industry"), href: `${base}/business` },
      ],
    },
    {
      title: t("nav_investor"),
      links: [
        { label: t("nav_investor"), href: "http://www.casil-group.com:8080/investor/" },
        { label: t("nav_gov"), href: `${base}/about/governance` },
      ],
    },
    {
      title: t("nav_consult"),
      links: [
        { label: t("nav_consult"), href: `${base}/news` },
        { label: t("nav_contact"), href: `${base}/contact` },
      ],
    },
  ];

  return (
    <footer style={{ backgroundColor: "#0A2463" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-14 md:py-16">

        {/* ── 主内容区：品牌 + 4栏导航 ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-10 mb-12">

          {/* 左侧品牌栏 */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4 -ml-2">
              <img
                src="/images/casil-logo.png"
                alt="CASIL"
                className="h-10 w-auto brightness-0 invert"
              />
              <div>
                <p className="text-white font-semibold text-sm leading-tight whitespace-nowrap">
                  {t("home_name")}
                </p>
                <p className="text-white/40 text-xs mt-0.5 font-mono tracking-wide">
                  00031.HK
                </p>
              </div>
            </div>

            <p className="text-white/55 text-xs leading-relaxed mb-5">
              {t("footer_desc")}
            </p>

            {/* 联系方式 */}
            <div className="space-y-1.5">
              <p className="text-white/50 text-xs">
                +852 2193 8888
              </p>
              <p className="text-white/50 text-xs">
                public@casil-group.com
              </p>
              <p className="text-white/50 text-xs">
                www.casil-group.com
              </p>
            </div>
          </div>

          {/* 中间4栏导航 — 与 Header 导航结构对齐 */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
                {col.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link, i) => (
                  <Link
                    key={`${col.title}-${i}`}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── 分割线 ── */}
        <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} className="mb-8" />

        {/* ── 底部：版权 + 法律链接 ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35 text-center md:text-left">
            © 2025 {t("home_name")} {lang === "zh" ? "版權所有" : "All rights reserved."}
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs text-white/35 hover:text-white/60 cursor-pointer transition-colors">
              {t("footer_privacy")}
            </span>
            <span className="text-xs text-white/35 hover:text-white/60 cursor-pointer transition-colors">
              {t("footer_terms")}
            </span>
            <span className="text-xs text-white/35 hover:text-white/60 cursor-pointer transition-colors">
              {t("footer_disclaimer")}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
