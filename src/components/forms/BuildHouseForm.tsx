"use client";

import { useState } from "react";
import FormSuccess from "./FormSuccess";
import { useTranslations } from "@/components/LanguageProvider";
import { submitLead } from "@/lib/leads";

export default function BuildHouseForm() {
  const { t, locale } = useTranslations();
  const [sent, setSent] = useState(false);
  const [hasLot, setHasLot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const payload = Object.fromEntries(new FormData(e.currentTarget));
    setSubmitting(true);
    setError(false);

    const ok = await submitLead({ formType: "build_house", payload, locale });

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
          <label htmlFor="firstName" className="field-label">
            {t.forms.firstName}
          </label>
          <input id="firstName" name="firstName" required className="input-field" />
        </div>
        <div>
          <label htmlFor="lastName" className="field-label">
            {t.forms.lastName}
          </label>
          <input id="lastName" name="lastName" required className="input-field" />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="field-label">
          {t.forms.phone}
        </label>
        <input id="phone" name="phone" type="tel" required className="input-field" />
      </div>
      <div>
        <label htmlFor="email" className="field-label">
          {t.forms.email}
        </label>
        <input id="email" name="email" type="email" required className="input-field" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-charcoal/80">{t.forms.buildHouse.hasLotQuestion}</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
            <input
              type="radio"
              name="hasLot"
              value="si"
              required
              checked={hasLot === "si"}
              onChange={() => setHasLot("si")}
              className="accent-gold"
            />
            {t.forms.buildHouse.hasLotYes}
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal">
            <input
              type="radio"
              name="hasLot"
              value="no"
              checked={hasLot === "no"}
              onChange={() => setHasLot("no")}
              className="accent-gold"
            />
            {t.forms.buildHouse.hasLotNo}
          </label>
        </div>
      </div>
      <div className="rounded-sm border border-charcoal/10 bg-cream/40 p-4">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal">
          <input type="checkbox" name="findLot" value="si" className="mt-1 accent-gold" />
          <span>
            <span className="font-medium">{t.forms.buildHouse.findLotOptional}</span>{" "}
            {t.forms.buildHouse.findLotLabel}
          </span>
        </label>
      </div>
      <div>
        <label htmlFor="budget" className="field-label">
          {t.forms.buildHouse.budget}
        </label>
        <input
          id="budget"
          name="budget"
          required
          className="input-field"
          placeholder={t.forms.buildHouse.budgetPlaceholder}
        />
      </div>
      {error && <p className="text-sm text-red-600">{t.forms.errorMessage}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="btn-navy w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t.forms.submitting : t.forms.buildHouse.submit}
      </button>
    </form>
  );
}
