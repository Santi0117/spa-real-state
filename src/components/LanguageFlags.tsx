"use client";

import { languages } from "@/lib/languages";
import type { LanguageCode } from "@/lib/i18n";
import { useTranslations } from "@/components/LanguageProvider";

function FlagIcon({ country }: { country: string }) {
  switch (country) {
    case "ES":
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-hidden>
          <rect width="24" height="16" fill="#c60b1e" />
          <rect width="24" height="8" y="4" fill="#ffc400" />
        </svg>
      );
    case "US":
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-hidden>
          <rect width="24" height="16" fill="#b22234" />
          <rect width="24" height="1.23" y="1.23" fill="#fff" />
          <rect width="24" height="1.23" y="3.69" fill="#fff" />
          <rect width="24" height="1.23" y="6.15" fill="#fff" />
          <rect width="24" height="1.23" y="8.62" fill="#fff" />
          <rect width="24" height="1.23" y="11.08" fill="#fff" />
          <rect width="24" height="1.23" y="13.54" fill="#fff" />
          <rect width="9.6" height="8.6" fill="#3c3b6e" />
        </svg>
      );
    case "BR":
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-hidden>
          <rect width="24" height="16" fill="#009c3b" />
          <polygon points="12,2 22,8 12,14 2,8" fill="#ffdf00" />
          <circle cx="12" cy="8" r="3.2" fill="#002776" />
        </svg>
      );
    default:
      return null;
  }
}

export default function LanguageFlags() {
  const { locale, setLocale, t } = useTranslations();

  return (
    <div
      className="flex shrink-0 gap-1"
      role="group"
      aria-label={t.common.language}
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          title={lang.label}
          aria-label={lang.label}
          aria-pressed={locale === lang.code}
          onClick={() => setLocale(lang.code as LanguageCode)}
          className={`h-5 w-7 overflow-hidden rounded-sm border transition ${
            locale === lang.code
              ? "border-gold ring-1 ring-gold/60"
              : "border-white/20 opacity-80 hover:border-white/50 hover:opacity-100"
          }`}
        >
          <FlagIcon country={lang.country} />
        </button>
      ))}
    </div>
  );
}
