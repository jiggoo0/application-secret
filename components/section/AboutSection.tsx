/** @format */

"use client"

import React from "react"
import { ArrowUpRight, CheckCircle2, ShieldCheck, Target } from "lucide-react"

/**
 * 📝 CORE_VALUES: Trusted Consultant Tone
 */
const coreValues = [
  {
    icon: ShieldCheck,
    title: "Legal Care",
    description: "ดูแลทุกขั้นตอนให้ถูกต้องตามระเบียบกงสุลและกฎหมายอย่างถี่ถ้วน",
  },
  {
    icon: ShieldCheck, // Changed to consistent industrial icon
    title: "Personal Privacy",
    description: "รักษาความลับและข้อมูลส่วนบุคคลของคุณด้วยมาตรการที่เข้มงวด",
  },
  {
    icon: Target,
    title: "Client Success",
    description:
      "มุ่งเน้นความสำเร็จของทุกคำร้อง เพื่อให้คุณได้รับผลลัพธ์ตามเป้าหมาย",
  },
]

/**
 * 🛰️ COMPONENT: AboutSection
 * นำเสนออัตลักษณ์ผ่านภาษาที่สร้างความสบายใจ (Industrial_Sharp_V1)
 * 🛡️ ENFORCEMENT: Named Export & Rounded-None
 */
export const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 selection:bg-brand selection:text-slate-950">
      {/* 🧩 Background Elements */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute left-[8%] top-0 h-full w-[1px] bg-slate-100" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
          {/* 🏛️ LEFT: IDENTITY & VISION */}
          <div className="sticky top-24 lg:col-span-5">
            <div className="mb-6 inline-flex items-center gap-2">
              <div className="h-[2px] w-10 bg-brand" />
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Who_We_Are
              </span>
            </div>

            <h2 className="mb-8 text-5xl font-black uppercase leading-[0.9] tracking-tighter text-slate-950 md:text-6xl">
              Reliability <br />
              <span className="italic text-brand drop-shadow-[2px_2px_0px_#020617]">
                Redefined.
              </span>
            </h2>

            <div className="space-y-6 font-thai text-lg leading-relaxed text-slate-500">
              <p>
                เราคือที่ปรึกษาด้านวีซ่าและงานเอกสารที่ก่อตั้งขึ้นจากความตั้งใจที่ว่า
                <span className="font-bold text-slate-950">
                  {" "}
                  "ความถูกต้องแม่นยำ คือจุดเริ่มต้นของทุกความสำเร็จ"
                </span>
              </p>
              <p>
                ด้วยประสบการณ์กว่า 8 ปี เราไม่ได้เพียงแค่จัดเตรียมเอกสาร
                แต่เราช่วยวางแผนและดูแลในทุกรายละเอียด
                เพื่อให้ทุกความตั้งใจของคุณ ดำเนินไปได้อย่างราบรื่นที่สุด
                ช่วยลดความกังวลและรักษาเวลาที่มีค่าของคุณ
              </p>
            </div>

            <button className="group mt-10 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-950 transition-all">
              <span className="border-b-2 border-slate-950 pb-1 group-hover:border-brand">
                ทำความรู้จักเราให้มากขึ้น
              </span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* 🛠️ RIGHT: STRUCTURAL EXCELLENCE */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-px border-2 border-slate-950 bg-slate-950 shadow-sharp md:grid-cols-2">
              {/* Feature Box: Heritage */}
              <div className="flex min-h-[300px] flex-col justify-between bg-white p-10">
                <div className="font-mono text-4xl font-black italic text-brand">
                  08
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-slate-950">
                    Years of Trust
                  </h3>
                  <p className="font-thai text-sm leading-relaxed text-slate-500">
                    สะสมประสบการณ์ผ่านการดูแลเคสที่หลากหลายกว่า 2,500 ราย
                    ทั่วโลก
                  </p>
                </div>
              </div>

              {/* Feature Box: Worldwide Reach */}
              <div className="flex min-h-[300px] flex-col justify-between bg-slate-950 p-10 text-white">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 overflow-hidden rounded-none border-2 border-slate-950 bg-slate-800"
                    />
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-none border-2 border-slate-950 bg-brand text-[10px] font-black italic text-slate-950">
                    +
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-brand">
                    Worldwide Reach
                  </h3>
                  <p className="font-thai text-sm leading-relaxed text-slate-300">
                    เครือข่ายความร่วมมือและพันธมิตรที่ครอบคลุมกว่า 50 ประเทศ
                  </p>
                </div>
              </div>

              {/* Core Values Row (Span 2) */}
              <div className="bg-[#FAFAFA] p-10 md:col-span-2 lg:p-12">
                <h4 className="mb-10 font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                  Core_Infrastructure
                </h4>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {coreValues.map((value, i) => (
                    <div key={`value-${i}`} className="space-y-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-none border-2 border-slate-950 bg-white text-slate-950 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]">
                        <value.icon size={20} />
                      </div>
                      <h5 className="text-sm font-black uppercase tracking-tight text-slate-950">
                        {value.title}
                      </h5>
                      <p className="font-thai text-xs leading-relaxed text-slate-500">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Certification Badge */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <div className="flex items-center gap-4 opacity-50 grayscale">
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Standard_Quality
                </span>
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Privacy_Secured
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 size={14} />
                <span className="font-mono text-[9px] font-black uppercase italic tracking-widest">
                  Ready_to_Serve
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
