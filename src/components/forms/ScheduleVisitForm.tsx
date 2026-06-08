"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FormSuccess from "./FormSuccess";
import PropertyVisitPicker from "./PropertyVisitPicker";
import SelectedPropertySummary from "./SelectedPropertySummary";
import VisitCalendar from "./VisitCalendar";
import { getPropertyById, properties } from "@/lib/properties";

type ScheduleVisitFormProps = {
  propertyName?: string;
  propertyId?: string;
};

function resolvePrefill(propertyId?: string, propertyName?: string) {
  if (propertyId) {
    const property = getPropertyById(propertyId);
    if (property) {
      return { id: property.id, title: property.title, property, prefilled: true };
    }
    return {
      id: propertyId,
      title: propertyName ?? "",
      property: undefined,
      prefilled: Boolean(propertyId || propertyName),
    };
  }
  if (propertyName) {
    const match = properties.find((p) => p.title === propertyName);
    if (match) {
      return { id: match.id, title: match.title, property: match, prefilled: true };
    }
    return { id: "", title: propertyName, property: undefined, prefilled: true };
  }
  return { id: "", title: "", property: undefined, prefilled: false };
}

export default function ScheduleVisitForm({
  propertyName: initialName,
  propertyId: initialId,
}: ScheduleVisitFormProps) {
  const prefill = useMemo(
    () => resolvePrefill(initialId, initialName),
    [initialId, initialName]
  );

  const [sent, setSent] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedId, setSelectedId] = useState(prefill.id);
  const [selectedTitle, setSelectedTitle] = useState(prefill.title);
  const [selectedProperty, setSelectedProperty] = useState(prefill.property);
  const [showPicker, setShowPicker] = useState(!prefill.prefilled);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    setSelectedId(prefill.id);
    setSelectedTitle(prefill.title);
    setSelectedProperty(prefill.property);
    setShowPicker(!prefill.prefilled);
  }, [prefill]);

  const canSubmit = Boolean(
    selectedDate && selectedTime && selectedTitle && acceptedTerms
  );

  if (sent) return <FormSuccess />;

  function handlePropertySelect(id: string, title: string) {
    setSelectedId(id);
    setSelectedTitle(title);
    setSelectedProperty(getPropertyById(id));
    setShowPicker(false);
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSent(true);
      }}
    >
      {showPicker ? (
        <PropertyVisitPicker selectedId={selectedId} onSelect={handlePropertySelect} />
      ) : selectedTitle ? (
        <SelectedPropertySummary
          property={selectedProperty}
          title={selectedTitle}
          onChange={() => setShowPicker(true)}
        />
      ) : null}

      {!selectedTitle && showPicker ? (
        <p className="text-xs text-slate-warm">
          Seleccioná una propiedad arriba para continuar.
        </p>
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
            Nombre
          </label>
          <input id="firstName" name="firstName" required className="input-field rounded-sm" />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-charcoal/80">
            Apellido
          </label>
          <input id="lastName" name="lastName" required className="input-field rounded-sm" />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          Número
        </label>
        <input id="phone" name="phone" type="tel" required className="input-field rounded-sm" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal/80">
          Correo
        </label>
        <input id="email" name="email" type="email" required className="input-field rounded-sm" />
      </div>

      <VisitCalendar
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onDateChange={setSelectedDate}
        onTimeChange={setSelectedTime}
      />

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
          Acepto los{" "}
          <Link href="/#terminos" className="font-medium text-gold underline-offset-2 hover:underline">
            términos y condiciones
          </Link>{" "}
          de Jopa Real Estate.
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-gold w-full justify-center rounded-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirmar visita
      </button>
    </form>
  );
}
