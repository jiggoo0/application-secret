/** @format */

import React from 'react'
import Link from 'next/link'
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Facebook,
  Globe,
  ShieldCheck,
  Activity,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { navigationConfig } from '@/config/navigation'

/**
 * 🛰️ COMPONENT: Footer
 * Refactored for Unified Inquiry System (v3.3.0)
 * ✅ FIXED: TypeScript Type-check mismatch (href comparison)
 * ✅ FIXED: ESLint unused variable (cn)
 * ✅ IMPROVED: Text Contrast for High-Visibility
 */
export function Footer() {
  /**
   * 🛡️ SAFE_FILTER: กรองเมนูโดยใช้การหลีกเลี่ยง Type Error
   * ใช้การ cast เป็น unknown ก่อนเพื่อป้องกัน TS แจ้งเตือนเรื่อง No Overlap
   */
  const filteredNav = navigationConfig.mainNav.filter(
    (item) => (item.href as unknown as string) !== '/assessment',
  )

  return (
    <footer className="relative overflow-hidden border-t-2 border-[#020617] bg-[#020617]">
      {/* 🧩 UI_DECOR: Blueprint Grid Pattern - ปรับ Opacity ให้จางลงเพื่อไม่กวนตัวหนังสือ */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* --- MAIN_FOOTER_CONTENT --- */}
        <div className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-12">
          {/* 🏛️ COLUMN_1: IDENTITY_BASE */}
          <div className="space-y-8 lg:col-span-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-[#FCDE09] shadow-sharp-brand transition-transform hover:rotate-90">
                <Globe size={26} className="text-[#020617]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black uppercase italic leading-none tracking-tighter text-white">
                  JP Visual<span className="text-[#FCDE09]">.Docs</span>
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <Activity size={10} className="text-[#FCDE09]" />
                  <span className="font-mono text-[7px] font-black uppercase tracking-[0.4em] text-slate-400">
                    UNIFIED_DOCUMENT_SYSTEM
                  </span>
                </div>
              </div>
            </div>
            {/* ปรับสีจาก slate-400 -> slate-300 ให้อ่านง่ายขึ้น */}
            <p className="max-w-xs font-thai text-sm font-bold leading-relaxed text-slate-300">
              ยกระดับมาตรฐานการจัดการเอกสารและวีซ่า ด้วยระบบวิเคราะห์โปรไฟล์เชิงลึก (Case Analysis)
              เพื่อให้คุณได้รับโอกาสสำเร็จสูงสุดในทุกเป้าหมาย
            </p>
            <div className="flex gap-2">
              <SocialIcon href={siteConfig.social.facebook} icon={<Facebook size={18} />} />
              <SocialIcon href={siteConfig.social.line} icon={<MessageSquare size={18} />} />
            </div>
          </div>

          {/* 🗂️ COLUMN_2: REGISTRY_INDEX */}
          <div className="space-y-6 lg:col-span-2">
            <span className="block border-l-4 border-[#FCDE09] pl-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
              INDEX
            </span>
            {/* ปรับสีเมนูจาก slate-400 -> slate-200 เพื่อความคมชัดสูงสุด */}
            <ul className="space-y-4 font-mono text-[10px] font-black uppercase tracking-widest text-slate-200">
              {filteredNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 transition-colors hover:text-[#FCDE09]"
                  >
                    <span className="text-slate-700 transition-colors group-hover:text-[#FCDE09]">
                      {'>'}
                    </span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🛠️ COLUMN_3: UNIFIED_CONTACT_INTERFACE */}
          <div className="grid grid-cols-1 gap-px border border-slate-800 bg-slate-800 shadow-[10px_10px_0px_0px_#000] md:grid-cols-2 lg:col-span-6">
            <div className="group bg-[#020617] p-8 transition-all hover:bg-slate-900/40">
              <div className="mb-6 flex items-center gap-3">
                <Activity size={14} className="text-[#FCDE09]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  INQUIRY_PORTAL
                </span>
              </div>
              <p className="mb-8 text-2xl font-black uppercase italic tracking-tight text-white transition-colors group-hover:text-[#FCDE09]">
                {siteConfig.contact.lineId}
              </p>
              <Link
                href="/contact"
                className="inline-flex border-2 border-[#FCDE09] bg-[#FCDE09] px-6 py-3 text-[9px] font-black uppercase tracking-widest text-[#020617] transition-all hover:bg-transparent hover:text-[#FCDE09] active:scale-95"
              >
                ส่งข้อมูลประเมินโปรไฟล์
              </Link>
            </div>

            <div className="group bg-[#020617] p-8 transition-all hover:bg-slate-900/40">
              <div className="mb-6 flex items-center gap-3">
                <Mail size={14} className="text-[#FCDE09]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  OFFICIAL_SESSION
                </span>
              </div>
              <p className="mb-2 truncate text-xl font-black uppercase italic text-white transition-colors group-hover:text-[#FCDE09]">
                {siteConfig.contact.email}
              </p>
              <div className="h-1 w-12 bg-[#FCDE09] transition-all duration-500 group-hover:w-full" />
            </div>

            <div className="flex flex-col items-start justify-between gap-6 border-t border-slate-800 bg-[#020617] p-6 md:col-span-2 md:flex-row md:items-center">
              <div className="flex items-center gap-4 text-slate-200">
                <div className="flex h-10 w-10 items-center justify-center border border-slate-800 bg-slate-900">
                  <MapPin size={16} className="text-[#FCDE09]" />
                </div>
                <span className="max-w-[200px] font-thai text-[11px] font-bold leading-snug">
                  {siteConfig.contact.address}
                </span>
              </div>
              <div className="group flex items-center gap-4 text-white">
                <div className="flex h-10 w-10 items-center justify-center bg-slate-800 transition-colors group-hover:bg-[#FCDE09]">
                  <Phone size={16} className="text-[#FCDE09] group-hover:text-[#020617]" />
                </div>
                <span className="font-mono text-lg font-black tracking-tighter">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SYSTEM_FOOTNOTE_TERMINAL --- */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-slate-800 py-12 md:flex-row">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
              {'© 2025 // JP_VISUAL_DOCS_MANAGEMENT'}
            </span>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[8px] font-black uppercase tracking-widest text-slate-600">
              <span className="text-slate-400">CREATED_BY_เจ้าป่า_AND_TEAM</span>
              <span className="h-2 w-[1px] bg-slate-800" />
              <span>OWNED_BY_JP-VISOUL-DOCS</span>
              <span className="h-2 w-[1px] bg-slate-800" />
              <span className="text-brand">VER_3.3.0_UNIFIED</span>
            </div>
          </div>

          <div className="flex items-center gap-10 font-mono text-[9px] font-black uppercase text-slate-400">
            <Link href="/privacy" className="transition-colors hover:text-[#FCDE09]">
              Privacy_Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#FCDE09]">
              Terms_Of_Service
            </Link>

            <div className="hidden items-center gap-4 border border-slate-800 bg-slate-900/50 px-5 py-2 sm:flex">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FCDE09]" />
              <span className="font-thai font-bold italic tracking-tighter text-slate-200">
                ที่ปรึกษาออนไลน์
              </span>
              <ShieldCheck size={14} className="text-[#FCDE09]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center border border-slate-800 bg-slate-900/20 text-slate-400 transition-all hover:border-[#FCDE09] hover:bg-[#FCDE09]/5 hover:text-[#FCDE09]"
    >
      {icon}
    </a>
  )
}
