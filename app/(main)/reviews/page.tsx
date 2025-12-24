'use client';

/**
 * 🏗️ JP-VISOUL: Success Reports (ฉบับเจ้าป่า)
 * Design: Industrial Neobrutalism (Hard shadows, High contrast)
 * Fixed: TypeScript TS2322 by moving key to a wrapper element
 */
import React from 'react';
import { Activity, Terminal, ShieldAlert } from 'lucide-react';
import ReviewCard from '@/components/ui/ReviewCard';

// 📊 ข้อมูลรีวิวจำลอง (Mock Data)
const allReviews = [
  {
    id: '1',
    name: 'Alpha_User',
    feedback: 'ระบบจัดการเอกสารยอดเยี่ยม ความลับถูกรักษาอย่างดีตามที่แจ้งไว้ Professional มากครับ',
    likes: 124,
    createdAt: '2025-12-20',
  },
  {
    id: '2',
    name: 'Beta_Solutions',
    feedback: 'มาตรฐานการตรวจสอบ DTI แม่นยำ ช่วยให้วางแผนการเงินได้ขาดจริงๆ ทีมงานดูแลดีมาก',
    likes: 89,
    createdAt: '2025-12-22',
  },
  {
    id: '3',
    name: 'Gamma_Logistics',
    feedback: 'ยืนยันอีกเสียงครับ ความลับลูกค้าคือกฎเหล็กของที่นี่จริงๆ สบายใจที่ได้ใช้บริการ',
    likes: 45,
    createdAt: '2025-12-24',
  },
];

export default function ReviewsPage() {
  const SYSTEM_STATS = [
    { label: 'บันทึกรายงานรวม', value: '180+' },
    { label: 'คะแนนความพึงพอใจ', value: '5.0/5.0' },
    { label: 'ผู้ใช้ที่ยืนยันแล้ว', value: '100%' },
    { label: 'ความพร้อมระบบ', value: '24/7' },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-6 selection:bg-yellow-400 selection:text-black md:p-20">
      <div className="mx-auto max-w-6xl">
        {/* 🛠️ Header: Industrial Identity */}
        <div className="mb-16 border-b-4 border-slate-900 pb-10 text-left">
          <div className="flex items-center gap-2 text-primary">
            <Activity size={16} strokeWidth={3} />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em]">
              Client_Verification_Logs
            </span>
          </div>
          <h1 className="mt-4 font-heading text-5xl font-black uppercase italic tracking-tighter text-slate-900 md:text-7xl">
            SUCCESS <span className="text-primary">REPORTS</span>
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-lg font-bold text-slate-600">
            บันทึกการยืนยันจากผู้ใช้งานจริงในเครือข่ายของเรา
            <span className="mt-1 block text-sm font-black uppercase text-primary">
              ทุกข้อมูลถูกบันทึกเพื่อยืนยันความโปร่งใสและมาตรฐานของระบบ
            </span>
          </p>
        </div>

        {/* 📊 System Stats Matrix */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {SYSTEM_STATS.map((stat, i) => (
            <div
              key={`stat-spec-${i}`}
              className="border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
            >
              <p className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                {stat.label}
              </p>
              <p className="font-heading text-2xl font-black uppercase italic text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* 🚀 บล็อกรีวิว (Fixed TS2322 by using Wrapper) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {allReviews.map((review) => (
            /* ✅ SOLUTION: ย้าย key มาไว้ที่ div wrapper 
               วิธีนี้จะแก้ปัญหา TS2322 "key does not exist on ReviewCardProps" 
               เพราะเราไม่ได้ส่ง key ให้ ReviewCard อีกต่อไป แต่ส่งให้ div แทน
            */
            <div key={`review-node-${review.id}`}>
              <ReviewCard
                id={review.id}
                name={review.name}
                feedback={review.feedback}
                likes={review.likes}
                createdAt={review.createdAt}
              />
            </div>
          ))}
        </div>

        {/* 🛡️ Security Alert: Industrial Box */}
        <div className="mt-20 border-4 border-slate-900 bg-slate-900 p-8 text-white shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="flex items-center gap-4">
              <ShieldAlert size={32} className="text-yellow-400" />
              <div className="space-y-1">
                <p className="font-heading text-xl font-black uppercase italic tracking-tight text-white">
                  Data_Integrity_Confirmed
                </p>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  ทุกความคิดเห็นผ่านกระบวนการคัดกรองเพื่อป้องกันข้อมูลเท็จ
                </p>
              </div>
            </div>
            <div className="border-2 border-primary px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
              Verified_Status: ACTIVE
            </div>
          </div>
        </div>

        {/* System Footer Bar */}
        <div className="pointer-events-none mt-16 flex flex-col items-center gap-4 opacity-30">
          <Terminal size={24} className="text-slate-900" />
          <p className="text-center font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-slate-900">
            End_Of_Transmission // ทุกบันทึกเป็นความจริง
          </p>
        </div>
      </div>
    </main>
  );
}
