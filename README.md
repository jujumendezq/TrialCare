# PinoyCare CH 🇵🇭🇨🇭

A free job marketplace connecting Filipino caregivers, nannies, and
housekeepers with families across Switzerland.

**Live demo:** https://YOUR-USERNAME.github.io/pinoycare-ch/

## What it does

- Families post babysitting and housekeeping job offers
- Filipino caregivers, nannies, and housekeepers create profiles and apply
- Both sides message, favourite, and review each other
- 100% free at launch — no Stripe, no billing, no paywall
- Only monetization: a non-functional "Premium coming soon" waitlist

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui primitives
- **Supabase** — auth, Postgres, realtime, storage
- **Leaflet + OpenStreetMap** — free maps, no API key
- **Resend** — transactional email (server-only, not on GitHub Pages)
- **GitHub Actions** — CI + GitHub Pages deploy

## Design system

Lives in code, not Figma:
- `tailwind.config.ts` — colors, fonts, spacing, radii, shadows
- `app/globals.css` — component classes (`.card`, `.chip`, `.btn-primary`, `.input`)
- `/design-system` — living style guide page

## Getting started locally

```bash
cp .env.example .env.local
# fill in your Supabase keys
npm install
npm run dev
