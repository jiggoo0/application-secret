/** @type {import('next').NextConfig} */
const path = require('path');

const isVercel = !!process.env.VERCEL;
const isTermux = !!process.env.TERMUX;
const projectRoot = __dirname;

const nextConfig = {
  reactStrictMode: true,
  output: isVercel ? 'standalone' : undefined,

  images: {
    unoptimized: !isVercel,
    domains: [
      'ksiobbrextlywypdzaze.supabase.co', // ✅ Supabase storage
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  experimental: {
    serverActions: {},
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-dialog',
    ],
  },

  typedRoutes: true,

  eslint: {
    dirs: ['app', 'components', 'lib', 'utils', 'config'],
  },

  webpack: (config, { isServer }) => {
    config.cache = false;

    config.watchOptions = isTermux
      ? {
          poll: 1000,
          aggregateTimeout: 300,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/.next/**',
            path.resolve(projectRoot, '/data/'),
          ],
        }
      : {
          ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
        };

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        cluster: false,
        net: false,
        tls: false,
      };
    }

    config.resolve.extensionAlias = { '.js': ['.js'] };

    return config;
  },
};

module.exports = nextConfig;
