'use client';

import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

const CONTACT_DATA = [
  {
    icon: <Phone size={24} />,
    label: 'Hotline_Unit',
    value: '0XX-XXX-XXXX',
    sub: 'สายตรงเจ้าหน้าที่ผู้เชี่ยวชาญ',
  },
  {
    icon: <Mail size={24} />,
    label: 'Data_Transfer',
    value: 'contact@jp-visoul.com',
    sub: 'สำหรับการส่งเอกสารและโปรเจกต์',
  },
  {
    icon: <MapPin size={24} />,
    label: 'Base_Location',
    value: 'Bangkok, Thailand',
    sub: 'ศูนย์ปฏิบัติงานส่วนกลาง',
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* 🛡️ Authority Badge */}
      <div className="inline-flex items-center gap-3 border-2 border-slate-900 bg-yellow-400 px-4 py-2 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <ShieldCheck size={20} className="text-slate-900" strokeWidth={3} />
        <span className="font-mono text-xs font-black uppercase tracking-widest text-slate-900">
          Secure_Communication_Line
        </span>
      </div>

      <div className="grid gap-4">
        {CONTACT_DATA.map((item, idx) => (
          <div
            key={idx}
            className="group flex items-start gap-5 border-4 border-slate-900 bg-white p-6 transition-all hover:bg-slate-50"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-slate-900 bg-slate-900 text-yellow-400 shadow-neo-sm transition-colors group-hover:bg-blue-600 group-hover:text-white">
              {item.icon}
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {item.label}
              </p>
              <p className="text-xl font-black italic tracking-tighter text-slate-900 md:text-2xl">
                {item.value}
              </p>
              <p className="text-xs font-bold uppercase text-slate-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🕒 Operation Hours */}
      <div className="border-l-4 border-yellow-400 bg-slate-900 p-6 text-white">
        <div className="mb-2 flex items-center gap-2">
          <Clock size={16} className="text-yellow-400" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest">
            Active_Hours
          </span>
        </div>
        <p className="font-heading text-lg font-black italic tracking-tighter">
          จันทร์ - อาทิตย์: 09:00 - 21:00 (Ready_24/7_Support)
        </p>
      </div>
    </div>
  );
}
