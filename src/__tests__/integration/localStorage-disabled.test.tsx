/**
 * Integration Tests: localStorage Disabled
 * Tests that the app works correctly when localStorage is unavailable
 * Requirements: 6.3
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

describe("Integration: localStorage Disabled", () => {
  let originalLocalStorage: Storage;

  beforeAll(() => {
    // Save original localStorage
    originalLocalStorage = global.localStorage;
  });

  afterAll(() => {
    // Restore original localStorage
    Object.defineProperty(global, "localStorage", {
      value: originalLocalStorage,
      writable: true,
    });
  });

  beforeEach(() => {
    // Mock localStorage to throw errors (simulating disabled localStorage)
    const mockLocalStorage = {
      getItem: jest.fn(() => {
        throw new Error("localStorage is not available");
      }),
      setItem: jest.fn(() => {
        throw new Error("localStorage is not available");
      }),
      removeItem: jest.fn(() => {
        throw new Error("localStorage is not available");
      }),
      clear: jest.fn(() => {
        throw new Error("localStorage is not available");
      }),
      key: jest.fn(() => {
        throw new Error("localStorage is not available");
      }),
      length: 0,
    };

    Object.defineProperty(global, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });
  });

  it("should initialize with default language when localStorage is disabled", async () => {
    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    // Should show Portuguese (default) without errors
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

  it("should allow language changes when localStorage is disabled", async () => {
    const user = userEvent.setup();

    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    // Verify Portuguese content
    expect(
      screen.getByText("Desenvolvedor Full-Stack Pleno")
    ).toBeInTheDocument();

    // Change to English
    const languageButton = screen.getByRole("button", { name: /português/i });
    await user.click(languageButton);

    const englishOption = screen.getByText(/english/i);
    await user.click(englishOption);

    // Should successfully change to English
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

  it("should not persist language when localStorage is disabled", async () => {
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

    // Unmount
    unmount();

    // Remount - should revert to default (Portuguese) since localStorage doesn't work
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
          screen.getByText("Desenvolvedor Full-Stack Pleno")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("should handle multiple language changes without localStorage", async () => {
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

    await waitFor(
      () => {
        expect(
          screen.getByText("Full-Stack Developer Mid-Level")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Change to Spanish
    languageButton = screen.getByRole("button", { name: /english/i });
    await user.click(languageButton);

    const spanishOption = screen.getByText(/español/i);
    await user.click(spanishOption);

    await waitFor(
      () => {
        expect(
          screen.getByText("Desarrollador Full-Stack Pleno")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    expect(screen.getByText(/¡Hola, aventurero!/)).toBeInTheDocument();

    // Change back to Portuguese
    languageButton = screen.getByRole("button", { name: /español/i });
    await user.click(languageButton);

    const portugueseOption = screen.getByText(/português/i);
    await user.click(portugueseOption);

    await waitFor(
      () => {
        expect(
          screen.getByText("Desenvolvedor Full-Stack Pleno")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("should not throw errors when localStorage operations fail", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

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
          screen.getByText("Desenvolvedor Full-Stack Pleno")
        ).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Should not have logged any errors
    expect(consoleErrorSpy).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it("should maintain app state when localStorage is disabled", async () => {
    const user = userEvent.setup();

    render(
      <TranslationProvider>
        <PageWithLanguageSelector>
          <HomePage />
        </PageWithLanguageSelector>
      </TranslationProvider>
    );

    // Change language
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

    // Verify all page elements are still functional
    expect(screen.getByText("DANTON TOMACHESKI")).toBeInTheDocument();
    expect(screen.getByText(/Hello, adventurer!/)).toBeInTheDocument();

    // Verify navigation links are present
    const aboutLink = screen.getByRole("link", { name: /about me/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/sobre");
  });
});
