/** * @format
 * @description DIGITAL_ASSESSMENT_CORE: The Analysis Gateway (V3.2.3)
 * ✅ ENFORCEMENT: Heavyweight Italic Header, Dashed Inner Frame, Telemetry Footer
 */

import { AssessmentForm } from '@/components/form/AssessmentForm'
import { ShieldCheck, Cpu, Database, Activity } from 'lucide-react'

export default function AssessmentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-6 pb-32 pt-32 selection:bg-brand selection:text-slate-950 lg:pt-48">
      {/* 🧩 UI_INFRASTRUCTURE: Blueprint Grid (Mode B) */}
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 z-0 opacity-[0.05]" />

      {/* Perspective Geometric Decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-[30%] -translate-x-1/2 -skew-x-12 border-r-[2px] border-slate-100 bg-slate-50/50" />

      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* 🏷️ HEADER_MANIFEST: Industrial Authority Style */}
        <header className="mb-20 border-l-[12px] border-slate-950 pl-10 md:pl-16">
          <div className="mb-6 flex items-center gap-4">
            <div className="bg-slate-950 px-4 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand shadow-sharp-sm">
              Assessment_Node_v3.2
            </div>
            <div className="flex items-center gap-2">
              <Activity size={14} className="animate-pulse text-emerald-500" />
              <span className="font-mono text-[9px] font-black text-slate-300">
                DATA_STREAM_ACTIVE
              </span>
            </div>
          </div>

          <h1 className="text-7xl font-black uppercase italic leading-[0.8] tracking-tighter text-slate-950 md:text-9xl">
            Digital <br />
            <span className="not-italic text-brand drop-shadow-[6px_6px_0px_#020617]">
              Assessment.
            </span>
          </h1>

          <div className="mt-10 space-y-4">
            <h2 className="font-thai text-3xl font-black leading-tight text-slate-950">
              วิเคราะห์โอกาส <br className="md:hidden" />
              และประเมินเอกสารเชิงลึก
            </h2>
            <p className="font-thai max-w-xl text-lg font-bold leading-relaxed text-slate-500">
              เข้าสู่ระบบคัดกรองอัตโนมัติ ข้อมูลของคุณจะถูกวิเคราะห์ด้วย
              <span className="mx-1 text-slate-950 underline decoration-brand decoration-[4px] underline-offset-4">
                Analytical Framework
              </span>
              เพื่อให้แน่ใจว่าเคสของคุณจะได้รับการเตรียมความพร้อมสูงสุด
            </p>
          </div>
        </header>

        {/* 📋 FORM_ARCHITECTURE: The Secure Container */}
        <section className="group relative border-[4px] border-slate-950 bg-white p-2 shadow-sharp-brand transition-all duration-500 hover:-translate-x-1 hover:-translate-y-1">
          {/* Internal Dashboard Styling */}
          <div className="relative border-2 border-dashed border-slate-100 bg-white p-6 md:p-16">
            {/* Corner Decorative Icons */}
            <div className="absolute right-6 top-6 text-slate-950 opacity-[0.03] transition-opacity group-hover:opacity-10">
              <Cpu size={120} />
            </div>

            {/* 🧩 CORE_FORM_SLOT */}
            <AssessmentForm />
          </div>

          {/* Industrial "Batch" Label */}
          <div className="absolute -bottom-1 -right-1 flex h-12 w-12 items-center justify-center bg-slate-950 text-brand [clip-path:polygon(100%_0,100%_100%,0_100%)]">
            <ShieldCheck size={18} className="translate-x-2 translate-y-2" />
          </div>
        </section>

        {/* 🛡️ SYSTEM_TELEMETRY_FOOTER */}
        <footer className="mt-24 flex flex-col items-center justify-between gap-8 border-t-2 border-slate-100 pt-12 md:flex-row">
          <div className="flex items-center gap-6">
            <div className="flex h-12 w-12 items-center justify-center border-2 border-slate-950 bg-white shadow-sharp-sm">
              <Database size={20} className="text-slate-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                Security_Protocol
              </span>
              <span className="font-mono text-[12px] font-black uppercase text-slate-950">
                AES_256_ENCRYPTED_LINK
              </span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">
                Data_Governance_v2025
              </p>
              <p className="font-mono text-[11px] font-black uppercase text-slate-950">
                © JP-VISOUL_TERMINAL
              </p>
            </div>
            <div className="h-10 w-1 bg-brand" />
          </div>
        </footer>
      </div>
    </main>
  )
}
