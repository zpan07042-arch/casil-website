"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/AdminTable";
import AdminModal from "@/components/admin/AdminModal";
import { ANNOUNCEMENTS_FIELDS, ANNOUNCEMENTS_COLUMNS } from "@/lib/admin-fields";

interface Props {
  initialData: Record<string, unknown>[];
}

export function AnnouncementsManager({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<Record<string, unknown> | null>(null);
  const router = useRouter();

  const handleSave = useCallback(
    async (formData: Record<string, unknown>) => {
      if (editingRow) {
        const res = await fetch(`/api/admin/announcements/${editingRow.id}`, {
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
        const res = await fetch("/api/admin/announcements", {
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
      const res = await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (!res.ok) { const err = await res.json(); alert(err.error || "刪除失敗"); return; }
      setData((prev) => prev.filter((row) => row.id !== id));
    },
    [router]
  );

  return (
    <>
      <AdminTable
        columns={ANNOUNCEMENTS_COLUMNS}
        data={data}
        onEdit={(row) => { setEditingRow(row); setModalOpen(true); }}
        onDelete={handleDelete}
        onAdd={() => { setEditingRow(null); setModalOpen(true); }}
        tableLabel="公告"
      />
      {modalOpen && (
        <AdminModal
          isOpen={modalOpen}
          onClose={() => { setModalOpen(false); setEditingRow(null); }}
          onSave={handleSave}
          title={editingRow ? "編輯公告" : "新增公告"}
          fields={ANNOUNCEMENTS_FIELDS}
          initialData={editingRow}
        />
      )}
    </>
  );
}
