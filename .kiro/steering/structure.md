---
inclusion: always
---

# Project Structure

## Directory Organization

```
/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (portfolio_sections)/    # Route group for portfolio sections
│   │   ├── globals.css               # Global styles, theme variables, CRT effects
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/                   # React components
│   │   └── ProgressDisplay.tsx       # Example component
│   ├── data/                         # Data files
│   │   └── portfolioData.ts          # Portfolio content data
│   ├── images/                       # Image assets (avatars, cursor, etc.)
│   └── curriculo/                    # Resume/CV related files
├── public/                           # Static assets (SVGs)
├── .kiro/                            # Kiro AI configuration
│   └── steering/                     # AI steering rules
└── [config files]                    # Root-level configs
```

## Key Conventions

### Path Aliases

- Use `@/*` to import from `src/` directory
- Example: `import { data } from '@/data/portfolioData'`

### Styling Approach

- **Global styles** in `src/app/globals.css`
- **Tailwind utilities** for component styling
- **CSS variables** defined in `@theme` block for design tokens
- **Pixel-art aesthetic** with custom shadows and borders

### Design System Variables

Located in `globals.css` under `@theme`:

- Fonts: `--font-pixel`, `--font-sans`
- Colors: `--color-game-*` (bg, text, primary, secondary, accent, border)
- Shadows: `--shadow-pixel-sm/md/lg` for consistent pixel-style effects

### Component Organization

- Components in `src/components/`
- Use TypeScript (.tsx) for all React components
- Follow Next.js 15 App Router conventions

### Data Management

- Static data in `src/data/` directory
- TypeScript files for type-safe data structures
