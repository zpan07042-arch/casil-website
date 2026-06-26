import OverviewPage from "@/components/business/overview/OverviewPage";
import { getBusinessCards, getLinks } from "@/lib/db";
import type { OverviewCardData } from "@/components/business/overview/overviewData";
import type { BusinessCardRow, ProductImageParsed } from "@/lib/types";

/**
 * 產品與業務
 * 路由：/[lang]/business
 *
 * 服務端組件：從數據庫獲取業務卡片數據，轉換為 UI 格式後傳入 OverviewPage。
 */
export default async function BusinessPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const [dbRows, links] = await Promise.all([getBusinessCards(), getLinks()]);

  // 將 DB 行格式 (snake_case + JSON 字符串) 轉換為 OverviewCardData
  const cards: OverviewCardData[] = dbRows.map((row: BusinessCardRow) => {
    let productImages: ProductImageParsed[] = [];
    try {
      productImages = JSON.parse(row.product_images);
    } catch {
      // JSON 解析失敗時保持空數組
    }

    let clients: string[] = [];
    try {
      clients = JSON.parse(row.clients);
    } catch {
      // JSON 解析失敗時保持空數組
    }

    return {
      id: row.id,
      category: row.category,
      mainTitle: row.main_title,
      subTitle: row.sub_title,
      enName: row.en_name,
      body: {
        zh: row.body_zh,
        en: row.body_en,
      },
      clients,
      learnMoreHref: row.learn_more_href,
      imageLayout: row.image_layout as "grid" | "single",
      productPlaceholders: productImages.map((pi) => ({
        labelZh: pi.lblZh,
        labelEn: pi.lblEn,
        imagePath: pi.img,
      })),
    };
  });

  return <OverviewPage lang={lang} cards={cards} links={links} />;
}
