import type { NextConfig } from 'next'

/**
 * @description THE_MASTER_ARCHITECT_CONFIG:
 * ปรับแต่งเพื่อความเนียนระดับ Industrial Sharp และความปลอดภัยสูงสุด
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    // 🟢 เน้นคุณภาพรูปภาพที่เหมาะสมสำหรับงาน High-end Visuals
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      // 🟢 จัดการช่องโหว่การดึงภาพจาก Supabase ทั้งโปรเจกต์เก่าและใหม่
      {
        protocol: 'https',
        hostname: 'dpgmfbnzyhnhwzyozoxe.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'ksiobbrextlywypdzaze.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.jpvisouldocs.online',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // 🟢 ทางลัดพิเศษ: ลด Bundle Size โดยการ Optimize การดึงไอคอน
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
