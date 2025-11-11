"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { LOCALES, Locale } from "@/locales";

interface LanguageSelectorProps {
  className?: string;
  variant?: "dropdown" | "buttons";
}

export default function LanguageSelector({
  className = "",
  variant = "dropdown",
}: LanguageSelectorProps) {
  const { locale, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  const handleLanguageSelect = (newLocale: Locale) => {
    changeLanguage(newLocale);
    setIsOpen(false);
  };

  const handleLanguageKeyDown = (
    event: React.KeyboardEvent,
    newLocale: Locale
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleLanguageSelect(newLocale);
    }
  };

  const currentLocaleData = LOCALES[locale];

  if (variant === "buttons") {
    return (
      <div className={`flex gap-2 ${className}`}>
        {(Object.keys(LOCALES) as Locale[]).map((loc) => (
          <button
            key={loc}
            onClick={() => changeLanguage(loc)}
            className={`
              px-3 py-2 font-pixel text-xs
              border-2 border-game-border
              transition-all duration-200
              ${
                locale === loc
                  ? "bg-game-primary text-game-text shadow-pixel-md"
                  : "bg-game-bg-light text-game-text-dark hover:bg-game-primary hover:text-game-text hover:shadow-pixel-sm"
              }
            `}
            aria-label={`Switch to ${LOCALES[loc].name}`}
            aria-pressed={locale === loc}
          >
            <span className="mr-1">{LOCALES[loc].flag}</span>
            {LOCALES[loc].name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${className}`}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-label="Language selector"
    >
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="
          flex items-center gap-2 px-4 py-2
          bg-game-bg-light text-game-text
          border-2 border-game-border
          font-pixel text-xs
          shadow-pixel-md
          hover:bg-game-primary hover:shadow-pixel-lg
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-game-accent focus:ring-offset-2 focus:ring-offset-game-bg
        "
        aria-label={`Current language: ${currentLocaleData.name}. Click to change language`}
      >
        <span className="text-base">{currentLocaleData.flag}</span>
        <span className="hidden sm:inline">{currentLocaleData.name}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
            absolute right-0 mt-2 w-48
            bg-game-bg-light
            border-2 border-game-border
            shadow-pixel-lg
            z-50
          "
          role="listbox"
          aria-label="Available languages"
        >
          {(Object.keys(LOCALES) as Locale[]).map((loc) => {
            const isSelected = locale === loc;
            return (
              <button
                key={loc}
                onClick={() => handleLanguageSelect(loc)}
                onKeyDown={(e) => handleLanguageKeyDown(e, loc)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3
                  font-pixel text-xs text-left
                  border-b-2 border-game-border last:border-b-0
                  transition-all duration-150
                  ${
                    isSelected
                      ? "bg-game-primary text-game-text"
                      : "text-game-text-dark hover:bg-game-primary hover:text-game-text"
                  }
                  focus:outline-none focus:bg-game-primary focus:text-game-text
                `}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
              >
                <span className="text-lg">{LOCALES[loc].flag}</span>
                <span className="flex-1">{LOCALES[loc].name}</span>
                {isSelected && (
                  <span className="text-game-accent" aria-label="Selected">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
