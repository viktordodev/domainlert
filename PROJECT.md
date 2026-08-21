# Bulk Domain Expiry Checker — Project Spec

## Overview
A SaaS tool that monitors a customer's domain portfolio and alerts them before domains expire. Built for simplicity: one flat plan, no per-domain pricing tiers, minimal ops overhead.

**Primary audience:** agencies and IT teams managing many client/company domains, who are liable for lapses they often don't directly control.

**Core value prop:** a lapsed domain can cost thousands (lost deals, client churn); this costs $9/month and catches it before it happens.

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
- [ ] Email alerts before expiry (e.g. 30/14/7 days out — avoid duplicate sends per threshold)
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
- threshold (30 / 14 / 7 days)
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
