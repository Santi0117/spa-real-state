"use client";

import PropertyCard from "./PropertyCard";
import { useTranslations } from "@/components/LanguageProvider";
import { featuredProperties } from "@/lib/properties";

export default function FeaturedProperties() {
  const { t } = useTranslations();

  return (
    <section id="destacadas" className="bg-cream pb-20 pt-14 md:pb-24 md:pt-[72px]">
      <div className="mx-auto min-w-0 max-w-[1280px] px-5 md:px-12">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:flex-wrap md:items-end">
          <div>
            <p className="section-label text-slate-warm">{t.featured.label}</p>
            <h2 className="font-display mt-3.5 text-4xl font-normal tracking-[-0.01em] text-navy md:text-[56px] md:leading-[1.1]">
              {t.featured.title}
            </h2>
          </div>
          <a
            href="#listings"
            className="shrink-0 border-b border-gold pb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy transition hover:text-gold"
          >
            {t.featured.viewCatalog} →
          </a>
        </div>

        <div className="mt-10 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 md:mt-11 md:gap-7 lg:grid-cols-3">
          {featuredProperties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
