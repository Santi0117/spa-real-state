"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  formatPrice,
  getCatalogProperties,
  type Property,
} from "@/lib/properties";
import { useTranslations } from "@/components/LanguageProvider";
import {
  thumbFrameClass,
  useImageOrientation,
} from "@/components/useImageOrientation";

type PropertyVisitPickerProps = {
  selectedId?: string;
  onSelect: (id: string, title: string) => void;
  filter?: (property: Property) => boolean;
};

export default function PropertyVisitPicker({
  selectedId,
  onSelect,
  filter,
}: PropertyVisitPickerProps) {
  const { t } = useTranslations();
  const { register, getOrientation } = useImageOrientation();
  const selectedRef = useRef<HTMLButtonElement>(null);
  const visibleProperties = getCatalogProperties(filter);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [selectedId]);

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-charcoal/80">
        {t.propertyPicker.choose}
      </p>
      <div className="hide-scrollbar -mx-1 flex items-end gap-3 overflow-x-auto px-1 pb-2 snap-x snap-mandatory">
        {visibleProperties.map((property) => {
          const isSelected = selectedId === property.id;
          const orientation = getOrientation(property.image);
          const statusLabel =
            property.status === "Venta" ? t.property.sale : t.property.rent;

          return (
            <button
              key={property.id}
              ref={isSelected ? selectedRef : undefined}
              type="button"
              onClick={() => onSelect(property.id, property.title)}
              className={`snap-start shrink-0 text-left transition ${
                orientation === "portrait" ? "w-[4.75rem]" : "w-[7.75rem]"
              } ${isSelected ? "opacity-100" : "opacity-85 hover:opacity-100"}`}
            >
              <div
                className={`relative overflow-hidden rounded-sm border-2 bg-stone-100 transition ${thumbFrameClass(orientation)} ${
                  isSelected
                    ? "border-gold shadow-md shadow-gold/20"
                    : "border-charcoal/10 hover:border-gold/40"
                }`}
              >
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="120px"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    register(property.image, img.naturalWidth, img.naturalHeight);
                  }}
                  className="object-contain object-bottom"
                />
                <span className="absolute left-0 top-0 bg-charcoal/85 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
                  {statusLabel}
                </span>
                {isSelected && (
                  <span className="absolute right-1 top-5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                    ✓
                  </span>
                )}
              </div>
              <p
                className={`mt-1.5 line-clamp-2 text-[10px] leading-snug ${
                  isSelected ? "font-semibold text-charcoal" : "text-slate-warm"
                }`}
              >
                {property.title}
              </p>
              <p className="mt-0.5 text-[9px] font-semibold text-gold">
                {formatPrice(property.price, property.priceLabel, property.currency)}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
