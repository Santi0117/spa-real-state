"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

type VisitCalendarProps = {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
};

export default function VisitCalendar({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: VisitCalendarProps) {
  const { t } = useTranslations();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  function goMonth(delta: number) {
    setView((current) => {
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  const canGoPrev =
    view.year > today.getFullYear() ||
    (view.year === today.getFullYear() && view.month > today.getMonth());

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-medium text-charcoal/80">{t.forms.calendar.pickDayTime}</p>
        <div className="flex items-center justify-between border border-charcoal/10 bg-cream/50 px-3 py-2">
          <button
            type="button"
            onClick={() => goMonth(-1)}
            disabled={!canGoPrev}
            className="px-2 py-1 text-sm text-charcoal transition hover:text-gold disabled:cursor-not-allowed disabled:opacity-30"
            aria-label={t.forms.calendar.prevMonth}
          >
            ‹
          </button>
          <p className="font-display text-lg font-medium text-charcoal">
            {t.forms.calendar.months[view.month]} {view.year}
          </p>
          <button
            type="button"
            onClick={() => goMonth(1)}
            className="px-2 py-1 text-sm text-charcoal transition hover:text-gold"
            aria-label={t.forms.calendar.nextMonth}
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
        {t.forms.calendar.weekdays.map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(view.year, view.month, day);
          const isPast = date < today;
          const key = formatDateKey(view.year, view.month, day);
          const isSelected = selectedDate === key;

          return (
            <button
              key={key}
              type="button"
              disabled={isPast}
              onClick={() => {
                onDateChange(key);
                onTimeChange("");
              }}
              className={`aspect-square rounded-sm text-sm transition ${
                isPast
                  ? "cursor-not-allowed text-charcoal/20"
                  : isSelected
                    ? "bg-gold font-semibold text-white"
                    : "text-charcoal hover:bg-gold/15"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selectedDate ? (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-warm">
            {formatMessage(t.forms.calendar.availableSlots, { date: selectedDate })}
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onTimeChange(slot)}
                  className={`rounded-sm border px-2 py-2.5 text-sm transition ${
                    isSelected
                      ? "border-gold bg-gold text-white"
                      : "border-charcoal/10 bg-white text-charcoal hover:border-gold"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          <input type="hidden" name="visitDate" value={selectedDate} required />
          <input type="hidden" name="visitTime" value={selectedTime} required />
        </div>
      ) : (
        <p className="text-xs text-slate-warm">{t.forms.calendar.selectDayHint}</p>
      )}
    </div>
  );
}
