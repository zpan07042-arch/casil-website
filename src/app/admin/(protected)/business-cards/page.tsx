import { getDb } from "../../../../../data/database";
import { BusinessCardsManager } from "./BusinessCardsManager";

export default async function AdminBusinessCardsPage() {
  const db = await getDb();
  const data = db.listAll("business_cards", "sort_order");
  return <BusinessCardsManager initialData={data as Record<string, unknown>[]} />;
}
