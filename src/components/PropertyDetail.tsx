"use client";

import Link from "next/link";
import { BackLink } from "./BackLink";
import PropertyGallery from "./PropertyGallery";
import PropertyVisitCta from "./PropertyVisitCta";
import { useTranslations } from "@/components/LanguageProvider";
import {
  formatArea,
  formatPrice,
  type Property,
} from "@/lib/properties";
import { type Translations } from "@/lib/i18n";
import { agendarVisitaHref, financiarHref } from "@/lib/visit-scheduling";

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
  const visitHref = agendarVisitaHref({ propertyId: property.id });
  const financeHref = financiarHref({ propertyId: property.id });
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
              <span className="bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {t.property.new}
              </span>
            )}
            <span className="bg-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {statusLabel}
            </span>
            <span className="border border-charcoal/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal">
              {typeLabel}
            </span>
          </div>

          <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            {property.title}
          </h1>
          <p className="mt-2 text-lg text-slate-warm">{property.location}</p>
          <p className="font-display mt-4 text-3xl font-semibold text-gold md:text-4xl">
            {formatPrice(property.price, property.priceLabel, property.currency)}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-charcoal/8 py-6 sm:grid-cols-4">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                {t.propertyDetail.zone}
              </dt>
              <dd className="mt-1 font-medium text-charcoal">{property.zone}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                {t.propertyDetail.bedrooms}
              </dt>
              <dd className="mt-1 font-medium text-charcoal">{property.beds}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                {t.propertyDetail.bathrooms}
              </dt>
              <dd className="mt-1 font-medium text-charcoal">{property.baths}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                {t.propertyDetail.area}
              </dt>
              <dd className="mt-1 font-medium text-charcoal">{formatArea(property.area)}</dd>
            </div>
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
                    className="border border-charcoal/10 bg-white px-3 py-1 text-[11px] uppercase tracking-wide text-slate-warm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="mt-10 space-y-3 border-t border-charcoal/8 pt-8 lg:hidden">
            <Link href={visitHref} className="btn-gold w-full justify-center rounded-sm">
              {t.propertyDetail.scheduleVisitProperty}
            </Link>
            <Link href={financeHref} className="btn-gold w-full justify-center rounded-sm">
              {t.common.finance}
            </Link>
          </div>
        </div>

        <aside className="mt-10 lg:sticky lg:top-28 lg:mt-0 lg:self-start">
          <PropertyVisitCta property={property} />
        </aside>
      </div>
    </div>
  );
}
