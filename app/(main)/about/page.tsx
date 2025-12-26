/** @format */
import React from "react"
import Image from "next/image"
import {
  ShieldCheck,
  History,
  Users,
  Award,
  Target,
  CheckCircle2,
} from "lucide-react"

export const metadata = {
  title: "About | JP VISUAL DOCS - Document Architecture Specialists",
  description:
    "ทำความรู้จักกับ JP VISUAL DOCS ทีมงานผู้เชี่ยวชาญด้านการจัดการเอกสารวีซ่าและนิติกรรม ด้วยประสบการณ์กว่า 8 ปี",
}

export default function AboutPage() {
  const stats = [
    { label: "EXPERIENCE_YEARS", value: "08+", icon: <History size={16} /> },
    {
      label: "SUCCESS_DOCUMENTS",
      value: "2500+",
      icon: <CheckCircle2 size={16} />,
    },
    { label: "VERIFIED_CLIENTS", value: "1800+", icon: <Users size={16} /> },
    { label: "ACCURACY_RATE", value: "100%", icon: <ShieldCheck size={16} /> },
  ]

  return (
    <div className="flex flex-col bg-white">
      {/* HERO_HEADER */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
        <div className="absolute inset-0 z-0 opacity-[0.05]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">
                Company_Profile_v2.0
              </span>
            </div>
            <h1 className="mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tighter md:text-8xl">
              WE DESIGN <br />
              <span className="text-blue-600">SUCCESS</span> STRUCTURES.
            </h1>
            <p className="text-lg font-bold uppercase leading-relaxed tracking-tight text-slate-400">
              เราไม่ใช่เพียงผู้จัดการเอกสาร แต่เราคือสถาปนิกผู้ออกแบบความสำเร็จ
              ในทุกขั้นตอนของวีซ่าและนิติกรรมต่างประเทศ
            </p>
          </div>
        </div>
      </section>

      {/* SYSTEM_STATS */}
      <section className="border-y border-slate-100 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-px bg-slate-200 md:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 p-8 text-center md:p-12">
                <div className="mb-4 flex justify-center text-blue-600">
                  {stat.icon}
                </div>
                <div className="mb-1 text-3xl font-black text-slate-900 md:text-5xl">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT_STRATEGY */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* LEFT: VISUAL_ASSET */}
            <div className="relative aspect-square overflow-hidden border border-slate-200 bg-slate-100 shadow-2xl">
              <Image
                src="https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/About/About.png"
                alt="JP Visual Docs Expertise"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute bottom-6 left-6 z-20 bg-blue-600 p-6 text-white shadow-xl">
                <p className="text-sm font-black uppercase tracking-widest">
                  Since_2016
                </p>
                <p className="text-xs font-bold opacity-80">
                  JP VISUAL DOCS FOUNDED
                </p>
              </div>
            </div>

            {/* RIGHT: TEXT_MISSION */}
            <div>
              <div className="mb-8">
                <h2 className="mb-6 text-3xl font-black uppercase tracking-tighter text-slate-900 md:text-5xl">
                  EXPERTISE BEYOND <br />
                  <span className="text-blue-600">PAPERWORK.</span>
                </h2>
                <div className="space-y-6 text-slate-600">
                  <p className="font-medium leading-relaxed">
                    ตลอดระยะเวลา 8 ปีที่ผ่านมา <strong>JP VISUAL DOCS</strong>
                    ได้ถูกก่อตั้งขึ้นภายใต้อุดมการณ์ที่ต้องการเปลี่ยนความยุ่งยากของเอกสารราชการให้เป็นกระบวนการที่แม่นยำและเป็นระบบ
                  </p>
                  <p className="font-medium leading-relaxed">
                    เราเริ่มต้นจากการเป็นที่ปรึกษาเล็กๆ
                    จนก้าวสู่การเป็นผู้เชี่ยวชาญด้าน{" "}
                    <strong>Document Architecture</strong>{" "}
                    ที่ได้รับความไว้วางใจจากลูกค้ากว่า 1,800 รายทั่วโลก
                    ไม่ว่าจะเป็นการขอวีซ่าที่ซับซ้อน
                    หรือการแปลและรับรองเอกสารทางกฎหมาย
                  </p>
                </div>
              </div>

              {/* MISSION_CARDS */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-blue-500">
                  <Target className="mb-4 text-blue-600" size={24} />
                  <h4 className="mb-2 text-sm font-black uppercase">
                    Core_Mission
                  </h4>
                  <p className="text-xs font-bold leading-relaxed text-slate-400">
                    สร้างโอกาสความสำเร็จสูงสุดในทุกคำขอของลูกค้า
                  </p>
                </div>
                <div className="border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-blue-500">
                  <ShieldCheck className="mb-4 text-blue-600" size={24} />
                  <h4 className="mb-2 text-sm font-black uppercase">
                    Data_Integrity
                  </h4>
                  <p className="text-xs font-bold leading-relaxed text-slate-400">
                    รักษาความปลอดภัยของข้อมูลลูกค้าประดุจความลับทางราชการ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST_PROTOCOL */}
      <section className="border-t border-slate-200 bg-slate-50 py-24">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <div className="mb-8 flex justify-center text-blue-600">
            <Award size={48} strokeWidth={1} />
          </div>
          <h3 className="mb-6 text-3xl font-black uppercase tracking-tighter text-slate-900">
            "คุณภาพคือสัญญา <br /> ความสำเร็จคือมาตรฐานของเรา"
          </h3>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            — JP VISUAL DOCS Executive Team
          </p>
        </div>
      </section>
    </div>
  )
}
