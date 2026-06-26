/**
 * 模塊8：底部文字卡片
 *
 * 深藍底色（#001433）+ 雙層光暈 + 網格紋理，居中白色文字 + 按鈕。
 * 無動畫，靜態渲染。
 */

const CARD_BG = "#001433";
const WHITE = "#FFFFFF";

export default function OverviewBanner({
  text,
  buttonText,
  buttonHref,
}: {
  text: string;
  buttonText: string;
  buttonHref: string;
}) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 48px" }}>
      <div
        style={{
          position: "relative",
          backgroundColor: CARD_BG,
          borderRadius: 12,
          padding: 48,
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* 外層大光暈 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(0,58,140,0.5) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* 內層小光暈 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            height: 350,
            background:
              "radial-gradient(circle, rgba(21,101,192,0.35) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* 網格紋理疊層 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />

        {/* 正文 */}
        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: 20,
            color: "rgba(255, 255, 255, 0.85)",
            lineHeight: 2.0,
            margin: "0 0 28px",
            letterSpacing: "0.04em",
            textAlign: "justify",
          }}
        >
          {text}
        </p>

        {/* 按鈕 */}
        <a
          href={buttonHref}
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: WHITE,
            fontSize: 14,
            fontWeight: 500,
            padding: "10px 28px",
            borderRadius: 24,
            border: `1px solid rgba(255, 255, 255, 0.5)`,
            textDecoration: "none",
            letterSpacing: "0.04em",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "rgba(255, 255, 255, 0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {buttonText}
          {/* 箭頭 */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M5 2L10 7L5 12"
              stroke={WHITE}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
