"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import LanguageFlags from "@/components/LanguageFlags";
import { useTranslations } from "@/components/LanguageProvider";
import { navLinks, ctaButtons } from "@/lib/nav";
import { agendarVisitaHref, propertyIdFromPathname } from "@/lib/visit-scheduling";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPropertyId = propertyIdFromPathname(pathname);
  const { t } = useTranslations();

  const navLabels: Record<(typeof navLinks)[number]["key"], string> = {
    properties: t.nav.properties,
    condominium: t.nav.condominium,
    zones: t.nav.zones,
    services: t.nav.services,
    about: t.nav.about,
    contact: t.nav.contact,
  };

  const ctaLabels: Record<(typeof ctaButtons)[number]["key"], { label: string; short: string }> = {
    schedule: { label: t.cta.schedule, short: t.cta.scheduleShort },
    build: { label: t.cta.build, short: t.cta.buildShort },
    sell: { label: t.cta.sell, short: t.cta.sellShort },
  };

  function ctaHref(href: string) {
    if (href === "/agendar-visita" && currentPropertyId) {
      return agendarVisitaHref({ propertyId: currentPropertyId });
    }
    return href;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-charcoal/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:h-[72px]">
        <div className="relative z-10 w-[8.5rem] shrink-0 sm:w-[9.25rem] lg:w-[9.75rem]">
          <BrandLogo variant="header" />
        </div>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1.5 lg:flex xl:gap-3 2xl:gap-5"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.1em] text-white/75 transition hover:text-white xl:text-[11px] xl:tracking-[0.12em]"
            >
              {navLabels[link.key]}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center">
          <div className="hidden items-center gap-1.5 lg:flex xl:gap-2">
            {ctaButtons.map((btn) => (
              <Link
                key={btn.href}
                href={ctaHref(btn.href)}
                title={ctaLabels[btn.key].label}
                className="btn-gold-sm xl:!px-3.5 xl:!py-2.5 xl:!text-[11px]"
              >
                <span className="xl:hidden">{ctaLabels[btn.key].short}</span>
                <span className="hidden xl:inline">{ctaLabels[btn.key].label}</span>
              </Link>
            ))}
          </div>

          <div className="ml-8 hidden shrink-0 lg:block xl:ml-10 2xl:ml-12">
            <LanguageFlags />
          </div>

          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label={t.common.menu}
            onClick={() => setOpen(!open)}
          >
            <span className={`block h-px w-5 bg-white transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-white transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 px-4 py-4 lg:hidden">
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
            {ctaButtons.map((btn) => (
              <Link
                key={btn.href}
                href={ctaHref(btn.href)}
                className="btn-gold w-full justify-center rounded-sm text-[11px]"
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
