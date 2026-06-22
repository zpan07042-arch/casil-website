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
          {/* Logo */}
          <Link href={base} className="flex-shrink-0">
            <img
              src="/images/casil-logo.png"
              alt="CASIL"
              className="h-10 w-auto"
            />
          </Link>

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
                      {activeDropdown === key && (
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
      </header>
    </>
  );
}
