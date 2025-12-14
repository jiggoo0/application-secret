// app/fb/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

// ----------------------------------------------------
// Metadata (Static)
// ----------------------------------------------------
export const metadata: Metadata = {
  title: 'JP Visoul&Docs | Official business documentation platform',
  description: 'Official business documentation platform for JP Visoul services.',
  openGraph: {
    title: 'JP Visoul&Docs',
    description: 'Business documentation & services platform.',
    url: 'https://www.yourdomain.com/fb', // 🔁 เปลี่ยนเป็นโดเมนจริง
    siteName: 'JP Visoul&Docs',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // ต้องอยู่ใน /public
        width: 1200,
        height: 630,
        alt: 'JP Visoul&Docs Official Logo and Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JP Visoul&Docs',
    description: 'Business documentation & services platform.',
    images: ['/og-image.png'],
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

// ----------------------------------------------------
// Page (Dynamic Server Component)
// ----------------------------------------------------
export default async function FBPage() {
  // Next.js 15+: headers() เป็น async
  const headersList = await headers();
  const ua = headersList.get('user-agent') ?? '';

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

  const isCrawler = socialCrawlers.some((crawler) => ua.toLowerCase().includes(crawler));

  // 🤖 Bot / Crawler → ให้ Metadata ทำงาน (ไม่ redirect)
  if (isCrawler) {
    return null;
  }

  // 👤 Human → redirect (App Router ไม่มี replace/push)
  redirect('/');
}
