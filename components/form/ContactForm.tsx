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

const SERVICE_OPTIONS = [
  { id: 'GENERAL_INQUIRY', label: 'ปรึกษาข้อมูลเทคนิค' },
  { id: 'PROFILE_READY', label: 'จัดทำโครงสร้างโปรไฟล์' },
  { id: 'APPEAL_CONSULT', label: 'วิเคราะห์เคสปฏิเสธ' },
  { id: 'CORPORATE_DOCUMENT', label: 'เอกสารรับรองพิเศษ' },
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
      <div className="space-y-6 rounded-md border-2 border-[#020617] bg-white p-12 text-center shadow-lg">
        <h3 className="text-2xl font-black uppercase text-[#020617]">Submission Successful</h3>
        <div className="mx-auto max-w-xs rounded-md border border-slate-200 bg-slate-50 p-4">
          <p className="font-mono text-xs uppercase text-slate-500">Reference ID</p>
          <p className="font-mono text-2xl font-black text-[#020617]">{ticketId}</p>
        </div>
        <p className="text-sm font-bold text-slate-600">
          ระบบได้รับข้อมูลเรียบร้อยแล้ว ทีมงานจะติดต่อกลับตามอีเมลที่ให้ไว้
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-thai">
      {/* PERSONAL INFO */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <input required name="full_name" placeholder="ชื่อ–นามสกุล" className={inputStyle} />
        <input
          required
          type="email"
          name="email"
          placeholder="email@example.com"
          className={cn(inputStyle, 'border-[#FCDE09]')}
        />
      </div>

      {/* CONTACT INFO */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <input
          required
          name="phone"
          placeholder="เบอร์โทรศัพท์"
          className={cn(inputStyle, 'font-mono')}
        />
        <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-4 font-mono text-xs uppercase text-slate-600">
          <ShieldCheck size={16} className="text-emerald-600" />
          Privacy Protected
        </div>
      </div>

      {/* SERVICE TYPE */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-xs font-black uppercase text-[#020617]">
          <Activity size={16} /> Service Type
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_OPTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedService(s.id)}
              className={cn(
                'rounded-md border-2 p-4 text-left text-sm font-black uppercase transition',
                selectedService === s.id
                  ? 'border-[#020617] bg-[#020617] text-white shadow-lg'
                  : 'border-slate-200 bg-white hover:border-[#020617] hover:shadow-sm',
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* DETAILS */}
      <textarea
        required
        name="details"
        rows={5}
        placeholder="รายละเอียดเคส"
        className={cn(inputStyle, 'resize-none rounded-md')}
      />

      {/* SUBMIT BUTTON */}
      <button
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-md bg-[#020617] py-5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-slate-900 disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" /> : 'Submit'}
        {!loading && <SendHorizontal size={16} />}
      </button>
    </form>
  )
}
