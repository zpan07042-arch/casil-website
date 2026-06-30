"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { BOARD_MEMBERS_FIELDS, BOARD_MEMBERS_COLUMNS } from "@/lib/admin-fields";

interface Props {
  initialData: Record<string, unknown>[];
}

export function BoardMembersManager({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();

  const handleSave = useCallback(
    async (formData: Record<string, unknown>) => {
      if (editingRow) {
        const res = await fetch(`/api/admin/board_members/${editingRow.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.status === 401) { router.push("/admin/login"); return; }
        if (!res.ok) { const err = await res.json(); throw new Error(err.error || "更新失敗"); }
        const json = await res.json();
        setData((prev) =>
          prev.map((row) => (row.id === editingRow.id ? { ...row, ...json.data } : row))
        );
      } else {
        const res = await fetch("/api/admin/board_members", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.status === 401) { router.push("/admin/login"); return; }
        if (!res.ok) { const err = await res.json(); throw new Error(err.error || "新增失敗"); }
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
      const res = await fetch(`/api/admin/board_members/${id}`, { method: "DELETE" });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) { const err = await res.json(); alert(err.error || "刪除失敗"); return; }
      setData((prev) => prev.filter((row) => row.id !== id));
    },
    [router]
  );

  return (
    <>
      <AdminTable
        columns={BOARD_MEMBERS_COLUMNS}
        data={data}
        onEdit={(row) => { setEditingRow(row); setModalOpen(true); }}
        onDelete={handleDelete}
        onAdd={() => { setEditingRow(null); setModalOpen(true); }}
        tableLabel="董事局與管理層"
      />
      {modalOpen && (
        <AdminModal
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditingRow(null); }}
          onSave={handleSave}
          title={editingRow ? "編輯董事局與管理層成員" : "新增董事局與管理層成員"}
          fields={BOARD_MEMBERS_FIELDS}
          initialData={editingRow}
        />
      )}
    </>
  );
}
