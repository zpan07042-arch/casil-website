'use client';

export default function LanguageSwitcher({ locale, onLanguageChange }: { locale: string; onLanguageChange: (lang: string) => void }) {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onLanguageChange('zh')}
        className={`px-2 py-1 text-sm font-medium transition-all duration-200 rounded-l-full ${
          locale === 'zh'
            ? 'bg-slate-900 text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        繁體
      </button>
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-2 py-1 text-sm font-medium transition-all duration-200 rounded-r-full ${
          locale === 'en'
            ? 'bg-slate-900 text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        EN
      </button>
    </div>
  );
}
