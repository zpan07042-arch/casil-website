"use client";

import { useI18n } from "@/components/data/I18nProvider";

export default function BackButton({ href }: { href: string }) {
  const { t } = useI18n();

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 pt-4 pb-2">
      <a
        href={href}
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand transition-colors group"
      >
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="group-hover:-translate-x-0.5 transition-transform"
        >
          <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        {t("back_btn")}
      </a>
    </div>
  );
}
