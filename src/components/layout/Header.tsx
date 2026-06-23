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

// ============================================================
// 导航项联合类型：支持下拉菜单与普通链接两种形态
// [新增] link 类型新增 showArrow 字段，控制是否显示下拉箭头图标
// ============================================================
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

  // mega menu (industry) mouse handlers — keep panel open when hovering over it
  const handleMegaMenuEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setActiveDropdown("industry");
  };

  const handleMegaMenuLeave = () => {
    hideTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const base = `/${lang}`;

  // ============================================================
  // sectionActive — 路由匹配，新增 party 子页面路由
  // ============================================================
  const sectionActive = (key: string): boolean => {
    const p = pathname;
    if (key === "home") return p === base;
    if (key === "about") return p.startsWith(`${base}/about`);
    if (key === "industry") return p.startsWith(`${base}/business`);
    if (key === "investor") return false; // 外部链接不高亮
    if (key === "news") return p.startsWith(`${base}/news`);
    if (key === "party") return p.startsWith(`${base}/party`);
    if (key === "contact") return p.startsWith(`${base}/contact`);
    return false;
  };

  // ============================================================
  // 子菜单数据
  // ============================================================
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

  // ============================================================
  // [新增] 党的建设下拉子菜单 — 4个子项，每项预留跳转链接
  // ============================================================
  const partyItems = [
    { label: t("nav_party_dynamic"), href: `${base}/party/dynamic` },
    { label: t("nav_party_pioneer"), href: `${base}/party/pioneer` },
    { label: t("nav_party_staff"), href: `${base}/party/staff` },
    { label: t("nav_party_youth"), href: `${base}/party/youth` },
  ];

  // ============================================================
  // 下拉菜单配置 — [新增] party 下拉
  // ============================================================
  const dropdowns: Record<string, NavDropdown> = {
    about: { label: t("nav_about"), items: aboutItems, href: `${base}/about` },
    industry: { label: t("nav_industry"), items: businessItems, href: `${base}/business` },
    party: { label: t("nav_party"), items: partyItems, href: `${base}/party` },
  };

  // ============================================================
  // [修改] 有序导航项列表
  // 需求1: investor href 绑定正常跳转链接
  // 需求2: party 从 link 改为 dropdown
  // 需求4: news 添加 showArrow 显示下拉箭头图标
  // ============================================================
  const navItems: NavItem[] = [
    { type: "link", key: "home", label: t("nav_home"), href: base },
    { type: "dropdown", key: "about", data: dropdowns.about },
    { type: "dropdown", key: "industry", data: dropdowns.industry },
    // [修复] 投资者关系 — 绑定外部投资者关系页面链接
    { type: "link", key: "investor", label: t("nav_investor"), href: "http://www.casil-group.com:8080/investor/", external: true },
    // [修改] 新闻中心 — 添加 showArrow 显示下拉箭头图标
    { type: "link", key: "news", label: t("nav_consult"), href: "", showArrow: true },
    // [修改] 党的建设 — 从 link 改为 dropdown，hover 展示4个子菜单
    { type: "dropdown", key: "party", data: dropdowns.party },
    // 联系我们
    { type: "link", key: "contact", label: t("nav_contact"), href: `${base}/contact` },
  ];

  // ============================================================
  // [保留] 完整 header 容器、Logo、BackButton、SearchBar、LangSwitch 原样不动
  // ============================================================
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass shadow-[0_2px_20px_rgba(10,36,99,0.08)]">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-12 px-5 ">
          {/* Logo + company name */}
          <div className="flex items-center gap-0 -ml-20">
            <div className="hidden md:block text-[10px] leading-4 text-text-secondary whitespace-nowrap">
              <div>{t("home_name")}</div>
              <div>{t("home_stock")}</div>
            </div>
            <Link href={base} className="flex-shrink-0">
              <img
                src="/images/casil-logo.png"
                alt="CASIL"
                className="h-10 w-auto "
              />
            </Link>
          </div>

          {/* ============================================================ */}
          {/* Desktop Nav — 遍历 navItems，按 type 区分渲染下拉/链接 */}
          {/* 所有样式、hover 高亮、下划线动画、Framer Motion 动画全部保留 */}
          {/* ============================================================ */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              if (item.type === "dropdown") {
                // ---------- 下拉菜单项（关于我们 / 产业与业务 / 党的建设）----------
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
                    {/* 保留原有 Link + 跳转功能、原有文字样式、原有下划线动画 */}
                    <Link
                      href={dd.href}
                      className={`
                        text-sm cursor-pointer transition-all duration-200 inline-flex items-center gap-1
                        relative h-full py-1
                        ${isActive ? "text-text-primary" : isOpen ? "text-brand" : "text-text-secondary hover:text-text-primary"}
                      `}
                    >
                      {dd.label}
                      {/* 下拉箭头，保留旋转动画 */}
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
                      {/* 保留原有底部下划线动画 */}
                      <span
                        className={`
                          absolute left-0 right-0 bottom-0 h-[3px] rounded-[2px] transition-all duration-200
                          ${isActive ? "bg-black scale-x-100" : isOpen ? "bg-black/30 scale-x-100" : "bg-black scale-x-0 group-hover:scale-x-100 group-hover:bg-black/30"}
                        `}
                      />
                    </Link>

                    {/* 下拉面板 — 完整保留原有 Framer Motion 所有动画 */}
                    <AnimatePresence>
                      {activeDropdown === key && key !== "industry" && (
                        <motion.div
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className="bg-white rounded-lg shadow-xl ring-1 ring-black/5 overflow-hidden py-1 min-w-[280px]"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          >
                            {dd.items.map((subItem, i) => (
                              <motion.div
                                key={subItem.href}
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
                                  {/* 子项样式 + 当前路由高亮，保留原有跳转 */}
                                  <Link
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
                                </motion.div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              // ---------- 普通链接项（首页 / 投资者关系 / 新闻中心）----------
              const { key, label, href, showArrow, external } = item;
              const isActive = sectionActive(key);
              return (
                <div key={key} className="relative h-full flex items-center group">
                  {/* [修改] 保留与下拉菜单父级相同的下划线动画与 hover 样式 */}
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
                    {/* ============================================================ */}
                    {/* [新增] 需求4: 新闻中心菜单右侧添加下拉指示箭头 */}
                    {/* 箭头样式、尺寸、配色与现有下拉菜单箭头完全统一 */}
                    {/* ============================================================ */}
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
                    {/* 保留原有底部下划线动画 */}
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
            {/* [修改] MobileMenu 传入 navItems，party dropdown 自动在移动端展开/收起 */}
            <MobileMenu navItems={navItems} />
          </div>
        </div>

        {/* ============================================================ */}
        {/* Industry Mega Menu — 全宽通栏下拉大白板                          */}
        {/* ============================================================ */}
        <AnimatePresence>
          {activeDropdown === "industry" && (
            <motion.div
              className="absolute left-0 right-0 top-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <motion.div
                className="bg-white shadow-xl border-t border-gray-100 overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-6 gap-4">
                  {/* ---- 左侧简介栏（bg 铺满，零留白） ---- */}
                  <div className="relative overflow-hidden bg-cover bg-center flex flex-col justify-center" style={{ backgroundImage: "url('/images/baback.jpg')" }}>
                    {/* 暗色半透明蒙版 */}
                    <div className="absolute inset-0 bg-black/55" />
                    {/* 内容叠加在图上，padding 内移到此处 */}
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

                  {/* ---- 第1列：印製電路板（PCB） ---- */}
                  <div className="flex flex-col gap-1.5 p-3">
                    <h4 className="text-[0.9rem] font-bold text-gray-950">印製電路板（PCB）</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      東莞康源
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      單層至多層 HDI 板、軟硬結合板，年產能逾 500 萬平方米。
                    </p>
                  </div>

                  {/* ---- 第2列：顯示器件研發與生產 ---- */}
                  <div className="flex flex-col gap-1.5 p-3">
                    <h4 className="text-[0.9rem] font-bold text-gray-950">顯示器件研發與生產</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      航科半導體
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      TFT-LCD、OLED 及車載顯示模組，服務高端工業及航天應用。
                    </p>
                  </div>

                  {/* ---- 第3列：IPM 智能功率模組封裝（标题强制单行） ---- */}
                  <div className="flex flex-col gap-1.5 p-3">
                    <h4 className="text-[0.9rem] font-bold text-gray-950 whitespace-nowrap">IPM 智能功率模組封裝</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      志豪微電子
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      自主封裝 IPM 模組，應用於新能源汽車及工業變頻領域。
                    </p>
                  </div>

                  {/* ---- 第4列：電源領域 ---- */}
                  <div className="flex flex-col gap-1.5 p-3">
                    <h4 className="text-[0.9rem] font-bold text-gray-950">電源領域</h4>
                    <span className="self-start inline-block bg-[#EEF2F8] text-[#6E86A5] text-[0.65rem] px-2.5 py-0.5 rounded-md font-medium">
                      香港志順
                    </span>
                    <p className="text-[0.7rem] text-gray-400 leading-snug">
                      AC-DC、DC-DC 轉換器及 UPS 系統，覆蓋數據中心與工業場景。
                    </p>
                  </div>

                  {/* ---- 第5列：注塑領域 ---- */}
                  <div className="flex flex-col gap-1.5 p-3">
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
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
