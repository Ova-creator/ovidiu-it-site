// app/sitemap.js
import SITE from "../lib/site";

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${SITE.url}/`, lastModified },
    { url: `${SITE.url}/projects`, lastModified },
    { url: `${SITE.url}/learning`, lastModified },
    { url: `${SITE.url}/about`, lastModified },
    { url: `${SITE.url}/contact`, lastModified },
  ];
}
