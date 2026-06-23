import type { Lang } from "@/lib/types";
import StructurePageClient from "./StructurePageClient";

export default async function StructurePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (["zh", "en"].includes(lang) ? lang : "zh") as Lang;

  return <StructurePageClient lang={validLang} />;
}
