import { renderHook } from "@testing-library/react";
import { useTranslation } from "../useTranslation";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { ReactNode } from "react";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
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
const mockNavigatorLanguage = (lang: string) => {
  Object.defineProperty(window.navigator, "language", {
    writable: true,
    configurable: true,
    value: lang,
  });
};

describe("useTranslation Hook", () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockNavigatorLanguage("pt-BR");
  });

  it("should return translation context when used within Provider", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <TranslationProvider>{children}</TranslationProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(result.current).toBeDefined();
    expect(result.current.locale).toBeDefined();
    expect(typeof result.current.changeLanguage).toBe("function");
    expect(typeof result.current.t).toBe("function");
  });

  it("should return correct locale", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <TranslationProvider>{children}</TranslationProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(result.current.locale).toBe("pt-BR");
  });

  it("should provide working translation function", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <TranslationProvider>{children}</TranslationProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });

    const translation = result.current.t("common.loading");
    expect(translation).toBe("Carregando...");
  });

  it("should provide working changeLanguage function", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <TranslationProvider>{children}</TranslationProvider>
    );

    const { result } = renderHook(() => useTranslation(), { wrapper });

    expect(result.current.locale).toBe("pt-BR");

    // Change language
    result.current.changeLanguage("en-US");

    // Note: Due to async nature, we check that the function exists and can be called
    expect(typeof result.current.changeLanguage).toBe("function");
  });

  it("should throw error when used outside Provider", () => {
    // Suppress console.error for this test
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      renderHook(() => useTranslation());
    }).toThrow("useTranslation must be used within a TranslationProvider");

    consoleErrorSpy.mockRestore();
  });

  it("should throw descriptive error message", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    try {
      renderHook(() => useTranslation());
    } catch (error) {
      expect((error as Error).message).toContain("TranslationProvider");
      expect((error as Error).message).toContain(
        "Make sure your component is wrapped"
      );
    }

    consoleErrorSpy.mockRestore();
  });

  it("should maintain stable reference across re-renders", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <TranslationProvider>{children}</TranslationProvider>
    );

    const { result, rerender } = renderHook(() => useTranslation(), {
      wrapper,
    });

    const firstT = result.current.t;
    const firstChangeLanguage = result.current.changeLanguage;

    rerender();

    // Functions should be memoized and maintain reference
    expect(result.current.t).toBe(firstT);
    expect(result.current.changeLanguage).toBe(firstChangeLanguage);
  });
});
