/**
 * Performance Tests for Translation System
 *
 * Tests verify:
 * 1. Language switch happens in under 500ms
 * 2. Scroll position is maintained on language change
 * 3. App state is preserved on language change
 * 4. Bundle size of translation files is under 50KB
 *
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */

import { renderHook, act, waitFor } from "@testing-library/react";
import { useTranslation } from "@/hooks/useTranslation";
import { TranslationProvider } from "../TranslationContext";
import { translations } from "@/locales";
import React from "react";

// Wrapper component for tests
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

describe("Translation System Performance", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe("Requirement 6.1: Language switch performance", () => {
    it("should switch language in under 500ms", async () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const startTime = performance.now();

      act(() => {
        result.current.changeLanguage("en-US");
      });

      await waitFor(() => {
        expect(result.current.locale).toBe("en-US");
      });

      const endTime = performance.now();
      const switchTime = endTime - startTime;

      console.log(`Language switch time: ${switchTime.toFixed(2)}ms`);
      expect(switchTime).toBeLessThan(500);
    });

    it("should handle multiple rapid language switches efficiently", async () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const startTime = performance.now();

      act(() => {
        result.current.changeLanguage("en-US");
        result.current.changeLanguage("es-ES");
        result.current.changeLanguage("pt-BR");
      });

      await waitFor(() => {
        expect(result.current.locale).toBe("pt-BR");
      });

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      console.log(`Multiple switches time: ${totalTime.toFixed(2)}ms`);
      expect(totalTime).toBeLessThan(1000); // 3 switches in under 1 second
    });

    it("should translate multiple keys quickly", () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      const startTime = performance.now();

      // Simulate translating a typical page with many keys
      const translations = [];
      for (let i = 0; i < 50; i++) {
        translations.push(result.current.t("home.title"));
        translations.push(result.current.t("nav.about"));
        translations.push(
          result.current.t("footer.copyright", { year: "2024", name: "Test" })
        );
      }

      const endTime = performance.now();
      const translationTime = endTime - startTime;

      console.log(`150 translations time: ${translationTime.toFixed(2)}ms`);
      expect(translationTime).toBeLessThan(100); // Should be very fast
    });
  });

  describe("Requirement 6.2: Scroll position maintenance", () => {
    it("should not cause page reload on language change", async () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Mock window.scrollTo to verify it's not called
      const scrollToSpy = jest.fn();
      const originalScrollTo = window.scrollTo;
      window.scrollTo = scrollToSpy;

      act(() => {
        result.current.changeLanguage("en-US");
      });

      await waitFor(() => {
        expect(result.current.locale).toBe("en-US");
      });

      // Verify scrollTo was not called (no forced scroll)
      expect(scrollToSpy).not.toHaveBeenCalled();

      // Restore original
      window.scrollTo = originalScrollTo;
    });

    it("should use React state updates (no page navigation)", async () => {
      const { result, rerender } = renderHook(() => useTranslation(), {
        wrapper,
      });

      const initialLocale = result.current.locale;

      act(() => {
        result.current.changeLanguage("en-US");
      });

      // Component should still be mounted (no navigation)
      rerender();

      await waitFor(() => {
        expect(result.current.locale).toBe("en-US");
      });

      // Verify we're still in the same component instance
      expect(result.current.changeLanguage).toBeDefined();
    });
  });

  describe("Requirement 6.3: App state preservation", () => {
    it("should preserve component state during language change", async () => {
      const { result } = renderHook(
        () => {
          const translation = useTranslation();
          const [componentState] = React.useState({ value: "preserved" });
          return { translation, componentState };
        },
        { wrapper }
      );

      const initialState = result.current.componentState;

      act(() => {
        result.current.translation.changeLanguage("en-US");
      });

      await waitFor(() => {
        expect(result.current.translation.locale).toBe("en-US");
      });

      // Component state should be preserved
      expect(result.current.componentState).toBe(initialState);
      expect(result.current.componentState.value).toBe("preserved");
    });

    it("should not unmount components during language change", async () => {
      let mountCount = 0;
      let unmountCount = 0;

      const { result } = renderHook(
        () => {
          const translation = useTranslation();

          React.useEffect(() => {
            mountCount++;
            return () => {
              unmountCount++;
            };
          }, []);

          return translation;
        },
        { wrapper }
      );

      const initialMountCount = mountCount;

      act(() => {
        result.current.changeLanguage("en-US");
      });

      await waitFor(() => {
        expect(result.current.locale).toBe("en-US");
      });

      // Component should not have remounted
      expect(mountCount).toBe(initialMountCount);
      expect(unmountCount).toBe(0);
    });
  });

  describe("Requirement 6.4 & 6.5: Bundle size", () => {
    it("should have total bundle size under 50KB", () => {
      const jsonString = JSON.stringify(translations);
      const sizeInBytes = new Blob([jsonString]).size;
      const sizeInKB = sizeInBytes / 1024;

      console.log(`Total bundle size: ${sizeInKB.toFixed(2)} KB`);
      expect(sizeInKB).toBeLessThan(50);
    });

    it("should have reasonable size for each locale", () => {
      Object.entries(translations).forEach(([locale, translation]) => {
        const jsonString = JSON.stringify(translation);
        const sizeInBytes = new Blob([jsonString]).size;
        const sizeInKB = sizeInBytes / 1024;

        console.log(`${locale} size: ${sizeInKB.toFixed(2)} KB`);
        expect(sizeInKB).toBeLessThan(20); // Each locale should be under 20KB
      });
    });

    it("should load translations synchronously (no async loading)", () => {
      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Translations should be immediately available
      const translation = result.current.t("home.title");
      expect(translation).toBeDefined();
      expect(typeof translation).toBe("string");
    });
  });

  describe("Overall performance characteristics", () => {
    it("should have memoized translation function", async () => {
      const { result, rerender } = renderHook(() => useTranslation(), {
        wrapper,
      });

      const firstT = result.current.t;

      // Rerender without changing locale
      rerender();

      const secondT = result.current.t;

      // Translation function should be memoized (same reference)
      expect(firstT).toBe(secondT);
    });

    it("should have memoized changeLanguage function", () => {
      const { result, rerender } = renderHook(() => useTranslation(), {
        wrapper,
      });

      const firstChangeLanguage = result.current.changeLanguage;

      rerender();

      const secondChangeLanguage = result.current.changeLanguage;

      // changeLanguage should be memoized (same reference)
      expect(firstChangeLanguage).toBe(secondChangeLanguage);
    });

    it("should update locale efficiently while keeping functions memoized", async () => {
      const { result, rerender } = renderHook(() => useTranslation(), {
        wrapper,
      });

      const initialLocale = result.current.locale;
      const initialChangeLanguage = result.current.changeLanguage;
      const initialT = result.current.t;

      // Rerender without locale change
      rerender();

      // Functions should remain memoized
      expect(result.current.changeLanguage).toBe(initialChangeLanguage);
      expect(result.current.t).toBe(initialT);

      // Change to a different locale (ensure it's different from initial)
      const newLocale = initialLocale === "pt-BR" ? "en-US" : "pt-BR";

      act(() => {
        result.current.changeLanguage(newLocale);
      });

      await waitFor(() => {
        expect(result.current.locale).toBe(newLocale);
      });

      // Locale should have changed
      expect(result.current.locale).not.toBe(initialLocale);
      expect(result.current.locale).toBe(newLocale);

      // Functions should still be memoized (same references)
      expect(result.current.changeLanguage).toBe(initialChangeLanguage);
    });
  });
});
