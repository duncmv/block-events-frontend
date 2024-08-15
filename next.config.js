/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "imagecdn.app" },
    ],
  },
}

module.exports = nextConfig
