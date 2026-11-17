"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import LanguageFlags from "@/components/LanguageFlags";
import { useTranslations } from "@/components/LanguageProvider";
import { navLinks, ctaButtons } from "@/lib/nav";
import { propertyIdFromPathname, schedulingHrefById } from "@/lib/visit-scheduling";
import { getPropertyById, isReservationProperty } from "@/lib/properties";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const currentPropertyId = propertyIdFromPathname(pathname);
  const currentProperty = currentPropertyId ? getPropertyById(currentPropertyId) : undefined;
  const isReservation = currentProperty ? isReservationProperty(currentProperty) : false;
  const { t } = useTranslations();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = pathname === "/" && !scrolled && !open;

  const navLabels: Record<(typeof navLinks)[number]["key"], string> = {
    properties: t.nav.properties,
    condominium: t.nav.condominium,
    zones: t.nav.zones,
    services: t.nav.services,
    about: t.nav.about,
    contact: t.nav.contact,
  };

  const ctaLabels: Record<(typeof ctaButtons)[number]["key"], { label: string; short: string }> = {
    schedule: {
      label: isReservation ? t.cta.scheduleReservation : t.cta.schedule,
      short: isReservation ? t.cta.scheduleReservationShort : t.cta.scheduleShort,
    },
    build: { label: t.cta.build, short: t.cta.buildShort },
    sell: { label: t.cta.sell, short: t.cta.sellShort },
  };

  function ctaHref(href: string) {
    if (href === "/agendar-visita" && currentPropertyId) {
      return schedulingHrefById(currentPropertyId);
    }
    return href;
  }

  const navItems = navLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className={`whitespace-nowrap font-semibold uppercase tracking-[0.16em] transition hover:text-gold ${
        overHero ? "text-[11px] text-white min-[1400px]:text-xs" : "text-[10px] text-white/85 xl:text-[11px]"
      }`}
    >
      {navLabels[link.key]}
    </Link>
  ));

  const sellBtn = ctaButtons.find((btn) => btn.key === "sell")!;
  const scheduleBtn = ctaButtons.find((btn) => btn.key === "schedule")!;
  const heroCtaItems = (
    <>
      <Link
        href={sellBtn.href}
        className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-white/28 bg-white/14 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-[10px] transition hover:bg-white/25"
      >
        <span className="min-[1400px]:hidden">{ctaLabels.sell.short}</span>
        <span className="hidden min-[1400px]:inline">{ctaLabels.sell.label}</span>
      </Link>
      <Link
        href={ctaHref(scheduleBtn.href)}
        className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-gold px-[22px] py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-navy transition hover:bg-[#c8992f]"
      >
        <span className="min-[1400px]:hidden">{ctaLabels.schedule.short}</span>
        <span className="hidden min-[1400px]:inline">{ctaLabels.schedule.label}</span>
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </>
  );

  const ctaItems = ctaButtons.map((btn, index) => (
    <Link
      key={btn.href}
      href={ctaHref(btn.href)}
      title={ctaLabels[btn.key].label}
      className={index === 0 ? "btn-gold-sm" : "btn-outline-light-sm"}
    >
      <span className="2xl:hidden">{ctaLabels[btn.key].short}</span>
      <span className="hidden 2xl:inline">{ctaLabels[btn.key].label}</span>
    </Link>
  ));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        overHero ? "bg-transparent" : "bg-navy shadow-lg shadow-navy/20"
      }`}
    >
      <div className={`mx-auto ${overHero ? "max-w-[1280px] px-5 md:px-12" : "max-w-7xl px-4 sm:px-6"}`}>
        <div
          className={`flex items-center gap-4 transition-[height] duration-300 ${
            overHero ? "h-20 lg:h-[92px] xl:gap-5" : "h-16 lg:h-[72px]"
          }`}
        >
          <div className="relative z-10 w-[8.5rem] shrink-0 sm:w-[9.25rem] lg:w-[9.75rem]">
            <BrandLogo variant="header" />
          </div>

          <nav
            className={`hidden min-w-0 flex-1 items-center lg:flex ${
              overHero
                ? "justify-end gap-6 xl:justify-center xl:gap-7 min-[1400px]:gap-[34px]"
                : "justify-center gap-3 xl:gap-5"
            }`}
            aria-label="Principal"
          >
            {navItems}
          </nav>

          {overHero ? (
            <div className="hidden shrink-0 items-center gap-2.5 xl:flex">{heroCtaItems}</div>
          ) : (
            <div className="hidden shrink-0 items-center gap-2 lg:flex">{ctaItems}</div>
          )}

          <div className={`hidden shrink-0 lg:block ${overHero ? "ml-2" : "ml-4"}`}>
            <LanguageFlags />
          </div>

          <button
            type="button"
            className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-white/12 lg:hidden"
            aria-label={t.common.menu}
            onClick={() => setOpen(!open)}
          >
            <span className={`block h-px w-5 bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

        {overHero && (
          <div className="-mt-3 hidden justify-end gap-2.5 lg:flex xl:hidden">{heroCtaItems}</div>
        )}
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy px-4 py-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2.5 text-sm font-medium uppercase tracking-wider text-white/80"
              onClick={() => setOpen(false)}
            >
              {navLabels[link.key]}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            {ctaButtons.map((btn, index) => (
              <Link
                key={btn.href}
                href={ctaHref(btn.href)}
                className={`w-full justify-center ${
                  index === 0 ? "btn-gold" : "btn-gold-inverse !border-white/60 !bg-transparent !text-white"
                }`}
                onClick={() => setOpen(false)}
              >
                {ctaLabels[btn.key].label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex justify-end pl-8">
            <LanguageFlags />
          </div>
        </div>
      )}
    </header>
  );
}
