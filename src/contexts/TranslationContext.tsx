"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import {
  Locale,
  TranslationDictionary,
  translations,
  DEFAULT_LOCALE,
  LOCALES,
} from "@/locales";

// Context type definition
interface TranslationContextType {
  locale: Locale;
  changeLanguage: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

// Create context with undefined default (will be provided by Provider)
export const TranslationContext = createContext<
  TranslationContextType | undefined
>(undefined);

// Provider props
interface TranslationProviderProps {
  children: ReactNode;
}

// Helper function to get nested value from object using dot notation
function getNestedValue(
  obj: TranslationDictionary,
  path: string
): string | undefined {
  const keys = path.split(".");
  let current: any = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

// Helper function to interpolate variables in translation strings
function interpolate(str: string, params: Record<string, string>): string {
  return str.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] !== undefined ? params[key] : match;
  });
}

// Helper function to detect browser language
function detectBrowserLanguage(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const browserLang = navigator.language || (navigator as any).userLanguage;

  // Check if browser language matches any of our supported locales
  const supportedLocales = Object.keys(LOCALES) as Locale[];
  const matchedLocale = supportedLocales.find((locale) =>
    browserLang.startsWith(locale.split("-")[0])
  );

  return matchedLocale || DEFAULT_LOCALE;
}

// Helper function to validate locale
function isValidLocale(locale: string): locale is Locale {
  return locale === "pt-BR" || locale === "en-US" || locale === "es-ES";
}

// LocalStorage key
const LOCALE_STORAGE_KEY = "preferred-locale";

export function TranslationProvider({ children }: TranslationProviderProps) {
  // Always start with DEFAULT_LOCALE to match server-side rendering
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  // Initialize locale on mount (client-side only)
  useEffect(() => {
    try {
      // Try to get locale from localStorage
      const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

      if (storedLocale && isValidLocale(storedLocale)) {
        setLocale(storedLocale);
      } else {
        // Detect browser language on first visit
        const detectedLocale = detectBrowserLanguage();
        setLocale(detectedLocale);
        localStorage.setItem(LOCALE_STORAGE_KEY, detectedLocale);
      }
    } catch (error) {
      // localStorage might be unavailable (private mode, etc.)
      console.warn("localStorage unavailable, using default locale");
      const detectedLocale = detectBrowserLanguage();
      setLocale(detectedLocale);
    }
  }, []);

  // Memoize current translations to avoid recalculation
  const currentTranslations = useMemo(() => {
    return translations[locale as Locale];
  }, [locale]);

  // Change language function - memoized to prevent unnecessary re-renders
  const changeLanguage = useCallback((newLocale: Locale) => {
    if (!isValidLocale(newLocale)) {
      console.error(
        `Invalid locale: ${newLocale}. Falling back to ${DEFAULT_LOCALE}`
      );
      return;
    }

    setLocale(newLocale);

    // Persist to localStorage
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch (error) {
      console.warn("Failed to save locale to localStorage");
    }
  }, []);

  // Translation function - memoized for performance
  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      if (!currentTranslations) {
        console.error(`Translations not found for locale: ${locale}`);
        return key;
      }

      const value = getNestedValue(currentTranslations, key);

      if (value === undefined) {
        if (
          typeof process !== "undefined" &&
          process.env.NODE_ENV === "development"
        ) {
          console.warn(
            `Translation key not found: ${key} for locale: ${locale}`
          );
        }
        return key;
      }

      // Apply interpolation if params provided
      if (params) {
        return interpolate(value, params);
      }

      return value;
    },
    [currentTranslations, locale]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue: TranslationContextType = useMemo(
    () => ({
      locale,
      changeLanguage,
      t,
    }),
    [locale, changeLanguage, t]
  );

  // Always render children to avoid hydration mismatch
  // The locale will update after mount if needed
  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}
