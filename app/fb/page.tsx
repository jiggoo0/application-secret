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
    url: 'https://www.jpvisouldocs.online/fb', // ใช้โดเมนจริง
    siteName: 'JP Visoul&Docs',
    type: 'website',
    images: [
      {
        url: 'https://www.jpvisouldocs.online/og-image.png', // Absolute URL
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
    images: ['https://www.jpvisouldocs.online/og-image.png'], // Absolute URL
  },
  robots: {
    index: true, // ให้ social bots สามารถอ่าน metadata
    follow: true,
    nocache: true,
  },
};

// ----------------------------------------------------
// Page (Dynamic Server Component)
// ----------------------------------------------------
export default async function FBPage() {
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

  // 🤖 Bot / Crawler → ให้ Metadata ทำงาน
  if (isCrawler) {
    return null;
  }

  // 👤 Human → redirect ไปหน้าแรก
  redirect('/');
}
