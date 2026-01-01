/** @format */

import { supabaseServer } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ShieldCheck, Calendar, FileText, Hash, Activity, QrCode } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

/**
 * 🛰️ PAGE: DIGITAL_PASS_STANDARD
 * VERSION: 3.4.2 (Clean Architecture & Performance)
 */
export default async function PassPage({ params }: PageProps) {
  const { id } = await params

  const { data: lead, error } = await supabaseServer
    .from('leads')
    .select('*')
    .eq('metadata->>ticket_id', id.toUpperCase())
    .single()

  if (error || !lead) return notFound()

  const customerName = lead.name || 'UNREGISTERED_USER'
  const serviceType = lead.category || 'Documentation_Service'
  const ticketId = id.toUpperCase()
  const authDate = new Date(lead.created_at).toLocaleDateString('th-TH', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020617] p-6 selection:bg-[#FCDE09] selection:text-[#020617]">
      {/* 🧩 UI_DECOR: Blueprint Grid */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[url('/grid-pattern.svg')] opacity-5" />

      {/* 📦 PASS_CONTAINER */}
      <div className="relative z-10 w-full max-w-md border-[4px] border-slate-950 bg-white shadow-[12px_12px_0px_0px_rgba(252,222,9,0.2)]">
        {/* HEADER: Security Status Bar */}
        <div className="flex items-center justify-between bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center bg-[#FCDE09]">
              <ShieldCheck className="text-slate-950" size={14} />
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#FCDE09]">
              Secure_Verified
            </span>
          </div>
          <span className="font-mono text-[9px] font-bold italic text-slate-500">
            SYSTEM_AUTH_2026
          </span>
        </div>

        {/* BODY: Industrial Information Layer */}
        <div className="p-8">
          <header className="mb-10 border-l-4 border-slate-950 pl-6 transition-all hover:border-[#FCDE09]">
            <p className="mb-1 font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
              Document_Holder
            </p>
            <h1 className="font-thai text-3xl font-black uppercase italic tracking-tighter text-slate-950">
              {customerName}
            </h1>
          </header>

          <div className="grid grid-cols-2 gap-8 border-y-2 border-slate-50 py-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Hash size={12} strokeWidth={2.5} />
                <span className="font-mono text-[9px] font-black uppercase tracking-widest">
                  Ticket_Ref
                </span>
              </div>
              <p className="w-fit bg-slate-100 px-2 py-1 font-mono text-sm font-black text-slate-950">
                #{ticketId}
              </p>
            </div>

            <div className="space-y-2 text-right">
              <div className="flex items-center justify-end gap-2 text-slate-400">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest">
                  Service_Class
                </span>
                <FileText size={12} strokeWidth={2.5} />
              </div>
              <p className="font-thai text-sm font-bold text-slate-950">{serviceType}</p>
            </div>
          </div>

          {/* STATUS_TRACKER: Visual Progress */}
          <div className="my-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase text-slate-950">
                <Activity size={12} className="animate-pulse text-emerald-500" />
                <span>Current: ประมวลผลสำเร็จ</span>
              </div>
              <span className="font-mono text-[10px] font-black text-emerald-500">CHECK_OK</span>
            </div>
            <div className="h-4 w-full border-2 border-slate-950 p-[2px]">
              <div className="h-full w-full bg-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
            </div>
          </div>

          {/* FOOTER: Validation Metadata */}
          <footer className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={12} />
                  <span className="font-mono text-[8px] font-black uppercase tracking-widest">
                    Auth_Date
                  </span>
                </div>
                <p className="font-thai text-[11px] font-bold leading-none text-slate-600">
                  {authDate}
                </p>
              </div>

              {/* Visual QR Placeholder */}
              <div className="border border-slate-200 p-1 opacity-20 transition-opacity hover:opacity-100">
                <QrCode size={32} strokeWidth={1} />
              </div>
            </div>

            <div className="border border-slate-950 bg-[#FCDE09] px-3 py-2 text-[9px] font-black italic text-slate-950 shadow-sharp-sm">
              JP_AUTHORIZED
            </div>
          </footer>
        </div>
      </div>
    </main>
  )
}
