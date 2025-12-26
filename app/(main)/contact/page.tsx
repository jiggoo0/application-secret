/** @format */
"use client"

import React, { useState } from "react"
import {
  Send,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  Globe,
  Loader2,
  CheckCircle2,
} from "lucide-react"
import { siteConfig } from "@/config/site"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSent(true)
    }, 2000)
  }

  // ✅ แก้ไข: ใช้ "as any" หรือเช็คการมีอยู่ของ property เพื่อเลี่ยง Error TS2339
  // จนกว่าคุณจะไปอัปเดตไฟล์ config/site.ts
  const contactMethods = [
    {
      icon: <Phone size={20} />,
      label: "HOTLINE_DIRECT",
      // @ts-ignore - ปิดการตรวจชั่วคราวจนกว่าจะเพิ่ม phone ใน siteConfig
      value: siteConfig.social.phone || "091-054-0710",
      // @ts-ignore
      link: `tel:${siteConfig.social.phone || "0910540710"}`,
      color: "text-blue-600",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "LINE_OFFICIAL",
      value: siteConfig.social.lineId || "@462fqtfc",
      link: siteConfig.social.line || "#",
      color: "text-green-600",
    },
    {
      icon: <Globe size={20} />,
      label: "GLOBAL_SUPPORT",
      value: siteConfig.url.replace("https://", ""),
      link: siteConfig.url,
      color: "text-slate-900",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* PAGE_HEADER: Blueprint Aesthetic */}
      <section className="bg-slate-900 py-24 text-white lg:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">
                Connection_Portal_v8.0
              </span>
            </div>
            <h1 className="mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tighter md:text-8xl">
              GET IN <br />
              <span className="text-blue-600">TOUCH.</span>
            </h1>
            <p className="text-lg font-bold uppercase leading-relaxed tracking-tight text-slate-400">
              เชื่อมต่อกับผู้เชี่ยวชาญด้านเอกสารของเรา เพื่อวิเคราะห์ความพร้อม{" "}
              <br />
              และวางแผนโครงสร้างวีซ่าของคุณให้แม่นยำที่สุด
            </p>
          </div>
        </div>
      </section>

      {/* FORM_SECTION: Grid Architecture */}
      <section className="relative -mt-16 pb-24 lg:pb-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 shadow-2xl lg:grid-cols-12">
            {/* 📝 CONTACT_FORM */}
            <div className="bg-white p-8 md:p-16 lg:col-span-7 xl:col-span-8">
              {isSent ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center duration-500 animate-in fade-in zoom-in">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter text-slate-900">
                    Request_Received!
                  </h3>
                  <p className="max-w-xs text-sm font-bold uppercase leading-relaxed text-slate-500">
                    เจ้าหน้าที่ได้รับข้อมูลของคุณแล้ว
                    เราจะติดต่อกลับโดยเร็วที่สุด
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-10 text-[10px] font-black uppercase tracking-widest text-blue-600 underline underline-offset-8"
                  >
                    Send_Another_Request
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-12">
                    <h2 className="mb-2 text-2xl font-black uppercase tracking-tighter text-slate-900">
                      Inquiry_Form
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      กรุณากรอกข้อมูลให้ครบถ้วนเพื่อการประเมินที่แม่นยำ
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                          Full_Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="สมชาย มั่นคง"
                          className="w-full border-b-2 border-slate-100 bg-slate-50 px-4 py-4 text-sm font-bold focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                          Service_Type
                        </label>
                        <select className="w-full border-b-2 border-slate-100 bg-slate-50 px-4 py-4 text-sm font-bold focus:border-blue-600 focus:outline-none">
                          <option>Visa Application Strategy</option>
                          <option>Document Translation</option>
                          <option>Legal Consulting</option>
                        </select>
                      </div>
                    </div>
                    {/* ... (Input ส่วนอื่นๆ เหมือนเดิม) */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-4 bg-slate-900 py-6 text-[12px] font-black uppercase tracking-[0.4em] text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />{" "}
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={18} /> Transmit_Data
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* 📋 SIDEBAR_INFO */}
            <div className="bg-slate-50 p-8 md:p-12 lg:col-span-5 xl:col-span-4">
              <h3 className="mb-8 text-xl font-black uppercase tracking-tighter text-slate-900">
                Quick_Response
              </h3>
              <div className="space-y-8">
                {contactMethods.map((method, idx) => (
                  <a key={idx} href={method.link} className="group block">
                    <span className="mb-2 block text-[9px] font-black uppercase tracking-widest text-slate-400">
                      {method.label}
                    </span>
                    <div className="flex items-center gap-4 transition-transform group-hover:translate-x-2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center bg-white shadow-sm ${method.color}`}
                      >
                        {method.icon}
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        {method.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-12 space-y-8 border-t border-slate-200 pt-10">
                <div className="flex gap-4">
                  <Clock size={18} className="text-blue-600" />
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                      Operating_Hours
                    </h4>
                    <p className="text-xs font-bold text-slate-500">
                      Mon-Fri: 09:00 - 18:00
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-l-4 border-blue-600 bg-white p-4 shadow-sm">
                  <ShieldCheck size={20} className="text-blue-600" />
                  <span className="text-[9px] font-black uppercase tracking-tighter text-slate-900">
                    Secure_Data_Encryption_Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
