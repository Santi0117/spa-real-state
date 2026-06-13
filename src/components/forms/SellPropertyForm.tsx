"use client";

import { useState } from "react";
import FormSuccess from "./FormSuccess";
import { useTranslations } from "@/components/LanguageProvider";

export default function SellPropertyForm() {
  const { t } = useTranslations();
  const [sent, setSent] = useState(false);

  if (sent) return <FormSuccess />;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
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
      <button type="submit" className="btn-gold w-full justify-center rounded-sm">
        {t.forms.sellProperty.submit}
      </button>
    </form>
  );
}
