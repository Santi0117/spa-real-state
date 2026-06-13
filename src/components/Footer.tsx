"use client";

import BrandLogo from "@/components/BrandLogo";
import OfficeAddress from "@/components/OfficeAddress";
import SocialLinks from "@/components/SocialLinks";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import { navLinks } from "@/lib/nav";
import { site } from "@/lib/site";

export default function Footer() {
  const { t } = useTranslations();

  const navLabels: Record<(typeof navLinks)[number]["key"], string> = {
    properties: t.nav.properties,
    condominium: t.nav.condominium,
    zones: t.nav.zones,
    services: t.nav.services,
    about: t.nav.about,
    contact: t.nav.contact,
  };

  return (
    <footer className="border-t border-charcoal/8 bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo href="/" variant="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {t.footer.navigation}
            </p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-white/70 hover:text-gold-light">
                  {navLabels[link.key]}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
              {t.footer.contact}
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <a href={`tel:${site.phoneTel}`} className="block hover:text-gold-light">{site.phone}</a>
              <a href={`mailto:${site.email}`} className="block hover:text-gold-light">{site.email}</a>
              <div className="pt-1">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  {t.footer.offices}
                </p>
                <OfficeAddress addressClassName="text-white/70" />
                <SocialLinks className="mt-4 flex items-center gap-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            {formatMessage(t.footer.rights, { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#terminos" id="terminos" className="hover:text-gold-light">
              {t.footer.terms}
            </a>
            <a href="#" className="hover:text-gold-light">{t.footer.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
