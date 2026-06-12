import Image from "next/image";

export default function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
            <Image
              src="/properties/2.jpg"
              alt="Equipo Jopa Real Estate"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 left-6 right-6 border border-white/20 bg-charcoal/80 p-5 backdrop-blur-sm">
              <p className="font-display text-3xl font-medium text-white">5+</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/70">
                Años en el mercado CR
              </p>
            </div>
          </div>

          <div>
            <p className="section-label">Sobre nosotros</p>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
              Jopa Real Estate
            </h2>
            <p className="mt-6 leading-relaxed text-slate-warm">
              Nacimos con una misión clara: elevar el estándar inmobiliario en Costa Rica.
              Combinamos marketing de primer nivel, fotografía profesional y negociación
              experta para que cada cliente tenga una experiencia excepcional.
            </p>
            <p className="mt-4 leading-relaxed text-slate-warm">
              Conocemos cada zona, cada condominio y cada detalle legal. Por eso más de
              50 familias confiaron en nosotros para encontrar su hogar ideal.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Fotografía y video profesional incluidos",
                "Valuación gratuita de tu propiedad",
                "Atención bilingüe (ES / EN)",
                "Acompañamiento legal de principio a fin",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-charcoal">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-gold/15 text-gold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
