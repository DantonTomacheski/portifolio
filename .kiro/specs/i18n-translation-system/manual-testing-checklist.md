# Manual Testing Checklist - i18n Translation System

## Browser Compatibility Testing

### Chrome

- [ ] Language selector displays correctly
- [ ] All pages translate properly
- [ ] No console errors or warnings
- [ ] Keyboard navigation works
- [ ] Language persists after reload

### Firefox

- [ ] Language selector displays correctly
- [ ] All pages translate properly
- [ ] No console errors or warnings
- [ ] Keyboard navigation works
- [ ] Language persists after reload

### Safari

- [ ] Language selector displays correctly
- [ ] All pages translate properly
- [ ] No console errors or warnings
- [ ] Keyboard navigation works
- [ ] Language persists after reload

## Viewport Testing

### Mobile (320px - 768px)

- [ ] Language selector is accessible and usable
- [ ] Dropdown doesn't overflow screen
- [ ] All text is readable
- [ ] Touch interactions work properly
- [ ] No horizontal scrolling issues

### Tablet (768px - 1024px)

- [ ] Layout adapts properly
- [ ] Language selector positioned correctly
- [ ] All content displays well

### Desktop (1024px+)

- [ ] Full layout displays correctly
- [ ] Language selector in top-right corner
- [ ] Hover effects work properly

## Keyboard Navigation Testing

### LanguageSelector Component

- [ ] Tab key focuses the language selector button
- [ ] Enter key opens the dropdown
- [ ] Space key opens the dropdown
- [ ] Escape key closes the dropdown
- [ ] Tab key navigates through language options
- [ ] Enter key selects a language option
- [ ] Space key selects a language option
- [ ] Focus indicators are visible
- [ ] ARIA attributes are correct

## Translation Completeness

### Portuguese (pt-BR)

- [ ] Home page fully translated
- [ ] About page fully translated
- [ ] Experiences page fully translated
- [ ] Projects page fully translated
- [ ] Skills page fully translated
- [ ] Footer fully translated
- [ ] All buttons and labels translated

### English (en-US)

- [ ] Home page fully translated
- [ ] About page fully translated
- [ ] Experiences page fully translated
- [ ] Projects page fully translated
- [ ] Skills page fully translated
- [ ] Footer fully translated
- [ ] All buttons and labels translated

### Spanish (es-ES)

- [ ] Home page fully translated
- [ ] About page fully translated
- [ ] Experiences page fully translated
- [ ] Projects page fully translated
- [ ] Skills page fully translated
- [ ] Footer fully translated
- [ ] All buttons and labels translated

## Edge Cases Testing

### Invalid Locale

- [ ] App handles invalid locale in localStorage gracefully
- [ ] Falls back to default locale (pt-BR)
- [ ] No crashes or errors

### Missing Translation Keys

- [ ] Missing keys display the key itself as fallback
- [ ] Warning logged in development mode
- [ ] No crashes or errors

### localStorage Unavailable

- [ ] App works in private/incognito mode
- [ ] Language selection still functions
- [ ] Warning logged appropriately
- [ ] Falls back to browser language detection

### Interpolation Issues

- [ ] Missing parameters show placeholders
- [ ] Extra parameters are ignored
- [ ] No crashes or errors

### Rapid Language Changes

- [ ] Multiple quick language switches work
- [ ] No race conditions
- [ ] UI updates correctly
- [ ] No memory leaks

## Performance Testing

### Language Switch Speed

- [ ] Language change completes in under 500ms
- [ ] No visible lag or flicker
- [ ] Smooth transition

### State Preservation

- [ ] Scroll position maintained on language change
- [ ] Form data preserved (if any)
- [ ] App state preserved

### Bundle Size

- [ ] Total translation files under 50KB
- [ ] No unnecessary data loaded
- [ ] Efficient loading strategy

## Console Verification

### Development Mode

- [ ] No unexpected errors in console
- [ ] Only expected warnings (missing keys in dev)
- [ ] No React warnings or errors

### Production Mode

- [ ] No errors in console
- [ ] No warnings in console
- [ ] Clean console output

## Accessibility Testing

### Screen Reader Compatibility

- [ ] Language selector announces current language
- [ ] Language options are announced
- [ ] Selection changes are announced
- [ ] Proper ARIA labels present

### Focus Management

- [ ] Focus visible on all interactive elements
- [ ] Focus trap works in dropdown
- [ ] Focus returns to button after selection
- [ ] No focus lost during language change

### Color Contrast

- [ ] Text meets WCAG AA standards
- [ ] Hover states are distinguishable
- [ ] Selected state is clear

## Visual Testing

### Pixel-Art Aesthetic

- [ ] Language selector matches design system
- [ ] Borders and shadows consistent
- [ ] Colors match theme
- [ ] Font (Press Start 2P) applied correctly

### Animations

- [ ] Hover effects smooth
- [ ] Dropdown open/close animated
- [ ] No jarring transitions
- [ ] Consistent with site aesthetic

### Responsive Design

- [ ] Selector adapts to screen size
- [ ] Flag icons display correctly
- [ ] Text doesn't overflow
- [ ] Dropdown positioned correctly

## Integration Testing

### With Next.js App Router

- [ ] Works with Server Components
- [ ] Works with Client Components
- [ ] No hydration errors
- [ ] SSR compatible

### With Portfolio Data

- [ ] Dynamic content translates correctly
- [ ] Experience data in correct language
- [ ] Project data in correct language
- [ ] Skills data in correct language

### With Layout

- [ ] HTML lang attribute updates
- [ ] Selector visible on all pages
- [ ] No z-index conflicts
- [ ] Positioned correctly

## Final Checks

- [ ] All automated tests pass
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Build succeeds without errors
- [ ] Production build tested
- [ ] All requirements met (1.1-7.5)
