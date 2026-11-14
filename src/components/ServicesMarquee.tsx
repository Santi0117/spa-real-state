"use client";

import { useTranslations } from "@/components/LanguageProvider";

export default function ServicesMarquee() {
  const { t } = useTranslations();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div
      className="services-marquee overflow-hidden bg-khaki"
      aria-label={t.services.title}
    >
      <div className="services-marquee-track flex flex-nowrap">
        {items.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="flex shrink-0 flex-nowrap items-center gap-8 px-8 py-4 md:gap-12 md:px-12 md:py-5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-navy md:text-xs">
              {text}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-navy" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
