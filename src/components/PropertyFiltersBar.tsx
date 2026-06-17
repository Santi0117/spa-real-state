"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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
      className={`filter-pill shrink-0 ${active ? "filter-pill-active" : ""}`}
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

function FilterDropdownPortal({
  open,
  anchorRef,
  children,
  className = "",
}: {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;

    const update = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, anchorRef]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      data-filter-dropdown
      className={`filter-dropdown-portal fixed ${className}`}
      style={{ top: position.top, left: position.left }}
      role="dialog"
    >
      {children}
    </div>,
    document.body
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
  const statusRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
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

  function applyFilters(next: PropertyFilters, closePanel = true) {
    onChange(next);
    if (closePanel && isDesktop) setOpenPanel(null);
  }

  function update<K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) {
    applyFilters({ ...filters, [key]: value });
  }

  function updateStatus(status: PropertyStatus | "Todos") {
    const config = getPriceSliderConfig(status);
    applyFilters({
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
      if (!isDesktop || !openPanel) return;
      const target = e.target as Node;
      if (barRef.current?.contains(target)) return;
      if ((target as Element).closest?.("[data-filter-dropdown]")) return;
      setOpenPanel(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktop, openPanel]);

  const activeTags = getActiveFilterTags(filters);

  const statusLabel =
    statusOptions.find((o) => o.value === filters.status)?.label ?? t.filters.operation;

  const typeLabel =
    filters.type === "Todos"
      ? t.filters.propertyType
      : typeLabels[filters.type as (typeof types)[number]];

  const priceActive =
    filters.status !== "Todos" &&
    (filters.priceMin > priceConfig.min || filters.priceMax < priceConfig.max);
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

  const pricePanel =
    filters.status === "Todos" ? (
      <p className="text-sm leading-relaxed text-slate-warm">{t.filters.selectOperationForPrice}</p>
    ) : (
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
          onChange={(priceMin, priceMax) =>
            applyFilters({ ...filters, priceMin, priceMax }, false)
          }
        />
        <button
          type="button"
          className="mt-4 text-xs font-medium text-gold hover:underline"
          onClick={() =>
            applyFilters({
              ...filters,
              priceMin: priceConfig.min,
              priceMax: priceConfig.max,
            })
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
    <div ref={barRef} className={`relative mt-10 min-w-0 space-y-4 ${openPanel ? "z-50" : "z-30"}`}>
      <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
        <div className="relative shrink-0" ref={statusRef}>
          <FilterPill
            label={statusLabel}
            active={filters.status !== "Todos"}
            open={openPanel === "status"}
            onClick={() => toggle("status")}
          />
          {isDesktop && (
            <FilterDropdownPortal open={openPanel === "status"} anchorRef={statusRef}>
              {statusPanel}
            </FilterDropdownPortal>
          )}
        </div>

        <div className="relative shrink-0" ref={typeRef}>
          <FilterPill
            label={typeLabel}
            active={filters.type !== "Todos"}
            open={openPanel === "type"}
            onClick={() => toggle("type")}
          />
          {isDesktop && (
            <FilterDropdownPortal open={openPanel === "type"} anchorRef={typeRef}>
              {typePanel}
            </FilterDropdownPortal>
          )}
        </div>

        <div className="relative shrink-0" ref={priceRef}>
          <FilterPill
            label={priceLabel}
            active={priceActive}
            open={openPanel === "price"}
            onClick={() => toggle("price")}
          />
          {isDesktop && (
            <FilterDropdownPortal
              open={openPanel === "price"}
              anchorRef={priceRef}
              className="min-w-[300px]"
            >
              {pricePanel}
            </FilterDropdownPortal>
          )}
        </div>

        <div className="relative shrink-0" ref={roomsRef}>
          <FilterPill
            label={roomsLabel}
            active={roomsActive}
            open={openPanel === "rooms"}
            onClick={() => toggle("rooms")}
          />
          {isDesktop && (
            <FilterDropdownPortal
              open={openPanel === "rooms"}
              anchorRef={roomsRef}
              className="min-w-[320px]"
            >
              {roomsPanel}
            </FilterDropdownPortal>
          )}
        </div>

        <div className="relative shrink-0" ref={moreRef}>
          <FilterPill
            label={t.filters.more}
            active={moreActive}
            open={openPanel === "more"}
            onClick={() => toggle("more")}
          />
          {isDesktop && (
            <FilterDropdownPortal
              open={openPanel === "more"}
              anchorRef={moreRef}
              className="min-w-[300px]"
            >
              {morePanel}
            </FilterDropdownPortal>
          )}
        </div>

        {activeTags.length > 0 && (
          <button
            type="button"
            onClick={() => applyFilters(defaultFilters)}
            className="shrink-0 text-xs font-medium text-slate-warm underline-offset-2 hover:text-charcoal hover:underline"
          >
            {t.filters.clear}
          </button>
        )}
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
