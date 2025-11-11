import { render, screen, waitFor } from "@testing-library/react";
import { TranslationProvider, TranslationContext } from "../TranslationContext";
import { useContext } from "react";

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

describe("Translation Function (t)", () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockNavigatorLanguage("pt-BR");
  });

  describe("Simple Keys", () => {
    it("should translate simple keys correctly", async () => {
      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return <div data-testid="result">{context.t("common.loading")}</div>;
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent("Carregando...");
      });
    });

    it("should translate different simple keys", async () => {
      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return (
          <div>
            <div data-testid="error">{context.t("common.error")}</div>
            <div data-testid="back">{context.t("common.back")}</div>
          </div>
        );
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("error")).toHaveTextContent("Erro");
        expect(screen.getByTestId("back")).toHaveTextContent("Voltar");
      });
    });
  });

  describe("Nested Keys", () => {
    it("should translate nested keys with dot notation", async () => {
      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return (
          <div>
            <div data-testid="nav-about">{context.t("nav.about")}</div>
            <div data-testid="nav-experiences">
              {context.t("nav.experiences")}
            </div>
            <div data-testid="nav-projects">{context.t("nav.projects")}</div>
          </div>
        );
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("nav-about")).toHaveTextContent("Sobre Mim");
        expect(screen.getByTestId("nav-experiences")).toHaveTextContent(
          "Experiências"
        );
        expect(screen.getByTestId("nav-projects")).toHaveTextContent(
          "Projetos"
        );
      });
    });

    it("should translate deeply nested keys", async () => {
      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return (
          <div data-testid="result">{context.t("home.questButtons.about")}</div>
        );
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent(
          "Sobre Mim (Status)"
        );
      });
    });
  });

  describe("Interpolation", () => {
    it("should interpolate single variable", async () => {
      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return (
          <div data-testid="result">
            {context.t("footer.copyright", { year: "2024", name: "Test User" })}
          </div>
        );
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent(
          "© 2024 Test User. Todos os direitos reservados."
        );
      });
    });

    it("should handle missing interpolation parameters", async () => {
      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return (
          <div data-testid="result">
            {context.t("footer.copyright", { year: "2024" })}
          </div>
        );
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        const text = screen.getByTestId("result").textContent;
        expect(text).toContain("2024");
        expect(text).toContain("{name}"); // Placeholder should remain
      });
    });

    it("should work without interpolation params when not needed", async () => {
      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return <div data-testid="result">{context.t("common.loading")}</div>;
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent("Carregando...");
      });
    });
  });

  describe("Fallbacks", () => {
    it("should return key as fallback if translation not found", async () => {
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return <div data-testid="result">{context.t("nonexistent.key")}</div>;
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent(
          "nonexistent.key"
        );
      });

      consoleWarnSpy.mockRestore();
    });

    it("should log warning in development for missing keys", async () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
        configurable: true,
      });
      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return <div>{context.t("missing.translation.key")}</div>;
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            "Translation key not found: missing.translation.key"
          )
        );
      });

      Object.defineProperty(process.env, "NODE_ENV", {
        value: originalEnv,
        writable: true,
        configurable: true,
      });
      consoleWarnSpy.mockRestore();
    });

    it("should handle partial nested key paths gracefully", async () => {
      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return (
          <div data-testid="result">
            {context.t("nav.nonexistent.deep.key")}
          </div>
        );
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent(
          "nav.nonexistent.deep.key"
        );
      });
    });
  });

  describe("Language-specific translations", () => {
    it("should return correct translation for English", async () => {
      localStorageMock.setItem("preferred-locale", "en-US");

      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return <div data-testid="result">{context.t("common.loading")}</div>;
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent("Loading...");
      });
    });

    it("should return correct translation for Spanish", async () => {
      localStorageMock.setItem("preferred-locale", "es-ES");

      function TestComponent() {
        const context = useContext(TranslationContext);
        if (!context) return null;
        return <div data-testid="result">{context.t("common.loading")}</div>;
      }

      render(
        <TranslationProvider>
          <TestComponent />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId("result")).toHaveTextContent("Cargando...");
      });
    });
  });
});
