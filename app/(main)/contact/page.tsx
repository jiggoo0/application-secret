/** * 🛰️ AI-CONTEXT: JP-VisualDocs – Contact Page
 * @version 2026.1.12
 * @status PRODUCTION_READY: ESLint Clean & Zero-Knowledge Privacy Enabled
 * @description Page สำหรับรับข้อมูลลูกค้า (Inquiry Portal) เชื่อมต่อกับ ContactForm
 */

import React from 'react'
import { Metadata } from 'next'
import { ContactForm } from '@/components/form/ContactForm'
import { Globe2, FileText, CheckCircle2, ShieldAlert } from 'lucide-react'

/**
 * 🛠️ COMPONENT: ContactPage
 * ✅ Role: Service Intake Portal
 * ✅ Purpose: จัดการการรับข้อมูลลูกค้า (Lead Generation) ผ่านระบบความปลอดภัยสูง
 */
export const metadata: Metadata = {
  title: 'ติดต่อและประเมินโปรไฟล์ | JP-VISUAL & DOCS',
  description:
    'ส่งข้อมูลเพื่อวิเคราะห์เคสและวางแผนการจัดการเอกสารวีซ่าและสินเชื่อ ภายใต้ระบบรักษาความปลอดภัยข้อมูลขั้นสูงสุด',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#FCDE09] selection:text-[#020617]">
      <div className="container mx-auto max-w-7xl px-6 pb-24 pt-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* 🔴 LEFT SECTION: VALUE PROPOSITION (Evidence-Based Content) */}
          <div className="space-y-14 lg:col-span-5">
            <div className="space-y-8">
              <h1 className="text-6xl font-black uppercase italic leading-[0.9] tracking-tighter text-[#020617] md:text-7xl">
                Contact
                <br />
                <span className="text-[#FCDE09]">Inquiry.</span>
              </h1>

              <div className="font-thai space-y-6">
                <p className="max-w-sm text-2xl font-black leading-tight text-[#020617]">
                  ประเมินเคสเบื้องต้น <br />
                  <span className="bg-[#FCDE09] px-2 py-0.5">และเช็คโอกาสผ่าน</span>{' '}
                  ก่อนเริ่มงานจริง
                </p>
                <p className="max-w-md text-sm font-bold leading-relaxed text-slate-600">
                  ส่งรายละเอียดโปรไฟล์ของคุณเพื่อให้ทีมงานช่วยวิเคราะห์จุดแข็ง-จุดอ่อน
                  และวางแผนการเตรียมเอกสารให้ตรงตามเงื่อนไขของสถานทูตหรือธนาคารอย่างเป็นระบบ
                </p>
              </div>
            </div>

            {/* 🛡️ TRUST INDICATORS: Strategic Workflow Highlights */}
            <div className="font-thai grid grid-cols-1 gap-5 border-t border-slate-200 pt-10">
              <FeatureItem
                icon={<Globe2 size={20} className="text-[#020617]" />}
                title="Profile Analysis"
                desc="วิเคราะห์ข้อมูลตามเกณฑ์การพิจารณาจริงแบบ Real-Time"
              />
              <FeatureItem
                icon={<FileText size={20} className="text-[#020617]" />}
                title="Document Plan"
                desc="วางแนวทางการจัดการเอกสารรายบุคคล (Tailor-made Strategy)"
              />
              <FeatureItem
                icon={<CheckCircle2 size={20} className="text-emerald-600" />}
                title="Zero-Knowledge Privacy"
                desc="ข้อมูลของคุณถูกปกป้องเป็นความลับสูงสุดตามมาตรฐาน Digital Integrity"
              />
            </div>
          </div>

          {/* 🔵 RIGHT SECTION: FORM INTERFACE (Seamless Process) */}
          <div className="lg:col-span-7">
            <div className="shadow-sharp rounded-md border-4 border-[#020617] bg-white p-8 md:p-12">
              <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  System_Entry / แบบฟอร์มติดต่อ
                </h2>
                <div className="flex items-center gap-2 text-emerald-600">
                  <ShieldAlert size={14} />
                  <span className="font-mono text-[8px] font-black uppercase tracking-tighter">
                    Secure_Tunnel_Active
                  </span>
                </div>
              </div>

              {/* Client Component: Execute Submission via Server-Only Access */}
              <ContactForm />

              <div className="mt-8 border-t border-dashed border-slate-100 pt-6 text-center">
                <p className="font-thai text-[10px] font-bold text-slate-400">
                  * ข้อมูลจะถูกส่งไปยังระบบจัดการเคส (SRV-SYS) โดยตรงผ่านเทคโนโลยี RLS
                  และไม่มีการบันทึกใน Log สาธารณะเพื่อความเป็นส่วนตัวสูงสุด
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

/**
 * 🧩 SUB-COMPONENT: FeatureItem
 */
function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="group flex items-start gap-4 transition-all duration-300 hover:translate-x-1">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md border-2 border-[#020617] bg-white shadow-sm transition-colors group-hover:bg-[#FCDE09]">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[14px] font-black uppercase tracking-tight text-[#020617] group-hover:text-slate-700">
          {title}
        </p>
        <p className="font-thai text-[11px] font-bold text-slate-500">{desc}</p>
      </div>
    </div>
  )
}
