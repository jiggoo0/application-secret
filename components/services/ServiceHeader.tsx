/** @format */
import React from "react"

export const ServiceHeader = () => (
  <header className="relative mb-20 max-w-5xl">
    {/* 🧩 System ID Badge */}
    <div className="mb-10 inline-flex items-center gap-4">
      <div className="flex items-center gap-3 bg-slate-950 px-4 py-1.5 shadow-[4px_4px_0px_0px_#FCDE09]">
        <div className="h-2 w-2 animate-pulse bg-brand" />
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand">
          Operation_Matrix_V2.5
        </span>
      </div>
      <div className="hidden h-px w-24 bg-slate-200 sm:block" />
    </div>

    {/* 🖋️ Main Title: เน้นความ Sharp และ Authority */}
    <h2 className="mb-10 text-6xl font-black uppercase leading-[0.85] tracking-[calc(-0.05em)] text-slate-950 md:text-8xl">
      Integrated <br />
      <span className="relative inline-block italic text-brand">
        Infrastructure.
        {/* Custom Underline: ใช้ Border จริงแทนการขีดเส้นใต้ทั่วไปเพื่อให้ปรับระยะได้สวยกว่า */}
        <span className="absolute -bottom-2 left-0 -z-10 h-3 w-full bg-slate-950" />
      </span>
    </h2>

    {/* 📖 Description: ใช้ Font Thai ที่มีความหนักแน่น (Medium/Bold) */}
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
      <div className="border-l-4 border-brand pl-8 md:col-span-7">
        <p className="font-thai text-xl font-bold leading-relaxed text-slate-500 md:text-2xl">
          ระบบจัดการวีซ่าและงานเอกสารที่ขับเคลื่อนด้วย Data และมาตรฐาน
          <span className="text-slate-950 shadow-[inset_0_-8px_0_0_#FCDE09]">
            {" "}
            Embassy-Grade
          </span>
        </p>
      </div>

      {/* 📊 Technical Annotation (Side Detail) */}
      <div className="pt-2 md:col-span-5">
        <p className="font-mono text-[10px] font-black uppercase leading-loose tracking-widest text-slate-400">
          [ Verification_Protocol: Active ] <br />
          [ Multi-Layer_Review: Enabled ] <br />[ Precision_Rating: 99.98% ]
        </p>
      </div>
    </div>
  </header>
)
