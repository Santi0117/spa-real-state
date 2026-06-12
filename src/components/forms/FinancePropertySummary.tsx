"use client";

import Image from "next/image";
import { formatPrice, type Property } from "@/lib/properties";

type FinancePropertySummaryProps = {
  property?: Property;
  title: string;
  price: number;
  onChange?: () => void;
};

export default function FinancePropertySummary({
  property,
  title,
  price,
  onChange,
}: FinancePropertySummaryProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-charcoal/10 bg-white">
      <div className="border-b border-charcoal/8 bg-cream/60 px-4 py-3 sm:px-6">
        <p className="section-label">Resumen</p>
      </div>

      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_220px] lg:items-center">
        <div>
          <p className="text-sm text-slate-warm">Valor total de la propiedad</p>
          <p className="font-display mt-1 text-4xl font-semibold text-gold sm:text-5xl">
            {formatPrice(price)}
          </p>
          <p className="font-display mt-4 text-xl font-medium text-charcoal">{title}</p>
          {property ? (
            <p className="mt-1 text-sm text-slate-warm">{property.location}</p>
          ) : null}

          <div className="mt-5 overflow-hidden rounded-sm border border-charcoal/8">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-charcoal/8">
                  <td className="px-4 py-3 text-slate-warm">{title}</td>
                  <td className="px-4 py-3 text-right font-medium text-charcoal">
                    {formatPrice(price)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {onChange ? (
            <button
              type="button"
              onClick={onChange}
              className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-warm transition hover:text-gold"
            >
              Elegir otra propiedad
            </button>
          ) : null}
        </div>

        {property ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-charcoal/10 lg:aspect-square">
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="220px"
              className="object-cover"
            />
            <div className="absolute left-3 top-3 rounded-sm bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              Financiá esta propiedad
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
