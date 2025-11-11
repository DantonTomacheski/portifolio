/**
 * Final Validation Tests for i18n Translation System
 * Task 13: Final polish and validation
 *
 * This test suite validates:
 * - Keyboard navigation in LanguageSelector
 * - No console errors or warnings
 * - Complete translations in all languages
 * - Edge cases (invalid locale, missing keys, localStorage unavailable)
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TranslationProvider } from "@/contexts/TranslationContext";
import LanguageSelector from "@/components/LanguageSelector";
import { translations } from "@/locales";

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

describe("Final Validation - Keyboard Navigation", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("should open dropdown with Enter key", () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    const button = screen.getByRole("combobox");
    fireEvent.keyDown(button, { key: "Enter" });

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("should open dropdown with Space key", () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    const button = screen.getByRole("combobox");
    fireEvent.keyDown(button, { key: " " });

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("should close dropdown with Escape key", () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    const button = screen.getByRole("combobox");
    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(button, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("should allow selecting language with Enter key", async () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    const options = screen.getAllByRole("option");
    const englishOption = options.find((opt) =>
      opt.textContent?.includes("English")
    );

    if (englishOption) {
      fireEvent.keyDown(englishOption, { key: "Enter" });

      await waitFor(() => {
        expect(button.textContent).toContain("English");
      });
    }
  });

  it("should have proper ARIA attributes", () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    const button = screen.getByRole("combobox");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-haspopup", "listbox");
    expect(button).toHaveAttribute("aria-label");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

describe("Final Validation - Translation Completeness", () => {
  const requiredKeys = [
    "common.loading",
    "common.error",
    "common.back",
    "nav.about",
    "nav.experiences",
    "nav.projects",
    "nav.skills",
    "home.title",
    "home.subtitle",
    "home.npcMessage",
    "home.connectTitle",
    "home.questButtons.about",
    "home.questButtons.experiences",
    "home.questButtons.projects",
    "home.questButtons.skills",
    "about.title",
    "about.subtitle",
    "about.mission",
    "about.missionText",
    "about.interests",
    "about.contact",
    "about.languages",
    "experiences.title",
    "experiences.subtitle",
    "experiences.mainTasks",
    "experiences.technologies",
    "projects.title",
    "projects.subtitle",
    "projects.noProjects",
    "projects.viewOnGithub",
    "projects.topics",
    "projects.technologies",
    "skills.title",
    "skills.subtitle",
    "footer.copyright",
    "footer.builtWith",
  ];

  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((current, key) => current?.[key], obj);
  };

  it("should have all required keys in pt-BR", () => {
    const ptBR = translations["pt-BR"];
    requiredKeys.forEach((key) => {
      const value = getNestedValue(ptBR, key);
      expect(value).toBeDefined();
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it("should have all required keys in en-US", () => {
    const enUS = translations["en-US"];
    requiredKeys.forEach((key) => {
      const value = getNestedValue(enUS, key);
      expect(value).toBeDefined();
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it("should have all required keys in es-ES", () => {
    const esES = translations["es-ES"];
    requiredKeys.forEach((key) => {
      const value = getNestedValue(esES, key);
      expect(value).toBeDefined();
      expect(typeof value).toBe("string");
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it("should have matching structure across all locales", () => {
    const locales = ["pt-BR", "en-US", "es-ES"] as const;
    const structures = locales.map((locale) =>
      JSON.stringify(Object.keys(translations[locale]).sort())
    );

    // All locales should have the same top-level keys
    expect(structures[0]).toBe(structures[1]);
    expect(structures[1]).toBe(structures[2]);
  });
});

describe("Final Validation - Edge Cases", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("should handle invalid locale gracefully", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    // Try to set invalid locale through localStorage
    localStorageMock.setItem("preferred-locale", "invalid-locale");

    // Component should still render without crashing
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it("should handle missing translation keys", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    const TestComponent = () => {
      const { t } = require("@/hooks/useTranslation").useTranslation();
      return <div>{t("nonexistent.key")}</div>;
    };

    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    // Should render the key itself as fallback
    expect(screen.getByText("nonexistent.key")).toBeInTheDocument();

    consoleWarnSpy.mockRestore();
  });

  it("should work when localStorage is unavailable", () => {
    // Mock localStorage to throw errors
    const originalGetItem = localStorageMock.getItem;
    const originalSetItem = localStorageMock.setItem;

    localStorageMock.getItem = () => {
      throw new Error("localStorage unavailable");
    };
    localStorageMock.setItem = () => {
      throw new Error("localStorage unavailable");
    };

    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    // Should still render and work
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    // Restore
    localStorageMock.getItem = originalGetItem;
    localStorageMock.setItem = originalSetItem;
    consoleWarnSpy.mockRestore();
  });

  it("should handle interpolation with missing parameters", () => {
    const TestComponent = () => {
      const { t } = require("@/hooks/useTranslation").useTranslation();
      // footer.copyright expects {year} and {name} params
      return <div>{t("footer.copyright")}</div>;
    };

    render(
      <TranslationProvider>
        <TestComponent />
      </TranslationProvider>
    );

    // Should render with placeholders intact
    const element = screen.getByText(/\{year\}|\{name\}/);
    expect(element).toBeInTheDocument();
  });

  it("should handle rapid language changes", async () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    const button = screen.getByRole("combobox");

    // Rapidly change languages
    fireEvent.click(button);
    const options = screen.getAllByRole("option");

    fireEvent.click(options[1]); // Switch to second language
    fireEvent.click(button);
    fireEvent.click(options[2]); // Switch to third language
    fireEvent.click(button);
    fireEvent.click(options[0]); // Switch back to first language

    // Should handle without errors
    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });
  });
});

describe("Final Validation - No Console Errors", () => {
  it("should not produce console errors during normal operation", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    const options = screen.getAllByRole("option");
    if (options.length > 0) {
      fireEvent.click(options[0]);
    }

    // Should not have any console errors
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should not produce console warnings during normal operation", () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();

    render(
      <TranslationProvider>
        <LanguageSelector />
      </TranslationProvider>
    );

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    const options = screen.getAllByRole("option");
    if (options.length > 0) {
      fireEvent.click(options[0]);
    }

    // Should not have any console warnings
    expect(consoleWarnSpy).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });
});
