/** @format */
import React from "react"

export const ServiceHeader = () => (
  <header className="relative mb-24 max-w-5xl">
    {/* 🧩 System ID Badge - เพิ่มความชัดเจนของขอบและเงา */}
    <div className="mb-12 inline-flex items-center gap-4">
      <div className="flex items-center gap-3 bg-slate-950 px-5 py-2 shadow-[6px_6px_0px_0px_#FCDE09] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px]">
        <div className="h-2 w-2 animate-pulse bg-brand" />
        <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-brand">
          Operation_Matrix_V2.5
        </span>
      </div>
      <div className="hidden h-[1px] w-32 bg-slate-200 sm:block" />
    </div>

    {/* 🖋️ Main Title: เน้น Hierarchy และน้ำหนักที่มั่นคง */}
    <h2 className="mb-12 text-6xl font-black uppercase leading-[0.85] tracking-tighter text-slate-950 md:text-9xl">
      Integrated <br />
      <span className="relative z-10 inline-block italic text-brand">
        Infrastructure.
        {/* Shadow Overlay: สร้างมิติซ้อนทับเพื่อให้ดูมีน้ำหนัก */}
        <span className="absolute -bottom-2 left-0 -z-10 h-[25%] w-full bg-slate-950 md:-bottom-3" />
      </span>
    </h2>

    {/* 📖 Description: ปรับจูนเนื้อหาให้ดูเป็น High-End Service */}
    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
      <div className="border-l-4 border-brand pl-8 md:col-span-8">
        <p className="font-thai text-xl font-bold leading-relaxed text-slate-600 md:text-3xl">
          โครงสร้างการจัดการเอกสารยุคใหม่
          <br className="hidden md:block" />
          ผสานกลยุทธ์
          <span className="text-slate-950 shadow-[inset_0_-12px_0_0_#FCDE09]">
            {" "}
            การวิเคราะห์ข้อมูลระดับสูง
          </span>{" "}
          และมาตรฐานกงสุลสากล
        </p>
      </div>

      {/* 📊 Technical Annotation: ปรับระยะบรรทัดให้ Scannable ขึ้น */}
      <div className="flex flex-col justify-end pt-2 md:col-span-4">
        <div className="space-y-1 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <p className="flex justify-between border-b border-slate-100 pb-1">
            <span>[ Protocol ]</span>
            <span className="text-slate-950">Active</span>
          </p>
          <p className="flex justify-between border-b border-slate-100 pb-1">
            <span>[ Security ]</span>
            <span className="text-slate-950">Tier_04</span>
          </p>
          <p className="flex justify-between">
            <span>[ Precision ]</span>
            <span className="bg-slate-950 px-1 text-brand">99.98%</span>
          </p>
        </div>
      </div>
    </div>

    {/* 🧩 UI Decoration: เส้นบางๆ เพื่อบอกขอบเขต Section */}
    <div className="mt-20 h-px w-full bg-gradient-to-r from-slate-950 via-slate-100 to-transparent opacity-20" />
  </header>
)
