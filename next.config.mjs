/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 2678400 * 6, // 3 months
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '136.110.180.2',
        pathname: '/cms/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.16',
        port: "1337",
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
