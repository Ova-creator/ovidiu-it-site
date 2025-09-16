import { SITE_URL } from "../lib/site";

export default function sitemap() {
  const base = SITE_URL;
  return [
    { url: `${base}/`,         lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/learning`, lastModified: new Date() },
    { url: `${base}/about`,    lastModified: new Date() },
    { url: `${base}/contact`,  lastModified: new Date() },
  ];
}
