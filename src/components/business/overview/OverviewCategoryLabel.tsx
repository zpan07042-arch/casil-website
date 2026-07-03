/**
 * 模塊2 & 模塊6：大分類標籤條
 *
 * 深藍圓角方塊（A/B字母） + 分類中文名 + 大寫英文副標 + 下方分割線
 */

const TITLE_COLOR = "#0A1429";
const HELPER_COLOR = "#888E9C";
const DIVIDER_COLOR = "#E9EEF7";

export default function OverviewCategoryLabel({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
      {/* 分隔上方間距 */}
      <div style={{ paddingTop: 48, paddingBottom: 24 }}>
        <div style={{ marginBottom: 20 }}>

          {/* 英文副標在上 + 中文標題在下 */}
          <div>
            <span
              style={{
                display: "block",
                fontSize: 11,
                color: HELPER_COLOR,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: 4,
              }}
            >
              {subtitle}
            </span>

            <span
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: TITLE_COLOR,
              }}
            >
              {title}
            </span>
          </div>
        </div>

        {/* 分割線 */}
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: DIVIDER_COLOR,
          }}
        />
      </div>
    </div>
  );
}
