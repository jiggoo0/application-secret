/** @format */
import React from "react"
import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Facebook,
  Globe,
  ShieldCheck,
} from "lucide-react"
import { siteConfig } from "@/config/site"
import { navigationConfig } from "@/config/navigation"
import { cn } from "@/lib/utils"

/**
 * 🛰️ COMPONENT: Footer
 * ส่วนท้ายของระบบ ออกแบบตามมาตรฐาน Industrial Sharp
 * แก้ไข: Syntax Error (jsx-no-comment-textnodes) และจัดระเบียบโค้ด
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-900 bg-slate-950">
      {/* 🧩 Blueprint Grid Decor */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.03]" />

      <div className="container relative z-10 mx-auto px-6">
        {/* --- MAIN_FOOTER_CONTENT --- */}
        <div className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-12">
          {/* 🏛️ COLUMN_1: IDENTITY_BASE */}
          <div className="space-y-8 lg:col-span-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-brand transition-transform hover:-rotate-12">
                <Globe size={26} className="text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black uppercase italic leading-none tracking-tighter text-white">
                  JP Visual<span className="text-brand">.Docs</span>
                </span>
                <span className="mt-1 font-mono text-[7px] font-black uppercase tracking-[0.4em] text-slate-500">
                  GLOBAL_DOCUMENT_ARCHITECT
                </span>
              </div>
            </div>
            <p className="max-w-xs font-thai text-sm leading-relaxed text-slate-500">
              ยกระดับการจัดการเอกสารและวีซ่าสู่มาตรฐานสูงสุด
              ด้วยระบบการวิเคราะห์เชิงเทคนิค (Technical Analysis)
              เพื่อความสำเร็จที่ตรวจสอบได้
            </p>
            <div className="flex gap-2">
              <SocialIcon
                href={siteConfig.social.facebook}
                icon={<Facebook size={18} />}
              />
              <SocialIcon
                href={siteConfig.social.line}
                icon={<MessageSquare size={18} />}
              />
            </div>
          </div>

          {/* 🗂️ COLUMN_2: REGISTRY_INDEX */}
          <div className="space-y-6 lg:col-span-2">
            <span className="block border-l-2 border-brand pl-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-brand">
              REGISTRY_INDEX
            </span>
            <ul className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-slate-400">
              {navigationConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <span className="text-slate-800 transition-colors group-hover:text-brand">
                      {"//"}
                    </span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 🛠️ COLUMN_3: CONTACT_NODES_INTERFACE */}
          <div className="grid grid-cols-1 gap-px border border-slate-900 bg-slate-900 shadow-sharp md:grid-cols-2 lg:col-span-6">
            {/* Communication Node */}
            <div className="group bg-slate-950 p-8 transition-all hover:bg-slate-900/40">
              <div className="mb-6 flex items-center gap-3">
                <MessageSquare size={14} className="text-brand" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  COMMUNICATION_LINK
                </span>
              </div>
              <p className="mb-8 text-2xl font-black italic tracking-tight text-white">
                {siteConfig.contact.lineId}
              </p>
              <a
                href={siteConfig.social.line}
                className="inline-flex border border-brand bg-brand px-6 py-3 text-[9px] font-black uppercase tracking-widest text-slate-950 transition-all hover:bg-transparent hover:text-brand active:scale-95"
              >
                ESTABLISH_CONNECTION
              </a>
            </div>

            {/* Inbox Node */}
            <div className="group bg-slate-950 p-8 transition-all hover:bg-slate-900/40">
              <div className="mb-6 flex items-center gap-3">
                <Mail size={14} className="text-slate-600" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-600">
                  SECURE_INBOX
                </span>
              </div>
              <p className="mb-2 truncate text-xl font-black italic text-white">
                {siteConfig.contact.email.toUpperCase()}
              </p>
              <div className="h-1 w-12 bg-brand transition-all duration-500 group-hover:w-full" />
            </div>

            {/* Address & Phone Bar */}
            <div className="flex flex-col items-start justify-between gap-6 border-t border-slate-900 bg-slate-950 p-6 md:col-span-2 md:flex-row md:items-center">
              <div className="flex items-center gap-4 text-slate-500">
                <div className="flex h-10 w-10 items-center justify-center border border-slate-800">
                  <MapPin size={16} className="text-brand" />
                </div>
                <span className="font-thai text-xs leading-snug">
                  {siteConfig.contact.address}
                </span>
              </div>
              <div className="group flex items-center gap-4 text-white">
                <div className="flex h-10 w-10 items-center justify-center bg-slate-900 transition-colors group-hover:bg-brand">
                  <Phone
                    size={16}
                    className="text-brand group-hover:text-slate-950"
                  />
                </div>
                <span className="font-mono text-lg font-black tracking-tighter">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SYSTEM_FOOTNOTE_TERMINAL --- */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-slate-900 py-12 md:flex-row">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">
              {/* ✅ FIXED: Corrected text node syntax to pass ESLint */}
              {"© 2025 JP_VISUAL_DOCS // ALL_RIGHTS_RESERVED"}
            </span>
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-slate-800">
              <span>{siteConfig.system.status}</span>
              <span className="h-2 w-[1px] bg-slate-800" />
              <span>VER_{siteConfig.system.version}</span>
            </div>
          </div>

          <div className="flex items-center gap-10 font-mono text-[9px] font-bold uppercase text-slate-500">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand"
            >
              PRIVACY_PROTOCOL
            </Link>
            <Link href="/terms" className="transition-colors hover:text-brand">
              SERVICE_AGREEMENT
            </Link>

            <div className="hidden items-center gap-4 border border-slate-800 bg-slate-900/50 px-5 py-2 sm:flex">
              <div
                className={cn(
                  "h-2 w-2",
                  siteConfig.system.indicatorColor === "bg-green-500"
                    ? "bg-brand"
                    : "bg-red-500",
                  "animate-pulse"
                )}
              />
              <span className="italic tracking-tighter text-slate-400">
                {siteConfig.system.label}
              </span>
              <ShieldCheck size={14} className="text-brand" />
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
      className="flex h-11 w-11 items-center justify-center border border-slate-800 bg-slate-900/50 text-slate-500 transition-all hover:border-brand hover:bg-brand/5 hover:text-brand"
    >
      {icon}
    </a>
  )
}
