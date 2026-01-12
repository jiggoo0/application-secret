/** * @version 2026.1.12
 * @status PRODUCTION_READY: ESLint & Build Optimized
 */
'use client'

import React, { useState, useCallback } from 'react'
import { createLead } from '@/app/actions/lead-actions'
import {
  Loader2,
  SendHorizontal,
  ShieldCheck,
  Activity,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SERVICE_OPTIONS = [
  { id: 'SRV-DOC-GEN', label: 'ปรึกษาข้อมูลเอกสาร', category: 'General' },
  { id: 'SRV-IMM-PRF', label: 'วางโครงสร้างโปรไฟล์', category: 'Immigration' },
  { id: 'SRV-IMM-APL', label: 'วิเคราะห์เคสปฏิเสธ', category: 'Appeals' },
  { id: 'SRV-DOC-CORP', label: 'เอกสารรับรองธุรกิจ', category: 'Corporate' },
] as const

export const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string>(SERVICE_OPTIONS[0].id)
  const [ticketId, setTicketId] = useState('')

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (loading) return

      setLoading(true)
      setError(null)

      const formData = new FormData(e.currentTarget)
      const payload = {
        full_name: String(formData.get('full_name')),
        email: String(formData.get('email')),
        phone: String(formData.get('phone')),
        service_type: selectedService,
        details: String(formData.get('details')),
        status: 'PROCESSING',
        submitted_at: new Date().toISOString(),
      }

      try {
        const result = await createLead(payload)
        if (result?.success) {
          setTicketId(result.ticketId || 'REF-PENDING')
          setIsSent(true)
        } else {
          throw new Error('SUBMISSION_FAILED')
        }
      } catch {
        // Remove unused error variable to pass ESLint
        console.error('[Digital_Integrity_Error]: Integrity Check Failed.')
        setError('ไม่สามารถส่งข้อมูลได้ในขณะนี้ โปรดลองใหม่อีกครั้ง')
      } finally {
        setLoading(false)
      }
    },
    [loading, selectedService],
  )

  const inputStyle = cn(
    'w-full border-2 border-slate-200 bg-white p-4 text-sm font-bold text-[#020617]',
    'placeholder:text-slate-400 outline-none focus:border-[#020617] focus:ring-0 transition-all duration-200',
  )

  if (isSent) {
    return (
      <div className="shadow-sharp space-y-8 border-[4px] border-slate-950 bg-white p-12 text-center duration-500 animate-in fade-in zoom-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={40} strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[#020617]">
            Data_Secured.
          </h3>
          <p className="font-thai text-sm font-bold text-slate-500">
            ระบบจัดเก็บข้อมูลเรียบร้อยแล้ว
          </p>
        </div>
        <div className="shadow-sharp-sm mx-auto max-w-xs border-2 border-slate-950 bg-slate-50 p-6">
          <p className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            Verify_ID
          </p>
          <p className="font-mono text-2xl font-black text-[#020617]">{ticketId}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-slate-900"
        >
          ← Submit Another Case
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="font-thai space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            Full_Name
          </label>
          <input required name="full_name" placeholder="ชื่อ-นามสกุล" className={inputStyle} />
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
          <div className="flex w-full items-center gap-3 border-2 border-dashed border-slate-200 bg-slate-50 p-4 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500">
            <ShieldCheck size={16} className="text-emerald-500" /> Secure Tunnel
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <label className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-[#020617]">
          <Activity size={16} className="text-[#FCDE09]" /> Select_Service_Registry
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
                  ? 'shadow-sharp-sm border-[#020617] bg-[#020617] text-[#FCDE09]'
                  : 'border-slate-100 bg-white hover:border-[#020617]',
              )}
            >
              <span className="mb-1 block font-mono text-[8px] opacity-50">{s.id}</span>
              <p className="text-[11px] font-black uppercase leading-tight">{s.label}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
          Case_Details
        </label>
        <textarea
          required
          name="details"
          rows={4}
          placeholder="ระบุรายละเอียด..."
          className={cn(inputStyle, 'resize-none')}
        />
      </div>
      {error && (
        <div className="flex items-center gap-3 border-2 border-red-100 bg-red-50 p-4 text-[11px] font-bold text-red-600">
          <AlertCircle size={18} /> {error}
        </div>
      )}
      <button
        disabled={loading}
        type="submit"
        className="flex w-full items-center justify-center gap-3 bg-slate-950 py-6 text-[11px] font-black uppercase tracking-[0.3em] text-[#FCDE09] transition-all hover:bg-slate-900 disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" /> : 'Execute_Submission'}
        {!loading && <SendHorizontal size={16} />}
      </button>
    </form>
  )
}
