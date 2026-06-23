"use client";

import Link from "next/link";
import { useI18n } from "@/components/data/I18nProvider";

export default function Footer() {
  const { lang, t } = useI18n();
  const base = `/${lang}`;

  const navColumns = [
    {
      title: lang === "zh" ? "關於集團" : "About Group",
      links: [
        { label: lang === "zh" ? "集團簡介" : "Group Overview", href: `${base}/about/background` },
        { label: lang === "zh" ? "發展歷程" : "History", href: `${base}/about/background` },
        { label: lang === "zh" ? "企業文化" : "Culture", href: `${base}/about/culture` },
        { label: lang === "zh" ? "管理層介紹" : "Management", href: `${base}/about/board` },
        { label: lang === "zh" ? "企業架構" : "Structure", href: `${base}/about/structure` },
      ],
    },
    {
      title: lang === "zh" ? "業務領域" : "Business",
      links: [
        { label: lang === "zh" ? "印製電路板" : "PCB", href: `${base}/business/electronics` },
        { label: lang === "zh" ? "顯示器件" : "Displays", href: `${base}/business/electronics` },
        { label: lang === "zh" ? "IPM模組" : "IPM Modules", href: `${base}/business/products` },
        { label: lang === "zh" ? "電源產品" : "Power Supply", href: `${base}/business/products` },
        { label: lang === "zh" ? "注塑成型" : "Injection Molding", href: `${base}/business/global` },
      ],
    },
    {
      title: lang === "zh" ? "新聞中心" : "News",
      links: [
        { label: lang === "zh" ? "集團要聞" : "Group News", href: `${base}/party/dynamic` },
        { label: lang === "zh" ? "黨建專欄" : "Party Building", href: `${base}/party/pioneer` },
        { label: lang === "zh" ? "媒體聚焦" : "Media Focus", href: `${base}/party/staff` },
        { label: lang === "zh" ? "公告通函" : "Announcements", href: `${base}/links` },
        { label: lang === "zh" ? "年度報告" : "Annual Reports", href: `${base}/links` },
      ],
    },
    {
      title: lang === "zh" ? "投資者關係" : "Investors",
      links: [
        { label: lang === "zh" ? "股票資訊" : "Stock Info", href: "http://www.casil-group.com:8080/investor/" },
        { label: lang === "zh" ? "財務報告" : "Financials", href: "http://www.casil-group.com:8080/investor/" },
        { label: lang === "zh" ? "公司治理" : "Governance", href: `${base}/about/governance` },
        { label: lang === "zh" ? "股東資訊" : "Shareholders", href: "http://www.casil-group.com:8080/investor/" },
        { label: lang === "zh" ? "聯絡我們" : "Contact", href: `${base}/contact` },
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
                  {lang === "zh" ? "中國航天國際控股有限公司" : "China Aerospace International Holdings Ltd."}
                </p>
                <p className="text-white/40 text-xs mt-0.5 font-mono tracking-wide">
                  00031.HK
                </p>
              </div>
            </div>

            <p className="text-white/55 text-xs leading-relaxed mb-5">
              {lang === "zh"
                ? "香港聯合交易所上市企業，專注航天電子產業，引領高科技製造業高質量發展。"
                : "Listed on HKEX. Focused on aerospace electronics, leading high-tech manufacturing excellence."}
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

          {/* 中间4栏导航 */}
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
            © 2025 {lang === "zh" ? "中國航天國際控股有限公司" : "China Aerospace International Holdings Ltd."} {lang === "zh" ? "版權所有" : "All rights reserved."}
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs text-white/35 hover:text-white/60 cursor-pointer transition-colors">
              {lang === "zh" ? "隱私政策" : "Privacy Policy"}
            </span>
            <span className="text-xs text-white/35 hover:text-white/60 cursor-pointer transition-colors">
              {lang === "zh" ? "使用條款" : "Terms of Use"}
            </span>
            <span className="text-xs text-white/35 hover:text-white/60 cursor-pointer transition-colors">
              {lang === "zh" ? "免責聲明" : "Disclaimer"}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
