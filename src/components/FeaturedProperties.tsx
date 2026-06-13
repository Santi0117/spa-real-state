"use client";

import PropertyCard from "./PropertyCard";
import { useTranslations } from "@/components/LanguageProvider";
import { featuredProperties } from "@/lib/properties";

export default function FeaturedProperties() {
  const { t } = useTranslations();

  return (
    <section id="destacadas" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-label">{t.featured.label}</p>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
              {t.featured.title}
            </h2>
          </div>
          <a href="#listings" className="btn-outline shrink-0">
            {t.featured.viewCatalog}
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {featuredProperties.map((property, i) => (
            <PropertyCard key={property.id} property={property} large={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
