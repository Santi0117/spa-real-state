"use client";

import { useTranslations } from "@/components/LanguageProvider";
import { stats } from "@/lib/site";

const statKeys = ["sold", "experience", "satisfied", "zones"] as const;

export default function Stats() {
  const { t } = useTranslations();
  const labels = [t.stats.sold, t.stats.experience, t.stats.satisfied, t.stats.zones];

  return (
    <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4 lg:gap-x-10">
      {stats.map((stat, index) => (
        <div key={statKeys[index]} className="min-w-0 border-t border-white/20 pt-5">
          <p className="font-display text-4xl font-normal text-gold sm:text-5xl">{stat.value}</p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 sm:text-[11px]">
            {labels[index]}
          </p>
        </div>
      ))}
    </div>
  );
}
