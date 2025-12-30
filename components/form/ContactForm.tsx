/** @format */

'use client'

import React, { useState } from 'react'
import { createLead } from '@/app/actions/lead-actions'
import {
  Loader2,
  SendHorizontal,
  ShieldCheck,
  Search,
  CheckCircle2,
  QrCode,
  LayoutGrid,
  History,
  FileText,
  Activity,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactLeadPayload {
  full_name: string
  email: string
  phone: string
  service_type: string
  details: string
}

const SERVICE_OPTIONS = [
  {
    id: 'GENERAL_INQUIRY',
    label: 'ปรึกษาข้อมูลเทคนิค',
    icon: Search,
    desc: 'เจาะลึกรายละเอียดและเงื่อนไขหน้างาน',
  },
  {
    id: 'PROFILE_READY',
    label: 'จัดทำโครงสร้างโปรไฟล์',
    icon: LayoutGrid,
    desc: 'ปรับปรุงเอกสารให้สอดคล้องตามเกณฑ์สากล',
  },
  {
    id: 'APPEAL_CONSULT',
    label: 'วิเคราะห์เคสปฏิเสธ',
    icon: History,
    desc: 'เจาะจุดบกพร่องและวางโครงสร้างใหม่เพื่อล้างประวัติ',
  },
  {
    id: 'CORPORATE_DOCUMENT',
    label: 'เอกสารรับรองพิเศษ',
    icon: FileText,
    desc: 'ยกระดับความน่าเชื่อถือสำหรับการยื่นระดับสูง',
  },
]

/**
 * 🛰️ COMPONENT: ContactForm
 * ✅ FIXED: ESLint error - ลบ 'MailCheck' ที่ไม่ได้ใช้งานออก
 * ✅ IMPROVED: ปรับ Contrast ของสีเทา (Slate) ให้เข้มขึ้นเพื่อแก้อาการตัวหนังสือจาง
 */
export const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [selectedService, setSelectedService] = useState('GENERAL_INQUIRY')
  const [ticketData, setTicketData] = useState({ id: '', name: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload: ContactLeadPayload = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service_type: selectedService,
      details: formData.get('details') as string,
    }

    try {
      const result = await createLead(payload)
      if (result.success) {
        setTicketData({
          id: (result as { ticketId?: string }).ticketId || 'REF-PENDING',
          name: payload.full_name,
        })
        setIsSent(true)
      }
    } catch (error) {
      console.error('❌ [CONTACT_ERROR]:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ ปรับสี placeholder จาก slate-300 เป็น slate-400 เพื่อความชัดเจน
  const inputStyles =
    'w-full rounded-none border-2 border-slate-200 bg-slate-50 p-4 font-bold text-[#020617] placeholder:text-slate-400 placeholder:font-normal outline-none transition-all focus:border-[#020617] focus:bg-white'

  if (isSent) {
    return (
      <div className="relative space-y-8 border-4 border-[#020617] bg-white px-8 py-16 text-center shadow-[12px_12px_0px_0px_#f1f5f9] duration-500 animate-in fade-in zoom-in">
        <div className="flex justify-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center border-2 border-[#020617] bg-[#FCDE09] shadow-[4px_4px_0px_0px_#020617]">
            <CheckCircle2 className="text-[#020617]" size={32} />
          </div>
          <div className="flex h-16 w-16 items-center justify-center border-2 border-[#020617] bg-white shadow-[4px_4px_0px_0px_#020617]">
            <QrCode className="text-[#020617]" size={32} />
          </div>
        </div>
        <div className="mx-auto max-w-sm space-y-4 font-thai">
          <h3 className="text-2xl font-black uppercase tracking-tight text-[#020617]">
            Submission_Successful.
          </h3>
          <div className="border-2 border-slate-200 bg-slate-50 p-6">
            <p className="mb-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
              Reference_ID
            </p>
            <p className="font-mono text-2xl font-black text-[#020617]">{ticketData.id}</p>
          </div>
          <p className="text-sm font-bold leading-relaxed text-slate-700">
            คุณ{' '}
            <span className="text-[#020617] underline decoration-[#FCDE09] decoration-2 underline-offset-4">
              {ticketData.name}
            </span>
          </p>
          <p className="text-[12px] font-bold leading-relaxed text-slate-500">
            ข้อมูลถูกส่งเข้าระบบเรียบร้อยแล้ว โปรดตรวจสอบอีเมลเพื่อยืนยันคำขอ
            และรอการติดต่อกลับจากที่ปรึกษาด้านเทคนิค
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-thai">
      {/* --- SECTION: PERSONAL --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
            Full_Name
          </label>
          <input required name="full_name" placeholder="ระบุชื่อ-นามสกุล" className={inputStyles} />
        </div>
        <div className="space-y-2">
          <label className="ml-1 font-mono text-[9px] font-black uppercase tracking-widest text-[#020617]">
            Official_Email
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="example@email.com"
            className={cn(inputStyles, 'border-[#FCDE09]')}
          />
        </div>
      </div>

      {/* --- SECTION: CONTACT --- */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
            Contact_Phone
          </label>
          <input
            required
            name="phone"
            placeholder="0XX-XXX-XXXX"
            className={cn(inputStyles, 'font-mono text-sm')}
          />
        </div>
        <div className="flex items-end pb-1">
          <div className="flex w-full items-center gap-3 border-l-4 border-[#10B981] bg-slate-50 px-5 py-4">
            <ShieldCheck size={16} className="text-[#10B981]" />
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-slate-600">
              Privacy_Governance_Active
            </span>
          </div>
        </div>
      </div>

      {/* --- SECTION: CATEGORY --- */}
      <div className="space-y-4">
        <label className="flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-widest text-[#020617]">
          <Activity size={14} /> Service_Categories
        </label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((item) => {
            const Icon = item.icon
            const isActive = selectedService === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedService(item.id)}
                className={cn(
                  'group relative border-2 p-5 text-left transition-all duration-300',
                  isActive
                    ? 'border-[#020617] bg-[#020617] text-white shadow-[6px_6px_0px_0px_#FCDE09]'
                    : 'border-slate-200 bg-white hover:border-[#020617]',
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'border-2 p-3 transition-colors',
                      isActive
                        ? 'border-[#FCDE09]/30 bg-[#FCDE09]/10'
                        : 'border-slate-200 bg-slate-50',
                    )}
                  >
                    <Icon size={20} className={isActive ? 'text-[#FCDE09]' : 'text-slate-500'} />
                  </div>
                  <div>
                    <p className="text-[13px] font-black uppercase tracking-tight">{item.label}</p>
                    <p
                      className={cn(
                        'mt-0.5 text-[9px] font-bold italic',
                        isActive ? 'text-slate-400' : 'text-slate-500',
                      )}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* --- SECTION: DETAILS --- */}
      <div className="space-y-2">
        <label className="ml-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
          Technical_Details
        </label>
        <textarea
          required
          name="details"
          rows={5}
          placeholder="ระบุรายละเอียดของเคสเพื่อให้ที่ปรึกษาประเมินและเตรียมข้อมูลเบื้องต้น..."
          className={cn(inputStyles, 'resize-none text-sm')}
        />
      </div>

      {/* --- ACTION: SUBMIT --- */}
      <button
        disabled={loading}
        className="group flex w-full items-center justify-center gap-4 bg-[#020617] py-7 font-black uppercase tracking-[0.3em] text-white shadow-sharp transition-all hover:bg-[#FCDE09] hover:text-[#020617] active:scale-[0.99] disabled:opacity-70"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin" size={20} />
            <span className="font-mono text-xs">PROCESSING...</span>
          </div>
        ) : (
          <>
            Submit for Technical Review
            <SendHorizontal size={20} className="transition-transform group-hover:translate-x-2" />
          </>
        )}
      </button>
    </form>
  )
}
