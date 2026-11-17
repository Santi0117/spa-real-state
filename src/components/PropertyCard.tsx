"use client";

import Link from "next/link";
import PropertyCardGallery from "./PropertyCardGallery";
import { formatArea, formatPropertyPrice, propertyHref, type Property } from "@/lib/properties";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage, type Translations } from "@/lib/i18n";

type PropertyCardProps = {
  property: Property;
  compact?: boolean;
  showDescription?: boolean;
  featured?: boolean;
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
  compact,
  showDescription,
  featured,
}: PropertyCardProps) {
  const { t } = useTranslations();

  const statusLabel = property.status === "Venta" ? t.property.sale : t.property.rent;
  const typeLabel = translatePropertyType(property.type, t);
  const specs = [
    formatMessage(t.property.beds, { count: property.beds }),
    formatMessage(t.property.baths, { count: property.baths }),
    ...(property.area ? [formatArea(property.area)] : []),
  ].join(" · ");

  return (
    <article className="property-card group w-full min-w-0">
      <Link
        href={propertyHref(property.id)}
        className="flex h-full flex-col overflow-hidden rounded-[18px] bg-white text-navy shadow-[0_10px_30px_rgba(28,51,89,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(28,51,89,0.14)] md:rounded-[20px]"
      >
        <PropertyCardGallery
          images={property.images.length > 0 ? property.images : [property.image]}
          title={property.title}
          badge={
            property.new && (
              <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-navy">
                {t.property.new}
              </span>
            )
          }
        />

        <div
          className={`flex flex-1 flex-col gap-1.5 md:gap-2 ${
            compact ? "p-4" : "px-[18px] pb-[18px] pt-4 md:px-[22px] md:pb-6 md:pt-5"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-warm">
            {statusLabel} · {typeLabel}
          </span>
          <h3
            className={`font-display leading-[1.2] transition group-hover:text-gold ${
              compact ? "text-lg" : featured ? "text-xl md:text-2xl" : "text-xl md:text-[22px]"
            }`}
          >
            {property.title}
          </h3>
          <span className="text-xs text-slate-warm md:text-[13px]">{property.location}</span>
          {showDescription && (
            <p className="line-clamp-3 text-xs leading-relaxed text-slate-warm">{property.description}</p>
          )}
          <div className="mt-auto pt-1.5 md:pt-2.5">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-navy/8 pt-3 md:pt-3.5">
              <span className="text-xs text-slate-warm md:text-[13px]">{specs}</span>
              <span className={`font-bold text-navy ${featured ? "text-sm md:text-base" : "text-sm md:text-[15px]"}`}>
                {formatPropertyPrice(property)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
