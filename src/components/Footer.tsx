import BrandLogo from "@/components/BrandLogo";
import { site } from "@/lib/site";
import { navLinks } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="border-t border-charcoal/8 bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo href="/" variant="footer" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              {site.tagline}. Asesoría inmobiliaria premium en las mejores zonas de Costa Rica.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Navegación</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-white/70 hover:text-gold-light">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Contacto</p>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <a href={`tel:${site.phoneTel}`} className="block hover:text-gold-light">{site.phone}</a>
              <a href={`mailto:${site.email}`} className="block hover:text-gold-light">{site.email}</a>
              <p>{site.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.brand}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-gold-light">Privacidad</a>
            <a href="#" className="hover:text-gold-light">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
