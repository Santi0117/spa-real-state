"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CondominiumListingCard from "./CondominiumListingCard";
import PropertyCard from "./PropertyCard";
import PropertyFiltersBar from "./PropertyFiltersBar";
import SearchBar from "./SearchBar";
import { useTranslations } from "@/components/LanguageProvider";
import { buildCatalogHref, filtersFromSearchParams } from "@/lib/catalog-filters";
import { getVisibleCondominiums } from "@/lib/condominiums";
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
    <section id="listings" className="scroll-mt-16 bg-sand pb-20 pt-14 md:pb-[110px] md:pt-24">
      <div className="mx-auto min-w-0 max-w-[1280px] px-5 md:px-12">
        <div className="max-w-[620px]">
          <p className="section-label text-slate-warm">{t.catalog.label}</p>
          <h2 className="font-display mt-2.5 text-4xl font-normal leading-[1.1] tracking-[-0.01em] text-navy md:mt-3.5 md:text-[56px]">
            {t.catalog.title}
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-warm md:mt-3.5 md:text-base">
            {t.catalog.description}
          </p>
        </div>

        <SearchBar filters={filters} onSearch={handleFilterChange} />

        <PropertyFiltersBar
          filters={filters}
          onChange={handleFilterChange}
          resultCount={filtered.length}
        />

        <div className="relative z-0 mt-7 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 md:mt-10 md:gap-7 lg:grid-cols-3">
          {getVisibleCondominiums().map((condo) => (
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
