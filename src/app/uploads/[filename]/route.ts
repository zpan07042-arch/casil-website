import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { notFound } from "next/navigation";

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".heic": "image/heic",
  ".heif": "image/heif",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // 安全檢查：防止路徑穿越
  if (filename.includes("..") || filename.includes("/")) {
    return new Response("Not Found", { status: 404 });
  }

  const filePath = join(process.cwd(), "data", "uploads", filename);

  if (!existsSync(filePath)) {
    notFound();
  }

  const buffer = await readFile(filePath);
  const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
  const contentType = MIME_MAP[ext] || "application/octet-stream";

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": buffer.length.toString(),
    },
  });
}
