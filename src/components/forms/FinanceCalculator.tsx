"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FinanceLenderCard from "./FinanceLenderCard";
import FinancePropertySummary from "./FinancePropertySummary";
import PropertyVisitPicker from "./PropertyVisitPicker";
import { financingLenders, minDownPayment } from "@/lib/financing";
import { getPropertyById, properties, type Property } from "@/lib/properties";
import { site } from "@/lib/site";
import { agendarVisitaHref } from "@/lib/visit-scheduling";

type FinanceCalculatorProps = {
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

const saleProperties = properties.filter((property) => property.status === "Venta");

export default function FinanceCalculator({
  propertyName: initialName,
  propertyId: initialId,
}: FinanceCalculatorProps) {
  const prefill = useMemo(
    () => resolvePrefill(initialId, initialName),
    [initialId, initialName]
  );

  const [selectedId, setSelectedId] = useState(prefill.id);
  const [selectedTitle, setSelectedTitle] = useState(prefill.title);
  const [selectedProperty, setSelectedProperty] = useState(prefill.property);
  const [showPicker, setShowPicker] = useState(!prefill.prefilled);
  const [customPrice, setCustomPrice] = useState("");

  useEffect(() => {
    setSelectedId(prefill.id);
    setSelectedTitle(prefill.title);
    setSelectedProperty(prefill.property);
    setShowPicker(!prefill.prefilled);
  }, [prefill]);

  const propertyPrice =
    selectedProperty?.price ?? (Number.parseFloat(customPrice) || 0);
  const defaultDownPayment = propertyPrice > 0 ? minDownPayment(propertyPrice) : 0;

  const whatsappMessage = encodeURIComponent(
    `Hola Jopa, quiero información para financiar ${selectedTitle || "una propiedad"}${
      propertyPrice > 0 ? ` (${site.brand}, valor ${propertyPrice.toLocaleString("en-US")})` : ""
    }.`
  );
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${whatsappMessage}`;

  function handlePropertySelect(id: string, title: string) {
    setSelectedId(id);
    setSelectedTitle(title);
    setSelectedProperty(getPropertyById(id));
    setCustomPrice("");
    setShowPicker(false);
  }

  function handleDropdownChange(id: string) {
    if (!id) {
      setSelectedId("");
      setSelectedTitle("");
      setSelectedProperty(undefined);
      return;
    }
    const property = getPropertyById(id);
    if (!property) return;
    handlePropertySelect(property.id, property.title);
  }

  return (
    <div className="space-y-8">
      {showPicker ? (
        <section className="space-y-5">
          <div>
            <label htmlFor="finance-property-select" className="mb-2 block text-sm font-medium text-charcoal/80">
              Elegí la propiedad
            </label>
            <select
              id="finance-property-select"
              value={selectedId}
              onChange={(e) => handleDropdownChange(e.target.value)}
              className="input-field rounded-sm"
            >
              <option value="">Seleccioná una propiedad…</option>
              {saleProperties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.title} — ${property.price.toLocaleString("en-US")}
                </option>
              ))}
            </select>
          </div>

          <PropertyVisitPicker
            selectedId={selectedId}
            onSelect={handlePropertySelect}
            filter={(property) => property.status === "Venta"}
          />
        </section>
      ) : selectedTitle ? (
        <>
          {!selectedProperty && (
            <div className="rounded-sm border border-charcoal/10 bg-cream/40 p-4">
              <p className="text-sm font-medium text-charcoal">{selectedTitle}</p>
              <label htmlFor="customPrice" className="mb-1.5 mt-4 block text-sm text-charcoal/80">
                Valor de la propiedad (USD)
              </label>
              <input
                id="customPrice"
                type="number"
                min="0"
                step="1000"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="input-field rounded-sm"
                placeholder="Ej. 250000"
              />
              <button
                type="button"
                onClick={() => setShowPicker(true)}
                className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-warm transition hover:text-gold"
              >
                Elegir otra propiedad
              </button>
            </div>
          )}

          {propertyPrice > 0 ? (
            <>
              <FinancePropertySummary
                property={selectedProperty}
                title={selectedTitle}
                price={propertyPrice}
                onChange={() => setShowPicker(true)}
              />

              <section>
                <h2 className="font-display text-2xl font-medium text-charcoal sm:text-3xl">
                  Configure una opción de financiamiento
                </h2>
                <p className="mt-2 text-sm text-slate-warm">
                  Compará entidades, ajustá la prima y el plazo. Los montos son referenciales.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {financingLenders.map((lender) => (
                    <FinanceLenderCard
                      key={lender.id}
                      lender={lender}
                      propertyPrice={propertyPrice}
                      defaultDownPayment={defaultDownPayment}
                    />
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-3 border-t border-charcoal/8 pt-6 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold justify-center rounded-sm sm:min-w-[260px]"
                >
                  Contactar asesor por WhatsApp
                </a>
                {selectedId ? (
                  <Link
                    href={agendarVisitaHref({ propertyId: selectedId })}
                    className="btn-outline justify-center rounded-sm sm:min-w-[220px]"
                  >
                    Agendar visita
                  </Link>
                ) : null}
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Pre-aprobación crédito — ${selectedTitle}`
                  )}&body=${encodeURIComponent(
                    `Hola, me interesa solicitar pre-aprobación para financiar ${selectedTitle}.`
                  )}`}
                  className="btn-outline justify-center rounded-sm sm:min-w-[260px]"
                >
                  Solicitar pre-aprobación
                </a>
              </section>

              <p className="text-xs leading-relaxed text-slate-warm">
                * Cálculo referencial con tasa fija estimada. La cuota final depende de evaluación
                crediticia, seguros, comisiones bancarias y tipo de cambio aplicable. Podés cancelar
                el monto en colones al tipo de cambio de referencia del BCCR.
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-warm">
              {selectedProperty
                ? "Esta propiedad no tiene precio disponible para calcular financiamiento."
                : "Ingresá el valor de la propiedad para continuar con el cálculo."}
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-slate-warm">Seleccioná una propiedad para calcular tu financiamiento.</p>
      )}
    </div>
  );
}
