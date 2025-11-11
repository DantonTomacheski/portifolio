// Import translation files
import ptBR from "./pt-BR.json";
import enUS from "./en-US.json";
import esES from "./es-ES.json";

// Locale type definition
export type Locale = "pt-BR" | "en-US" | "es-ES";

// Translation dictionary type (recursive for nested keys)
export type TranslationDictionary = {
  [key: string]: string | TranslationDictionary;
};

// Locale metadata with display information
export const LOCALES: Record<Locale, { name: string; flag: string }> = {
  "pt-BR": { name: "Português", flag: "🇧🇷" },
  "en-US": { name: "English", flag: "🇺🇸" },
  "es-ES": { name: "Español", flag: "🇪🇸" },
};

// Default locale
export const DEFAULT_LOCALE: Locale = "pt-BR";

// Export translations
export const translations: Record<Locale, TranslationDictionary> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": esES,
};
