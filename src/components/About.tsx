"use client";

import Image from "next/image";
import { useTranslations } from "@/components/LanguageProvider";

export default function About() {
  const { t } = useTranslations();

  return (
    <section id="nosotros" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
            <Image
              src="/properties/2.jpg"
              alt={t.about.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 left-6 right-6 border border-white/20 bg-charcoal/80 p-5 backdrop-blur-sm">
              <p className="font-display text-3xl font-medium text-white">5+</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/70">
                {t.about.badge}
              </p>
            </div>
          </div>

          <div>
            <p className="section-label">{t.about.label}</p>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
              {t.about.title}
            </h2>
            <p className="mt-6 leading-relaxed text-slate-warm">{t.about.p1}</p>
            <p className="mt-4 leading-relaxed text-slate-warm">{t.about.p2}</p>

            <ul className="mt-8 space-y-3">
              {t.about.features.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-charcoal">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-gold/15 text-gold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
