"use client";

import { useTranslations } from "@/components/LanguageProvider";

export default function ServicesMarquee() {
  const { t } = useTranslations();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div
      className="services-marquee overflow-hidden border-y border-[#a6845d]/50 bg-gold"
      aria-label={t.services.title}
    >
      <div className="services-marquee-track flex flex-nowrap">
        {items.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="flex shrink-0 flex-nowrap items-center gap-8 px-8 py-3.5 md:gap-10 md:px-12 md:py-4"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white md:text-xs">
              {text}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
