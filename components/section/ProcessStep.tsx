/** @format */
import React from "react"
import {
  CheckCircle2,
  Search,
  FileText,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"

const steps = [
  {
    no: "01",
    title: "Initial Analysis",
    description:
      "วิเคราะห์ข้อมูลและประเมินความเป็นไปได้ของเคสโดยผู้เชี่ยวชาญ เพื่อวางกลยุทธ์ที่แม่นยำที่สุด",
    icon: Search,
    status: "READY",
  },
  {
    no: "02",
    title: "Document Audit",
    description:
      "ตรวจสอบและจัดเตรียมเอกสารตามมาตรฐาน Embassy-Grade เพื่อปิดช่องโหว่ที่อาจนำไปสู่การปฏิเสธ",
    icon: FileText,
    status: "PROCESSING",
  },
  {
    no: "03",
    title: "Secure Submission",
    description:
      "ดำเนินการยื่นคำร้องผ่านระบบที่ตรวจสอบได้ พร้อมติดตามสถานะอย่างใกล้ชิดทุกระยะ",
    icon: ShieldCheck,
    status: "SUBMITTED",
  },
  {
    no: "04",
    title: "Final Collection",
    description:
      "รับมอบเอกสารคืนพร้อมคำแนะนำสำหรับการเดินทางหรือการดำเนินการในขั้นตอนถัดไป",
    icon: CheckCircle2,
    status: "COMPLETED",
  },
]

export default function ProcessStep() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-32">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.05]" />
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <header className="mb-24 text-center">
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-brand">
              Work_Flow_Protocol
            </span>
            <span className="h-px w-8 bg-brand" />
          </div>
          <h2 className="mb-8 text-5xl font-black uppercase tracking-tighter text-white md:text-7xl">
            Operational <span className="italic text-brand">Sequence.</span>
          </h2>
        </header>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Connector Line (Desktop) */}
          <div className="absolute left-0 top-[2.25rem] z-0 hidden h-px w-full bg-slate-800 md:block" />

          {steps.map((step, index) => (
            <div key={step.no} className="group relative z-10">
              {/* Number & Icon Circle */}
              <div className="mb-8 flex flex-col items-center md:items-start">
                <div className="relative flex h-16 w-16 items-center justify-center border border-slate-800 bg-slate-900 shadow-xl transition-colors duration-500 group-hover:border-brand">
                  <step.icon
                    className="text-slate-500 transition-colors group-hover:text-brand"
                    size={24}
                    strokeWidth={1.5}
                  />
                  <span className="absolute -right-3 -top-3 bg-brand px-2 py-0.5 font-mono text-[10px] font-black text-slate-950">
                    {step.no}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 text-center md:text-left">
                <div className="flex items-center justify-center gap-2 md:justify-start">
                  <span className="border border-slate-800 bg-slate-900 px-2 py-0.5 font-mono text-[8px] font-black tracking-tighter text-slate-500">
                    CMD://{step.status}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white transition-colors group-hover:text-brand">
                  {step.title}
                </h3>
                <p className="font-thai text-sm font-medium leading-relaxed text-slate-400">
                  {step.description}
                </p>
              </div>

              {/* Arrow Indicator (Mobile only between steps) */}
              {index !== steps.length - 1 && (
                <div className="my-8 flex justify-center md:hidden">
                  <ArrowRight className="rotate-90 text-brand" size={20} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA Detail */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm md:flex-row">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 animate-ping bg-brand" />
            <p className="font-mono text-[11px] uppercase leading-none tracking-widest text-slate-400">
              Average_Processing_Time:{" "}
              <span className="text-white">5-14_Business_Days</span>
            </p>
          </div>
          <button className="bg-brand px-8 py-4 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 transition-all hover:shadow-[0_0_20px_rgba(252,222,9,0.3)] active:scale-95">
            START_INITIAL_ASSESSMENT
          </button>
        </div>
      </div>
    </section>
  )
}
