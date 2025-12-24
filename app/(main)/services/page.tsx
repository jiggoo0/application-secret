// app/services/page.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL: Services Page (ฉบับเจ้าป่า)
// Design: Industrial Neobrutalism (Slate-900 borders, 0px radius)
// Fix: Removed unused Metadata & formatted space for Prettier
// ----------------------------------------------------

import ServiceList from '@/components/ServiceList';
import { Terminal, ChevronRight, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const CAPABILITY_STATS = [
    { label: 'ระยะเวลาดำเนินการ', value: '24-48 ชม.' },
    { label: 'ความแม่นยำของข้อมูล', value: '100%' },
    { label: 'มาตรฐานความลับ', value: 'กฎเหล็ก' },
    { label: 'หน่วยสนับสนุน', value: '24/7' },
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-yellow-400 selection:text-black">
      {/* 🛠️ Breadcrumb */}
      <nav className="border-b-2 border-slate-900 bg-slate-50 px-4 py-3" aria-label="System Path">
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <Link href="/" className="transition-colors hover:text-primary">
            ROOT
          </Link>
          <ChevronRight size={12} strokeWidth={3} />
          <span className="text-slate-900">รายการบริการ_SERVICE_UNIT</span>
        </div>
      </nav>

      {/* 🚀 Page Header */}
      <section className="border-b-2 border-slate-900 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Terminal size={20} strokeWidth={3} />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em]">
                  Operational_Capabilities
                </span>
              </div>
              <h1 className="font-heading text-5xl font-black uppercase italic tracking-tighter text-slate-900 md:text-8xl">
                OUR <span className="text-primary">SERVICES</span>
              </h1>
              <p className="font-sans text-lg font-bold leading-relaxed text-slate-600 md:text-xl">
                บริการจัดการเอกสารและโซลูชันธุรกิจระดับสูง
                <span className="mt-2 block text-sm italic text-slate-400">
                  ** เน้นความแม่นยำ ความรวดเร็ว และการรักษาความลับสูงสุดเป็นกฎเหล็ก **
                </span>
              </p>
            </div>

            {/* สถานะระบบ (Status Indicator) */}
            <div className="hidden border-2 border-slate-900 bg-slate-50 p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] lg:block">
              <div className="flex items-center gap-4">
                <div className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                    System_Status
                  </span>
                  <span className="font-mono text-[11px] font-black uppercase text-slate-900">
                    พร้อมปฏิบัติงาน (ACTIVE)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 รายการบริการ */}
      <div className="bg-slate-50/30">
        <ServiceList />
      </div>

      {/* 📊 Capability Stats */}
      <section className="border-t-2 border-slate-900 bg-slate-900 py-12 text-white">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {CAPABILITY_STATS.map((stat, i) => (
              <div key={i} className="space-y-1 border-l-2 border-primary pl-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  {stat.label}
                </p>
                <p className="font-heading text-2xl font-black uppercase italic tracking-tighter">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📞 Help Section */}
      <section className="mx-auto max-w-4xl px-4 py-24">
        <div className="relative space-y-8 overflow-hidden border-4 border-slate-900 bg-white p-10 text-center shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
          <Cpu className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 text-slate-100 opacity-50" />

          <div className="relative z-10 space-y-4">
            <h3 className="font-heading text-4xl font-black uppercase italic tracking-tighter text-slate-900">
              ต้องการโซลูชันเฉพาะทาง?
            </h3>
            <p className="mx-auto max-w-xl font-sans text-base font-bold text-slate-500">
              หากบริการข้างต้นไม่ตรงกับความต้องการเฉพาะของคุณ
              สามารถติดต่อทีมงานเจ้าป่าโดยตรงเพื่อขอรับคำปรึกษาและออกแบบโครงการพิเศษ
            </p>
          </div>

          <div className="relative z-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border-2 border-slate-900 bg-slate-900 px-10 py-5 font-heading text-sm font-black uppercase italic tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] transition-all hover:bg-primary hover:text-slate-900 active:translate-y-1 active:shadow-none"
            >
              ติดต่อเจ้าหน้าที่ผู้เชี่ยวชาญ
              <ShieldAlert size={18} className="transition-transform group-hover:rotate-12" />
            </Link>
          </div>

          <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
            Priority_Protocol_Enabled {' // '} ข้อมูลของคุณเป็นความลับ
          </p>
        </div>
      </section>
    </main>
  );
}
