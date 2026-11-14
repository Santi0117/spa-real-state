"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "@/components/LanguageProvider";
import { buildCatalogHref } from "@/lib/catalog-filters";
import {
  defaultFilters,
  getPriceSliderConfig,
  zones,
  type PropertyFilters,
} from "@/lib/properties";

export default function SearchBar() {
  const { t } = useTranslations();
  const router = useRouter();

  const types = [
    { value: "Todos", label: t.search.all },
    { value: "Casa", label: t.search.house },
    { value: "Apartamento", label: t.search.apartment },
    { value: "Terreno", label: t.search.land },
    { value: "Penthouse", label: t.search.penthouse },
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const type = String(data.get("type") ?? "Todos");
    const zone = String(data.get("zone") ?? "Todas");
    const rawStatus = String(data.get("status") ?? "Todos");
    const status: PropertyFilters["status"] =
      rawStatus === "Venta" || rawStatus === "Alquiler" || rawStatus === "Todos"
        ? rawStatus
        : "Todos";
    const priceConfig = getPriceSliderConfig(status);

    const next: PropertyFilters = {
      ...defaultFilters,
      type,
      zone,
      status,
      priceMin: priceConfig.min,
      priceMax: priceConfig.max,
    };

    router.push(buildCatalogHref(next));
  }

  return (
    <form
      className="w-full rounded-3xl bg-white px-5 py-4 shadow-2xl shadow-navy/30 sm:px-6 lg:rounded-full lg:py-3 lg:pl-7 lg:pr-3"
      onSubmit={handleSubmit}
    >
      <div className="grid items-end gap-4 sm:grid-cols-3 lg:grid-cols-[auto_1fr_1fr_1fr_auto] lg:gap-6">
        <svg
          className="hidden h-5 w-5 self-center text-gold lg:block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        <div>
          <label htmlFor="search-type" className="field-label">
            {t.search.type}
          </label>
          <select id="search-type" name="type" defaultValue="Todos" className="input-field font-medium">
            {types.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="search-zone" className="field-label">
            {t.search.zone}
          </label>
          <select id="search-zone" name="zone" defaultValue="Todas" className="input-field font-medium">
            {zones.map((z) => (
              <option key={z} value={z}>{z === "Todas" ? t.search.allZones : z}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="search-status" className="field-label">
            {t.search.operation}
          </label>
          <select id="search-status" name="status" defaultValue="Todos" className="input-field font-medium">
            <option value="Venta">{t.search.sale}</option>
            <option value="Alquiler">{t.search.rent}</option>
            <option value="Todos">{t.search.both}</option>
          </select>
        </div>
        <button type="submit" className="btn-navy w-full justify-center px-12 sm:col-span-3 lg:col-span-1 lg:w-auto">
          {t.search.search}
        </button>
      </div>
    </form>
  );
}
