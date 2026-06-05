"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import PropertyFiltersBar from "./PropertyFiltersBar";
import {
  defaultFilters,
  filterProperties,
  properties,
  type PropertyFilters,
} from "@/lib/properties";

export default function PropertyGrid() {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);
  const filtered = filterProperties(properties, filters);

  return (
    <section id="listings" className="border-t border-charcoal/8 bg-white py-20 md:py-28">
      <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="section-label">Catálogo completo</p>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            Todas las propiedades
          </h2>
          <p className="mt-4 text-slate-warm">
            Filtrá por zona, tipo y operación para encontrar tu próxima inversión o hogar.
          </p>
        </div>

        <PropertyFiltersBar
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-slate-warm">
            No hay propiedades con esos filtros. Probá otra combinación.
          </p>
        )}
      </div>
    </section>
  );
}
