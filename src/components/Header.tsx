"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { ctaButtons, navLinks } from "@/lib/nav";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-charcoal/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px]">
        <Link href="/" className="group shrink-0 flex flex-col leading-none">
          <span className="font-display text-2xl font-semibold tracking-wide text-white lg:text-[1.65rem]">
            {site.name}
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-gold-light">
            Real Estate
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/75 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 lg:flex">
            {ctaButtons.map((btn) => (
              <Link key={btn.href} href={btn.href} className="btn-gold-sm">
                {btn.label}
              </Link>
            ))}
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
                href={btn.href}
                className="btn-gold w-full justify-center rounded-sm text-[11px]"
                onClick={() => setOpen(false)}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
