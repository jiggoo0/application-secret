'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import MobileMenu from '@/components/layout/MobileMenu';
import { cn } from '@/lib/utils';

import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const navLinks = [
    { label: 'บริการ', href: '#services', requiresHome: true },
    { label: 'เกี่ยวกับเรา', href: '#about', requiresHome: true },
    { label: 'รีวิว', href: '#reviews', requiresHome: true },
    { label: 'บทความ', href: '#blog', requiresHome: true },
    { label: 'ประเมิน DTI', href: '/dti', requiresHome: false },
  ];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHash = () => {
      const hash = window.location.hash;
      setActiveHash(hash.startsWith('#') ? hash : '');
    };

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

  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light'),
    [resolvedTheme, setTheme],
  );

  const getLinkClasses = (isActive) =>
    cn(
      'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary',
    );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="กลับสู่หน้าแรก">
          <Image
            src="/logo.webp"
            alt="โลโก้ JP Visual & Docs"
            width={40}
            height={40}
            priority
            className="rounded-md"
          />
          <span className="font-heading text-xl font-semibold text-primary">JP Visual & Docs</span>
        </Link>

        <nav className="hidden md:flex" aria-label="เมนูหลัก">
          <ul className="m-0 flex list-none items-center gap-6 p-0">
            {navLinks.map(({ label, href, requiresHome }) => {
              const isHashLink = href.startsWith('#');
              const isActive = isHashLink
                ? pathname === '/' && activeHash === href
                : pathname === href;

              const linkClass = getLinkClasses(isActive);

              return (
                <li key={href}>
                  {isHashLink && requiresHome && pathname !== '/' ? (
                    <Link href={`/${href}`} className={linkClass}>
                      {label}
                    </Link>
                  ) : (
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="ml-4 flex items-center space-x-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 text-muted-foreground transition hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`สลับไปเป็นธีม${resolvedTheme === 'light' ? 'มืด' : 'สว่าง'}`}
              >
                {resolvedTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            )}
          </div>
        </nav>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-muted-foreground md:hidden"
          aria-label="เปิด/ปิดเมนูมือถือ"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
        // login ถูกถอดออก จึงไม่ต้องส่ง prop
        isLoggedIn={false}
        handleLogout={() => {}}
        mounted={mounted}
        resolvedTheme={resolvedTheme}
        toggleTheme={toggleTheme}
        pathname={pathname}
        activeHash={activeHash}
      />
    </header>
  );
}
