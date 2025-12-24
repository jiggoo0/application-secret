'use client';

import React, { useState } from 'react'; // ✅ 1. เพิ่มการ Import React
import { Send, Terminal, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  // ✅ แก้ไข Type สำหรับ Event ให้ชัดเจน
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrate with API Action
    setTimeout(() => setLoading(false), 2000);
  };

  const inputStyles =
    'w-full border-4 border-slate-900 bg-white p-4 font-bold text-slate-900 outline-none placeholder:text-slate-300 focus:bg-yellow-50 focus:border-blue-600 transition-all';

  return (
    <div className="relative border-4 border-slate-900 bg-white p-8 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)]">
      {/* Form Header */}
      <div className="mb-8 space-y-2 border-b-2 border-slate-100 pb-6">
        <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <Terminal size={14} />
          <span>Deployment_Inquiry_Form</span>
        </div>
        <h3 className="font-heading text-3xl font-black uppercase italic tracking-tighter text-slate-900">
          ส่งรายละเอียด <span className="text-blue-600">โครงการ</span>
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-900">
              Full_Name
            </label>
            <input type="text" placeholder="ระบุชื่อ-นามสกุล" className={inputStyles} required />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-900">
              Contact_Number
            </label>
            <input type="tel" placeholder="0XXXXXXXXX" className={inputStyles} required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-900">
            Project_Type
          </label>
          <select className={inputStyles}>
            <option>ประมวลผลเอกสารธุรกิจ</option>
            <option>ยกระดับมาตรฐานโครงสร้างบริษัท</option>
            <option>ที่ปรึกษากลยุทธ์พิเศษ</option>
            <option>อื่นๆ (โปรดระบุในรายละเอียด)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-900">
            Mission_Description
          </label>
          <textarea
            rows={4}
            placeholder="รายละเอียดงานที่ต้องการให้เราจัดการ..."
            className={inputStyles}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden border-4 border-slate-900 bg-slate-900 py-5 font-heading text-sm font-black uppercase italic tracking-[0.2em] text-white transition-all hover:bg-blue-600 active:translate-y-1 active:shadow-none"
        >
          <span className="flex items-center justify-center gap-3">
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                Initialize_Request
                <Send
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </>
            )}
          </span>
        </button>

        {/* ✅ 2. แก้ไขจุดนี้: ย้ายคอมเมนต์ให้อยู่ในปีกกา หรือใช้เป็น Text ธรรมดา */}
        <p className="text-center font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
          {'// All_Data_Encrypted_And_Confidential //'}
        </p>
      </form>
    </div>
  );
}
