import { checkAuth } from "@/lib/admin-config";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  // 驗證管理員身份
  const authed = await checkAuth(request);
  if (!authed) {
    return Response.json({ error: "未授權" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return Response.json({ error: "未找到文件" }, { status: 400 });
    }

    // 驗證文件類型
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/heic", "image/heif"];
    if (!validTypes.includes(file.type)) {
      return Response.json({ error: "不支持的文件類型，僅允許 JPG/PNG/GIF/WebP/SVG/HEIC" }, { status: 400 });
    }

    // 生成唯一文件名
    const ext = file.name.split(".").pop() || "png";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    // 確保上傳目錄存在（存到 data/uploads，避免 public/ 在生產環境的靜態化問題）
    const uploadsDir = path.join(process.cwd(), "data", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // 寫入文件
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadsDir, filename), buffer);

    return Response.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "上傳失敗" }, { status: 500 });
  }
}
