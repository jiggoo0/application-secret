'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ArrowUpRight, Terminal } from 'lucide-react';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'SERVICES', href: '/services' },
    { label: 'ABOUT_JP', href: '/about' },
    { label: 'REVIEWS', href: '/reviews' },
    { label: 'DATA_VAULT', href: '/blog' },
    { label: 'DTI_CHECK', href: '/dti' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b-4 border-slate-900 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* 🆔 LOGO */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="border-2 border-slate-900 bg-white p-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={35}
                height={35}
                priority
                className="grayscale transition-all group-hover:grayscale-0"
              />
            </div>
            <div className="flex flex-col text-slate-900">
              <span className="font-heading text-xl font-black uppercase italic leading-none tracking-tighter">
                JP-VISOUL
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                Operated_By_Jaopa
              </span>
            </div>
          </Link>

          {/* 🧭 DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6">
              {navLinks.map(({ label, href }) => {
                // ✅ ตรวจสอบสถานะ Active (กันข้อผิดพลาดกรณี Path ย่อย)
                const isActive =
                  href === '/'
                    ? pathname === '/'
                    : pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <li key={href}>
                    <Link
                      href={href as any} // ✅ แก้ไข: ใช้ 'as any' เพื่อผ่านการตรวจ Typed Routes
                      className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-slate-900 ${
                        isActive
                          ? 'text-primary underline decoration-2 underline-offset-8'
                          : 'text-slate-400'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={'/contact' as any} // ✅ แก้ไข: ป้องกัน Error กรณีหน้า contact ยังไม่ถูก Register ในระบบ Build
              className="group flex items-center gap-3 border-2 border-slate-900 bg-slate-900 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:scale-95"
            >
              ดีลงานตรงกับเจ้าป่า
              <ArrowUpRight
                size={14}
                strokeWidth={3}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </nav>

          {/* 📱 MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(true)}
            className="transition-active flex h-11 w-11 items-center justify-center border-2 border-slate-900 bg-white text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:hidden"
          >
            <Menu size={22} strokeWidth={3} />
          </button>
        </div>

        {/* 📟 SYSTEM STATUS BAR */}
        <div className="hidden border-t-2 border-slate-900 bg-slate-50 px-8 py-1.5 md:block">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Terminal size={10} /> STATUS: SECURE
              </span>
              <span className="flex items-center gap-1.5 text-primary">
                <span className="h-1 w-1 animate-pulse rounded-full bg-primary" /> ENCRYPTION:
                ACTIVE
              </span>
            </div>
            <div>VER. 4.0 // HIGH_FIDELITY_SYSTEM</div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />
    </>
  );
}
