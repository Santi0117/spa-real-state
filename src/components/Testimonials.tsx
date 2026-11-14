"use client";

import { useTranslations } from "@/components/LanguageProvider";

export default function Testimonials() {
  const { t } = useTranslations();

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="section-label">{t.testimonials.label}</p>
          <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-navy md:text-6xl">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-6">
          {t.testimonials.items.map((item) => (
            <blockquote
              key={item.name}
              className="flex flex-col border-t-2 border-gold bg-white p-7 shadow-sm shadow-navy/5 lg:p-8"
            >
              <p className="font-display text-5xl leading-none text-gold">&ldquo;</p>
              <p className="font-display mt-3 flex-1 text-lg italic leading-relaxed text-navy/85">
                {item.quote}
              </p>
              <footer className="mt-8">
                <p className="text-sm font-bold text-navy">{item.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-warm">
                  {item.role}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
