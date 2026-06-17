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
      className="mx-auto w-full max-w-4xl rounded-sm bg-white p-2 shadow-2xl shadow-black/20 sm:p-3"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-2 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <label htmlFor="search-type" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            {t.search.type}
          </label>
          <select id="search-type" name="type" defaultValue="Todos" className="input-field rounded-sm">
            {types.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="search-zone" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            {t.search.zone}
          </label>
          <select id="search-zone" name="zone" defaultValue="Todas" className="input-field rounded-sm">
            {zones.map((z) => (
              <option key={z} value={z}>{z === "Todas" ? t.search.allZones : z}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="search-status" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            {t.search.operation}
          </label>
          <select id="search-status" name="status" defaultValue="Todos" className="input-field rounded-sm">
            <option value="Venta">{t.search.sale}</option>
            <option value="Alquiler">{t.search.rent}</option>
            <option value="Todos">{t.search.both}</option>
          </select>
        </div>
        <div className="flex items-end sm:col-span-1">
          <button type="submit" className="btn-gold w-full justify-center rounded-sm py-3.5">
            {t.search.search}
          </button>
        </div>
      </div>
    </form>
  );
}
