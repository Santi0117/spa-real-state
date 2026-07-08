"use client";

import Link from "next/link";
import type { Property } from "@/lib/properties";
import { isReservationProperty } from "@/lib/properties";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import { financiarHref, schedulingHref } from "@/lib/visit-scheduling";

type PropertyVisitCtaProps = {
  property: Property;
  className?: string;
};

export default function PropertyVisitCta({ property, className = "" }: PropertyVisitCtaProps) {
  const { t } = useTranslations();
  const reservation = isReservationProperty(property);
  const scheduleHref = schedulingHref(property);
  const financeHref = financiarHref({ propertyId: property.id });

  return (
    <div
      className={`border border-charcoal/8 bg-white p-6 shadow-sm md:p-8 ${className}`}
    >
      <p className="section-label">
        {reservation ? t.propertyVisit.reservationLabel : t.propertyVisit.label}
      </p>
      <h2 className="font-display mt-2 text-2xl font-medium text-charcoal">
        {reservation ? t.propertyVisit.reservationTitle : t.propertyVisit.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-warm">
        {formatMessage(
          reservation ? t.propertyVisit.reservationDescription : t.propertyVisit.description,
          { title: property.title }
        )}
      </p>
      <div className="mt-6 space-y-3">
        <Link href={scheduleHref} className="btn-gold w-full justify-center rounded-sm">
          {reservation
            ? t.propertyVisit.scheduleReservationProperty
            : t.propertyVisit.scheduleVisitProperty}
        </Link>
        {!reservation ? (
          <Link href={financeHref} className="btn-gold w-full justify-center rounded-sm">
            {t.common.finance}
          </Link>
        ) : null}
      </div>
      <Link
        href="/#listings"
        className="mt-4 block text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-warm transition hover:text-gold"
      >
        {t.propertyVisit.viewMore}
      </Link>
    </div>
  );
}
