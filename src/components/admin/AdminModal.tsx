"use client";

import { useState, useEffect, useCallback } from "react";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "url";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  /** 如果是雙語字段，標註為 zh 或 en 字段，用於分組顯示 */
  lang?: "zh" | "en";
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  title: string;
  fields: FieldConfig[];
  initialData?: Record<string, unknown> | null;
}

export default function AdminModal({
  isOpen,
  onClose,
  onSave,
  title,
  fields,
  initialData,
}: AdminModalProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  // 初始化表單數據
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({ ...initialData });
      } else {
        const defaults: Record<string, unknown> = {};
        fields.forEach((f) => {
          defaults[f.name] = f.type === "number" ? 0 : "";
        });
        setFormData(defaults);
      }
      setErrors({});
      setServerError("");
    }
  }, [isOpen, initialData, fields]);

  // Esc 關閉
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = useCallback(
    (name: string, value: string | number) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // 清除該字段的校驗錯誤
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");

    // 客戶端必填校驗
    const newErrors: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.required) {
        const val = formData[f.name];
        if (val === undefined || val === null || val === "") {
          newErrors[f.name] = `${f.label}為必填項`;
        }
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      // 清理數據：移除空字符串的可選字段
      const cleanData: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(formData)) {
        const field = fields.find((f) => f.name === key);
        if (val === "" && !field?.required) {
          cleanData[key] = null;
        } else if (field?.type === "number" && typeof val === "string") {
          const n = parseInt(val, 10);
          cleanData[key] = isNaN(n) ? 0 : n;
        } else {
          cleanData[key] = val;
        }
      }
      await onSave(cleanData);
    } catch (err: any) {
      setServerError(err.message || "保存失敗，請稍後重試");
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  // 將字段按 zh/en 分組
  const zhFields = fields.filter((f) => f.lang === "zh" || !f.lang);
  const enFields = fields.filter((f) => f.lang === "en");

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[5vh] pb-10 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 遮罩 */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* 彈窗 */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4">
        {/* 標題欄 */}
        <div
          className="flex items-center justify-between px-6 py-4 rounded-t-xl"
          style={{ backgroundColor: "#0A2463" }}
        >
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-xl leading-none transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 表單 */}
        <form onSubmit={handleSubmit} className="px-6 py-5">
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {serverError}
            </div>
          )}

          <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
            {/* 非雙語字段（如 id, section, sort_order, year, date 等） */}
            {fields
              .filter((f) => !f.lang || (f.lang !== "zh" && f.lang !== "en"))
              .map((field) => (
                <FieldRow
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  error={errors[field.name]}
                  onChange={handleChange}
                  isEditing={!!initialData}
                />
              ))}

            {/* 雙語字段成對展示 */}
            {zhFields.length > 0 && enFields.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                  雙語內容
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* 中文列 */}
                  <div className="space-y-4">
                    {zhFields
                      .filter((f) => f.lang === "zh")
                      .map((field) => (
                        <FieldRow
                          key={field.name}
                          field={{ ...field, label: field.label + "（中文）" }}
                          value={formData[field.name]}
                          error={errors[field.name]}
                          onChange={handleChange}
                          isEditing={!!initialData}
                        />
                      ))}
                  </div>
                  {/* 英文列 */}
                  <div className="space-y-4">
                    {enFields
                      .filter((f) => f.lang === "en")
                      .map((field) => (
                        <FieldRow
                          key={field.name}
                          field={{ ...field, label: field.label + "（英文）" }}
                          value={formData[field.name]}
                          error={errors[field.name]}
                          onChange={handleChange}
                          isEditing={!!initialData}
                        />
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 按鈕 */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 text-sm font-medium text-white rounded-lg transition-colors hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#0A2463" }}
            >
              {saving ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** 單個表單字段 */
function FieldRow({
  field,
  value,
  error,
  onChange,
  isEditing,
}: {
  field: FieldConfig;
  value: unknown;
  error?: string;
  onChange: (name: string, value: string | number) => void;
  isEditing: boolean;
}) {
  const inputId = `field-${field.name}`;
  const commonClass =
    "w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E92CC] focus:border-transparent transition-colors";
  const errorClass = error ? "border-red-400 bg-red-50" : "border-gray-200";

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        {field.label}
        {field.required && <span className="text-red-500 ml-0.5">*</span>}
        <span className="text-gray-400 font-normal text-xs ml-2">
          {field.name}
        </span>
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={inputId}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.name, e.target.value)}
          disabled={field.disabled}
          placeholder={field.placeholder}
          rows={5}
          className={`${commonClass} ${errorClass} min-h-[120px] resize-y`}
        />
      ) : field.type === "select" ? (
        <select
          id={inputId}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.name, e.target.value)}
          disabled={field.disabled}
          className={`${commonClass} ${errorClass}`}
        >
          <option value="">-- 請選擇 --</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
          value={field.type === "number" ? (value as number) ?? 0 : String(value ?? "")}
          onChange={(e) =>
            onChange(
              field.name,
              field.type === "number" ? parseInt(e.target.value, 10) || 0 : e.target.value
            )
          }
          disabled={field.disabled}
          placeholder={field.placeholder}
          className={`${commonClass} ${errorClass}`}
        />
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
