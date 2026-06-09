import { searchAll } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const lang = searchParams.get("lang") || "zh";

  if (!q.trim()) return Response.json([]);

  const results = await searchAll(q.trim());

  return Response.json(
    results.map((r) => ({
      type: r.type,
      title_zh: r.title_zh,
      title_en: r.title_en,
      snippet_zh: r.snippet_zh,
      snippet_en: r.snippet_en,
      route: r.route,
    }))
  );
}
