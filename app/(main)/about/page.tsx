// app/about/page.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL: About Page (ฉบับเจ้าป่า)
// Design: Industrial Neobrutalism Layout
// ----------------------------------------------------

import type { Metadata } from 'next'; // แก้ไข: ใช้ type-only import
import AboutSection from '@/components/AboutSection';
import { Terminal, ShieldAlert, Activity, Lock, Database } from 'lucide-react';

/**
 * 🔍 Metadata (SEO Config)
 */
export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | JP-VISOUL',
  description:
    'ทำความรู้จักกับหน่วยประมวลผลเอกสารและทีมงานเบื้องหลัง JP-VISOUL กฎเหล็กและความปลอดภัยคือหัวใจของเรา',
};

export default function AboutPage() {
  const PERFORMANCE_LOGS = [
    { label: 'อัตราความสำเร็จ (Success_Rate)', value: '99.9%' },
    { label: 'เอกสารที่ตรวจสอบ (Verified_Docs)', value: '5,000+' },
    { label: 'ระดับความปลอดภัย (Security_Tier)', value: 'LEVEL_4' },
    { label: 'ความเร็วการตอบสนอง (Response)', value: '< 120_MIN' },
  ];

  return (
    <main className="min-h-screen bg-white pb-20 selection:bg-yellow-400 selection:text-black">
      {/* 🛠️ System Status Header */}
      <div className="border-b-2 border-slate-900 bg-slate-50 px-4 py-3">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-primary" strokeWidth={3} />
            <span className="animate-pulse text-slate-900">STATUS: OPERATIONAL_READY</span>
          </div>
          <div className="hidden font-mono sm:block">
            IDENT_PATH: ROOT/INTERNAL/ABOUT_SYSTEM_V.4
          </div>
        </div>
      </div>

      {/* 🧩 Core About Content */}
      <AboutSection />

      {/* 📊 Industrial Stats Section */}
      <section className="border-y-4 border-slate-900 bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="mb-12 flex items-center gap-4">
            <Database size={24} className="text-primary" />
            <h2 className="font-heading text-2xl font-black uppercase italic tracking-tighter">
              System_Performance_Log
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
            {PERFORMANCE_LOGS.map((stat, i) => (
              <div
                key={`stat-${i}`}
                className="group border-l-4 border-primary pl-6 transition-all hover:border-white"
              >
                <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500 transition-colors group-hover:text-primary">
                  {stat.label}
                </p>
                <p className="font-heading text-4xl font-black uppercase italic tracking-tighter md:text-5xl">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚠️ Protocol & Data Protection */}
      <section className="mx-auto max-w-5xl px-4 py-24">
        <div className="relative overflow-hidden border-4 border-slate-900 bg-white p-10 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          {/* Background Decor */}
          <div className="pointer-events-none absolute -right-8 -top-8 rotate-12 opacity-[0.03]">
            <Lock size={200} />
          </div>

          <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row">
            <div className="bg-slate-900 p-4 text-white shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
              <ShieldAlert size={48} strokeWidth={2.5} />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                  Security_Protocol
                </span>
                <h3 className="font-heading text-3xl font-black uppercase italic tracking-tighter text-slate-900">
                  Data_Integrity_Protocol
                </h3>
              </div>

              <div className="space-y-4 font-sans text-base font-bold leading-relaxed text-slate-600">
                <p>
                  ข้อมูลและเอกสารลูกค้าทั้งหมดจะถูกเข้าถึงโดยเจ้าหน้าที่ที่ได้รับอนุญาตเท่านั้น
                  เรามีมาตรการ{' '}
                  <span className="text-slate-900 underline decoration-primary decoration-4 underline-offset-4">
                    ทำลายทิ้งทันที (Permanent Deletion)
                  </span>
                  หลังสิ้นสุดกระบวนการทำงาน
                </p>
                <p className="border-l-4 border-slate-900 bg-slate-100 p-4 italic text-slate-900 shadow-sm">
                  &quot;เพราะเรายึดถือความปลอดภัยในระดับอุตสาหกรรม (Industrial-Grade Privacy)
                  ข้อมูลของคุณคือหัวใจสำคัญที่เราต้องปกป้อง&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="h-px flex-grow bg-slate-200" />
                <Terminal size={16} className="text-slate-300" />
                <div className="h-px flex-grow bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
