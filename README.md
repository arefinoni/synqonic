# SYNQONIC

SYNQONIC is a cybersecurity education, research, media, and community platform.

## Getting started

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Use `npm run build` to create a production build and `npm run start` to serve it.

## Environment

Copy `.env.example` to `.env.local` when you are ready to configure public social links or a canonical site URL. All values are optional for local development. Future API secrets should remain server-only and must not use the `NEXT_PUBLIC_` prefix.

## Project structure

```text
src/
  app/          App Router layouts and routes
  components/   Shared layout, section, and UI components
  config/       Centralized site and platform configuration
```

Routes currently scaffolded: `/`, `/academy`, `/resources`, `/media`, `/community`, and `/about`.
