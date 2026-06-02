"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/data/I18nProvider";

interface SearchResult {
  type: string;
  title_zh: string;
  title_en: string;
  snippet_zh: string;
  snippet_en: string;
  route: string;
}

export default function SearchBar() {
  const { lang, t } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&lang=${lang}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, [lang]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); setQuery(""); }
    if (e.key === "Enter" && results.length > 0) {
      goTo(results[0]);
    }
  };

  const goTo = (r: SearchResult) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    router.push(`/${lang}${r.route}`);
  };

  const title = (r: SearchResult) => lang === "zh" ? r.title_zh : r.title_en;
  const snippet = (r: SearchResult) => lang === "zh" ? r.snippet_zh : r.snippet_en;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Search"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-black/5 overflow-hidden">
          <div className="flex items-center px-4 py-3 border-b border-divider">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary flex-shrink-0">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); doSearch(e.target.value); }}
              onKeyDown={handleKey}
              placeholder={t("search_ph")}
              className="flex-1 ml-3 text-sm bg-transparent outline-none text-text-primary placeholder:text-text-secondary"
            />
            {loading && (
              <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
            )}
          </div>

          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => goTo(r)}
                  className="w-full text-left px-4 py-3 hover:bg-black/[0.04] transition-colors border-b border-divider/50 last:border-0"
                >
                  <div className="text-sm font-medium text-text-primary line-clamp-2">{title(r)}</div>
                  <div className="text-xs text-text-secondary mt-0.5 line-clamp-2">{snippet(r)}</div>
                </button>
              ))}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && !loading && (
            <div className="px-4 py-6 text-center text-sm text-text-secondary">
              {t("search_empty")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
