"use client";

import { useState } from "react";
import OfficeAddress from "@/components/OfficeAddress";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/lib/site";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contacto" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-label">Contacto</p>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
              Contáctanos
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-slate-warm">
              Contanos qué buscás y un asesor de {site.brand} te contactará en menos de 24 horas.
            </p>

            <div className="mt-10 space-y-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">Teléfono</p>
                <a href={`tel:${site.phoneTel}`} className="mt-1 block text-lg text-charcoal hover:text-gold">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">Email</p>
                <a href={`mailto:${site.email}`} className="mt-1 block text-lg text-charcoal hover:text-gold">
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">Oficinas</p>
                <div className="mt-1 text-lg text-charcoal">
                  <OfficeAddress addressClassName="text-charcoal" />
                </div>
                <SocialLinks
                  className="mt-4 flex items-center gap-4"
                  iconClassName="h-5 w-5 text-charcoal transition hover:text-gold"
                />
              </div>
            </div>
          </div>

          <div className="border border-charcoal/8 bg-white p-6 shadow-sm md:p-8">
            {sent ? (
              <div className="py-6 text-center">
                <p className="font-display text-xl font-bold text-gold">¡Listo!</p>
                <p className="mt-2 text-sm text-slate-warm">
                  Te contactaremos muy pronto. Gracias por confiar en Jopa.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                      Nombre
                    </label>
                    <input id="name" name="name" required className="input-field rounded-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                      Teléfono
                    </label>
                    <input id="phone" name="phone" type="tel" required className="input-field rounded-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className="input-field rounded-sm" />
                </div>
                <div>
                  <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                    Me interesa
                  </label>
                  <select id="interest" name="interest" className="input-field rounded-sm">
                    <option>Comprar una propiedad</option>
                    <option>Vender mi propiedad</option>
                    <option>Alquilar</option>
                    <option>Invertir</option>
                    <option>Valuación gratuita</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="input-field resize-none rounded-sm"
                    placeholder="Zona, presupuesto, habitaciones..."
                  />
                </div>
                <button type="submit" className="btn-gold w-full justify-center rounded-sm">
                  Enviar consulta
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
