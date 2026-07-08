export type PropertyType = "Casa" | "Apartamento" | "Terreno" | "Penthouse";
export type PropertyStatus = "Venta" | "Alquiler";
export type PropertyCurrency = "USD" | "CRC";

export type RentalRates = {
  perDay: number;
  perNight: number;
};

export type Property = {
  id: string;
  title: string;
  location: string;
  zone: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  currency?: PropertyCurrency;
  priceLabel?: string;
  /** Tarifas por día y noche (alquiler corto, ej. cabaña). */
  rentalRates?: RentalRates;
  beds: number;
  baths: number;
  area: number;
  image: string;
  images: string[];
  description: string;
  highlights: string[];
  featured?: boolean;
  new?: boolean;
  tags?: string[];
};

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

/** Lista del catálogo para pickers (agendar, financiar, etc.). */
export function getCatalogProperties(
  filter?: (property: Property) => boolean
): Property[] {
  return filter ? properties.filter(filter) : properties;
}

/** Resuelve una propiedad por id o título (query ?id= / ?propiedad=). */
export function resolvePropertyRef(options?: {
  id?: string | null;
  title?: string | null;
}): Property | undefined {
  const id = options?.id?.trim();
  if (id) {
    return getPropertyById(id);
  }
  const title = options?.title?.trim();
  if (title) {
    return properties.find((p) => p.title === title);
  }
  return undefined;
}

export type PropertySelection = {
  id: string;
  property?: Property;
};

/** Selección inicial para formularios con propiedad precargada. */
export function resolvePropertySelection(options?: {
  id?: string | null;
  title?: string | null;
  filter?: (property: Property) => boolean;
}): PropertySelection {
  const property = resolvePropertyRef({ id: options?.id, title: options?.title });
  if (property && (!options?.filter || options.filter(property))) {
    return { id: property.id, property };
  }
  return { id: "", property: undefined };
}

export function propertyHref(id: string): string {
  return `/propiedades/${id}`;
}

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
  "Cartago",
] as const;

export const properties: Property[] = [
  {
    id: "1",
    title: "Cabaña en alquiler con piscina",
    location: "Orosí, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Alquiler",
    price: 220_000,
    currency: "CRC",
    priceLabel: "/noche",
    rentalRates: {
      perDay: 180_000,
      perNight: 220_000,
    },
    beds: 3,
    baths: 2,
    area: 280,
    image: "/properties/orosi/cover-flyer.png",
    images: [
      "/properties/orosi/cover-flyer.png",
      "/properties/orosi/cover.png",
      "/properties/orosi/gallery.png",
      "/properties/orosi/interior-dining.png",
      "/properties/orosi/kitchen.png",
      "/properties/orosi/stairs.png",
      "/properties/orosi/attic-bedroom.png",
      "/properties/orosi/bedroom.png",
      "/properties/orosi/bathroom.png",
      "/properties/orosi/garden.png",
    ],
    description:
      "Cabaña de madera en Orosí con piscina privada, rancho con asador y amplios jardines. Ideal para descanso en el valle de Orosí, con clima fresco, naturaleza y espacios interiores cómodos para familias o grupos.",
    highlights: [
      "Piscina privada y rancho con asador",
      "Cabaña de madera con techos altos",
      "Jardín amplio y entorno natural",
      "Varias habitaciones y baños completos",
      "Ubicación en Orosí, Cartago",
    ],
    featured: true,
    new: true,
    tags: ["Piscina", "Cabaña"],
  },
  {
    id: "10",
    title: "Casa moderna en Tejar",
    location: "Tejar, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 59_800_000,
    currency: "CRC",
    beds: 3,
    baths: 2,
    area: 170,
    image: "/properties/tejar/cover-flyer.png",
    images: [
      "/properties/tejar/cover-flyer.png",
      "/properties/tejar/exterior.png",
      "/properties/tejar/living-kitchen.png",
      "/properties/tejar/hallway.png",
      "/properties/tejar/bedroom.png",
      "/properties/tejar/bedroom-2.png",
      "/properties/tejar/bathroom.png",
      "/properties/tejar/bathroom-2.png",
    ],
    description:
      "Casa moderna de una planta en Tejar, Cartago, con acabados contemporáneos y distribución funcional. Sala-comedor integrada con cocina, pisos de cerámica de alto brillo, ventanas amplias y dos baños completos. Incluye área de parqueo techado al frente.",
    highlights: [
      "Diseño moderno de una planta",
      "Cocina con barra y topes de granito",
      "Pisos de cerámica pulida",
      "Parqueo techado al frente",
      "Ubicación en Tejar, Cartago",
    ],
    featured: true,
    new: true,
    tags: ["Moderna", "Parqueo"],
  },
  {
    id: "11",
    title: "Cabaña rústica en Palo Verde",
    location: "Palo Verde, San Isidro, El Guarco",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 60_000_000,
    currency: "CRC",
    beds: 4,
    baths: 2,
    area: 180,
    image: "/properties/palo-verde/cover-flyer.png",
    images: [
      "/properties/palo-verde/cover-flyer.png",
      "/properties/palo-verde/cover.png",
      "/properties/palo-verde/living-fireplace.png",
      "/properties/palo-verde/living.png",
      "/properties/palo-verde/dining.png",
      "/properties/palo-verde/kitchen.png",
      "/properties/palo-verde/bedroom.png",
      "/properties/palo-verde/bedroom-bunk.png",
      "/properties/palo-verde/bedroom-bunk-2.png",
      "/properties/palo-verde/bathroom.png",
    ],
    description:
      "Cabaña de madera en Palo Verde, San Isidro, con estilo rústico y entorno natural. Dos plantas con deck de madera, chimenea de piedra en la sala, cocina equipada, varias habitaciones con literas y baño con acabados en madera. Ideal para familia o retiro en zona verde del Guarco.",
    highlights: [
      "Construcción rústica en madera",
      "Chimenea de piedra en sala",
      "Deck y mirador al bosque",
      "Varias habitaciones y literas",
      "Entorno natural en El Guarco",
    ],
    featured: true,
    new: true,
    tags: ["Cabaña", "Chimenea"],
  },
  {
    id: "12",
    title: "Casa moderna en Villa Bonita",
    location: "Paraíso, Villa Bonita",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 72_000_000,
    currency: "CRC",
    beds: 3,
    baths: 2,
    area: 162,
    image: "/properties/villa-bonita/cover-flyer.png",
    images: [
      "/properties/villa-bonita/cover-flyer.png",
      "/properties/villa-bonita/garage.png",
      "/properties/villa-bonita/exterior.png",
      "/properties/villa-bonita/kitchen.png",
      "/properties/villa-bonita/kitchen-2.png",
      "/properties/villa-bonita/bedroom.png",
      "/properties/villa-bonita/bedroom-2.png",
      "/properties/villa-bonita/bedroom-3.png",
      "/properties/villa-bonita/bedroom-4.png",
      "/properties/villa-bonita/bathroom.png",
    ],
    description:
      "Casa moderna de una planta en Paraíso, Villa Bonita, con fachada contemporánea, garaje para dos vehículos y acabados nuevos. Cocina con muebles de madera oscura, pisos de cerámica pulida, tres habitaciones y dos baños completos con ducha de vidrio.",
    highlights: [
      "Garaje para 2 vehículos",
      "Fachada moderna con piedra y rejas",
      "Cocina con barra desayunadora",
      "Pisos de cerámica de alto brillo",
      "Ubicación en Paraíso, Cartago",
    ],
    featured: true,
    new: true,
    tags: ["Moderna", "Garaje"],
  },
];

export const featuredProperties = properties.filter((p) => p.featured);

export type SortOption = "price-asc" | "price-desc" | "area-desc" | "newest";

export type PropertyFilters = {
  zone: string;
  type: string;
  status: PropertyStatus | "Todos";
  priceMin: number;
  priceMax: number;
  bedsMin: string;
  bathsMin: string;
  areaMin: string;
  sort: SortOption;
};

export const defaultFilters: PropertyFilters = {
  zone: "Todas",
  type: "Todos",
  status: "Todos",
  priceMin: 0,
  priceMax: 80_000_000,
  bedsMin: "any",
  bathsMin: "any",
  areaMin: "any",
  sort: "newest",
};

export function formatColones(amount: number, suffix = ""): string {
  const rounded = Math.round(amount);
  return `₡${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${suffix}`;
}

export type PriceSliderConfig = {
  min: number;
  max: number;
  step: number;
  hint: string;
  format: (value: number) => string;
};

export function getPriceSliderConfig(status: PropertyStatus | "Todos"): PriceSliderConfig {
  if (status === "Alquiler") {
    return {
      min: 0,
      max: 2_000_000,
      step: 25_000,
      hint: "Precio mensual en colones",
      format: (v) => formatColones(v, "/mes"),
    };
  }

  return {
    min: 0,
    max: 80_000_000,
    step: 500_000,
    hint:
      status === "Todos"
        ? "Precio de venta en colones (elegí Alquiler en Operación para rentas)"
        : "Precio de venta en colones",
    format: (v) => formatColones(v),
  };
}

/** Rangos de precio según operación (colones) */
export type PriceRangeOption = {
  value: string;
  label: string;
  shortLabel: string;
};

export const priceRanges = {
  sale: [
    { value: "any", label: "Cualquier precio", shortLabel: "Todos" },
    { value: "0-40000000", label: "Hasta ₡40 millones", shortLabel: "< ₡40M" },
    { value: "40000000-60000000", label: "₡40M – ₡60M", shortLabel: "₡40–60M" },
    { value: "60000000-80000000", label: "₡60M – ₡80M", shortLabel: "₡60–80M" },
    { value: "80000000+", label: "Más de ₡80 millones", shortLabel: "₡80M+" },
  ] satisfies PriceRangeOption[],
  rent: [
    { value: "any", label: "Cualquier precio", shortLabel: "Todos" },
    { value: "0-500000", label: "Hasta ₡500.000/mes", shortLabel: "< ₡500k" },
    { value: "500000-1000000", label: "₡500.000 – ₡1M/mes", shortLabel: "₡500k–1M" },
    { value: "1000000+", label: "Más de ₡1M/mes", shortLabel: "₡1M+" },
  ] satisfies PriceRangeOption[],
  all: [
    { value: "any", label: "Cualquier precio", shortLabel: "Todos" },
    { value: "sale-0-60000000", label: "Venta hasta ₡60M", shortLabel: "Venta < ₡60M" },
    { value: "sale-60000000+", label: "Venta más de ₡60M", shortLabel: "Venta ₡60M+" },
    { value: "rent-0-750000", label: "Alquiler hasta ₡750k/mes", shortLabel: "Alq. < ₡750k" },
    { value: "rent-750000+", label: "Alquiler más de ₡750k/mes", shortLabel: "Alq. ₡750k+" },
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

/** Normaliza el precio de una propiedad a colones. */
const CRC_PER_USD = 515;

export function getPropertyPriceAmount(property: Property): number {
  if (property.currency === "USD") {
    return Math.round(property.price * CRC_PER_USD);
  }
  return property.price;
}

function matchesPrice(
  property: Property,
  priceMin: number,
  priceMax: number,
  status: PropertyStatus | "Todos"
): boolean {
  if (status === "Todos") {
    const defaultConfig = getPriceSliderConfig("Todos");
    const isDefaultRange =
      priceMin <= defaultConfig.min && priceMax >= defaultConfig.max;
    if (isDefaultRange) return true;
  }

  const config = getPriceSliderConfig(
    status === "Todos" ? property.status : status
  );

  const comparablePrice = getPropertyPriceAmount(property);

  if (comparablePrice < priceMin) return false;
  if (priceMax >= config.max) return true;
  return comparablePrice <= priceMax;
}

export function filterProperties(
  list: Property[],
  filters: PropertyFilters
): Property[] {
  let result = list.filter((p) => {
    if (filters.zone !== "Todas" && p.zone !== filters.zone) return false;
    if (filters.type !== "Todos" && p.type !== filters.type) return false;
    if (filters.status !== "Todos" && p.status !== filters.status) return false;
    if (!matchesPrice(p, filters.priceMin, filters.priceMax, filters.status)) return false;
    if (filters.bedsMin !== "any" && p.beds < Number(filters.bedsMin)) return false;
    if (filters.bathsMin !== "any" && p.baths < Number(filters.bathsMin)) return false;
    if (filters.areaMin !== "any" && p.area < Number(filters.areaMin)) return false;
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      result = [...result].sort(
        (a, b) => getPropertyPriceAmount(a) - getPropertyPriceAmount(b)
      );
      break;
    case "price-desc":
      result = [...result].sort(
        (a, b) => getPropertyPriceAmount(b) - getPropertyPriceAmount(a)
      );
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

  const priceConfig = getPriceSliderConfig(filters.status);
  const priceActive =
    filters.priceMin > priceConfig.min || filters.priceMax < priceConfig.max;

  if (priceActive) {
    tags.push({
      key: "priceMin",
      label: `${priceConfig.format(filters.priceMin)} – ${priceConfig.format(filters.priceMax)}`,
    });
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

export function formatPrice(
  amount: number,
  label?: string,
  currency: PropertyCurrency = "CRC"
): string {
  if (currency === "USD") {
    const formatted = `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    return label ? `${formatted}${label}` : formatted;
  }
  return formatColones(amount, label ?? "");
}

/** Alquiler corto con tarifa diaria y nocturna (ej. cabaña en Orosí). */
export function isReservationProperty(property: Property): boolean {
  return property.status === "Alquiler" && Boolean(property.rentalRates);
}

export function formatPropertyPrice(property: Property): string {
  if (property.rentalRates) {
    const { perDay, perNight } = property.rentalRates;
    return `${formatColones(perDay, "/día")} · ${formatColones(perNight, "/noche")}`;
  }
  return formatPrice(property.price, property.priceLabel, property.currency);
}

export function formatArea(sqm: number): string {
  return `${sqm} m²`;
}
