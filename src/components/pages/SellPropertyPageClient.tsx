"use client";

import FormPageShell from "@/components/FormPageShell";
import SellPropertyForm from "@/components/forms/SellPropertyForm";
import { useTranslations } from "@/components/LanguageProvider";

export default function SellPropertyPageClient() {
  const { t } = useTranslations();

  return (
    <FormPageShell
      title={t.forms.sellProperty.title}
      description={t.forms.sellProperty.description}
    >
      <SellPropertyForm />
    </FormPageShell>
  );
}
