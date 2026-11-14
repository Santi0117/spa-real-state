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
    <section id="contacto" className="bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-label">{t.contact.label}</p>
            <h2 className="font-display mt-4 text-4xl font-normal tracking-tight text-navy md:text-6xl">
              {t.contact.title}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-slate-warm">
              {t.contact.description}
            </p>

            <dl className="mt-10 border-t-2 border-navy">
              <div className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-warm">
                  {t.contact.phone}
                </dt>
                <dd>
                  <a href={`tel:${site.phoneTel}`} className="font-display text-xl text-navy hover:text-gold">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-warm">
                  {t.contact.email}
                </dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="font-display break-all text-xl text-navy hover:text-gold">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 py-5 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-warm">
                  {t.contact.offices}
                </dt>
                <dd className="font-display text-lg text-navy">
                  <OfficeAddress addressClassName="text-navy" />
                  <SocialLinks
                    className="mt-4 flex items-center gap-4"
                    iconClassName="h-5 w-5 text-navy transition hover:text-gold"
                  />
                </dd>
              </div>
            </dl>
          </div>

          <div className="self-start rounded-2xl bg-white p-6 shadow-sm shadow-navy/5 md:p-10">
            {sent ? (
              <div className="py-6 text-center">
                <p className="font-display text-2xl text-navy">{t.contact.successTitle}</p>
                <p className="mt-2 text-sm text-slate-warm">{t.contact.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="field-label">
                      {t.contact.name}
                    </label>
                    <input id="name" name="name" required className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="field-label">
                      {t.contact.phoneField}
                    </label>
                    <input id="phone" name="phone" type="tel" required className="input-field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="field-label">
                    {t.contact.emailField}
                  </label>
                  <input id="email" name="email" type="email" required className="input-field" />
                </div>
                <div>
                  <label htmlFor="interest" className="field-label">
                    {t.contact.interest}
                  </label>
                  <select id="interest" name="interest" className="input-field">
                    <option>{t.contact.buy}</option>
                    <option>{t.contact.sell}</option>
                    <option>{t.contact.rent}</option>
                    <option>{t.contact.invest}</option>
                    <option>{t.contact.appraisal}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="field-label">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="input-field resize-none"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600">{t.contact.errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-navy w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
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
