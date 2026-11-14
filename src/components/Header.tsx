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
      className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-white/85 transition hover:text-gold xl:text-[11px]"
    >
      {navLabels[link.key]}
    </Link>
  ));

  const ctaItems = ctaButtons.map((btn, index) => (
    <Link
      key={btn.href}
      href={ctaHref(btn.href)}
      title={ctaLabels[btn.key].label}
      className={index === 0 ? "btn-gold-sm" : "btn-outline-light-sm"}
    >
      <span className={overHero ? "xl:hidden" : "2xl:hidden"}>{ctaLabels[btn.key].short}</span>
      <span className={overHero ? "hidden xl:inline" : "hidden 2xl:inline"}>
        {ctaLabels[btn.key].label}
      </span>
    </Link>
  ));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        overHero ? "bg-transparent" : "bg-navy shadow-lg shadow-navy/20"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center gap-4 transition-[height] duration-300 ${
            overHero ? "h-16 lg:h-[76px]" : "h-16 lg:h-[72px]"
          }`}
        >
          <div className="relative z-10 w-[8.5rem] shrink-0 sm:w-[9.25rem] lg:w-[9.75rem]">
            <BrandLogo variant="header" />
          </div>

          <nav
            className={`hidden min-w-0 flex-1 items-center lg:flex ${
              overHero ? "justify-end gap-4 xl:gap-7" : "justify-center gap-3 xl:gap-5"
            }`}
            aria-label="Principal"
          >
            {navItems}
          </nav>

          {!overHero && (
            <div className="hidden shrink-0 items-center gap-2 lg:flex">{ctaItems}</div>
          )}

          <div className={`hidden shrink-0 lg:block ${overHero ? "ml-6" : "ml-4"}`}>
            <LanguageFlags />
          </div>

          <button
            type="button"
            className="ml-auto flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label={t.common.menu}
            onClick={() => setOpen(!open)}
          >
            <span className={`block h-px w-5 bg-white transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-white transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>

        {overHero && (
          <div className="hidden items-center gap-3 border-b border-white/25 pb-5 lg:flex">{ctaItems}</div>
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
