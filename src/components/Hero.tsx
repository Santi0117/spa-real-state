"use client";

import Image from "next/image";
import { useTranslations } from "@/components/LanguageProvider";
import SearchBar from "./SearchBar";
import Stats from "./Stats";

export default function Hero() {
  const { t } = useTranslations();

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy">
      <Image
        src="/hero/hero.jpg"
        alt={t.hero.imageAlt}
        fill
        priority
        quality={95}
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-navy/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:pt-48">
        <div className="max-w-3xl">
          <p className="section-label-gold flex items-center gap-4">
            <span className="h-px w-10 bg-gold" aria-hidden />
            {t.hero.label}
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.75rem,7vw,5.75rem)] font-normal leading-[1.02] tracking-tight text-white">
            {t.hero.titleLine1}
            <span className="block italic text-gold">{t.hero.titleLine2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85">
            {t.hero.description}
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <SearchBar />
        </div>

        <div className="mt-12 lg:mt-16">
          <Stats />
        </div>
      </div>
    </section>
  );
}
