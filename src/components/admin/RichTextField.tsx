"use client";

import { useRef, useCallback, useEffect } from "react";

interface RichTextFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export default function RichTextField({
  id,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}: RichTextFieldProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // 初始化或外部 value 變更時同步內容
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      // 只有當內容不同時才更新，避免重置光標位置
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
    isInternalChange.current = false;
  }, [value]);

  // 處理內容變更
  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    isInternalChange.current = true;
    const html = editorRef.current.innerHTML;
    onChange(html);
  }, [onChange]);

  const execCommand = useCallback(
    (command: string, value?: string) => {
      if (!editorRef.current) return;
      editorRef.current.focus();
      document.execCommand(command, false, value);
      // 觸發 onChange 以保存當前狀態
      handleInput();
    },
    [handleInput]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Ctrl/Cmd+B 快捷鍵加粗
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        execCommand("bold");
      }
    },
    [execCommand]
  );

  // 處理 paste 事件，清理格式
  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      // 將粘貼的純文字中的換行轉換為 <br>
      const html = text
        .split(/\n/)
        .map((line) =>
          line ? line.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "<br>"
        )
        .join("<br>");
      document.execCommand("insertHTML", false, html);
    },
    []
  );

  const errorClass = error
    ? "border-red-400 bg-red-50"
    : "border-gray-200";

  return (
    <div>
      {/* 工具欄 */}
      {!disabled && (
        <div className="flex items-center gap-0.5 mb-1.5 border border-gray-200 rounded-t-lg bg-gray-50 px-1.5 py-1">
          <button
            type="button"
            onClick={() => execCommand("bold")}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 text-gray-700 font-bold text-sm transition-colors"
            title="加粗 (Ctrl+B)"
          >
            B
          </button>
        </div>
      )}

      {/* 編輯區 */}
      <div
        ref={editorRef}
        id={id}
        contentEditable={!disabled}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E92CC] focus:border-transparent transition-colors min-h-[200px] prose prose-sm max-w-none ${errorClass} ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        style={{
          borderRadius: disabled ? "0.5rem" : "0 0 0.5rem 0.5rem",
          borderTop: disabled ? undefined : "none",
        }}
        // placeholder 效果
        role="textbox"
        aria-placeholder={placeholder}
        suppressContentEditableWarning
      />

      {/* placeholder CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            [data-placeholder]:empty:before {
              content: attr(data-placeholder);
              color: #9ca3af;
              pointer-events: none;
            }
          `,
        }}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
