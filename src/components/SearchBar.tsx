"use client";

import { useTranslations } from "@/components/LanguageProvider";
import { zones } from "@/lib/properties";

export default function SearchBar() {
  const { t } = useTranslations();

  const types = [
    { value: "Todos", label: t.search.all },
    { value: "Casa", label: t.search.house },
    { value: "Apartamento", label: t.search.apartment },
    { value: "Terreno", label: t.search.land },
    { value: "Penthouse", label: t.search.penthouse },
  ];

  return (
    <form
      action="#listings"
      className="mx-auto w-full max-w-4xl rounded-sm bg-white p-2 shadow-2xl shadow-black/20 sm:p-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-2 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <label htmlFor="search-type" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            {t.search.type}
          </label>
          <select id="search-type" className="input-field rounded-sm">
            {types.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="search-zone" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            {t.search.zone}
          </label>
          <select id="search-zone" className="input-field rounded-sm">
            {zones.map((z) => (
              <option key={z} value={z}>{z === "Todas" ? t.search.allZones : z}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="search-status" className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
            {t.search.operation}
          </label>
          <select id="search-status" className="input-field rounded-sm">
            <option>{t.search.sale}</option>
            <option>{t.search.rent}</option>
            <option>{t.search.both}</option>
          </select>
        </div>
        <div className="flex items-end sm:col-span-1">
          <a href="#listings" className="btn-gold w-full justify-center rounded-sm py-3.5">
            {t.search.search}
          </a>
        </div>
      </div>
    </form>
  );
}
