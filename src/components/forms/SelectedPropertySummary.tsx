"use client";

import Image from "next/image";
import { formatPropertyPrice, getPropertyById, type Property } from "@/lib/properties";
import { useTranslations } from "@/components/LanguageProvider";
import { useImageOrientation } from "@/components/useImageOrientation";

type SelectedPropertySummaryProps = {
  property?: Property;
  propertyId?: string;
  title: string;
  summaryLabel?: string;
  onChange?: () => void;
};

export default function SelectedPropertySummary({
  property: propertyProp,
  propertyId,
  title,
  summaryLabel,
  onChange,
}: SelectedPropertySummaryProps) {
  const { t } = useTranslations();
  const { register, getOrientation } = useImageOrientation();
  const property =
    (propertyId ? getPropertyById(propertyId) : undefined) ?? propertyProp;
  const displayTitle = property?.title ?? title;
  const orientation = property ? getOrientation(property.image) : "landscape";

  return (
    <div className="rounded-sm border border-gold/30 bg-gold/5 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
        {summaryLabel ?? t.forms.selectedProperty.label}
      </p>
      <div className="mt-3 flex gap-4">
        {property ? (
          <div
            className={`relative shrink-0 overflow-hidden rounded-sm border border-charcoal/10 bg-stone-100 ${
              orientation === "portrait" ? "h-20 w-14" : "h-16 w-24"
            }`}
          >
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="96px"
              onLoad={(e) => {
                const img = e.currentTarget;
                register(property.image, img.naturalWidth, img.naturalHeight);
              }}
              className="object-contain object-bottom"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-medium leading-snug text-charcoal">
            {displayTitle}
          </p>
          {property ? (
            <>
              <p className="mt-1 text-xs text-slate-warm">{property.location}</p>
              <p className="mt-1 text-xs font-semibold text-gold">
                {formatPropertyPrice(property)}
              </p>
            </>
          ) : null}
        </div>
      </div>
      {onChange ? (
        <button
          type="button"
          onClick={onChange}
          className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-warm transition hover:text-gold"
        >
          {t.forms.selectedProperty.chooseOther}
        </button>
      ) : null}
    </div>
  );
}
