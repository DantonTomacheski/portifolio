/**
 * Integration Tests: Language Persistence
 * Tests that language selection persists across page reloads
 * Requirements: 6.2
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TranslationProvider } from "@/contexts/TranslationContext";
import LanguageSelector from "@/components/LanguageSelector";
import HomePage from "@/app/page";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Helper component to render page with LanguageSelector
const PageWithLanguageSelector = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <>
    <LanguageSelector />
    {children}
  </>
);

describe("Integration: Language Persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should persist language selection in localStorage", async () => {
    const user = userEvent.setup();

    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    // Change to English
    const languageButton = screen.getByRole("button", { name: /português/i });
    await user.click(languageButton);

    const englishOption = screen.getByText(/english/i);
    await user.click(englishOption);

    // Wait for translation
    await waitFor(
      () => {
        expect(
          screen.getByText("Full-Stack Developer Mid-Level")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Verify localStorage was updated
    expect(localStorage.getItem("locale")).toBe("en-US");
  });

  it("should restore language from localStorage on mount", async () => {
    // Set English in localStorage before mounting
    localStorage.setItem("locale", "en-US");

    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    // Should immediately show English content
    await waitFor(
      () => {
        expect(
          screen.getByText("Full-Stack Developer Mid-Level")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    expect(screen.getByText(/Hello, adventurer!/)).toBeInTheDocument();
  });

  it("should restore Spanish from localStorage on mount", async () => {
    // Set Spanish in localStorage before mounting
    localStorage.setItem("locale", "es-ES");

    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    // Should immediately show Spanish content
    await waitFor(
      () => {
        expect(
          screen.getByText("Desarrollador Full-Stack Pleno")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    expect(screen.getByText(/¡Hola, aventurero!/)).toBeInTheDocument();
  });

  it("should persist language across multiple component remounts", async () => {
    const user = userEvent.setup();

    // First mount - change to English
    const { unmount } = render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    const languageButton = screen.getByRole("button", { name: /português/i });
    await user.click(languageButton);

    const englishOption = screen.getByText(/english/i);
    await user.click(englishOption);

    await waitFor(
      () => {
        expect(
          screen.getByText("Full-Stack Developer Mid-Level")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Unmount (simulating page navigation)
    unmount();

    // Remount - should still be English
    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    await waitFor(
      () => {
        expect(
          screen.getByText("Full-Stack Developer Mid-Level")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("should fallback to pt-BR if invalid locale in localStorage", async () => {
    // Set invalid locale
    localStorage.setItem("locale", "invalid-locale");

    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    // Should show Portuguese (default)
    await waitFor(
      () => {
        expect(
          screen.getByText("Desenvolvedor Full-Stack Pleno")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    expect(screen.getByText(/Olá, aventureiro!/)).toBeInTheDocument();
  });

  it("should update localStorage when language changes multiple times", async () => {
    const user = userEvent.setup();

    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    // Change to English
    let languageButton = screen.getByRole("button", { name: /português/i });
    await user.click(languageButton);

    let englishOption = screen.getByText(/english/i);
    await user.click(englishOption);

    await waitFor(() => {
      expect(localStorage.getItem("locale")).toBe("en-US");
    });

    // Change to Spanish
    languageButton = screen.getByRole("button", { name: /english/i });
    await user.click(languageButton);

    const spanishOption = screen.getByText(/español/i);
    await user.click(spanishOption);

    await waitFor(() => {
      expect(localStorage.getItem("locale")).toBe("es-ES");
    });

    // Change back to Portuguese
    languageButton = screen.getByRole("button", { name: /español/i });
    await user.click(languageButton);

    const portugueseOption = screen.getByText(/português/i);
    await user.click(portugueseOption);

    await waitFor(() => {
      expect(localStorage.getItem("locale")).toBe("pt-BR");
    });
  });
});
