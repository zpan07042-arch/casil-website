/**
 * AboutHeader — 關於我們欄目統一橫幅
 *
 * 沿用產業與業務 OverviewHeader 的視覺風格：
 * - 淺色背景 + 半透明圖片疊層 (oback.jpeg)
 * - 深色文字 (麵包屑 / 英文標籤 / 大標題 / 說明)
 * - 藍色短分割線 + 底部分割線
 * - 無動畫，靜態渲染
 *
 * 與 OverviewHeader 的差異：無 stats 三欄數據，新增 note 屬性
 */
export default function AboutHeader({
  breadcrumb,
  enLabel,
  title,
  description,
  note,
}: {
  breadcrumb?: string;
  enLabel?: string;
  title: string;
  description?: string;
  note?: string;
}) {
  return (
    <section
      style={{
        position: "relative",
        padding: "48px 0 40px",
        backgroundImage:
          "url('/images/oback.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* 麵包屑 */}
        {breadcrumb && (
          <p>
            {breadcrumb.split(" > ").map((part, i, arr) => (
              <span key={i}>
                {i > 0 && (
                  <span style={{ margin: "0 6px", color: "#ffffff" }}>
                    &gt;
                  </span>
                )}
                <span
                  style={{
                    color: i === arr.length - 1 ? "#aeb9d0" : "#ffffff",
                  }}
                >
                  {part}
                </span>
              </span>
            ))}
          </p>
        )}

        {/* 英文大寫標籤 */}
        {enLabel && (
          <p
            style={{
              fontSize: 11,
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            {enLabel}
          </p>
        )}

        {/* 大標題 */}
        <h1
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: "#f7f7f7",
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
            backgroundColor: "#e2e9f4",
            marginBottom: 16,
          }}
        />

        {/* 說明文字 + 可選備註 */}
        {(description || note) && (
          <p
            style={{
              fontSize: 18,
              color: "#f9f9f9",
              margin: "0 0 36px",
              lineHeight: 1.6,
            }}
          >
            {description}
            {note && (
              <span style={{ color: "#b6b9be", fontWeight: 500 }}>{note}</span>
            )}
          </p>
        )}

        {/* 底部分割線 */}
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
