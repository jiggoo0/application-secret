/** @format */
import React from 'react'
import { Metadata } from 'next'
import { ContactForm } from '@/components/form/ContactForm'
import { Globe2, FileText, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact & Assessment | JP-VISOUL&DOCS',
  description: 'ศูนย์บริการข้อมูลทางเทคนิคและวิเคราะห์โปรไฟล์เพื่อการวางแผนเอกสารระดับสากล',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#FCDE09] selection:text-[#020617]">
      <div className="container mx-auto max-w-7xl px-6 pb-24 pt-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* LEFT: VALUE + CONTEXT */}
          <div className="space-y-14 lg:col-span-5">
            <div className="space-y-8">
              <h1 className="text-6xl font-black uppercase italic leading-[0.9] tracking-tighter text-[#020617] md:text-7xl">
                Strategic
                <br />
                <span className="text-[#FCDE09]">Inquiry.</span>
              </h1>

              <div className="space-y-6 font-thai">
                <p className="max-w-sm text-2xl font-black leading-tight text-[#020617]">
                  วิเคราะห์เคสเบื้องต้น <br />
                  <span className="bg-[#FCDE09] px-2 py-0.5">และประเมินโอกาส</span>{' '}
                  ก่อนเริ่มกระบวนการ
                </p>
                <p className="max-w-md text-sm font-bold leading-relaxed text-slate-600">
                  ติดต่อและประเมินโปรไฟล์ในหน้าเดียว เพื่อวางแผนกลยุทธ์เอกสารอย่างเป็นระบบ
                  และลดความเสี่ยงในการถูกปฏิเสธ
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 border-t border-slate-200 pt-10 font-thai">
              <FeatureItem
                icon={<Globe2 size={20} />}
                title="Profile Assessment"
                desc="ประเมินโปรไฟล์ตามหลักเกณฑ์สากล"
              />
              <FeatureItem
                icon={<FileText size={20} />}
                title="Case Analysis"
                desc="วิเคราะห์เคสโดยผู้เชี่ยวชาญด้านเอกสาร"
              />
              <FeatureItem
                icon={<CheckCircle2 size={20} />}
                title="Response Protocol"
                desc="คัดกรองข้อมูลอย่างเป็นระบบและเป็นความลับ"
              />
            </div>
          </div>

          {/* RIGHT: FORM */}
          <div className="lg:col-span-7">
            <div className="rounded-md border-2 border-[#020617] bg-white p-8 shadow-md md:p-12">
              <div className="mb-8 border-b border-slate-200 pb-4">
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Inquiry_Form
                </h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

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
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-[#020617] bg-white shadow-sm">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[14px] font-black uppercase text-[#020617]">{title}</p>
        <p className="text-[11px] font-bold text-slate-600">{desc}</p>
      </div>
    </div>
  )
}
