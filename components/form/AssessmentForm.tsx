/** * @format
 * @description ASSESSMENT_FORM: Tactical Lead Generation (V3.2.3 Zero-Error)
 * ✅ FIXED: Removed unused 'cn' import
 * ✅ ENFORCEMENT: Proper data typing for createLead execution
 * ✅ REFINED: Industrial Sharp Success Interface
 */

'use client'

import { useState } from 'react'
import { createLead } from '@/app/actions/lead-actions'
import {
  Loader2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe2,
  History,
  ClipboardCheck,
  QrCode,
  AlertCircle,
} from 'lucide-react'

export const AssessmentForm = () => {
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [ticketData, setTicketData] = useState({ id: '', name: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    // 🛡️ DATA_STRUCT_MAPPING
    const payload = {
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service_type: 'DIGITAL_ASSESSMENT',
      details: `เป้าหมาย: ${formData.get('target_country')} | วัตถุประสงค์: ${formData.get('objective')}`,
      assessment_profile: {
        target_country: formData.get('target_country') as string,
        travel_history: formData.get('travel_history') as string,
        objective: formData.get('objective') as string,
      },
    }

    try {
      // ✅ FIXED: Execute with typed payload
      const result = await createLead(payload)
      if (result.success) {
        setTicketData({
          id: result.ticketId || 'PENDING',
          name: payload.full_name,
        })
        setIsSent(true)
      } else {
        throw new Error(result.error || 'SUBMISSION_REJECTED')
      }
    } catch (error) {
      console.error('❌ [FORM_ERROR]:', error)
      alert('ระบบขัดข้องชั่วคราว โปรดตรวจสอบข้อมูลและลองใหม่อีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  // --- 🏁 SUCCESS_STATE: TICKET_GENERATED ---
  if (isSent) {
    return (
      <div className="shadow-sharp relative overflow-hidden border-4 border-slate-950 bg-white p-8 transition-all animate-in fade-in zoom-in md:p-12">
        <div className="absolute right-0 top-0 h-16 w-16 bg-brand [clip-path:polygon(100%_0,0_0,100%_100%)]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 flex gap-4">
            <div className="flex h-20 w-20 items-center justify-center border-2 border-slate-950 bg-brand shadow-sharp-sm transition-transform hover:-rotate-6">
              <ShieldCheck className="text-slate-950" size={40} />
            </div>
            <div className="flex h-20 w-20 items-center justify-center border-2 border-slate-950 bg-white shadow-sharp-sm transition-transform hover:rotate-6">
              <QrCode className="text-slate-950" size={40} />
            </div>
          </div>

          <h3 className="mb-2 text-4xl font-black uppercase italic tracking-tighter text-slate-950">
            Data_Received.
          </h3>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
            Protocol_099_Execution_Success
          </p>

          <div className="shadow-sharp relative mb-10 w-full border-4 border-slate-950 bg-slate-50 p-8">
            <span className="absolute -top-4 left-6 bg-slate-950 px-3 py-1 font-mono text-[10px] font-black text-white">
              IDENTITY_REF_TICKET
            </span>
            <p className="font-mono text-3xl font-black uppercase tracking-[0.2em] text-slate-950 md:text-4xl">
              {ticketData.id}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="h-1 w-1 bg-slate-200" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <p className="font-sans text-xl font-bold text-slate-900">
              ยินดีด้วยคุณ <span className="border-b-4 border-brand px-1">{ticketData.name}</span>
            </p>
            <div className="bg-slate-950 p-6 text-left">
              <p className="font-sans text-sm leading-relaxed text-slate-300">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-brand underline underline-offset-4">
                  Important_Action:
                </span>
                ระบบได้ส่งผลประเมินเบื้องต้นไปยัง &quot;กล่องจดหมายของคุณ&quot; แล้ว
                โปรดตรวจสอบเพื่อดำเนินการขั้นถัดไปทันที
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- 📝 FORM_STATE: INPUT_PROTOCOL ---
  return (
    <form onSubmit={handleSubmit} className="relative space-y-8 font-sans">
      {/* 📟 SYSTEM_NOTICE */}
      <div className="shadow-sharp group relative border-l-[6px] border-brand bg-slate-950 p-6 transition-all hover:bg-slate-900">
        <div className="mb-2 flex items-center gap-3">
          <AlertCircle size={16} className="animate-pulse text-brand" />
          <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-brand">
            Security_Audit_Notice
          </span>
        </div>
        <p className="text-sm font-bold italic leading-relaxed text-white opacity-90">
          กรุณากรอกข้อมูลตามจริง เพื่อให้วิศวกรวิเคราะห์โอกาสสำเร็จได้อย่างแม่นยำที่สุด
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <label className="flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <ClipboardCheck size={14} className="text-slate-300" /> 01_Full_Name
          </label>
          <input
            required
            name="full_name"
            placeholder="ระบุชื่อจริง-นามสกุล"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-5 font-bold shadow-sm outline-none transition-all focus:border-slate-950 focus:bg-slate-50"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-950">
            <Zap size={14} className="fill-brand text-brand" /> 02_Email_Endpoint
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="example@protocol.com"
            className="w-full rounded-none border-2 border-brand bg-white p-5 font-mono text-sm font-black shadow-[4px_4px_0px_0px_rgba(252,222,9,0.2)] outline-none transition-all focus:border-slate-950 focus:shadow-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <label className="flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            03_Contact_Number
          </label>
          <input
            required
            name="phone"
            placeholder="0XX-XXX-XXXX"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-5 font-mono text-sm shadow-sm outline-none transition-all focus:border-slate-950"
          />
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Globe2 size={14} /> 04_Destination
          </label>
          <input
            required
            name="target_country"
            placeholder="ระบุประเทศที่ต้องการไป"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-5 font-bold shadow-sm outline-none transition-all focus:border-slate-950"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          05_Operation_Objective
        </label>
        <div className="relative">
          <select
            name="objective"
            className="w-full cursor-pointer appearance-none rounded-none border-2 border-slate-100 bg-white p-5 text-sm font-black shadow-sm outline-none transition-all focus:border-slate-950"
          >
            <option value="TOURIST">ท่องเที่ยว (TOURIST)</option>
            <option value="BUSINESS">ทำธุรกิจ (BUSINESS)</option>
            <option value="WORK">ทำงาน (WORK)</option>
            <option value="OTHER">อื่นๆ (OTHER)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
            <ChevronRight className="rotate-90 text-slate-400" size={20} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <History size={14} /> 06_Case_Brief
        </label>
        <textarea
          name="travel_history"
          rows={5}
          placeholder="ระบุประวัติการเดินทาง หรือข้อมูลสำคัญอื่นๆ..."
          className="w-full resize-none rounded-none border-2 border-slate-100 bg-white p-5 text-sm font-bold shadow-sm outline-none transition-all focus:border-slate-950"
        />
      </div>

      <div className="pt-6">
        <button
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-5 overflow-hidden rounded-none bg-slate-950 py-8 transition-all active:scale-[0.98] disabled:opacity-70"
        >
          <div className="absolute inset-0 -translate-x-full bg-brand transition-transform duration-500 group-hover:translate-x-0" />

          <div className="relative z-10 flex items-center gap-4 font-mono text-[14px] font-black uppercase tracking-[0.5em] text-white transition-colors group-hover:text-slate-950">
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Zap
                  size={20}
                  className="fill-brand text-brand group-hover:fill-slate-950 group-hover:text-slate-950"
                />
                Execute_Assessment
                <ChevronRight
                  size={20}
                  className="transition-transform group-hover:translate-x-2"
                />
              </>
            )}
          </div>
        </button>
      </div>

      <div className="flex items-center justify-between border-t-2 border-slate-100 pt-8">
        <div className="flex items-center gap-3 font-mono text-[10px] font-black uppercase text-slate-400">
          <div className="h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          Secure_Node_v3.2.3
        </div>
        <span className="font-mono text-[9px] font-black text-slate-300">
          © {new Date().getFullYear()} JP_VISUAL_DOCS // DAP_SYSTEM
        </span>
      </div>
    </form>
  )
}
