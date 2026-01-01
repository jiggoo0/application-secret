/** @format */
'use client'

import React, { useState } from 'react'
import { createLead } from '@/app/actions/lead-actions'
import { Loader2, SendHorizontal, ShieldCheck, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactLeadPayload {
  full_name: string
  email: string
  phone: string
  service_type: string
  details: string
}

// ปรับ Label ให้ดูเป็นทางการและชัดเจนขึ้น
const SERVICE_OPTIONS = [
  { id: 'GENERAL_INQUIRY', label: 'ปรึกษาข้อมูลเอกสาร' },
  { id: 'PROFILE_READY', label: 'วางโครงสร้างโปรไฟล์' },
  { id: 'APPEAL_CONSULT', label: 'วิเคราะห์เคสปฏิเสธ' },
  { id: 'CORPORATE_DOCUMENT', label: 'เอกสารรับรองธุรกิจ' },
]

export const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [selectedService, setSelectedService] = useState('GENERAL_INQUIRY')
  const [ticketId, setTicketId] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload: ContactLeadPayload = {
      full_name: String(formData.get('full_name')),
      email: String(formData.get('email')),
      phone: String(formData.get('phone')),
      service_type: selectedService,
      details: String(formData.get('details')),
    }

    try {
      const result = await createLead(payload)
      if (result?.success) {
        setTicketId(result.ticketId || 'REF-PENDING')
        setIsSent(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const inputStyle =
    'w-full border-2 border-slate-200 bg-white p-4 text-sm font-bold text-[#020617] placeholder:text-slate-400 outline-none focus:border-[#020617] transition'

  if (isSent) {
    return (
      <div className="space-y-8 border-[4px] border-slate-950 bg-white p-12 text-center shadow-sharp">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <ShieldCheck size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[#020617]">
            Data_Received<span className="text-[#FCDE09]">.</span>
          </h3>
          <p className="text-sm font-bold text-slate-500">บันทึกข้อมูลเข้าสู่ระบบเรียบร้อยแล้ว</p>
        </div>

        <div className="mx-auto max-w-xs border-2 border-slate-950 bg-slate-50 p-6 shadow-sharp-sm">
          <p className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            Reference_ID
          </p>
          <p className="font-mono text-2xl font-black text-[#020617]">{ticketId}</p>
        </div>

        <p className="mx-auto max-w-sm text-xs font-bold leading-relaxed text-slate-600">
          กรุณาตรวจสอบอีเมลของคุณเพื่อกดยืนยันตัวตน <br />
          ทีมงานจะเริ่มวิเคราะห์เคสหลังจากได้รับการยืนยันสำเร็จ
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-thai">
      {/* PERSONAL INFO */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            Full_Name
          </label>
          <input
            required
            name="full_name"
            placeholder="ระบุชื่อ-นามสกุลจริง"
            className={inputStyle}
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            Email_Address
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="email@example.com"
            className={cn(inputStyle, 'border-[#FCDE09]')}
          />
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            Phone_Number
          </label>
          <input
            required
            name="phone"
            placeholder="0XX-XXX-XXXX"
            className={cn(inputStyle, 'font-mono')}
          />
        </div>
        <div className="flex items-end pb-1">
          <div className="flex w-full items-center gap-3 border-2 border-dashed border-slate-200 bg-slate-50 p-4 font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
            <ShieldCheck size={18} className="text-emerald-500" />
            End-to-End Encryption
          </div>
        </div>
      </div>

      {/* SERVICE TYPE */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-[#020617]">
          <Activity size={16} className="text-[#FCDE09]" /> Select_Service_Type
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_OPTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedService(s.id)}
              className={cn(
                'border-2 p-4 text-left transition-all',
                selectedService === s.id
                  ? 'border-[#020617] bg-[#020617] text-[#FCDE09] shadow-sharp-sm'
                  : 'border-slate-200 bg-white hover:border-[#020617]',
              )}
            >
              <p className="text-[11px] font-black uppercase leading-tight">{s.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* DETAILS */}
      <div className="space-y-2">
        <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
          Case_Details
        </label>
        <textarea
          required
          name="details"
          rows={5}
          placeholder="ระบุรายละเอียดเบื้องต้น หรือปัญหาที่ต้องการให้ทีมงานดูแล..."
          className={cn(inputStyle, 'resize-none')}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        disabled={loading}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-slate-950 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#FCDE09] transition-all hover:bg-slate-900 disabled:opacity-60"
      >
        <div className="relative z-10 flex items-center gap-3">
          {loading ? <Loader2 className="animate-spin" /> : 'Execute_Submission'}
          {!loading && (
            <SendHorizontal size={16} className="transition-transform group-hover:translate-x-1" />
          )}
        </div>
      </button>
    </form>
  )
}
