"use client";

import AboutHeader from "@/components/shared/AboutHeader";
import StructureSvg from "@/components/about/StructureSvg";
import type { Lang } from "@/lib/types";

const content = {
  zh: {
    breadcrumb: "首頁 > 關於我們 > 企業架構",
    enLabel:    "CORPORATE STRUCTURE",
    title:      "企業架構",
    desc:       "中國航天國際控股有限公司集團組織架構圖",
    note:       "",
  },
  en: {
    breadcrumb: "Home > About Us > Corporate Structure",
    enLabel:    "CORPORATE STRUCTURE",
    title:      "Corporate Structure",
    desc:       "China Aerospace International Holdings Limited — Group Organization Chart",
    note:       "",
  },
};

export default function StructurePageClient({ lang }: { lang: Lang }) {
  const t = content[lang];

  return (
    <div style={{ backgroundColor: "#F8FAFE" }}>
      <AboutHeader
        title={t.title}
        breadcrumb={t.breadcrumb}
        enLabel={t.enLabel}
        description={t.desc}
        note={t.note}
      />
      <StructureSvg lang={lang} />
    </div>
  );
}
