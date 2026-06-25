import { getDb } from "../../../../../data/database";
import { BoardMembersManager } from "./BoardMembersManager";

export default async function AdminBoardMembersPage() {
  const db = await getDb();
  const data = db.listAll("board_members", "sort_order");
  return <BoardMembersManager initialData={data as Record<string, unknown>[]} />;
}
