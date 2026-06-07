import { services } from "@/lib/site";

export default function Services() {
  return (
    <section
      id="servicios"
      className="border-y border-[#a6845d]/50 bg-gold py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
              Lo que hacemos
            </p>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-white md:text-5xl">
              Servicios integrales
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/85">
              Más que una inmobiliaria: somos tu aliado en cada etapa del proceso,
              con atención personalizada y conocimiento profundo del mercado costarricense.
            </p>
            <a href="#contacto" className="btn-gold-inverse mt-8 inline-flex">
              Consultar gratis
            </a>
          </div>

          <div className="grid gap-px bg-white/15 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-charcoal p-6 lg:p-8"
              >
                <div className="mb-4 h-px w-8 bg-gold-light" />
                <h3 className="font-display text-xl font-medium text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
