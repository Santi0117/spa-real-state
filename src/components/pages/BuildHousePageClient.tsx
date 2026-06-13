"use client";

import FormPageShell from "@/components/FormPageShell";
import BuildHouseForm from "@/components/forms/BuildHouseForm";
import { useTranslations } from "@/components/LanguageProvider";

export default function BuildHousePageClient() {
  const { t } = useTranslations();

  return (
    <FormPageShell
      title={t.forms.buildHouse.title}
      description={t.forms.buildHouse.description}
    >
      <BuildHouseForm />
    </FormPageShell>
  );
}
