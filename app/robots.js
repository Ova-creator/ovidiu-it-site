// app/robots.js
import { abs, siteUrl } from "../lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/go/"], // nu indexăm redirectorul
        allow: ["/"],
      },
    ],
    sitemap: abs("/sitemap.xml"),
    host: siteUrl.replace(/^https?:\/\//, ""),
  };
}
