import { getDb } from "../../../../../data/database";
import type { BusinessCardRow } from "@/lib/types";

export async function GET() {
  try {
    const db = await getDb();
    const row = db
      .prepare(
        "SELECT * FROM business_cards WHERE category = ? ORDER BY sort_order LIMIT 1"
      )
      .get("aerospace_services") as BusinessCardRow | undefined;

    if (!row) {
      return Response.json(null);
    }

    return Response.json({
      main_title: row.main_title,
      sub_title: row.sub_title,
      en_name: row.en_name,
      body_zh: row.body_zh,
      body_en: row.body_en,
      product_images: row.product_images,
      learn_more_href: row.learn_more_href,
    });
  } catch {
    return Response.json(null);
  }
}
