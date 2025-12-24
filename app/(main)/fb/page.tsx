// app/fb/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

// ----------------------------------------------------
// Metadata (Static) สำหรับ Social Preview
// ----------------------------------------------------
export const metadata: Metadata = {
  title: 'JP Visoul&Docs | Official business documentation platform',
  description: 'Official business documentation platform for JP Visoul services.',
  openGraph: {
    title: 'JP Visoul&Docs',
    description: 'Business documentation & services platform.',
    url: 'https://www.jpvisouldocs.online/fb',
    siteName: 'JP Visoul&Docs',
    type: 'website',
    images: [
      {
        url: 'https://www.jpvisouldocs.online/og-image.png', // Absolute URL
        width: 1200, // หรือใช้ 1024 ถ้าต้องการ
        height: 630, // หรือ 576 ตามไฟล์จริง
        alt: 'JP Visoul&Docs Official Logo and Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JP Visoul&Docs',
    description: 'Business documentation & services platform.',
    images: ['https://www.jpvisouldocs.online/og-image.png'],
  },
  robots: {
    index: true, // ให้ bot อ่าน metadata
    follow: true,
    nocache: true,
  },
};

// ----------------------------------------------------
// Dynamic Server Component: FB / Social Preview
// ----------------------------------------------------
export default async function FBPage() {
  const headersList = await headers();
  const ua = headersList.get('user-agent') ?? '';

  // List bot / crawler ของ social media
  const socialCrawlers = [
    'facebookexternalhit',
    'facebot',
    'twitterbot',
    'linkedinbot',
    'pinterestbot',
    'linebot',
    'googlebot',
    'bingbot',
    'baidu',
  ];

  // ตรวจสอบว่าเป็น crawler หรือไม่
  const isCrawler = socialCrawlers.some((crawler) => ua.toLowerCase().includes(crawler));

  if (isCrawler) {
    // 🤖 Bot → metadata ทำงาน
    return null;
  }

  // 👤 Human → redirect หน้าแรก
  redirect('/');
}
