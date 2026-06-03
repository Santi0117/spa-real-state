import { testimonials } from "@/lib/site";

export default function Testimonials() {
  return (
    <section className="border-t border-charcoal/8 bg-charcoal py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="section-label text-gold-light">Testimonios</p>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-white md:text-5xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:p-8"
            >
              <p className="font-display text-4xl leading-none text-gold/40">&ldquo;</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80">{t.quote}</p>
              <footer className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/50">
                  {t.role}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
