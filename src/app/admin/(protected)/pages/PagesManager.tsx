"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { PAGES_FIELDS, PAGES_COLUMNS } from "@/lib/admin-fields";

interface Props {
  initialData: Record<string, unknown>[];
}

export function PagesManager({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();

  // 編輯時 id 字段只讀
  const fields = PAGES_FIELDS.map((f) => ({
    ...f,
    disabled: editingRow ? (f.name === "id" ? true : f.disabled) : f.disabled,
  }));

  const handleSave = useCallback(
    async (formData: Record<string, unknown>) => {
      if (editingRow) {
        // 更新：不發送 id 字段（TEXT PK 不可更改）
        const { id, ...rest } = formData;
        const res = await fetch(`/api/admin/pages/${editingRow.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rest),
        });
        if (res.status === 401) { router.push("/admin/login"); return; }
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "更新失敗");
        }
        const json = await res.json();
        setData((prev) =>
          prev.map((row) => (row.id === editingRow.id ? { ...row, ...json.data } : row))
        );
      } else {
        // 新增
        const res = await fetch("/api/admin/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.status === 401) { router.push("/admin/login"); return; }
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "新增失敗");
        }
        const json = await res.json();
        setData((prev) => [...prev, json.data as Record<string, unknown>]);
      }
      setModalOpen(false);
      setEditingRow(null);
    },
    [editingRow, router]
  );

  const handleDelete = useCallback(
    async (id: string | number) => {
      const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "刪除失敗");
        return;
      }
      setData((prev) => prev.filter((row) => row.id !== id));
    },
    [router]
  );

  return (
    <>
      <AdminTable
        columns={PAGES_COLUMNS}
        data={data}
        onEdit={(row) => {
          setEditingRow(row);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
        onAdd={() => {
          setEditingRow(null);
          setModalOpen(true);
        }}
        tableLabel="頁面"
      />
      {modalOpen && (
        <AdminModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingRow(null);
          }}
          onSave={handleSave}
          title={editingRow ? "編輯頁面" : "新增頁面"}
          fields={fields}
          initialData={editingRow}
        />
      )}
    </>
  );
}
