"use client";

import { useState } from "react";
import OfficeAddress from "@/components/OfficeAddress";
import SocialLinks from "@/components/SocialLinks";
import { useTranslations } from "@/components/LanguageProvider";
import { submitLead } from "@/lib/leads";
import { site } from "@/lib/site";

export default function Contact() {
  const { t, locale } = useTranslations();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const payload = Object.fromEntries(new FormData(e.currentTarget));
    setSubmitting(true);
    setError(false);

    const ok = await submitLead({ formType: "contact", payload, locale });

    setSubmitting(false);
    if (ok) {
      setSent(true);
    } else {
      setError(true);
    }
  }

  return (
    <section id="contacto" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-label">{t.contact.label}</p>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight text-charcoal md:text-5xl">
              {t.contact.title}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-slate-warm">
              {t.contact.description}
            </p>

            <div className="mt-10 space-y-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                  {t.contact.phone}
                </p>
                <a href={`tel:${site.phoneTel}`} className="mt-1 block text-lg text-charcoal hover:text-gold">
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                  {t.contact.email}
                </p>
                <a href={`mailto:${site.email}`} className="mt-1 block text-lg text-charcoal hover:text-gold">
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                  {t.contact.offices}
                </p>
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
                <p className="font-display text-xl font-bold text-gold">{t.contact.successTitle}</p>
                <p className="mt-2 text-sm text-slate-warm">{t.contact.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                      {t.contact.name}
                    </label>
                    <input id="name" name="name" required className="input-field rounded-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                      {t.contact.phoneField}
                    </label>
                    <input id="phone" name="phone" type="tel" required className="input-field rounded-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                    {t.contact.emailField}
                  </label>
                  <input id="email" name="email" type="email" required className="input-field rounded-sm" />
                </div>
                <div>
                  <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                    {t.contact.interest}
                  </label>
                  <select id="interest" name="interest" className="input-field rounded-sm">
                    <option>{t.contact.buy}</option>
                    <option>{t.contact.sell}</option>
                    <option>{t.contact.rent}</option>
                    <option>{t.contact.invest}</option>
                    <option>{t.contact.appraisal}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-charcoal/80">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="input-field resize-none rounded-sm"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600">{t.contact.errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold w-full justify-center rounded-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? t.contact.submitting : t.contact.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
