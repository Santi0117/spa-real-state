"use client";

import { useTranslations } from "@/components/LanguageProvider";

export default function Services() {
  const { t } = useTranslations();

  return (
    <section id="servicios" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <p className="section-label">{t.services.label}</p>
            <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-navy md:text-6xl">
              {t.services.title}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-slate-warm">
              {t.services.description}
            </p>
            <a href="#contacto" className="btn-navy mt-8">
              {t.services.cta}
            </a>
            <div className="mt-12 flex items-center gap-4">
              <p className="font-display text-5xl font-normal text-navy">5+</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-warm">
                {t.about.badge}
              </p>
            </div>
          </div>

          <div className="divide-y divide-navy/15">
            {t.services.items.map((service) => (
              <div
                key={service.title}
                className="grid gap-2 py-7 first:pt-0 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8"
              >
                <h3 className="font-display text-2xl font-medium text-navy">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-warm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
