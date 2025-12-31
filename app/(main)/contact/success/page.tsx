'use client'

import React, { useState, useEffect, Suspense, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Search } from 'lucide-react'
import { Card } from '@/components/ui/card'

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE')
  const [ticketInput, setTicketInput] = useState('')

  const id = searchParams.get('id')
  const verified = searchParams.get('verified')

  // 🔹 ใช้ useCallback เพื่อหลีกเลี่ยง warning call setState ใน useEffect
  const autoVerify = useCallback(async () => {
    setStatus('PROCESSING')
    // ... logic เดิม ...
    setStatus('SUCCESS')
    setTimeout(() => router.push(`/pass/${id}`), 1000)
  }, [id, router])

  useEffect(() => {
    if (id && verified === 'true') {
      // รัน async ใน setTimeout เพื่อหลีกเลี่ยง setState sync ใน effect
      const timer = setTimeout(() => {
        autoVerify()
      }, 0)
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
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Access_Portal</h2>
            <p className="font-mono text-[9px] font-bold text-slate-400 tracking-widest uppercase">Verified_Tickets_Only</p>
          </div>
          <form onSubmit={handleManualSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="ENTER_TICKET_ID"
                className="w-full border-2 border-slate-950 bg-slate-50 p-4 pl-12 font-mono text-xl font-black uppercase outline-none focus:bg-white focus:ring-4 focus:ring-[#FCDE09]/20"
                value={ticketInput}
                onChange={(e) => setTicketInput(e.target.value)}
              />
            </div>
            <button className="w-full bg-slate-950 py-4 font-mono font-black text-[#FCDE09] uppercase tracking-[0.2em] hover:bg-slate-800 transition-colors">
              Execute_Search
            </button>
          </form>
        </div>
      ) : (
        <div className="py-6">{/* ... UI PROCESSING/SUCCESS/ERROR ... */}</div>
      )}
    </Card>
  )
}

export default function VerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020617] p-6">
      <Suspense fallback={<Loader2 className="animate-spin text-[#FCDE09]" size={48} />}>
        <VerifyContent />
      </Suspense>
    </main>
  )
}