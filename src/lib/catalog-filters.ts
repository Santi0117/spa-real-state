import {
  defaultFilters,
  getPriceSliderConfig,
  type PropertyFilters,
  type PropertyStatus,
  type SortOption,
} from "./properties";

const FILTER_KEYS = [
  "zone",
  "type",
  "status",
  "priceMin",
  "priceMax",
  "bedsMin",
  "bathsMin",
  "areaMin",
  "sort",
] as const;

export function filtersToSearchParams(filters: PropertyFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.zone !== defaultFilters.zone) params.set("zone", filters.zone);
  if (filters.type !== defaultFilters.type) params.set("type", filters.type);
  if (filters.status !== defaultFilters.status) params.set("status", filters.status);
  if (filters.priceMin !== defaultFilters.priceMin) {
    params.set("priceMin", String(filters.priceMin));
  }
  if (filters.priceMax !== defaultFilters.priceMax) {
    params.set("priceMax", String(filters.priceMax));
  }
  if (filters.bedsMin !== defaultFilters.bedsMin) params.set("beds", filters.bedsMin);
  if (filters.bathsMin !== defaultFilters.bathsMin) params.set("baths", filters.bathsMin);
  if (filters.areaMin !== defaultFilters.areaMin) params.set("area", filters.areaMin);
  if (filters.sort !== defaultFilters.sort) params.set("sort", filters.sort);

  return params;
}

export function filtersFromSearchParams(params: URLSearchParams): PropertyFilters {
  const status = parseStatus(params.get("status")) ?? defaultFilters.status;
  const priceConfig = getPriceSliderConfig(status);

  return {
    zone: params.get("zone") ?? defaultFilters.zone,
    type: params.get("type") ?? defaultFilters.type,
    status,
    priceMin: parseNumber(params.get("priceMin"), defaultFilters.priceMin),
    priceMax: parseNumber(params.get("priceMax"), priceConfig.max),
    bedsMin: params.get("beds") ?? defaultFilters.bedsMin,
    bathsMin: params.get("baths") ?? defaultFilters.bathsMin,
    areaMin: params.get("area") ?? defaultFilters.areaMin,
    sort: parseSort(params.get("sort")) ?? defaultFilters.sort,
  };
}

export function buildCatalogHref(filters: PropertyFilters): string {
  const params = filtersToSearchParams(filters);
  const query = params.toString();
  return query ? `/?${query}#listings` : "/#listings";
}

function parseStatus(value: string | null): PropertyStatus | "Todos" | undefined {
  if (value === "Venta" || value === "Alquiler" || value === "Todos") return value;
  return undefined;
}

function parseSort(value: string | null): SortOption | undefined {
  if (
    value === "newest" ||
    value === "price-asc" ||
    value === "price-desc" ||
    value === "area-desc"
  ) {
    return value;
  }
  return undefined;
}

function parseNumber(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function hasCatalogFilterParams(params: URLSearchParams): boolean {
  return FILTER_KEYS.some((key) => {
    if (key === "bedsMin") return params.has("beds");
    if (key === "bathsMin") return params.has("baths");
    if (key === "areaMin") return params.has("area");
    return params.has(key);
  });
}
