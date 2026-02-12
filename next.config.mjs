/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  images: {
    minimumCacheTTL: 2678400 * 6,
    remotePatterns: [
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
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
        {
          key: "Cross-Origin-Embedder-Policy",
          value: "unsafe-none",
        },
        {
          key: "Cross-Origin-Resource-Policy",
          value: "cross-origin",
        },
        {
          key: "Content-Security-Policy",
          value: `
            default-src 'self';
            img-src 'self' https: data: https://holy-rhythm-d59945257b.media.strapiapp.com;
            media-src 'self' https://holy-rhythm-d59945257b.media.strapiapp.com;
            connect-src 'self' https://holy-rhythm-d59945257b.media.strapiapp.com https://holy-rhythm-d59945257b.strapiapp.com;
            script-src 'self' 'unsafe-inline';
            style-src 'self' 'unsafe-inline';
          `.replace(/\s{2,}/g, ' ').trim(), 
        },
        ],
      },
    ];
  },
};

export default nextConfig;
