import type { OverviewCardData } from "./overviewData";
import type { LinkItem } from "@/lib/types";

/**
 * 模塊3-5 & 模塊7：業務卡片
 *
 * 白底淺藍邊框卡片。標題行左右分佈（左：主標題+副標題，右：了解更多按鈕），
 * 下方左 60% 正文區 + 右 40% 產品圖占位框。
 * 無動畫，靜態渲染。
 */

/* ──────────── 設計令牌 ──────────── */
const BRAND_BLUE = "#0F2452";
const ACCENT_BLUE = "#E6EEFB";
const BODY_COLOR = "#444A58";
const TITLE_COLOR = "#0A1429";
const HELPER_COLOR = "#888E9C";

/**
 * 根據業務卡片主標題匹配對應的友情鏈接 URL。
 * 遍歷 links，若 link.name_zh 與 mainTitle 有共同的關鍵字片段則返回其 url。
 */
function findLinkUrlForCard(mainTitle: string, links: LinkItem[]): string | null {
  // 提取 mainTitle 中所有 2-3 字片段，在 link.name_zh 中查找匹配
  const parts: string[] = [];
  for (let i = 0; i < mainTitle.length - 1; i++) {
    parts.push(mainTitle.substring(i, i + 2));
  }
  for (let i = 0; i < mainTitle.length - 2; i++) {
    parts.push(mainTitle.substring(i, i + 3));
  }
  // 按片段長度降序，優先匹配較長的關鍵字
  parts.sort((a, b) => b.length - a.length);
  for (const part of parts) {
    const found = links.find((l) => l.name_zh.includes(part) && l.url);
    if (found) return found.url;
  }
  return null;
}

/** 根據 subTitle 關鍵字匹配對應的錨點 ID，用於 Header 下拉框跳轉 */
function getCardAnchorId(subTitle: string): string | undefined {
  const map: [string, string][] = [
    ["康源", "card-pcb"],
    ["半導體", "card-display"],
    ["半导体", "card-display"],
    ["志豪", "card-ipm"],
    ["志順", "card-power"],
    ["志顺", "card-power"],
    ["志源", "card-injection"],
  ];
  for (const [kw, id] of map) {
    if (subTitle.includes(kw)) return id;
  }
  return undefined;
}

export default function OverviewBusinessCard({
  lang,
  cardData,
  links,
}: {
  lang: string;
  cardData: OverviewCardData;
  links: LinkItem[];
}) {
  const {
    mainTitle,
    subTitle,
    enName,
    body,
    clients,
    productPlaceholders,
    imageLayout,
  } = cardData;
  const isZh = lang === "zh";

  const bodyText = isZh ? body.zh : body.en;
  const learnMoreText = isZh ? "了解更多" : "Learn More";
  const isGrid = imageLayout === "grid";
  const isAeroHighTech = mainTitle === "航天高科";

  // 優先使用友情鏈接 URL，若無匹配則使用卡片自身的 learnMoreHref
  const matchedLinkUrl = findLinkUrlForCard(mainTitle, links);
  const learnMoreHref = matchedLinkUrl || cardData.learnMoreHref;

  return (
    <>
      {/* ═══ 交互式 hover 樣式 ═══ */}
      <style>{`
        /* ── 卡片容器 hover：輕微浮起 + 加深陰影 ── */
        .biz-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .biz-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 2px 6px rgba(15, 36, 82, 0.08),
            0 8px 24px rgba(15, 36, 82, 0.10),
            0 16px 40px rgba(15, 36, 82, 0.07) !important;
        }

        /* ── 圖片單元格 hover：輕微放大 + 浮起陰影 ── */
        .biz-card-img-cell {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .biz-card-img-cell:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(15, 36, 82, 0.18);
        }

        /* ── 了解更多按鈕 hover：品牌藍填充 + 白色文字 + 箭頭右移 ── */
        .biz-card-link {
          transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }
        .biz-card-link:hover {
          background-color: #0F2452;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(15, 36, 82, 0.2);
        }
        .biz-card-link:hover .biz-card-arrow {
          stroke: #FFFFFF;
          transform: translateX(2px);
        }
        .biz-card-arrow {
          transition: stroke 0.25s ease, transform 0.25s ease;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 24px" }}>
      <div
        id={getCardAnchorId(subTitle)}
        className="biz-card"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          scrollMarginTop: 60,
          border: `1px solid ${ACCENT_BLUE}`,
          padding: 32,
          boxShadow:
            "0 1px 3px rgba(15, 36, 82, 0.06), 0 4px 16px rgba(15, 36, 82, 0.07), 0 8px 32px rgba(15, 36, 82, 0.05)",
        }}
      >
        {/* ═══ 標題行：左側主副標題 + 右側按鈕 ═══ */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 8,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {/* 左：標題區 */}
          <div>
            <h2
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: TITLE_COLOR,
                margin: 0,
                display: "inline",
              }}
            >
              {mainTitle}
            </h2>
            <span
              style={{
                fontSize: 15,
                color: BRAND_BLUE,
                backgroundColor: ACCENT_BLUE,
                padding: "2px 12px",
                borderRadius: 15,
                marginLeft: 8,
                whiteSpace: "nowrap",
              }}
            >
              {subTitle}
            </span>
          </div>

          {/* 右：了解更多按鈕 */}
          <a
            href={learnMoreHref}
            target={matchedLinkUrl ? "_blank" : undefined}
            rel={matchedLinkUrl ? "noopener noreferrer" : undefined}
            className="biz-card-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: ACCENT_BLUE,
              color: BRAND_BLUE,
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 18px",
              borderRadius: 6,
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {learnMoreText}
            {/* 外部連結小箭頭 */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="biz-card-arrow"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M1 11L11 1M11 1H3.5M11 1V8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* 英文名稱 */}
        <p
          style={{
            fontSize: 11,
            color: HELPER_COLOR,
            margin: "0 0 16px",
            letterSpacing: "0.06em",
          }}
        >
          {enName}
        </p>

        {/* 長分割線 */}
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#E9EEF7",
            marginBottom: 20,
          }}
        />

        {/* ═══ 下方：左 60% 正文 + 右 40% 產品圖 ═══ */}
        <div
          style={{
            display: "flex",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          {/* ── 左側：正文 + 客戶標籤（60%）── */}
          <div style={{ flex: "6 1 360px", minWidth: 0 }}>
            <p
              style={{
                fontSize: 15,
                color: BODY_COLOR,
                lineHeight: 1.6,
                margin: "0 0 20px",
                textAlign: "justify",
                textIndent: "2em",
              }}
            >
              {bodyText}
            </p>

            {/* 客戶標籤 */}
            {clients.length > 0 && (
              <>
                <p
                  style={{
                    fontSize: 12,
                    color: HELPER_COLOR,
                    margin: "0 0 10px",
                  }}
                >
                  {isZh ? "代表客戶" : "Representative Clients"}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 0,
                  }}
                >
                {clients.map((client) => (
                  <span
                    key={client}
                    style={{
                      display: "inline-block",
                      padding: "4px 14px",
                      fontSize: 12,
                      color: BODY_COLOR,
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${ACCENT_BLUE}`,
                      borderRadius: 20,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {client}
                  </span>
                ))}
              </div>
              </>
            )}
          </div>

          {/* ── 右側：產品圖占位框（40%）── */}
          <div
            style={{
              flex: "4 1 280px",
              minWidth: 260,
            }}
          >
            {isGrid ? (
              /* 2×2 網格 */
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {productPlaceholders.map((ph, i) => (
                  <div
                    key={i}
                    className={ph.imagePath ? "biz-card-img-cell" : undefined}
                    style={{
                      borderRadius: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      aspectRatio: isAeroHighTech ? "3 / 2" : "1 / 1",
                      overflow: "hidden",
                      ...(ph.imagePath
                        ? {}
                        : {
                            border: `2px dashed ${ACCENT_BLUE}`,
                            padding: 16,
                            gap: 4,
                          }),
                    }}
                  >
                    {ph.imagePath ? (
                      <img
                        src={ph.imagePath}
                        alt={isZh ? ph.labelZh : ph.labelEn}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <>
                        {/* 灰色圖片圖標 */}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            stroke="#C4C9D4"
                            strokeWidth="1.5"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" fill="#C4C9D4" />
                          <path
                            d="M3 16L8 11L12 15L16 9L21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V16Z"
                            fill="#C4C9D4"
                          />
                        </svg>
                        <span
                          style={{
                            fontSize: 10,
                            color: HELPER_COLOR,
                          }}
                        >
                          {isZh ? ph.labelZh : ph.labelEn}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* 單格豎長框 */
              <div
                className={
                  productPlaceholders[0]?.imagePath
                    ? "biz-card-img-cell"
                    : undefined
                }
                style={{
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: isAeroHighTech ? 240 : 240,
                  overflow: "hidden",
                  ...(isAeroHighTech ? { maxHeight: 400, alignSelf: "flex-start" } : {}),
                  ...(productPlaceholders[0]?.imagePath
                    ? {}
                    : {
                        border: `2px dashed ${ACCENT_BLUE}`,
                        padding: 28,
                        gap: 6,
                      }),
                }}
              >
                {productPlaceholders[0]?.imagePath ? (
                  <img
                    src={productPlaceholders[0].imagePath}
                    alt={
                      isZh
                        ? productPlaceholders[0]?.labelZh
                        : productPlaceholders[0]?.labelEn
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <>
                    {/* 灰色圖片圖標 */}
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="#C4C9D4"
                        strokeWidth="1.5"
                      />
                      <circle cx="8.5" cy="8.5" r="1.5" fill="#C4C9D4" />
                      <path
                        d="M3 16L8 11L12 15L16 9L21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V16Z"
                        fill="#C4C9D4"
                      />
                    </svg>
                    <span
                      style={{
                        fontSize: 11,
                        color: HELPER_COLOR,
                      }}
                    >
                      {isZh
                        ? productPlaceholders[0]?.labelZh
                        : productPlaceholders[0]?.labelEn}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
