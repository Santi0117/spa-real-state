"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import { formatColones } from "@/lib/properties";
import type { RentalRates } from "@/lib/properties";
import { site } from "@/lib/site";

const ARRIVAL_SLOTS = [
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

function parseDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function nightsBetween(checkIn: string, checkOut: string) {
  const start = parseDateKey(checkIn).getTime();
  const end = parseDateKey(checkOut).getTime();
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff);
}

/** Fines de semana de noviembre y diciembre ya están alquilados. */
function isBlockedWeekend(date: Date) {
  const month = date.getMonth();
  const weekday = date.getDay();
  const isNovOrDec = month === 10 || month === 11;
  const isWeekend = weekday === 0 || weekday === 6;
  return isNovOrDec && isWeekend;
}

function rangeHasBlockedDay(startKey: string, endKey: string) {
  const start = parseDateKey(startKey);
  const end = parseDateKey(endKey);
  const cursor = new Date(start);
  while (cursor <= end) {
    if (isBlockedWeekend(cursor)) return true;
    cursor.setDate(cursor.getDate() + 1);
  }
  return false;
}

export type ReservationRateType = "day" | "night";
export type ReservationPaymentMethod = "sinpe" | "transfer";

type ReservationCalendarProps = {
  checkIn: string;
  checkOut: string;
  rateType: ReservationRateType;
  arrivalTime: string;
  paymentMethod: ReservationPaymentMethod | "";
  rentalRates?: RentalRates;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onRateTypeChange: (rate: ReservationRateType) => void;
  onArrivalTimeChange: (time: string) => void;
  onPaymentMethodChange: (method: ReservationPaymentMethod) => void;
};

export default function ReservationCalendar({
  checkIn,
  checkOut,
  rateType,
  arrivalTime,
  paymentMethod,
  rentalRates,
  onCheckInChange,
  onCheckOutChange,
  onRateTypeChange,
  onArrivalTimeChange,
  onPaymentMethodChange,
}: ReservationCalendarProps) {
  const { t } = useTranslations();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const unitRate =
    rentalRates && rateType === "day"
      ? rentalRates.perDay
      : rentalRates?.perNight ?? 0;
  const estimatedTotal = nights > 0 && unitRate > 0 ? nights * unitRate : 0;
  const depositAmount =
    estimatedTotal > 0
      ? Math.round((estimatedTotal * site.payment.depositPercent) / 100)
      : 0;

  function goMonth(delta: number) {
    setView((current) => {
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  const canGoPrev =
    view.year > today.getFullYear() ||
    (view.year === today.getFullYear() && view.month > today.getMonth());

  function handleDayClick(key: string, date: Date) {
    if (date < today || isBlockedWeekend(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      onCheckInChange(key);
      onCheckOutChange("");
      onArrivalTimeChange("");
      return;
    }

    if (key === checkIn) {
      onCheckOutChange(key);
      return;
    }

    if (parseDateKey(key) < parseDateKey(checkIn)) {
      onCheckInChange(key);
      onCheckOutChange("");
      onArrivalTimeChange("");
      return;
    }

    if (rangeHasBlockedDay(checkIn, key)) return;

    onCheckOutChange(key);
  }

  function isInRange(key: string) {
    if (!checkIn || !checkOut) return false;
    const d = parseDateKey(key).getTime();
    const start = parseDateKey(checkIn).getTime();
    const end = parseDateKey(checkOut).getTime();
    return d >= start && d <= end;
  }

  return (
    <div className="space-y-4">
      {rentalRates ? (
        <div>
          <p className="mb-2 text-sm font-medium text-charcoal/80">
            {t.forms.reservation.rateTypeLabel}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(["day", "night"] as const).map((type) => {
              const selected = rateType === type;
              const amount =
                type === "day" ? rentalRates.perDay : rentalRates.perNight;
              const label =
                type === "day"
                  ? t.forms.reservation.perDay
                  : t.forms.reservation.perNight;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onRateTypeChange(type)}
                  className={`rounded-sm border px-3 py-3 text-left transition ${
                    selected
                      ? "border-gold bg-gold/10 ring-1 ring-gold/30"
                      : "border-charcoal/10 bg-white hover:border-gold/40"
                  }`}
                >
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-warm">
                    {label}
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold text-gold">
                    {formatColones(amount)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-2 text-sm font-medium text-charcoal/80">
          {t.forms.reservation.pickDates}
        </p>
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
          const isBlocked = isBlockedWeekend(date);
          const disabled = isPast || isBlocked;
          const key = formatDateKey(view.year, view.month, day);
          const isCheckIn = checkIn === key;
          const isCheckOut = checkOut === key;
          const inRange = isInRange(key);

          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              title={isBlocked ? t.forms.reservation.blockedWeekend : undefined}
              onClick={() => handleDayClick(key, date)}
              className={`relative aspect-square rounded-sm text-sm transition ${
                isBlocked
                  ? "cursor-not-allowed bg-red-50 text-red-400/80 line-through decoration-2"
                  : isPast
                    ? "cursor-not-allowed text-charcoal/20"
                    : isCheckIn || isCheckOut
                      ? "bg-gold font-semibold text-white"
                      : inRange
                        ? "bg-gold/20 text-charcoal"
                        : "text-charcoal hover:bg-gold/15"
              }`}
            >
              {day}
              {isBlocked ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-[18%] border-t-2 border-red-400/70"
                  style={{ transform: "rotate(-28deg)", top: "48%" }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-warm">
        <span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-red-100 align-middle ring-1 ring-red-300" />
        {t.forms.reservation.blockedWeekend}
      </p>

      {checkIn ? (
        <div className="space-y-4 rounded-sm border border-charcoal/10 bg-white p-4 text-sm">
          <div>
            <p>
              <span className="font-medium text-charcoal">{t.forms.reservation.checkIn}:</span>{" "}
              <span className="text-slate-warm">{checkIn}</span>
            </p>
            <p className="mt-1">
              <span className="font-medium text-charcoal">
                {t.forms.reservation.checkInTimeLabel}:
              </span>{" "}
              <span className="text-slate-warm">{t.forms.reservation.checkInTimeValue}</span>
            </p>
            {checkOut ? (
              <>
                <p className="mt-1">
                  <span className="font-medium text-charcoal">{t.forms.reservation.checkOut}:</span>{" "}
                  <span className="text-slate-warm">{checkOut}</span>
                </p>
                <p className="mt-2 text-slate-warm">
                  {formatMessage(t.forms.reservation.staySummary, {
                    count: String(nights),
                    unit:
                      rateType === "day"
                        ? t.forms.reservation.dayUnit
                        : t.forms.reservation.nightUnit,
                  })}
                </p>
                {estimatedTotal > 0 ? (
                  <p className="mt-2 font-display text-lg font-semibold text-gold">
                    {formatMessage(t.forms.reservation.estimatedTotal, {
                      total: formatColones(estimatedTotal),
                    })}
                  </p>
                ) : null}
              </>
            ) : (
              <p className="mt-2 text-xs text-slate-warm">
                {t.forms.reservation.selectCheckout}
              </p>
            )}
          </div>

          {checkOut ? (
            <div>
              <p className="mb-1 text-sm font-medium text-charcoal/80">
                {t.forms.reservation.arrivalTimeLabel}
              </p>
              <p className="mb-2 text-xs text-slate-warm">
                {t.forms.reservation.arrivalTimeHint}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {ARRIVAL_SLOTS.map((slot) => {
                  const selected = arrivalTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => onArrivalTimeChange(slot)}
                      className={`rounded-full border px-3 py-2.5 text-sm font-semibold transition ${
                        selected
                          ? "border-gold bg-gold text-navy"
                          : "border-charcoal/15 bg-cream/60 text-charcoal hover:border-gold/50"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {checkOut && estimatedTotal > 0 ? (
            <div className="rounded-sm border border-navy/10 bg-sand/60 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/70">
                {t.forms.reservation.depositTitle}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-warm">
                {t.forms.reservation.depositDescription}
              </p>
              <p className="mt-3 font-display text-xl font-semibold text-navy">
                {formatMessage(t.forms.reservation.depositAmount, {
                  amount: formatColones(depositAmount),
                })}
              </p>
              <p className="mt-3 text-sm text-charcoal">
                {formatMessage(t.forms.reservation.paymentAccount, {
                  name: site.payment.accountName,
                })}
              </p>
              <p className="mt-1 text-sm text-charcoal">
                {formatMessage(t.forms.reservation.paymentSinpePhone, {
                  phone: site.payment.sinpePhone,
                })}
              </p>

              <p className="mb-2 mt-4 text-sm font-medium text-charcoal/80">
                {t.forms.reservation.paymentMethodLabel}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["sinpe", t.forms.reservation.paymentSinpe],
                    ["transfer", t.forms.reservation.paymentTransfer],
                  ] as const
                ).map(([method, label]) => {
                  const selected = paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => onPaymentMethodChange(method)}
                      className={`rounded-full border px-3 py-2.5 text-sm font-semibold transition ${
                        selected
                          ? "border-navy bg-navy text-white"
                          : "border-charcoal/15 bg-white text-charcoal hover:border-navy/40"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-warm">
                {t.forms.reservation.paymentConfirmHint}
              </p>
            </div>
          ) : null}

          <input type="hidden" name="checkIn" value={checkIn} required />
          {checkOut ? <input type="hidden" name="checkOut" value={checkOut} required /> : null}
          <input type="hidden" name="checkInTime" value="08:00" />
          {arrivalTime ? (
            <input type="hidden" name="arrivalTime" value={arrivalTime} required />
          ) : null}
          <input type="hidden" name="rateType" value={rateType} />
          {nights > 0 ? (
            <input type="hidden" name="nights" value={String(nights)} />
          ) : null}
          {estimatedTotal > 0 ? (
            <input type="hidden" name="estimatedTotal" value={String(estimatedTotal)} />
          ) : null}
          {depositAmount > 0 ? (
            <input type="hidden" name="depositAmount" value={String(depositAmount)} />
          ) : null}
          {paymentMethod ? (
            <input type="hidden" name="paymentMethod" value={paymentMethod} required />
          ) : null}
        </div>
      ) : (
        <p className="text-xs text-slate-warm">{t.forms.reservation.selectCheckIn}</p>
      )}
    </div>
  );
}
