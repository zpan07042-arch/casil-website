"use client";

import { useState } from "react";
import Link from "next/link";

// ============================================================
// NavItem 类型与 Header.tsx 保持一致
// [新增] link 类型支持 external 和 showArrow
// ============================================================
interface NavDropdown {
  label: string;
  href: string;
  items: { label: string; href: string }[];
}

type NavItem =
  | { type: "dropdown"; key: string; data: NavDropdown }
  | { type: "link"; key: string; label: string; href: string; showArrow?: boolean; external?: boolean };

// ============================================================
// [修改] Props 接收 navItems 有序列表
// party 改为 dropdown 后，移动端自动支持展开/收起子菜单
// ============================================================
export default function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 -mr-2 text-text-primary"
        aria-label="Menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" />
          )}
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 top-12 z-[9999]" style={{ backgroundColor: "#ffffff" }}>
          <div className="p-5 space-y-2 overflow-y-auto max-h-[calc(100vh-3rem)]" style={{ backgroundColor: "#ffffff" }}>
            {/* ============================================================ */}
            {/* 遍历 navItems 按类型渲染：dropdown 可展开收起 / link 直接跳转 */}
            {/* [新增] party dropdown 在移动端自动展示展开箭头 + 4个子项 */}
            {/* ============================================================ */}
            {navItems.map((item) => {
              if (item.type === "dropdown") {
                // ---------- 下拉菜单项（关于我们 / 产业与业务 / 党的建设）----------
                const { key, data: dd } = item;
                return (
                  <div key={key}>
                    <button
                      onClick={() => setExpanded(expanded === key ? null : key)}
                      className="w-full flex items-center justify-between py-3 text-base font-medium text-text-primary"
                    >
                      {dd.label}
                      <svg
                        width="14" height="14" viewBox="0 0 14 14"
                        className={`transition-transform ${expanded === key ? "rotate-180" : ""}`}
                      >
                        <path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                    {expanded === key && (
                      <div className="pl-4 space-y-1 pb-2">
                        {dd.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-sm text-text-secondary hover:text-brand transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // ---------- 普通链接项（首页 / 投资者关系 / 新闻中心）----------
              const { key, label, href, showArrow, external } = item;

              // [新增] 外部链接（投资者关系）使用 <a> 标签 + target="_blank"
              if (external) {
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-text-primary"
                  >
                    {label}
                  </a>
                );
              }

              // [修改] 内部链接 — 新闻中心如有 showArrow 在移动端也显示箭头指示
              return (
                <Link
                  key={key}
                  href={href || "#"}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-3 text-base font-medium text-text-primary"
                >
                  {label}
                  {/* [新增] 需求4: 移动端新闻中心菜单右侧也显示下拉箭头 */}
                  {showArrow && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      className="text-slate-400 flex-shrink-0"
                    >
                      <path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
