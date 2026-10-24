# AIESEC in Hadrumet — Opportunities Portal

Marketing site for AIESEC in Hadrumet (Sousse, Tunisia), showcasing the city and
listing live incoming exchange opportunities pulled from AIESEC's GIS API.

## Stack

- **React 19** + **TypeScript**, bundled with **Vite 7**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router 7** for routing
- **graphql-request** against the AIESEC GIS GraphQL API
- **ogl** (aurora hero) and **gl-matrix** (3D infinite menu) for the WebGL sections
- **motion** for scroll animations

## Getting started

```bash
npm install
npm run dev
```

| Script            | Purpose                                 |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start the Vite dev server               |
| `npm run build`   | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally      |
| `npm run lint`    | Run ESLint                              |

## Routes

| Path                      | Page                                              |
| ------------------------- | ------------------------------------------------- |
| `/`                       | Home — hero, about Sousse, programme cards        |
| `/our-country`            | Tunisia highlights in a WebGL infinite menu       |
| `/our-programs/:slug`     | Programme page — `talent`, `volunteer`, `teaching` |
| `*`                       | 404                                               |

## Project layout

```
src/
  components/
    ProgramPage.tsx   Shared layout for all three programme pages
    Header.tsx        WebGL aurora hero (ogl)
    InfiniteMenu.tsx  WebGL sphere menu used by /our-country
    AboutSousse.tsx   Scroll-driven zoom parallax
    Navbar.tsx  Footer.tsx  ProgramSection.tsx  AnimationScrollSection.tsx
  data/
    programs.tsx      Per-programme copy, colours, images and GIS programme IDs
  lib/
    gis.ts            AIESEC GIS API endpoint, query and types
    utils.ts          `cn` class-name helper
  pages/
    Home.tsx  OurCountry.tsx  Program.tsx  NotFound.tsx
```

### Adding or editing a programme

All three programme pages render from `ProgramPage` and differ only by the entry
in [`src/data/programs.tsx`](src/data/programs.tsx) — copy, accent colour, banner,
logo and GIS `programmeId`. The accent colour is applied through a
`--program-accent` CSS custom property, so no per-programme Tailwind classes are
needed.

## AIESEC GIS API

Opportunities are fetched in [`src/lib/gis.ts`](src/lib/gis.ts): **open**
opportunities created on or after `CREATED_FROM`, filtered by programme.

| `programmeId` | Programme        |
| ------------- | ---------------- |
| `7`           | Global Volunteer |
| `8`           | Global Talent    |
| `9`           | Global Teacher   |

> **Security note:** the GIS access token is currently hardcoded in `gis.ts`.
> Because this is a client-side app, the token ships in the bundle and is
> readable by any visitor. It should move behind a small server-side proxy, and
> any token that has been committed should be rotated.
