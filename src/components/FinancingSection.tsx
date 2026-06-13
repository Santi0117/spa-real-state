"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import FinanceLenderCard from "@/components/forms/FinanceLenderCard";
import PropertyVisitPicker from "@/components/forms/PropertyVisitPicker";
import { useTranslations } from "@/components/LanguageProvider";
import { financingLenders, minDownPayment } from "@/lib/financing";
import { formatPrice, getPropertyById, resolvePropertySelection } from "@/lib/properties";
import { site } from "@/lib/site";
import { agendarVisitaHref } from "@/lib/visit-scheduling";

function resolveInitialSelection(propertyId?: string | null, propertyName?: string | null) {
  return resolvePropertySelection({
    id: propertyId,
    title: propertyName,
    filter: (property) => property.status === "Venta",
  });
}

export default function FinancingSection() {
  const searchParams = useSearchParams();
  const { t } = useTranslations();
  const initial = useMemo(
    () =>
      resolveInitialSelection(
        searchParams.get("id"),
        searchParams.get("propiedad")
      ),
    [searchParams]
  );

  const [selectedId, setSelectedId] = useState(initial.id);

  useEffect(() => {
    setSelectedId(initial.id);
  }, [initial.id]);

  const selectedProperty =
    selectedId && getPropertyById(selectedId)?.status === "Venta"
      ? getPropertyById(selectedId)
      : undefined;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#financiamiento") return;
    document.getElementById("financiamiento")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [searchParams]);

  const propertyPrice = selectedProperty?.price ?? 0;
  const defaultDownPayment =
    propertyPrice > 0 ? minDownPayment(propertyPrice) : 0;

  const whatsappMessage = encodeURIComponent(
    selectedProperty
      ? `Hola Jopa, quiero información para financiar ${selectedProperty.title} (${site.brand}, valor ${propertyPrice.toLocaleString("en-US")}).`
      : `Hola Jopa, quiero información sobre financiamiento inmobiliario.`
  );
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${whatsappMessage}`;

  function clearSelection() {
    setSelectedId("");
  }

  function handlePropertySelect(id: string, _title: string) {
    if (id === selectedId) {
      clearSelection();
      return;
    }

    const property = getPropertyById(id);
    if (!property || property.status !== "Venta") return;
    setSelectedId(id);
  }

  return (
    <section id="financiamiento" className="scroll-mt-28 border-t border-charcoal/8 bg-cream py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="section-label">{t.financing.label}</p>
          <h2 className="font-display mt-3 text-3xl font-medium tracking-tight text-charcoal md:text-4xl">
            {t.financing.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-warm md:text-base">
            {t.financing.description}
          </p>
        </div>

        <div className="mt-8 rounded-sm border border-charcoal/8 bg-white p-4 shadow-sm sm:p-5">
          <PropertyVisitPicker
            selectedId={selectedId}
            onSelect={handlePropertySelect}
            filter={(property) => property.status === "Venta"}
          />
          <p className="mt-3 text-xs text-slate-warm">{t.financing.pickerHint}</p>
        </div>

        {selectedProperty && propertyPrice > 0 ? (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-sm border border-gold/30 bg-gold/5 px-4 py-4 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                  {t.financing.selectedLabel}
                </p>
                <p className="font-display mt-1 text-lg font-medium text-charcoal">
                  {selectedProperty.title}
                </p>
                <p className="mt-0.5 text-sm text-slate-warm">{selectedProperty.location}</p>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-warm transition hover:text-gold"
                >
                  {t.financing.clearSelection}
                </button>
              </div>
              <p className="font-display text-2xl font-semibold text-gold sm:text-3xl">
                {formatPrice(propertyPrice)}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {financingLenders.map((lender) => (
                <FinanceLenderCard
                  key={lender.id}
                  lender={lender}
                  propertyPrice={propertyPrice}
                  defaultDownPayment={defaultDownPayment}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold justify-center rounded-sm sm:min-w-[240px]"
              >
                {t.financing.whatsapp}
              </a>
              <Link
                href={agendarVisitaHref({ propertyId: selectedProperty.id })}
                className="btn-outline justify-center rounded-sm sm:min-w-[200px]"
              >
                {t.financing.schedule}
              </Link>
            </div>

            <p className="text-xs leading-relaxed text-slate-warm">{t.financing.disclaimer}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
