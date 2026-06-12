export const languages = [
  { code: "es", label: "Español", country: "ES" },
  { code: "en", label: "English", country: "US" },
  { code: "pt", label: "Português", country: "BR" },
  { code: "fr", label: "Français", country: "FR" },
  { code: "de", label: "Deutsch", country: "DE" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];
