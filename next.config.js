/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      // Notion-hosted covers (de obicei astea două)
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      // dacă mai folosești și Unsplash
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
