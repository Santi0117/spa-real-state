"use client";

import { useTranslations } from "@/components/LanguageProvider";

export default function FormSuccess() {
  const { t } = useTranslations();

  return (
    <div className="py-8 text-center">
      <p className="font-display text-2xl font-bold text-gold">{t.forms.successTitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-warm">{t.forms.successMessage}</p>
    </div>
  );
}
