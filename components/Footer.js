'use client';

import Image from 'next/image';
import { FaLine, FaEnvelope, FaFacebook, FaFacebookMessenger } from 'react-icons/fa';

const socialLinks = [
  {
    type: 'line',
    label: 'Line',
    uri: 'https://lin.ee/G8s8rKp',
    icon: FaLine,
  },
  {
    type: 'email',
    label: 'Email',
    uri: 'mailto:application-secret@zohomail.com',
    icon: FaEnvelope,
  },
  {
    type: 'facebook',
    label: 'Facebook',
    uri: 'https://www.facebook.com/profile.php?id=61573307616115&mibextid=ZbWKwL',
    icon: FaFacebook,
  },
  {
    type: 'messenger',
    label: 'Messenger',
    uri: 'https://m.me/61573307616115?hash=AbZf0L5cSZ8XvIYw&source=qr_link_share',
    icon: FaFacebookMessenger,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-background text-muted-foreground"
      aria-labelledby="footer-heading"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-6 py-8 md:flex md:items-center md:justify-between">
        {/* Brand / Logo / Copyright */}
        <div className="mb-6 flex flex-col items-center md:mb-0 md:flex-row md:items-center md:gap-4">
          <Image
            src="/logo.webp"
            alt="โลโก้ JP Visual & Docs"
            width={40}
            height={40}
            priority
            className="rounded-md"
            onError={(e) => {
              const target = e.target;
              if (target instanceof HTMLImageElement) {
                target.src = '/fallback-logo.png';
              }
            }}
          />
          <div className="text-center md:text-left">
            <h2 id="footer-heading" className="text-lg font-semibold text-foreground">
              JP Visual & Docs
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              © {currentYear} JP Visual & Docs. All rights reserved.
              <span className="sr-only">ปีปัจจุบันคือ {currentYear}</span>
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <nav aria-label="ลิงก์ท้ายเว็บไซต์">
          <ul className="flex flex-col items-center gap-3 text-sm md:flex-row md:items-center md:gap-6">
            <li>
              <a
                href="/privacy"
                className="rounded text-foreground transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="rounded text-foreground transition hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Social Links */}
      <address className="border-t border-border px-6 py-4 not-italic" aria-label="ช่องทางติดต่อ">
        <ul
          className="flex flex-wrap items-center justify-center gap-6"
          aria-label="ลิงก์โซเชียลมีเดีย"
        >
          {socialLinks.map(({ type, label, uri, icon: Icon }) => (
            <li key={type}>
              <a
                href={uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground transition hover:text-primary"
                aria-label={`ติดต่อผ่าน ${label}`}
              >
                <Icon className="text-lg" aria-hidden="true" />
                <span className="text-sm">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </address>

      {/* Footer Note */}
      <div className="border-t border-border px-6 py-2 text-center text-xs text-muted-foreground">
        Designed & Developed by JP Visual & Docs
      </div>
    </footer>
  );
}
