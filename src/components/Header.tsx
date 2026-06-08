"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import LanguageFlags from "@/components/LanguageFlags";
import { ctaButtons, navLinks } from "@/lib/nav";
import { agendarVisitaHref, propertyIdFromPathname } from "@/lib/visit-scheduling";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPropertyId = propertyIdFromPathname(pathname);

  function ctaHref(href: string) {
    if (href === "/agendar-visita" && currentPropertyId) {
      return agendarVisitaHref({ propertyId: currentPropertyId });
    }
    return href;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-charcoal/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:h-[72px]">
        {/* Logo — ancho fijo, sin solapamiento */}
        <div className="relative z-10 w-[8.5rem] shrink-0 sm:w-[9.25rem] lg:w-[9.75rem]">
          <BrandLogo variant="header" />
        </div>

        {/* Nav centrado en el espacio entre logo y acciones */}
        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1.5 lg:flex xl:gap-3 2xl:gap-5"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.08em] text-white/75 transition hover:text-white lg:text-[9px] xl:text-[11px] xl:tracking-[0.12em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs + banderas */}
        <div className="ml-auto flex shrink-0 items-center">
          <div className="hidden items-center gap-1 lg:flex lg:gap-1 xl:gap-1.5 2xl:gap-2">
            {ctaButtons.map((btn) => (
              <Link
                key={btn.href}
                href={ctaHref(btn.href)}
                title={btn.label}
                className="btn-gold-sm !px-2 !py-2 !text-[9px] !tracking-[0.08em] xl:!px-2.5 xl:!py-2.5 xl:!text-[10px] 2xl:!px-3.5 2xl:!text-[11px]"
              >
                <span className="xl:hidden">{btn.shortLabel}</span>
                <span className="hidden xl:inline">{btn.label}</span>
              </Link>
            ))}
          </div>

          <div className="ml-8 hidden shrink-0 lg:block xl:ml-10 2xl:ml-12">
            <LanguageFlags />
          </div>

          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 lg:hidden"
            aria-label="Menú"
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
              {link.label}
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
                {btn.label}
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
