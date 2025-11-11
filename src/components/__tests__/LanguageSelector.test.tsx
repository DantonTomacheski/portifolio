import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LanguageSelector from "../LanguageSelector";
import { TranslationProvider } from "@/contexts/TranslationContext";

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

describe("LanguageSelector Component", () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockNavigatorLanguage("pt-BR");
  });

  describe("Dropdown Variant", () => {
    it("should render with current language", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      await waitFor(() => {
        expect(screen.getByText("Português")).toBeInTheDocument();
        expect(screen.getByText("🇧🇷")).toBeInTheDocument();
      });
    });

    it("should show dropdown when clicked", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
        expect(screen.getByText("English")).toBeInTheDocument();
        expect(screen.getByText("Español")).toBeInTheDocument();
      });
    });

    it("should close dropdown when language is selected", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      // Open dropdown
      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Select English
      const englishOption = screen.getByRole("option", { name: /English/i });
      fireEvent.click(englishOption);

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should change language when option is selected", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      // Open dropdown
      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      // Select English
      const englishOption = screen.getByRole("option", { name: /English/i });
      fireEvent.click(englishOption);

      await waitFor(() => {
        expect(screen.getByText("English")).toBeInTheDocument();
        expect(screen.getByText("🇺🇸")).toBeInTheDocument();
      });
    });

    it("should close dropdown when clicking outside", async () => {
      render(
        <div>
          <TranslationProvider>
            <LanguageSelector />
          </TranslationProvider>
          <div data-testid="outside">Outside</div>
        </div>
      );

      // Open dropdown
      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Click outside
      fireEvent.mouseDown(screen.getByTestId("outside"));

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should mark current language as selected", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      // Open dropdown
      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      await waitFor(() => {
        const portugueseOption = screen.getByRole("option", {
          name: /Português/i,
        });
        expect(portugueseOption).toHaveAttribute("aria-selected", "true");
      });
    });

    it("should display checkmark for selected language", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      // Open dropdown
      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      await waitFor(() => {
        const checkmark = screen.getByLabelText("Selected");
        expect(checkmark).toBeInTheDocument();
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("should open dropdown with Enter key", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      const button = screen.getByRole("button", { name: /Current language/i });
      button.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("should open dropdown with Space key", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      const button = screen.getByRole("button", { name: /Current language/i });
      button.focus();
      await user.keyboard(" ");

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });
    });

    it("should close dropdown with Escape key", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      // Open dropdown
      const button = screen.getByRole("button", { name: /Current language/i });
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Focus the button and press Escape
      button.focus();
      await user.keyboard("{Escape}");

      await waitFor(() => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      });
    });

    it("should select language with Enter key on option", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      // Open dropdown
      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
      });

      // Focus and select English option
      const englishOption = screen.getByRole("option", { name: /English/i });
      englishOption.focus();
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(screen.getByText("English")).toBeInTheDocument();
      });
    });
  });

  describe("Buttons Variant", () => {
    it("should render all language buttons", () => {
      render(
        <TranslationProvider>
          <LanguageSelector variant="buttons" />
        </TranslationProvider>
      );

      expect(screen.getByText(/Português/)).toBeInTheDocument();
      expect(screen.getByText(/English/)).toBeInTheDocument();
      expect(screen.getByText(/Español/)).toBeInTheDocument();
    });

    it("should highlight current language button", () => {
      render(
        <TranslationProvider>
          <LanguageSelector variant="buttons" />
        </TranslationProvider>
      );

      const portugueseButton = screen.getByRole("button", {
        name: /Switch to Português/i,
      });
      expect(portugueseButton).toHaveAttribute("aria-pressed", "true");
    });

    it("should change language when button is clicked", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector variant="buttons" />
        </TranslationProvider>
      );

      const englishButton = screen.getByRole("button", {
        name: /Switch to English/i,
      });
      fireEvent.click(englishButton);

      await waitFor(() => {
        expect(englishButton).toHaveAttribute("aria-pressed", "true");
      });
    });

    it("should display flags for all languages", () => {
      render(
        <TranslationProvider>
          <LanguageSelector variant="buttons" />
        </TranslationProvider>
      );

      expect(screen.getByText("🇧🇷")).toBeInTheDocument();
      expect(screen.getByText("🇺🇸")).toBeInTheDocument();
      expect(screen.getByText("🇪🇸")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes for dropdown", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      const combobox = screen.getByRole("combobox");
      expect(combobox).toHaveAttribute("aria-expanded", "false");
      expect(combobox).toHaveAttribute("aria-haspopup", "listbox");
      expect(combobox).toHaveAttribute("aria-label", "Language selector");
    });

    it("should update aria-expanded when dropdown opens", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      await waitFor(() => {
        const combobox = screen.getByRole("combobox");
        expect(combobox).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should have proper aria-label for button", () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      const button = screen.getByRole("button", {
        name: /Current language: Português/i,
      });
      expect(button).toBeInTheDocument();
    });

    it("should have tabIndex on options for keyboard navigation", async () => {
      render(
        <TranslationProvider>
          <LanguageSelector />
        </TranslationProvider>
      );

      // Open dropdown
      const button = screen.getByRole("button", { name: /Current language/i });
      fireEvent.click(button);

      await waitFor(() => {
        const options = screen.getAllByRole("option");
        options.forEach((option) => {
          expect(option).toHaveAttribute("tabIndex", "0");
        });
      });
    });
  });

  describe("Custom className", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <TranslationProvider>
          <LanguageSelector className="custom-class" />
        </TranslationProvider>
      );

      const wrapper = container.querySelector(".custom-class");
      expect(wrapper).toBeInTheDocument();
    });
  });
});
