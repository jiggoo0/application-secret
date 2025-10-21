export const userDashboardMetadata = {
  title: 'แดชบอร์ดผู้ใช้ | JP Visual & Docs',
  description: 'ติดตามแผนงาน เป้าหมาย และผลการดำเนินงานทั้งหมด',
  metadataBase: new URL('https://application-secret.vercel.app'),
  openGraph: {
    title: 'แดชบอร์ดผู้ใช้ | JP Visual & Docs',
    description: 'ติดตามแผนงาน เป้าหมาย และผลการดำเนินงานทั้งหมด',
    url: 'https://application-secret.vercel.app/user',
    images: [
      {
        url: '/images/og/user-dashboard.webp',
        alt: 'ภาพรวมแดชบอร์ดผู้ใช้',
        width: 1200,
        height: 630,
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'แดชบอร์ดผู้ใช้ | JP Visual & Docs',
    description: 'ติดตามแผนงาน เป้าหมาย และผลการดำเนินงานทั้งหมด',
    images: ['/images/og/user-dashboard.webp'],
    site: '@jpvisualdocs',
    creator: '@jpvisualdocs',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: 'https://application-secret.vercel.app/user',
    languages: {
      th: 'https://application-secret.vercel.app/th/user',
      en: 'https://application-secret.vercel.app/en/user',
    },
  },
};
