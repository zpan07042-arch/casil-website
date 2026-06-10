"use client";

import Link from "next/link";
import { useI18n } from "@/components/data/I18nProvider";

export default function Footer() {
  const { lang, t } = useI18n();
  const base = `/${lang}`;

  const columns = [
    {
      title: t("nav_about"),
      links: [
        { label: t("nav_bg"), href: `${base}/about/background` },
        { label: t("nav_culture"), href: `${base}/about/culture` },
        { label: t("nav_goal"), href: `${base}/about/goals` },
        { label: t("nav_board"), href: `${base}/about/board` },
        { label: t("nav_gov"), href: `${base}/about/governance` },
      ],
    },
    {
      title: t("nav_industry"),
      links: [
        { label: t("nav_subsidiary"), href: `${base}/business/subsidiaries` },
        { label: t("nav_products"), href: `${base}/business/products` },
        { label: t("nav_electronics"), href: `${base}/business/electronics` },
        { label: t("nav_lab"), href: `${base}/business/lab` },
        { label: t("nav_global"), href: `${base}/business/global` },
      ],
    },
    {
      title: t("nav_consult"),
      links: [
        { label: t("nav_announce"), href: `${base}/news` },
        { label: t("nav_company"), href: `${base}/company-news` },
        { label: t("nav_comm"), href: `${base}/shareholder` },
      ],
    },
  ];

  return (
    <footer className="bg-[#0A2463] text-white/80">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/casil.jpg" alt="CASIL" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              {lang === "zh"
                ? "中國航天國際控股有限公司，致力於航天科技產業的創新與發展"
                : "China Aerospace International Holdings Limited"}
            </p>
          </div>

          {/* Link Columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
                {col.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Divider */}
        <hr className="gradient-divider opacity-30" />

        <div className="pt-8 text-center text-xs text-white/40 space-y-1">
          <p>{t("home_footer_en")}</p>
          <p>{t("home_footer_zh")}</p>
        </div>
      </div>
    </footer>
  );
}
