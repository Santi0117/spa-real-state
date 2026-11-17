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
  /** Sin precio publicado: se muestra "Precio a consultar" y no entra en financiamiento. */
  priceOnRequest?: boolean;
  /** Tarifas por día y noche (alquiler corto, ej. cabaña). */
  rentalRates?: RentalRates;
  beds: number;
  baths: number;
  /** m² de construcción; se omite cuando no está publicado. */
  area?: number;
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
    image: "/properties/orosi/portada.png",
    images: [
      "/properties/orosi/portada.png",
      "/properties/orosi/cover.png",
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
    image: "/properties/tejar/portada.png",
    images: [
      "/properties/tejar/portada.png",
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
    image: "/properties/palo-verde/portada.png",
    images: [
      "/properties/palo-verde/portada.png",
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
    image: "/properties/villa-bonita/portada.png",
    images: [
      "/properties/villa-bonita/portada.png",
      "/properties/villa-bonita/garage.png",
      "/properties/villa-bonita/kitchen.png",
      "/properties/villa-bonita/kitchen-2.png",
      "/properties/villa-bonita/bedroom.png",
      "/properties/villa-bonita/bedroom-2.png",
      "/properties/villa-bonita/bedroom-3.png",
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
  {
    id: "13",
    title: "Casa con vista en Urbanización Takiscu",
    location: "Urbanización Takiscu, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 530_000,
    currency: "USD",
    beds: 3,
    baths: 2.5,
    image: "/properties/takiscu-530/portada.jpg",
    images: [
      "/properties/takiscu-530/portada.jpg",
      "/properties/takiscu-530/living-view.jpg",
      "/properties/takiscu-530/kitchen.jpg",
      "/properties/takiscu-530/kitchen-dining.jpg",
      "/properties/takiscu-530/family-room.jpg",
      "/properties/takiscu-530/bedroom.jpg",
      "/properties/takiscu-530/bedroom-2.jpg",
      "/properties/takiscu-530/bedroom-3.jpg",
      "/properties/takiscu-530/bathroom.jpg",
      "/properties/takiscu-530/stairs.jpg",
      "/properties/takiscu-530/rancho-pool.jpg",
    ],
    description:
      "Propiedad exclusiva en Urbanización Takiscu, Cartago, con ventanales de piso a techo y vista al valle. Habitación principal con baño privado, walk-in clóset y balcón, sala principal, sala privada y rancho de entretenimiento con mesa de pool, minibar y baño. Se vende con menaje completo, $65.000 por debajo de su avalúo ($595.000).",
    highlights: [
      "Principal con baño privado, walk-in clóset y balcón",
      "Rancho con mesa de pool, minibar y baño",
      "Amplias áreas verdes para fogatas",
      "Estacionamiento para hasta 4 vehículos",
      "Incluye menaje completo",
    ],
    new: true,
    tags: ["Vista", "Amueblada"],
  },
  {
    id: "14",
    title: "Casa de dos pisos en Urbanización Takiscu",
    location: "Urbanización Takiscu, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 515_000,
    currency: "USD",
    beds: 3,
    baths: 2.5,
    area: 220,
    image: "/properties/takiscu-515/portada.jpg",
    images: [
      "/properties/takiscu-515/portada.jpg",
      "/properties/takiscu-515/garden.jpg",
      "/properties/takiscu-515/dining.jpg",
      "/properties/takiscu-515/kitchen.jpg",
      "/properties/takiscu-515/family-room.jpg",
      "/properties/takiscu-515/bedroom.jpg",
      "/properties/takiscu-515/garage.jpg",
    ],
    description:
      "Casa amplia y elegante en un terreno de 1.500 m², con 220 m² de construcción en dos pisos. Cocina con cuarto de alacena, sala familiar y sala privada en el segundo piso, terraza, balcón, cuarto de lavandería y un jardín amplio para disfrutar en familia.",
    highlights: [
      "Terreno de 1.500 m²",
      "Cocina con cuarto de alacena",
      "Sala familiar y sala privada",
      "Terraza, balcón y amplio jardín",
      "Cochera para 2 vehículos",
    ],
    new: true,
    tags: ["Jardín", "2 pisos"],
  },
  {
    id: "15",
    title: "Casa de 2 habitaciones en Senderos del Este",
    location: "Senderos del Este, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 60_000_000,
    currency: "CRC",
    beds: 2,
    baths: 2,
    image: "/properties/senderos-del-este-60/portada.jpg",
    images: [
      "/properties/senderos-del-este-60/portada.jpg",
      "/properties/senderos-del-este-60/living.jpg",
      "/properties/senderos-del-este-60/kitchen.jpg",
      "/properties/senderos-del-este-60/hallway.jpg",
      "/properties/senderos-del-este-60/bedroom.jpg",
      "/properties/senderos-del-este-60/bedroom-2.jpg",
      "/properties/senderos-del-este-60/bathroom.jpg",
      "/properties/senderos-del-este-60/backyard.jpg",
    ],
    description:
      "Casa nueva en Senderos del Este, ideal para comenzar con casa propia. Dos habitaciones, dos baños completos, sala, cocina y comedor, patio de pilas y zona verde, con cochera para un vehículo.",
    highlights: [
      "2 baños completos",
      "Sala, cocina y comedor",
      "Zona verde y patio de pilas",
      "Cochera para 1 vehículo",
    ],
    new: true,
    tags: ["Nueva", "Patio"],
  },
  {
    id: "16",
    title: "Casa amueblada de 3 habitaciones en Senderos del Este",
    location: "Agua Caliente, Senderos del Este, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 65_000_000,
    currency: "CRC",
    beds: 3,
    baths: 2,
    image: "/properties/senderos-del-este-65/portada.jpg",
    images: [
      "/properties/senderos-del-este-65/portada.jpg",
      "/properties/senderos-del-este-65/living-kitchen.jpg",
      "/properties/senderos-del-este-65/kitchen.jpg",
      "/properties/senderos-del-este-65/bedroom.jpg",
      "/properties/senderos-del-este-65/bedroom-2.jpg",
      "/properties/senderos-del-este-65/bedroom-3.jpg",
      "/properties/senderos-del-este-65/bedroom-4.jpg",
      "/properties/senderos-del-este-65/bathroom.jpg",
      "/properties/senderos-del-este-65/laundry.jpg",
    ],
    description:
      "Casa moderna en el condominio Senderos del Este, Agua Caliente de Cartago. Tres habitaciones amplias, dos baños modernos y dos espacios de parqueo bajo techo, en un terreno de 150 m² con buena distribución. Se vende amueblada.",
    highlights: [
      "Terreno de 150 m²",
      "2 parqueos bajo techo",
      "Amueblada",
      "Dentro de condominio",
    ],
    tags: ["Amueblada", "Condominio"],
  },
  {
    id: "17",
    title: "Casa en Condominio Estación 21",
    location: "Condominio Estación 21, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 0,
    currency: "CRC",
    priceOnRequest: true,
    beds: 3,
    baths: 2,
    image: "/properties/estacion-21/portada.jpg",
    images: [
      "/properties/estacion-21/portada.jpg",
      "/properties/estacion-21/living-kitchen.jpg",
      "/properties/estacion-21/kitchen.jpg",
      "/properties/estacion-21/bedroom.jpg",
      "/properties/estacion-21/bedroom-2.jpg",
      "/properties/estacion-21/bedroom-3.jpg",
      "/properties/estacion-21/closet.jpg",
      "/properties/estacion-21/bathroom.jpg",
      "/properties/estacion-21/bathroom-2.jpg",
      "/properties/estacion-21/backyard.jpg",
    ],
    description:
      "Casa moderna en Condominio Estación 21, Cartago. Tres habitaciones, dos baños completos, sala, comedor y cocina con muebles oscuros, zona verde y patio de pilas. Cochera para dos vehículos y seguridad 24/7 con amenidades.",
    highlights: [
      "Seguridad 24/7 y amenidades",
      "Cochera para 2 vehículos",
      "Zona verde y patio de pilas",
      "Acabados modernos",
    ],
    new: true,
    tags: ["Condominio", "Seguridad 24/7"],
  },
  {
    id: "18",
    title: "Casa de dos niveles en Condominio El Bosque",
    location: "Condominio El Bosque, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 103_000_000,
    currency: "CRC",
    beds: 3,
    baths: 2.5,
    area: 162,
    image: "/properties/el-bosque/portada.jpg",
    images: [
      "/properties/el-bosque/portada.jpg",
      "/properties/el-bosque/living.jpg",
      "/properties/el-bosque/kitchen.jpg",
      "/properties/el-bosque/bedroom.jpg",
      "/properties/el-bosque/bedroom-2.jpg",
      "/properties/el-bosque/bathroom.jpg",
      "/properties/el-bosque/backyard.jpg",
    ],
    description:
      "Casa de dos niveles en Condominio El Bosque, Cartago, con 162 m² de construcción en un terreno de 158 m². Amplia sala, comedor, cocina moderna, patio y cuarto de pilas. El condominio cuenta con seguridad privada 24/7 y áreas verdes.",
    highlights: [
      "162 m² de construcción en 2 niveles",
      "Cocina moderna",
      "Patio y cuarto de pilas",
      "Cochera para 2 vehículos",
      "Seguridad privada 24/7",
    ],
    new: true,
    tags: ["Condominio", "2 niveles"],
  },
  {
    id: "19",
    title: "Cabaña de madera canadiense en Pacayas",
    location: "Pacayas, Cartago",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 230_000_000,
    currency: "CRC",
    beds: 4,
    baths: 2,
    area: 300,
    image: "/properties/pacayas/portada.jpg",
    images: [
      "/properties/pacayas/portada.jpg",
      "/properties/pacayas/living.jpg",
      "/properties/pacayas/living-2.jpg",
      "/properties/pacayas/hallway.jpg",
      "/properties/pacayas/bedroom.jpg",
      "/properties/pacayas/bedroom-2.jpg",
      "/properties/pacayas/bathroom.jpg",
      "/properties/pacayas/bathroom-2.jpg",
      "/properties/pacayas/garage.jpg",
    ],
    description:
      "Cabaña construida en madera de alta calidad importada desde Canadá, en un terreno de 5.242 m² en Pacayas, Cartago. 300 m² de construcción con sala, cocina y comedor, cuarto de alacena, bodega, ático y balcón con vista panorámica. Extensa zona verde para disfrutar de la naturaleza. Precio negociable.",
    highlights: [
      "Terreno de 5.242 m²",
      "Madera canadiense de alta calidad",
      "Balcón con vista panorámica",
      "Bodega, ático y cuarto de alacena",
      "Cochera para 2 vehículos",
    ],
    new: true,
    tags: ["Cabaña", "Vista"],
  },
  {
    id: "20",
    title: "Segunda casa moderna en Villa Bonita",
    location: "Paraíso, Villa Bonita",
    zone: "Cartago",
    type: "Casa",
    status: "Venta",
    price: 69_800_000,
    currency: "CRC",
    beds: 3,
    baths: 2,
    image: "/properties/villa-bonita-2/portada.jpg",
    images: [
      "/properties/villa-bonita-2/portada.jpg",
      "/properties/villa-bonita-2/garage.jpg",
      "/properties/villa-bonita-2/living.jpg",
      "/properties/villa-bonita-2/living-2.jpg",
      "/properties/villa-bonita-2/kitchen.jpg",
      "/properties/villa-bonita-2/bedroom.jpg",
      "/properties/villa-bonita-2/bedroom-2.jpg",
      "/properties/villa-bonita-2/bedroom-3.jpg",
      "/properties/villa-bonita-2/bathroom.jpg",
    ],
    description:
      "Casa en Villa Bonita, Paraíso, con la misma infraestructura de la casa vecina ya publicada. Terreno de 162 m², tres habitaciones (la principal con walk-in clóset), dos baños, cielos altos y buena iluminación natural. Portón eléctrico, patio interno con lavandería techada y parqueo para dos vehículos bajo techo.",
    highlights: [
      "Principal con walk-in clóset",
      "Parqueo para 2 vehículos bajo techo",
      "Portón eléctrico",
      "Cielos altos y buena iluminación",
      "Patio interno con lavandería techada",
    ],
    tags: ["Moderna", "Garaje"],
  },
];

export const featuredProperties = properties.filter((p) => p.featured);

export const zones = ["Todas", ...new Set(properties.map((p) => p.zone))];

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
  priceMax: 300_000_000,
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
    max: 300_000_000,
    step: 1_000_000,
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
    if (filters.areaMin !== "any" && (p.area ?? 0) < Number(filters.areaMin)) return false;
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
      result = [...result].sort((a, b) => (b.area ?? 0) - (a.area ?? 0));
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

/** Venta con precio publicado: puede calcular cuota en financiamiento. */
export function canFinance(property: Property): boolean {
  return property.status === "Venta" && !property.priceOnRequest;
}

export function formatPropertyPrice(property: Property): string {
  if (property.priceOnRequest) return "Precio a consultar";
  if (property.rentalRates) {
    const { perDay, perNight } = property.rentalRates;
    return `${formatColones(perDay, "/día")} · ${formatColones(perNight, "/noche")}`;
  }
  return formatPrice(property.price, property.priceLabel, property.currency);
}

export function formatArea(sqm: number): string {
  return `${sqm} m²`;
}
