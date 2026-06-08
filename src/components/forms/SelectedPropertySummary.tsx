"use client";

import Image from "next/image";
import type { Property } from "@/lib/properties";

type SelectedPropertySummaryProps = {
  property?: Property;
  title: string;
  onChange?: () => void;
};

export default function SelectedPropertySummary({
  property,
  title,
  onChange,
}: SelectedPropertySummaryProps) {
  return (
    <div className="rounded-sm border border-gold/30 bg-gold/5 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
        Visita para esta propiedad
      </p>
      <div className="mt-3 flex gap-4">
        {property ? (
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border border-charcoal/10">
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-medium leading-snug text-charcoal">{title}</p>
          {property ? (
            <p className="mt-1 text-xs text-slate-warm">{property.location}</p>
          ) : null}
        </div>
      </div>
      {onChange ? (
        <button
          type="button"
          onClick={onChange}
          className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-warm transition hover:text-gold"
        >
          Elegir otra propiedad
        </button>
      ) : null}
    </div>
  );
}
