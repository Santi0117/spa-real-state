"use client";

import { useTranslations } from "@/components/LanguageProvider";
import { stats } from "@/lib/site";

const statKeys = ["sold", "experience", "satisfied", "zones"] as const;

export default function Stats() {
  const { t } = useTranslations();
  const labels = [t.stats.sold, t.stats.experience, t.stats.satisfied, t.stats.zones];

  return (
    <section className="border-b border-charcoal/8 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-charcoal/8 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={statKeys[index]} className="px-6 py-10 text-center sm:py-12">
            <p className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-warm">
              {labels[index]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
