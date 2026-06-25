import { getDb } from "../../../../../data/database";
import { SubsidiariesManager } from "./SubsidiariesManager";

export default async function AdminSubsidiariesPage() {
  const db = await getDb();
  const data = db.listAll("subsidiaries", "sort_order");
  return <SubsidiariesManager initialData={data as Record<string, unknown>[]} />;
}
