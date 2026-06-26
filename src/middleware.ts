import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Admin 路由攔截 Middleware
 *
 * 重要：Next.js middleware 運行在 Edge Runtime，無法直接訪問 sql.js（依賴 WASM + fs）。
 * 因此 middleware 只做 cookie 存在性檢查（預過濾），完整的 session 驗證在各 API route
 * 和 admin layout 服務端組件中進行。
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 允許登錄頁面和登錄 API 通過
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/auth/")) {
    return NextResponse.next();
  }

  // 檢查 admin 頁面路由（/admin/*）
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    // token 有效性由 admin layout 服務端組件驗證
    return NextResponse.next();
  }

  // 檢查 admin API 路由（/api/admin/*）
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    // token 有效性由各 API route handler 驗證
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
