"use client";

import Link from "next/link";
import { formatArea, formatPropertyPrice, propertyHref, type Property } from "@/lib/properties";
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

  const titleClass = compact
    ? "font-display text-base font-medium leading-snug text-navy transition group-hover:text-gold sm:text-lg"
    : "font-display text-xl font-medium leading-snug text-navy transition group-hover:text-gold lg:text-2xl";
  const tagPadding = compact ? "px-2 py-1 text-[9px]" : "px-3 py-1.5 text-[10px]";

  const statusLabel = property.status === "Venta" ? t.property.sale : t.property.rent;
  const typeLabel = translatePropertyType(property.type, t);
  const priceText = formatPropertyPrice(property);
  const imageTag =
    property.status === "Venta" && !property.priceOnRequest ? priceText : statusLabel;
  const stats = [
    formatMessage(t.property.beds, { count: property.beds }),
    formatMessage(t.property.baths, { count: property.baths }),
    ...(property.area ? [formatArea(property.area)] : []),
  ];

  const tagsOverlay = (
    <div
      className={`pointer-events-none absolute right-0 z-10 flex flex-col items-end gap-1.5 ${
        compact ? "top-2" : "top-4"
      }`}
    >
      <div className={`flex gap-1 ${compact ? "mr-2" : "mr-4"}`}>
        {property.new && (
          <span className={`bg-gold font-bold uppercase tracking-[0.14em] text-navy ${tagPadding}`}>
            {t.property.new}
          </span>
        )}
        <span className={`bg-white font-bold uppercase tracking-[0.14em] text-navy ${tagPadding}`}>
          {statusLabel}
        </span>
      </div>
      {imageTag !== statusLabel && (
        <span className={`tag-arrow-left ${compact ? "!text-[9px]" : "sm:!text-[11px]"}`}>
          {imageTag}
        </span>
      )}
    </div>
  );

  return (
    <article className="property-card group @container w-full min-w-0">
      <Link href={propertyHref(property.id)} className="block min-w-0">
        <div className="relative w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm shadow-navy/5 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-navy/15">
          {property.images.length > 1 ? (
            <PropertyCardGallery
              images={property.images}
              title={property.title}
              large={large}
              overlay={tagsOverlay}
            />
          ) : (
            <div className="relative">
              <PropertyImage src={property.image} alt={property.title} large={large} />
              {tagsOverlay}
            </div>
          )}
        </div>

        <div
          className={`grid gap-x-5 gap-y-3 border-t border-navy/25 @md:grid-cols-[minmax(0,1fr)_auto] ${
            compact ? "mt-3 pt-3" : "mt-4 pt-4"
          }`}
        >
          <div className="min-w-0">
            <p
              className={`font-semibold uppercase tracking-[0.22em] text-navy/60 ${
                compact ? "text-[9px]" : "text-[10px]"
              }`}
            >
              {typeLabel} · {property.zone}
            </p>
            <h3 className={`mt-1.5 ${titleClass}`}>{property.title}</h3>
            <p className={`text-slate-warm ${compact ? "mt-0.5 text-xs" : "mt-1 text-sm"}`}>
              {property.location}
            </p>
            {showDescription && (
              <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-warm">
                {property.description}
              </p>
            )}
          </div>

          <div className="min-w-0 @md:max-w-[15rem] @md:text-right">
            <p
              className={`font-bold leading-snug text-navy ${
                compact ? "text-sm" : "text-base lg:text-lg"
              }`}
            >
              {priceText}
            </p>
            <p
              className={`mt-1 flex flex-wrap gap-x-2 text-slate-warm @md:justify-end ${
                compact ? "text-[10px]" : "text-xs"
              }`}
            >
              {stats.map((item, index) => (
                <span key={item} className="flex gap-2">
                  {index > 0 && <span className="text-navy/25">|</span>}
                  {item}
                </span>
              ))}
            </p>
            {property.tags && property.tags.length > 0 && (
              <div className={`flex min-w-0 flex-wrap gap-1.5 @md:justify-end ${compact ? "mt-2" : "mt-3"}`}>
                {property.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border border-navy/30 text-navy/80 ${
                      compact ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-0.5 text-[11px]"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
