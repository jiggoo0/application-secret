/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  images: {
    // ปิดการ Optimize เพื่อรองรับ external image ทุกโดเมน
    unoptimized: true,
  },

  webpack: (config, { isServer }) => {
    // ปิด cache เพื่อป้องกัน build error บน Android/Termux
    config.cache = false;

    // ป้องกัน Watcher error บนระบบที่มีสิทธิ์จำกัด เช่น Termux
    config.watchOptions = {
      ignored: ['**/node_modules', '/.git', '/data/**', '/'],
    };

    // สำหรับ client-side: ป้องกันการเรียกใช้ Node core modules
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        cluster: false, // ป้องกัน error จาก log4js หรือ Magic UI
      };
    }

    return config;
  },
};

module.exports = nextConfig;
