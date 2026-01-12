/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.758Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: Footer          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */

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
 * FOOTER — JP_VISUALDOCS
 * ---------------------------------------------------------------
 * - ปรับแก้ TypeScript ให้ผ่าน TS2367
 * - คุมโทน Industrial / High-Contrast
 * - โครงสร้างชัด อ่านง่าย ดูแลต่อได้
 */
export function Footer() {
  const navItems = navigationConfig.mainNav // ไม่ต้อง filter '/assessment' อีกต่อไป

  return (
    <footer className="relative overflow-hidden border-t-2 border-[#020617] bg-[#020617]">
      {/* GRID BACKDROP */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        {/* MAIN */}
        <div className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-12">
          {/* BRAND */}
          <div className="space-y-8 lg:col-span-4">
            <div className="flex items-center gap-4">
              <div className="shadow-sharp-brand flex h-12 w-12 items-center justify-center bg-[#FCDE09] transition-transform hover:rotate-90">
                <Globe size={26} className="text-[#020617]" />
              </div>
              <div>
                <span className="block text-2xl font-black uppercase italic leading-none tracking-tighter text-white">
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

            <p className="font-thai max-w-xs text-sm font-bold leading-relaxed text-slate-300">
              ช่วยจัดการงานเอกสารและวีซ่าแบบวิเคราะห์รายเคส เพื่อให้คุณเตรียมข้อมูลได้ถูกต้อง
              ลดความเสี่ยงก่อนยื่นจริง
            </p>

            <div className="flex gap-2">
              <SocialIcon href={siteConfig.social.facebook}>
                <Facebook size={18} />
              </SocialIcon>
              <SocialIcon href={siteConfig.social.line}>
                <MessageSquare size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* NAV */}
          <div className="space-y-6 lg:col-span-2">
            <span className="block border-l-4 border-[#FCDE09] pl-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
              INDEX
            </span>
            <ul className="space-y-4 font-mono text-[10px] font-black uppercase tracking-widest text-slate-200">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 transition-colors hover:text-[#FCDE09]"
                  >
                    <span className="text-slate-700 group-hover:text-[#FCDE09]">{'>'}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT GRID */}
          <div className="grid grid-cols-1 gap-px border border-slate-800 bg-slate-800 shadow-[10px_10px_0px_0px_#000] md:grid-cols-2 lg:col-span-6">
            {/* LINE */}
            <div className="group bg-[#020617] p-8 transition-colors hover:bg-slate-900/40">
              <div className="mb-6 flex items-center gap-3">
                <Activity size={14} className="text-[#FCDE09]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  INQUIRY_PORTAL
                </span>
              </div>
              <p className="mb-8 text-2xl font-black uppercase italic tracking-tight text-white group-hover:text-[#FCDE09]">
                {siteConfig.contact.lineId}
              </p>
              <Link
                href="/contact"
                className="inline-flex border-2 border-[#FCDE09] bg-[#FCDE09] px-6 py-3 text-[9px] font-black uppercase tracking-widest text-[#020617] transition-all hover:bg-transparent hover:text-[#FCDE09] active:scale-95"
              >
                คุยงาน / ส่งข้อมูลประเมิน
              </Link>
            </div>

            {/* EMAIL */}
            <div className="group bg-[#020617] p-8 transition-colors hover:bg-slate-900/40">
              <div className="mb-6 flex items-center gap-3">
                <Mail size={14} className="text-[#FCDE09]" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  OFFICIAL_SESSION
                </span>
              </div>
              <p className="mb-2 truncate text-xl font-black uppercase italic text-white group-hover:text-[#FCDE09]">
                {siteConfig.contact.email}
              </p>
              <div className="h-1 w-12 bg-[#FCDE09] transition-all duration-500 group-hover:w-full" />
            </div>

            {/* ADDRESS + PHONE */}
            <div className="flex flex-col items-start justify-between gap-6 border-t border-slate-800 bg-[#020617] p-6 md:col-span-2 md:flex-row md:items-center">
              <div className="flex items-center gap-4 text-slate-200">
                <div className="flex h-10 w-10 items-center justify-center border border-slate-800 bg-slate-900">
                  <MapPin size={16} className="text-[#FCDE09]" />
                </div>
                <span className="font-thai max-w-[200px] text-[11px] font-bold leading-snug">
                  {siteConfig.contact.address}
                </span>
              </div>

              <div className="group flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-slate-800 transition-colors group-hover:bg-[#FCDE09]">
                  <Phone size={16} className="text-[#FCDE09] group-hover:text-[#020617]" />
                </div>
                <span className="font-mono text-lg font-black tracking-tighter text-white">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-slate-800 py-12 md:flex-row">
          <div className="space-y-1">
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
              © 2025 // JP_VISUAL_DOCS_MANAGEMENT
            </span>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[8px] font-black uppercase tracking-widest text-slate-600">
              <span className="text-slate-400">ดูแลโดย เจ้าป่า และทีมงาน</span>
              <span className="h-2 w-px bg-slate-800" />
              <span>OWNED_BY_JP-VISOUL-DOCS</span>
              <span className="h-2 w-px bg-slate-800" />
              <span className="text-brand">VER_3.3.0_UNIFIED</span>
            </div>
          </div>

          <div className="flex items-center gap-10 font-mono text-[9px] font-black uppercase text-slate-400">
            <Link href="/privacy" className="hover:text-[#FCDE09]">
              Privacy_Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FCDE09]">
              Terms_Of_Service
            </Link>

            <div className="hidden items-center gap-4 border border-slate-800 bg-slate-900/50 px-5 py-2 sm:flex">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FCDE09]" />
              <span className="font-thai font-bold italic tracking-tighter text-slate-200">
                ปรึกษาผ่านช่องทางออนไลน์
              </span>
              <ShieldCheck size={14} className="text-[#FCDE09]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center border border-slate-800 bg-slate-900/20 text-slate-400 transition-all hover:border-[#FCDE09] hover:bg-[#FCDE09]/5 hover:text-[#FCDE09]"
    >
      {children}
    </a>
  )
}
