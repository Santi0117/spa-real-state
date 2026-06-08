"use client";

import Link from "next/link";
import { useState } from "react";
import { BackLink } from "./BackLink";
import CondominiumLotMap from "./CondominiumLotMap";
import LotCard from "./LotCard";
import PropertyCard from "./PropertyCard";
import PropertyImage from "./PropertyImage";
import {
  countAvailableLots,
  getCondominiumProperties,
  type Condominium,
  type CondominiumLot,
} from "@/lib/condominiums";
import { formatPrice } from "@/lib/properties";

type CondominiumDetailProps = {
  condominium: Condominium;
};

export default function CondominiumDetail({ condominium }: CondominiumDetailProps) {
  const properties = getCondominiumProperties(condominium);
  const available = countAvailableLots(condominium);
  const [activeLotId, setActiveLotId] = useState<string | undefined>();

  function handleLotSelect(lot: CondominiumLot) {
    setActiveLotId(lot.id);
    const el = document.getElementById(`lot-${lot.id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <BackLink href="/#listings">← Volver al catálogo</BackLink>

      <article className="property-card mt-8 overflow-hidden border border-charcoal/8 bg-white">
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-200 lg:aspect-[2/1]">
          <PropertyImage
            src={condominium.image}
            alt={`Condominio ${condominium.name}`}
          />
          <div className="absolute left-0 top-0 flex gap-px">
            <span className="bg-charcoal/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Condominio
            </span>
            {available > 0 && (
              <span className="bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {available} disponibles
              </span>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/85 to-transparent p-5 pt-16 lg:p-8 lg:pt-20">
            <p className="font-display text-3xl font-semibold text-white lg:text-4xl">
              Desde {formatPrice(condominium.priceFrom)}
            </p>
          </div>
        </div>

        <div className="p-5 lg:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
            Condominio · {condominium.zone}
          </p>
          <h1 className="font-display mt-1 text-3xl font-medium leading-snug text-charcoal md:text-4xl lg:text-5xl">
            Condominio {condominium.name}
          </h1>
          <p className="mt-2 text-lg text-slate-warm">{condominium.location}</p>
          <p className="mt-6 max-w-3xl leading-relaxed text-charcoal/90">
            {condominium.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {condominium.amenities.map((item) => (
              <li
                key={item}
                className="border border-charcoal/10 bg-cream/50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-charcoal/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </article>

      <section className="mt-14">
        <p className="section-label">Plano interactivo</p>
        <h2 className="font-display mt-2 text-2xl font-medium text-charcoal md:text-3xl">
          Mapa de lotes
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-warm">
          Pasá el cursor sobre cada lote para ver precio, área y disponibilidad.
        </p>
        <div className="mt-8">
          <CondominiumLotMap
            condominium={condominium}
            activeLotId={activeLotId}
            onLotSelect={handleLotSelect}
          />
        </div>
      </section>

      {properties.length > 0 && (
        <section className="mt-16 border-t border-charcoal/8 pt-14">
          <p className="section-label">Propiedades en el condominio</p>
          <h2 className="font-display mt-2 text-2xl font-medium text-charcoal md:text-3xl">
            Casas y apartamentos
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                compact
                showDescription
              />
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 border-t border-charcoal/8 pt-14 pb-4">
        <p className="section-label">Lotes y terrenos</p>
        <h2 className="font-display mt-2 text-2xl font-medium text-charcoal md:text-3xl">
          Disponibles en {condominium.name}
        </h2>
        <p className="mt-2 text-sm text-slate-warm">
          Cada lote incluye descripción, área y estado de disponibilidad.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {condominium.lots.map((lot, index) => (
            <LotCard
              key={lot.id}
              lot={lot}
              index={index}
              condominiumName={condominium.name}
              highlighted={activeLotId === lot.id}
              showFullDescription
            />
          ))}
        </div>
      </section>
    </div>
  );
}
