"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import {
  formatArea,
  formatPropertyPrice,
  getPropertyById,
  propertyHref,
} from "@/lib/properties";

const SLIDE_MS = 6500;

const slides = [
  {
    propertyId: "1",
    src: "/hero/orosi-laptop.jpg",
    mobileSrc: "/hero/orosi-celular.jpg",
    position: "50% 60%",
  },
  {
    propertyId: "13",
    src: "/hero/takiscu-laptop.jpg",
    mobileSrc: "/hero/takiscu-celular.jpg",
    position: "45% 50%",
  },
  {
    propertyId: "19",
    src: "/hero/pacayas-laptop.jpg",
    mobileSrc: "/hero/pacayas-celular.jpg",
    position: "40% 55%",
  },
];

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function SlideImage({
  src,
  mobileSrc,
  position,
  alt,
  active,
  priority,
}: {
  src: string;
  mobileSrc?: string;
  position: string;
  alt: string;
  active: boolean;
  priority: boolean;
}) {
  const common = { alt, fill: true, sizes: "100vw", quality: 90, priority };
  const { props: desktop } = getImageProps({ ...common, src });
  const { props: mobile } = getImageProps({ ...common, src: mobileSrc ?? src });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
      <img
        {...mobile}
        alt={alt}
        aria-hidden={!active}
        className={`hero-slide object-cover ${active ? "hero-slide-active" : ""}`}
        style={{ ...mobile.style, objectPosition: position }}
      />
    </picture>
  );
}

export default function Hero() {
  const { t } = useTranslations();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active]);

  const property = getPropertyById(slides[active].propertyId);
  const specs = property
    ? [
        formatMessage(t.property.beds, { count: property.beds }),
        formatMessage(t.property.baths, { count: property.baths }),
        ...(property.area ? [formatArea(property.area)] : []),
      ].join(" · ")
    : "";

  return (
    <section className="relative flex h-[100svh] min-h-[660px] flex-col overflow-hidden bg-[#14100c] md:max-h-[900px] md:min-h-[720px]">
      {slides.map((slide, index) => (
        <SlideImage
          key={slide.src}
          src={slide.src}
          mobileSrc={slide.mobileSrc}
          position={slide.position}
          alt={getPropertyById(slide.propertyId)?.title ?? t.hero.imageAlt}
          active={index === active}
          priority={index === 0}
        />
      ))}

      <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(12,9,6,0.6)_0%,rgba(12,9,6,0.25)_45%,rgba(12,9,6,0)_70%)] md:block" />
      <div aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(12,9,6,0.85)_0%,rgba(12,9,6,0.35)_32%,rgba(12,9,6,0)_60%)] md:block" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,9,6,0.9)_0%,rgba(12,9,6,0.55)_42%,rgba(12,9,6,0.05)_68%,rgba(12,9,6,0)_80%)] md:hidden" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,9,6,0.55)_0%,rgba(12,9,6,0)_18%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-end gap-6 px-5 pb-8 pt-28 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-8 md:px-12 md:pb-[72px]">
        <div className="max-w-[680px]">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/12 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md md:gap-3 md:px-5 md:py-2.5 md:text-xs md:tracking-[0.22em]">
            <span aria-hidden className="h-0.5 w-[18px] rounded-full bg-gold md:w-6" />
            <span className="md:hidden">{t.hero.labelShort}</span>
            <span className="hidden md:inline">{t.hero.label}</span>
          </p>
          <h1 className="font-display mt-[18px] text-[46px] font-normal leading-[1.04] tracking-[-0.01em] text-white md:mt-6 md:text-[clamp(3.75rem,6vw,5.25rem)] md:leading-[1.02]">
            {t.hero.titleLine1}
            <span className="block italic text-gold">{t.hero.titleLine2}</span>
          </h1>
          <p className="mt-3.5 max-w-[520px] text-[15px] leading-relaxed text-white/88 md:mt-[22px] md:text-[17px] md:leading-[1.65]">
            {t.hero.description}
          </p>
          <div className="mt-[22px] flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center md:mt-[34px] md:gap-3.5">
            <a
              href="#listings"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-navy transition hover:bg-cream md:py-[17px]"
            >
              {t.hero.viewProperties}
              <ArrowIcon />
            </a>
            <Link
              href="/agendar-visita"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/50 bg-white/6 px-[26px] py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 md:py-[17px]"
            >
              {t.cta.schedule}
              <ArrowIcon />
            </Link>
          </div>
        </div>

        {property && (
          <div className="flex flex-col gap-3 md:max-w-[360px] md:items-end">
            {slides.length > 1 && (
              <div className="flex gap-2" role="group">
                {slides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={formatMessage(t.hero.showSlide, { count: index + 1 })}
                    aria-current={index === active ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === active ? "w-8 bg-gold" : "w-3 bg-white/45 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
            <Link
              href={propertyHref(property.id)}
              className="flex w-full items-center gap-3.5 rounded-2xl border border-white/22 bg-white/12 px-4 py-3.5 text-white backdrop-blur-[14px] transition hover:bg-white/18 md:gap-[18px] md:rounded-[20px] md:px-5 md:py-[18px]"
            >
              <span key={property.id} className="hero-card-text flex min-w-0 flex-1 flex-col gap-[3px] md:gap-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold md:text-[10px]">
                  {t.hero.inPhoto}
                </span>
                <span className="text-[13px] font-semibold md:text-[15px]">{property.title}</span>
                <span className="text-[11px] text-white/80 md:text-xs">
                  {specs} · {formatPropertyPrice(property)}
                </span>
              </span>
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-navy md:h-11 md:w-11"
              >
                <ArrowIcon className="h-[18px] w-[18px]" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
