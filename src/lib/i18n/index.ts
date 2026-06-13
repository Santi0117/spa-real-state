import { en } from "./en";
import { es } from "./es";
import { pt } from "./pt";
import type { LanguageCode, Translations } from "./types";

export const translations: Record<LanguageCode, Translations> = {
  es,
  en,
  pt,
};

export function formatMessage(
  message: string,
  values?: Record<string, string | number>
): string {
  if (!values) return message;
  return message.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return value === undefined ? `{${key}}` : String(value);
  });
}

export type { LanguageCode, Translations } from "./types";
