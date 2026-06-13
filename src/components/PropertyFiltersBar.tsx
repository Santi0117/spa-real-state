"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  areaOptions,
  defaultFilters,
  getActiveFilterTags,
  getPriceSliderConfig,
  type PropertyFilters,
  type PropertyStatus,
} from "@/lib/properties";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";

type PropertyFiltersBarProps = {
  filters: PropertyFilters;
  onChange: (filters: PropertyFilters) => void;
  resultCount: number;
};

type OpenPanel = "status" | "type" | "price" | "rooms" | "more" | null;

const types = ["Todos", "Casa", "Apartamento", "Terreno", "Penthouse"] as const;

const zoneValues = ["Todas", "Escazú", "Santa Ana", "Heredia", "Jacó", "Curridabat", "Cartago"] as const;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

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
      className={`filter-pill max-w-full ${active ? "filter-pill-active" : ""}`}
      aria-expanded={open}
    >
      <span className="truncate">{label}</span>
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
  minLabel,
  maxLabel,
}: {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  step: number;
  formatValue: (n: number) => string;
  onChange: (min: number, max: number) => void;
  minLabel: string;
  maxLabel: string;
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
          aria-label={minLabel}
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
          aria-label={maxLabel}
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

function MobileFilterSheet({
  open,
  title,
  onClose,
  children,
  closeFiltersLabel,
  closeLabel,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  closeFiltersLabel: string;
  closeLabel: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        aria-label={closeFiltersLabel}
        onClick={onClose}
      />
      <div
        className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border border-charcoal/10 bg-white p-5 shadow-2xl sm:mx-4 sm:max-w-lg sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-charcoal/8 pb-3">
          <p className="font-display text-lg font-medium text-charcoal">{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-warm hover:bg-cream"
            aria-label={closeLabel}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default function PropertyFiltersBar({
  filters,
  onChange,
  resultCount,
}: PropertyFiltersBarProps) {
  const { t } = useTranslations();
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const priceConfig = getPriceSliderConfig(filters.status);

  const statusOptions: { value: PropertyStatus | "Todos"; label: string }[] = [
    { value: "Todos", label: t.filters.saleAndRent },
    { value: "Venta", label: t.property.sale },
    { value: "Alquiler", label: t.property.rent },
  ];

  const typeLabels: Record<(typeof types)[number], string> = {
    Todos: t.filters.all,
    Casa: t.search.house,
    Apartamento: t.search.apartment,
    Terreno: t.search.land,
    Penthouse: t.search.penthouse,
  };

  const bedPills = [
    { value: "any" as const, label: t.filters.all },
    { value: "1" as const, label: "+ 1" },
    { value: "2" as const, label: "+ 2" },
    { value: "3" as const, label: "+ 3" },
    { value: "4" as const, label: "+ 4" },
    { value: "5" as const, label: "+ 5" },
  ];

  const bathPills = [
    { value: "any" as const, label: t.filters.all },
    { value: "1" as const, label: "+ 1" },
    { value: "2" as const, label: "+ 2" },
    { value: "3" as const, label: "+ 3" },
    { value: "4" as const, label: "+ 4" },
  ];

  const zoneOptions = zoneValues.map((zone) => ({
    value: zone,
    label: zone === "Todas" ? t.filters.allZones : zone,
  }));

  const translatedSortOptions = [
    { value: "newest" as const, label: t.filters.sortNewest },
    { value: "price-asc" as const, label: t.filters.sortPriceAsc },
    { value: "price-desc" as const, label: t.filters.sortPriceDesc },
    { value: "area-desc" as const, label: t.filters.sortAreaDesc },
  ];

  const translatedAreaOptions = areaOptions.map((option) => ({
    value: option.value,
    label: option.value === "any" ? t.filters.areaSqm : option.label,
  }));

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
      if (!isDesktop) return;
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktop]);

  const activeTags = getActiveFilterTags(filters);

  const statusLabel =
    statusOptions.find((o) => o.value === filters.status)?.label ?? t.filters.operation;

  const typeLabel =
    filters.type === "Todos"
      ? t.filters.propertyType
      : typeLabels[filters.type as (typeof types)[number]];

  const priceActive =
    filters.priceMin > priceConfig.min || filters.priceMax < priceConfig.max;
  const priceLabel = priceActive
    ? filters.priceMax >= priceConfig.max
      ? formatMessage(t.filters.fromPrice, { price: priceConfig.format(filters.priceMin) })
      : `${priceConfig.format(filters.priceMin)} – ${priceConfig.format(filters.priceMax)}`
    : t.filters.price;

  const roomsActive = filters.bedsMin !== "any" || filters.bathsMin !== "any";
  const roomsLabel = roomsActive ? t.filters.roomsFiltered : t.filters.rooms;

  const moreActive =
    filters.zone !== "Todas" || filters.areaMin !== "any" || filters.sort !== "newest";

  const panelTitles: Record<Exclude<OpenPanel, null>, string> = {
    status: t.filters.operation,
    type: t.filters.propertyType,
    price: t.filters.price,
    rooms: t.filters.rooms,
    more: t.filters.more,
  };

  const statusPanel = (
    <>
      <p className="filter-dropdown-title">{t.filters.operation}</p>
      <OptionPills options={statusOptions} value={filters.status} onChange={updateStatus} />
    </>
  );

  const typePanel = (
    <>
      <p className="filter-dropdown-title">{t.filters.propertyType}</p>
      <OptionPills
        options={types.map((type) => ({ value: type, label: typeLabels[type] }))}
        value={filters.type}
        onChange={(v) => update("type", v)}
      />
    </>
  );

  const pricePanel = (
    <>
      <p className="filter-dropdown-title">{t.filters.priceRange}</p>
      <p className="mb-4 text-xs text-slate-warm">{priceConfig.hint}</p>
      <PriceRangeSlider
        min={priceConfig.min}
        max={priceConfig.max}
        step={priceConfig.step}
        valueMin={filters.priceMin}
        valueMax={filters.priceMax}
        formatValue={priceConfig.format}
        minLabel={t.filters.minPrice}
        maxLabel={t.filters.maxPrice}
        onChange={(priceMin, priceMax) => onChange({ ...filters, priceMin, priceMax })}
      />
      <button
        type="button"
        className="mt-4 text-xs font-medium text-gold hover:underline"
        onClick={() =>
          onChange({ ...filters, priceMin: priceConfig.min, priceMax: priceConfig.max })
        }
      >
        {t.filters.resetPrice}
      </button>
    </>
  );

  const roomsPanel = (
    <div className="space-y-5">
      <div>
        <p className="filter-dropdown-title mb-3">{t.filters.beds}</p>
        <OptionPills
          options={bedPills}
          value={filters.bedsMin}
          onChange={(v) => update("bedsMin", v)}
        />
      </div>
      <div>
        <p className="filter-dropdown-title mb-3">{t.filters.baths}</p>
        <OptionPills
          options={bathPills}
          value={filters.bathsMin}
          onChange={(v) => update("bathsMin", v)}
        />
      </div>
    </div>
  );

  const morePanel = (
    <div className="space-y-5">
      <div>
        <p className="filter-dropdown-title mb-3">{t.filters.zone}</p>
        <OptionPills
          options={zoneOptions}
          value={filters.zone}
          onChange={(v) => update("zone", v)}
        />
      </div>
      <div>
        <p className="filter-dropdown-title mb-3">{t.filters.minArea}</p>
        <OptionPills
          options={translatedAreaOptions.map((o) => ({
            value: o.value,
            label: o.value === "any" ? t.filters.any : o.label,
          }))}
          value={filters.areaMin}
          onChange={(v) => update("areaMin", v)}
        />
      </div>
      <div>
        <p className="filter-dropdown-title mb-3">{t.filters.sortBy}</p>
        <OptionPills
          options={translatedSortOptions}
          value={filters.sort}
          onChange={(v) => update("sort", v)}
        />
      </div>
    </div>
  );

  const mobilePanelContent =
    openPanel === "status"
      ? statusPanel
      : openPanel === "type"
        ? typePanel
        : openPanel === "price"
          ? pricePanel
          : openPanel === "rooms"
            ? roomsPanel
            : openPanel === "more"
              ? morePanel
              : null;

  return (
    <div ref={barRef} className="mt-10 min-w-0 space-y-4">
      <div className="min-w-0 max-w-full overflow-x-auto">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="relative">
            <FilterPill
              label={statusLabel}
              active={filters.status !== "Todos"}
              open={openPanel === "status"}
              onClick={() => toggle("status")}
            />
            {isDesktop && <DropdownPanel open={openPanel === "status"}>{statusPanel}</DropdownPanel>}
          </div>

          <div className="relative">
            <FilterPill
              label={typeLabel}
              active={filters.type !== "Todos"}
              open={openPanel === "type"}
              onClick={() => toggle("type")}
            />
            {isDesktop && <DropdownPanel open={openPanel === "type"}>{typePanel}</DropdownPanel>}
          </div>

          <div className="relative">
            <FilterPill
              label={priceLabel}
              active={priceActive}
              open={openPanel === "price"}
              onClick={() => toggle("price")}
            />
            {isDesktop && (
              <DropdownPanel open={openPanel === "price"} className="min-w-[300px]">
                {pricePanel}
              </DropdownPanel>
            )}
          </div>

          <div className="relative">
            <FilterPill
              label={roomsLabel}
              active={roomsActive}
              open={openPanel === "rooms"}
              onClick={() => toggle("rooms")}
            />
            {isDesktop && (
              <DropdownPanel open={openPanel === "rooms"} className="min-w-[320px]">
                {roomsPanel}
              </DropdownPanel>
            )}
          </div>

          <div className="relative">
            <FilterPill
            label={t.filters.more}
              active={moreActive}
              open={openPanel === "more"}
              onClick={() => toggle("more")}
            />
            {isDesktop && (
              <DropdownPanel open={openPanel === "more"} className="min-w-[300px]">
                {morePanel}
              </DropdownPanel>
            )}
          </div>

          {activeTags.length > 0 && (
            <button
              type="button"
              onClick={() => onChange(defaultFilters)}
              className="text-xs font-medium text-slate-warm underline-offset-2 hover:text-charcoal hover:underline"
            >
              {t.filters.clear}
            </button>
          )}
        </div>
      </div>

      {!isDesktop && openPanel && (
        <MobileFilterSheet
          open
          title={panelTitles[openPanel]}
          onClose={() => setOpenPanel(null)}
          closeFiltersLabel={t.filters.closeFilters}
          closeLabel={t.filters.close}
        >
          {mobilePanelContent}
        </MobileFilterSheet>
      )}

      <p className="text-sm text-slate-warm">
        {formatMessage(t.filters.results, { count: resultCount })}
      </p>
    </div>
  );
}
