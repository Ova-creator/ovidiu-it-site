/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "www.notion.so",
      "s3.us-west-2.amazonaws.com",
      "prod-files-secure.s3.us-west-2.amazonaws.com",
      "images.unsplash.com",
    ],
    remotePatterns: [
      { protocol: "https", hostname: "www.notion.so" },
      { protocol: "https", hostname: "s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
module.exports = nextConfig;
