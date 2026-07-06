import Link from "next/link";
import Image from "next/image";
import { getCompanyNewsById } from "@/lib/db";
import { getImageSrc } from "@/lib/image";
import { notFound } from "next/navigation";
import type { Lang } from "@/lib/types";
import type { Metadata } from "next";
import SharePoster from "@/components/SharePoster";
import PostViewTracker from "@/components/PostViewTracker";

// 強制動態渲染，後台修改後可即時反映
export const dynamic = "force-dynamic";

// 分類顯示名稱映射
const CATEGORY_LABELS: Record<string, { zh: string; en: string }> = {
  financial: { zh: "業績公告", en: "Financial Results" },
  cooperation: { zh: "合作動態", en: "Cooperation" },
  research: { zh: "科研資訊", en: "R&D News" },
  major: { zh: "公司重大事項", en: "Major Events" },
};

function stripHtml(html: string | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { id, lang } = await params;
  const validLang = (["zh", "en"].includes(lang) ? lang : "zh") as Lang;
  const post = await getCompanyNewsById(parseInt(id));

  if (!post) {
    return { title: "頁面未找到" };
  }

  const title =
    validLang === "zh" ? post.title_zh : post.title_en || post.title_zh;
  return { title };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { id, lang } = await params;
  const validLang = (["zh", "en"].includes(lang) ? lang : "zh") as Lang;
  const post = await getCompanyNewsById(parseInt(id));

  if (!post) {
    notFound();
  }

  const title =
    validLang === "zh" ? post.title_zh : post.title_en || post.title_zh;
  const content =
    validLang === "zh"
      ? post.content_zh || ""
      : post.content_en || post.content_zh || "";
  const categoryLabel = post.category
    ? validLang === "zh"
      ? CATEGORY_LABELS[post.category]?.zh || post.category
      : CATEGORY_LABELS[post.category]?.en || post.category
    : null;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://casil-investor.com";

  return (
    <div className="min-h-screen bg-slate-50">
      <PostViewTracker postId={post.id} />

      {/* 面包屑导航 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-2">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href={`/${validLang}`}
                className="text-slate-500 hover:text-blue-600 transition-colors"
              >
                {validLang === "zh" ? "首頁" : "Home"}
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link
                  href={`/${validLang}/news`}
                  className="ml-1 text-slate-500 hover:text-blue-600 md:ml-2 text-sm font-medium transition-colors"
                >
                  {validLang === "zh" ? "新聞資訊" : "News Center"}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1 text-slate-500 md:ml-2 text-sm font-medium">
                  {validLang === "zh" ? "詳情" : "Detail"}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <article className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            {/* 標題與元信息 */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                {post.date && (
                  <span>
                    {validLang === "zh" ? "發布日期：" : "Published: "}
                    {post.date}
                  </span>
                )}
                {categoryLabel && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {categoryLabel}
                    </span>
                  </>
                )}
              </div>

              {/* 封面圖 — 数据库无图片时使用本地占位图 */}
              <div className="mt-4 mb-6">
                <Image
                  unoptimized
                  src={post.cover_image ? getImageSrc(post.cover_image) : `/images/${((post.id - 1) % 10) + 1}.png`}
                  alt={title}
                  width={1200}
                  height={600}
                  className="w-full max-h-96 object-cover rounded-lg border border-gray-200"
                />
              </div>
            </div>

            {/* 正文內容 */}
            {content && (
              <div
                className="article-content max-w-none prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}

            {/* PDF 下载按钮 */}
            {post.pdf_url && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href={post.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {validLang === "zh" ? "下載附件 (PDF)" : "Download (PDF)"}
                </Link>
              </div>
            )}

            {/* Share Poster */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <SharePoster
                title={title}
                summary={
                  post.content_zh
                    ? stripHtml(post.content_zh).slice(0, 150)
                    : undefined
                }
                coverImage={
                  post.cover_image
                    ? getImageSrc(post.cover_image)
                    : `/images/${((post.id - 1) % 10) + 1}.png`
                }
                currentUrl={`${siteUrl}/${validLang}/news/${id}`}
                buttonText={validLang === "zh" ? "分享文章" : "Share"}
                siteName={validLang === "zh" ? "新聞動態" : "News"}
                showSummary={false}
              />
            </div>
          </div>
        </article>

        {/* 返回列表 */}
        <div className="mt-6">
          <Link
            href={`/${validLang}/news`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {validLang === "zh" ? "返回資訊列表" : "Back to News List"}
          </Link>
        </div>
      </div>
    </div>
  );
}
