"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { properties, type Property } from "@/lib/properties";

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
  const selectedRef = useRef<HTMLButtonElement>(null);
  const visibleProperties = filter ? properties.filter(filter) : properties;

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
        Elegí la propiedad
      </p>
      <div className="hide-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-2 snap-x snap-mandatory">
        {visibleProperties.map((property) => {
          const isSelected = selectedId === property.id;
          return (
            <button
              key={property.id}
              ref={isSelected ? selectedRef : undefined}
              type="button"
              onClick={() => onSelect(property.id, property.title)}
              className={`snap-start shrink-0 w-[7.5rem] text-left transition ${
                isSelected ? "opacity-100" : "opacity-85 hover:opacity-100"
              }`}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-sm border-2 transition ${
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
                  className="object-cover"
                />
                {isSelected && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
