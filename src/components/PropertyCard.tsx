"use client";

import Link from "next/link";
import { formatArea, formatPrice, propertyHref, type Property } from "@/lib/properties";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage, type Translations } from "@/lib/i18n";
import PropertyImage from "./PropertyImage";
import PropertyCardGallery from "./PropertyCardGallery";

type PropertyCardProps = {
  property: Property;
  large?: boolean;
  compact?: boolean;
  showDescription?: boolean;
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

export default function PropertyCard({
  property,
  large,
  compact,
  showDescription,
}: PropertyCardProps) {
  const { t } = useTranslations();

  const imageAspect = large
    ? ""
    : compact
      ? "aspect-[4/3]"
      : "aspect-[4/3]";

  const bodyPadding = compact ? "p-3 sm:p-3.5" : "p-4 lg:p-5";
  const titleClass = compact
    ? "font-display mt-1 text-base font-medium leading-snug text-charcoal group-hover:text-gold sm:text-lg"
    : "font-display mt-1 text-xl font-medium leading-snug text-charcoal group-hover:text-gold lg:text-[1.35rem]";
  const priceClass = compact
    ? "font-display text-lg font-semibold text-white sm:text-xl"
    : "font-display text-2xl font-semibold text-white lg:text-3xl";
  const tagPadding = compact ? "px-2 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]";
  const imagePadding = compact ? "p-3 pt-10" : "p-4 pt-12 lg:p-5 lg:pt-16";
  const statsClass = compact
    ? "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-charcoal/8 pt-3 text-[10px] font-medium uppercase tracking-wide text-slate-warm"
    : "mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-charcoal/8 pt-4 text-[12px] font-medium uppercase tracking-wide text-slate-warm";

  const statusLabel = property.status === "Venta" ? t.property.sale : t.property.rent;
  const typeLabel = translatePropertyType(property.type, t);

  return (
    <article className={`property-card group w-full ${large ? "lg:col-span-2" : ""}`}>
      <Link href={propertyHref(property.id)} className="block min-w-0">
        <div className={`relative w-full min-w-0 overflow-hidden bg-stone-200 ${imageAspect}`}>
          {large && property.images.length > 1 ? (
            <PropertyCardGallery
              images={property.images}
              title={property.title}
              large
              overlay={
                <>
                  <div className="pointer-events-none absolute left-0 top-0 flex gap-px">
                    {property.new && (
                      <span
                        className={`bg-gold font-bold uppercase tracking-wider text-white ${tagPadding}`}
                      >
                        {t.property.new}
                      </span>
                    )}
                    <span
                      className={`bg-charcoal/90 font-bold uppercase tracking-wider text-white ${tagPadding}`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute right-2 top-2 sm:right-3 sm:top-3">
                    <p
                      className={`rounded-sm bg-charcoal/85 px-2 py-1 font-display text-sm font-semibold text-white shadow-sm backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-lg lg:text-xl`}
                    >
                      {formatPrice(property.price, property.priceLabel)}
                    </p>
                  </div>
                </>
              }
            />
          ) : (
            <>
              <PropertyImage src={property.image} alt={property.title} />

              <div className="pointer-events-none absolute left-0 top-0 flex gap-px">
                {property.new && (
                  <span
                    className={`bg-gold font-bold uppercase tracking-wider text-white ${tagPadding}`}
                  >
                    {t.property.new}
                  </span>
                )}
                <span
                  className={`bg-charcoal/90 font-bold uppercase tracking-wider text-white ${tagPadding}`}
                >
                  {statusLabel}
                </span>
              </div>

              <div
                className={`pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent ${imagePadding}`}
              >
                <p className={priceClass}>{formatPrice(property.price, property.priceLabel)}</p>
              </div>
            </>
          )}
        </div>

        <div className={`border border-t-0 border-charcoal/8 bg-white ${bodyPadding}`}>
          <p
            className={`font-semibold uppercase tracking-[0.14em] text-gold ${
              compact ? "text-[9px]" : "text-[10px]"
            }`}
          >
            {typeLabel} · {property.zone}
          </p>
          <h3 className={titleClass}>{property.title}</h3>
          <p className={`text-slate-warm ${compact ? "mt-0.5 text-xs" : "mt-1 text-sm"}`}>
            {property.location}
          </p>

          {showDescription && (
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-warm">
              {property.description}
            </p>
          )}

          <div className={statsClass}>
            <span>{formatMessage(t.property.beds, { count: property.beds })}</span>
            <span className="text-charcoal/20">|</span>
            <span>{formatMessage(t.property.baths, { count: property.baths })}</span>
            <span className="text-charcoal/20">|</span>
            <span>{formatArea(property.area)}</span>
          </div>

          {property.tags && property.tags.length > 0 && (
            <div className={`flex min-w-0 flex-wrap gap-1.5 ${compact ? "mt-2" : "mt-3"}`}>
              {property.tags.map((tag) => (
                <span
                  key={tag}
                  className={`border border-charcoal/10 uppercase tracking-wide text-slate-warm ${
                    compact
                      ? "px-1.5 py-0.5 text-[9px]"
                      : "px-2 py-0.5 text-[10px]"
                  }`}
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
