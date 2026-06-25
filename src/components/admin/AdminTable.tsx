"use client";

import { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (row: T) => void;
  onDelete: (id: string | number) => void;
  onAdd: () => void;
  tableLabel: string;
}

export default function AdminTable<T extends Record<string, unknown>>({
  columns,
  data,
  onEdit,
  onDelete,
  onAdd,
  tableLabel,
}: AdminTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    const sorted = [...data].sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDir === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
    return sorted as T[];
  }, [data, sortKey, sortDir]);

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleDelete(row: T) {
    if (window.confirm("確定要刪除此記錄嗎？此操作無法撤銷。")) {
      onDelete((row as Record<string, unknown>).id as string | number);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* 頂部工具欄 */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{tableLabel}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            共 {data.length} 條記錄
          </p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors hover:opacity-90"
          style={{ backgroundColor: "#0A2463" }}
        >
          + 新增
        </button>
      </div>

      {/* 表格 */}
      {data.length === 0 ? (
        <div className="px-6 py-16 text-center text-gray-400">
          暫無數據
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && (
                        <span className="text-[#3E92CC]">
                          {sortDir === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr
                  key={String(row.id ?? idx)}
                  className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${
                    idx % 2 === 1 ? "bg-gray-50/30" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate"
                      title={
                        col.render
                          ? undefined
                          : String((row as Record<string, unknown>)[col.key] ?? "")
                      }
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <button
                      onClick={() => onEdit(row)}
                      className="text-[#3E92CC] hover:text-[#0A2463] font-medium mr-3 transition-colors"
                    >
                      編輯
                    </button>
                    <button
                      onClick={() => handleDelete(row)}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
