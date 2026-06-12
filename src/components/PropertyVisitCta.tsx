import Link from "next/link";
import type { Property } from "@/lib/properties";
import { agendarVisitaHref, financiarHref } from "@/lib/visit-scheduling";

type PropertyVisitCtaProps = {
  property: Property;
  className?: string;
};

export default function PropertyVisitCta({ property, className = "" }: PropertyVisitCtaProps) {
  const visitHref = agendarVisitaHref({ propertyId: property.id });
  const financeHref = financiarHref({ propertyId: property.id });

  return (
    <div
      className={`border border-charcoal/8 bg-white p-6 shadow-sm md:p-8 ${className}`}
    >
      <p className="section-label">Visita presencial</p>
      <h2 className="font-display mt-2 text-2xl font-medium text-charcoal">
        Agendar visita
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-warm">
        Coordiná un recorrido de{" "}
        <span className="font-medium text-charcoal">{property.title}</span> con un asesor de Jopa.
        Elegí día y horario en el formulario.
      </p>
      <div className="mt-6 space-y-3">
        <Link href={visitHref} className="btn-gold w-full justify-center rounded-sm">
          Agendar visita a esta propiedad
        </Link>
        <Link href={financeHref} className="btn-gold w-full justify-center rounded-sm">
          Financiar
        </Link>
      </div>
      <Link
        href="/#listings"
        className="mt-4 block text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-warm transition hover:text-gold"
      >
        Ver más propiedades
      </Link>
    </div>
  );
}
