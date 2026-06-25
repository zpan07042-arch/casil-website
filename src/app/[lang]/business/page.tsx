import OverviewPage from "@/components/business/overview/OverviewPage";

/**
 * 產品與業務
 * 路由：/[lang]/business
 */
export default async function BusinessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return <OverviewPage lang={lang} />;
}
