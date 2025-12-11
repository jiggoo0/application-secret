// components/layout/Header.js
'use client';

// 1. React/Next.js Hooks & Libs
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

// 2. Project Components & Utilities (Absolute Imports)
import { Button } from '@/components/ui/button';
import MobileMenu from '@/components/layout/MobileMenu';
import { cn } from '@/lib/utils';

// 3. External Icons
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState('');
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // 💡 Note: isLoggedIn should ideally be managed globally (Context/Redux/etc.)
  // or fetched via a custom hook (e.g., useAuth)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    // Hash links point to sections on the homepage (pathname === '/')
    { label: 'บริการ', href: '#services', requiresHome: true },
    { label: 'เกี่ยวกับเรา', href: '#about', requiresHome: true },
    { label: 'รีวิว', href: '#reviews', requiresHome: true },
    { label: 'บทความ', href: '#blog', requiresHome: true },
    // Absolute link
    { label: 'ประเมิน DTI', href: '/dti', requiresHome: false },
  ];

  // --- Side Effects ---

  // 1. Mount State for Theme Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Hash Change Listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHash = () => {
      // Get hash but ensure it's a non-empty string for comparison
      const hash = window.location.hash;
      setActiveHash(hash.startsWith('#') ? hash : '');
    };

    updateHash();
    window.addEventListener('hashchange', updateHash);

    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  // 3. Close Menu/Update Hash when path changes
  useEffect(() => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      // Update hash immediately upon path change if needed
      setActiveHash(window.location.hash || '');
    }
  }, [pathname]);

  // --- Handlers ---

  const toggleTheme = useCallback(
    () => setTheme(resolvedTheme === 'light' ? 'dark' : 'light'),
    [resolvedTheme, setTheme],
  );

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    // 💡 Add actual sign-out logic here (e.g., Supabase, localStorage clear)
    console.log('ออกจากระบบเรียบร้อย');
  }, []);

  // Define base classes for navigation links
  const getLinkClasses = (isActive) =>
    cn(
      'transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary',
    );

  return (
    // ✅ FIX: เปลี่ยนเป็น Single Quote
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-sm transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        {/* ✅ FIX: เปลี่ยนเป็น Single Quote */}
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

        {/* Desktop Navigation */}
        {/* 💡 FIX: Using ul/li structure for semantic correctness */}
        <nav className="hidden md:flex" aria-label="เมนูหลัก">
          <ul className="m-0 flex list-none items-center gap-6 p-0">
            {navLinks.map(({ label, href, requiresHome }) => {
              const isHashLink = href.startsWith('#');

              // A link is active if:
              // 1. It's a hash link AND we are on the homepage AND the hash matches.
              // 2. It's an absolute link AND the pathname matches the href.
              const isActive = isHashLink
                ? pathname === '/' && activeHash === href
                : pathname === href;

              const linkClass = getLinkClasses(isActive);

              return (
                <li key={href}>
                  {/* For hash links, use simple <a> tag to prevent full page reload */}
                  {isHashLink && requiresHome && pathname !== '/' ? (
                    // 💡 Handling Hash Link outside of Homepage: Redirects to homepage#hash
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

          {/* Action Buttons & Theme Toggle */}
          <div className="ml-4 flex items-center space-x-2">
            {isLoggedIn ? (
              // ✅ FIX: เปลี่ยนเป็น Single Quote
              <Button onClick={handleLogout} variant="outline">
                ออกจากระบบ
              </Button>
            ) : (
              // ✅ FIX: เปลี่ยนเป็น Single Quote
              <Button asChild>
                <Link href="/login">เข้าสู่ระบบ</Link>
              </Button>
            )}

            {mounted && (
              // ✅ FIX: เปลี่ยนเป็น Single Quote
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

        {/* Mobile Menu Button */}
        {/* ✅ FIX: เปลี่ยนเป็น Single Quote */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-muted-foreground md:hidden"
          aria-label="เปิด/ปิดเมนูมือถือ"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        mounted={mounted}
        resolvedTheme={resolvedTheme}
        toggleTheme={toggleTheme}
        // Assuming MobileMenu needs the current state for hash handling
        pathname={pathname}
        activeHash={activeHash}
      />
    </header>
  );
}
