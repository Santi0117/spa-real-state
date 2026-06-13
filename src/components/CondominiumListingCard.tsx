"use client";

import Link from "next/link";
import {
  countAvailableLots,
  condominiumHref,
  type Condominium,
} from "@/lib/condominiums";
import { formatPrice } from "@/lib/properties";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import PropertyImage from "./PropertyImage";

type CondominiumListingCardProps = {
  condominium: Condominium;
};

export default function CondominiumListingCard({
  condominium,
}: CondominiumListingCardProps) {
  const { t } = useTranslations();
  const available = countAvailableLots(condominium);

  return (
    <article className="property-card group">
      <Link href={condominiumHref(condominium.slug)} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
          <PropertyImage
            src={condominium.image}
            alt={`${t.condominium.badge} ${condominium.name}`}
          />

          <div className="absolute left-0 top-0 flex gap-px">
            <span className="bg-charcoal/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
              {t.condominium.badge}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4 pt-12 lg:p-5 lg:pt-16">
            <p className="font-display text-2xl font-semibold text-white lg:text-3xl">
              {formatPrice(condominium.priceFrom)}
            </p>
          </div>
        </div>

        <div className="border border-t-0 border-charcoal/8 bg-white p-4 lg:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
            {formatMessage(t.condominium.zoneLabel, { zone: condominium.zone })}
          </p>
          <h3 className="font-display mt-1 text-xl font-medium leading-snug text-charcoal group-hover:text-gold lg:text-[1.35rem]">
            {t.condominium.badge} {condominium.name}
          </h3>
          <p className="mt-1 text-sm text-slate-warm">{condominium.location}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-charcoal/8 pt-4 text-[12px] font-medium uppercase tracking-wide text-slate-warm">
            <span>{formatMessage(t.condominium.lots, { count: condominium.lots.length })}</span>
            <span className="text-charcoal/20">|</span>
            <span>{formatMessage(t.condominium.houses, { count: condominium.propertyIds.length })}</span>
            <span className="text-charcoal/20">|</span>
            <span>{formatMessage(t.condominium.availableShort, { count: available })}</span>
          </div>

          {condominium.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {condominium.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-charcoal/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-warm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
