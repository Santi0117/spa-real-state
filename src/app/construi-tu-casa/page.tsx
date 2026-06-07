import type { Metadata } from "next";
import FormPageShell from "@/components/FormPageShell";
import BuildHouseForm from "@/components/forms/BuildHouseForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Construí tu casa — ${site.brand}`,
  description: "Asesoría para construir tu casa en Costa Rica, con o sin lote.",
};

export default function ConstruiTuCasaPage() {
  return (
    <FormPageShell
      title="Construir tu casa"
      description="Contanos tu situación y presupuesto. Te acompañamos en la búsqueda de lote, diseño y construcción."
    >
      <BuildHouseForm />
    </FormPageShell>
  );
}
