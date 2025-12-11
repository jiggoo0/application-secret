// lib/fonts.js
import { Inter, Roboto, Sarabun } from 'next/font/google';

/**
 * 🌐 Global Fonts
 * - Inter: Modern Sans Serif สำหรับ UI / body text
 * - Roboto: Fallback / alternative
 * - Sarabun: ภาษาไทย
 */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['400', '700'],
  variable: '--font-sarabun',
  display: 'swap',
});
