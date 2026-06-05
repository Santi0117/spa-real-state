import Link from "next/link";
import { formatArea, formatPrice, propertyHref, type Property } from "@/lib/properties";
import PropertyImage from "./PropertyImage";

type PropertyCardProps = {
  property: Property;
  large?: boolean;
};

export default function PropertyCard({ property, large }: PropertyCardProps) {
  return (
    <article className={`property-card group ${large ? "lg:col-span-2" : ""}`}>
      <Link href={propertyHref(property.id)} className="block">
        <div
          className={`relative overflow-hidden bg-stone-200 ${
            large ? "aspect-[16/10] lg:aspect-[2/1]" : "aspect-[4/3]"
          }`}
        >
          <PropertyImage src={property.image} alt={property.title} />

          <div className="absolute left-0 top-0 flex gap-px">
            {property.new && (
              <span className="bg-gold px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Nueva
              </span>
            )}
            <span className="bg-charcoal/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
              {property.status}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4 pt-12 lg:p-5 lg:pt-16">
            <p className="font-display text-2xl font-semibold text-white lg:text-3xl">
              {formatPrice(property.price, property.priceLabel)}
            </p>
          </div>
        </div>

        <div className="border border-t-0 border-charcoal/8 bg-white p-4 lg:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
            {property.type} · {property.zone}
          </p>
          <h3 className="font-display mt-1 text-xl font-medium leading-snug text-charcoal group-hover:text-gold lg:text-[1.35rem]">
            {property.title}
          </h3>
          <p className="mt-1 text-sm text-slate-warm">{property.location}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-charcoal/8 pt-4 text-[12px] font-medium uppercase tracking-wide text-slate-warm">
            <span>{property.beds} hab</span>
            <span className="text-charcoal/20">|</span>
            <span>{property.baths} baños</span>
            <span className="text-charcoal/20">|</span>
            <span>{formatArea(property.area)}</span>
          </div>

          {property.tags && property.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {property.tags.map((tag) => (
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
