"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      setError("請輸入密碼");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "登錄失敗");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("網絡錯誤，請稍後重試");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 overflow-hidden">
        {/* 品牌條 */}
        <div className="px-8 py-10 text-center" style={{ backgroundColor: "#0A2463" }}>
          <h1 className="text-white text-2xl font-bold tracking-wide">
            CASIL 後台管理系統
          </h1>
          <p className="text-white/50 text-sm mt-2">
            中國航天國際控股有限公司
          </p>
        </div>

        {/* 表單 */}
        <form onSubmit={handleSubmit} className="px-8 py-8">
          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              管理員密碼
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="請輸入密碼"
              autoFocus
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E92CC] focus:border-transparent transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-medium text-white rounded-lg transition-colors hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "#0A2463" }}
          >
            {loading ? "登錄中..." : "登錄"}
          </button>
        </form>
      </div>
    </div>
  );
}
