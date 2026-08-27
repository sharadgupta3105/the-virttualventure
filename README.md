# The Virtual Venture

Premium digital growth agency website built with Vue 3, Vite, Tailwind CSS, Vue Router, Lucide, and GSAP.

## Stack

- Vue 3 (`<script setup lang="ts">`)
- Vite
- Tailwind CSS v4
- Vue Router
- GSAP + ScrollTrigger
- Lucide Vue (`@lucide/vue`)

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Configured for Netlify (`netlify.toml`) and Vercel (`vercel.json`) with SPA rewrites.

## Contact form

The form uses `src/services/contact.ts` — an API-ready composable that currently simulates submission and stores payloads in `localStorage`. Connect Formspree, Supabase, Firebase, or a custom API by updating `submitContact`.
