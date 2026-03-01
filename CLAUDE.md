# CLAUDE.md

## Project Overview

Bechdel Test UI — a Next.js web application that provides a modern, searchable interface for the Bechdel Test movie database. It parses a static HTML dump from bechdeltest.com server-side and renders a filterable movie list client-side.

**Tech stack:** Next.js 14 (App Router), React 18, TypeScript (strict mode), Tailwind CSS 3, Yarn

## Commands

```bash
yarn dev      # Start development server (port 3000)
yarn build    # Production build
yarn start    # Serve production build
yarn lint     # ESLint + Prettier checks
```

No test framework is configured. No CI/CD pipeline exists.

## Project Structure

```
app/                  # Next.js App Router pages and layouts
  layout.tsx          # Root layout (Inter font, Footer, global structure)
  page.tsx            # Home page — server component that parses HTML data
  about/page.tsx      # About page
  globals.css         # Tailwind CSS base imports
components/           # React components
  List.tsx            # Client component — filtering, search, renders movie list
  Movie.tsx           # Single movie item with pass/fail indicator
  SearchBar.tsx       # Search input
  Footer.tsx          # Site footer with attribution links
types/
  Movie.ts            # Movie interface (movieTitle, result, comment, imdbLink)
helpers/
  classNames.ts       # Utility for conditional Tailwind class joining
data/
  index.html          # Static HTML dump from bechdeltest.com (~5MB, parsed by JSDOM)
```

## Architecture

**Data flow:**
1. `app/page.tsx` (server component) reads `data/index.html` with `fs.readFileSync`
2. Parses HTML with JSDOM, extracts movie data from `div.movie` elements
3. Sorts alphabetically with lodash `sortBy`
4. Passes data to `<List>` client component
5. `List.tsx` (`'use client'`) manages search state, filters with `useMemo`, limits to 1000 results
6. Each movie rendered by `<Movie>` with pass/fail status dot and IMDb link

**Server vs Client components:**
- Server components (no directive): `app/page.tsx`, `app/layout.tsx` — handle data loading and static rendering
- Client components (`'use client'`): `components/List.tsx` — handle interactive state (search filtering)
- Stateless components: `Movie.tsx`, `SearchBar.tsx`, `Footer.tsx` — receive props, no directive needed

## Code Conventions

**Formatting (enforced via ESLint + Prettier):**
- Single quotes
- Trailing commas (ES5)
- Semicolons required
- 80-character print width

**Naming:**
- PascalCase for components and types (`Movie`, `SearchBar`, `MovieType`)
- camelCase for variables and functions (`movieTitle`, `filteredData`, `setFilter`)
- UPPER_CASE for constant objects (`statuses` in Movie.tsx is an exception — uses camelCase)

**Imports:**
- Path alias `@/*` maps to project root (e.g., `import List from '@/components/List'`)
- Default exports for all components
- Named exports for types/interfaces (`export interface Movie`)

**Styling:**
- Tailwind CSS utility classes throughout
- `classNames()` helper from `@/helpers/classNames` for conditional classes
- Icons from `@heroicons/react/24/solid`
- Responsive prefixes: `sm:`, `lg:`
