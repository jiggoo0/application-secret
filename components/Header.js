'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import MobileMenu from './MobileMenu';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { label: 'บริการ', href: '#services' },
    { label: 'เกี่ยวกับเรา', href: '#about' },
    { label: 'รีวิว', href: '#reviews' },
    { label: 'บทความ', href: '#blog' },
    { label: 'ประเมิน DTI', href: '/dti' },
  ];

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    const updateHash = () => setActiveHash(window.location.hash || '');
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      setActiveHash(window.location.hash || '');
    }
  }, [pathname]);

  const toggleTheme = () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('ออกจากระบบเรียบร้อย');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-colors dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="กลับสู่หน้าแรก">
          <Image
            src="/logo.webp"
            alt="โลโก้ JP Visual & Docs"
            width={40}
            height={40}
            priority
            className="rounded-md"
          />
          <span className="font-heading text-xl text-primary">JP Visual & Docs</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="เมนูหลัก">
          {navLinks.map(({ label, href }) => {
            const isHash = href.startsWith('#');
            const isActive = isHash ? activeHash === href : pathname === href;
            const base =
              'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-sm';
            const linkClass = `${base} ${
              isActive
                ? 'text-primary font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:text-primary'
            }`;

            return (
              <li key={href}>
                {isHash ? (
                  <a href={href} className={linkClass}>
                    {label}
                  </a>
                ) : (
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                )}
              </li>
            );
          })}

          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="outline" className="ml-4">
              ออกจากระบบ
            </Button>
          ) : (
            <Button asChild className="ml-4">
              <Link href="/login">เข้าสู่ระบบ</Link>
            </Button>
          )}

          {mounted && (
            <button
              onClick={toggleTheme}
              className="ml-2 text-sm text-gray-500 transition hover:text-primary"
            >
              {resolvedTheme === 'light' ? '🌙 กลางคืน' : '☀️ กลางวัน'}
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-gray-600 dark:text-gray-300 md:hidden"
          aria-label="เปิด/ปิดเมนูมือถือ"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
