"use client";

import { useState, useEffect, useRef } from "react";

export default function YearFilter({
  years,
  base,
  lang,
}: {
  years: number[];
  base: string;
  lang: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClose = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClose);
    document.addEventListener("touchstart", onClose);
    return () => {
      document.removeEventListener("mousedown", onClose);
      document.removeEventListener("touchstart", onClose);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand transition-colors px-3 py-1.5 rounded-lg border border-divider hover:border-brand"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 4.5L7 9.5L12 4.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {lang === "zh" ? "筛选年份" : "Filter Year"}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-xl shadow-lg border border-black/5 py-1 min-w-[120px] max-h-[260px] overflow-auto">
          {years.map((year) => (
            <a
              key={year}
              href={`${base}/news/${year}`}
              className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-black/[0.04] hover:text-brand transition-colors"
            >
              {lang === "zh" ? `${year} 年` : year}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
