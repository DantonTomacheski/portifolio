"use client";

import { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Client component that updates the HTML lang attribute
 * when the locale changes in the TranslationContext
 */
export function HtmlLangUpdater() {
  const { locale } = useTranslation();

  useEffect(() => {
    // Update the html lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  // This component doesn't render anything
  return null;
}
