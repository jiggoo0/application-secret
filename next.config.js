/** @type {import('next').NextConfig} */
const path = require('path');

const isVercel = !!process.env.VERCEL;
const isTermux = !!process.env.TERMUX; // กำหนด TERMUX=true บน Termux/Android
const projectRoot = __dirname;

const nextConfig = {
  reactStrictMode: true,
  output: isVercel ? 'standalone' : undefined,

  // 🖼️ Images config
  images: {
    unoptimized: !isVercel,
    domains: [
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'cdn.jsdelivr.net',
    ],
  },

  // Turbopack
  turbopack: isVercel
    ? {
        rules: { '*.mdx': ['@mdx-js/loader'] },
      }
    : false, // ปิด Turbopack บน Termux/Android

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-dialog',
    ],
  },

  eslint: {
    dirs: ['app', 'components', 'lib', 'utils', 'config'],
  },

  webpack: (config, { isServer }) => {
    // ปิด cache
    config.cache = false;

    // Watcher settings
    if (isTermux) {
      // ใช้ polling watcher บน Termux
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: [
          '**/node_modules',
          '**/.git',
          '**/.next/**',
          path.resolve(projectRoot, '/'), // ป้องกัน scan root
          '/data/**',
        ],
      };
    } else {
      // Linux/macOS/Vercel ปกติ
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.git', '**/.next/**'],
      };
    }

    // Fallback สำหรับ client-side ไม่ให้ error กับ Node core modules
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

    // รองรับ .mjs / .cjs
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    };

    return config;
  },
};

module.exports = nextConfig;
