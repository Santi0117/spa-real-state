"use client";

import { useEffect, useState } from "react";
import FormSuccess from "./FormSuccess";
import PropertyVisitPicker from "./PropertyVisitPicker";
import VisitCalendar from "./VisitCalendar";
import { getPropertyById, properties } from "@/lib/properties";

type ScheduleVisitFormProps = {
  propertyName?: string;
  propertyId?: string;
};

export default function ScheduleVisitForm({
  propertyName: initialName,
  propertyId: initialId,
}: ScheduleVisitFormProps) {
  const [sent, setSent] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedId, setSelectedId] = useState(initialId ?? "");
  const [selectedTitle, setSelectedTitle] = useState(initialName ?? "");

  useEffect(() => {
    if (initialId) {
      const property = getPropertyById(initialId);
      if (property) {
        setSelectedId(property.id);
        setSelectedTitle(property.title);
        return;
      }
    }
    if (initialName) {
      const match = properties.find((p) => p.title === initialName);
      if (match) {
        setSelectedId(match.id);
        setSelectedTitle(match.title);
      } else {
        setSelectedTitle(initialName);
      }
    }
  }, [initialId, initialName]);

  const canSubmit = Boolean(selectedDate && selectedTime && selectedTitle);

  if (sent) return <FormSuccess />;

  function handlePropertySelect(id: string, title: string) {
    setSelectedId(id);
    setSelectedTitle(title);
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
      <PropertyVisitPicker selectedId={selectedId} onSelect={handlePropertySelect} />

      {selectedTitle ? (
        <div className="rounded-sm border border-gold/30 bg-gold/5 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
            Visita para
          </p>
          <p className="mt-1 text-sm font-medium text-charcoal">{selectedTitle}</p>
          <input type="hidden" name="property" value={selectedTitle} />
          {selectedId ? <input type="hidden" name="propertyId" value={selectedId} /> : null}
        </div>
      ) : (
        <p className="text-xs text-slate-warm">
          Seleccioná una propiedad arriba para continuar.
        </p>
      )}

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
