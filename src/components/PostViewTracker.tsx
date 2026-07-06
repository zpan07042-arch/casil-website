"use client";

import { useEffect } from "react";

interface PostViewTrackerProps {
  postId: number;
}

export default function PostViewTracker({ postId }: PostViewTrackerProps) {
  useEffect(() => {
    // 記錄頁面瀏覽（避免重複記錄）
    const storageKey = `post_view_${postId}`;
    if (typeof window !== "undefined" && !sessionStorage.getItem(storageKey)) {
      sessionStorage.setItem(storageKey, "1");

      // 異步發送瀏覽記錄
      fetch("/api/admin/company_news/" + postId, { method: "GET" })
        .catch(() => {
          // 靜默處理，不影響用戶體驗
        });

      // 可在此擴展為專用的 view tracking API
      console.log(`[View] Post ${postId} viewed`);
    }
  }, [postId]);

  // 不渲染任何 UI
  return null;
}
