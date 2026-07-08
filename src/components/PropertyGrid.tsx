"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CondominiumListingCard from "./CondominiumListingCard";
import PropertyCard from "./PropertyCard";
import PropertyFiltersBar from "./PropertyFiltersBar";
import { useTranslations } from "@/components/LanguageProvider";
import { buildCatalogHref, filtersFromSearchParams } from "@/lib/catalog-filters";
import { condominiums } from "@/lib/condominiums";
import {
  filterProperties,
  properties,
  type PropertyFilters,
} from "@/lib/properties";

export default function PropertyGrid() {
  const { t } = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<PropertyFilters>(() =>
    filtersFromSearchParams(searchParams)
  );

  useEffect(() => {
    setFilters(filtersFromSearchParams(searchParams));
  }, [searchParams]);

  const pendingHrefRef = useRef<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const filtered = filterProperties(properties, filters);

  function handleFilterChange(next: PropertyFilters) {
    setFilters(next);

    // Debounce the URL sync. Dragging the price slider fires many change
    // events per second, and calling router.replace() (history.replaceState)
    // that often makes mobile Safari throw a SecurityError and crash the page.
    pendingHrefRef.current = buildCatalogHref(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (pendingHrefRef.current) {
        router.replace(pendingHrefRef.current, { scroll: false });
        pendingHrefRef.current = null;
      }
    }, 300);
  }

  return (
    <section id="listings" className="border-t border-charcoal/8 bg-white py-20 md:py-28">
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
          onChange={handleFilterChange}
          resultCount={filtered.length}
        />

        <div className="relative z-0 mt-12 grid min-w-0 grid-cols-1 gap-6 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
