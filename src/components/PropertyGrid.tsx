"use client";

import { useState } from "react";
import CondominiumListingCard from "./CondominiumListingCard";
import PropertyCard from "./PropertyCard";
import PropertyFiltersBar from "./PropertyFiltersBar";
import { useTranslations } from "@/components/LanguageProvider";
import { condominiums } from "@/lib/condominiums";
import {
  defaultFilters,
  filterProperties,
  properties,
  type PropertyFilters,
} from "@/lib/properties";

export default function PropertyGrid() {
  const { t } = useTranslations();
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);
  const filtered = filterProperties(properties, filters);

  return (
    <section id="listings" className="overflow-hidden border-t border-charcoal/8 bg-white py-20 md:py-28">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="section-label">{t.catalog.label}</p>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            {t.catalog.title}
          </h2>
          <p className="mt-4 text-slate-warm">{t.catalog.description}</p>
        </div>

        <PropertyFiltersBar
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />

        <div className="mt-12 grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {condominiums.map((condo) => (
            <CondominiumListingCard key={condo.id} condominium={condo} />
          ))}
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-slate-warm">{t.catalog.noResults}</p>
        )}
      </div>
    </section>
  );
}
