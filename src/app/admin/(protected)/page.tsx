import { getDb } from "../../../../data/database";
import Link from "next/link";

const STAT_CARDS = [
  { table: "pages", label: "頁面", href: "/admin/pages" },
  { table: "announcements", label: "公告", href: "/admin/announcements" },
  { table: "board_members", label: "董事局與管理層", href: "/admin/board-members" },
  { table: "governance_docs", label: "企業管治文件", href: "/admin/governance-docs" },
  { table: "company_news", label: "公司資訊", href: "/admin/company-news" },
  { table: "subsidiaries", label: "子公司", href: "/admin/subsidiaries" },
  { table: "links", label: "友情鏈接", href: "/admin/links" },
];

export default async function AdminDashboardPage() {
  const db = await getDb();

  const counts = await Promise.all(
    STAT_CARDS.map(async (card) => {
      const rows = db.prepare(`SELECT COUNT(*) as count FROM ${card.table}`).all() as { count: number }[];
      return { ...card, count: rows[0]?.count ?? 0 };
    })
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">儀表板</h1>
        <p className="text-gray-500 mt-1">歡迎使用 CASIL 後台管理系統</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {counts.map((card) => (
          <Link
            key={card.table}
            href={card.href}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#3E92CC]/30 transition-all group"
          >
            <div className="text-3xl font-bold text-[#0A2463] group-hover:text-[#3E92CC] transition-colors">
              {card.count}
            </div>
            <div className="text-sm text-gray-500 mt-1">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">快速入門</h2>
        <ul className="text-sm text-gray-600 space-y-1.5">
          <li>• 點擊左側導航欄進入各數據表管理頁面</li>
          <li>• 點擊「+ 新增」按鈕創建新記錄</li>
          <li>• 點擊「編輯」修改現有記錄</li>
          <li>• 點擊「刪除」移除記錄（操作不可撤銷）</li>
          <li>• 所有操作會自動保存到數據庫文件</li>
        </ul>
      </div>
    </div>
  );
}
