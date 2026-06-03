export type PropertyType = "Casa" | "Apartamento" | "Terreno" | "Penthouse";
export type PropertyStatus = "Venta" | "Alquiler";

export type Property = {
  id: string;
  title: string;
  location: string;
  zone: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  priceLabel?: string;
  beds: number;
  baths: number;
  area: number;
  image: string;
  featured?: boolean;
  new?: boolean;
  tags?: string[];
};

export const propertyTypes: PropertyType[] = [
  "Casa",
  "Apartamento",
  "Terreno",
  "Penthouse",
];

export const zones = [
  "Todas",
  "Escazú",
  "Santa Ana",
  "Heredia",
  "Jacó",
  "Curridabat",
] as const;

export const properties: Property[] = [
  {
    id: "1",
    title: "Villa contemporánea con vista",
    location: "Escazú, San José",
    zone: "Escazú",
    type: "Casa",
    status: "Venta",
    price: 485000,
    beds: 4,
    baths: 3.5,
    area: 320,
    image: "/properties/1.jpg",
    featured: true,
    new: true,
    tags: ["Piscina", "Vista"],
  },
  {
    id: "2",
    title: "Residencia de arquitectura moderna",
    location: "Santa Ana, San José",
    zone: "Santa Ana",
    type: "Casa",
    status: "Venta",
    price: 620000,
    beds: 5,
    baths: 4,
    area: 410,
    image: "/properties/2.jpg",
    featured: true,
    tags: ["Jardín", "Smart home"],
  },
  {
    id: "3",
    title: "Casa minimalista con piscina",
    location: "Escazú, San José",
    zone: "Escazú",
    type: "Casa",
    status: "Venta",
    price: 395000,
    beds: 3,
    baths: 2.5,
    area: 245,
    image: "/properties/3.jpg",
    featured: true,
    tags: ["Piscina"],
  },
  {
    id: "4",
    title: "Penthouse en condominio exclusivo",
    location: "Santa Ana, San José",
    zone: "Santa Ana",
    type: "Penthouse",
    status: "Venta",
    price: 750000,
    beds: 4,
    baths: 3,
    area: 280,
    image: "/properties/4.jpg",
    featured: true,
    tags: ["Terraza", "Amueblado"],
  },
  {
    id: "5",
    title: "Apartamento de lujo amueblado",
    location: "Curridabat, San José",
    zone: "Curridabat",
    type: "Apartamento",
    status: "Alquiler",
    price: 2200,
    priceLabel: "/mes",
    beds: 2,
    baths: 2,
    area: 120,
    image: "/properties/5.jpg",
    tags: ["Amueblado", "Gimnasio"],
  },
  {
    id: "6",
    title: "Casa colonial renovada",
    location: "Heredia Centro",
    zone: "Heredia",
    type: "Casa",
    status: "Venta",
    price: 310000,
    beds: 4,
    baths: 3,
    area: 290,
    image: "/properties/6.jpg",
    tags: ["Jardín", "Estacionamiento"],
  },
  {
    id: "7",
    title: "Villa frente al océano",
    location: "Jacó, Puntarenas",
    zone: "Jacó",
    type: "Casa",
    status: "Venta",
    price: 890000,
    beds: 5,
    baths: 4.5,
    area: 380,
    image: "/properties/7.jpg",
    new: true,
    tags: ["Playa", "Piscina infinita"],
  },
  {
    id: "8",
    title: "Casa familiar en condominio",
    location: "Heredia, San Rafael",
    zone: "Heredia",
    type: "Casa",
    status: "Venta",
    price: 275000,
    beds: 3,
    baths: 2,
    area: 195,
    image: "/properties/8.jpg",
    tags: ["Seguridad 24/7"],
  },
  {
    id: "9",
    title: "Apartamento con vista panorámica",
    location: "Escazú, San José",
    zone: "Escazú",
    type: "Apartamento",
    status: "Alquiler",
    price: 1800,
    priceLabel: "/mes",
    beds: 2,
    baths: 2,
    area: 95,
    image: "/properties/9.jpg",
    tags: ["Vista", "Pet friendly"],
  },
];

export const featuredProperties = properties.filter((p) => p.featured);

export type SortOption = "price-asc" | "price-desc" | "area-desc" | "newest";

export type PropertyFilters = {
  zone: string;
  type: string;
  status: PropertyStatus | "Todos";
  priceRange: string;
  bedsMin: string;
  bathsMin: string;
  areaMin: string;
  sort: SortOption;
};

export const defaultFilters: PropertyFilters = {
  zone: "Todas",
  type: "Todos",
  status: "Todos",
  priceRange: "any",
  bedsMin: "any",
  bathsMin: "any",
  areaMin: "any",
  sort: "newest",
};

/** Rangos de precio según operación (venta en USD, alquiler USD/mes) */
export type PriceRangeOption = {
  value: string;
  label: string;
  shortLabel: string;
};

export const priceRanges = {
  sale: [
    { value: "any", label: "Cualquier precio", shortLabel: "Todos" },
    { value: "0-300000", label: "Hasta $300,000", shortLabel: "< $300k" },
    { value: "300000-500000", label: "$300k – $500k", shortLabel: "$300–500k" },
    { value: "500000-750000", label: "$500k – $750k", shortLabel: "$500–750k" },
    { value: "750000+", label: "Más de $750,000", shortLabel: "$750k+" },
  ] satisfies PriceRangeOption[],
  rent: [
    { value: "any", label: "Cualquier precio", shortLabel: "Todos" },
    { value: "0-1500", label: "Hasta $1,500/mes", shortLabel: "< $1.5k" },
    { value: "1500-2500", label: "$1,500 – $2,500/mes", shortLabel: "$1.5–2.5k" },
    { value: "2500+", label: "Más de $2,500/mes", shortLabel: "$2.5k+" },
  ] satisfies PriceRangeOption[],
  all: [
    { value: "any", label: "Cualquier precio", shortLabel: "Todos" },
    { value: "sale-0-400000", label: "Venta hasta $400k", shortLabel: "Venta < $400k" },
    { value: "sale-400000-750000", label: "Venta $400k – $750k", shortLabel: "Venta $400–750k" },
    { value: "sale-750000+", label: "Venta más de $750k", shortLabel: "Venta $750k+" },
    { value: "rent-0-2000", label: "Alquiler hasta $2k/mes", shortLabel: "Alq. < $2k" },
    { value: "rent-2000+", label: "Alquiler más de $2k/mes", shortLabel: "Alq. $2k+" },
  ] satisfies PriceRangeOption[],
} as const;

export const bedOptions = [
  { value: "any", label: "Habitaciones" },
  { value: "1", label: "1+ hab" },
  { value: "2", label: "2+ hab" },
  { value: "3", label: "3+ hab" },
  { value: "4", label: "4+ hab" },
  { value: "5", label: "5+ hab" },
];

export const bathOptions = [
  { value: "any", label: "Baños" },
  { value: "1", label: "1+ baño" },
  { value: "2", label: "2+ baños" },
  { value: "3", label: "3+ baños" },
  { value: "4", label: "4+ baños" },
];

export const areaOptions = [
  { value: "any", label: "Área m²" },
  { value: "100", label: "100+ m²" },
  { value: "200", label: "200+ m²" },
  { value: "300", label: "300+ m²" },
  { value: "400", label: "400+ m²" },
];

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Más recientes" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "area-desc", label: "Área: mayor a menor" },
];

function parseRange(range: string): { min: number; max: number } | null {
  if (range === "any") return null;
  if (range.endsWith("+")) {
    return { min: Number(range.replace("+", "")), max: Infinity };
  }
  const [min, max] = range.split("-").map(Number);
  return { min, max: max ?? Infinity };
}

function matchesPrice(property: Property, priceRange: string, status: string): boolean {
  if (priceRange === "any") return true;

  if (priceRange.startsWith("sale-")) {
    if (property.status !== "Venta") return false;
    const raw = priceRange.replace("sale-", "");
    const r = parseRange(raw);
    if (!r) return true;
    return property.price >= r.min && property.price <= r.max;
  }

  if (priceRange.startsWith("rent-")) {
    if (property.status !== "Alquiler") return false;
    const r = parseRange(priceRange.replace("rent-", ""));
    if (!r) return true;
    return property.price >= r.min && property.price <= r.max;
  }

  const r = parseRange(priceRange);
  if (!r) return true;

  if (status === "Alquiler" || (status === "Todos" && property.status === "Alquiler")) {
    if (property.status !== "Alquiler") return status !== "Alquiler";
  }

  return property.price >= r.min && property.price <= r.max;
}

export function filterProperties(
  list: Property[],
  filters: PropertyFilters
): Property[] {
  let result = list.filter((p) => {
    if (filters.zone !== "Todas" && p.zone !== filters.zone) return false;
    if (filters.type !== "Todos" && p.type !== filters.type) return false;
    if (filters.status !== "Todos" && p.status !== filters.status) return false;
    if (!matchesPrice(p, filters.priceRange, filters.status)) return false;
    if (filters.bedsMin !== "any" && p.beds < Number(filters.bedsMin)) return false;
    if (filters.bathsMin !== "any" && p.baths < Number(filters.bathsMin)) return false;
    if (filters.areaMin !== "any" && p.area < Number(filters.areaMin)) return false;
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "area-desc":
      result = [...result].sort((a, b) => b.area - a.area);
      break;
    case "newest":
      result = [...result].sort((a, b) => Number(b.new) - Number(a.new));
      break;
  }

  return result;
}

export function getPriceRangeOptions(status: PropertyStatus | "Todos") {
  if (status === "Venta") return priceRanges.sale;
  if (status === "Alquiler") return priceRanges.rent;
  return priceRanges.all;
}

export type ActiveFilterTag = {
  key: keyof PropertyFilters;
  label: string;
};

export function getActiveFilterTags(filters: PropertyFilters): ActiveFilterTag[] {
  const tags: ActiveFilterTag[] = [];

  if (filters.status !== "Todos") {
    tags.push({ key: "status", label: filters.status });
  }

  if (filters.priceRange !== "any") {
    const opt = getPriceRangeOptions(filters.status).find(
      (o) => o.value === filters.priceRange
    );
    if (opt) tags.push({ key: "priceRange", label: opt.label });
  }

  if (filters.zone !== "Todas") {
    tags.push({ key: "zone", label: filters.zone });
  }

  if (filters.type !== "Todos") {
    tags.push({ key: "type", label: filters.type });
  }

  if (filters.bedsMin !== "any") {
    const opt = bedOptions.find((o) => o.value === filters.bedsMin);
    if (opt) tags.push({ key: "bedsMin", label: opt.label });
  }

  if (filters.bathsMin !== "any") {
    const opt = bathOptions.find((o) => o.value === filters.bathsMin);
    if (opt) tags.push({ key: "bathsMin", label: opt.label });
  }

  if (filters.areaMin !== "any") {
    const opt = areaOptions.find((o) => o.value === filters.areaMin);
    if (opt) tags.push({ key: "areaMin", label: opt.label });
  }

  if (filters.sort !== "newest") {
    const opt = sortOptions.find((o) => o.value === filters.sort);
    if (opt) tags.push({ key: "sort", label: opt.label });
  }

  return tags;
}

export function formatPrice(amount: number, label?: string): string {
  const formatted = amount >= 10000
    ? `$${amount.toLocaleString("en-US")}`
    : `$${amount.toLocaleString("en-US")}`;
  return label ? `${formatted}${label}` : formatted;
}

export function formatArea(sqm: number): string {
  return `${sqm} m²`;
}
