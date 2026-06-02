"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/data/I18nProvider";

interface NavDropdown {
  label: string;
  items: { label: string; href: string }[];
}

export default function MobileMenu({
  dropdowns,
  investorHref,
  linksHref,
}: {
  dropdowns: Record<string, NavDropdown>;
  investorHref: string;
  linksHref: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 -mr-2 text-text-primary"
        aria-label="Menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" />
          )}
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 top-12 z-40 bg-white">
          <div className="p-5 space-y-2 overflow-y-auto max-h-[calc(100vh-3rem)]">
            {Object.entries(dropdowns).map(([key, dd]) => (
              <div key={key}>
                <button
                  onClick={() => setExpanded(expanded === key ? null : key)}
                  className="w-full flex items-center justify-between py-3 text-base font-medium text-text-primary"
                >
                  {dd.label}
                  <svg
                    width="14" height="14" viewBox="0 0 14 14"
                    className={`transition-transform ${expanded === key ? "rotate-180" : ""}`}
                  >
                    <path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                {expanded === key && (
                  <div className="pl-4 space-y-1 pb-2">
                    {dd.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm text-text-secondary hover:text-brand transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <a
              href={investorHref}
              target="_blank"
              className="block py-3 text-base font-medium text-text-primary"
            >
              {t("nav_investor")}
            </a>
            <Link
              href={linksHref}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-medium text-text-primary"
            >
              {t("nav_link")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
