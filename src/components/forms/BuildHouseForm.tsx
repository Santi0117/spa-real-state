"use client";

import { useMemo, useState } from "react";
import FormSuccess from "./FormSuccess";
import { useTranslations } from "@/components/LanguageProvider";

export default function BuildHouseForm() {
  const { t } = useTranslations();
  const [sent, setSent] = useState(false);
  const [hasLot, setHasLot] = useState("");

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
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          {t.forms.phone}
        </label>
        <input id="phone" name="phone" type="tel" required className="input-field rounded-sm" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          {t.forms.email}
        </label>
        <input id="email" name="email" type="email" required className="input-field rounded-sm" />
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
        <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          {t.forms.buildHouse.budget}
        </label>
        <input
          id="budget"
          name="budget"
          required
          className="input-field rounded-sm"
          placeholder={t.forms.buildHouse.budgetPlaceholder}
        />
      </div>
      <button type="submit" className="btn-gold w-full justify-center rounded-sm">
        {t.forms.buildHouse.submit}
      </button>
    </form>
  );
}
