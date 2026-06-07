"use client";

import { useState } from "react";
import { languages, type LanguageCode } from "@/lib/languages";

function FlagIcon({ country }: { country: string }) {
  switch (country) {
    case "CR":
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-hidden>
          <rect width="24" height="16" fill="#002b7f" />
          <rect width="24" height="2.67" y="2.67" fill="#fff" />
          <rect width="24" height="2.67" y="5.33" fill="#ce1126" />
          <rect width="24" height="2.67" y="8" fill="#fff" />
          <rect width="24" height="2.67" y="10.67" fill="#ce1126" />
          <rect width="24" height="2.67" y="13.33" fill="#fff" />
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
    case "FR":
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-hidden>
          <rect width="8" height="16" fill="#002395" />
          <rect x="8" width="8" height="16" fill="#fff" />
          <rect x="16" width="8" height="16" fill="#ed2939" />
        </svg>
      );
    case "DE":
      return (
        <svg viewBox="0 0 24 16" className="h-full w-full" aria-hidden>
          <rect width="24" height="5.33" fill="#000" />
          <rect width="24" height="5.33" y="5.33" fill="#dd0000" />
          <rect width="24" height="5.34" y="10.66" fill="#ffce00" />
        </svg>
      );
    default:
      return null;
  }
}

export default function LanguageFlags() {
  const [active, setActive] = useState<LanguageCode>("es");
  const topRow = languages.slice(0, 3);
  const bottomRow = languages.slice(3, 5);

  return (
    <div
      className="hidden shrink-0 flex-col gap-1 lg:flex"
      role="group"
      aria-label="Idioma"
    >
      <div className="grid grid-cols-3 gap-1">
        {topRow.map((lang) => (
          <button
            key={lang.code}
            type="button"
            title={lang.label}
            aria-label={lang.label}
            aria-pressed={active === lang.code}
            onClick={() => setActive(lang.code)}
            className={`h-5 w-7 overflow-hidden rounded-sm border transition ${
              active === lang.code
                ? "border-gold ring-1 ring-gold/60"
                : "border-white/20 opacity-80 hover:border-white/50 hover:opacity-100"
            }`}
          >
            <FlagIcon country={lang.country} />
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1">
        {bottomRow.map((lang) => (
          <button
            key={lang.code}
            type="button"
            title={lang.label}
            aria-label={lang.label}
            aria-pressed={active === lang.code}
            onClick={() => setActive(lang.code)}
            className={`h-5 w-7 overflow-hidden rounded-sm border transition ${
              active === lang.code
                ? "border-gold ring-1 ring-gold/60"
                : "border-white/20 opacity-80 hover:border-white/50 hover:opacity-100"
            }`}
          >
            <FlagIcon country={lang.country} />
          </button>
        ))}
      </div>
    </div>
  );
}
