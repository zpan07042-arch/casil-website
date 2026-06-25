import { getDb } from "../../../../../data/database";
import { GovernanceDocsManager } from "./GovernanceDocsManager";

export default async function AdminGovernanceDocsPage() {
  const db = await getDb();
  const data = db.listAll("governance_docs", "sort_order");
  return <GovernanceDocsManager initialData={data as Record<string, unknown>[]} />;
}
