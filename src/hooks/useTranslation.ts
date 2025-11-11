"use client";

import { useContext } from "react";
import { TranslationContext } from "@/contexts/TranslationContext";

/**
 * Hook to access translation context
 * Must be used within a TranslationProvider
 *
 * @returns Translation context with locale, changeLanguage, and t function
 * @throws Error if used outside TranslationProvider
 */
export function useTranslation() {
  const context = useContext(TranslationContext);

  if (context === undefined) {
    throw new Error(
      "useTranslation must be used within a TranslationProvider. " +
        "Make sure your component is wrapped with <TranslationProvider>."
    );
  }

  return context;
}
