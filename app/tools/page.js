// app/tools/page.js
import Link from "next/link";
import { affiliates } from "../../data/affiliates";
import { abs } from "../../lib/site";

export const metadata = {
  title: "Tools — The stack we use and recommend",
  description:
    "Curated tools for web infrastructure, domains & email, analytics, SEO, AI, and productivity. Some links are affiliate — we may earn a commission.",
  alternates: { canonical: abs("/tools") },
  openGraph: {
    title: "Tools — Ovidiu.IT",
    description:
      "Our curated tool stack for Next.js, SEO, and automation. Hand-picked and tested.",
    url: abs("/tools"),
    images: [
      {
        url: abs("/og/og-image-1200x630.png"),
        width: 1200,
        height: 630,
        alt: "Ovidiu.IT Tools",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tools — Ovidiu.IT",
    description:
      "Our curated tool stack for Next.js, SEO, and automation. Hand-picked and tested.",
    images: [abs("/og/og-image-1200x630.png")],
  },
};

const groups = [
  "Infrastructure",
  "Domains & Email",
  "Analytics",
  "SEO",
  "AI & Automation",
  "Productivity & Workflow",
];

function groupAffiliates() {
  const map = new Map();
  for (const g of groups) map.set(g, []);
  for (const a of affiliates) {
    if (!map.has(a.category)) map.set(a.category, []);
    map.get(a.category).push(a);
  }
  return map;
}

// GA helper — trimite cta_click cu category=tools, label=:slug
function trackVisit(slug) {
  try {
    // gtag direct, dacă există
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "cta_click", {
        category: "tools",
        label: slug,
        value: 1,
      });
    }
    // fallback: dataLayer (pentru GTM) dacă e prezent
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "cta_click",
        category: "tools",
        label: slug,
        value: 1,
      });
    }
  } catch {}
}

export default function ToolsPage() {
  const grouped = groupAffiliates();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recommended Tools by Ovidiu.IT",
    itemListElement: affiliates.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `https://ovidiu.it.com/go/${a.slug}`,
      description: a.description,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you earn commissions from these tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Some links are affiliate. If you purchase through them, we may earn a commission at no extra cost to you. We only recommend tools we use or would use for client projects."
        }
      },
      {
        "@type": "Question",
        "name": "How do you pick the best tools for Next.js and SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "We evaluate performance, reliability, documentation, pricing transparency, and real-world results in Next.js and SEO workflows."
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold leading-[1.15] mx-auto max-w-3xl text-center">
        Tools we use & recommend
      </h1>

      {/* Intro SEO scurt, sub H1 */}
      <p className="mt-2 text-center text-neutral-400 max-w-2xl mx-auto text-sm">
        Discover the <strong>best tools for Next.js &amp; SEO</strong> — curated
        hosting, analytics and automation platforms to build faster and rank higher.
      </p>

      <p className="mt-3 text-center text-neutral-300 max-w-2xl mx-auto">
        A curated list of premium tools that power our workflow. Some links are
        affiliate — if you purchase through them, we may earn a commission at no
        extra cost to you.
      </p>

      {/* JSON-LD: ItemList + FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Micro-SEO: H2 scurt cu criterii (fără a schimba vizualul existent) */}
      <h2 className="sr-only">How we pick the best tools for Next.js & SEO</h2>

      <div className="mt-10 space-y-10">
        {groups.map((g) => {
          const items = grouped.get(g) || [];
          if (!items.length) return null;
          return (
            <section key={g}>
              <h3 className="text-2xl font-bold mb-4">{g}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((a) => (
                  <div key={a.slug} className="card">
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="text-lg sm:text-xl font-semibold">
                          {a.name}
                        </h4>
                        <Link
                          href={`/go/${a.slug}`}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          className="btn-primary"
                          onClick={() => trackVisit(a.slug)}
                        >
                          Visit
                        </Link>
                      </div>
                      <p className="text-sm text-neutral-300">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 text-center text-sm text-neutral-400">
        Disclaimer: Some links on this page are affiliate links. If you make a
        purchase through them, we may earn a commission. We only recommend tools
        we use or would use for client work.
      </div>
    </div>
  );
}
