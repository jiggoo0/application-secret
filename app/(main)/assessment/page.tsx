/** @format */
import { AssessmentForm } from "@/components/form/AssessmentForm"

/**
 * @description ASSESSMENT_PAGE: หน้าหลักสำหรับการประเมินโอกาส
 * @fix Resolved TS2353 'size' property error and optimized CSS-in-JS
 */

export default function AssessmentPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white px-6 py-24">
      {/* 🧩 BACKGROUND_DECOR: Blueprint Grid Style */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* 🏷️ HEADER_SECTION: SHARP_ITALIC_STYLE */}
        <div className="mb-16 border-l-[12px] border-[#020617] pl-8">
          <div className="mb-2 flex items-center gap-3">
            <span className="bg-[#020617] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#FCDE09]">
              Secure_Entry_v3.2
            </span>
          </div>
          <h1 className="text-6xl font-black uppercase italic leading-[0.85] tracking-tighter text-[#020617] md:text-8xl">
            Digital
            <br />
            <span className="not-italic text-[#FCDE09] drop-shadow-[4px_4px_0px_#020617]">
              Assessment.
            </span>
          </h1>

          <div className="mt-6 space-y-2">
            <p className="font-thai text-lg font-black leading-tight text-[#020617]">
              ระบบประเมินโอกาสวิเคราะห์ผลเบื้องต้นโดยทีมที่ปรึกษา
            </p>
            <p className="max-w-md font-thai text-sm font-bold leading-relaxed text-slate-400">
              โปรดกรอกข้อมูลตามจริง เพื่อให้เจ้าหน้าที่ตรวจสอบและออกรหัส{" "}
              <span className="text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                Digital Ticket
              </span>{" "}
              สำหรับการติดตามผล
            </p>
          </div>
        </div>

        {/* 📋 FORM_CONTAINER: Sharp Shadow Layout */}
        <div className="border-4 border-[#020617] bg-white p-2 shadow-[24px_24px_0px_#f1f5f9] transition-transform hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[28px_28px_0px_#f1f5f9]">
          <div className="border-2 border-dashed border-slate-100 p-6 md:p-10">
            <AssessmentForm />
          </div>
        </div>

        {/* 🛡️ FOOTER_NOTE */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t-2 border-slate-100 pt-8 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 animate-pulse bg-[#FCDE09] shadow-[0_0_8px_#FCDE09]" />
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              System_Status: <span className="text-[#10B981]">Operational</span>
            </p>
          </div>
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
            © JP-VISOUL&DOCS_PROTOCOL_2025
          </p>
        </div>
      </div>
    </main>
  )
}
