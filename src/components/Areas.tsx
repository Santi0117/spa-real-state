"use client";

import Image from "next/image";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import { areas } from "@/lib/site";

export default function Areas() {
  const { t } = useTranslations();

  return (
    <section id="zonas" className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="section-label-gold">{t.areas.label}</p>
            <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-white md:text-6xl">
              {t.areas.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/80 md:pb-2">{t.areas.description}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {areas.map((area, index) => (
            <a
              key={area.name}
              href="#listings"
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-[3/4]"
            >
              <Image
                src={area.image}
                alt={t.areas.items[index].name}
                fill
                quality={92}
                className="object-cover object-center transition duration-700 group-hover:scale-[1.02] max-lg:group-hover:scale-100"
                sizes="(max-width: 639px) 100vw, (max-width: 1024px) 50vw, 320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" />
              <span className="tag-arrow absolute left-0 top-5 !normal-case !tracking-normal">
                {formatMessage(t.areas.propertiesCount, { count: area.count })}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display text-3xl font-normal text-white">
                  {t.areas.items[index].name}
                </p>
                <p className="mt-1 text-sm text-white/75">
                  {t.areas.items[index].description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
