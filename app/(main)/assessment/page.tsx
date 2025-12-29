/** @format */

import { AssessmentForm } from "@/components/form/AssessmentForm"

/**
 * 🛰️ PAGE: DIGITAL_ASSESSMENT_CORE
 * @version 3.2.3 (Industrial Sharp Edition)
 * PURPOSE: หน้าหลักสำหรับระบบประเมินโอกาสวิเคราะห์วีซ่าและเอกสาร
 */
export default function AssessmentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-6 py-24 selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 BACKGROUND_ARCH: Blueprint Grid Style */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-4xl">
        {/* 🏷️ HEADER_MANIFEST: SHARP_ITALIC_STYLE */}
        <header className="mb-16 border-l-[12px] border-[#020617] pl-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="bg-[#020617] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#FCDE09]">
              Secure_Entry_v3.2
            </span>
            <div className="h-[2px] w-12 bg-slate-100" />
          </div>

          <h1 className="text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-8xl">
            Digital
            <br />
            <span className="not-italic text-[#FCDE09] drop-shadow-[4px_4px_0px_#020617]">
              Assessment.
            </span>
          </h1>

          <div className="mt-8 space-y-3">
            <h2 className="font-thai text-2xl font-black leading-tight text-[#020617]">
              เริ่มขั้นตอนประเมินโอกาส <br className="md:hidden" />{" "}
              โดยที่ปรึกษาผู้เชี่ยวชาญ
            </h2>
            <p className="max-w-md font-thai text-base font-medium leading-relaxed text-slate-500">
              ข้อมูลของคุณจะถูกเก็บเป็นความลับสูงสุด โปรดกรอกรายละเอียดตามจริง
              เพื่อให้ระบบออกรหัส{" "}
              <span className="font-bold text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                Reference Ticket
              </span>{" "}
              สำหรับติดตามสถานะเคสของคุณ
            </p>
          </div>
        </header>

        {/* 📋 FORM_ARCHITECTURE: Sharp Shadow Layout */}
        <section className="hover:shadow-sharp-lg group relative border-4 border-[#020617] bg-white p-2 shadow-sharp transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
          <div className="border-2 border-dashed border-slate-100 p-6 md:p-12">
            <AssessmentForm />
          </div>

          {/* DECORATIVE_CORNER_ELEMENT */}
          <div className="clip-path-slant absolute -bottom-1 -right-1 h-8 w-8 bg-[#020617]" />
        </section>

        {/* 🛡️ SYSTEM_FOOTER: Status & Verification */}
        <footer className="mt-20 flex flex-col items-center justify-between gap-6 border-t-2 border-slate-100 pt-10 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#10B981]" />
            </div>
            <div className="flex flex-col">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                System_Status
              </p>
              <p className="font-mono text-[11px] font-black uppercase text-[#020617]">
                Live_Operational
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
              Identity_Governance_Protocol
            </p>
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.1em] text-[#020617]">
              © JP-VISOUL&DOCS_2025
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
