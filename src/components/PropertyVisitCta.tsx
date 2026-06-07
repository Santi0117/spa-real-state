import Link from "next/link";
import type { Property } from "@/lib/properties";

type PropertyVisitCtaProps = {
  property: Property;
  className?: string;
};

export default function PropertyVisitCta({ property, className = "" }: PropertyVisitCtaProps) {
  const visitHref = `/agendar-visita?id=${encodeURIComponent(property.id)}`;

  return (
    <div
      className={`border border-charcoal/8 bg-white p-6 shadow-sm md:p-8 ${className}`}
    >
      <p className="section-label">Visita presencial</p>
      <h2 className="font-display mt-2 text-2xl font-medium text-charcoal">
        Agendar visita
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-warm">
        Coordiná un recorrido de esta propiedad con un asesor de Jopa. Elegí día y horario en el
        formulario.
      </p>
      <Link href={visitHref} className="btn-gold mt-6 w-full justify-center rounded-sm">
        Agendar visita
      </Link>
      <Link
        href="/#listings"
        className="mt-4 block text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-warm transition hover:text-gold"
      >
        Ver más propiedades
      </Link>
    </div>
  );
}
