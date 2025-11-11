# Implementation Plan

- [x] 1. Setup translation infrastructure

  - Create TranslationContext with locale state management and translation function
  - Create useTranslation hook for easy context access
  - Create initial pt-BR.json translation file with common keys
  - Create types file for Locale and translation interfaces
  - _Requirements: 1.1, 1.4, 5.1, 5.2, 5.4, 7.1_

- [x] 1.1 Create TranslationContext and Provider

  - Write TranslationContext.tsx with Context creation, Provider component, locale state, changeLanguage function, and t() translation function with interpolation support
  - Implement localStorage persistence for selected language
  - Implement browser language detection on first visit
  - Add error handling for missing keys and invalid locales
  - _Requirements: 1.1, 1.4, 5.4, 7.1_

- [x] 1.2 Create useTranslation hook

  - Write useTranslation.ts hook that consumes TranslationContext
  - Add error handling if hook used outside Provider
  - Export hook with proper TypeScript types
  - _Requirements: 5.4, 7.1_

- [x] 1.3 Create translation files structure

  - Create src/locales/ directory
  - Create pt-BR.json with all Portuguese translations (common, nav, home, about, experiences, projects, skills, footer)
  - Create en-US.json with all English translations
  - Create es-ES.json with all Spanish translations
  - Create index.ts to export locales and types
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 5.1, 5.2, 5.5_

- [x] 1.4 Create TypeScript types for translations

  - Define Locale type ('pt-BR' | 'en-US' | 'es-ES')
  - Define TranslationDictionary type
  - Define LOCALES constant with language names and flags
  - Export all types from locales/index.ts
  - _Requirements: 5.4_

- [x] 2. Integrate TranslationProvider into app

  - Modify src/app/layout.tsx to wrap children with TranslationProvider
  - Ensure Provider works with Next.js 15 App Router
  - Test that context is accessible in all pages
  - _Requirements: 7.1, 7.2, 7.4_

- [x] 3. Create LanguageSelector component

  - Create LanguageSelector.tsx with dropdown UI
  - Implement language selection logic using useTranslation hook
  - Apply pixel-art styling (pixel-border, shadow-pixel-md, game colors, Press Start 2P font)
  - Add flags/icons for each language
  - Implement open/close dropdown state
  - Add hover animations and transitions
  - Make component keyboard accessible (Tab, Enter, Escape)
  - _Requirements: 1.2, 1.3, 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 4. Translate home page (page.tsx)

  - Replace all hardcoded strings with t() calls
  - Translate page title, subtitle, NPC message, quest buttons, connect section, footer
  - Verify all text updates when language changes
  - _Requirements: 2.1, 6.1, 6.2, 6.3_

- [x] 5. Translate portfolio sections

  - Translate "Sobre Mim" page with all static content
  - Translate "Experiências" page with all static content
  - Translate "Projetos" page with all static content
  - Translate "Habilidades" page with all static content
  - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 6. Create translated portfolio data

  - Create portfolioDataPtBR with all Portuguese content
  - Create portfolioDataEnUS with all English content
  - Create portfolioDataEsES with all Spanish content
  - Create getPortfolioData(locale) helper function
  - Update all components to use getPortfolioData() instead of direct portfolioData
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

-

- [x] 7. Add LanguageSelector to layout

  - Add LanguageSelector component to main layout or header
  - Position selector in top-right corner or appropriate location
  - Ensure selector is visible on all pages
  - Test selector functionality across all pages
  - _Requirements: 1.2, 4.1, 4.2, 4.3_

- [x] 8. Implement language persistence and detection

  - Verify localStorage saves selected language correctly
  - Verify language is restored on page reload
  - Test browser language detection on first visit
  - Test fallback to pt-BR if invalid locale in localStorage
  - _Requirements: 1.4, 1.5_

-

- [x] 9. Update HTML lang attribute

  - Modify layout.tsx to set <html lang={locale}> dynamically
  - Ensure lang attribute updates when language changes
  - _Requirements: 7.1, 7.4_

- [x] 10. Performance optimization

  - Verify language switch happens in under 500ms
  - Verify scroll position is maintained on language change
  - Verify app state is preserved on language change
  - Check bundle size of translation files (should be under 50KB total)
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

-

- [x] 11. Add unit tests

  - Write tests for TranslationProvider (initialization, language change, persistence)
  - Write tests for useTranslation hook
  - Write tests for t() function (simple keys, nested keys, interpolation, fallbacks)
  - Write tests for LanguageSelector component
  - _Requirements: 5.3_

- [x] 12. Add integration tests

  - Test full page translation on language change for all pages
  - Test language persistence across page reloads
  - Test with localStorage disabled
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 13. Final polish and validation

  - Test on Chrome, Firefox, Safari
  - Test on mobile and desktop viewports
  - Verify keyboard navigation works in LanguageSelector
  - Verify no console errors or warnings
  - Verify all pages have complete translations in all languages
  - Test edge cases (invalid locale, missing keys, localStorage unavailable)
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 6.1, 6.2, 6.3_
