import type { Metadata } from "next";
import FormPageShell from "@/components/FormPageShell";
import ScheduleVisitForm from "@/components/forms/ScheduleVisitForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Agendar visita — ${site.brand}`,
  description: "Reservá un horario con un asesor de Jopa Real Estate.",
};

type PageProps = {
  searchParams: Promise<{ propiedad?: string }>;
};

export default async function AgendarVisitaPage({ searchParams }: PageProps) {
  const { propiedad } = await searchParams;

  return (
    <FormPageShell
      title="Agendar visita"
      description={
        propiedad
          ? `Estás agendando una visita para: ${propiedad}. Elegí el día y horario que más te convenga.`
          : "Elegí el día y horario que más te convenga. Un asesor te confirmará la cita por teléfono o correo."
      }
    >
      <ScheduleVisitForm propertyName={propiedad} />
    </FormPageShell>
  );
}
