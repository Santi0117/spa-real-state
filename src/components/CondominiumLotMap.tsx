"use client";

import Link from "next/link";
import { useState } from "react";
import { googleMapsUrl } from "@/lib/maps";
import {
  getLotMapShape,
  lotMapAmenities,
  lotMapRoads,
  lotMapViewBox,
} from "@/lib/condominium-lot-map";
import {
  lotStatusLabels,
  type Condominium,
  type CondominiumLot,
} from "@/lib/condominiums";
import { formatArea, formatPrice } from "@/lib/properties";

type CondominiumLotMapProps = {
  condominium: Condominium;
  activeLotId?: string;
  onLotSelect?: (lot: CondominiumLot) => void;
};

function lotShortLabel(label: string) {
  return label.replace("Lote ", "");
}

function lotPathClass(lot: CondominiumLot, highlighted: boolean) {
  if (highlighted) {
    return "fill-gold stroke-[#a6845d]";
  }
  if (lot.status === "vendido") {
    return "fill-neutral-300 hover:fill-neutral-400";
  }
  if (lot.status === "reservado") {
    return "fill-amber-100 hover:fill-gold-light/70";
  }
  return "fill-neutral-200 hover:fill-gold-light/60";
}

export default function CondominiumLotMap({
  condominium,
  activeLotId,
  onLotSelect,
}: CondominiumLotMapProps) {
  const defaultLot =
    condominium.lots.find((l) => l.id === activeLotId) ??
    condominium.lots.find((l) => l.status === "disponible") ??
    condominium.lots[0];

  const [active, setActive] = useState<CondominiumLot>(defaultLot);
  const [hovered, setHovered] = useState<CondominiumLot | null>(null);

  const display = hovered ?? active;

  function selectLot(lot: CondominiumLot) {
    setActive(lot);
    onLotSelect?.(lot);
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
      <div className="border border-charcoal/10 bg-cream/50 p-4 sm:p-6 md:p-8">
        <svg
          viewBox={lotMapViewBox}
          className="h-auto max-h-[520px] w-full"
          role="img"
          aria-label={`Mapa interactivo de lotes — Condominio ${condominium.name}`}
        >
          {/* Calles */}
          {lotMapRoads.map((road, i) => (
            <rect
              key={`road-${i}`}
              x={road.x}
              y={road.y}
              width={road.width}
              height={road.height}
              className="fill-neutral-300"
              rx={2}
            />
          ))}

          {/* Club house */}
          <path
            d={lotMapAmenities.clubHouse.path}
            className="fill-neutral-300/90 stroke-neutral-400"
            strokeWidth={1}
            pointerEvents="none"
          />
          <text
            x={lotMapAmenities.clubHouse.labelX}
            y={lotMapAmenities.clubHouse.labelY}
            textAnchor="middle"
            className="pointer-events-none fill-neutral-600 text-[12px] font-medium"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {lotMapAmenities.clubHouse.label}
          </text>

          {/* Lotes */}
          {condominium.lots.map((lot) => {
            const shape = getLotMapShape(lot.id);
            if (!shape) return null;

            const isActive = active.id === lot.id || activeLotId === lot.id;
            const isHovered = hovered?.id === lot.id;
            const highlighted = isActive || isHovered;

            return (
              <g key={lot.id}>
                <path
                  d={shape.path}
                  onClick={() => selectLot(lot)}
                  onMouseEnter={() => setHovered(lot)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(lot)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${lot.label} — ${lotStatusLabels[lot.status]}`}
                  aria-pressed={highlighted}
                  className={`cursor-pointer outline-none transition-all duration-300 ease-out stroke-white stroke-[2] focus-visible:fill-gold focus-visible:stroke-gold ${lotPathClass(
                    lot,
                    highlighted
                  )}`}
                  style={{
                    filter: highlighted
                      ? "drop-shadow(0 4px 12px rgb(184 149 108 / 0.35))"
                      : "none",
                  }}
                />
                <text
                  x={shape.labelX}
                  y={shape.labelY}
                  textAnchor="middle"
                  className="pointer-events-none fill-charcoal/60 text-[12px] font-semibold"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {lotShortLabel(lot.label)}
                </text>
              </g>
            );
          })}
        </svg>

        <p className="mt-4 text-center text-xs text-slate-warm lg:text-left">
          Tocá o pasá el cursor sobre un lote
        </p>
        <a
          href={googleMapsUrl(`Condominio ${condominium.name}, ${condominium.location}, Costa Rica`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wider text-slate-warm transition hover:text-gold lg:mt-1"
        >
          Google Maps ↗
        </a>
      </div>

      <div
        className={`border p-6 transition-all duration-300 md:p-7 ${
          hovered
            ? "border-gold bg-gold/5 shadow-lg shadow-gold/10"
            : "border-charcoal/10 bg-white"
        }`}
      >
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          Lote
        </p>
        <h3 className="font-display mb-1 text-2xl font-medium tracking-tight text-charcoal">
          {lotShortLabel(display.label)}
        </h3>
        <p className="mb-6 text-sm text-slate-warm">
          {lotStatusLabels[display.status]} · {formatArea(display.areaM2)}
        </p>

        <dl className="space-y-4 text-sm">
          <div>
            <dt className="mb-1 text-slate-warm">Precio</dt>
            <dd className="font-display text-xl font-semibold text-gold">
              {formatPrice(display.price)}
            </dd>
          </div>
          <div>
            <dt className="mb-1 text-slate-warm">Descripción</dt>
            <dd className="leading-relaxed text-charcoal/85">{display.description}</dd>
          </div>
          <div>
            <dt className="mb-1 text-slate-warm">Características</dt>
            <dd className="text-charcoal/80">
              <ul className="space-y-1.5">
                {display.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {display.status === "disponible" && (
          <Link
            href={`/agendar-visita?propiedad=${encodeURIComponent(
              `Condominio ${condominium.name} — ${display.label}`
            )}`}
            className="btn-gold mt-8 inline-flex w-full justify-center rounded-sm"
          >
            Agendar visita
          </Link>
        )}
      </div>
    </div>
  );
}
