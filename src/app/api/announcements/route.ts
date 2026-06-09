import { getLatestAnnouncements } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const lang = searchParams.get("lang") || "zh";

  const announcements = await getLatestAnnouncements(limit);

  return Response.json(
    announcements.map((a) => ({
      ...a,
      title_zh: a.title_zh,
      title_en: a.title_en || a.title_zh,
      date: a.date || String(a.year),
    }))
  );
}
