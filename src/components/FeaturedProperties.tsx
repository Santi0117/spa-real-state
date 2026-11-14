"use client";

import PropertyCard from "./PropertyCard";
import { useTranslations } from "@/components/LanguageProvider";
import { featuredProperties } from "@/lib/properties";

export default function FeaturedProperties() {
  const { t } = useTranslations();

  return (
    <section id="destacadas" className="overflow-hidden bg-sand py-20 md:py-28">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-label">{t.featured.label}</p>
            <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-navy md:text-6xl">
              {t.featured.title}
            </h2>
          </div>
          <a href="#listings" className="link-arrow shrink-0">
            {t.featured.viewCatalog}
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="mt-12 grid min-w-0 grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:gap-x-10">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
