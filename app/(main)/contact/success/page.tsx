'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Search, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE')
  const [ticketInput, setTicketInput] = useState('')

  const id = searchParams.get('id')
  const verified = searchParams.get('verified')

  const autoVerify = useCallback(async () => {
    setStatus('PROCESSING')
    try {
      // จำลองเวลาในการตรวจสอบข้อมูล
      await new Promise((res) => setTimeout(res, 1000))
      setStatus('SUCCESS')
      setTimeout(() => router.push(`/pass/${id}`), 1000)
    } catch {
      setStatus('ERROR')
    }
  }, [id, router])

  useEffect(() => {
    if (id && verified === 'true') {
      const timer = setTimeout(() => autoVerify(), 0)
      return () => clearTimeout(timer)
    }
  }, [id, verified, autoVerify])

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (ticketInput.trim()) {
      router.push(`/pass/${ticketInput.trim().toUpperCase()}`)
    }
  }

  return (
    <Card className="relative w-full max-w-lg overflow-hidden border-[4px] border-slate-950 bg-white p-10 shadow-sharp">
      {status === 'IDLE' && !id ? (
        <div className="space-y-6">
          <div className="text-center">
            {/* ปรับหัวข้อให้ชัดเจน: ช่องทางเข้าสู่ระบบตรวจสอบ */}
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Access_Portal</h2>
            <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-slate-400">
              ตรวจสอบสิทธิ์การเข้าถึงข้อมูล
            </p>
          </div>
          <form onSubmit={handleManualSearch} className="space-y-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="ระบุรหัสเอกสาร หรือ Ticket_ID"
                className="w-full border-2 border-slate-950 bg-slate-50 p-4 pl-12 font-mono text-xl font-black uppercase outline-none focus:bg-white focus:ring-4 focus:ring-[#FCDE09]/20"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
              />
            </div>
            <button className="w-full bg-slate-950 py-4 font-mono font-black uppercase tracking-[0.2em] text-[#FCDE09] transition-colors hover:bg-slate-800">
              ค้นหาข้อมูล
            </button>
          </form>
        </div>
      ) : status === 'PROCESSING' ? (
        <div className="flex flex-col items-center justify-center py-6">
          <Loader2 className="animate-spin text-[#FCDE09]" size={48} />
          <p className="mt-4 font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
            กำลังตรวจสอบรหัส...
          </p>
        </div>
      ) : status === 'SUCCESS' ? (
        <div className="flex flex-col items-center justify-center py-6">
          <CheckCircle2 size={48} className="text-emerald-400" />
          <p className="mt-4 font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
            ตรวจสอบสำเร็จ
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-6">
          <AlertCircle size={48} className="text-red-400" />
          <p className="mt-4 font-mono text-[10px] font-black uppercase tracking-widest text-slate-500">
            รหัสไม่ถูกต้อง หรือไม่พบข้อมูล
          </p>
        </div>
      )}
    </Card>
  )
}

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020617] p-6">
      <VerifyContent />
    </main>
  )
}
