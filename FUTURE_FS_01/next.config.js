/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "your-domain.com",
      "github.com",
      "raw.githubusercontent.com",
      "imgur.com",
      // Add other domains where your images are hosted
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
