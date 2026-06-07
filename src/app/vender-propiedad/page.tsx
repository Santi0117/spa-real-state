import type { Metadata } from "next";
import FormPageShell from "@/components/FormPageShell";
import SellPropertyForm from "@/components/forms/SellPropertyForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Vender propiedad — ${site.brand}`,
  description: "Contanos sobre tu propiedad y te ayudamos a venderla al mejor precio.",
};

export default function VenderPropiedadPage() {
  return (
    <FormPageShell
      title="Vender tu casa"
      description="Completá el formulario con los datos de tu propiedad. Te contactaremos para una valuación y plan de venta."
    >
      <SellPropertyForm />
    </FormPageShell>
  );
}
