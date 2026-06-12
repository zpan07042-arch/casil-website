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

  const base = `/${lang}`;

  const sectionActive = (key: string): boolean => {
    const p = pathname;
    if (key === "about") return p.startsWith(`${base}/about`);
    if (key === "industry") return p.startsWith(`${base}/business`);
    return false;
  };

  const isLinksActive = pathname.startsWith(`${base}/links`);

  const aboutItems = [
    { label: t("nav_bg"), href: `${base}/about/background` },
    { label: t("nav_culture"), href: `${base}/about/culture` },
    { label: t("nav_goal"), href: `${base}/about/goals` },
    { label: t("nav_board"), href: `${base}/about/board` },
    { label: t("nav_gov"), href: `${base}/about/governance` },
  ];

  const businessItems = [
    { label: t("nav_subsidiary"), href: `${base}/business/subsidiaries` },
    { label: t("nav_products"), href: `${base}/business/products` },
    { label: t("nav_electronics"), href: `${base}/business/electronics` },
    { label: t("nav_lab"), href: `${base}/business/lab` },
    { label: t("nav_global"), href: `${base}/business/global` },
  ];

  const contactItems = [
    { label: lang === "zh" ? "全球分支機構" : "Global Branches", href: `${base}/contact/branches` },
    { label: lang === "zh" ? "政企合作入口" : "Government & Enterprise", href: `${base}/contact/government` },
    { label: lang === "zh" ? "投資者諮詢通道" : "Investor Inquiries", href: `${base}/contact/investor` },
    { label: lang === "zh" ? "人才招聘模塊" : "Careers", href: `${base}/contact/careers` },
  ];

  const dropdowns: Record<string, NavDropdown> = {
    about: { label: t("nav_about"), items: aboutItems, href: `${base}/about` },
    industry: { label: t("nav_industry"), items: businessItems, href: `${base}/business` },
    contact: { label: lang === "zh" ? "聯繫我們" : "Contact Us", items: contactItems, href: `${base}/contact` },
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass shadow-[0_2px_20px_rgba(10,36,99,0.08)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-12 px-5 ">
          {/* Logo */}
          <Link href={base} className="flex-shrink-0">
            <img
              src="/images/casil-logo.png"
              alt="CASIL"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {Object.entries(dropdowns).map(([key, dd]) => {
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
                      width="10" height="10" viewBox="0 0 10 10" fill="none"
                      className={`transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {/* 底部通欄下劃線：絕對定位到父容器最底端 */}
                    <span
                      className={`
                        absolute left-0 right-0 bottom-0 h-[3px] rounded-[2px] transition-all duration-200
                        ${isActive ? "bg-black scale-x-100" : isOpen ? "bg-black/30 scale-x-100" : "bg-black scale-x-0 group-hover:scale-x-100 group-hover:bg-black/30"}
                      `}
                    />
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === key && (
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg shadow-black/5 border border-black/5 py-4 px-3 min-w-[280px] overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {dd.items.map((item, i) => (
                            <motion.div
                              key={item.href}
                              initial={{ y: -12, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -8, opacity: 0 }}
                              transition={{
                                delay: 0.15 + i * 0.06,
                                duration: 0.3,
                                ease: "easeOut",
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  delay: 0.25 + i * 0.06,
                                  duration: 0.25,
                                }}
                              >
                                <Link
                                  href={item.href}
                                  className="block px-5 py-3 text-base text-text-primary hover:text-brand hover:bg-black/[0.04] rounded-none transition-colors whitespace-nowrap"
                                >
                                  {item.label}
                                </Link>
                              </motion.div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <Link
              href="http://www.casil-group.com:8080/investor/"
              target="_blank"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {t("nav_investor")}
            </Link>

            {/* links 單獨下劃線改造，和上面統一 */}
            <div className="relative h-full flex items-center group">
              <Link
                href={`${base}/links`}
                className={`
                  text-sm transition-all duration-200 relative h-full py-1
                  ${isLinksActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}
                `}
              >
                {t("nav_link")}
                <span
                  className={`
                    absolute left-0 right-0 bottom-0 h-[3px] rounded-[2px] transition-all duration-200
                    ${isLinksActive ? "bg-black scale-x-100" : "bg-black scale-x-0 group-hover:scale-x-100 group-hover:bg-black/30"}
                  `}
                />
              </Link>
            </div>
          </nav>

          {/* Back button — between nav links and search */}
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

          {/* Right side */}
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
            <MobileMenu dropdowns={dropdowns} investorHref="http://www.casil-group.com:8080/investor/" linksHref={`${base}/links`} />
          </div>
        </div>
      </header>
    </>
  );
}