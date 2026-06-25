/**
 * 模塊1：頁首標題區
 *
 * 麵包屑 → 英文大寫標籤 → 大標題 → 說明文字 → 三欄數據統計 → 分割線
 * 淺色背景，無動畫，靜態渲染。
 *
 * stats 已由上層依語言解析為 { value, label }。
 */
export default function OverviewHeader({
  breadcrumb,
  enLabel,
  title,
  description,
  stats,
}: {
  breadcrumb: string;
  enLabel: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <section
      style={{ backgroundColor: "#FFFFFF", padding: "48px 0 40px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {/* 麵包屑 */}
        <p
          style={{
            fontSize: 12,
            color: "#888E9C",
            margin: "0 0 12px",
            letterSpacing: "0.02em",
          }}
        >
          {breadcrumb.split(" > ").map((part, i, arr) => (
            <span key={i}>
              {i > 0 && (
                <span style={{ margin: "0 6px", color: "#888E9C" }}>
                  &gt;
                </span>
              )}
              <span
                style={{
                  color: i === arr.length - 1 ? "#0F2452" : "#888E9C",
                }}
              >
                {part}
              </span>
            </span>
          ))}
        </p>

        {/* 英文大寫標籤 */}
        <p
          style={{
            fontSize: 11,
            color: "rgba(15, 36, 82, 0.4)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          {enLabel}
        </p>

        {/* 大標題 */}
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#0A1429",
            margin: "0 0 16px",
            letterSpacing: "0.04em",
          }}
        >
          {title}
        </h1>

        {/* 藍色短分割線 */}
        <div
          style={{
            width: 60,
            height: 3,
            backgroundColor: "#0F2452",
            marginBottom: 16,
          }}
        />

        {/* 說明文字 */}
        <p
          style={{
            fontSize: 14,
            color: "#444A58",
            margin: "0 0 36px",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        {/* 三欄數據統計 */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginBottom: 40,
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#0A1429",
                  margin: "0 0 4px",
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#888E9C",
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* 分割線 */}
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#E9EEF7",
          }}
        />
      </div>
    </section>
  );
}
