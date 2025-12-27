/** @format */
"use client"

import React from "react"
import {
  ShieldCheck,
  Zap,
  ShieldAlert,
  Facebook,
  MessageCircle,
  Mail,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { navigationConfig } from "@/config/navigation"

/**
 * 🌐 Footer Component (Protocol_Footer)
 * Resolved Error: react/jsx-no-comment-textnodes
 * Resolved Warning: Unused Variables & Path Alignment
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { footerNav } = navigationConfig

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white pb-12 pt-24">
      {/* 🧩 BACKGROUND_DECORATIVE_PATTERN */}
      <div className="absolute right-0 top-0 -z-10 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-slate-50 opacity-50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* 1. BRAND_IDENTITY_SECTION */}
          <div className="lg:col-span-5">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center bg-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
                <ShieldCheck size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black uppercase tracking-tighter text-slate-900">
                  JP VISUAL<span className="text-blue-600">.</span>DOCS
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Document_Architecture_Bureau
                  </span>
                  <Zap size={10} className="fill-blue-500 text-blue-500" />
                </div>
              </div>
            </div>
            <p className="max-w-sm text-sm font-bold italic leading-relaxed text-slate-500">
              &quot;เปลี่ยนความซับซ้อนของเอกสารให้เป็นระบบที่ทรงพลัง&quot;{" "}
              <br />
              เราออกแบบโครงสร้างข้อมูลเพื่อสร้างความน่าเชื่อถือขั้นสูงสุด
              จัดการเงื่อนไขที่ยากด้วยพิมพ์เขียวเชิงกลยุทธ์โดย
              &quot;เจ้าป่า&quot;
            </p>

            {/* 🔗 SOCIAL_CHANNELS_PROTOCOL */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href={siteConfig.social?.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center border-2 border-slate-900 text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
                title="Facebook_Registry"
              >
                <Facebook size={18} />
              </a>
              <a
                href={siteConfig.social?.line || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center border-2 border-slate-900 text-slate-900 transition-all hover:border-[#00B900] hover:bg-[#00B900] hover:text-white"
                title="Line_Direct_Protocol"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="flex h-11 w-11 items-center justify-center border-2 border-slate-900 text-slate-900 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                title="Email_Transmission"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* 2. SITEMAP_GRID_REGISTRY */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:pt-2">
            <div>
              <h4 className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">
                <div className="h-2 w-2 bg-blue-600" /> Solutions_Index
              </h4>
              <ul className="space-y-4">
                {footerNav.solutions.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-[11px] font-black uppercase text-slate-400 transition-colors hover:text-blue-600"
                    >
                      <span className="text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                        »
                      </span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">
                <div className="h-2 w-2 bg-slate-400" /> Corporate_Log
              </h4>
              <ul className="space-y-4">
                {footerNav.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-[11px] font-black uppercase text-slate-400 transition-colors hover:text-slate-900"
                    >
                      <span className="text-slate-900 opacity-0 transition-opacity group-hover:opacity-100">
                        »
                      </span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. CONTACT_EXPERT_CTA (The Black Box) */}
          <div className="lg:col-span-3">
            <div className="group relative overflow-hidden bg-slate-900 p-8 text-white shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
              <div className="absolute right-0 top-0 p-2 opacity-10 transition-opacity group-hover:opacity-20">
                <ShieldAlert size={80} />
              </div>
              <span className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">
                <Zap size={10} fill="currentColor" /> Ready_To_Execute?
              </span>
              <p className="relative z-10 mb-8 text-[11px] font-bold uppercase leading-relaxed text-slate-400">
                ส่งเคสของคุณให้ทีม &quot;เจ้าป่า&quot;
                ประเมินโครงสร้างเอกสารเบื้องต้นได้ทันที
              </p>
              <Link
                href="/contact"
                className="group flex items-center justify-between border-b-2 border-blue-600 pb-2 text-xs font-black uppercase tracking-[0.2em] transition-all hover:border-white"
              >
                Start_Inquiry_Protocol
                <ArrowUpRight
                  size={16}
                  className="text-blue-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. LEGAL_BAR_PROTOCOL */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-10 md:flex-row">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
              {`© ${currentYear} ${siteConfig.name}`}
              <span className="mx-2 text-blue-600">|</span>
              {`v${siteConfig.system.version}`}
            </p>
            <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
              {`AUTHORIZED BY ${siteConfig.author.name.toUpperCase()} // DOCUMENT_ARCHITECT`}
            </p>
          </div>

          <div className="flex items-center gap-8">
            {footerNav.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[9px] font-black uppercase tracking-widest text-slate-300 transition-colors hover:text-blue-600"
              >
                {link.name.replace(/ /g, "_")}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
