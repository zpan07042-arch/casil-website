"use client";

import { motion } from "framer-motion";

/* ──────────── 配色 ──────────── */
const BRAND_BLUE = "#0F2452";
const ACCENT_BLUE = "#E6EEFB";
const TITLE_COLOR = "#0A1429";
const BODY_COLOR = "#444A58";
const HELPER_COLOR = "#888E9C";
const CARD_BG = "#FFFFFF";
const PAGE_BG = "#F8FAFE";
const DIVIDER = "#E9EEF7";

/* ──────────── 地理位置數據 ──────────── */
interface LocationData {
  id: string;
  nameZh: string;
  nameEn: string;
  type: "headquarters" | "base";
  addressZh: string;
  addressEn: string;
  telZh?: string;
  telEn?: string;
  faxZh?: string;
  faxEn?: string;
  email?: string;
  mapUrl?: string;
}

const LOCATIONS: LocationData[] = [
  {
    id: "hk-hq",
    nameZh: "香港總部",
    nameEn: "Hong Kong Headquarters",
    type: "headquarters",
    addressZh: "香港九龍紅磡德豐街十八號海濱廣場一座11字樓1103-1107A室",
    addressEn:
      "Room 1103-1107A, 11/F, Tower 1, Harbourfront Plaza, 18 Tak Fung Street, Hung Hom, Kowloon, Hong Kong",
    telZh: "( 852 ) 2193 8888",
    telEn: "(852) 2193 8888",
    faxZh: "( 852 ) 2193 8899",
    faxEn: "(852) 2193 8899",
    email: "public@casil-group.com",
    mapUrl:
      "https://map.baidu.com/poi/中国航天国际控股有限公司/@12713179.251287216,2533430.9058669005,13.29z?uid=c7168b4709219f8eaf04570e&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&en_uid=c7168b4709219f8eaf04570e&pcevaname=pc4.1&querytype=detailConInfo&da_src=shareurl",
  },
  {
    id: "shenzhen",
    nameZh: "深圳生產基地",
    nameEn: "Shenzhen Production Base",
    type: "base",
    addressZh: "廣東省深圳市寶安區",
    addressEn: "Bao'an District, Shenzhen, Guangdong Province",
  },
  {
    id: "dongguan",
    nameZh: "東莞生產基地",
    nameEn: "Dongguan Production Base",
    type: "base",
    addressZh: "廣東省東莞市",
    addressEn: "Dongguan City, Guangdong Province",
  },
  {
    id: "huizhou",
    nameZh: "惠州生產基地",
    nameEn: "Huizhou Production Base",
    type: "base",
    addressZh: "廣東省惠州市仲愷高新技術產業開發區",
    addressEn:
      "Zhongkai High-tech Industrial Development Zone, Huizhou City, Guangdong Province",
  },
  {
    id: "nantong",
    nameZh: "南通生產基地",
    nameEn: "Nantong Production Base",
    type: "base",
    addressZh: "江蘇省南通市",
    addressEn: "Nantong City, Jiangsu Province",
  },
  {
    id: "hangzhou",
    nameZh: "杭州辦事處",
    nameEn: "Hangzhou Office",
    type: "base",
    addressZh: "浙江省杭州市",
    addressEn: "Hangzhou City, Zhejiang Province",
  },
];

/* ──────────── 卡片本體 ──────────── */
function LocationCard({
  loc,
  lang,
  index,
}: {
  loc: LocationData;
  lang: string;
  index: number;
}) {
  const isHQ = loc.type === "headquarters";
  const name = lang === "zh" ? loc.nameZh : loc.nameEn;
  const address = lang === "zh" ? loc.addressZh : loc.addressEn;
  const tel = lang === "zh" ? loc.telZh : loc.telEn;
  const fax = lang === "zh" ? loc.faxZh : loc.faxEn;

  return (
    <>
      <style>
        {`
          .loc-card-${loc.id}:hover {
            transform: translateY(-2px);
            box-shadow:
              0 2px 6px rgba(15, 36, 82, 0.08),
              0 8px 24px rgba(15, 36, 82, 0.10),
              0 16px 40px rgba(15, 36, 82, 0.07);
          }
          .loc-card-${loc.id}:hover .loc-map-img-${loc.id} {
            transform: scale(1.05);
          }
        `}
      </style>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index, duration: 0.5, ease: "easeOut" }}
        className={`loc-card-${loc.id}`}
        style={{
          backgroundColor: CARD_BG,
          borderRadius: 12,
          border: `1px solid ${DIVIDER}`,
          padding: 32,
          boxShadow: `
            0 1px 3px rgba(15, 36, 82, 0.06),
            0 4px 16px rgba(15, 36, 82, 0.07),
            0 8px 32px rgba(15, 36, 82, 0.05)
          `,
          transition: "transform 0.35s ease, box-shadow 0.35s ease",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        {/* ── 左側：資訊區 ── */}
        <div style={{ flex: "6 1 320px", minWidth: 0 }}>
          {/* 標題行 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: TITLE_COLOR,
                margin: 0,
              }}
            >
              {name}
            </h2>
            <span
              style={{
                display: "inline-block",
                fontSize: 13,
                fontWeight: 500,
                color: BRAND_BLUE,
                backgroundColor: ACCENT_BLUE,
                borderRadius: 15,
                padding: "2px 14px",
              }}
            >
              {isHQ
                ? lang === "zh"
                  ? "總部"
                  : "HQ"
                : lang === "zh"
                  ? "生產基地"
                  : "Production Base"}
            </span>
          </div>

          {/* 分隔線 */}
          <div
            style={{
              width: "100%",
              height: 1,
              backgroundColor: DIVIDER,
              marginBottom: 20,
            }}
          />

          {/* 地址 */}
          <InfoRow
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.8a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z"
                  fill={BRAND_BLUE}
                />
              </svg>
            }
            label={lang === "zh" ? "地址" : "Address"}
            value={address}
          />

          {/* 電話（僅總部顯示） */}
          {tel && (
            <InfoRow
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a11.57 11.57 0 0 0 3.598 5.585 11.57 11.57 0 0 0 5.585 3.598c.601.21 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.332-1.553a.678.678 0 0 0-.787.092l-.828.828a9.7 9.7 0 0 1-3.37-2.218 9.7 9.7 0 0 1-2.218-3.37l.828-.828a.678.678 0 0 0 .092-.787L3.654 1.328z"
                    fill={BRAND_BLUE}
                  />
                </svg>
              }
              label={lang === "zh" ? "電話" : "Tel"}
              value={tel}
            />
          )}

          {/* 傳真（僅總部顯示） */}
          {fax && (
            <InfoRow
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9z"
                    stroke={BRAND_BLUE}
                    strokeWidth="1.2"
                  />
                  <path
                    d="M5 5h6M5 8h6M5 11h4"
                    stroke={BRAND_BLUE}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              }
              label={lang === "zh" ? "傳真" : "Fax"}
              value={fax}
            />
          )}

          {/* 電郵（僅總部顯示） */}
          {loc.email && (
            <InfoRow
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9z"
                    stroke={BRAND_BLUE}
                    strokeWidth="1.2"
                  />
                  <path
                    d="M2 4l5.12 3.84a1 1 0 0 0 1.12 0L14 4"
                    stroke={BRAND_BLUE}
                    strokeWidth="1.2"
                  />
                </svg>
              }
              label={lang === "zh" ? "電郵" : "Email"}
              value={loc.email}
            />
          )}
        </div>

        {/* ── 右側：地圖區 ── */}
        {loc.mapUrl && (
          <div
            style={{
              flex: "4 1 260px",
              minWidth: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a
              href={loc.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                maxWidth: 380,
                borderRadius: 8,
                overflow: "hidden",
                border: `1px solid ${DIVIDER}`,
                cursor: "pointer",
              }}
            >
              <img
                className={`loc-map-img-${loc.id}`}
                src="/images/location.png"
                alt={name}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
              />
            </a>
          </div>
        )}

        {/* 生產基地地圖佔位 */}
        {!loc.mapUrl && (
          <div
            style={{
              flex: "4 1 260px",
              minWidth: 240,
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              border: `2px dashed ${ACCENT_BLUE}`,
              backgroundColor: PAGE_BG,
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: HELPER_COLOR,
                fontSize: 14,
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                style={{ margin: "0 auto 8px", opacity: 0.4 }}
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"
                  fill={HELPER_COLOR}
                />
              </svg>
              <div>
                {lang === "zh" ? "查看地圖" : "View Map"}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

/* ──────────── 資訊行 ──────────── */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 16,
          height: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {icon}
      </span>
      <div style={{ minWidth: 0 }}>
        <span
          style={{
            fontSize: 12,
            color: HELPER_COLOR,
            marginRight: 8,
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: 18,
            color: BODY_COLOR,
            lineHeight: 1.6,
            wordBreak: "break-word",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

/* ──────────── 頁面容器 ──────────── */
export default function LocationCards({ lang }: { lang: string }) {
  return (
    <section
      style={{
        backgroundColor: PAGE_BG,
        paddingTop: 48,
        paddingBottom: 80,
      }}
    >
      <div className="px-5 md:px-8">
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {LOCATIONS.map((loc, i) => (
            <LocationCard key={loc.id} loc={loc} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
