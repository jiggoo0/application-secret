'use client';

import Head from 'next/head';

export default function SEO({
  title = 'Application Secret',
  description = 'ทำธุรกิจสีเทาให้มีความมาตรฐานมืออาชีพ ยินดีร่วมงานทุกสายวงการ',
  keywords = 'ธุรกิจสีเทา, บริการ, ใบอนุญาต, ใบรับรอง, Supabase, Next.js',
  image = '/images/og-image.webp',
  url = 'https://application-secret.vercel.app',
}) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
}
