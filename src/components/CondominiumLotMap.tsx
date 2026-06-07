"use client";

import Link from "next/link";
import { useState } from "react";
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

function lotFill(status: CondominiumLot["status"], active: boolean, hovered: boolean) {
  if (active || hovered) {
    if (status === "vendido") return "fill-charcoal stroke-gold";
    if (status === "reservado") return "fill-amber-600/80 stroke-amber-700";
    return "fill-gold stroke-[#a6845d]";
  }
  if (status === "vendido") return "fill-charcoal/25 stroke-charcoal/30";
  if (status === "reservado") return "fill-amber-100 stroke-amber-300/80";
  return "fill-gold-light/50 stroke-gold/40 hover:fill-gold-light/80";
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
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] xl:gap-10">
      <div className="border border-charcoal/10 bg-cream/80 p-4 sm:p-6 md:p-8">
        <svg
          viewBox="0 0 1000 650"
          className="h-auto w-full max-h-[480px]"
          role="img"
          aria-label={`Plano de lotes — Condominio ${condominium.name}`}
        >
          {/* Áreas comunes */}
          <path
            d="M 420 250 L 580 250 L 580 380 L 420 380 Z"
            className="fill-emerald-100/80 stroke-emerald-300/60"
            strokeWidth={2}
          />
          <text x="500" y="320" textAnchor="middle" className="fill-emerald-800 text-[18px] font-medium">
            Parque central
          </text>
          <path
            d="M 820 80 L 960 80 L 960 200 L 820 200 Z"
            className="fill-stone-200 stroke-stone-300"
            strokeWidth={2}
          />
          <text x="890" y="145" textAnchor="middle" className="fill-stone-600 text-[14px]">
            Club house
          </text>
          {/* Calle principal */}
          <path
            d="M 40 220 L 960 220 L 960 240 L 40 240 Z"
            className="fill-stone-300/70 stroke-none"
          />
          <path
            d="M 40 400 L 960 400 L 960 418 L 40 418 Z"
            className="fill-stone-300/70 stroke-none"
          />

          {condominium.lots.map((lot) => {
            const isActive = active.id === lot.id;
            const isHovered = hovered?.id === lot.id;
            const isExternalActive = activeLotId === lot.id;

            return (
              <g key={lot.id}>
                <path
                  d={lot.path}
                  onClick={() => selectLot(lot)}
                  onMouseEnter={() => setHovered(lot)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(lot)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${lot.label} — ${lotStatusLabels[lot.status]}`}
                  aria-pressed={isActive || isExternalActive}
                  className={`cursor-pointer outline-none transition-all duration-300 ease-out stroke-[2] focus-visible:stroke-gold ${lotFill(
                    lot.status,
                    isActive || isExternalActive,
                    isHovered
                  )}`}
                  style={{
                    filter:
                      isActive || isHovered || isExternalActive
                        ? "drop-shadow(0 4px 12px rgb(184 149 108 / 0.35))"
                        : "none",
                  }}
                />
                <text
                  x={lot.path.match(/M (\d+)/)?.[1] ?? 0}
                  y={Number(lot.path.match(/M \d+ (\d+)/)?.[1] ?? 0) + 24}
                  className="pointer-events-none fill-charcoal/70 text-[13px] font-semibold"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {lot.label.replace("Lote ", "")}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="mt-4 text-center text-xs text-slate-warm lg:text-left">
          Pasá el cursor sobre un lote para ver detalles · Tocá para seleccionar
        </p>
      </div>

      <div
        className={`border p-6 transition-all duration-300 md:p-7 ${
          hovered
            ? "border-gold bg-gold/5 shadow-lg shadow-gold/10"
            : "border-charcoal/10 bg-white"
        }`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
          {display.label}
        </p>
        <h3 className="font-display mt-2 text-2xl font-medium tracking-tight text-charcoal">
          {lotStatusLabels[display.status]}
        </h3>
        <p className="mt-1 font-display text-xl font-semibold text-gold">
          {formatPrice(display.price)}
        </p>
        <p className="mt-1 text-sm text-slate-warm">{formatArea(display.areaM2)}</p>

        <p className="mt-5 text-sm leading-relaxed text-charcoal/85">{display.description}</p>

        <ul className="mt-4 space-y-2">
          {display.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-slate-warm"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>

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
