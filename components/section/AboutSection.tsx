/** @format */
"use client"

import React from "react"
import {
  ShieldCheck,
  EyeOff,
  Trophy,
  Network,
  Quote,
  History,
  CheckCircle2,
  Users,
} from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  const stats = [
    { label: "EXPERIENCE_YEARS", value: "08+", icon: <History size={16} /> },
    { label: "SUCCESS_DOCS", value: "2500+", icon: <CheckCircle2 size={16} /> },
    { label: "VERIFIED_CLIENTS", value: "1800+", icon: <Users size={16} /> },
    { label: "ACCURACY_RATE", value: "100%", icon: <ShieldCheck size={16} /> },
  ]

  const coreValues = [
    {
      icon: <EyeOff className="text-blue-600" size={24} />,
      title: "CLIENT_CONFIDENTIALITY",
      desc: "กฎข้อสำคัญที่สุด: ความลับของลูกค้าคือสิ่งสูงสุดที่เรายึดถือเหนือสิ่งอื่นใด",
    },
    {
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      title: "PROFESSIONAL_STANDARDS",
      desc: "ยกระดับธุรกิจทุกประเภทให้มีมาตรฐานระดับมืออาชีพ น่าเชื่อถือ และปลอดภัยสูงสุด",
    },
    {
      icon: <Trophy className="text-blue-600" size={24} />,
      title: "8_YEARS_EXPERIENCE",
      desc: "การันตีด้วยประสบการณ์ตรงกว่า 8 ปีในสายงานโครงสร้างเอกสารและกลยุทธ์เฉพาะทาง",
    },
    {
      icon: <Network className="text-blue-600" size={24} />,
      title: "EXPERT_TEAM",
      desc: "ขับเคลื่อนด้วยทีมงานที่เก่งกาจ พร้อมจัดการทุกโจทย์ที่ยากที่สุดในระบบ",
    },
  ]

  return (
    <section
      id="about-section"
      className="relative scroll-mt-20 overflow-hidden bg-white py-24 lg:py-32"
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-slate-900" />

      <div className="mx-auto max-w-7xl px-6">
        {/* 📊 STATS_GRID */}
        <div className="mb-20 grid grid-cols-2 gap-px border border-slate-100 bg-slate-100 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 text-center transition-colors hover:bg-slate-50"
            >
              <div className="mb-2 flex justify-center text-blue-600">
                {stat.icon}
              </div>
              <div className="text-2xl font-black text-slate-900 md:text-3xl">
                {stat.value}
              </div>
              <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="mb-10 flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">
                OUR_IDENTITY
              </span>
              <div className="h-[1px] w-24 bg-slate-200" />
            </div>

            <h2 className="mb-8 text-5xl font-black uppercase leading-[0.85] tracking-tighter text-slate-900 md:text-7xl">
              UPGRADING <br />
              <span className="text-3xl text-blue-600 md:text-5xl">
                PROFESSIONAL
              </span>{" "}
              <br />
              STANDARDS.
            </h2>

            <div className="space-y-6 text-lg font-bold leading-relaxed text-slate-500">
              <p>
                JP VISUAL & DOCS มุ่งมั่นที่จะ{" "}
                <span className="mx-2 text-slate-900 underline decoration-blue-600 underline-offset-4">
                  &quot;ยกระดับธุรกิจทุกรูปแบบ&quot;
                </span>
              </p>
              <p className="text-base font-medium">
                เราคือสถาปนิกด้านเอกสารที่ช่วยให้ธุรกิจของคุณดูน่าเชื่อถือและปลอดภัยสูงสุด
                แม้ในโจทย์ที่ยาก เรานำเสนอในแบบที่หาไม่ได้จากแหล่งข้อมูลสาธารณะ
              </p>
            </div>

            <div className="mt-12 border-t border-slate-100 pt-10">
              <div className="relative">
                <Quote className="absolute -left-4 -top-6 h-12 w-12 text-slate-50 opacity-10" />
                <p className="relative z-10 text-xl font-black italic tracking-tight text-slate-900">
                  &quot;ผมไม่ใช่คนเก่งที่สุด แต่รับประกันได้ว่าทีมงานของผม
                  เก่งกาจและเป็นมืออาชีพแน่นอน&quot;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden border-2 border-slate-900 bg-slate-900">
                    <Image
                      src="https://ksiobbrextlywypdzaze.supabase.co/storage/v1/object/public/user-uploads/About/About.png"
                      alt="Lead Architect"
                      fill
                      className="object-cover opacity-80 grayscale"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                      Lead_Architect
                    </p>
                    <p className="text-sm font-black uppercase text-slate-900">
                      BY . เจ้าป่า
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-1 border border-slate-900 bg-slate-900 sm:grid-cols-2">
              {coreValues.map((value, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white p-10 transition-all hover:bg-slate-50"
                >
                  <div className="mb-6 inline-block transition-transform duration-500 group-hover:rotate-[360deg]">
                    {value.icon}
                  </div>
                  <h3 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                    {value.title}
                  </h3>
                  <p className="text-xs font-bold leading-relaxed text-slate-500">
                    {value.desc}
                  </p>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
