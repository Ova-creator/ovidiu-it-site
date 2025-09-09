// data/affiliates.js

/**
 * Usage:
 * - Replace `url` with your affiliate links when approved.
 * - You can temporarily hide an item by adding `hidden: true`.
 * - `category` controls grouping on /tools.
 */

export const affiliates = [
  // Infrastructure
  {
    slug: "vercel",
    name: "Vercel",
    category: "Infrastructure",
    description:
      "Best-in-class hosting for Next.js. Ultra-fast builds, edge network, image optimization.",
    url: "https://vercel.com/",
  },
  {
    slug: "netlify",
    name: "Netlify",
    category: "Infrastructure",
    description:
      "Modern platform for front-end sites and apps. Functions, forms, deploy previews.",
    url: "https://www.netlify.com/",
  },
  {
    slug: "cloudflare",
    name: "Cloudflare",
    category: "Infrastructure",
    description:
      "Global CDN, fast DNS, WAF, and Workers for edge compute.",
    url: "https://www.cloudflare.com/",
  },

  // Domains & Email
  {
    slug: "namecheap",
    name: "Namecheap",
    category: "Domains & Email",
    description:
      "Great value domains, solid DNS, reliable support — ideal for getting started.",
    url: "https://www.namecheap.com/",
  },
  {
    slug: "zoho-mail",
    name: "Zoho Mail",
    category: "Domains & Email",
    description:
      "Business email with strong DKIM/SPF/DMARC support. A cost-effective Google Workspace alternative.",
    url: "https://www.zoho.com/mail/",
  },
  {
    slug: "google-workspace",
    name: "Google Workspace",
    category: "Domains & Email",
    description:
      "Full collaboration suite for teams: Gmail, Drive, Docs, Meet, and more.",
    url: "https://workspace.google.com/",
  },

  // Analytics
  {
    slug: "ga4",
    name: "Google Analytics 4",
    category: "Analytics",
    description:
      "Free, widely adopted analytics platform. We use it for essential measurement.",
    url: "https://analytics.google.com/",
  },
  {
    slug: "plausible",
    name: "Plausible",
    category: "Analytics",
    description:
      "Privacy-friendly, lightweight analytics — often no cookie banner needed.",
    url: "https://plausible.io/",
  },
  {
    slug: "posthog",
    name: "PostHog",
    category: "Analytics",
    description:
      "Product analytics with session replays and feature flags. Cloud or self-hosted.",
    url: "https://posthog.com/",
  },

  // SEO
  {
    slug: "semrush",
    name: "Semrush",
    category: "SEO",
    description:
      "All-in-one SEO suite: keyword research, site audits, competitor and backlink analysis.",
    url: "https://www.semrush.com/",
  },
  {
    slug: "ahrefs",
    name: "Ahrefs",
    category: "SEO",
    description:
      "Excellent backlink index and audits. Industry standard for link intelligence.",
    url: "https://ahrefs.com/",
  },
  {
    slug: "surferseo",
    name: "SurferSEO",
    category: "SEO",
    description:
      "Data-driven on-page optimization with a powerful content editor.",
    url: "https://surferseo.com/",
  },

  // AI & Automation
  {
    slug: "openai",
    name: "OpenAI",
    category: "AI & Automation",
    description:
      "GPT models for content, RAG, and automations. Strong for workflow integration.",
    url: "https://openai.com/",
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "AI & Automation",
    description:
      "No-code automations between hundreds of apps. Triggers, actions, webhooks.",
    url: "https://zapier.com/",
  },

  // Productivity & Workflow
  {
    slug: "notion",
    name: "Notion",
    category: "Productivity & Workflow",
    description:
      "All-in-one workspace: docs, databases, wiki, lightweight CRM.",
    url: "https://www.notion.so/",
  },
  {
    slug: "clickup",
    name: "ClickUp",
    category: "Productivity & Workflow",
    description:
      "Fast project management with docs and dashboards — great for agencies.",
    url: "https://clickup.com/",
  },
  {
    slug: "figma",
    name: "Figma",
    category: "Productivity & Workflow",
    description:
      "Collaborative UI/UX design with clean developer handoff.",
    url: "https://www.figma.com/",
  },
];

/** Helper */
export function getAffiliateBySlug(slug) {
  return affiliates.find((a) => a.slug === slug);
}
