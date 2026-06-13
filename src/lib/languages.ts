import type { LanguageCode } from "@/lib/i18n";

export const languages = [
  { code: "es" as const, label: "Español", country: "ES" },
  { code: "en" as const, label: "English", country: "US" },
  { code: "pt" as const, label: "Português", country: "BR" },
] as const;

export type { LanguageCode };
