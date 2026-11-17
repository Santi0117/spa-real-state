"use client";

import { useTranslations } from "@/components/LanguageProvider";
import { stats } from "@/lib/site";

const statKeys = ["sold", "experience", "satisfied", "zones"] as const;

const icons: Record<(typeof statKeys)[number], React.ReactNode> = {
  sold: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  experience: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.2 7 21l5-2.5 5 2.5-1.5-7.8" />
    </>
  ),
  satisfied: (
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  ),
  zones: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
};

export default function Stats() {
  const { t } = useTranslations();
  const labels = [t.stats.sold, t.stats.experience, t.stats.satisfied, t.stats.zones];

  return (
    <section className="bg-cream pb-2 pt-8 md:pb-6 md:pt-[72px]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-3 px-5 md:px-12 lg:grid-cols-4 lg:gap-5">
        {stats.map((stat, index) => (
          <div
            key={statKeys[index]}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-navy/8 bg-white px-3 py-5 text-center md:gap-2.5 md:rounded-[18px] md:px-6 md:py-[30px]"
          >
            <span
              aria-hidden
              className="hidden h-11 w-11 items-center justify-center rounded-full bg-navy text-gold md:flex"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                {icons[statKeys[index]]}
              </svg>
            </span>
            <span className="font-display text-[34px] leading-none text-navy md:text-[46px]">{stat.value}</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-warm md:text-[11px] md:tracking-[0.2em]">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
