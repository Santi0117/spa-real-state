import type { Metadata } from "next";
import FormPageShell from "@/components/FormPageShell";
import FinanceCalculator from "@/components/forms/FinanceCalculator";
import { getPropertyById } from "@/lib/properties";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Calcular financiamiento — ${site.brand}`,
  description:
    "Elegí tu propiedad, compará opciones de crédito hipotecario y calculá tu cuota mensual con Jopa Real Estate.",
};

type PageProps = {
  searchParams: Promise<{ id?: string; propiedad?: string }>;
};

export default async function FinanciarPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const property = params.id ? getPropertyById(params.id) : undefined;
  const propertyName = property?.title ?? params.propiedad;
  const propertyId = property?.id ?? params.id;

  return (
    <FormPageShell
      wide
      unboxed
      stepLabel="Herramientas de compra"
      title="Calcular financiamiento"
      description="Seleccioná la propiedad, revisá el valor total y compará distintas opciones de financiamiento con distintas entidades."
    >
      <FinanceCalculator propertyName={propertyName} propertyId={propertyId} />
    </FormPageShell>
  );
}
