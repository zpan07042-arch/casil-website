/**
 * CultureSection — 企業文化正文區塊
 *
 * 設計：居中豎向長文本卡片
 * - 大圓角矩形，淺灰底色，細邊框，柔和下沉陰影
 * - 左上角裝飾圓形漸變
 * - 卡片下半部分疊加火箭發射背景圖 qback.png
 * - 正文使用 15px，黑色文字，統一左對齊
 * - 副标题使用 30px，加粗突出，层級分明
 * - 航天國企官網簡約商務 UI，乾淨低飽和視覺
 */

const CULTURE_CONTENT_ZH = [
  {
    type: "paragraph",
    text: " 「愛國、創新、誠信、和諧、盡責」為本公司企業文化的核心，為本公司企業使命和業務發展原則，也是員工作為日常業務運作和作業方向的核心價值：",
  },
  {
    type: "section",
    title: "愛國",
    text: "愛國、愛港、愛航天、愛企業",
  },
  {
    type: "section",
    title: "創新",
    text: "堅持新發展理念，以創新驅動發展",
  },
  {
    type: "section",
    title: "誠信",
    text: "恪守誠信，以廉潔及公平為原則，依法守法\n堅持合作共贏，善待各持份者",
  },
  {
    type: "section",
    title: "和諧",
    text: "以德治企，堅持團結共事，和諧共享",
  },
  {
    type: "section",
    title: "盡責",
    text: "敬崗位、負責任",
  },
  {
    type: "section",
    title: "使命",
    text: "為客戶、股東、員工及社會創造持久的價值和效益。",
  },
  {
    type: "section",
    title: "願景",
    text: "本公司致力推動技術創新和專業化製造，專注以高品質和高效率為供應鏈及產業鏈服務，聚焦先進裝備及現代服務業作為核心能力，成為面向未來、具有關鍵創新能力和持續為客戶創造價值的國際化企業，為客戶提供專業、高效、安全和環保的產品和服務。",
  },
  {
    type: "section",
    title: "綜述企業文化的政策及守則",
    text: "本公司以穩健的營運經營及管理策略，以確保本公司之業務能在持續穩健經營，為社會經濟作出貢獻。本公司的政策及所訂目的基於企業價值觀融入日常業務運作和作業方式中，並制定了《員工合規經營行為守則》，清晰向員工傳達所需的合規經營底線，確保公司以高道德水平及專業操守營運；並透過《反貪污政策》和《舉報政策》，推廣廉潔守正和負責任的經營團隊。",
  },
  {
    type: "paragraph",
    text: "本公司設有企業文化部，負責定期舉辦內部配套企業價值觀宣導的活動和講座，凝聚員工對公司的歸屬感，搭建分享交流的平台，以傳遞愛國、創新，以及誠信、和諧、盡責的標準。本公司取多條溝通渠道，並以骨幹員工為表率，根據績效評估檢視企業文化的貫徹性，同時，要求高層領導及管理人員在日常工作中積極實踐企業價值觀及具體做好榜樣，為屬下員工樹立榜樣。",
  },
  {
    type: "section",
    title: "企業文化與發展策略",
    text: "本公司制定了長遠的規劃願景，並持續評估本公司面對的潛在風險與挑戰。透過本公司企業文化的核心：「愛國、創新、誠信、和諧、盡責」，持續提升本公司員工的道德操守、完善公司管治制度、防範公司合規經營風險，為員工本身及公司建立競爭優勢，讓公司各項業務穩定發展。",
    highlight: "「愛國、創新、誠信、和諧、盡責」",
  },
];

export default function CultureSection({
  title,
  content,
  lang,
}: {
  title: string;
  content: string;
  lang: string;
}) {
  /* ====== 繁體中文：結構化卡片 ====== */
  if (lang === "zh") {
    return (
      <section
        style={{
          padding: "48px 0 80px",
          backgroundColor: "#F8F9FA",
        }}
      >
        <div
          style={{
            maxWidth: 1130,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {/* ====== 卡片容器 ====== */}
          <div
            style={{
              position: "relative",
              width: "100%",
              background: "#F9FAFB",
              border: "1px solid rgba(46, 56, 97, 0.20)",
              borderRadius: 16,
              padding: "96px 120px 120px 120px",
              display: "flex",
              flexDirection: "column",
              gap: 56,
              overflow: "hidden",
              boxShadow:
                "0px 4px 24px rgba(26, 38, 77, 0.12), 0px 1px 6px rgba(26, 38, 77, 0.06)",
            }}
          >
            {/* ====== 左上角裝飾方形（旋轉 + 下移） ====== */}
            <div
              style={{
                position: "absolute",
                top: -100,
                left: -160,
                width: 360,
                height: 360,
                background:
                  "linear-gradient(to top right, rgba(10, 36, 99, 0.08), rgba(62, 146, 204, 0.08))",
                borderRadius: 0,
                transform: "rotate(25deg)",
                pointerEvents: "none",
              }}
            />

            {/* ====== 底部背景圖片（佔 70%） ====== */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "70%",
                zIndex: 0,
                backgroundImage: "url('/images/qback.png')",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                opacity: 0.12,
              }}
            />

            {/* ====== 正文內容 ====== */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 56,
                width: "100%",
              }}
            >
              {CULTURE_CONTENT_ZH.map((block, i) => {
                if (block.type === "section") {
                  const parts = "highlight" in block && block.highlight
                    ? block.text.split(block.highlight)
                    : null;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 30,
                          fontWeight: 700,
                          color: "#000000",
                          margin: 0,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {block.title}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#000000",
                          textAlign: "left",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {parts && block.highlight
                          ? <>
                              {parts[0]}
                              <span style={{ color: "#000000", fontWeight: 700 }}>{block.highlight}</span>
                              {parts[1]}
                            </>
                          : block.text}
                      </p>
                    </div>
                  );
                }
                // type === "paragraph"
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 24,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "#000000",
                        textAlign: "left",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {block.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ====== 英文：保留原有的數據庫驅動渲染 ====== */
  return (
    <section className="pt-12 md:pt-20 pb-20 md:pb-28">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="mb-14 md:mb-20">
          <p
            className="text-base md:text-lg text-text-secondary leading-[1.7] max-w-3xl whitespace-pre-line"
            style={{ textIndent: "2em" }}
          >
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
