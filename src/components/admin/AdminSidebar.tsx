"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "頁面管理", href: "/admin/pages", icon: "📄" },
  { label: "公告管理", href: "/admin/announcements", icon: "📢" },
  { label: "董事局成員", href: "/admin/board-members", icon: "👥" },
  { label: "企業管治文件", href: "/admin/governance-docs", icon: "📋" },
  { label: "公司資訊", href: "/admin/company-news", icon: "📰" },
  { label: "子公司", href: "/admin/subsidiaries", icon: "🏢" },
  { label: "友情鏈接", href: "/admin/links", icon: "🔗" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {
      // ignore errors
    }
    router.push("/admin/login");
  }

  return (
    <aside
      className="w-60 flex-shrink-0 flex flex-col"
      style={{ backgroundColor: "#0A2463" }}
    >
      {/* 品牌區 */}
      <div className="px-5 py-6 border-b border-white/10">
        <h1 className="text-white text-lg font-bold tracking-wide">
          CASIL 後台管理
        </h1>
        <p className="text-white/50 text-xs mt-1">中國航天國際控股有限公司</p>
      </div>

      {/* 導航 */}
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full text-left px-5 py-3 text-sm transition-colors flex items-center gap-3 ${
                isActive
                  ? "bg-white/15 text-white font-medium border-l-3 border-[#3E92CC]"
                  : "text-white/70 hover:bg-white/8 hover:text-white border-l-3 border-transparent"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 登出 */}
      <div className="px-5 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full text-left px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-50"
        >
          {loggingOut ? "登出中..." : "← 登出"}
        </button>
      </div>
    </aside>
  );
}
