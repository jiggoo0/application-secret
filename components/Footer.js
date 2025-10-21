'use client';

import Image from 'next/image';
import { FaLine, FaEnvelope, FaFacebook, FaFacebookMessenger } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
      uri: 'mailto:Jp-visoul-doce@export.com',
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

  return (
    <footer
      className="bg-blue-900 text-white dark:bg-blue-950 dark:text-blue-100"
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
          />
          <div className="text-center md:text-left">
            <h2 id="footer-heading" className="text-lg font-bold">
              JP Visual & Docs
            </h2>
            <p className="mt-1 text-sm text-blue-200 dark:text-blue-300">
              © {currentYear} JP Visual & Docs. All rights reserved.
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <nav aria-label="ลิงก์ท้ายเว็บไซต์">
          <ul className="flex flex-col items-center gap-3 text-sm md:flex-row md:items-center md:gap-6">
            <li>
              <a
                href="/privacy"
                className="rounded transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-white"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="rounded transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Social Links */}
      <address className="border-t border-blue-800 px-6 py-4 not-italic" aria-label="ช่องทางติดต่อ">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {socialLinks.map(({ type, label, uri, icon: Icon }) => (
            <li key={type}>
              <a
                href={uri}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white transition-colors hover:text-yellow-400 dark:hover:text-yellow-300"
                aria-label={`ติดต่อผ่าน ${label}`}
              >
                <Icon className="text-lg" />
                <span className="text-sm">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </address>

      {/* Footer Note */}
      <div className="border-t border-blue-800 px-6 py-2 text-center text-xs text-blue-300 dark:text-blue-400">
        Designed & Developed by JP Visual & Docs
      </div>
    </footer>
  );
}
