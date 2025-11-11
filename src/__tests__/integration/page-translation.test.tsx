/**
 * Integration Tests: Full Page Translation
 * Tests that all pages translate correctly when language changes
 * Requirements: 6.1, 6.2, 6.3
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TranslationProvider } from "@/contexts/TranslationContext";
import LanguageSelector from "@/components/LanguageSelector";
import HomePage from "@/app/page";
import SobrePage from "@/app/(portfolio_sections)/sobre/page";
import ExperienciasPage from "@/app/(portfolio_sections)/experiencias/page";
import ProjetosPage from "@/app/(portfolio_sections)/projetos/page";
import HabilidadesPage from "@/app/(portfolio_sections)/habilidades/page";

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

describe("Integration: Full Page Translation", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Home Page Translation", () => {
    it("should translate all content when language changes from pt-BR to en-US", async () => {
      const user = userEvent.setup();

      const { rerender } = render(
        <TranslationProvider>
          <PageWithLanguageSelector>
            <HomePage />
          </PageWithLanguageSelector>
        </TranslationProvider>
      );

      // Verify Portuguese content
      expect(screen.getByText("DANTON TOMACHESKI")).toBeInTheDocument();
      expect(
        screen.getByText("Desenvolvedor Full-Stack Pleno")
      ).toBeInTheDocument();
      expect(screen.getByText(/Olá, aventureiro!/)).toBeInTheDocument();

      // Find and click language selector
      const languageButton = screen.getByRole("button", { name: /português/i });
      await user.click(languageButton);

      // Select English
      const englishOption = screen.getByText(/english/i);
      await user.click(englishOption);

      // Wait for translation to complete
      await waitFor(
        () => {
          expect(
            screen.getByText("Full-Stack Developer Mid-Level")
          ).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Verify English content
      expect(screen.getByText(/Hello, adventurer!/)).toBeInTheDocument();
    });

    it("should translate all content when language changes from pt-BR to es-ES", async () => {
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

      // Find and click language selector
      const languageButton = screen.getByRole("button", { name: /português/i });
      await user.click(languageButton);

      // Select Spanish
      const spanishOption = screen.getByText(/español/i);
      await user.click(spanishOption);

      // Wait for translation to complete
      await waitFor(
        () => {
          expect(
            screen.getByText("Desarrollador Full-Stack Pleno")
          ).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Verify Spanish content
      expect(screen.getByText(/¡Hola, aventurero!/)).toBeInTheDocument();
    });

    it("should complete language switch in under 500ms", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <PageWithLanguageSelector>
            <HomePage />
          </PageWithLanguageSelector>
        </TranslationProvider>
      );

      const languageButton = screen.getByRole("button", { name: /português/i });
      await user.click(languageButton);

      const startTime = performance.now();

      const englishOption = screen.getByText(/english/i);
      await user.click(englishOption);

      await waitFor(
        () => {
          expect(
            screen.getByText("Full-Stack Developer Mid-Level")
          ).toBeInTheDocument();
        },
        { timeout: 500 }
      );

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(500);
    });
  });

  describe("Sobre Page Translation", () => {
    it("should translate all content when language changes", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <PageWithLanguageSelector>
            <SobrePage />
          </PageWithLanguageSelector>
        </TranslationProvider>
      );

      // Verify Portuguese content
      expect(screen.getByText("Sobre Mim")).toBeInTheDocument();
      expect(screen.getByText("Missão")).toBeInTheDocument();
      expect(screen.getByText("Interesses")).toBeInTheDocument();

      // Change to English
      const languageButton = screen.getByRole("button", { name: /português/i });
      await user.click(languageButton);

      const englishOption = screen.getByText(/english/i);
      await user.click(englishOption);

      // Wait for translation
      await waitFor(
        () => {
          expect(screen.getByText("About Me")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      expect(screen.getByText("Mission")).toBeInTheDocument();
      expect(screen.getByText("Interests")).toBeInTheDocument();
    });
  });

  describe("Experiencias Page Translation", () => {
    it("should translate all content when language changes", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <PageWithLanguageSelector>
            <ExperienciasPage />
          </PageWithLanguageSelector>
        </TranslationProvider>
      );

      // Verify Portuguese content
      expect(screen.getByText("Experiências")).toBeInTheDocument();
      expect(screen.getAllByText("Principais Tarefas")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Tecnologias")[0]).toBeInTheDocument();

      // Change to English
      const languageButton = screen.getByRole("button", { name: /português/i });
      await user.click(languageButton);

      const englishOption = screen.getByText(/english/i);
      await user.click(englishOption);

      // Wait for translation
      await waitFor(
        () => {
          expect(screen.getByText("Experiences")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      expect(screen.getAllByText("Main Tasks")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Technologies")[0]).toBeInTheDocument();
    });
  });

  describe("Projetos Page Translation", () => {
    it("should translate all content when language changes", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <PageWithLanguageSelector>
            <ProjetosPage />
          </PageWithLanguageSelector>
        </TranslationProvider>
      );

      // Verify Portuguese content
      expect(screen.getByText("Projetos")).toBeInTheDocument();

      // Change to English
      const languageButton = screen.getByRole("button", { name: /português/i });
      await user.click(languageButton);

      const englishOption = screen.getByText(/english/i);
      await user.click(englishOption);

      // Wait for translation
      await waitFor(
        () => {
          expect(screen.getByText("Projects")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });

  describe("Habilidades Page Translation", () => {
    it("should translate all content when language changes", async () => {
      const user = userEvent.setup();

      render(
        <TranslationProvider>
          <PageWithLanguageSelector>
            <HabilidadesPage />
          </PageWithLanguageSelector>
        </TranslationProvider>
      );

      // Verify Portuguese content
      expect(screen.getByText("Habilidades")).toBeInTheDocument();

      // Change to English
      const languageButton = screen.getByRole("button", { name: /português/i });
      await user.click(languageButton);

      const englishOption = screen.getByText(/english/i);
      await user.click(englishOption);

      // Wait for translation
      await waitFor(
        () => {
          expect(screen.getByText("Skills")).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });
});
