import { getDb } from "../../../../../data/database";
import { CompanyNewsManager } from "./CompanyNewsManager";

export default async function AdminCompanyNewsPage() {
  const db = await getDb();
  const data = db.listAll("company_news", "date DESC");
  return <CompanyNewsManager initialData={data as Record<string, unknown>[]} />;
}
