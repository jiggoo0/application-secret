import HomePage from './HomePage';

export const metadata = {
  title: 'JP Visual & Docs',
  description: 'ยกระดับธุรกิจด้วยบริการ Visual & Documentation แบบมืออาชีพ',
  metadataBase: new URL('https://application-secret.vercel.app'),
  openGraph: {
    title: 'JP Visual & Docs',
    description: 'บริการออกแบบภาพลักษณ์ดิจิทัลและเอกสารธุรกิจที่ดูมืออาชีพ',
    url: 'https://application-secret.vercel.app',
    siteName: 'JP Visual & Docs',
    images: [
      {
        url: '/images/hero/hero.webp',
        alt: 'JP Visual & Docs Hero',
        width: 1200,
        height: 630,
        type: 'image/webp',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JP Visual & Docs',
    description: 'บริการออกแบบภาพลักษณ์ดิจิทัลและเอกสารธุรกิจที่ดูมืออาชีพ',
    images: ['/images/hero/hero.webp'],
    site: '@jpvisualdocs',
    creator: '@jpvisualdocs',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      maxVideoPreview: -1,
      maxImagePreview: 'large',
      maxSnippet: -1,
    },
  },
  alternates: {
    canonical: 'https://application-secret.vercel.app',
    languages: {
      th: 'https://application-secret.vercel.app/th',
      en: 'https://application-secret.vercel.app/en',
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

/**
 * 🏠 หน้าแรกของเว็บไซต์ JP Visual & Docs
 * ----------------------------------------------------
 * ✅ ใช้ layout แบบเต็มหน้าจอ
 * ✅ รองรับ Tailwind theme และ accessibility
 * ✅ พร้อมสำหรับ future expansion เช่น analytics, i18n, structured data
 */
export default function Page() {
  return (
    <main
      id="main-content"
      role="main"
      aria-label="เนื้อหาหลัก"
      className="min-h-screen w-full bg-background text-foreground antialiased transition-colors duration-300"
    >
      <HomePage />
    </main>
  );
}
