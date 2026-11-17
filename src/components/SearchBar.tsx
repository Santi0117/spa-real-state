"use client";

import { useTranslations } from "@/components/LanguageProvider";
import {
  getPriceSliderConfig,
  zones,
  type PropertyFilters,
} from "@/lib/properties";

type SearchBarProps = {
  filters: PropertyFilters;
  onSearch: (filters: PropertyFilters) => void;
};

const selectClass =
  "w-full cursor-pointer border-0 border-b border-navy/25 bg-transparent py-2 text-sm font-medium tracking-normal text-navy outline-none transition focus:border-gold";

const labelClass =
  "flex min-w-0 flex-col gap-1 md:flex-1 md:basis-44 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-warm md:text-[10px]";

export default function SearchBar({ filters, onSearch }: SearchBarProps) {
  const { t } = useTranslations();

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
    const rawStatus = String(data.get("status") ?? "Todos");
    const status: PropertyFilters["status"] =
      rawStatus === "Venta" || rawStatus === "Alquiler" ? rawStatus : "Todos";
    const priceReset =
      status === filters.status
        ? {}
        : { priceMin: getPriceSliderConfig(status).min, priceMax: getPriceSliderConfig(status).max };

    onSearch({
      ...filters,
      ...priceReset,
      type: String(data.get("type") ?? "Todos"),
      zone: String(data.get("zone") ?? "Todas"),
      status,
    });
  }

  return (
    <form
      key={`${filters.type}|${filters.zone}|${filters.status}`}
      className="mt-6 flex flex-col gap-3.5 rounded-[22px] border border-navy/8 bg-white p-[18px] shadow-[0_10px_26px_rgba(28,51,89,0.08)] md:mt-9 md:flex-row md:flex-wrap md:items-end md:gap-7 md:rounded-full md:py-3.5 md:pl-8 md:pr-3.5 md:shadow-[0_14px_34px_rgba(28,51,89,0.10)]"
      onSubmit={handleSubmit}
    >
      <svg
        className="hidden h-[22px] w-[22px] shrink-0 self-center text-gold md:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
      <label className={labelClass}>
        {t.search.type}
        <select name="type" defaultValue={filters.type} className={selectClass}>
          {types.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        {t.search.zone}
        <select name="zone" defaultValue={filters.zone} className={selectClass}>
          {zones.map((z) => (
            <option key={z} value={z}>{z === "Todas" ? t.search.allZones : z}</option>
          ))}
        </select>
      </label>
      <label className={labelClass}>
        {t.search.operation}
        <select name="status" defaultValue={filters.status} className={selectClass}>
          <option value="Todos">{t.search.both}</option>
          <option value="Venta">{t.search.sale}</option>
          <option value="Alquiler">{t.search.rent}</option>
        </select>
      </label>
      <button
        type="submit"
        className="shrink-0 rounded-full bg-navy px-[46px] py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-navy-deep active:scale-[0.98] md:py-[18px]"
      >
        {t.search.search}
      </button>
    </form>
  );
}
