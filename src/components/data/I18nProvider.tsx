"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/lib/types";
import { ui } from "@/lib/i18n";

const I18nContext = createContext<{ lang: Lang; t: (key: string) => string }>({
  lang: "zh",
  t: (key: string) => key,
});

export function I18nProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const t = (key: string) => ui[lang]?.[key] ?? key;
  return (
    <I18nContext.Provider value={{ lang, t }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
