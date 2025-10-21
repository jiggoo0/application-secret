/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  images: {
    // ปิดการ Optimize เพื่อรองรับ external image ทุกโดเมน
    unoptimized: true,
  },

  webpack: (config, { isServer }) => {
    // ปิด cache
    config.cache = false;

    // ป้องกัน Watcher ของ Termux/Android
    config.watchOptions = {
      ignored: ['/node_modules', '/.git', '/data/**'],
    };

    // สำหรับ client-side ไม่ให้ webpack เรียกใช้ module Node
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
