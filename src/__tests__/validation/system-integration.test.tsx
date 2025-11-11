/**
 * System Integration Test - Complete i18n System Validation
 * Verifies the entire translation system works end-to-end
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSelector from "@/components/LanguageSelector";
import { translations, LOCALES } from "@/locales";

// Test component that uses translations
const TestPage = () => {
  const { t, locale } = useTranslation();

  return (
    <div>
      <h1>{t("home.title")}</h1>
      <p>{t("home.subtitle")}</p>
      <p data-testid="locale">{locale}</p>
      <p>{t("footer.copyright", { year: "2024", name: "Test User" })}</p>
    </div>
  );
};

describe("System Integration - Complete i18n System", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render complete system with all components", () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
        <TestPage />
      </TranslationProvider>
    );

    // Language selector should be present
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    // Content should be rendered
    expect(screen.getByText(/DANTON TOMACHESKI/i)).toBeInTheDocument();
  });

  it("should translate entire page when language changes", async () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
        <TestPage />
      </TranslationProvider>
    );

    // Initial state (should be English based on test environment)
    const localeDisplay = screen.getByTestId("locale");
    const initialLocale = localeDisplay.textContent;

    // Open dropdown
    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    // Wait for dropdown to appear
    await waitFor(() => {
      const dropdown = screen.queryByRole("listbox");
      if (dropdown) {
        // Find and click a different language option
        const options = screen.getAllByRole("option");
        const differentOption = options.find(
          (opt) => !opt.getAttribute("aria-selected")
        );

        if (differentOption) {
          fireEvent.click(differentOption);
        }
      }
    });

    // Verify locale changed
    await waitFor(() => {
      const newLocale = screen.getByTestId("locale").textContent;
      expect(newLocale).not.toBe(initialLocale);
    });
  });

  it("should handle interpolation correctly", () => {
    render(
      <TranslationProvider>
        <TestPage />
      </TranslationProvider>
    );

    // Check interpolated text
    expect(screen.getByText(/2024.*Test User/)).toBeInTheDocument();
  });

  it("should persist language selection", async () => {
    const { unmount } = render(
      <TranslationProvider>
        <LanguageSelector />
        <TestPage />
      </TranslationProvider>
    );

    // Change language
    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const dropdown = screen.queryByRole("listbox");
      if (dropdown) {
        const options = screen.getAllByRole("option");
        if (options.length > 1) {
          fireEvent.click(options[1]);
        }
      }
    });

    // Get the selected locale
    const selectedLocale = screen.getByTestId("locale").textContent;

    // Unmount and remount (simulating page reload)
    unmount();

    render(
      <TranslationProvider>
        <LanguageSelector />
        <TestPage />
      </TranslationProvider>
    );

    // Verify locale was restored
    await waitFor(() => {
      expect(screen.getByTestId("locale").textContent).toBe(selectedLocale);
    });
  });

  it("should have all required translation keys", () => {
    const requiredSections = [
      "common",
      "nav",
      "home",
      "about",
      "experiences",
      "projects",
      "skills",
      "footer",
    ];

    Object.keys(LOCALES).forEach((locale) => {
      const trans = translations[locale as keyof typeof translations];

      requiredSections.forEach((section) => {
        expect(trans).toHaveProperty(section);
        expect(typeof trans[section]).toBe("object");
      });
    });
  });

  it("should maintain consistent structure across locales", () => {
    const localeKeys = Object.keys(LOCALES);
    const structures = localeKeys.map((locale) => {
      const trans = translations[locale as keyof typeof translations];
      return JSON.stringify(Object.keys(trans).sort());
    });

    // All structures should be identical
    structures.forEach((structure) => {
      expect(structure).toBe(structures[0]);
    });
  });

  it("should handle all three languages", () => {
    expect(Object.keys(translations)).toHaveLength(3);
    expect(translations).toHaveProperty("pt-BR");
    expect(translations).toHaveProperty("en-US");
    expect(translations).toHaveProperty("es-ES");
  });

  it("should have proper locale metadata", () => {
    expect(LOCALES["pt-BR"]).toEqual({
      name: "Português",
      flag: "🇧🇷",
    });
    expect(LOCALES["en-US"]).toEqual({
      name: "English",
      flag: "🇺🇸",
    });
    expect(LOCALES["es-ES"]).toEqual({
      name: "Español",
      flag: "🇪🇸",
    });
  });
});

describe("System Integration - Performance", () => {
  it("should have reasonable bundle size", () => {
    const allTranslations = JSON.stringify(translations);
    const sizeInBytes = new Blob([allTranslations]).size;
    const sizeInKB = sizeInBytes / 1024;

    // Should be well under 50KB
    expect(sizeInKB).toBeLessThan(50);
  });

  it("should switch languages quickly", async () => {
    render(
      <TranslationProvider>
        <LanguageSelector />
        <TestPage />
      </TranslationProvider>
    );

    const startTime = performance.now();

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    await waitFor(() => {
      const dropdown = screen.queryByRole("listbox");
      if (dropdown) {
        const options = screen.getAllByRole("option");
        if (options.length > 0) {
          fireEvent.click(options[0]);
        }
      }
    });

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete in under 500ms (requirement)
    expect(duration).toBeLessThan(500);
  });
});
