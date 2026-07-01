import { getPageMeta } from "@/lib/pageMeta";
import PageBanner from "@/components/shared/PageBanner";
import LocationCards from "./LocationCards";

export default async function LocationPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const meta = getPageMeta("location", lang);

  return (
    <>
      <PageBanner
        title={lang === "zh" ? "地理位置" : "Location"}
        breadcrumb={meta.breadcrumb}
        enLabel={meta.enLabel}
        description={meta.description}
      />
      <LocationCards lang={lang} />
    </>
  );
}
