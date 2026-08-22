# Bulk Domain Expiry Checker — Project Spec

## Overview
A SaaS tool that monitors a customer's managed domains and alerts them before domains expire. Built for simplicity: one flat plan, no per-domain pricing tiers, minimal ops overhead.

**Primary audience:** agencies and IT teams managing many client/company domains, who are liable for lapses they often don't directly control.

**Core value prop:** a lapsed domain can cost thousands (lost deals, client churn); this costs $9/month and catches it before it happens.

## Website Direction
The public website should explain the product with original, plain-spoken copy and a confident editorial design. Use the information architecture of a focused monitoring product site as a starting point, while avoiding copied phrases, layouts, illustrations, brand names, or visual assets from the reference sites.

### Reusable top bar
The header is a shared shell for DomainLert and future tools. It should feel like a product family switcher rather than a one-off marketing navigation.

- Left: DomainLert wordmark and a product/tool switcher labeled **Tools**, with room for future products such as Site Watcher, SSL monitoring, Uptime monitoring, DNS monitoring, and Vendor status monitoring.
- Main links: **Product**, **Solutions**, **Resources**, and **Pricing**. Dropdowns should support grouped links without making the header feel crowded.
- Right: **Log in** as a quiet text action and **Start monitoring** as the primary CTA.
- On mobile: collapse the links into a menu, keep the wordmark and CTA visible, and make the tool switcher keyboard accessible.
- Implement the header as a reusable component so future tools can supply their name, accent color, URL, and navigation groups from configuration rather than duplicating markup.

### Public page map
Every page should have a distinct purpose, a clear primary action, useful metadata, and the shared top bar/footer.

| Route | Purpose and original content direction |
|---|---|
| `/` | Hero that frames missed renewals as an avoidable operational risk; show how monitoring, escalating alerts, and a simple domain list work; include proof points, feature overview, pricing preview, FAQ, and final signup CTA. |
| `/features` | Explain domain tracking, adaptive check cadence, alert thresholds, bulk import, history, recipients, filtering, and account limits. Include a product UI walkthrough or annotated dashboard preview. |
| `/pricing` | Present the free lookup, optional free monitoring tier if enabled, and the $9/month annual plan. State the 1,000-domain account cap clearly; explain billing, alerts, history, and support without hiding important limits. |
| `/resources` | Resource hub for practical domain operations guidance, organized by monitoring, renewal planning, and incident prevention. |
| `/resources/how-to-check-domain-expiry` | Educational guide covering expiry dates, registrar data, RDAP/WHOIS limits, and how to verify a renewal. |
| `/resources/domain-grace-periods` | Explain grace, redemption, and release stages in accessible language, with a reminder that policies vary by TLD and registrar. |
| `/resources/domain-renewal-checklist` | Downloadable or scannable checklist for agencies and IT teams: ownership, billing contact, auto-renewal, DNS dependencies, and confirmation. |
| `/for/agencies` | Show how agencies can centralize client domains, assign responsibility, import domain lists, and send alerts to multiple recipients. |
| `/for/freelancers` | Focus on protecting a small set of valuable client and personal domains with minimal setup. |
| `/for/startups` | Focus on launch domains, investor-facing infrastructure, ownership continuity, and avoiding renewal surprises during team changes. |
| `/for/it-ops` | Focus on inventory, operational ownership, status visibility, audit history, and predictable alerting. |
| `/comparisons` | Honest comparison pages for manual calendar reminders, registrar-only alerts, spreadsheets, and broader monitoring suites. Do not make unverifiable competitor claims. |
| `/about` | Explain the problem DomainLert exists to solve, the product principles, and how monitoring data is handled. |
| `/contact` | Provide a support and sales contact path, including a route for accounts approaching the domain cap. |
| `/privacy`, `/terms`, `/cookies` | Legal and cookie pages written for the actual product and integrations. |

### Content and design principles
- Use a strong, expressive type pairing and a bright, ownable palette with one practical accent for status and CTA states. Avoid default SaaS styling, purple gradients, and generic stock imagery.
- Use editorial page composition: generous whitespace, bold section transitions, restrained cards, dashboard snapshots, diagrams, and small motion reveals that support scanning.
- Keep the tone calm, direct, and operational. Explain why expiry matters before describing implementation details.
- Keep claims specific and supportable. Prefer “alerts at configurable thresholds” over promises that imply a renewal is automatic.
- Create original illustrations, screenshots, diagrams, and examples. Reference sites may inform hierarchy and interaction patterns only.
- Make every page useful without requiring signup. Public educational pages should link naturally back to the lookup or monitoring flow.

### Future product-family model
The first tool is DomainLert, but the navigation should anticipate a broader monitoring suite. Define a shared product catalog with each tool's name, short description, URL, availability (`live`, `planned`), and visual accent. Planned tools can be shown as “Coming soon” in the switcher without creating broken links. DomainLert remains the only product whose signup and billing flow is implemented in the MVP.

---

## Pricing Model
- **$9/month, billed annually** ($108/year charged upfront)
- Marketed as "unlimited domains"
- **Hidden cap: 1,000 domains per account**
- At the cap: block adding new domains, show an explicit in-app message directing the user to contact support (not a silent failure)
- Internal ops note: alert the team when an account crosses ~800–900 domains, so outreach happens *before* the user hits the wall

---

## Tech Stack
| Layer | Choice |
|---|---|
| Framework | Next.js (App Router, React) |
| Database + Auth | Supabase (Postgres + built-in auth) |
| Hosting | Self-hosted via Coolify on a VPS |
| VPS | Hetzner, Ubuntu 24.04.4 LTS (UEFI, amd64) |
| Payments | Stripe (Checkout + Customer Portal + webhooks) |
| Transactional email | Resend |
| Domain data | Self-hosted RDAP client (primary) + paid fallback API (e.g. Whoxy) for TLDs without RDAP support |

**Deployment:** Coolify "Application" resource → connected to GitHub repo → Nixpacks auto-detects Next.js → deploy on push.

---

## MVP Feature List
- [ ] Auth (Supabase — email/password or magic link)
- [ ] Bulk domain import (CSV upload or paste list)
- [ ] Daily automated expiry check (cron job — RDAP lookup per domain, fallback API on failure)
- [ ] Dashboard: domain list with expiry date, days remaining, status, last-checked timestamp
- [ ] Email alerts before expiry (e.g. 90/60/30/14/7 days out — avoid duplicate sends per threshold)
- [ ] 1,000-domain cap enforcement with explicit "contact support" message
- [ ] Stripe subscription checkout (annual, $9/mo rate) + Customer Portal for cancellation/billing management
- [ ] Stripe webhook handler → syncs subscription status to Supabase

---

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, never expose to client
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
WHOIS_FALLBACK_API_KEY=           # e.g. Whoxy, used only when RDAP fails
CRON_SECRET=                      # bearer token required to call /api/cron/check-domains
```

---

## Draft Data Model
**users** — via Supabase Auth

**subscriptions**
- user_id
- stripe_customer_id
- status (active / past_due / canceled)
- current_period_end

**domains**
- id
- user_id
- domain_name
- expiry_date
- last_checked_at
- registrar (optional, if parsed from WHOIS/RDAP)
- status (active / expiring_soon / expired / check_failed)

**alerts_sent**
- domain_id
- threshold (90 / 60 / 30 / 14 / 7 days)
- sent_at
*(prevents duplicate alerts for the same domain/threshold)*

---

## Infra Cost Reference
| Item | Monthly |
|---|---|
| VPS (Hetzner CX22/23) | $6–8 |
| Supabase | $0 → $25 |
| Resend | $0 → $20 |
| WHOIS fallback API | $0–20 |
| Stripe | 2.9% + $0.30/transaction (no fixed fee) |
| **Total** | **~$7–50/mo**, break-even around 1 customer |

---

## Open Decisions
- Final product/business name (shortlist: DomainSentry, ExpiryGuard, RenewalRadar, Domainly, Renewly, NeverLapse — check domain availability before committing)
- Exact alert threshold days (default assumption: 30/14/7)
- Whether to offer a free trial before the annual charge, or annual-only
