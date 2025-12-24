import React from 'react';
import { Landmark, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import styles from './LoanStyle.module.css';

export default function LoanTemplate() {
  return (
    <div className={styles.wrapper}>
      {/* 🚀 Hero Section */}
      <section className={styles.hero}>
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-500/70">
              Financial_Infrastructure_Ready
            </span>
          </div>

          <h1 className={styles.vaultTitle}>
            Strategic <br />
            <span className={styles.highlight}>Loan_Injection</span>
          </h1>

          <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-slate-400">
            วิเคราะห์โปรไฟล์และจัดโครงสร้างเอกสารเพื่อการอนุมัติสินเชื่อธุรกิจ เน้นความกริบของ
            Statement และความถูกต้องตามหลักเกณฑ์ธนาคาร
          </p>

          <button className="group flex items-center gap-4 bg-emerald-500 px-8 py-4 font-black uppercase italic tracking-tighter text-slate-950 transition-all hover:bg-emerald-400">
            Consult_Direct_Agent
            <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* 📊 Features Grid */}
      <section className={styles.grid}>
        <div className={styles.card}>
          <Landmark className="mb-6 text-emerald-500" size={32} />
          <h3 className="mb-3 text-xl font-black uppercase italic">Bank_Compliance</h3>
          <p className="text-sm leading-loose text-slate-500">
            ตรวจสอบความสอดคล้องของเอกสารตามนโยบายเครดิตของสถาบันการเงินชั้นนำ
          </p>
        </div>

        <div className={styles.card}>
          <ShieldCheck className="mb-6 text-emerald-500" size={32} />
          <h3 className="mb-3 text-xl font-black uppercase italic">Privacy_Lock</h3>
          <p className="text-sm leading-loose text-slate-500">
            รักษาความลับทางการเงินของลูกค้าด้วยโปรโตคอลความปลอดภัยขั้นสูงสุด
          </p>
        </div>

        <div className={styles.card}>
          <Zap className="mb-6 text-emerald-500" size={32} />
          <h3 className="mb-3 text-xl font-black uppercase italic">Fast_Track</h3>
          <p className="text-sm leading-loose text-slate-500">
            กระบวนการจัดเตรียมเอกสารแบบเร่งด่วน พร้อมยื่นภายใน 72 ชั่วโมงหลังสรุปงาน
          </p>
        </div>
      </section>
    </div>
  );
}
