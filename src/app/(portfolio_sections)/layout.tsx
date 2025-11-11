// app/(portfolio_sections)/layout.tsx
"use client"; // Required for using client-side hooks like usePathname and useEffect
import Link from "next/link";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiAward,
  FiStar,
  FiChevronsLeft,
  FiCode,
} from "react-icons/fi"; // Ícones
import React, { useEffect } from "react"; // ADDED: For React.cloneElement and useEffect
import { usePathname } from "next/navigation"; // Import usePathname
import ProgressDisplay from "../../components/ProgressDisplay"; // Import ProgressDisplay
import { useTranslation } from "@/hooks/useTranslation"; // Import translation hook

// Define trackable sections and localStorage key (should match ProgressDisplay.tsx)
const trackableSections = [
  "/sobre",
  "/experiencias",
  "/projetos",
  "/habilidades",
];
const localStorageKey = "visitedPortfolioSections";

// Componente de Navegação Lateral (ou Superior) para as seções
const PortfolioNav = () => {
  const { t } = useTranslation();

  const navItems = [
    { href: "/sobre", label: t("nav.about"), icon: <FiUser /> },
    {
      href: "/experiencias",
      label: t("nav.experiences"),
      icon: <FiBriefcase />,
    },
    { href: "/projetos", label: t("nav.projects"), icon: <FiCode /> },
    { href: "/habilidades", label: t("nav.skills"), icon: <FiStar /> },
  ];

  return (
    <aside className="hidden md:block md:w-64 bg-game-bg-light p-4 md:p-6 pixel-border shadow-pixel-md md:mr-6">
      <nav className="space-y-3">
        <Link href="/" passHref>
          <button className="pixel-button-secondary w-full flex items-center justify-center md:justify-start mb-4">
            <FiChevronsLeft className="mr-2 h-5 w-5" /> {t("nav.lobby")}
          </button>
        </Link>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} passHref>
            <button className="pixel-button w-full flex items-center justify-center md:justify-start text-left">
              {item.icon && <span className="mr-3 h-5 w-5">{item.icon}</span>}
              {item.label}
            </button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

// ADDED: Mobile navigation items generator function
const getMobileNavItems = (t: (key: string) => string) => [
  { href: "/", label: t("nav.home"), icon: <FiHome /> },
  { href: "/sobre", label: t("nav.about"), icon: <FiUser /> },
  { href: "/experiencias", label: t("nav.log"), icon: <FiBriefcase /> },
  { href: "/projetos", label: t("nav.projects"), icon: <FiAward /> },
  { href: "/habilidades", label: t("nav.skills"), icon: <FiStar /> },
];

// ADDED: Componente de Navegação Inferior para Mobile
const MobileBottomNav = ({
  items,
}: {
  items: Array<{ href: string; label: string; icon: React.ReactElement }>;
}) => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-game-bg pixel-border-top shadow-pixel-top-lg p-2 flex justify-around items-center z-50">
    {items.map((item) => (
      <Link key={item.label} href={item.href} passHref>
        <button className="flex flex-col items-center text-game-text-light hover:text-game-accent focus:text-game-accent p-1 transition-colors">
          {item.icon &&
            React.cloneElement(item.icon, { className: "h-5 w-5 mb-0.5" })}
          <span className="font-pixel text-xs tracking-tighter">
            {item.label}
          </span>
        </button>
      </Link>
    ))}
  </nav>
);

// Layout para as seções do portfólio
export default function PortfolioSectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    // Ensure this code only runs on the client-side
    if (typeof window !== "undefined" && trackableSections.includes(pathname)) {
      const visitedFromStorage = localStorage.getItem(localStorageKey);
      let visitedPaths = visitedFromStorage
        ? JSON.parse(visitedFromStorage)
        : [];

      // Ensure we are working with an array
      if (!Array.isArray(visitedPaths)) {
        visitedPaths = [];
      }

      if (!visitedPaths.includes(pathname)) {
        visitedPaths.push(pathname);
        const updatedVisitedPaths = JSON.stringify(visitedPaths);
        localStorage.setItem(localStorageKey, updatedVisitedPaths);
        // Dispatch custom event so ProgressDisplay updates
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: localStorageKey,
            newValue: updatedVisitedPaths,
            oldValue: visitedFromStorage, // Provide the old value
          })
        );
      }
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-game-bg flex flex-col p-4 md:p-8 pattern-crosses pattern-game-bg-light pattern-bg-fixed pattern-opacity-10">
      <header className="mb-8 text-center">
        <Link href="/" passHref>
          <h1 className="font-pixel text-3xl md:text-5xl text-game-accent inline-block hover:text-game-primary transition-colors cursor-pointer">
            Danton's Dev History
          </h1>
        </Link>
      </header>
      <ProgressDisplay /> {/* Add ProgressDisplay component here */}
      <div className="flex flex-col md:flex-row flex-grow container mx-auto max-w-6xl">
        <PortfolioNav />
        <main className="flex-grow bg-game-bg-light p-6 md:p-8 pixel-border shadow-pixel-lg overflow-y-auto">
          {/* Adiciona um efeito de "scanline" sutil ao conteúdo principal das seções */}
          <div className="relative">
            <div
              className="absolute inset-0 bg-transparent pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%)",
                backgroundSize: "100% 4px",
                opacity: 0.3,
              }}
            ></div>
            {children}
          </div>
        </main>
      </div>
      <footer className="mt-12 text-center text-xs text-game-text-dark font-pixel">
        <p>
          &copy; {new Date().getFullYear()} Danton Tomacheski. "Continue
          explorando!"
        </p>
      </footer>
      <MobileBottomNav items={getMobileNavItems(t)} />
    </div>
  );
}
