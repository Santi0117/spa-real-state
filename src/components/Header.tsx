"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";
import LanguageFlags from "@/components/LanguageFlags";
import { ctaButtons, navLinks } from "@/lib/nav";
import {
  agendarVisitaHref,
  financiarHref,
  propertyIdFromPathname,
} from "@/lib/visit-scheduling";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPropertyId = propertyIdFromPathname(pathname);

  function ctaHref(href: string) {
    if (href === "/agendar-visita" && currentPropertyId) {
      return agendarVisitaHref({ propertyId: currentPropertyId });
    }
    if (href === "/financiar" && currentPropertyId) {
      return financiarHref({ propertyId: currentPropertyId });
    }
    return href;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-charcoal/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-1.5 pl-2 pr-2 sm:h-16 sm:gap-2 sm:pl-3 sm:pr-3 lg:h-[72px] lg:gap-2.5 lg:pl-3 lg:pr-4">
        <div className="relative z-10 shrink-0">
          <BrandLogo variant="header" compact />
        </div>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-2 2xl:gap-3"
          aria-label="Principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-0.5 text-[9px] font-medium uppercase tracking-[0.08em] text-white/75 transition hover:text-white xl:text-[10px] xl:tracking-[0.1em] 2xl:px-1 2xl:text-[11px] 2xl:tracking-[0.12em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 lg:gap-1.5 xl:gap-2">
          <div className="hidden items-center gap-1 lg:flex xl:gap-1.5">
            {ctaButtons.map((btn) => (
              <Link
                key={btn.href}
                href={ctaHref(btn.href)}
                title={btn.label}
                className="btn-gold-sm !px-2.5 !py-2 !text-[9px] !tracking-[0.08em] xl:!px-3 xl:!py-2.5 xl:!text-[10px] xl:!tracking-[0.1em] 2xl:!px-3.5 2xl:!py-3 2xl:!text-[11px] 2xl:!tracking-[0.12em]"
              >
                <span className="2xl:hidden">{btn.shortLabel}</span>
                <span className="hidden 2xl:inline">{btn.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden shrink-0 xl:block">
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
        <div className="max-h-[calc(100svh-3.5rem)] overflow-y-auto border-t border-white/10 px-4 py-4 sm:max-h-[calc(100svh-4rem)] lg:hidden">
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
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {ctaButtons.map((btn) => (
              <Link
                key={btn.href}
                href={ctaHref(btn.href)}
                className="btn-gold justify-center rounded-sm px-3 py-3.5 text-[11px] tracking-[0.1em]"
                onClick={() => setOpen(false)}
              >
                {btn.shortLabel}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <LanguageFlags />
          </div>
        </div>
      )}
    </header>
  );
}
