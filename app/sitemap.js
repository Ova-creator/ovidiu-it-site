// app/sitemap.js
import { abs } from "../lib/site";

export default function sitemap() {
  const now = new Date();

  return [
    { url: abs("/"), lastModified: now },
    { url: abs("/services"), lastModified: now },
    { url: abs("/services/web-design-uk"), lastModified: now },
    { url: abs("/services/seo-uk"), lastModified: now },
    { url: abs("/services/automation-uk"), lastModified: now },
    { url: abs("/projects"), lastModified: now },
    { url: abs("/projects/egodentlab"), lastModified: now },
    { url: abs("/about"), lastModified: now },
    { url: abs("/contact"), lastModified: now },

    // Blog
    { url: abs("/blog"), lastModified: now },
    { url: abs("/blog/website-cost-uk"), lastModified: now },
    { url: abs("/blog/seo-best-practices-uk-2025"), lastModified: now },

    // Tools (indexabil)
    { url: abs("/tools"), lastModified: now },
  ];
}
