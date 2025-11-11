import { render, screen, waitFor, act } from "@testing-library/react";
import { TranslationProvider, TranslationContext } from "../TranslationContext";
import { useContext } from "react";
import { Locale } from "@/locales";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
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
const mockNavigatorLanguage = (lang: string) => {
  Object.defineProperty(window.navigator, "language", {
    writable: true,
    configurable: true,
    value: lang,
  });
};

// Test component that uses the context
function TestComponent() {
  const context = useContext(TranslationContext);
  if (!context) return <div>No context</div>;

  const { locale, changeLanguage, t } = context;

  return (
    <div>
      <div data-testid="current-locale">{locale}</div>
      <div data-testid="translation">{t("common.loading")}</div>
      <button onClick={() => changeLanguage("en-US")}>Change to English</button>
      <button onClick={() => changeLanguage("es-ES")}>Change to Spanish</button>
      <button onClick={() => changeLanguage("pt-BR")}>
        Change to Portuguese
      </button>
    </div>
  );
}

describe("TranslationProvider", () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockNavigatorLanguage("pt-BR");
  });

  describe("Initialization", () => {
    it("should initialize with default locale (pt-BR)", () => {
      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      expect(screen.getByTestId("current-locale")).toHaveTextContent("pt-BR");
    });

    it("should load locale from localStorage if available", async () => {
      localStorageMock.setItem("preferred-locale", "en-US");

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("current-locale")).toHaveTextContent("en-US");
      });
    });

    it("should detect browser language on first visit", async () => {
      mockNavigatorLanguage("es-ES");

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("current-locale")).toHaveTextContent("es-ES");
      });
    });

    it("should fallback to pt-BR if localStorage has invalid locale", async () => {
      localStorageMock.setItem("preferred-locale", "invalid-locale");

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("current-locale")).toHaveTextContent("pt-BR");
      });
    });

    it("should handle localStorage unavailable gracefully", async () => {
      const originalGetItem = localStorageMock.getItem;
      localStorageMock.getItem = () => {
        throw new Error("localStorage unavailable");
      };

      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "localStorage unavailable, using default locale"
        );
      });

      localStorageMock.getItem = originalGetItem;
      consoleWarnSpy.mockRestore();
    });
  });

  describe("Language Change", () => {
    it("should change language correctly", async () => {
      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("current-locale")).toHaveTextContent("pt-BR");
      });

      act(() => {
        screen.getByText("Change to English").click();
      });

      await waitFor(() => {
        expect(screen.getByTestId("current-locale")).toHaveTextContent("en-US");
      });
    });

    it("should update translations when language changes", async () => {
      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("translation")).toHaveTextContent(
          "Carregando..."
        );
      });

      act(() => {
        screen.getByText("Change to English").click();
      });

      await waitFor(() => {
        expect(screen.getByTestId("translation")).toHaveTextContent(
          "Loading..."
        );
      });
    });

    it("should reject invalid locale and log error", async () => {
      const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

      function TestInvalidLocale() {
        const context = useContext(TranslationContext);
        if (!context) return null;

        return (
          <button onClick={() => context.changeLanguage("invalid" as Locale)}>
            Invalid
          </button>
        );
      }

      render(
        <TranslationProvider>
          <TestInvalidLocale />
        </TranslationProvider>
      );

      act(() => {
        screen.getByText("Invalid").click();
      });

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining("Invalid locale: invalid")
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Persistence", () => {
    it("should persist language selection to localStorage", async () => {
      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      act(() => {
        screen.getByText("Change to English").click();
      });

      await waitFor(() => {
        expect(localStorageMock.getItem("preferred-locale")).toBe("en-US");
      });
    });

    it("should handle localStorage.setItem failure gracefully", async () => {
      const originalSetItem = localStorageMock.setItem;
      localStorageMock.setItem = () => {
        throw new Error("localStorage full");
      };

      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("current-locale")).toHaveTextContent("pt-BR");
      });

      act(() => {
        screen.getByText("Change to English").click();
      });

      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          "Failed to save locale to localStorage"
        );
      });

      localStorageMock.setItem = originalSetItem;
      consoleWarnSpy.mockRestore();
    });
  });
});
