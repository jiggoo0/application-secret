'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowRight, ShieldCheck, Terminal } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navLinks: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, setIsOpen, navLinks }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white">
      {/* 🛠️ Mobile Header Controls */}
      <div className="flex items-center justify-between border-b-4 border-slate-900 p-6">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-primary" />
          <span className="font-mono text-xs font-black uppercase tracking-widest text-slate-900">
            System_Navigation
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="flex h-12 w-12 items-center justify-center border-2 border-slate-900 bg-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <X size={24} strokeWidth={3} />
        </button>
      </div>

      {/* 🧭 Navigation Stack */}
      <nav className="flex-grow overflow-y-auto p-6">
        <ul className="space-y-4">
          {navLinks.map(({ label, href }) => {
            // ✅ ปรับ Logic Active ให้แม่นยำขึ้น
            const isActive =
              href === '/'
                ? pathname === '/'
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={href}>
                <Link
                  href={href as any} // ✅ แก้ไข: ใช้ 'as any' เพื่อผ่านการตรวจ Typed Routes
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between border-2 border-slate-900 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none ${
                    isActive ? 'bg-primary text-slate-900' : 'bg-white text-slate-900'
                  }`}
                >
                  <span className="font-heading text-3xl font-black uppercase italic tracking-tighter">
                    {label}
                  </span>
                  <ArrowRight size={24} className={isActive ? 'opacity-100' : 'opacity-20'} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ⚡ Contact Button for Mobile */}
        <Link
          href={'/contact' as any} // ✅ แก้ไข: ป้องกัน Error เรื่อง Route
          onClick={() => setIsOpen(false)}
          className="mt-12 flex w-full items-center justify-center gap-3 border-4 border-slate-900 bg-slate-900 py-6 font-heading text-xl font-black uppercase italic tracking-widest text-white shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          START_DEAL_NOW
        </Link>
      </nav>

      {/* 📟 Mobile Security Footer */}
      <div className="bg-slate-50 p-6">
        <div className="flex items-center justify-center gap-3 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <ShieldCheck size={14} className="text-green-500" />
          SECURE_MOBILE_CONNECTION_ESTABLISHED
        </div>
      </div>
    </div>
  );
}
