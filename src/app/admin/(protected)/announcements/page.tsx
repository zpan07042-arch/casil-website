import { getDb } from "../../../../../data/database";
import { AnnouncementsManager } from "./AnnouncementsManager";

export default async function AdminAnnouncementsPage() {
  const db = await getDb();
  const data = db.listAll("announcements", "year DESC, sort_order");
  return <AnnouncementsManager initialData={data as Record<string, unknown>[]} />;
}
