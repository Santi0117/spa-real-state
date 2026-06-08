import type { Metadata } from "next";
import FormPageShell from "@/components/FormPageShell";
import ScheduleVisitForm from "@/components/forms/ScheduleVisitForm";
import { getPropertyById } from "@/lib/properties";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Agendar visita — ${site.brand}`,
  description: "Reservá un horario con un asesor de Jopa Real Estate.",
};

type PageProps = {
  searchParams: Promise<{ propiedad?: string; id?: string }>;
};

export default async function AgendarVisitaPage({ searchParams }: PageProps) {
  const { propiedad, id } = await searchParams;
  const property = id ? getPropertyById(id) : undefined;
  const propertyName = property?.title ?? propiedad;
  const propertyId = property?.id ?? id;

  return (
    <FormPageShell
      title={propertyName ? `Agendar visita — ${propertyName}` : "Agendar visita"}
      description={
        propertyName
          ? `Estás agendando una visita para esta propiedad. Elegí el día y horario que más te convenga; un asesor te confirmará la cita.`
          : "Elegí la propiedad, el día y horario que más te convenga. Un asesor te confirmará la cita."
      }
    >
      <ScheduleVisitForm propertyName={propertyName} propertyId={propertyId} />
    </FormPageShell>
  );
}
