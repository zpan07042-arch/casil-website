import { getDb } from "../../../../../data/database";
import { LinksManager } from "./LinksManager";

export default async function AdminLinksPage() {
  const db = await getDb();
  const data = db.listAll("links", "sort_order");
  return <LinksManager initialData={data as Record<string, unknown>[]} />;
}
