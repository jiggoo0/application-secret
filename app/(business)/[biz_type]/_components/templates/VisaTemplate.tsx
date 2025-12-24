// app/(business)/[biz_type]/_components/templates/VisaTemplate.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL: Visa Strategic Template
// Role: เทมเพลตนำเสนอบริการวีซ่า (Industrial Neobrutalism)
// ----------------------------------------------------

import React from 'react';
import { ShieldCheck, Globe, FileText } from 'lucide-react'; // ✅ ลบ ArrowDown ออกเพื่อแก้ Warning
import styles from './VisaStyle.module.css';

export default function VisaTemplate() {
  return (
    <div className="bg-white selection:bg-yellow-400 selection:text-black">
      {/* 🏗️ Hero Section: จัดการโดย CSS Modules */}
      <section className={styles.heroSection}>
        <div className="mx-auto max-w-7xl">
          <span className={styles.statusTag}>SECURE_ACCESS_GRANTED</span>
          <h1 className={styles.title}>
            Visa <br />
            <span className="text-yellow-500">Mastery</span>
          </h1>
          <div className={styles.description}>
            บริการจัดการเอกสารขอวีซ่าระดับพรีเมียม วิเคราะห์เคสแบบเจาะลึก
            เน้นความเนียนของเอกสารสนับสนุนและการจัดเรียง Profile ให้ผ่านเกณฑ์พิจารณา
          </div>

          <div className="mt-12 flex gap-4">
            <div className="bg-slate-100 px-3 py-1 font-mono text-[10px] font-bold uppercase text-slate-400">
              LOG: VISA_SERVICE_ONLINE
            </div>
            <div className="bg-yellow-50 px-3 py-1 font-mono text-[10px] font-bold uppercase text-yellow-600">
              ENCRYPTION: ACTIVE
            </div>
          </div>
        </div>
      </section>

      {/* 📦 Services Sub-section: ใช้ Tailwind สำหรับ Grid Layout */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: Globe,
              label: 'Schengen_Consult',
              desc: 'วางแผนเส้นทางและเตรียมเอกสารวีซ่าเชงเก้นครบวงจร',
            },
            {
              icon: ShieldCheck,
              label: 'Profile_Hardening',
              desc: 'ปรับแต่งประวัติและการเงินให้ดูแข็งแกร่งและน่าเชื่อถือ',
            },
            {
              icon: FileText,
              label: 'Document_Factory',
              desc: 'จัดการจองตั๋ว/โรงแรม และเอกสารสนับสนุนแบบไร้รอยต่อ',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border-2 border-slate-900 p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <item.icon size={32} className="mb-6 text-yellow-500" strokeWidth={3} />
              <h3 className="mb-3 text-xl font-black uppercase italic">{item.label}</h3>
              <p className="text-sm font-bold leading-relaxed text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📟 Call To Action: ส่วนปฏิบัติการท้ายหน้า */}
      <section className="bg-slate-900 py-16 text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-yellow-400">
          Ready to deploy your application?
        </p>
        <button className="bg-white px-10 py-5 text-2xl font-black uppercase italic text-slate-900 shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] transition-all active:translate-y-1 active:shadow-none">
          Connect_Agent_Now
        </button>
      </section>
    </div>
  );
}
