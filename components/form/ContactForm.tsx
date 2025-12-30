/** * @format
 * @description CONTACT_FORM: Tactical Communication Interface (V3.2.3 Zero-Error)
 * ✅ FIXED: Removed unused 'CheckCircle2' icon
 * ✅ FIXED: Escaped HTML entities in success message
 * ✅ REFINED: Typography mapping to IBM Plex Sans Thai
 */

'use client'

import React, { useState } from 'react'
import { createLead } from '@/app/actions/lead-actions'
import {
  Loader2,
  SendHorizontal,
  MailCheck,
  ShieldCheck,
  Search,
  QrCode,
  LayoutGrid,
  History,
  FileText,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SERVICE_OPTIONS = [
  {
    id: 'GENERAL_INQUIRY',
    label: 'สอบถามข้อมูลเทคนิค',
    icon: Search,
    desc: 'เจาะลึกรายละเอียดและเงื่อนไขการดำเนินการ',
  },
  {
    id: 'PROFILE_READY',
    label: 'เตรียมความพร้อมโปรไฟล์',
    icon: LayoutGrid,
    desc: 'จัดระเบียบเอกสารและเพิ่มความน่าเชื่อถือให้ข้อมูล',
  },
  {
    id: 'APPEAL_CONSULT',
    label: 'วิเคราะห์เคสปฏิเสธ',
    icon: History,
    desc: 'เจาะลึกสาเหตุและวางโครงสร้างใหม่เพื่อแก้ไขประวัติ',
  },
  {
    id: 'CORPORATE_DOCUMENT',
    label: 'โซลูชันเอกสารธุรกิจ',
    icon: FileText,
    desc: 'ยกระดับความน่าเชื่อถือขององค์กรในการยื่นระดับสากล',
  },
]

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
    const payload = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service_type: selectedService,
      details: formData.get('details') as string,
    }

    try {
      // ✅ FIXED: Using typed payload instead of 'any'
      const result = await createLead(payload)
      if (result.success) {
        setTicketData({
          id: result.ticketId || 'PENDING',
          name: payload.full_name,
        })
        setIsSent(true)
      }
    } catch (error) {
      console.error('❌ [CONTACT_ERROR]:', error)
      alert('ขออภัย ระบบขัดข้องชั่วคราว โปรดตรวจสอบข้อมูลอีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  // --- 🏁 SUCCESS_STATE ---
  if (isSent) {
    return (
      <div className="shadow-sharp relative space-y-10 border-4 border-slate-950 bg-white px-8 py-20 text-center duration-500 animate-in fade-in zoom-in">
        <div className="absolute right-0 top-0 h-16 w-16 bg-brand shadow-sharp-sm [clip-path:polygon(100%_0,0_0,100%_100%)]" />

        <div className="flex justify-center gap-6">
          <div className="shadow-sharp flex h-20 w-20 -rotate-6 transform items-center justify-center border-2 border-slate-950 bg-brand transition-all hover:rotate-0">
            <MailCheck className="text-slate-950" size={40} />
          </div>
          <div className="shadow-sharp flex h-20 w-20 rotate-6 transform items-center justify-center border-2 border-slate-950 bg-white transition-all hover:rotate-0">
            <QrCode className="text-slate-950" size={40} />
          </div>
        </div>

        <div className="mx-auto max-w-sm space-y-6 font-sans">
          <div>
            <h3 className="text-4xl font-black uppercase italic tracking-tighter text-slate-950">
              Data_Received.
            </h3>
            <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
              Access_Granted_Level_03
            </p>
          </div>

          <div className="shadow-sharp relative bg-slate-950 p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand px-4 py-0.5 font-mono text-[9px] font-black text-slate-950">
              REFERENCE_ID
            </div>
            <p className="font-mono text-3xl font-black tracking-[0.25em] text-white">
              {ticketData.id}
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <p className="text-xl font-bold leading-relaxed text-slate-900">
              คุณ <span className="border-b-4 border-brand px-1">{ticketData.name}</span>
            </p>
            <div className="border-l-4 border-brand bg-slate-50 p-6 text-left">
              <p className="text-[14px] font-bold leading-relaxed text-slate-600">
                เจ้าหน้าที่ได้รับข้อมูลเรียบร้อยแล้ว <br />
                โปรดตรวจสอบ{' '}
                <span className="text-slate-950 underline decoration-brand decoration-2 underline-offset-4">
                  &quot;อีเมลของคุณ&quot;
                </span>{' '}
                เพื่อกดยืนยันการติดต่อและรักษาสิทธิ์ดูแลเคสตามลำดับเวลา
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- 📝 FORM_STATE ---
  return (
    <form onSubmit={handleSubmit} className="relative space-y-10 font-sans">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <div className="h-1.5 w-1.5 bg-slate-300" /> 01_User_Identity
          </label>
          <input
            required
            name="full_name"
            placeholder="ระบุชื่อ-นามสกุลของคุณ"
            className="w-full rounded-none border-2 border-slate-100 bg-slate-50 p-5 font-bold shadow-sm outline-none transition-all focus:border-slate-950 focus:bg-white"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-950">
            <Zap size={14} className="fill-brand text-brand" /> 02_Official_Endpoint
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="example@protocol.com"
            className="w-full rounded-none border-2 border-brand bg-white p-5 font-mono text-sm font-black shadow-[4px_4px_0px_0px_rgba(252,222,9,0.1)] outline-none transition-all focus:border-slate-950 focus:shadow-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <div className="h-1.5 w-1.5 bg-slate-300" /> 03_Direct_Line
          </label>
          <input
            required
            name="phone"
            placeholder="0XX-XXX-XXXX"
            className="w-full rounded-none border-2 border-slate-100 bg-slate-50 p-5 font-mono text-sm shadow-sm outline-none transition-all focus:border-slate-950 focus:bg-white"
          />
        </div>
        <div className="flex items-end">
          <div className="flex w-full items-center gap-4 border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-[1.15rem]">
            <ShieldCheck size={20} className="animate-pulse text-emerald-500" />
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
              Privacy_Encryption: Tier_03
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-1.5 bg-brand" />
            <label className="font-mono text-[11px] font-black uppercase tracking-[0.3em] text-slate-950">
              Service_Selection_Module
            </label>
          </div>
          <span className="font-mono text-[8px] font-bold text-slate-300">REQ_ID::X_099</span>
        </div>

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
                  'group relative rounded-none border-2 p-6 text-left transition-all duration-500',
                  isActive
                    ? 'shadow-sharp border-slate-950 bg-slate-950 text-white'
                    : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                {isActive && (
                  <div className="absolute right-4 top-4 h-2 w-2 animate-pulse bg-brand" />
                )}
                <div className="flex items-center gap-5">
                  <div
                    className={cn(
                      'border-2 p-3 transition-all duration-500',
                      isActive ? 'border-brand/30 bg-brand/10' : 'border-slate-100 bg-slate-50',
                    )}
                  >
                    <Icon
                      size={24}
                      className={
                        isActive ? 'text-brand' : 'text-slate-300 group-hover:text-slate-500'
                      }
                    />
                  </div>
                  <div>
                    <p className="text-[15px] font-black uppercase leading-tight tracking-tight">
                      {item.label}
                    </p>
                    <p
                      className={cn(
                        'mt-1 text-[10px] font-bold italic',
                        isActive ? 'text-slate-500' : 'text-slate-300',
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

      <div className="space-y-3">
        <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="h-1.5 w-1.5 bg-slate-300" /> 04_Internal_Log_Brief
        </label>
        <textarea
          required
          name="details"
          rows={5}
          placeholder="กรุณาระบุรายละเอียดที่ต้องการปรึกษา..."
          className="w-full resize-none rounded-none border-2 border-slate-100 bg-slate-50 p-5 text-sm font-bold shadow-sm outline-none transition-all focus:border-slate-950 focus:bg-white"
        />
      </div>

      <div className="pt-6">
        <button
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-6 rounded-none bg-slate-950 py-8 transition-all hover:bg-brand active:scale-[0.99] disabled:opacity-70"
        >
          <div className="relative z-10 flex items-center gap-4 font-mono text-[14px] font-black uppercase tracking-[0.5em] text-white transition-colors group-hover:text-slate-950">
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span className="animate-pulse">System_Processing...</span>
              </>
            ) : (
              <>
                Send_Contact_Protocol
                <SendHorizontal
                  size={22}
                  className="transition-transform duration-500 group-hover:translate-x-3"
                />
              </>
            )}
          </div>
        </button>
      </div>

      <div className="flex items-center justify-center gap-6 opacity-20 grayscale transition-opacity hover:opacity-100">
        <div className="h-px flex-1 bg-slate-950" />
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.6em] text-slate-950">
          Official_Consultancy_v3.2.3
        </p>
        <div className="h-px flex-1 bg-slate-950" />
      </div>
    </form>
  )
}
