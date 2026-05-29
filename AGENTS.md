# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Wadeal is a single Next.js 16 application (App Router, Turbopack) — a Korean mobile-first group buying (공동구매) e-commerce platform. All data is mocked; no external services (Supabase, Toss Payments, Kakao) are required to run locally.

### Running the dev server

```bash
npm run dev
```

Starts at http://localhost:3000 with 74 routes (buyer, seller, admin). No `.env` file needed — the app gracefully degrades to fallback/mock mode.

### Build

```bash
npm run build
```

### Lint

`next lint` was **removed in Next.js 16**. The `npm run lint` script in `package.json` references it but will fail with "Invalid project directory". There is currently no standalone ESLint config in this repo.

### Testing

No automated test framework (Jest, Vitest, Playwright, etc.) is configured. Verification is done via `npm run build` (TypeScript + route generation) and manual QA.

### Key architecture notes

- Package manager: **npm** (lockfile: `package-lock.json`)
- Node.js 22+ required (uses Next.js 16 which requires Node >= 18.18)
- Single `package.json` at repo root (not a monorepo)
- Path alias: `@/*` maps to repo root
- All mock data lives in `lib/` directory
- No database, Docker, or migrations needed
