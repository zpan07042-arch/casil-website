import { deleteSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    // 讀取 cookie 中的 token
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(/admin_token=([^;]+)/);
    const token = match?.[1];

    if (token) {
      await deleteSession(token);
    }

    // 清除 cookie（與登錄時的 Secure 標誌保持一致，確保能正確清除）
    const forceSecure = process.env.FORCE_SECURE !== "false";
    const isSecure = forceSecure && process.env.NODE_ENV === "production";
    const response = Response.json({ success: true });
    response.headers.set(
      "Set-Cookie",
      `admin_token=; HttpOnly; ${isSecure ? "Secure; " : ""}SameSite=Strict; Path=/; Max-Age=0`
    );

    return response;
  } catch (err) {
    console.error("[admin:logout]", err);
    return Response.json({ error: "服務器錯誤" }, { status: 500 });
  }
}
