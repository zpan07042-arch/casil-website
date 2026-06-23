"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/components/data/I18nProvider";
import SearchBar from "./SearchBar";
import LangSwitch from "./LangSwitch";
import MobileMenu from "./MobileMenu";

interface NavDropdown {
  label: string;
  href: string;
  items: { label: string; href: string }[];
}

type NavItem =
  | { type: "dropdown"; key: string; data: NavDropdown }
  | { type: "link"; key: string; label: string; href: string; showArrow?: boolean; external?: boolean };

export default function Header() {
  const { lang, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setMounted(true), []);

  const handleMouseEnter = (key: string) => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const handleMegaMenuEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setActiveDropdown("industry");
  };

  const handleMegaMenuLeave = () => {
    hideTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const base = `/${lang}`;

  const sectionActive = (key: string): boolean => {
    const p = pathname;
    if (key === "home") return p === base;
    if (key === "about") return p.startsWith(`${base}/about`);
    if (key === "industry") return p.startsWith(`${base}/business`);
    if (key === "investor") return false;
    if (key === "news") return p.startsWith(`${base}/news`);
    if (key === "party") return p.startsWith(`${base}/party`);
    if (key === "contact") return p.startsWith(`${base}/contact`);
    return false;
  };

  const aboutItems = [
    { label: t("nav_bg"), href: `${base}/about/background` },
    { label: t("nav_culture"), href: `${base}/about/culture` },
    { label: t("nav_goal"), href: `${base}/about/goals` },
    { label: t("nav_board"), href: `${base}/about/board` },
    { label: t("nav_gov"), href: `${base}/about/governance` },
    { label: t("nav_arc"), href: `${base}/about/structure` },
  ];

  const businessItems = [
    { label: t("nav_subsidiary"), href: `${base}/business/subsidiaries` },
    { label: t("nav_products"), href: `${base}/business/products` },
    { label: t("nav_electronics"), href: `${base}/business/electronics` },
    { label: t("nav_lab"), href: `${base}/business/lab` },
    { label: t("nav_global"), href: `${base}/business/global` },
  ];

  const partyItems = [
    { label: t("nav_party_dynamic"), href: `${base}/party/dynamic` },
    { label: t("nav_party_pioneer"), href: `${base}/party/pioneer` },
    { label: t("nav_party_staff"), href: `${base}/party/staff` },
    { label: t("nav_party_youth"), href: `${base}/party/youth` },
  ];

  const dropdowns: Record<string, NavDropdown> = {
    about: { label: t("nav_about"), items: aboutItems, href: `${base}/about` },
    industry: { label: t("nav_industry"), items: businessItems, href: `${base}/business` },
    party: { label: t("nav_party"), items: partyItems, href: `${base}/party` },
  };

  const navItems: NavItem[] = [
    { type: "link", key: "home", label: t("nav_home"), href: base },
    { type: "dropdown", key: "about", data: dropdowns.about },
    { type: "dropdown", key: "industry", data: dropdowns.industry },
    { type: "link", key: "investor", label: t("nav_investor"), href: "http://www.casil-group.com:8080/investor/", external: true },
    { type: "link", key: "news", label: t("nav_consult"), href: "", showArrow: true },
    { type: "dropdown", key: "party", data: dropdowns.party },
    { type: "link", key: "contact", label: t("nav_contact"), href: `${base}/contact` },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass shadow-[0_2px_20px_rgba(10,36,99,0.08)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-12  ">
          <div className="flex items-center gap-0 -ml-20">
              <Link href={base} className="flex-shrink-0">
              <img
                src="/images/casil-logo.png"
                alt="CASIL"
                className="h-7.5 w-auto "
              />
            </Link>
            <div className="hidden md:block text-[11px] leading-4 text-text-secondary whitespace-nowrap ml-4">
              <div>{t("home_name")}</div>
              <div>{t("home_stock")}</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              if (item.type === "dropdown") {
                const { key, data: dd } = item;
                const isActive = sectionActive(key);
                const isOpen = activeDropdown === key;
                return (
                  <div
                    key={key}
                    className="relative h-full flex items-center group"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={dd.href}
                      className={`
                        text-sm cursor-pointer transition-all duration-200 inline-flex items-center gap-1
                        relative h-full py-1
                        ${isActive ? "text-text-primary" : isOpen ? "text-brand" : "text-text-secondary hover:text-text-primary"}
                      `}
                    >
                      {dd.label}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-200 flex-shrink-0 h-4 w-4 ${isOpen ? "rotate-180 text-slate-700" : "text-slate-400"}`}
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                      <span
                        className={`
                          absolute left-0 right-0 bottom-0 h-[3px] rounded-[2px] transition-all duration-200
                          ${isActive ? "bg-black scale-x-100" : isOpen ? "bg-black/30 scale-x-100" : "bg-black scale-x-0 group-hover:scale-x-100 group-hover:bg-black/30"}
                        `}
                      />
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === key && key !== "industry" && (
                        <motion.div
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="bg-white rounded-lg shadow-xl ring-1 ring-black/5 overflow-hidden py-1 min-w-[280px]">
                            {dd.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`block px-4 py-2.5 text-sm transition-colors duration-150
                                  ${pathname?.startsWith(subItem.href)
                                    ? "bg-slate-50 text-blue-600 font-medium"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                  }
                                `}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const { key, label, href, showArrow, external } = item;
              const isActive = sectionActive(key);
              return (
                <div key={key} className="relative h-full flex items-center group">
                  <Link
                    href={href || "#"}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`
                      text-sm cursor-pointer transition-all duration-200 inline-flex items-center gap-1
                      relative h-full py-1
                      ${isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}
                    `}
                  >
                    {label}
                    {showArrow && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 flex-shrink-0 h-4 w-4 text-slate-400"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <span
                      className={`
                        absolute left-0 right-0 bottom-0 h-[3px] rounded-[2px] transition-all duration-200
                        ${isActive ? "bg-black scale-x-100" : "bg-black scale-x-0 group-hover:scale-x-100 group-hover:bg-black/30"}
                      `}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {mounted && pathname !== base && (
            <button
              onClick={() => router.back()}
              className="flex items-center gap-1 h-9 px-2.5 rounded-lg bg-white border border-[#D8DEE6] text-[#0A2463] hover:bg-[#1A409815] hover:border-brand hover:text-brand-dark hover:scale-105 transition-all duration-200"
              title={t("back_btn")}
            >
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className="flex-shrink-0"
              >
                <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-sm">{t("back_btn")}</span>
            </button>
          )}

          <div className="flex items-center gap-4">
            <SearchBar />
            <LangSwitch
              locale={lang}
              onLanguageChange={(newLang: string) => {
                const segments = pathname.split("/");
                segments[1] = newLang;
                router.push(segments.join("/"));
              }}
            />
            <MobileMenu navItems={navItems} />
          </div>
        </div>

        {/* 产业通栏下拉 - 移除高度撑开动画 */}
        <AnimatePresence>
          {activeDropdown === "industry" && (
            <motion.div
              className="absolute left-0 right-0 top-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <div className="bg-white shadow-xl border-t border-gray-100 overflow-hidden">
                <div className="grid grid-cols-6 gap-4 p-3">
                  <div className="relative bg-cover bg-center -m-3" style={{ backgroundImage: "url('/images/baback.jpg')" }}>
                    <div className="absolute inset-0 bg-black/55" />
                    <div className="relative z-10 p-3">
                      <p className="text-[0.8rem] text-white leading-relaxed mb-2">
                        中國航天國際控股有限公司專注於電子製造及精密工業領域，旗下五大業務板塊覆蓋 PCB、顯示器件、智能功率模組、電源及注塑成型，為全球客戶提供一站式高科技製造解決方案。
                      </p>
                      <Link
                        href={`${base}/business`}
                        className="inline-flex items-center gap-1 text-white/85 text-[0.8rem] font-medium hover:text-white transition-colors duration-200"
                      >
                        查看全部
                        <svg
                          width="12"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[0.9rem] font-bold text-gray-950">印製電路板（PCB）</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      東莞康源
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      單層至多層 HDI 板、軟硬結合板，年產能逾 500 萬平方米。
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[0.9rem] font-bold text-gray-950">顯示器件研發與生產</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      航科半導體
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      TFT-LCD、OLED 及車載顯示模組，服務高端工業及航天應用。
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[0.9rem] font-bold text-gray-950 whitespace-nowrap">IPM 智能功率模組封裝</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      志豪微電子
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      自主封裝 IPM 模組，應用於新能源汽車及工業變頻領域。
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[0.9rem] font-bold text-gray-950">電源領域</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      香港志順
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      AC-DC、DC-DC 轉換器及 UPS 系統，覆蓋數據中心與工業場景。
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-[0.9rem] font-bold text-gray-950">注塑領域</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      香港志源
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      高精密工程塑料注塑成型，配套 PCB 及顯示模組整機製造。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}