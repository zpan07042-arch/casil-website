import { getDb } from "../../../../../data/database";
import { PagesManager } from "./PagesManager";

export default async function AdminPagesPage() {
  const db = await getDb();
  const data = db.listAll("pages", "sort_order");
  return <PagesManager initialData={data as Record<string, unknown>[]} />;
}
