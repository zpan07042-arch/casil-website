'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { useI18n } from '@/components/data/I18nProvider';
import { getImageSrc } from '@/lib/image';
import type { CompanyNews, Lang } from '@/lib/types';

// ============================================================
// Fallback data — static content
// ============================================================
const FALLBACK_ITEMS = [
  { date: '2026-05-29', dateKey: 'news_item0_date', titleKey: 'news_item0_title', coverImage: 'https://picsum.photos/seed/news0/600/400' },
  { date: '2026-05-13', dateKey: 'news_item1_date', titleKey: 'news_item1_title', coverImage: 'https://picsum.photos/seed/news1/600/400' },
  { date: '2026-04-15', dateKey: 'news_item2_date', titleKey: 'news_item2_title', coverImage: 'https://picsum.photos/seed/news2/600/400' },
  { date: '2026-04-01', dateKey: 'news_item3_date', titleKey: 'news_item3_title', coverImage: 'https://picsum.photos/seed/news3/600/400' },
  { date: '2026-01-19', dateKey: 'news_item4_date', titleKey: 'news_item4_title', coverImage: 'https://picsum.photos/seed/news4/600/400' },
  { date: '2026-01-19', dateKey: 'news_item5_date', titleKey: 'news_item5_title', coverImage: 'https://picsum.photos/seed/news5/600/400' },
  { date: '2025-11-17', dateKey: 'news_item6_date', titleKey: 'news_item6_title', coverImage: 'https://picsum.photos/seed/news6/600/400' },
  { date: '2025-09-29', dateKey: 'news_item7_date', titleKey: 'news_item7_title', coverImage: 'https://picsum.photos/seed/news7/600/400' },
  { date: '2025-02-02', dateKey: 'news_item8_date', titleKey: 'news_item8_title', coverImage: 'https://picsum.photos/seed/news8/600/400' },
  { date: '2024-01-17', dateKey: 'news_item9_date', titleKey: 'news_item9_title', coverImage: 'https://picsum.photos/seed/news9/600/400' },
];

// ============================================================
// Available years for filter (fallback)
// ============================================================
const FALLBACK_YEARS = ['2026', '2025', '2024'];

// ============================================================
// Page size for client-side pagination
// ============================================================
const PAGE_SIZE = 5;

// ============================================================
// Placeholder gradient colors for cards without cover image
// ============================================================
const CARD_COLORS = [
  'from-[#0A2463] to-[#1A4098]',
  'from-[#0D3B7A] to-[#1565C0]',
  'from-[#0F2D5E] to-[#1E88E5]',
  'from-[#0A2463] to-[#1976D2]',
  'from-[#1A3A6B] to-[#2980B9]',
  'from-[#0B2D5B] to-[#1B5FA0]',
  'from-[#123A6A] to-[#2471C5]',
  'from-[#0A3058] to-[#1D6EB8]',
  'from-[#0F2A50] to-[#1A5090]',
  'from-[#0C3360] to-[#2070B0]',
];

// ============================================================
// Types
// ============================================================
interface DisplayItem {
  id: string;
  date: string;
  title: string;
  year: string;
  coverImage?: string;
  pdfUrl?: string;
}

function extractYear(dateStr: string): string {
  const m = dateStr.match(/^(\d{4})/);
  return m ? m[1] : '';
}

function getCardColor(idx: number): string {
  return CARD_COLORS[idx % CARD_COLORS.length];
}

export default function NewsList({
  posts,
  detailUrlPrefix,
  lang,
  showCategory = false,
  availableYears = [],
}: {
  posts: CompanyNews[];
  detailUrlPrefix: string;
  lang: Lang;
  showCategory?: boolean;
  availableYears?: string[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();

  const selectedYear = searchParams.get('year');
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const hasData = posts && posts.length > 0;

  // Build display list: prefer DB data, fallback to static i18n content
  const allItems = useMemo<DisplayItem[]>(() => {
    if (hasData) {
      return posts.map((item) => ({
        id: String(item.id),
        date: item.date || '',
        title: lang === 'zh' ? item.title_zh : item.title_en || item.title_zh,
        year: item.date ? extractYear(item.date) : '',
        coverImage: item.cover_image || undefined,
        pdfUrl: item.pdf_url || undefined,
      }));
    }
    return FALLBACK_ITEMS.map((item) => ({
      id: item.titleKey,
      date: t(item.dateKey),
      title: t(item.titleKey),
      year: extractYear(item.date),
      coverImage: item.coverImage,
    }));
  }, [hasData, posts, lang, t]);

  // Years: prefer DB-derived years, fallback to static years
  const years = availableYears.length > 0 ? availableYears : FALLBACK_YEARS;

  // Filter by selected year
  const yearFilteredItems = useMemo(() => {
    if (!selectedYear) return allItems;
    return allItems.filter((item) => item.year === selectedYear);
  }, [allItems, selectedYear]);

  // Client-side pagination
  const totalItems = yearFilteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return yearFilteredItems.slice(start, start + PAGE_SIZE);
  }, [yearFilteredItems, safePage]);

  // When year filter changes, reset to page 1 (handled by not carrying page param)
  const handleYearChange = useCallback(
    (year: string) => {
      const params = new URLSearchParams();
      if (year) {
        params.set('year', year);
      }
      // Don't carry page — resets to page 1
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router]
  );

  // 处理页码变化
  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newPage <= 1) {
        params.delete('page');
      } else {
        params.set('page', newPage.toString());
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // 分页组件
  const renderPagination = () => {
    if (totalItems === 0) return null;

    return (
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          共 <span className="font-medium text-gray-700">{totalItems}</span> 条结果，
          第 <span className="font-medium text-gray-700">{safePage}</span> /{' '}
          <span className="font-medium text-gray-700">{totalPages}</span> 页
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            {/* 上一页 */}
            <button
              onClick={() => handlePageChange(safePage - 1)}
              disabled={safePage <= 1}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              上一页
            </button>

            {/* 页码 */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (safePage <= 3) {
                  pageNum = i + 1;
                } else if (safePage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = safePage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 text-sm rounded-md transition-colors ${
                      pageNum === safePage
                        ? 'bg-blue-600 text-white font-medium'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* 下一页 */}
            <button
              onClick={() => handlePageChange(safePage + 1)}
              disabled={safePage >= totalPages}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              下一页
            </button>
          </div>
        )}
      </div>
    );
  };

  if (allItems.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="text-center py-12">
          <p className="text-gray-500">暫無內容</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 年份筛选器 */}
      {years.length > 1 && (
        <div className="mb-4 flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">年份篩選:</label>
          <select
            value={selectedYear || ''}
            onChange={(e) => handleYearChange(e.target.value)}
            className="block w-32 pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md border"
          >
            <option value="">全部</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}年
              </option>
            ))}
          </select>
          {selectedYear && (
            <span className="text-sm text-gray-500">
              (已選擇: {selectedYear}年, 共 {totalItems} 條)
            </span>
          )}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {paginatedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">該年份暫無內容</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {paginatedItems.map((item) => {
              // Calculate the original index in the full filtered list for color assignment
              const originalIdx = yearFilteredItems.indexOf(item);
              return (
                <li key={item.id}>
                  <Link
                    href={`${detailUrlPrefix}/${item.id}`}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="px-4 py-4 sm:px-6 sm:py-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                        {/* 封面图 — 无图片时使用占位图 */}
                        <div className="w-full sm:w-48 sm:h-32 h-48 flex-shrink-0 overflow-hidden rounded-lg mb-4 sm:mb-0">
                          {item.coverImage ? (
                            <Image
                              unoptimized
                              src={getImageSrc(item.coverImage)}
                              alt={item.title}
                              width={192}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image
                              unoptimized
                              src={`https://picsum.photos/seed/news${originalIdx}/600/400`}
                              alt={item.title}
                              width={192}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        {/* 文字区域和箭头 */}
                        <div className="flex items-start justify-between gap-4 flex-1">
                          <div className="flex-1 flex flex-col">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                              {item.title}
                            </h3>
                            <div className="text-xs sm:text-sm text-gray-500 flex flex-wrap items-center gap-2 sm:gap-4">
                              {item.date && <span>{item.date}</span>}
                              <span className="w-px h-3 bg-gray-300 hidden sm:block"></span>
                              {showCategory && (
                                <span className="sm:inline">
                                  {(item as any).category?.name || '內容'}
                                </span>
                              )}
                              {item.pdfUrl && (
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                                  <svg
                                    className="h-4 w-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  PDF
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 箭头图标 - 移动端隐藏 */}
                          <div className="text-gray-400 hidden sm:block flex-shrink-0">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* 分页控件 */}
      {renderPagination()}
    </>
  );
}
