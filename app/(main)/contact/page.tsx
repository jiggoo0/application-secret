/** @format */
"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Send,
  Phone,
  MessageSquare,
  Loader2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Cpu,
  Mail,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/config/site"
import { createLead } from "@/app/actions/lead-actions"

/**
 * 🛰️ CONTACT_PAGE_COMPONENT
 * แก้ไขปัญหา:
 * 1. ลบ 'Globe' (Unused Variable)
 * 2. แก้ไข JSX Comment nodes (บรรทัด 275 เดิม)
 */
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const pathname = usePathname()

  // 🛰️ SUBMISSION_HANDLER
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || siteConfig.contact.phone,
      category: formData.get("category") as string,
      message: formData.get("message") as string,
      source_url: pathname,
      template_id: "CONTACT_FORM_V2",
    }

    try {
      const result = await createLead(payload)
      if (result.success) {
        setIsSent(true)
      } else {
        console.error("TRANSMISSION_FAILED:", result.error)
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์ กรุณาลองใหม่ในภายหลัง")
      }
    } catch (error) {
      console.error("SYSTEM_CRITICAL_ERROR:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: <Phone size={20} />,
      label: "HOTLINE_DIRECT",
      value: siteConfig.contact.phone,
      link: `tel:${siteConfig.contact.phone.replace(/-/g, "")}`,
      color: "text-blue-600",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "LINE_OFFICIAL",
      value: siteConfig.contact.lineId,
      link: siteConfig.social.line,
      color: "text-green-600",
    },
    {
      icon: <Mail size={20} />,
      label: "EMAIL_TRANSMISSION",
      value: siteConfig.contact.email,
      link: `mailto:${siteConfig.contact.email}`,
      color: "text-slate-900",
    },
  ]

  return (
    <div className="min-h-screen bg-white selection:bg-blue-600 selection:text-white">
      {/* 🏗️ HERO_SECTION: Blueprint Style */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-40">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">
                Connection_Portal_v{siteConfig.system.version.replace("v", "")}
              </span>
            </div>
            <h1 className="mb-10 text-6xl font-black uppercase leading-[0.85] tracking-tighter md:text-9xl">
              GET IN <br />
              <span className="text-blue-600">TOUCH.</span>
            </h1>
            <p className="max-w-2xl text-lg font-bold uppercase leading-relaxed tracking-tight text-slate-400">
              วิเคราะห์ความพร้อมและวางแผนโครงสร้างเอกสารของคุณให้แม่นยำที่สุด
              ระบบพร้อมรับข้อมูลการวิเคราะห์เบื้องต้นแล้ว
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🧩 FORM_GRID_INTERFACE */}
      <section className="relative -mt-20 pb-24 lg:pb-40">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 overflow-hidden border border-slate-200 bg-slate-200 shadow-[20px_20px_0px_0px_rgba(15,23,42,0.05)] lg:grid-cols-12">
            <div className="bg-white p-8 md:p-16 lg:col-span-7 xl:col-span-8">
              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="mb-8 flex h-24 w-24 items-center justify-center bg-blue-600 text-white shadow-xl">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="mb-4 text-4xl font-black uppercase tracking-tighter text-slate-900">
                      Transmitted!
                    </h3>
                    <p className="max-w-xs text-xs font-bold uppercase leading-relaxed tracking-widest text-slate-500">
                      บันทึกลงฐานข้อมูลเรียบร้อยแล้ว
                      เจ้าหน้าที่จะดำเนินการวิเคราะห์เคสและติดต่อกลับ
                    </p>
                    <button
                      onClick={() => setIsSent(false)}
                      className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 transition-colors hover:text-slate-900"
                    >
                      [ SEND_NEW_DATA_PACKET ]
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="mb-12 flex items-end justify-between border-b border-slate-100 pb-6">
                      <div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
                          Inquiry_Form
                        </h2>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Secure Registry Input
                        </p>
                      </div>
                      <Cpu size={24} className="text-slate-100" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                            Full_Name
                          </label>
                          <input
                            name="name"
                            required
                            type="text"
                            className="w-full border-2 border-transparent bg-slate-50 p-4 text-sm font-bold outline-none transition-all focus:border-blue-600 focus:bg-white"
                            placeholder="เอกชัย มั่นคง"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                            Contact_Email
                          </label>
                          <input
                            name="email"
                            required
                            type="email"
                            className="w-full border-2 border-transparent bg-slate-50 p-4 text-sm font-bold outline-none transition-all focus:border-blue-600 focus:bg-white"
                            placeholder="yourname@domain.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                            Phone_Number
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            className="w-full border-2 border-transparent bg-slate-50 p-4 text-sm font-bold outline-none transition-all focus:border-blue-600 focus:bg-white"
                            placeholder="09X-XXX-XXXX"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                            Inquiry_Category
                          </label>
                          <select
                            name="category"
                            className="w-full cursor-pointer appearance-none border-2 border-transparent bg-slate-50 p-4 text-sm font-bold outline-none focus:border-blue-600"
                          >
                            <option value="Visa Strategy">
                              VISA_STRATEGY_ANALYSIS
                            </option>
                            <option value="Documentation">
                              DOCUMENT_STRUCTURE
                            </option>
                            <option value="Legal Consulting">
                              LEGAL_CONSULTATION
                            </option>
                            <option value="Loan Support">LOAN_PLANNING</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                          Technical_Requirements
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          className="w-full resize-none border-2 border-transparent bg-slate-50 p-4 text-sm font-bold outline-none focus:border-blue-600"
                          placeholder="ระบุรายละเอียดเคสหรือปัญหาเอกสารที่คุณพบ..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full overflow-hidden bg-slate-900 py-6 text-[12px] font-black uppercase tracking-[0.5em] text-white transition-all hover:bg-blue-600"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-4">
                          {isSubmitting ? (
                            <Loader2 className="animate-spin" size={18} />
                          ) : (
                            <Send size={18} />
                          )}
                          {isSubmitting
                            ? "TRANSMITTING..."
                            : "EXECUTE_TRANSMISSION"}
                        </span>
                        <div className="absolute inset-0 -translate-x-full bg-blue-500 transition-transform duration-500 group-hover:translate-x-0" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-slate-50 p-8 md:p-16 lg:col-span-5 xl:col-span-4">
              <div className="mb-12">
                <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">
                  Direct_Access
                </h3>
                <div className="mt-2 h-1 w-10 bg-blue-600" />
              </div>

              <div className="space-y-10">
                {contactMethods.map((method, idx) => (
                  <a key={idx} href={method.link} className="group block">
                    <span className="mb-2 block text-[9px] font-black uppercase italic tracking-widest text-slate-400">
                      {`// ${method.label}`}
                    </span>
                    <div className="flex items-center gap-5">
                      <div
                        className={`flex h-12 w-12 items-center justify-center bg-white shadow-lg transition-transform group-hover:scale-110 ${method.color}`}
                      >
                        {method.icon}
                      </div>
                      <span className="text-sm font-black tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                        {method.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-20 space-y-8 border-t border-slate-200 pt-12">
                <div className="flex items-start gap-4">
                  <Clock size={20} className="shrink-0 text-blue-600" />
                  <div>
                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                      System_Uptime
                    </h4>
                    <p className="mt-1 text-xs font-bold uppercase text-slate-500">
                      Mon-Fri: 09:00 - 18:00 (GMT+7)
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-slate-900 p-6 text-white">
                  <div className="relative z-10 flex items-center gap-4">
                    <ShieldCheck size={24} className="text-blue-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        End_to_End_Encrypted
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-tighter text-slate-500">
                        Supabase_Cloud_Vault_Enabled
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
