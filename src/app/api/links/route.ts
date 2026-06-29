import { getLinks } from "@/lib/db";

export async function GET() {
  try {
    const links = await getLinks();
    return Response.json(links);
  } catch {
    return Response.json([]);
  }
}
