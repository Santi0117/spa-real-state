import Link from "next/link";
import { BackLink } from "./BackLink";
import PropertyGallery from "./PropertyGallery";
import PropertyVisitCta from "./PropertyVisitCta";
import {
  formatArea,
  formatPrice,
  type Property,
} from "@/lib/properties";
import { agendarVisitaHref } from "@/lib/visit-scheduling";

type PropertyDetailProps = {
  property: Property;
};

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const visitHref = agendarVisitaHref({ propertyId: property.id });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <BackLink href="/#listings">← Volver al catálogo</BackLink>

      <div className="mt-8 lg:grid lg:grid-cols-[1fr_320px] lg:items-start lg:gap-10 xl:gap-14">
        <div>
          <PropertyGallery images={property.images} title={property.title} />

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {property.new && (
              <span className="bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Nueva
              </span>
            )}
            <span className="bg-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {property.status}
            </span>
            <span className="border border-charcoal/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal">
              {property.type}
            </span>
          </div>

          <h1 className="font-display mt-4 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            {property.title}
          </h1>
          <p className="mt-2 text-lg text-slate-warm">{property.location}</p>
          <p className="font-display mt-4 text-3xl font-semibold text-gold md:text-4xl">
            {formatPrice(property.price, property.priceLabel)}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-charcoal/8 py-6 sm:grid-cols-4">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                Zona
              </dt>
              <dd className="mt-1 font-medium text-charcoal">{property.zone}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                Habitaciones
              </dt>
              <dd className="mt-1 font-medium text-charcoal">{property.beds}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                Baños
              </dt>
              <dd className="mt-1 font-medium text-charcoal">{property.baths}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                Área
              </dt>
              <dd className="mt-1 font-medium text-charcoal">{formatArea(property.area)}</dd>
            </div>
          </dl>

          <section className="mt-10">
            <h2 className="section-label">Descripción</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/90">{property.description}</p>
          </section>

          <section className="mt-10">
            <h2 className="section-label">Características</h2>
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
              <h2 className="section-label">Etiquetas</h2>
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

          <div className="mt-10 border-t border-charcoal/8 pt-8 lg:hidden">
            <Link href={visitHref} className="btn-gold w-full justify-center rounded-sm">
              Agendar visita a esta propiedad
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
