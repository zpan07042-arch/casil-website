"use client";

import { useRouter, usePathname } from "next/navigation";
import { useI18n } from "@/components/data/I18nProvider";

export default function LangSwitch() {
  const { lang } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (newLang: string) => {
    const parts = pathname.split("/");
    parts[1] = newLang;
    router.push(parts.join("/"));
  };

  return (
    <div className="hidden md:flex border border-divider rounded-full overflow-hidden text-xs">
      <button
        onClick={() => switchTo("zh")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "zh"
            ? "bg-brand text-white"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        中
      </button>
      <button
        onClick={() => switchTo("en")}
        className={`px-2.5 py-1 transition-colors ${
          lang === "en"
            ? "bg-brand text-white"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        EN
      </button>
    </div>
  );
}
