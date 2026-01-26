/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  images: {
    minimumCacheTTL: 2678400 * 6, // 6 meses
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
        protocol: 'https',
        hostname: 'holy-rhythm-d59945257b.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          /*{
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },*/
          /*{
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' https: data:; script-src 'self'; style-src 'self' 'unsafe-inline'",
          },*/
        ],
      },
    ];
  },
};

export default nextConfig;
