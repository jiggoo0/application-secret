/*
🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
@version 2026.1.12
@timestamp 2026-01-12T00:18:45.986Z
🛑 STRICT MODE: AI must follow rules exactly, no interpretation allowed
✅ Tone: Professional, Calm, Supportive
✅ Output must use Strategic Keywords only: Evidence-Based, Digital Integrity, Seamless Process, Trust by Design
✅ Reject speculative, unverifiable, or invented content

📌 PAGE METADATA
- PageName: page          // ตัวอย่าง: ShowcasePage, ServicesPage
- Role: [PAGE_ROLE_HERE]         // ตัวอย่าง: Document Hub, Service Portal
- Version: 2026.1.12
- Checked: True
- Audience: Internal & End-user
- Purpose: [SHORT_DESCRIPTION_HERE]   // ตัวอย่าง: แสดงสถานะเอกสาร, ให้บริการ workflow

... (AI Context rules same as global template)
*/

/** @format */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import {
  ShieldCheck,
  ChevronRight,
  Terminal as TerminalIcon,
  FileText,
  CheckCircle,
} from 'lucide-react'

import { getCaseBySlug, getAllCases } from '@/config/showcase/all-cases'
import { OperationalLog } from '@/components/showcase/OperationalLog'
import type { CaseShowcase } from '@/config/showcase-types'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const cases = getAllCases()
  return cases.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getCaseBySlug(slug)
  if (!data) return { title: 'ไม่พบข้อมูลเคส' }

  return {
    title: `${data.title} | ผลงานจริง | JP Visual & Docs`,
    description: data.executive_summary,
  }
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params
  const data = getCaseBySlug(slug) as CaseShowcase | undefined

  if (!data) notFound()

  return (
    <main className="min-h-screen bg-white pb-32 selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* HEADER: ข้อมูลการอนุมัติ (เน้นความเด็ดขาด) */}
      <header className="relative border-b-4 border-[#020617]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
          {/* LEFT: รายละเอียดหัวข้อ */}
          <div className="relative flex flex-col justify-center overflow-hidden border-r-0 border-[#020617] p-10 md:border-r-4 md:p-16">
            <div className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(#020617_1px,transparent_0)] bg-[size:24px_24px] opacity-[0.03]" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="shadow-sharp h-4 w-4 bg-[#FCDE09]" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  CASE_CODE: {data.id}
                </span>
              </div>
              <h1 className="font-thai text-5xl font-black leading-[1.1] text-[#020617] md:text-7xl">
                {data.title}
              </h1>
            </div>
          </div>

          {/* RIGHT: สถานะผลลัพธ์ (Official Verdict) */}
          <div className="relative flex flex-col justify-center bg-[#020617] p-10 text-white md:p-16">
            <div className="absolute right-6 top-6 text-[#FCDE09] opacity-10">
              <ShieldCheck size={140} strokeWidth={1} />
            </div>
            <div className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#FCDE09] bg-white/5 px-4 py-1 text-[11px] font-black uppercase tracking-widest text-[#FCDE09]">
              <CheckCircle size={14} /> ผลลัพธ์อย่างเป็นทางการ
            </div>
            <div className="font-thai text-5xl font-black uppercase tracking-tighter text-[#FCDE09] drop-shadow-[0_0_20px_rgba(252,222,9,0.3)] md:text-7xl">
              {data.business_outcome?.verdict || 'อนุมัติเรียบร้อย'}
            </div>
            <div className="font-thai mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6 text-[11px] font-bold uppercase tracking-tight text-slate-400">
              <span className="flex items-center gap-2 text-white">
                <span className="text-[#FCDE09]">หน่วยงาน:</span>{' '}
                {data.business_outcome?.authority || 'สถาบันการเงิน'}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#FCDE09]">เลขอ้างอิง:</span>{' '}
                {data.business_outcome?.official_ref || 'SECURE_TRANS'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT: รายละเอียดแผนงาน */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 border-x-0 border-[#020617] lg:grid-cols-12 lg:border-x-4">
        {/* MAIN_CONTENT */}
        <div className="border-r-0 border-[#020617] p-8 md:p-16 lg:col-span-8 lg:border-r-4">
          {/* Executive Summary: สรุปงานสำคัญ */}
          <section className="mb-24">
            <div className="mb-10 flex w-fit items-center gap-4 border-b-4 border-[#FCDE09] pb-4">
              <FileText size={20} className="text-[#020617]" />
              <h2 className="font-thai text-sm font-black uppercase tracking-[0.3em] text-[#020617]">
                สรุปภารกิจและปัญหาหน้างาน
              </h2>
            </div>
            <p className="font-thai text-2xl font-bold leading-relaxed text-slate-800">
              {data.executive_summary}
            </p>
          </section>

          {/* Technical Strategy: วิธีการจัดการแบบมืออาชีพ */}
          <section className="mb-24">
            <h2 className="font-thai mb-12 inline-block border-b-4 border-[#020617] pb-2 text-sm font-black uppercase tracking-[0.3em] text-[#020617]">
              แนวทางการแก้ไขปัญหาเชิงลึก
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {data.technical_strategy.map((s, i) => (
                <article
                  key={`strat-${i}`}
                  className="shadow-sharp group relative flex items-start border-4 border-[#020617] bg-white p-8 transition-all hover:-translate-y-1"
                >
                  <span className="mr-6 font-mono text-4xl font-black text-slate-100 transition-colors group-hover:text-[#FCDE09]">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="font-thai text-base font-black leading-tight text-[#020617]">
                    {s}
                  </span>
                </article>
              ))}
            </div>
          </section>

          {/* Operational Log: บันทึกการทำงานจริง */}
          <section className="mt-20">
            <div className="mb-8 flex items-center gap-4">
              <TerminalIcon size={18} className="text-[#020617]" />
              <h3 className="font-thai text-sm font-black uppercase tracking-[0.3em] text-[#020617]">
                บันทึกขั้นตอนการปฏิบัติงานจริง
              </h3>
            </div>
            <OperationalLog logs={data.logs} />
          </section>
        </div>

        {/* SIDEBAR: Metrics & Navigation */}
        <aside className="bg-slate-50 lg:col-span-4">
          <div className="sticky top-24 p-8 md:p-12">
            <h2 className="font-thai mb-12 flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#020617]">
              <div className="shadow-sharp h-3 w-3 bg-[#FCDE09]" /> ข้อมูลการตรวจสอบ
            </h2>

            <div className="space-y-16">
              {/* รายละเอียดจำนวนเอกสาร */}
              <div className="relative">
                <span className="font-thai mb-4 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                  จำนวนชุดข้อมูลที่จัดการ
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-7xl font-black tracking-tighter text-[#020617]">
                    {data.stats?.docs_processed?.toLocaleString() || '0'}
                  </span>
                  <span className="font-thai text-sm font-black text-slate-400">ชุดเอกสาร</span>
                </div>
              </div>

              {/* ความซับซ้อน */}
              <div className="border-t-2 border-slate-200 pt-8">
                <span className="font-thai mb-2 block text-[11px] font-black text-slate-400">
                  ระดับความซับซ้อนของเคส
                </span>
                <p className="font-thai text-lg font-black text-[#020617]">
                  {data.stats?.complexity_level || 'มาตรฐาน'}
                </p>
              </div>

              <Link
                href="/showcase"
                className="font-thai shadow-sharp group flex w-full items-center justify-between border-4 border-[#020617] bg-white p-6 text-sm font-black uppercase tracking-widest text-[#020617] transition-all hover:bg-[#020617] hover:text-white"
              >
                ย้อนกลับไปคลังผลงาน
                <ChevronRight
                  size={20}
                  className="transition-transform group-hover:translate-x-2"
                />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
