import { getPropertyById } from "./properties";

export type LotStatus = "disponible" | "reservado" | "vendido";

export type CondominiumLot = {
  id: string;
  label: string;
  path: string;
  areaM2: number;
  price: number;
  status: LotStatus;
  description: string;
  features: string[];
  propertyId?: string;
};

export type Condominium = {
  id: string;
  slug: string;
  name: string;
  location: string;
  zone: string;
  description: string;
  image: string;
  priceFrom: number;
  tags: string[];
  amenities: string[];
  propertyIds: string[];
  lots: CondominiumLot[];
};

/** Polígono helper → path SVG */
function lotRect(x: number, y: number, w: number, h: number, skew = 0): string {
  return `M ${x} ${y} L ${x + w + skew} ${y} L ${x + w} ${y + h} L ${x - skew} ${y + h} Z`;
}

export const vistaVerde: Condominium = {
  id: "vista-verde",
  slug: "vista-verde",
  name: "Vista Verde",
  location: "Santa Ana, San José",
  zone: "Santa Ana",
  description:
    "Condominio residencial de baja densidad con calles internas, áreas verdes y lotes listos para construir o propiedades llave en mano. Seguridad 24/7, acceso controlado y vista al valle central.",
  image: "/properties/2.jpg",
  priceFrom: 148000,
  tags: ["Seguridad 24/7", "Lotes", "Club house"],
  amenities: [
    "Garita y vigilancia 24/7",
    "Áreas verdes y senderos",
    "Red de agua y electricidad",
    "Calles asfaltadas",
    "Casa club y parque infantil",
  ],
  propertyIds: ["2", "4"],
  lots: [
    {
      id: "lote-a1",
      label: "Lote A-1",
      path: lotRect(60, 80, 200, 140, 8),
      areaM2: 420,
      price: 185000,
      status: "disponible",
      description: "Lote esquinero con vista abierta al valle. Ideal para casa de dos niveles.",
      features: ["Esquinero", "Vista", "420 m²"],
    },
    {
      id: "lote-a2",
      label: "Lote A-2",
      path: lotRect(280, 80, 180, 140),
      areaM2: 380,
      price: 168000,
      status: "disponible",
      description: "Lote plano con acceso directo a calle principal interna.",
      features: ["Plano", "380 m²"],
    },
    {
      id: "lote-a3",
      label: "Lote A-3",
      path: lotRect(480, 80, 200, 140, -6),
      areaM2: 410,
      price: 178000,
      status: "reservado",
      description: "Reservado — lote con topografía suave y orientación este.",
      features: ["410 m²", "Reservado"],
    },
    {
      id: "lote-a4",
      label: "Lote A-4",
      path: lotRect(700, 80, 220, 140, 10),
      areaM2: 450,
      price: 195000,
      status: "disponible",
      description: "El lote más amplio de la fila A. Espacio para jardín y piscina.",
      features: ["450 m²", "Jardín amplio"],
    },
    {
      id: "lote-b1",
      label: "Lote B-1",
      path: lotRect(60, 260, 190, 130, -5),
      areaM2: 360,
      price: 155000,
      status: "vendido",
      description: "Vendido — casa en construcción.",
      features: ["360 m²", "Vendido"],
      propertyId: "2",
    },
    {
      id: "lote-b2",
      label: "Lote B-2",
      path: lotRect(270, 260, 190, 130),
      areaM2: 370,
      price: 162000,
      status: "disponible",
      description: "A pasos del parque central del condominio.",
      features: ["370 m²", "Cerca del parque"],
    },
    {
      id: "lote-b3",
      label: "Lote B-3",
      path: lotRect(480, 260, 200, 130, 6),
      areaM2: 395,
      price: 172000,
      status: "disponible",
      description: "Lote con servicios completos y permisos al día.",
      features: ["395 m²", "Servicios listos"],
    },
    {
      id: "lote-b4",
      label: "Lote B-4",
      path: lotRect(700, 260, 220, 130),
      areaM2: 430,
      price: 188000,
      status: "disponible",
      description: "Residencia moderna terminada — lista para habitar.",
      features: ["430 m²", "Casa terminada"],
      propertyId: "4",
    },
    {
      id: "lote-c1",
      label: "Lote C-1",
      path: lotRect(120, 430, 180, 120),
      areaM2: 340,
      price: 148000,
      status: "disponible",
      description: "Lote en zona tranquila, ideal para primera vivienda.",
      features: ["340 m²"],
    },
    {
      id: "lote-c2",
      label: "Lote C-2",
      path: lotRect(330, 430, 190, 120, -4),
      areaM2: 355,
      price: 152000,
      status: "reservado",
      description: "Reservado — pendiente de firma.",
      features: ["355 m²", "Reservado"],
    },
    {
      id: "lote-c3",
      label: "Lote C-3",
      path: lotRect(550, 430, 180, 120),
      areaM2: 350,
      price: 150000,
      status: "disponible",
      description: "Terreno con vista parcial al club house.",
      features: ["350 m²", "Vista club"],
    },
    {
      id: "lote-c4",
      label: "Lote C-4",
      path: lotRect(760, 430, 180, 120, 5),
      areaM2: 365,
      price: 158000,
      status: "disponible",
      description: "Último lote disponible en fila C con acceso rápido a la garita.",
      features: ["365 m²", "Acceso garita"],
    },
  ],
};

export const condominiums: Condominium[] = [vistaVerde];

export function getCondominiumBySlug(slug: string): Condominium | undefined {
  return condominiums.find((c) => c.slug === slug);
}

export function getLotById(condo: Condominium, lotId: string): CondominiumLot | undefined {
  return condo.lots.find((l) => l.id === lotId);
}

export function getCondominiumProperties(condo: Condominium) {
  return condo.propertyIds
    .map((id) => getPropertyById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}

export function getLotCoverImage(lot: CondominiumLot, index: number): string {
  if (lot.propertyId) {
    const linked = getPropertyById(lot.propertyId);
    if (linked) return linked.image;
  }
  const pool = [1, 3, 5, 6, 7, 8, 9];
  return `/properties/${pool[index % pool.length]}.jpg`;
}

export function countAvailableLots(condo: Condominium): number {
  return condo.lots.filter((l) => l.status === "disponible").length;
}

export function condominiumHref(slug: string): string {
  return `/condominios/${slug}`;
}

export function getAllCondominiumSlugs(): string[] {
  return condominiums.map((c) => c.slug);
}

export const lotStatusLabels: Record<LotStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};
