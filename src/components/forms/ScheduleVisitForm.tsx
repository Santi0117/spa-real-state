"use client";

import { useState } from "react";
import FormSuccess from "./FormSuccess";
import VisitCalendar from "./VisitCalendar";

export default function ScheduleVisitForm() {
  const [sent, setSent] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (sent) return <FormSuccess />;

  const canSubmit = Boolean(selectedDate && selectedTime);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSent(true);
      }}
    >
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
