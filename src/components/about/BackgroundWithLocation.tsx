"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useI18n } from "@/components/data/I18nProvider";
import ContentSection from "@/components/shared/ContentSection";

export default function BackgroundWithLocation({
  lang,
  title,
  content,
  backHref,
}: {
  lang: string;
  title: string;
  content: string;
  backHref: string;
}) {
  const { t } = useI18n();
  const [showLocation, setShowLocation] = useState(false);
  const scrollLock = useRef(false);

  const goBack = useCallback(() => {
    setShowLocation(false);
  }, []);

  const base = `/${lang}`;

  const navItems = [
    {
      label: t("nav_about"),
      items: [
        { label: t("nav_bg"), href: `${base}/about/background` },
        { label: t("nav_culture"), href: `${base}/about/culture` },
        { label: t("nav_goal"), href: `${base}/about/goals` },
        { label: t("nav_board"), href: `${base}/about/board` },
        { label: t("nav_gov"), href: `${base}/about/governance` },
      ],
    },
    {
      label: t("nav_industry"),
      items: [
        { label: t("nav_subsidiary"), href: `${base}/business/subsidiaries` },
        { label: t("nav_products"), href: `${base}/business/products` },
        { label: t("nav_lab"), href: `${base}/business/lab` },
        { label: t("nav_global"), href: `${base}/business/global` },
      ],
    },
    {
      label: t("nav_consult"),
      items: [
        { label: t("nav_announce"), href: `${base}/news` },
        { label: t("nav_anno"), href: `${base}/news/anno` },
        { label: t("nav_company"), href: `${base}/company-news` },
        { label: t("nav_comm"), href: `${base}/shareholder` },
      ],
    },
  ];

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (scrollLock.current) return;
      if (e.deltaY > 50 && !showLocation) {
        // Check if user has scrolled to near bottom of content
        const scrollBottom = window.innerHeight + window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        if (docHeight - scrollBottom < 100) {
          scrollLock.current = true;
          setShowLocation(true);
          setTimeout(() => { scrollLock.current = false; }, 800);
        }
      } else if (e.deltaY < -50 && showLocation) {
        scrollLock.current = true;
        setShowLocation(false);
        setTimeout(() => { scrollLock.current = false; }, 800);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [showLocation]);

  return (
    <div>
      {/* Content wrap — slides up when location is shown */}
      <div
        className="transition-transform duration-[0.8s] ease-in-out"
        style={{ transform: showLocation ? "translateY(-100vh)" : "translateY(0)" }}
      >
        <ContentSection title={title} content={content} bodyFontSize={18} />
      </div>

      {/* Location / Map Section */}
      <div
        className="fixed inset-0 z-[60] transition-opacity duration-[0.6s] ease-in-out"
        style={{
          opacity: showLocation ? 1 : 0,
          pointerEvents: showLocation ? "auto" : "none",
        }}
      >
        <div className="w-full h-full bg-white relative">
          {/* Glass header bar — matches main Header */}
          <div
            className="fixed top-0 left-0 right-0 z-[65] glass shadow-[0_1px_0_rgba(0,0,0,0.06)] transition-all duration-500"
            style={{
              opacity: showLocation ? 1 : 0,
              transform: showLocation ? "translateY(0)" : "translateY(-10px)",
              transitionDelay: showLocation ? "0.15s" : "0s",
            }}
          >
            <div className="max-w-6xl mx-auto flex items-center justify-between h-12 px-5">
              {/* Logo */}
              <button onClick={goBack} className="flex-shrink-0 cursor-pointer">
                <img
                  src="/images/casil-logo.png"
                  alt="CASIL"
                  className="h-20 w-auto"
                />
              </button>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((group) => (
                  <span
                    key={group.label}
                    className="text-sm text-text-secondary"
                  >
                    {group.label}
                  </span>
                ))}
                <a
                  href="http://www.casil-group.com:8080/investor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t("nav_investor")}
                </a>
                <a
                  href={`${base}/links`}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t("nav_link")}
                </a>
              </nav>

              {/* Back button */}
              <button
                onClick={goBack}
                className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand transition-colors group cursor-pointer"
              >
                <svg
                  width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="group-hover:-translate-x-0.5 transition-transform"
                >
                  <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {lang === "zh" ? "返回" : "Back"}
              </button>
            </div>
          </div>

          {/* Spacer to offset the header */}
          <div className="h-20" />

          <div className="w-full flex-1 flex items-center justify-center" style={{ height: "calc(100% - 80px)" }}>
            <div className="w-full max-w-6xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left: contact info */}
              <div className="flex-shrink-0">
                <h2
                  className="text-[32px] font-bold text-black mb-8 transition-all duration-500"
                  style={{
                    opacity: showLocation ? 1 : 0,
                    transform: showLocation ? "translateY(0)" : "translateY(-20px)",
                    transitionDelay: showLocation ? "0.3s" : "0s",
                  }}
                >
                  {lang === "zh" ? "地理位置" : "Location"}
                </h2>
                <p
                  className="text-[18px] md:text-[22px] text-black leading-[2.2] max-w-xl transition-all duration-500"
                  style={{
                    opacity: showLocation ? 1 : 0,
                    transform: showLocation ? "translateY(0)" : "translateY(-20px)",
                    transitionDelay: showLocation ? "0.55s" : "0s",
                  }}
                >
                  {lang === "zh"
                    ? "地址：香港九龍紅磡德豐街十八號海濱廣場一座11字樓1103-1107A室"
                    : "Address: Room 1103-1107A, 11/F, Tower 1, Harbourfront Plaza, 18 Tak Fung Street, Hung Hom, Kowloon, Hong Kong"}
                </p>
                <p
                  className="text-[18px] md:text-[22px] text-black leading-[2.2] transition-all duration-500"
                  style={{
                    opacity: showLocation ? 1 : 0,
                    transform: showLocation ? "translateY(0)" : "translateY(-20px)",
                    transitionDelay: showLocation ? "0.8s" : "0s",
                  }}
                >
                  {lang === "zh"
                    ? "電話：( 852 ) 2193 8888  傳真：( 852 ) 2193 8899"
                    : "Tel: (852) 2193 8888  Fax: (852) 2193 8899"}
                </p>
                <p
                  className="text-[18px] md:text-[22px] text-black leading-[2.2] transition-all duration-500"
                  style={{
                    opacity: showLocation ? 1 : 0,
                    transform: showLocation ? "translateY(0)" : "translateY(-20px)",
                    transitionDelay: showLocation ? "1.05s" : "0s",
                  }}
                >
                  {lang === "zh"
                    ? "電郵：public@casil-group.com"
                    : "Email: public@casil-group.com"}
                </p>
              </div>

              {/* Right: map image */}
              <div
                className="w-[300px] md:w-[420px] h-[300px] md:h-[420px] flex-shrink-0 transition-all duration-500"
                style={{
                  opacity: showLocation ? 1 : 0,
                  transform: showLocation ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: showLocation ? "1.3s" : "0s",
                }}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://api.map.baidu.com/marker?location=22.302271,114.191669&title=中國航天國際控股有限公司&content=香港九龍紅磡德豐街十八號海濱廣場&output=html&coord_type=wgs84"
                >
                  <img
                    src="/images/location.png"
                    alt="Map"
                    className="w-full h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
