"use client";

import { useState, useCallback } from "react";

interface SharePosterProps {
  title: string;
  summary?: string;
  coverImage?: string | null;
  currentUrl: string;
  buttonText?: string;
  siteName?: string;
  showSummary?: boolean;
}

export default function SharePoster({
  title,
  summary,
  coverImage,
  currentUrl,
  buttonText = "分享文章",
  siteName = "新聞動態",
  showSummary = false,
}: SharePosterProps) {
  const [copied, setCopied] = useState(false);
  const [showPoster, setShowPoster] = useState(false);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the text
      const input = document.createElement("input");
      input.value = currentUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [currentUrl]);

  return (
    <div>
      {/* 分享按鈕區域 */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-gray-700">
          {buttonText}：
        </span>

        {/* 複製鏈接 */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {copied ? (
            <>
              <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已複製
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              複製鏈接
            </>
          )}
        </button>

        {/* 生成海報 */}
        <button
          onClick={() => setShowPoster(!showPoster)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-[#0A2463] text-white hover:bg-[#0D3078] transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {showPoster ? "隱藏海報" : "生成海報"}
        </button>
      </div>

      {/* 海報卡片 */}
      {showPoster && (
        <div className="mt-4">
          <p className="text-xs text-gray-400 mb-2">
            長按或截圖保存下方海報，即可分享至微信、朋友圈等平台
          </p>
          <div
            className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200"
            style={{ backgroundColor: "#0A2463" }}
          >
            {/* 封面圖 */}
            {coverImage && (
              <div className="relative w-full h-48">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, #0A2463, transparent 60%)",
                  }}
                />
              </div>
            )}

            {/* 內容區域 */}
            <div
              className={`px-5 py-5 ${!coverImage ? "pt-6" : ""}`}
              style={{ backgroundColor: coverImage ? "transparent" : "#0A2463" }}
            >
              {/* 網站名稱 */}
              <p className="text-xs text-[#3E92CC] font-medium tracking-wider uppercase mb-3">
                {siteName}
              </p>

              {/* 標題 */}
              <h3 className="text-lg font-bold text-white leading-snug mb-3 line-clamp-3">
                {title}
              </h3>

              {/* 摘要 */}
              {showSummary && summary && (
                <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-2">
                  {summary}
                </p>
              )}

              {/* 底部 */}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#3E92CC] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <span className="text-xs text-gray-300">CASIL</span>
                </div>
                <span className="text-xs text-gray-400">
                  掃碼查看詳情
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
