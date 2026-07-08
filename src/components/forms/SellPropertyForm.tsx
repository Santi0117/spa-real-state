"use client";

import { useState } from "react";
import FormSuccess from "./FormSuccess";
import { useTranslations } from "@/components/LanguageProvider";
import { submitLead } from "@/lib/leads";

export default function SellPropertyForm() {
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

    const ok = await submitLead({ formType: "sell_property", payload, locale });

    setSubmitting(false);
    if (ok) {
      setSent(true);
    } else {
      setError(true);
    }
  }

  if (sent) return <FormSuccess />;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-charcoal/80">
            {t.forms.firstName}
          </label>
          <input id="firstName" name="firstName" required className="input-field rounded-sm" />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-charcoal/80">
            {t.forms.lastName}
          </label>
          <input id="lastName" name="lastName" required className="input-field rounded-sm" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          {t.forms.email}
        </label>
        <input id="email" name="email" type="email" required className="input-field rounded-sm" />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          {t.forms.phone}
        </label>
        <input id="phone" name="phone" type="tel" required className="input-field rounded-sm" />
      </div>
      <div>
        <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          {t.forms.sellProperty.location}
        </label>
        <input
          id="location"
          name="location"
          required
          className="input-field rounded-sm"
          placeholder={t.forms.sellProperty.locationPlaceholder}
        />
      </div>
      <div>
        <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          {t.forms.sellProperty.price}
        </label>
        <input
          id="price"
          name="price"
          required
          className="input-field rounded-sm"
          placeholder={t.forms.sellProperty.pricePlaceholder}
        />
      </div>
      <div>
        <label htmlFor="negotiable" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          {t.forms.sellProperty.negotiable}
        </label>
        <textarea
          id="negotiable"
          name="negotiable"
          required
          rows={4}
          className="input-field min-h-[112px] resize-y rounded-sm"
          placeholder={t.forms.sellProperty.negotiablePlaceholder}
        />
      </div>
      {error && <p className="text-sm text-red-600">{t.forms.errorMessage}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="btn-gold w-full justify-center rounded-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t.forms.submitting : t.forms.sellProperty.submit}
      </button>
    </form>
  );
}
