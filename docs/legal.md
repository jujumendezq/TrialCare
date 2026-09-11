# Legal Notes

PinoyCare CH is a **matchmaking platform**, not an employment agency. This
distinction matters under Swiss law.

## What PinoyCare CH is NOT

- **Not an employer.** Families hire workers directly. There is no
  employment relationship between PinoyCare CH and any worker.
- **Not an agency.** We do not place workers, negotiate salaries, or
  mediate disputes. We provide a listing and messaging surface.
- **Not a permit verifier.** We do not check work permits, residence
  permits, or identity documents.

## What PinoyCare CH IS

- A free marketplace where families post job offers and workers post
  profiles
- A messaging system that lets both sides talk directly
- A review system that lets the community build trust

## Required disclaimers

These appear in the footer of every page:

> PinoyCare CH does not verify work permits. Users are responsible for
> complying with Swiss law.

And on the `/post-a-job` and `/register` pages:

> By posting, you agree to comply with Swiss law and treat workers fairly.
> PinoyCare CH does not verify permits or identities.

## Swiss legal context

- **Ausländer- und Integrationsgesetz (AIG)** — governs work permits for
  foreign nationals. Workers must have the appropriate permit (B, C, L,
  or G) to legally work in Switzerland.
- **Obligationenrecht (OR)** — Swiss contract law. Applies to any
  employment agreement between a family and a worker.
- **Arbeitsgesetz (ArG)** — Swiss labor law. Governs working hours,
  rest periods, and minimum conditions.
- **Datenschutzgesetz (DSG)** — Swiss data protection law. Applies to the
  personal data we store (names, emails, messages, profile photos).

## GDPR-equivalent obligations

Swiss DSG is broadly similar to EU GDPR. Practically, this means:

- **Right to access** — users can request a copy of their data
- **Right to deletion** — users can request their account be deleted
- **Right to rectification** — users can correct their data (already
  supported via the profile edit page)
- **Data minimization** — we collect only what's needed
- **Consent** — users consent to data processing by signing up

## Data retention

- Profile data: kept while the account is active
- Messages: kept while both conversations are active
- Profile views: consider a 90-day retention policy at scale
- Deleted accounts: cascade deletes remove all associated rows (via FK
  `on delete cascade`)

## Age requirement

Users must be 18 or older to create an account. This should be enforced
in the signup flow and stated in the terms of service (to be written).

## Content moderation

Reports are collected in the `reports` table. Reviewed manually by an admin.
Future automation could flag:
- Profanity in job titles or descriptions
- Contact info in messages (bypassing the platform)
- Suspicious patterns (same user posting many jobs from many IPs)

## Terms of Service (draft — needs lawyer review)

Before public launch, you need:

1. **Terms of Service** — rules for using the platform
2. **Privacy Policy** — what data is collected and how it's used
3. **Cookie Policy** — what cookies are set (Supabase auth, etc.)
4. **Imprint / Impressum** — required by Swiss law for any commercial
   website

Swiss websites typically show links to all four in the footer. The current
footer has placeholders for About, Contact, Terms, Datenschutz, and
Impressum.

## Not legal advice

This document is a starting point, not legal advice. Before launch at
commercial scale, have a Swiss lawyer review the Terms, Privacy Policy, and
Imprint.
