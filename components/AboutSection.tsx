'use client';

/**
 * 🏗️ JP-VISOUL: AboutSection (Professional Circle Edition)
 * Design: Industrial Neobrutalism
 * Content: เน้นความน่าเชื่อถือในฐานะ "เจ้าป่า" ตัวจริงของวงการ
 */
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Image from 'next/image';
import { ShieldCheck, Terminal, Activity, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

// 🎬 Animation Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutSection() {
  const badgeContent = [
    { text: 'ชั่วโมงบิน 8 ปี+', icon: <Activity size={12} /> },
    { text: 'จบงาน ลบข้อมูลทิ้ง', icon: <Lock size={12} /> },
    { text: 'งานเนียนตามสั่ง', icon: <Zap size={12} /> },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 mx-auto max-w-[1440px] overflow-hidden px-4 py-24 text-slate-900"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center"
      >
        {/* 🧾 Content Column */}
        <motion.div variants={fadeInUp} className="flex flex-col space-y-8">
          <header className="border-l-8 border-slate-900 pl-6">
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              <Terminal size={14} strokeWidth={3} />
              <span>THE_OPERATOR_LOG_V4</span>
            </div>
            <h2
              id="about-title"
              className="font-heading text-5xl font-black uppercase italic tracking-tighter text-slate-900 md:text-7xl"
            >
              ABOUT <span className="text-primary">JAO-PA</span>
            </h2>
          </header>

          <div className="space-y-6 font-sans text-base font-medium leading-relaxed text-slate-600">
            <p className="border-b-2 border-slate-100 pb-4">
              <strong className="uppercase italic text-slate-900">JP-VISOUL</strong> ดำเนินงานโดย
              <span className="ml-1 inline-block -rotate-1 transform border-2 border-slate-900 bg-yellow-200 px-2 py-1 font-bold italic text-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                “เจ้าป่า”
              </span>{' '}
              ที่ปรึกษาเบื้องหลังการจัดการเอกสารและโปรไฟล์เฉพาะทาง
            </p>

            <p className="font-bold text-slate-800">
              ชื่อที่คนในวงการไว้ใจมาตลอด 8 ปี เราไม่ได้แค่ทำเอกสาร
              แต่เราช่วยจัดระเบียบข้อมูลใหม่ให้มีความน่าเชื่อถือและถูกต้องตามมาตรฐาน
              เพื่อให้คุณได้รับโอกาสและผลลัพธ์ที่ควรจะได้ ภายใต้การทำงานที่แม่นยำและรวดเร็ว
            </p>

            {/* 🛡️ Privacy Protocol Box: กฎเหล็กของเจ้าป่า */}
            <div className="group relative overflow-hidden border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <div className="absolute right-0 top-0 bg-primary px-3 py-1 text-[10px] font-black uppercase italic text-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                STANDARD_PROTOCOL
              </div>
              <p className="relative z-10 text-lg font-bold italic leading-tight">
                &quot;ความลับของลูกค้าคือ{' '}
                <span className="text-primary underline decoration-2 underline-offset-4">
                  กฎข้อแรก
                </span>{' '}
                ที่ทางทีมงานผมยึดปฏิบัติอย่างเคร่งครัด จบงานคือลบทิ้ง ไม่มีคำว่ารั่วไหล
                นี่คือมาตรฐานเดียวที่ผมยอมรับ... เจ้าป่า&quot;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-white shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
                  <ShieldCheck className="text-slate-900" size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    THE_FOUNDER
                  </p>
                  <p className="text-sm font-black uppercase text-primary">JAO-PA (JP-VISOUL)</p>
                </div>
              </div>
            </div>
          </div>

          {/* 🏷️ INDUSTRIAL TAGS */}
          <div className="flex flex-wrap gap-3 pt-4">
            {badgeContent.map((item) => (
              <motion.div
                key={item.text}
                whileHover={{ y: -3, x: -3 }}
                className="flex cursor-default items-center gap-2 border-2 border-slate-900 bg-white px-5 py-2 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-colors hover:bg-slate-50"
              >
                <span className="text-primary">{item.icon}</span>
                <span className="text-[12px] font-black uppercase tracking-tighter text-slate-900">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="pt-6">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-4 overflow-hidden border-2 border-slate-900 bg-slate-900 px-12 py-6 font-heading font-black uppercase italic tracking-widest text-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 text-lg">
                ดีลงานตรงกับเจ้าป่า <Terminal size={20} strokeWidth={3} />
              </span>
              <div className="absolute inset-0 translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0"></div>
            </Link>
          </div>
        </motion.div>

        {/* 🖼️ Visual Column */}
        <motion.div variants={fadeInUp} className="relative flex items-center justify-center py-12">
          <div className="group relative border-4 border-slate-900 bg-white p-5 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            ></div>

            <div className="absolute -left-4 -top-4 h-12 w-12 border-l-4 border-t-4 border-primary"></div>
            <div className="absolute -bottom-4 -right-4 h-12 w-12 border-b-4 border-r-4 border-primary"></div>

            <div className="relative h-[500px] w-full overflow-hidden border-2 border-slate-900 contrast-125 grayscale transition-all duration-500 group-hover:contrast-100 group-hover:grayscale-0 md:w-[420px]">
              <Image
                src="/images/เจ้าป่า.webp"
                alt="JAO-PA: JP-VISOUL Founder"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 bg-slate-900 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                FOUNDER_ASSET
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4 rotate-3 transform border-4 border-slate-900 bg-primary px-6 py-2 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
                OFFICER: JP_MGMT_01
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
