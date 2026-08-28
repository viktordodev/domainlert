// English copy. This is the canonical source for the dictionary shape — `sv.ts` is type-checked
// against `Dictionary` (derived below) so a missing or renamed key fails the build.
//
// Prose sections (`about`, `contact`, `privacy`, `terms`) are a flat `string[]` of blocks:
//   - a normal string renders as a <p>; markdown-style links "[label](/path)" become locale-aware
//     links, while mailto:/https:/#/tel: links are left as-is (see RichText.tsx / ProseSection.tsx)
//   - consecutive strings prefixed with "- " render as one <ul>
// Keeping every body a plain string[] lets `sv.ts` be type-checked against `Dictionary` cleanly.

const en = {
  common: {
    startMonitoring: "Start monitoring",
    openDashboard: "Open dashboard",
    openYourDashboard: "Open your dashboard",
    logIn: "Log in",
    logOut: "Log out",
    returnHome: "Return to DomainLert",
    backToHome: "Back to homepage",
  },

  nav: {
    tools: "Tools",
    products: [
      { name: "DomainLert", description: "Domain expiry monitoring" },
      { name: "Task Ledger", description: "Lightweight task tracking" },
      { name: "DNS Lens", description: "DNS health checks" },
    ],
    product: "Features",
    solutions: "Testimonials",
    resources: "FAQs",
    pricing: "Pricing",
    homeAriaLabel: "DomainLert home",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    openNavigation: "Open navigation",
    openAccountMenu: "Open account menu",
    accountMenu: "Account menu",
    dashboard: "Dashboard",
    profile: "Profile",
    language: "Language",
    languageNames: { sv: "Svenska", en: "English" },
    switchToSwedish: "Byt till svenska",
    switchToEnglish: "Switch to English",
  },

  themeToggle: {
    light: "Light",
    dark: "Dark",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },

  footer: {
    tagline: "Quietly keeping the important stuff alive.",
    links: {
      product: "Product",
      resources: "Resources",
      pricing: "Pricing",
      about: "About",
      contact: "Contact",
      terms: "Terms",
      privacy: "Privacy",
    },
    copyright: "© 2026 DomainLert. Built for fewer emergencies.",
  },

  meta: {
    defaultTitle: "DomainLert | Know before your domains lapse",
    titleTemplate: "%s | DomainLert",
    defaultDescription:
      "Domain expiry monitoring for agencies and teams that cannot afford a missed renewal. Daily checks, configurable alerts, and bulk import — free while we're in early access.",
  },

  og: {
    title: "Know before your domains lapse.",
    subtitle:
      "Domain expiry monitoring for agencies and teams that cannot afford a missed renewal.",
  },

  dashboardPreview: {
    label: "Managed Domains",
    domains: "{count} domains",
    monitoringActive: "◆ MONITORING ACTIVE",
    goodMorningAlex: "Good morning, Alex",
    date: "21 AUG 2026",
    domainsHealthy: "domains healthy",
    days: "{count} days",
    lastChecked: "Last checked today at 08:04",
    viewAll: "View all domains →",
    ariaHome: "A preview of the DomainLert domain monitoring dashboard",
    ariaFeatures: "An annotated preview of the DomainLert dashboard",
  },

  home: {
    hero: {
      eyebrow: "Domain expiry monitoring",
      titleLine1: "Never find out",
      titleEm: "too late.",
      text: "Domain renewals are easy to forget and expensive to miss. DomainLert watches your managed domains, checks the dates, and tells the right person while there is still time to act.",
      seeHow: "See how it works",
      note: "Free while we're in early access. No credit card required.",
      trustBadges: [
        "EU / Sweden hosted",
        "GDPR-ready",
        "Encrypted in transit",
        "No credit card",
      ],
    },
    proof: {
      heading: "For people who keep the business running",
      audiences: ["AGENCIES", "IT OPERATIONS", "STARTUPS", "FREELANCERS"],
    },
    product: {
      kicker: "The useful kind of alert",
      titleLine1: "A small warning",
      titleEm: "beats a big cleanup.",
      features: [
        {
          title: "One clear list",
          body: "Import your domains in bulk, then see expiry dates, owners, and urgency in one calm view.",
        },
        {
          title: "Escalation that adapts",
          body: "Alerts at 30, 14, and 7 days out by default — add up to 5 custom thresholds per domain and send them to whoever can actually renew it.",
        },
        {
          title: "Proof, not guesswork",
          body: "Keep the check history and registrar details you need to verify that a renewal really happened.",
        },
      ],
      seeAll: "See all features →",
    },
    testimonials: {
      kicker: "What teams say",
      titleLine1: "The people who own",
      titleLine2: "the renewal,",
      titleEm: "backing us up.",
      items: [
        {
          quote:
            "We manage domains for 18 clients. DomainLert gives every renewal a clear owner, without another spreadsheet to babysit.",
          name: "Sofia Lindqvist",
          role: "Operations Lead",
          agency: "Harbourline Digital",
        },
        {
          quote:
            "A client domain lapsed on us once. Never again — now the alert lands with the person who can actually renew it, weeks ahead.",
          name: "Marcus Bell",
          role: "Technical Director",
          agency: "Meridian Studio",
        },
        {
          quote:
            "Setup took ten minutes. We pasted in our whole portfolio and finally have one honest view of what's expiring when.",
          name: "Priya Anand",
          role: "Account Director",
          agency: "Fieldwork & Co.",
        },
      ],
    },
    pricing: {
      kicker: "Free in early access",
      title: "Free",
      titleSub: "for now",
      annual:
        "Every feature included for the first 100 accounts. Planned price after early access: $8/month, billed annually at $96.*",
      usageNote: "* Fair usage policy applies. No credit card required.",
      everythingYouNeed: "Everything you need to stay ahead of expiry:",
      bullets: [
        "Daily domain checks",
        "Configurable alerts — 30/14/7 day defaults, up to 5 custom per domain",
        "Bulk import and domain history",
        "Multiple alert recipients per domain",
      ],
      fullDetails: "Full pricing details →",
    },
    faq: {
      kicker: "Questions, answered",
      title: "Good to know.",
      items: [
        {
          question: "Does DomainLert renew domains for me?",
          answer:
            "No. It makes sure the right person knows when it is time to renew. You stay in control of the registrar and the renewal.",
        },
        {
          question: "What is the fair usage policy?",
          answer:
            "The plan includes normal domain monitoring for your portfolio. We may reach out if an account creates unusually high or abusive automated traffic, so the service stays reliable for everyone.",
        },
        {
          question: "How will I know when a domain needs attention?",
          answer:
            "DomainLert checks your domains daily and emails you at your chosen thresholds — 30, 14, and 7 days before expiry by default, with up to 5 custom thresholds per domain — so there is time to act.",
        },
        {
          question: "Can I import domains in bulk?",
          answer:
            "Yes. Paste in a list of domains to import them together, then review their expiry dates and status from one dashboard.",
        },
        {
          question: "Can alerts go to more than one person?",
          answer:
            "Yes. Add multiple alert recipients so renewals reach the owner, client, or teammate responsible for taking action.",
        },
        {
          question: "Is DomainLert free?",
          answer:
            "It is free while we are in early access — the first 100 accounts get every feature at no cost, with no credit card required. After that, the planned price is $8/month; anyone already signed up gets plenty of notice before that changes.",
        },
      ],
    },
    finalCta: {
      kicker: "Make the next renewal boring",
      titleLine1: "Know before",
      titleEm: "you have to know.",
    },
  },

  features: {
    meta: {
      title: "Features",
      description:
        "How DomainLert tracks domains, checks expiry daily, alerts the right people, and keeps a record — walked through feature by feature.",
    },
    hero: {
      eyebrow: "Features",
      title: "Everything you need to stay ahead of expiry.",
      text: "No dashboards to configure, no integrations to wire up. Import your domains, set your thresholds, and DomainLert takes it from there.",
    },
    legend: [
      {
        title: "Health ring",
        body: "Your whole portfolio's status in one glance — how many domains are healthy right now.",
      },
      {
        title: "Domain rows",
        body: "Status, name, and days remaining for every domain — search, sort, and paginate as your list grows.",
      },
      {
        title: "Attention flags",
        body: "Anything expiring soon is highlighted immediately, so it never gets buried in a long list.",
      },
    ],
    items: [
      {
        title: "Bulk domain import",
        body: "Paste a list of domains — commas, spaces, or new lines, any mix works — and DomainLert deduplicates, validates, and imports them in one go.",
      },
      {
        title: "Daily automated checks",
        body: "Every domain is checked against live registry data on a regular schedule, prioritizing whichever domains haven't been verified most recently.",
      },
      {
        title: "Configurable alert thresholds",
        body: "Alerts default to 30, 14, and 7 days before expiry. Override the default per account, or set up to 5 custom thresholds on any individual domain.",
      },
      {
        title: "Multiple alert recipients",
        body: "Send a domain's alerts to up to 3 email addresses — the client, the IT lead, whoever actually renews it — instead of just your own inbox.",
      },
      {
        title: "Status at a glance",
        body: "Every domain shows as active, expiring soon, expired, or check failed, with a health ring summarizing your whole portfolio at the top of the dashboard.",
      },
      {
        title: "Check history",
        body: 'See when a domain was last verified and which registrar it resolved to, so you have a record to point to when someone asks "did we check this?"',
      },
      {
        title: "Search, sort, and paginate",
        body: "Find any domain instantly, sort by name or active status, and page through lists in batches of 10, 25, or 100 without the UI slowing down.",
      },
      {
        title: "Built for real portfolios",
        body: "Up to 1,000 domains per account. If you're managing more than that, we show a clear message pointing you to support — never a silent failure.",
      },
    ],
    finalCta: {
      text: "See it on your own domains",
      titleLine1: "Import your list",
      titleEm: "and see for yourself.",
    },
  },

  pricing: {
    meta: {
      title: "Pricing",
      description:
        "DomainLert is free while we're in early access — the first 100 accounts get every feature at no cost. Planned pricing after that is $8/month, billed annually at $96.",
    },
    hero: {
      eyebrow: "Pricing",
      title: "Free for the first 100.",
      text: "DomainLert is free while we're in early access. The first 100 accounts get every feature at no cost — no credit card, no trial clock. After that, the planned price is $8/month.",
    },
    card: {
      tag: "Early access",
      title: "Free",
      titleSub: "for now",
      annual:
        "Every feature included, up to 1,000 domains. Planned pricing once early access ends: $8/month, billed annually at $96.",
      note: "No credit card required. Fair usage policy applies.",
    },
    included: {
      title: "What's included",
      text: "Every account gets the full product, free while we're in early access — there's nothing held back for a higher tier.",
      list: [
        "Daily automated expiry checks across your entire domain list",
        "Configurable alert thresholds — 30/14/7 day defaults, up to 5 custom per domain",
        "Up to 3 custom alert recipients per domain, so renewals reach the right person",
        "Bulk import by pasting a list — commas, spaces, or new lines",
        "Registrar and last-checked history for every domain",
        "Email support",
      ],
    },
    cap: {
      title: "The 1,000-domain cap",
      text: "DomainLert is built for portfolios, not just a handful of domains — but every account has a 1,000-domain cap. This keeps the service fast and predictable for everyone.",
      notice:
        "If you're managing more than 1,000 domains, or getting close, [contact us](/contact) before you hit the wall — we'll help you plan the next step rather than let you find out mid-import.",
    },
    faq: {
      title: "Common questions",
      items: [
        {
          question: "Is it really free?",
          answer:
            "Yes. DomainLert is free while we're in early access, and the first 100 accounts get every feature at no cost. There's no credit card required and no trial clock running.",
        },
        {
          question: "What happens after the first 100 accounts?",
          answer:
            "We plan to introduce a paid plan — $8/month, billed annually at $96 — for accounts that sign up after that. We'll decide nearer the time how the earliest accounts are handled, and anyone already signed up gets plenty of notice before anything about their account changes.",
        },
        {
          question: "Do I need to enter payment details?",
          answer:
            "No. You can create an account and start monitoring domains right away, with no card on file.",
        },
        {
          question: "What happens if I hit the 1,000-domain cap?",
          answer:
            "New domains are blocked once you reach the cap, and you'll see a clear in-app message pointing you to support — never a silent failure. Reach out before you're close and we'll help you plan ahead.",
        },
        {
          question: "Can I cancel anytime?",
          answer:
            "There's nothing to cancel while it's free — stop using it or delete your account whenever you like. Once paid plans exist, you'll be able to cancel any time to stop future renewals.",
        },
      ],
    },
    finalCta: {
      text: "Ready when you are",
      titleLine1: "Start monitoring",
      titleEm: "in a few minutes.",
    },
    jsonLd: {
      productDescription:
        "Domain expiry monitoring with daily checks, configurable alerts, and bulk import.",
    },
  },

  about: {
    meta: {
      title: "About",
      description:
        "Why DomainLert exists, what it does and doesn't do, and the principles behind how it's built.",
    },
    eyebrow: "Why this exists",
    title: "About DomainLert",
    sections: [
      {
        heading: "The problem",
        body: [
          "A domain lapsing is rarely a technical failure — it's an ownership failure. Someone assumed someone else was watching the renewal date. For a single personal domain, that's an inconvenience. For an agency managing dozens of client domains, or a startup whose investor-facing site goes dark for a weekend, it's lost deals, lost trust, and an uncomfortable phone call.",
          "Calendar reminders and spreadsheets work until they don't — a domain added outside the usual process, a reminder set on the wrong year, a client who changed registrars without telling anyone. DomainLert exists to make that failure mode structurally harder: one list, checked automatically, with alerts that go to the person who can actually act.",
        ],
      },
      {
        heading: "What it does — and doesn't do",
        body: [
          "DomainLert checks your domains against registry data on a regular schedule and emails you before they expire, at thresholds you control. That's the whole job.",
          "It does not renew domains for you, does not manage your registrar account, and does not guarantee a renewal happens. You stay in control of the registrar and the decision — DomainLert's job is to make sure you never find out too late.",
        ],
      },
      {
        heading: "How we build this",
        body: [
          "We'd rather say less and have it be true. You'll see specific, checkable claims here — what gets checked, how often, what a plan actually includes — instead of vague promises. It's free while we're in early access, with the first 100 accounts at no cost and one flat $8/month plan planned after that. No per-domain pricing, and a domain cap that's stated up front rather than discovered the hard way.",
        ],
      },
      {
        heading: "How your data is handled",
        body: [
          "We collect what's needed to monitor your domains and alert you: your email, the domains you add, their expiry data, and your alert settings. We don't sell it, and we don't use your domain list for anything beyond running the service. See the [Privacy Policy](/privacy) for the full detail.",
        ],
      },
      {
        heading: "Questions",
        body: [
          "If something here doesn't match what you're seeing in the product, or you just want to ask before you commit, [get in touch](/contact).",
        ],
      },
    ],
  },

  contact: {
    meta: {
      title: "Contact",
      description:
        "Get in touch with DomainLert for support, billing questions, or if your account is approaching the 1,000-domain cap.",
    },
    eyebrow: "Get in touch",
    title: "Contact",
    sections: [
      {
        heading: "Support and billing",
        body: [
          "Questions about your account, alerts not arriving, or anything else about DomainLert — email [support@domainlert.com](mailto:support@domainlert.com) and we'll get back to you.",
        ],
      },
      {
        heading: "Approaching the 1,000-domain cap?",
        body: [
          "Every account has a 1,000-domain limit. If you're managing a portfolio that's getting close, reach out at [support@domainlert.com](mailto:support@domainlert.com) before you hit it — we'd rather help you plan ahead than have you find out mid-import.",
        ],
      },
      {
        heading: "Sales and other questions",
        body: [
          "Evaluating DomainLert for a team, or have a question this site didn't answer? Send it to [support@domainlert.com](mailto:support@domainlert.com) — the same address reaches us for everything.",
        ],
      },
    ],
  },

  privacy: {
    meta: {
      title: "Privacy Policy",
      description:
        "How DomainLert collects, uses, and protects the information behind your domain monitoring account.",
    },
    eyebrow: "How information is handled",
    title: "Privacy Policy",
    updated: "Effective 24 August 2026",
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you use DomainLert, we may collect your email address, account details, profile information, domain names, expiry data, alert settings, recipient addresses, and service usage information. We also receive information you choose to submit through forms or support requests.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use this information to provide domain monitoring, check expiry information, send configured alerts, authenticate accounts, process payments where applicable, secure the service, and improve reliability. We do not use domain names to provide public directory listings.",
        ],
      },
      {
        heading: "For users in the EU",
        body: [
          "If you are in the European Union or European Economic Area, applicable data-protection law, including the GDPR, gives you additional rights. We process personal data when it is necessary to provide your account and monitoring service, to comply with legal obligations, to protect the service, or based on our legitimate interests. Where we rely on consent, you may withdraw it at any time.",
          "Subject to legal limits, you may ask us to access, correct, delete, or restrict processing of your personal data. You may also object to processing based on legitimate interests, request a portable copy of information you provided, and lodge a complaint with your local data-protection supervisory authority.",
          "Some service providers may process information outside the EU or EEA. Where required, we use an appropriate transfer safeguard, such as an adequacy decision or approved standard contractual clauses, and apply contractual and technical protections appropriate to the data.",
        ],
      },
      {
        heading: "Sharing information",
        body: [
          "We share information only as needed to operate DomainLert, such as with hosting, authentication, database, email delivery, payment, and domain-data providers. We may also disclose information when required by law or to protect the service and its users. We do not sell personal information.",
        ],
      },
      {
        heading: "Retention and security",
        body: [
          "We retain account and monitoring data while it is needed to provide the service or meet legal obligations. We use access controls and managed infrastructure designed to protect the information we hold, but no online service can guarantee absolute security.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can update profile information, change alert recipients, or delete managed domains from your account. You can cancel your account by contacting us through the details provided with your account. Some records may remain where retention is required by law or needed to resolve disputes.",
        ],
      },
      {
        heading: "Cookies and analytics",
        body: [
          "DomainLert uses essential cookies or similar storage to keep you signed in and protect authenticated sessions. We may use limited operational information to diagnose errors and understand service performance.",
        ],
      },
      {
        heading: "Changes and contact",
        body: [
          "We may update this policy when our practices or legal obligations change. The effective date above shows when it was last revised. Questions about privacy can be raised through our [contact page](/contact).",
        ],
      },
    ],
  },

  terms: {
    meta: {
      title: "Terms of Service",
      description:
        "The terms that apply when you use DomainLert to monitor and get alerted about domain expiry, including what the service does not guarantee.",
    },
    eyebrow: "The practical details",
    title: "Terms of Service",
    updated: "Effective 26 August 2026",
    sections: [
      {
        heading: "Using DomainLert",
        body: [
          "DomainLert helps you monitor domain expiry dates and send reminders. By creating an account or using the service, you agree to these terms. If you do not agree, do not use DomainLert. You agree to use the service lawfully and to keep your account information accurate.",
        ],
      },
      {
        heading: "Who provides the service",
        body: [
          "DomainLert is operated from Sweden, in the European Union. In these terms, “DomainLert”, “we”, “us”, and “our” refer to the operator of the service, and “you” refers to the person or organisation using it.",
        ],
      },
      {
        heading: "Your account",
        body: [
          "You are responsible for protecting your sign-in details and for activity performed through your account. Tell us promptly if you believe your account has been accessed without permission. You must be able to form a binding contract to use DomainLert, and if you use it for an organisation you confirm you are authorised to accept these terms on its behalf.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "When using DomainLert, you agree not to:",
          "- break the law, infringe others' rights, or monitor domains you have no legitimate reason to track;",
          "- add recipient email addresses without the recipient's permission;",
          "- place unusual, automated, or abusive load on the service, or try to circumvent account limits;",
          "- probe, scan, or test the security of the service, or attempt to access data that is not yours;",
          "- resell or provide the service to third parties except as part of managing domains you are responsible for.",
          "We may investigate suspected misuse and take appropriate action, including suspending or closing accounts.",
        ],
      },
      {
        heading: "What DomainLert is — and is not",
        body: [
          "DomainLert is a supplementary reminder tool. It reads publicly available domain information from third-party sources such as RDAP and WHOIS services, which can be delayed, incomplete, inconsistent, or wrong, and which may be unavailable at any time.",
          "DomainLert is not:",
          "- a registrar — it does not renew, register, transfer, or manage domains;",
          "- a system of record for your domain portfolio or your renewal dates;",
          "- a guarantee that a domain will be renewed, or that you will be alerted before any given deadline.",
          "You remain solely responsible for tracking your own renewal dates, keeping your own independent records, verifying expiry information directly with your registrar, and renewing your domains on time. Do not rely on DomainLert as your only safeguard against a domain lapsing.",
        ],
      },
      {
        heading: "Alerts and email",
        body: [
          "You may configure default and per-domain alert thresholds and up to three custom recipients per domain. You are responsible for having permission to provide those addresses and for keeping them current.",
          "We do not guarantee that any alert will be sent, delivered, delivered on time, or seen. Alert delivery depends on factors outside our control, including email providers, spam filters, DNS, network conditions, outages, and the accuracy of the information you and third-party sources provide. A missing alert does not mean a domain is safe.",
        ],
      },
      {
        heading: "Early access and changes to the service",
        body: [
          "DomainLert is currently offered during an early-access period. Features may change, be added, or be removed; the service may be paused for maintenance; and behaviour may differ from what is described on the site. We may change, suspend, limit, or discontinue the service, or any part of it, at any time. Where reasonable, we will give notice of significant changes.",
        ],
      },
      {
        heading: "Payments and cancellation",
        body: [
          "DomainLert is currently free while in early access, and no payment is collected. If we introduce paid plans, they will renew according to the plan details shown at checkout, you may cancel to stop future renewals, and any refund eligibility is governed by the offer shown when you subscribe.",
        ],
      },
      {
        heading: "No warranties",
        body: [
          'To the fullest extent permitted by law, DomainLert is provided "as is" and "as available", without warranties of any kind, whether express or implied. We do not warrant that the service will be uninterrupted, timely, secure, or error-free, that any expiry date or status shown is accurate or complete, that alerts will be delivered, or that the service will meet your requirements. Any information provided by DomainLert is for general guidance only and is not professional, legal, or financial advice.',
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the fullest extent permitted by law, DomainLert will not be liable for:",
          "- any domain that expires, lapses, is not renewed, is suspended, or is lost, or for any registrar or registry action or inaction;",
          "- any alert that is delayed, inaccurate, incomplete, or not delivered;",
          "- inaccurate, delayed, or missing data from RDAP, WHOIS, or other third-party sources;",
          "- any interruption, downtime, or discontinuation of the service;",
          "- loss of profits, revenue, business, contracts, opportunities, goodwill, data, or anticipated savings; or",
          "- any indirect, incidental, special, consequential, or punitive loss or damage.",
          "Our total aggregate liability arising out of or relating to the service or these terms will not exceed the greater of (a) the amounts you paid us for the service in the twelve months before the event giving rise to the claim, or (b) USD 100. Because the service is currently provided free of charge, and its price reflects this allocation of risk, this limit applies in full.",
          "Nothing in these terms excludes or limits our liability where it would be unlawful to do so, including liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for any liability that cannot be excluded or limited under mandatory Swedish or European Union law. If you use DomainLert as a consumer, your mandatory statutory rights are not affected by these terms, and some of the exclusions and limitations above may not apply to you.",
        ],
      },
      {
        heading: "Your responsibility and indemnity",
        body: [
          "You are responsible for your use of DomainLert, the domains you monitor, and the recipient addresses you add. To the extent permitted by law, and except where you use the service as a consumer, you agree to reimburse us for reasonable claims, losses, and costs arising from your breach of these terms, your misuse of the service, or your infringement of another party's rights.",
        ],
      },
      {
        heading: "Third-party services",
        body: [
          "DomainLert depends on third parties, including domain-data sources such as RDAP and WHOIS servers, email delivery providers, hosting, and authentication and database providers. We are not responsible for the acts, omissions, availability, or accuracy of those third parties, and their own terms and policies may also apply to your use.",
        ],
      },
      {
        heading: "Suspension and termination",
        body: [
          "We may suspend or close your account if you breach these terms, if your use creates risk or legal exposure, or if we are required to by law. You may stop using DomainLert and close your account at any time. Sections that by their nature should survive termination — including the disclaimers, limitation of liability, indemnity, and governing law — continue to apply afterwards.",
        ],
      },
      {
        heading: "Events outside our control",
        body: [
          "We are not liable for any failure or delay in providing the service that is caused by events beyond our reasonable control, including outages or changes at registries, registrars, hosting or email providers, network failures, cyber-attacks, or acts of government.",
        ],
      },
      {
        heading: "Governing law and disputes",
        body: [
          "These terms, and any dispute arising out of or relating to them or to the service, are governed by the laws of Sweden, without regard to its conflict-of-law rules. The courts of Sweden have jurisdiction, except that, if you use DomainLert as a consumer, mandatory law may still allow you to bring proceedings in the country where you live and to rely on the consumer-protection rules of that country. Before starting formal proceedings, we ask that you contact us through our [contact page](/contact) so we can try to resolve the matter directly.",
        ],
      },
      {
        heading: "General",
        body: [
          "If any provision of these terms is found unenforceable, the rest remain in effect. Our failure to enforce a provision is not a waiver of it. You may not transfer your rights under these terms without our consent; we may transfer ours to a successor of the service. These terms, together with our [Privacy Policy](/privacy), are the entire agreement between you and us about the service.",
        ],
      },
      {
        heading: "Changes and contact",
        body: [
          "We may update these terms as the service changes. If a change is significant, we will take reasonable steps to let you know; continued use after an update means you accept the revised terms. Questions about these terms can be raised through our [contact page](/contact).",
        ],
      },
    ],
  },

  auth: {
    common: {
      emailLabel: "Email address",
      passwordLabel: "Password",
      newPasswordLabel: "New password",
      confirmPasswordLabel: "Confirm new password",
      pleaseWait: "Please wait...",
      backToLogin: "Back to log in",
    },
    login: {
      meta: {
        title: "Log in",
        description:
          "Log in to your DomainLert account to see your managed domains and upcoming expiry alerts.",
      },
      kicker: "Welcome back",
      title: "Keep watch.",
      intro: "Sign in to see your managed domains and the next dates that need attention.",
      submit: "Log in",
      pending: "Signing you in. Please wait...",
      forgot: "Forgot your password?",
      switchPrompt: "New to DomainLert?",
      switchAction: "Create an account",
      asideTag: "DOMAINLERT / 01",
      asideLine1: "Know before",
      asideEm: "you have to know.",
    },
    signup: {
      meta: {
        title: "Sign up",
        description:
          "Create a DomainLert account and start monitoring your domains — free while DomainLert is in early access.",
      },
      kicker: "Start monitoring",
      title: "Make renewals boring.",
      intro: "Create your account and get a clear view of every domain before time gets tight.",
      submit: "Create account",
      pending: "Creating your account. Please wait...",
      switchPrompt: "Already have an account?",
      switchAction: "Log in",
      asideTag: "DOMAINLERT / 01",
      asideLine1: "Know before",
      asideEm: "you have to know.",
    },
    forgot: {
      meta: {
        title: "Reset your password",
        description: "Request a password reset link for your DomainLert account.",
      },
      kicker: "Account access",
      title: "Reset your password.",
      intro:
        "Enter your account email and we will send you a secure link to choose a new password.",
      submit: "Send reset link",
      pending: "Sending reset link. Please wait...",
      asideTag: "DOMAINLERT / 02",
      asideLine1: "Get back to",
      asideEm: "what matters.",
    },
    reset: {
      meta: {
        title: "Choose a new password",
        description: "Choose a new password for your DomainLert account.",
      },
      kicker: "Account access",
      title: "Choose a new password.",
      intro: "Use at least eight characters, then confirm your new password below.",
      submit: "Update password",
      pending: "Updating password. Please wait...",
      asideTag: "DOMAINLERT / 03",
      asideLine1: "Keep watch",
      asideEm: "with confidence.",
    },
    errors: {
      enterEmailAndPassword: "Enter your email and password.",
      credentialsRejected: "That email and password combination was not accepted.",
      enterValidEmail: "Enter a valid email address.",
      resetSendFailed: "We could not send the reset email. Please try again.",
      resetEmailSent: "Check your inbox for a password reset link.",
      passwordTooShort: "Use a password with at least 8 characters.",
      passwordsDoNotMatch: "Your passwords do not match.",
      resetLinkExpired: "That reset link has expired. Request a new one to continue.",
      passwordUpdateFailed: "We could not update your password. Please try again.",
      passwordUpdated: "Your password has been updated. You can now log in.",
      signupInvalid: "Use an email address and a password with at least 8 characters.",
      confirmEmail: "Check your email to confirm your account.",
    },
  },

  dashboard: {
    meta: { title: "Dashboard" },
    eyebrow: "Domain monitoring",
    title: "Managed Domains",
    monitoringActive: "◆ MONITORING ACTIVE",
    domainsLabel: "Managed Domains / {count} domains",
    goodMorning: "Good morning",
    goodMorningName: "Good morning, {name}",
    domainsHealthy: "domains healthy",
    needAttention: { one: "{count} domain needs attention", other: "{count} domains need attention" },
    import: {
      kicker: "Add to Managed Domains",
      title: "Bring your list.",
      text: "Paste domains separated by commas, spaces, or new lines. We will remove duplicates and keep your list private.",
      label: "Domain list",
      submit: "Import domains",
    },
    alerts: {
      kicker: "Expiry alerts",
      title: "Set your default.",
      text: "Days before expiry to email you, separated by commas. Each domain can override this from its Alerts button above.",
      label: "Alert days before expiry",
      submit: "Save default",
    },
    logOut: "Log out",
    loadingDomains: "Loading your domains",
    list: {
      searchLabel: "Search domains",
      searchPlaceholder: "Find a domain",
      sortLabel: "Sort by",
      sortAz: "A-Z",
      sortZa: "Z-A",
      sortActive: "Active",
      perPageLabel: "Show per page",
      headerDomain: "Domain",
      headerExpiry: "Expiry",
      headerStatus: "Status",
      headerAlerts: "Alert schedule",
      headerActions: "Actions",
      notRegistered: "Not registered",
      expiryPending: "Expiry check pending",
      customThresholds: "Custom: {values}",
      defaultThresholds: "Default thresholds",
      emptySearch: "No domains match your search.",
      emptyList: "Your first domains will appear here.",
      paginationRange: "{from}-{to} of {total}",
      previous: "Previous",
      next: "Next",
      previousPage: "Previous page",
      nextPage: "Next page",
      pageXofY: "Page {page} of {pages}",
      status: {
        active: "active",
        expiring_soon: "expiring soon",
        expired: "expired",
        check_failed: "check failed",
        not_registered: "not registered",
      },
    },
    deleteDialog: {
      trigger: "Delete",
      kicker: "Remove domain",
      title: "Delete {name}?",
      body: "This will remove the domain and its monitoring history from your account.",
      cancel: "Cancel",
      confirm: "Delete domain",
      pending: "Deleting...",
    },
    alertsDialog: {
      trigger: "Alerts",
      kicker: "Expiry alerts",
      thresholdsHelp:
        "Add up to 5 custom thresholds, separated by commas. Leave blank to use your default ({defaults}).",
      recipientHint:
        "Add up to 3 custom email recipients for this domain, separated by commas. Leave blank to alert your account email.",
      recipientPlaceholder: "Email recipients (up to 3)",
      thresholdError: "Use 5 or fewer custom thresholds.",
      cancel: "Cancel",
      save: "Save",
      pending: "Saving...",
    },
    actions: {
      listTooLong: "Enter a domain list of 100,000 characters or fewer.",
      enterOneValid: "Enter at least one valid domain.",
      capReached: "Your account has reached the 1,000-domain cap. Contact support to add more.",
      importFailed: "We could not import those domains. Check your database setup and try again.",
      imported: { one: "Imported {count} domain", other: "Imported {count} domains" },
      importedSkipped: "; skipped {skipped}.",
      importedDone: ".",
      couldNotIdentify: "We could not identify that domain.",
      removeFailed: "We could not remove that domain. Please try again.",
      removed: "Domain removed.",
      defaultThresholdsFailed:
        "We could not update your default alert thresholds. Please try again.",
      defaultThresholdsUpdated: "Your default alert thresholds have been updated.",
      thresholdsTooLong: "Keep alert thresholds to 1,000 characters or fewer.",
      recipientsTooLong: "Keep email recipients to 2,000 characters or fewer.",
      invalidRecipients: "Enter valid email addresses, separated by commas.",
      tooManyRecipients: "Use 3 or fewer email addresses per domain.",
      domainAlertsFailed: "We could not update alerts for that domain. Please try again.",
      domainUsesDefault: "{name} now uses your default alert thresholds.",
      domainCustomSaved: "Custom alert thresholds saved for {name}.",
    },
    thresholdValidation: {
      atLeastOne: "Enter at least one valid day threshold (1-365), separated by commas.",
      wholeNumbers: "Use whole-number thresholds from 1 to 365, separated by commas.",
      wholeNumbersOrBlank:
        "Use whole-number thresholds from 1 to 365, separated by commas, or leave blank to use your default.",
      tooMany: "Use {max} or fewer thresholds.",
      tooManyOrBlank: "Use {max} or fewer thresholds, or leave blank to use your default.",
    },
  },

  profile: {
    kicker: "Account settings",
    title: "Your profile.",
    backToDashboard: "Back to dashboard",
    loading: "Loading your profile",
    details: {
      number: "01",
      title: "Profile details",
      text: "Keep your contact information and agency details up to date.",
      name: "Name",
      role: "Role",
      rolePlaceholder: "Account manager",
      agency: "Agency name",
      agencyPlaceholder: "Northstar Studio",
      phone: "Phone number",
      phonePlaceholder: "+1 555 012 3456",
      website: "Website",
      websitePlaceholder: "https://northstar.studio",
      submit: "Save profile",
    },
    email: {
      number: "02",
      title: "Email address",
      text: "We will send a confirmation link before your sign-in email changes.",
      label: "Email address",
      submit: "Update email",
    },
    password: {
      number: "03",
      title: "Password",
      text: "Choose a new password with at least 8 characters.",
      current: "Current password",
      new: "New password",
      confirm: "Confirm new password",
      submit: "Change password",
    },
    testEmail: {
      number: "04",
      title: "Test email delivery",
      text: "Send yourself a sample expiry alert to confirm SMTP is configured correctly and see how the email looks.",
      note: 'Sends a mock "example.com expires in 14 days" alert to {email}.',
      submit: "Send test email",
    },
    actions: {
      namesTooLong: "Keep names, roles, and agency names to 120 characters or fewer.",
      phoneTooLong: "Keep your phone number to 30 characters or fewer.",
      invalidWebsite: "Enter a complete website address, including https://.",
      profileFailed: "We could not update your profile. Please try again.",
      profileUpdated: "Your profile has been updated.",
      enterValidEmail: "Enter a valid email address.",
      sameEmail: "That is already your current email address.",
      confirmNewEmail: "Check your inbox to confirm your new email address.",
      enterCurrentPassword: "Enter your current password.",
      passwordTooShort: "Use a password with at least 8 characters.",
      passwordsDoNotMatch: "Your new passwords do not match.",
      noPasswordEmail: "This account does not have a password email address.",
      currentPasswordRejected: "Your current password was not accepted.",
      passwordChanged: "Your password has been changed.",
      noEmailToSend: "Your account does not have an email address to send to.",
      testEmailFailed: "We could not send a test email: {error}",
      testEmailSent: "Test email sent to {email}. Check your inbox (and spam folder).",
    },
  },

  notFound: {
    eyebrow: "404",
    title: "Page not found.",
    text: "The page you were looking for doesn't exist, or may have moved.",
    back: "Back to homepage",
  },

  error: {
    eyebrow: "Something went wrong",
    title: "That didn't load.",
    text: "An unexpected error interrupted this page. Your account and domains are unaffected — try again, or head back to the homepage.",
    tryAgain: "Try again",
    back: "Back to homepage",
  },

  email: {
    daySingular: "1 day",
    dayPlural: "{count} days",
    subject: "DomainLert: {domain} expires in {dayLabel}",
    eyebrow: "Expiry alert",
    heading: "{domain} expires in {dayLabel}",
    textTitle: "DomainLert alert: {domain} expires in {dayLabel}",
    textBody: "{domain} is set to expire on {date} ({dayLabel} from now). Renew it soon to avoid a lapse.",
    textDashboard: "View your dashboard: {url}",
    htmlBody:
      "This domain is set to expire on <strong>{date}</strong>. Renew it soon to avoid a lapse in service.",
    viewDashboard: "View your dashboard",
    ownerFallback: "your DomainLert account owner",
    footer:
      "This alert was set up in DomainLert by {owner}. To change how these alerts are sent, or to stop receiving them, contact {owner} directly.",
  },
};

/** Structural shape every locale dictionary must satisfy (widened from the English source). */
export type Dictionary = typeof en;

export default en;
