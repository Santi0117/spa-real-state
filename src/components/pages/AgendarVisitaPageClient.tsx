"use client";

import { useSearchParams } from "next/navigation";
import FormPageShell from "@/components/FormPageShell";
import ScheduleVisitForm from "@/components/forms/ScheduleVisitForm";
import { useTranslations } from "@/components/LanguageProvider";
import { formatMessage } from "@/lib/i18n";
import { resolvePropertyRef } from "@/lib/properties";

export default function AgendarVisitaPageClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? undefined;
  const propiedad = searchParams.get("propiedad") ?? undefined;
  const { t } = useTranslations();

  const property = resolvePropertyRef({ id, title: propiedad });
  const propertyName = property?.title ?? propiedad ?? undefined;
  const propertyId = property?.id ?? id;

  const title = propertyName
    ? formatMessage(t.forms.scheduleVisit.titleWithProperty, { property: propertyName })
    : t.forms.scheduleVisit.title;

  const description = propertyName
    ? t.forms.scheduleVisit.descriptionWithProperty
    : t.forms.scheduleVisit.description;

  return (
    <FormPageShell title={title} description={description}>
      <ScheduleVisitForm propertyName={propertyName} propertyId={propertyId} />
    </FormPageShell>
  );
}
