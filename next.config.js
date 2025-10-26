/** @type {import('next').NextConfig} */
const path = require('path');

const isVercel = !!process.env.VERCEL;
const isTermux = !!process.env.TERMUX;
const projectRoot = __dirname;

const nextConfig = {
  reactStrictMode: true,

  // 🏗️ Output mode for Vercel
  output: isVercel ? 'standalone' : undefined,

  // 🖼️ Image optimization
  images: {
    unoptimized: !isVercel,
    domains: [
      'ksiobbrextlywypdzaze.supabase.co', // ✅ Supabase storage domain
    ],
  },

  // 🧪 Experimental features
  experimental: {
    serverActions: {},
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-dialog',
    ],
    turbopack: {
      rules: {
        '*.mdx': ['@mdx-js/loader'],
      },
    },
  },

  // ✅ Typed routes
  typedRoutes: true,

  // 🔍 ESLint configuration
  eslint: {
    dirs: ['app', 'components', 'lib', 'utils', 'config'],
  },

  // ⚙️ Webpack customization
  webpack: (config, { isServer }) => {
    config.cache = false;

    // 👀 Watcher settings
    config.watchOptions = isTermux
      ? {
          poll: 1000,
          aggregateTimeout: 300,
          ignored: [
            '/node_modules',
            '/.git',
            '/.next/',
            path.resolve(projectRoot, '/'),
            '/data/',
          ],
        }
      : {
          ignored: ['/node_modules', '/.git', '/.next/'],
        };

    // 🛡️ Fallback for client-side
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

    // 📦 Extension aliasing
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };

    return config;
  },
};

module.exports = nextConfig;