"use client";

import { useState } from "react";
import PropertyCard from "./PropertyCard";
import {
  areaOptions,
  bathOptions,
  bedOptions,
  defaultFilters,
  filterProperties,
  getPriceRangeOptions,
  properties,
  sortOptions,
  type PropertyFilters,
  type PropertyStatus,
  zones,
} from "@/lib/properties";

const types = ["Todos", "Casa", "Apartamento", "Terreno", "Penthouse"];

export default function PropertyGrid() {
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);

  const filtered = filterProperties(properties, filters);
  const priceOptions = getPriceRangeOptions(filters.status);

  function update<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) {
    setFilters((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "status") next.priceRange = "any";
      return next;
    });
  }

  return (
    <section id="listings" className="border-t border-charcoal/8 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="section-label">Catálogo completo</p>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            Todas las propiedades
          </h2>
          <p className="mt-4 text-slate-warm">
            Filtrá por zona, tipo y operación para encontrar tu próxima inversión o hogar.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <select
            value={filters.zone}
            onChange={(e) => update("zone", e.target.value)}
            className="input-field w-auto min-w-[140px] rounded-sm"
            aria-label="Filtrar por zona"
          >
            {zones.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
          <select
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
            className="input-field w-auto min-w-[140px] rounded-sm"
            aria-label="Filtrar por tipo"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) => update("status", e.target.value as PropertyStatus | "Todos")}
            className="input-field w-auto min-w-[140px] rounded-sm"
            aria-label="Filtrar por operación"
          >
            <option value="Todos">Venta y alquiler</option>
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
          <select
            value={filters.priceRange}
            onChange={(e) => update("priceRange", e.target.value)}
            className="input-field w-auto min-w-[160px] rounded-sm"
            aria-label="Filtrar por precio"
          >
            {priceOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={filters.bedsMin}
            onChange={(e) => update("bedsMin", e.target.value)}
            className="input-field w-auto min-w-[130px] rounded-sm"
            aria-label="Habitaciones"
          >
            {bedOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={filters.bathsMin}
            onChange={(e) => update("bathsMin", e.target.value)}
            className="input-field w-auto min-w-[120px] rounded-sm"
            aria-label="Baños"
          >
            {bathOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={filters.areaMin}
            onChange={(e) => update("areaMin", e.target.value)}
            className="input-field w-auto min-w-[120px] rounded-sm"
            aria-label="Área"
          >
            {areaOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value as PropertyFilters["sort"])}
            className="input-field w-auto min-w-[180px] rounded-sm"
            aria-label="Ordenar"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

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
