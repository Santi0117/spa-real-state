"use client";

import Image from "next/image";
import { useTranslations } from "@/components/LanguageProvider";

export default function About() {
  const { t } = useTranslations();

  return (
    <section id="nosotros" className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/properties/2.jpg"
              alt={t.about.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className="section-label">{t.about.label}</p>
            <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-navy md:text-6xl">
              {t.about.title}
            </h2>
            <p className="mt-6 leading-relaxed text-slate-warm">{t.about.p1}</p>
            <p className="mt-4 leading-relaxed text-slate-warm">{t.about.p2}</p>

            <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {t.about.features.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-semibold text-navy">
                  <span className="mt-px shrink-0 text-gold" aria-hidden>
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
