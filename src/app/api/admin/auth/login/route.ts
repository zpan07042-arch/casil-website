import { createSession } from "@/lib/auth";
import crypto from "crypto";

// 速率限制：基於 IP 的內存計數器
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 分鐘

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_ATTEMPTS) {
    return false;
  }
  entry.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // 速率限制檢查
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: "嘗試次數過多，請 15 分鐘後再試" },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return Response.json({ error: "請輸入密碼" }, { status: 400 });
    }

    // 比對環境變量中的密碼
    if (password !== process.env.ADMIN_PASSWORD) {
      return Response.json({ error: "密碼錯誤" }, { status: 401 });
    }

    // 登錄成功：生成 token，創建 session
    const token = crypto.randomBytes(32).toString("hex");
    await createSession(token);

    // 設置 httpOnly cookie
    // FORCE_SECURE=false 可在無 HTTPS 的內網環境中禁用 Secure 標誌
    const forceSecure = process.env.FORCE_SECURE !== "false";
    const isSecure = forceSecure && process.env.NODE_ENV === "production";
    const response = Response.json({ success: true });

    response.headers.set(
      "Set-Cookie",
      `admin_token=${token}; HttpOnly; ${isSecure ? "Secure; " : ""}SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24}`
    );

    // 清理該 IP 的速率限制記錄
    rateLimitMap.delete(ip);

    return response;
  } catch (err) {
    console.error("[admin:login]", err);
    return Response.json({ error: "服務器錯誤，請稍後重試" }, { status: 500 });
  }
}
