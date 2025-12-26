import React from "react"
import { ShieldCheck, EyeOff, Trophy, Network, Quote } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  const coreValues = [
    {
      icon: <EyeOff className="text-blue-600" size={24} />,
      title: "CLIENT_CONFIDENTIALITY",
      desc: "กฎข้อแรกและสำคัญที่สุด: ความลับของลูกค้าคือสิ่งสูงสุดที่เรายึดถือเหนือสิ่งอื่นใด",
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
      desc: "ขับเคลื่อนด้วยทีมงานที่เก่งกาจและเป็นมืออาชีพ พร้อมจัดการทุกโจทย์ที่ยากที่สุด",
    },
  ]

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="absolute left-0 top-0 h-full w-1 bg-slate-900" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          {/* LEFT_CONTENT */}
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
                JP VISUAL & DOCS มุ่งมั่นที่จะ
                <span className="mx-2 text-slate-900 underline decoration-blue-600 underline-offset-4">
                  “ยกระดับธุรกิจทุกรูปแบบให้มีมาตรฐานระดับมืออาชีพ”
                </span>
              </p>
              <p className="text-base font-medium">
                เราคือทีมงานที่ช่วยให้ธุรกิจของคุณดูน่าเชื่อถือ มีมาตรฐาน
                และปลอดภัยสูงสุด ต่อทั้งผู้จ้างงานและผู้รับงาน
                แม้ธุรกิจจะอยู่นอกระบบกฎหมายทั่วไป
                แต่เรานำเสนอในแบบที่ดูดีและหาไม่ได้จากแหล่งข้อมูลสาธารณะ
              </p>
            </div>

            <div className="mt-12 border-t border-slate-100 pt-10">
              <div className="relative">
                <Quote className="absolute -left-4 -top-6 h-12 w-12 text-slate-50 opacity-10" />
                <p className="relative z-10 text-xl font-black italic tracking-tight text-slate-900">
                  "ผมไม่ใช่คนเก่งที่สุด แต่รับประกันได้ว่าทีมงานของผม
                  เก่งกาจและเป็นมืออาชีพแน่นอน"
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-900 p-2">
                    <Image
                      src="/images/เจ้าป่า.webp"
                      alt="เจ้าป่า"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover opacity-80 grayscale"
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

          {/* RIGHT_CONTENT */}
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

            <div className="mt-8 border-l-4 border-blue-600 bg-blue-50 p-8">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                Protocol_01
              </p>
              <p className="text-sm font-black uppercase leading-relaxed text-slate-900">
                เรายินดีร่วมงานกับทุกสายงาน
                ความลับของลูกค้าคือสิ่งสำคัญสูงสุดที่ไม่มีข้อยกเว้น
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
