"use client";

import { useSearchParams } from "next/navigation";
import FormPageShell from "@/components/FormPageShell";
import ScheduleReservationForm from "@/components/forms/ScheduleReservationForm";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import { resolvePropertyRef } from "@/lib/properties";

export default function AgendarReservaPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? undefined;
  const propiedad = searchParams.get("propiedad") ?? undefined;
  const { t } = useTranslations();

  const property = resolvePropertyRef({ id, title: propiedad });
  const propertyName = property?.title ?? propiedad ?? undefined;
  const propertyId = property?.id ?? id;

  const title = propertyName
    ? formatMessage(t.forms.scheduleReservation.titleWithProperty, {
        property: propertyName,
      })
    : t.forms.scheduleReservation.title;

  const description = propertyName
    ? t.forms.scheduleReservation.descriptionWithProperty
    : t.forms.scheduleReservation.description;

  return (
    <FormPageShell title={title} description={description}>
      <ScheduleReservationForm propertyName={propertyName} propertyId={propertyId} />
    </FormPageShell>
  );
}
