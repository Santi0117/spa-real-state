"use client";

import Link from "next/link";
import { BackLink } from "./BackLink";
import PropertyGallery from "./PropertyGallery";
import PropertyVisitCta from "./PropertyVisitCta";
import { useTranslations } from "@/components/LanguageProvider";
import {
  canFinance,
  formatArea,
  formatPropertyPrice,
  isReservationProperty,
  type Property,
} from "@/lib/properties";
import { type Translations } from "@/lib/i18n";
import { financiarHref, schedulingHref } from "@/lib/visit-scheduling";

type PropertyDetailProps = {
  property: Property;
};

function translatePropertyType(type: Property["type"], t: Translations) {
  switch (type) {
    case "Casa":
      return t.search.house;
    case "Apartamento":
      return t.search.apartment;
    case "Terreno":
      return t.search.land;
    case "Penthouse":
      return t.search.penthouse;
    default:
      return type;
  }
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const { t } = useTranslations();
  const reservation = isReservationProperty(property);
  const scheduleHref = schedulingHref(property);
  const financeHref = financiarHref({ propertyId: property.id });
  const financeable = canFinance(property);
  const statusLabel = property.status === "Venta" ? t.property.sale : t.property.rent;
  const typeLabel = translatePropertyType(property.type, t);

  return (
    <div className="mx-auto min-w-0 max-w-7xl px-4 sm:px-6">
      <BackLink href="/#listings">{t.common.backToCatalog}</BackLink>

      <div className="mt-8 min-w-0 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-10 xl:gap-14">
        <div className="min-w-0">
          <PropertyGallery images={property.images} title={property.title} />

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {property.new && (
              <span className="bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
                {t.property.new}
              </span>
            )}
            <span className="bg-navy px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              {statusLabel}
            </span>
            <span className="rounded-full border border-navy/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
              {typeLabel}
            </span>
          </div>

          <h1 className="font-display mt-4 text-4xl font-normal tracking-tight text-navy md:text-6xl">
            {property.title}
          </h1>
          <p className="mt-2 text-lg text-slate-warm">{property.location}</p>
          <p className="mt-5 text-2xl font-bold text-navy md:text-3xl">
            {formatPropertyPrice(property)}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-navy/15 py-6 sm:grid-cols-4">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                {t.propertyDetail.zone}
              </dt>
              <dd className="font-display mt-1 text-xl text-navy">{property.zone}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                {t.propertyDetail.bedrooms}
              </dt>
              <dd className="font-display mt-1 text-xl text-navy">{property.beds}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                {t.propertyDetail.bathrooms}
              </dt>
              <dd className="font-display mt-1 text-xl text-navy">{property.baths}</dd>
            </div>
            {property.area ? (
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                  {t.propertyDetail.area}
                </dt>
                <dd className="font-display mt-1 text-xl text-navy">{formatArea(property.area)}</dd>
              </div>
            ) : null}
          </dl>

          <section className="mt-10">
            <h2 className="section-label">{t.propertyDetail.description}</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/90">{property.description}</p>
          </section>

          <section className="mt-10">
            <h2 className="section-label">{t.propertyDetail.features}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {property.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-charcoal/85"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {property.tags && property.tags.length > 0 && (
            <section className="mt-10">
              <h2 className="section-label">{t.propertyDetail.tags}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-navy/30 px-3 py-1 text-xs text-navy/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 space-y-3 border-t border-navy/15 pt-8 lg:hidden">
            <Link href={scheduleHref} className="btn-gold w-full justify-center">
              {reservation
                ? t.propertyDetail.scheduleReservationProperty
                : t.propertyDetail.scheduleVisitProperty}
            </Link>
            {financeable ? (
              <Link href={financeHref} className="btn-navy w-full justify-center">
                {t.common.finance}
              </Link>
            ) : null}
          </div>
        </div>

        <aside className="mt-10 lg:sticky lg:top-28 lg:mt-0 lg:self-start">
          <PropertyVisitCta property={property} />
        </aside>
      </div>
    </div>
  );
}
