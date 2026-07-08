"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FormSuccess from "./FormSuccess";
import PropertyVisitPicker from "./PropertyVisitPicker";
import ReservationCalendar, {
  type ReservationRateType,
} from "./ReservationCalendar";
import SelectedPropertySummary from "./SelectedPropertySummary";
import { useTranslations } from "@/components/LanguageProvider";
import { submitLead } from "@/lib/leads";
import {
  getPropertyById,
  isReservationProperty,
  resolvePropertySelection,
} from "@/lib/properties";

type ScheduleReservationFormProps = {
  propertyName?: string;
  propertyId?: string;
};

function resolvePrefill(propertyId?: string, propertyName?: string) {
  const { id, property } = resolvePropertySelection({
    id: propertyId,
    title: propertyName,
    filter: isReservationProperty,
  });
  if (property) {
    return { id: property.id, title: property.title, property, prefilled: true };
  }
  if (propertyId || propertyName) {
    return {
      id: propertyId ?? "",
      title: propertyName ?? "",
      property: undefined,
      prefilled: true,
    };
  }
  return { id: "", title: "", property: undefined, prefilled: false };
}

export default function ScheduleReservationForm({
  propertyName: initialName,
  propertyId: initialId,
}: ScheduleReservationFormProps) {
  const { t, locale } = useTranslations();
  const prefill = useMemo(
    () => resolvePrefill(initialId, initialName),
    [initialId, initialName]
  );

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rateType, setRateType] = useState<ReservationRateType>("night");
  const [selectedId, setSelectedId] = useState(prefill.id);
  const [manualTitle, setManualTitle] = useState(
    prefill.property ? "" : prefill.title
  );
  const [showPicker, setShowPicker] = useState(!prefill.prefilled);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const selectedProperty = selectedId ? getPropertyById(selectedId) : undefined;
  const selectedTitle = selectedProperty?.title ?? manualTitle;

  useEffect(() => {
    setSelectedId(prefill.id);
    setManualTitle(prefill.property ? "" : prefill.title);
    setShowPicker(!prefill.prefilled);
  }, [prefill]);

  const canSubmit = Boolean(
    checkIn && checkOut && selectedTitle && acceptedTerms
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    const payload = {
      ...Object.fromEntries(new FormData(e.currentTarget)),
      property: selectedTitle,
      propertyId: selectedId,
      checkIn,
      checkOut,
      rateType,
    };

    setSubmitting(true);
    setError(false);

    const ok = await submitLead({
      formType: "schedule_reservation",
      payload,
      locale,
    });

    setSubmitting(false);
    if (ok) {
      setSent(true);
    } else {
      setError(true);
    }
  }

  if (sent) return <FormSuccess />;

  function handlePropertySelect(id: string, _title: string) {
    setSelectedId(id);
    setManualTitle("");
    setShowPicker(false);
    setCheckIn("");
    setCheckOut("");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {showPicker ? (
        <PropertyVisitPicker
          selectedId={selectedId}
          onSelect={handlePropertySelect}
          filter={isReservationProperty}
        />
      ) : selectedTitle ? (
        <SelectedPropertySummary
          propertyId={selectedId}
          title={selectedTitle}
          summaryLabel={t.forms.selectedProperty.reservationLabel}
          onChange={() => setShowPicker(true)}
        />
      ) : null}

      {!selectedTitle && showPicker ? (
        <p className="text-xs text-slate-warm">{t.forms.selectPropertyHint}</p>
      ) : null}

      {selectedTitle ? (
        <>
          <input type="hidden" name="property" value={selectedTitle} />
          {selectedId ? <input type="hidden" name="propertyId" value={selectedId} /> : null}
        </>
      ) : null}

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

      {selectedTitle ? (
        <ReservationCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          rateType={rateType}
          rentalRates={selectedProperty?.rentalRates}
          onCheckInChange={setCheckIn}
          onCheckOutChange={setCheckOut}
          onRateTypeChange={setRateType}
        />
      ) : null}

      <label className="flex cursor-pointer items-start gap-3 text-sm text-charcoal/85">
        <input
          type="checkbox"
          name="terms"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
        />
        <span>
          {t.forms.termsPrefix}{" "}
          <Link href="/#terminos" className="font-medium text-gold underline-offset-2 hover:underline">
            {t.forms.termsLink}
          </Link>{" "}
          {t.forms.termsSuffix}
        </span>
      </label>

      {error && <p className="text-sm text-red-600">{t.forms.errorMessage}</p>}

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="btn-gold w-full justify-center rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? t.forms.submitting : t.forms.scheduleReservation.confirm}
      </button>
    </form>
  );
}
