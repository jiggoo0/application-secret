/** @format */

import React from "react"
import { notFound } from "next/navigation"
import { getCaseById } from "@/config/showcase" // 🏗️ นำเข้า Logic จาก Config
import { ShieldCheck, ChevronLeft } from "lucide-react"
import Link from "next/link"

// 🛡️ PROTOCOL: Next.js 15 ต้องใช้ Promise สำหรับ Params
interface CaseDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  // 1. รับค่า ID แบบ Async
  const { id } = await params

  // 2. ดึงข้อมูลผ่าน Logic Centralization
  const data = getCaseById(id)

  if (!data) notFound()

  return (
    <div className="min-h-screen bg-white">
      {/* HERO_SECTION: Industrial High-Contrast */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-blueprint-grid opacity-[0.05]" />
        <div className="container relative z-10 mx-auto px-6 pt-40">
          <Link
            href="/showcase"
            className="mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-400 transition-colors hover:text-brand"
          >
            <ChevronLeft size={14} /> BACK_TO_ARCHIVE
          </Link>

          <div className="max-w-4xl">
            <span className="mb-4 block font-mono text-xs font-black uppercase tracking-widest text-brand">
              DEPLOYMENT_REPORT // {data.id}
            </span>
            <h1 className="mb-8 text-5xl font-black uppercase italic leading-[0.85] tracking-tighter text-white md:text-8xl">
              {data.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container relative z-20 mx-auto -mt-20 px-6 pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* STATS_SIDEBAR: Sharp Edges Only */}
          <div className="space-y-px border border-slate-200 bg-slate-200 shadow-sharp lg:col-span-4">
            {data.stats.map((stat) => (
              <div key={stat.label} className="bg-white p-8">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  {stat.label.replace("_", " ")}
                </p>
                <p className="text-2xl font-black uppercase italic text-slate-950">
                  {stat.value}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between bg-slate-950 p-8 text-brand">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                OPERATION_STATUS: {data.status}
              </span>
              <ShieldCheck size={20} />
            </div>
          </div>

          {/* CONTENT_AREA: Industrial Sharp Style */}
          <div className="border border-slate-100 bg-white p-8 shadow-sharp md:p-16 lg:col-span-8">
            <div className="prose prose-slate max-w-none">
              <div className="mb-10 flex items-center gap-4">
                <span className="h-[2px] w-12 bg-brand" />
                <h3 className="font-mono text-sm font-black uppercase tracking-[0.3em] text-slate-900">
                  EXECUTIVE_SUMMARY
                </h3>
              </div>

              <div className="whitespace-pre-line font-thai text-lg leading-relaxed text-slate-600">
                {data.content}
              </div>

              {/* TECHNICAL_NOTE */}
              <div className="mt-12 border border-slate-950 bg-slate-50 p-8">
                <div className="mb-4 flex items-center gap-3">
                  <ShieldCheck className="text-brand" size={18} />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                    Engineering_Note
                  </span>
                </div>
                <p className="font-thai text-sm font-medium leading-relaxed text-slate-900">
                  หมายเหตุทางวิศวกรรม: ทีมงานได้ดำเนินการภายใต้มาตรฐาน JP Visual
                  Docs
                  เพื่อให้มั่นใจว่าโครงสร้างเอกสารมีความแม่นยำสูงสุดและลดความเสี่ยงในการถูกปฏิเสธ
                  ผ่านการทำ Document Audit และ Profile Reconstruction
                  ในทุกขั้นตอน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
