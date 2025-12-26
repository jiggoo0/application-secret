/** @format */
"use client"

import React from "react"
import {
  FileSearch,
  Globe2,
  Briefcase,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  Layers,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "visa-strategy",
      icon: <Globe2 size={32} />,
      title: "วางแผนวีซ่า",
      label: "บริการวางแผนและยื่นวีซ่า",
      description:
        "ช่วยวิเคราะห์โปรไฟล์ของคุณ วางแผนการยื่นวีซ่าให้แม่น ลดความเสี่ยงโดนปฏิเสธ",
      features: [
        "วีซ่าเชงเก้น (Schengen)",
        "วีซ่า USA / UK",
        "วีซ่า Australia / NZ",
        "วีซ่าคู่สมรส & Partner",
      ],
      price: "เริ่มต้น 3,500.-",
    },
    {
      id: "translation-pro",
      icon: <FileSearch size={32} />,
      title: "แปลเอกสาร",
      label: "บริการแปลเอกสาร & รับรอง",
      description:
        "แปลเอกสารราชการและกฎหมาย พร้อมรับรองกระทรวงต่างประเทศ (MFA) และสถานทูต",
      features: [
        "แปลเอกสารราชการทุกประเภท",
        "รับรองกงสุล (MFA)",
        "โนตารีพับลิค (Notary Public)",
        "แปลเอกสารธุรกิจ",
      ],
      price: "เริ่มต้น 500.- / หน้า",
    },
    {
      id: "legal-consult",
      icon: <Briefcase size={32} />,
      title: "นิติกรรม & ธุรกิจ",
      label: "จัดการเอกสารทางกฎหมาย",
      description:
        "ช่วยจัดเอกสารธุรกิจและกฎหมายสำหรับทำธุรกรรมในต่างประเทศหรือบริษัทข้ามชาติ",
      features: [
        "จดทะเบียนสมรสชาวต่างชาติ",
        "จดทะเบียนบริษัท",
        "พินัยกรรม / สัญญา",
        "บริการรับรองเอกสาร (Legalization)",
      ],
      price: "ประเมินตามงาน",
    },
  ]

  const workflowSteps = [
    { step: "01", label: "ปรึกษา", desc: "วิเคราะห์ความต้องการ & จุดเสี่ยง" },
    { step: "02", label: "วางแผน", desc: "วางโครงสร้างเอกสารให้ครบ" },
    { step: "03", label: "ดำเนินงาน", desc: "จัดการเอกสาร & ตรวจสอบคุณภาพ" },
    { step: "04", label: "ส่งมอบ", desc: "ส่งงานพร้อมใช้งานจริง" },
  ]

  return (
    <div className="flex flex-col bg-white">
      {/* 🏗️ HERO: Technical Background */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white lg:py-32">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="container relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <Layers className="animate-pulse text-blue-500" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">
                Service_v4.0
              </span>
            </div>
            <h1 className="mb-8 text-6xl font-black uppercase leading-[0.85] tracking-tighter md:text-8xl">
              บริการ <br />
              <span className="text-blue-600">ครบวงจร</span>
            </h1>
            <p className="text-lg font-bold uppercase leading-relaxed tracking-tight text-slate-400">
              เลือกบริการที่ออกแบบมาเพื่อคุณ <br />
              ทุกบริการรันตามมาตรฐานสูงสุดของ JP VISUAL DOCS
            </p>
          </div>
        </div>
      </section>

      {/* 🧩 SERVICE GRID: Industrial Borders */}
      <section className="relative -mt-12 pb-24 lg:pb-32">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 shadow-2xl lg:grid-cols-3">
            {serviceCategories.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col bg-white p-10 transition-all duration-300 hover:bg-slate-50 lg:p-14"
              >
                <div className="mb-10 inline-flex h-16 w-16 items-center justify-center bg-slate-900 text-blue-500 transition-all duration-500 group-hover:-rotate-12 group-hover:bg-blue-600 group-hover:text-white">
                  {item.icon}
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-[1px] w-4 bg-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                    {item.title}
                  </span>
                </div>
                <h3 className="mb-6 text-3xl font-black uppercase tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                  {item.label}
                </h3>
                <p className="mb-10 text-sm font-medium leading-relaxed text-slate-500">
                  {item.description}
                </p>

                {/* Image tag for visual structure of a professional document workflow */}

                <ul className="mb-12 space-y-4 border-t border-slate-100 pt-8">
                  {item.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-slate-600"
                    >
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-blue-500"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="mb-1 block text-[9px] font-black uppercase tracking-widest text-slate-400">
                      ราคา
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      {item.price}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="flex h-12 w-12 items-center justify-center border-2 border-slate-900 text-slate-900 transition-all hover:bg-slate-900 hover:text-white group-hover:scale-110"
                  >
                    <ArrowUpRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚡ WORKFLOW: Procedural Steps */}
      <section className="border-t border-slate-200 bg-slate-50 py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-sm font-black uppercase tracking-[0.5em] text-blue-600">
              ขั้นตอนทำงาน
            </h2>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 md:text-5xl">
              4 ขั้นตอนง่าย ๆ
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="group relative p-6 text-center">
                <div className="absolute -top-4 left-1/2 z-0 -translate-x-1/2 select-none text-6xl font-black text-slate-200 transition-colors group-hover:text-blue-100/50">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <h4 className="mb-2 text-sm font-black uppercase tracking-widest text-slate-900">
                    {step.label}
                  </h4>
                  <p className="text-[11px] font-bold uppercase leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡️ SECURITY MARQUEE */}
      <div className="relative overflow-hidden bg-blue-600 py-6 text-white">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="mx-8 flex items-center gap-4">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                ข้อมูลคุณปลอดภัย 100%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS For Marquee Animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
