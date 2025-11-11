/**
 * Tests for TranslationContext - Language Persistence and Detection
 *
 * This test file verifies:
 * - localStorage saves selected language correctly
 * - Language is restored on page reload
 * - Browser language detection on first visit
 * - Fallback to pt-BR if invalid locale in localStorage
 */

import { renderHook, act, waitFor } from "@testing-library/react";
import { TranslationProvider } from "../TranslationContext";
import { useTranslation } from "@/hooks/useTranslation";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock navigator.language
const setNavigatorLanguage = (lang: string) => {
  Object.defineProperty(window.navigator, "language", {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe("TranslationContext - Persistence and Detection", () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Reset to default browser language
    setNavigatorLanguage("pt-BR");
  });

  describe("localStorage persistence", () => {
    it("should save selected language to localStorage", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Wait for initial hydration
      await waitFor(() => {
        expect(result.current.locale).toBeDefined();
      });

      // Change language to English
      act(() => {
        result.current.changeLanguage("en-US");
      });

      // Verify localStorage was updated
      expect(localStorageMock.getItem("preferred-locale")).toBe("en-US");
      expect(result.current.locale).toBe("en-US");
    });

    it("should restore language from localStorage on mount", async () => {
      // Pre-populate localStorage with Spanish
      localStorageMock.setItem("preferred-locale", "es-ES");

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Wait for hydration and verify Spanish is loaded
      await waitFor(() => {
        expect(result.current.locale).toBe("es-ES");
      });
    });

    it("should persist language across multiple changes", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      await waitFor(() => {
        expect(result.current.locale).toBeDefined();
      });

      // Change to English
      act(() => {
        result.current.changeLanguage("en-US");
      });
      expect(localStorageMock.getItem("preferred-locale")).toBe("en-US");

      // Change to Spanish
      act(() => {
        result.current.changeLanguage("es-ES");
      });
      expect(localStorageMock.getItem("preferred-locale")).toBe("es-ES");

      // Change back to Portuguese
      act(() => {
        result.current.changeLanguage("pt-BR");
      });
      expect(localStorageMock.getItem("preferred-locale")).toBe("pt-BR");
    });
  });

  describe("Browser language detection", () => {
    it("should detect Portuguese browser language on first visit", async () => {
      setNavigatorLanguage("pt-BR");

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      await waitFor(() => {
        expect(result.current.locale).toBe("pt-BR");
      });

      // Should also save to localStorage
      expect(localStorageMock.getItem("preferred-locale")).toBe("pt-BR");
    });

    it("should detect English browser language on first visit", async () => {
      setNavigatorLanguage("en-US");

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      await waitFor(() => {
        expect(result.current.locale).toBe("en-US");
      });

      expect(localStorageMock.getItem("preferred-locale")).toBe("en-US");
    });

    it("should detect Spanish browser language on first visit", async () => {
      setNavigatorLanguage("es-ES");

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      await waitFor(() => {
        expect(result.current.locale).toBe("es-ES");
      });

      expect(localStorageMock.getItem("preferred-locale")).toBe("es-ES");
    });

    it("should match browser language by prefix (en matches en-US)", async () => {
      setNavigatorLanguage("en-GB"); // British English

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      await waitFor(() => {
        expect(result.current.locale).toBe("en-US"); // Should match en-US
      });
    });

    it("should fallback to pt-BR for unsupported browser language", async () => {
      setNavigatorLanguage("fr-FR"); // French - not supported

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      await waitFor(() => {
        expect(result.current.locale).toBe("pt-BR");
      });
    });
  });

  describe("Invalid locale handling", () => {
    it("should fallback to pt-BR if invalid locale in localStorage", async () => {
      // Set invalid locale in localStorage
      localStorageMock.setItem("preferred-locale", "invalid-locale");

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      await waitFor(() => {
        // Should detect browser language instead of using invalid locale
        expect(result.current.locale).toBe("pt-BR");
      });
    });

    it("should not change locale when trying to set invalid locale", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      await waitFor(() => {
        expect(result.current.locale).toBeDefined();
      });

      const initialLocale = result.current.locale;

      // Try to set invalid locale
      act(() => {
        result.current.changeLanguage("invalid" as any);
      });

      // Locale should remain unchanged
      expect(result.current.locale).toBe(initialLocale);
    });

    it("should handle corrupted localStorage gracefully", async () => {
      // Mock localStorage to throw error
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem = () => {
        throw new Error("localStorage unavailable");
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Should still work and detect browser language
      await waitFor(() => {
        expect(result.current.locale).toBe("pt-BR");
      });

      // Restore original
      localStorageMock.getItem = originalGetItem;
    });
  });

  describe("localStorage priority over browser detection", () => {
    it("should use localStorage value even if browser language is different", async () => {
      // Browser is in English
      setNavigatorLanguage("en-US");
      // But user previously selected Spanish
      localStorageMock.setItem("preferred-locale", "es-ES");

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <TranslationProvider>{children}</TranslationProvider>
      );

      const { result } = renderHook(() => useTranslation(), { wrapper });

      // Should use localStorage value (Spanish), not browser language (English)
      await waitFor(() => {
        expect(result.current.locale).toBe("es-ES");
      });
    });
  });
});
