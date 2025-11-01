/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.viktor.ai',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
