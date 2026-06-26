"use client";

import Image from "next/image";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import { areas } from "@/lib/site";

export default function Areas() {
  const { t } = useTranslations();

  return (
    <section id="zonas" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="section-label">{t.areas.label}</p>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
            {t.areas.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-warm">{t.areas.description}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {areas.map((area, index) => (
            <a
              key={area.name}
              href="#listings"
              className="group relative aspect-[16/10] overflow-hidden bg-stone-200 sm:aspect-[5/4] lg:aspect-[3/4]"
            >
              <Image
                src={area.image}
                alt={t.areas.items[index].name}
                fill
                quality={92}
                className="object-contain object-center transition duration-700 group-hover:scale-[1.02] max-lg:group-hover:scale-100 sm:object-cover sm:object-center"
                sizes="(max-width: 639px) 100vw, (max-width: 1024px) 50vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-2xl font-medium text-white">
                  {t.areas.items[index].name}
                </p>
                <p className="mt-1 text-sm text-white/70">
                  {t.areas.items[index].description}
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-gold-light">
                  {formatMessage(t.areas.propertiesCount, { count: area.count })}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
