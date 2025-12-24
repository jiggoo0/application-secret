'use client';

/**
 * 🏗️ JP-VISOUL: DTI Evaluation Page
 * Design: Industrial Neobrutalism
 * Fix: Escaped quotes to pass ESLint (react/no-unescaped-entities)
 */
import DtiClientWrapper from '@/components/DtiClientWrapper';
import { Terminal, ShieldAlert, Activity, FileText, Lock } from 'lucide-react';

export default function DtiPage() {
  const saveEnabled = process.env.NEXT_PUBLIC_DTI_SAVE === 'true';

  return (
    <main className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
      {/* 🛠️ ส่วนหัว */}
      <header className="mb-12 border-l-8 border-slate-900 pl-6 md:pl-10">
        <div className="mb-2 flex items-center gap-2 text-primary">
          <Activity size={20} strokeWidth={3} />
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em]">
            DTI_EVALUATION_SYSTEM
          </span>
        </div>
        <h1 className="font-heading text-4xl font-black uppercase italic tracking-tighter text-slate-900 md:text-6xl">
          แบบประเมินความสามารถชำระหนี้ (DTI)
        </h1>
        <p className="mt-4 max-w-2xl font-sans text-lg font-bold italic text-slate-600">
          กรอกข้อมูลรายได้และภาระหนี้เพื่อตรวจสอบความเสี่ยงทางการเงินของคุณ และรับคำแนะนำ
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* 📊 คอลัมน์ซ้าย: หลักการและเกณฑ์ */}
        <aside className="space-y-6 lg:col-span-4">
          <section className="border-4 border-slate-900 bg-white p-6 shadow-neo">
            <div className="mb-6 flex items-center gap-2 border-b-2 border-slate-900 pb-3 text-slate-900">
              <FileText size={20} strokeWidth={3} />
              <h2 className="font-heading text-xl font-black uppercase italic tracking-tight">
                หลักการและเกณฑ์
              </h2>
            </div>

            <div className="space-y-6">
              <div className="text-sm font-bold leading-relaxed text-slate-700">
                แบบฟอร์มประเมินใช้หลักการคำนวณ DTI (Debt-to-Income Ratio) มาตรฐาน
                ข้อมูลที่ได้เป็นปัจจุบันและเชื่อถือได้
                ผลลัพธ์นี้เป็นเพียงการประเมินเบื้องต้นเพื่อช่วยคุณวางแผนการเงินเท่านั้น
              </div>

              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
                  สูตรการคำนวณ:
                </span>
                <div className="mt-2 border-2 border-slate-900 bg-slate-100 p-4 font-mono text-xs font-bold text-slate-900">
                  DTI = (ภาระหนี้รวมต่อเดือน ÷ รายได้รวมต่อเดือน) × 100
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
                  เกณฑ์การประเมินความเสี่ยง:
                </span>
                <ul className="mt-3 space-y-3 text-xs font-bold">
                  <li className="flex flex-col border-l-4 border-green-500 bg-green-50 p-2">
                    <span className="text-green-700">DTI ≤ 35%: ระดับปลอดภัย</span>
                    <span className="text-[10px] text-green-600/80">
                      (มีโอกาสผ่านการอนุมัติสินเชื่อสูง)
                    </span>
                  </li>
                  <li className="flex flex-col border-l-4 border-yellow-500 bg-yellow-50 p-2">
                    <span className="text-yellow-800">DTI 36–50%: ควรระมัดระวัง</span>
                    <span className="text-[10px] text-yellow-700/80">
                      (ควรวางแผนการเงินเพิ่มเติมก่อนขอสินเชื่อ)
                    </span>
                  </li>
                  <li className="flex flex-col border-l-4 border-red-500 bg-red-50 p-2">
                    <span className="text-red-700">DTI &gt; 50%: เสี่ยงสูง</span>
                    <span className="text-[10px] text-red-600/80">
                      (แนะนำให้ลดภาระหนี้หรือเพิ่มรายได้อย่างเร่งด่วน)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 🔐 นโยบายความลับ */}
          <section className="border-4 border-slate-900 bg-slate-900 p-6 text-white shadow-neo">
            <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-3">
              <Lock size={18} className="text-yellow-400" />
              <h2 className="font-heading text-xl font-black uppercase italic tracking-tight">
                CONFIDENTIALITY
              </h2>
            </div>
            <div className="space-y-3 text-sm font-bold">
              <p className="text-base text-cyan-400">นโยบายความลับของลูกค้า</p>
              <p className="text-slate-300">
                ข้อมูลส่วนบุคคลและเอกสารของท่านถือเป็นกฎหลักในการปฏิบัติงานของเรา
              </p>
              {/* ✅ FIXED: Escaped quotes using &quot; to satisfy ESLint */}
              <p className="text-lg uppercase italic text-yellow-400">
                &quot;ความลับของลูกค้าคือกฎเหล็ก (Iron Rule)&quot;
              </p>
            </div>
          </section>
        </aside>

        {/* 📝 คอลัมน์ขวา: ตัวแบบฟอร์ม */}
        <div className="lg:col-span-8">
          <div className="border-4 border-slate-900 bg-white p-6 shadow-neo md:p-10">
            <div className="mb-10 flex items-center gap-4">
              <Terminal size={24} strokeWidth={3} className="text-primary" />
              <h2 className="font-heading text-3xl font-black uppercase italic tracking-tighter text-slate-900 underline decoration-primary decoration-4">
                แบบฟอร์มประเมิน
              </h2>
            </div>
            <DtiClientWrapper saveEnabled={saveEnabled} />
          </div>

          {/* ⚖️ ประกาศสิทธิ์และข้อบังคับ */}
          <section className="mt-10 border-t-4 border-slate-900 pt-8">
            <div className="flex items-start gap-4">
              <ShieldAlert size={40} className="shrink-0 text-red-600" strokeWidth={3} />
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-black uppercase italic tracking-tight text-slate-900">
                  ประกาศสิทธิ์การใช้งานและข้อบังคับทางกฎหมาย
                </h3>
                <div className="space-y-4 font-sans text-sm font-bold leading-relaxed text-slate-600">
                  <p>
                    ฟังก์ชันการประเมินนี้เป็นบริการสาธารณะที่จัดทำขึ้นโดย **เจ้าป่า และทีมงาน
                    JP-VISOUL&DOSC** เปิดให้ผู้ใช้งานทำการประเมินตนเอง
                    **โดยไม่มีการเรียกเก็บค่าใช้จ่ายใด ๆ ทั้งสิ้น**
                  </p>
                  <p className="border-2 border-red-600 bg-red-50 p-4 text-red-600">
                    **การประกาศสิทธิ์ขาดและข้อห้าม:**
                    ฟังก์ชันนี้เป็นลิขสิทธิ์และทรัพย์สินทางปัญญาภายใต้
                    <span className="ml-1 underline">https://www.jpvisouldocs.online/</span>
                    **ไม่อนุญาตให้บุคคลหรือหน่วยงานใดนำลิงก์หรือส่วนหนึ่งส่วนใดไปแอบอ้าง อ้างสิทธิ์
                    หรือแสวงหารายได้ในทุกรูปแบบ**
                    การละเมิดสิทธิ์จะถูกดำเนินการตามกฎหมายสูงสุดและทันทีโดยไม่มีการผ่อนผัน
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
