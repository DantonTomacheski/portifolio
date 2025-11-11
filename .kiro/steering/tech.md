---
inclusion: always
---

# Tech Stack

## Framework & Libraries

- **Next.js 15.1.7** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4.1.5** - Utility-first CSS framework
- **React Icons 5.2.1** - Icon library

## Build System

- **Node.js 20+** - Runtime environment
- **npm** - Package manager
- **ESLint** - Code linting with Next.js config
- **PostCSS** - CSS processing with Autoprefixer

## Deployment

- **Netlify** - Hosting platform (configured via netlify.toml)
- **@netlify/plugin-nextjs** - Netlify Next.js integration

## Common Commands

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Configuration Files

- `next.config.mjs` - Next.js configuration (images unoptimized)
- `tsconfig.json` - TypeScript configuration with path aliases (@/\*)
- `eslint.config.mjs` - ESLint flat config
- `postcss.config.mjs` - PostCSS configuration
- `netlify.toml` - Netlify deployment settings
