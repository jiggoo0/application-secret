/** @format */
import React from "react"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import {
  ShieldCheck,
  ArrowUpRight,
  Facebook,
  MessageCircle,
  Mail,
  ShieldAlert,
} from "lucide-react"

/**
 * 🌐 Footer Component
 * แสดงข้อมูลแบรนด์, ลิงก์บริการ, ช่องทางติดต่อ และข้อกำหนดทางกฎหมาย
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: "Visa Application", href: "/visa" },
      { name: "Letter Service", href: "/letter-service" },
      { name: "Loan Documents", href: "/loan" },
      { name: "Translation", href: "/services" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Success Logs", href: "/reviews" },
      { name: "Contact", href: "/contact" },
      { name: "Sitemap", href: "/sitemap" },
    ],
  }

  return (
    <footer className="border-t border-slate-200 bg-white pb-12 pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* 1. BRAND_IDENTITY_SECTION */}
          <div className="lg:col-span-5">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-white shadow-lg shadow-slate-200">
                <ShieldCheck size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black uppercase tracking-tighter text-slate-900">
                  JP VISUAL<span className="text-blue-600">.</span>DOCS
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">
                  Documentation_Specialist
                </span>
              </div>
            </div>
            <p className="max-w-sm text-sm font-bold leading-relaxed text-slate-500">
              ยกระดับมาตรฐานการจัดการเอกสารด้วยระบบที่มีความแม่นยำสูง
              ออกแบบโครงสร้างข้อมูลเพื่อสร้างความน่าเชื่อถือในระดับสากล
              เหมาะสำหรับธุรกรรมสำคัญและวีซ่าทั่วโลก
            </p>

            {/* SOCIAL_CHANNELS */}
            <div className="mt-8 flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-400 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                title="Follow our Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={siteConfig.social.line}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-400 transition-all hover:border-[#00B900] hover:bg-[#00B900] hover:text-white"
                title="Add Line Official"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-400 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                title="Send us an Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* 2. SITEMAP_GRID */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:pt-2">
            <div>
              <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
                Solutions_Index
              </h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-[11px] font-bold uppercase text-slate-500 transition-colors hover:text-blue-600"
                    >
                      <div className="h-1 w-1 bg-slate-200 group-hover:bg-blue-600" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
                Corporate_Portal
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-[11px] font-bold uppercase text-slate-500 transition-colors hover:text-blue-600"
                    >
                      <div className="h-1 w-1 bg-slate-200 group-hover:bg-blue-600" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. CONTACT_EXPERT_CTA */}
          <div className="lg:col-span-3">
            <div className="border border-slate-900 bg-slate-900 p-10 text-white shadow-xl">
              <span className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">
                <ShieldAlert size={12} /> Ready_To_Proceed?
              </span>
              <p className="mb-8 text-xs font-bold uppercase leading-relaxed text-slate-400">
                ส่งข้อมูลให้ทีมสถาปนิกเอกสารประเมินเบื้องต้นได้ทันทีผ่านระบบออนไลน์
              </p>
              <Link
                href="/contact"
                className="group flex items-center justify-between border-b border-blue-500 pb-2 text-sm font-black uppercase tracking-widest transition-all"
              >
                Start_Inquiry
                <ArrowUpRight
                  size={18}
                  className="text-blue-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. LEGAL_BAR */}
        <div className="mt-24 flex flex-col items-center justify-between border-t border-slate-100 pt-10 md:flex-row">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
              © {currentYear} {siteConfig.name}. All Systems Functional.
            </p>
            <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
              Authorized by เจ้าป่า | Professional documentation architecture
            </p>
          </div>
          <div className="mt-8 flex gap-8 md:mt-0">
            <Link
              href="#"
              className="text-[9px] font-black uppercase tracking-ultra text-slate-300 transition-colors hover:text-blue-600"
            >
              Privacy_Protocol
            </Link>
            <Link
              href="#"
              className="text-[9px] font-black uppercase tracking-ultra text-slate-300 transition-colors hover:text-blue-600"
            >
              SLA_Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
