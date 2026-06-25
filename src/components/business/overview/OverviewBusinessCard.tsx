import type { OverviewCardData } from "./overviewData";

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

export default function OverviewBusinessCard({
  lang,
  cardData,
}: {
  lang: string;
  cardData: OverviewCardData;
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

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 24px" }}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          border: `1px solid ${ACCENT_BLUE}`,
          padding: 32,
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
                fontSize: 18,
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
                fontSize: 12,
                color: BRAND_BLUE,
                backgroundColor: ACCENT_BLUE,
                padding: "2px 12px",
                borderRadius: 20,
                marginLeft: 8,
                whiteSpace: "nowrap",
              }}
            >
              {subTitle}
            </span>
          </div>

          {/* 右：了解更多按鈕 */}
          <a
            href={cardData.learnMoreHref}
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
              style={{ flexShrink: 0 }}
            >
              <path
                d="M1 11L11 1M11 1H3.5M11 1V8.5"
                stroke={BRAND_BLUE}
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
                fontSize: 13,
                color: BODY_COLOR,
                lineHeight: 1.6,
                margin: "0 0 20px",
                textAlign: "justify",
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
                    style={{
                      border: `2px dashed ${ACCENT_BLUE}`,
                      borderRadius: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                      padding: 16,
                      aspectRatio: "1 / 1",
                    }}
                  >
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
                  </div>
                ))}
              </div>
            ) : (
              /* 單格豎長框 */
              <div
                style={{
                  border: `2px dashed ${ACCENT_BLUE}`,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: 28,
                  minHeight: 240,
                }}
              >
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
