"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  areaOptions,
  bathOptions,
  bedOptions,
  defaultFilters,
  getActiveFilterTags,
  getPriceSliderConfig,
  sortOptions,
  type PropertyFilters,
  type PropertyStatus,
} from "@/lib/properties";

type PropertyFiltersBarProps = {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  resultCount: number;
};

type OpenPanel = "status" | "type" | "price" | "rooms" | "more" | null;

const types = ["Todos", "Casa", "Apartamento", "Terreno", "Penthouse"] as const;

const statusOptions: { value: PropertyStatus | "Todos"; label: string }[] = [
  { value: "Todos", label: "Venta y alquiler" },
  { value: "Venta", label: "Venta" },
  { value: "Alquiler", label: "Alquiler" },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-charcoal/50 transition ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FilterPill({
  label,
  active,
  open,
  onClick,
}: {
  label: string;
  active?: boolean;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`filter-pill ${active ? "filter-pill-active" : ""}`}
      aria-expanded={open}
    >
      <span>{label}</span>
      <ChevronDown open={open} />
    </button>
  );
}

function OptionPills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`filter-option-pill ${value === opt.value ? "filter-option-pill-active" : ""}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function PriceRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  step,
  formatValue,
  onChange,
}: {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  step: number;
  formatValue: (n: number) => string;
  onChange: (min: number, max: number) => void;
}) {
  const minId = useId();
  const maxId = useId();

  const safeMin = Math.min(valueMin, valueMax - step);
  const safeMax = Math.max(valueMax, valueMin + step);
  const minPercent = ((safeMin - min) / (max - min)) * 100;
  const maxPercent = ((safeMax - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-charcoal">{formatValue(safeMin)}</span>
        <span className="text-slate-warm">—</span>
        <span className="font-medium text-charcoal">
          {safeMax >= max ? `${formatValue(safeMax)}+` : formatValue(safeMax)}
        </span>
      </div>

      <div className="relative h-8 pt-3">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-charcoal/10" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gold"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          id={minId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeMin}
          onChange={(e) => onChange(Number(e.target.value), safeMax)}
          className="price-range-input"
          aria-label="Precio mínimo"
        />
        <input
          id={maxId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeMax}
          onChange={(e) => onChange(safeMin, Number(e.target.value))}
          className="price-range-input"
          aria-label="Precio máximo"
        />
      </div>
    </div>
  );
}

function DropdownPanel({
  open,
  children,
  className = "",
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div className={`filter-dropdown ${className}`} role="dialog">
      {children}
    </div>
  );
}

export default function PropertyFiltersBar({
  filters,
  onChange,
  resultCount,
}: PropertyFiltersBarProps) {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const priceConfig = getPriceSliderConfig(filters.status);

  function update<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function updateStatus(status: PropertyStatus | "Todos") {
    const config = getPriceSliderConfig(status);
    onChange({
      ...filters,
      status,
      priceMin: config.min,
      priceMax: config.max,
    });
  }

  function toggle(panel: OpenPanel) {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeTags = getActiveFilterTags(filters);

  const statusLabel =
    statusOptions.find((o) => o.value === filters.status)?.label ?? "Operación";

  const typeLabel = filters.type === "Todos" ? "Tipo de propiedad" : filters.type;

  const priceActive =
    filters.priceMin > priceConfig.min || filters.priceMax < priceConfig.max;
  const priceLabel = priceActive
    ? filters.priceMax >= priceConfig.max
      ? `Desde ${priceConfig.format(filters.priceMin)}`
      : `${priceConfig.format(filters.priceMin)} – ${priceConfig.format(filters.priceMax)}`
    : "Precio";

  const roomsActive = filters.bedsMin !== "any" || filters.bathsMin !== "any";
  const roomsLabel = roomsActive ? "Recámaras y baños · filtrado" : "Recámaras y baños";

  const moreActive =
    filters.zone !== "Todas" || filters.areaMin !== "any" || filters.sort !== "newest";

  const bedPills = [
    { value: "any", label: "Todos" },
    { value: "1", label: "+ 1" },
    { value: "2", label: "+ 2" },
    { value: "3", label: "+ 3" },
    { value: "4", label: "+ 4" },
    { value: "5", label: "+ 5" },
  ];

  const bathPills = [
    { value: "any", label: "Todos" },
    { value: "1", label: "+ 1" },
    { value: "2", label: "+ 2" },
    { value: "3", label: "+ 3" },
    { value: "4", label: "+ 4" },
  ];

  return (
    <div ref={barRef} className="mt-10 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <FilterPill
            label={statusLabel}
            active={filters.status !== "Todos"}
            open={openPanel === "status"}
            onClick={() => toggle("status")}
          />
          <DropdownPanel open={openPanel === "status"}>
            <p className="filter-dropdown-title">Operación</p>
            <OptionPills
              options={statusOptions}
              value={filters.status}
              onChange={updateStatus}
            />
          </DropdownPanel>
        </div>

        <div className="relative">
          <FilterPill
            label={typeLabel}
            active={filters.type !== "Todos"}
            open={openPanel === "type"}
            onClick={() => toggle("type")}
          />
          <DropdownPanel open={openPanel === "type"}>
            <p className="filter-dropdown-title">Tipo de propiedad</p>
            <OptionPills
              options={types.map((t) => ({ value: t, label: t }))}
              value={filters.type}
              onChange={(v) => update("type", v)}
            />
          </DropdownPanel>
        </div>

        <div className="relative">
          <FilterPill
            label={priceLabel}
            active={priceActive}
            open={openPanel === "price"}
            onClick={() => toggle("price")}
          />
          <DropdownPanel open={openPanel === "price"} className="min-w-[300px]">
            <p className="filter-dropdown-title">Rango de precio</p>
            <p className="mb-4 text-xs text-slate-warm">{priceConfig.hint}</p>
            <PriceRangeSlider
              min={priceConfig.min}
              max={priceConfig.max}
              step={priceConfig.step}
              valueMin={filters.priceMin}
              valueMax={filters.priceMax}
              formatValue={priceConfig.format}
              onChange={(priceMin, priceMax) => onChange({ ...filters, priceMin, priceMax })}
            />
            <button
              type="button"
              className="mt-4 text-xs font-medium text-gold hover:underline"
              onClick={() =>
                onChange({ ...filters, priceMin: priceConfig.min, priceMax: priceConfig.max })
              }
            >
              Restablecer precio
            </button>
          </DropdownPanel>
        </div>

        <div className="relative">
          <FilterPill
            label={roomsLabel}
            active={roomsActive}
            open={openPanel === "rooms"}
            onClick={() => toggle("rooms")}
          />
          <DropdownPanel open={openPanel === "rooms"} className="min-w-[320px]">
            <div className="space-y-5">
              <div>
                <p className="filter-dropdown-title mb-3">Recámaras</p>
                <OptionPills
                  options={bedPills}
                  value={filters.bedsMin}
                  onChange={(v) => update("bedsMin", v)}
                />
              </div>
              <div>
                <p className="filter-dropdown-title mb-3">Baños</p>
                <OptionPills
                  options={bathPills}
                  value={filters.bathsMin}
                  onChange={(v) => update("bathsMin", v)}
                />
              </div>
            </div>
          </DropdownPanel>
        </div>

        <div className="relative">
          <FilterPill
            label="Más filtros"
            active={moreActive}
            open={openPanel === "more"}
            onClick={() => toggle("more")}
          />
          <DropdownPanel open={openPanel === "more"} className="min-w-[300px]">
            <div className="space-y-5">
              <div>
                <p className="filter-dropdown-title mb-3">Zona</p>
                <OptionPills
                  options={[
                    { value: "Todas", label: "Todas" },
                    { value: "Escazú", label: "Escazú" },
                    { value: "Santa Ana", label: "Santa Ana" },
                    { value: "Heredia", label: "Heredia" },
                    { value: "Jacó", label: "Jacó" },
                    { value: "Curridabat", label: "Curridabat" },
                  ]}
                  value={filters.zone}
                  onChange={(v) => update("zone", v)}
                />
              </div>
              <div>
                <p className="filter-dropdown-title mb-3">Área mínima</p>
                <OptionPills
                  options={areaOptions.map((o) => ({
                    value: o.value,
                    label: o.value === "any" ? "Cualquiera" : o.label,
                  }))}
                  value={filters.areaMin}
                  onChange={(v) => update("areaMin", v)}
                />
              </div>
              <div>
                <p className="filter-dropdown-title mb-3">Ordenar por</p>
                <OptionPills
                  options={sortOptions}
                  value={filters.sort}
                  onChange={(v) => update("sort", v)}
                />
              </div>
            </div>
          </DropdownPanel>
        </div>

        {activeTags.length > 0 && (
          <button
            type="button"
            onClick={() => onChange(defaultFilters)}
            className="ml-auto text-xs font-medium text-slate-warm underline-offset-2 hover:text-charcoal hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <p className="text-sm text-slate-warm">
        {resultCount} {resultCount === 1 ? "propiedad" : "propiedades"}
      </p>
    </div>
  );
}
