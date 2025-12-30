/**
 * @format
 * @description DIGITAL_PASS_CORE (V4.0.1 - ZERO_ERROR_BUILD)
 * ✅ FIXED: Removed unused Lucide icons & variables
 * ✅ FIXED: Integrated all extracted data into HUD UI
 */

import React from 'react'
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

interface LeadMetadata {
  ticket_id?: string
  case_profile?: {
    target_country?: string
  }
}

export default async function PassPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createServerClient()

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('metadata->>ticket_id', id)
    .single()

  if (error || !lead) return notFound()

  // 🛡️ DATA_MAPPING: นำตัวแปรที่เคย Unused มาใช้งานจริง
  const metadata = lead.metadata as LeadMetadata
  const customerName = lead.name || 'VALUED_HOLDER'
  const targetCountry = metadata.case_profile?.target_country || 'GLOBAL_NODE'
  const serviceType = lead.category || 'GENERAL_CONSULT'

  const authDate = new Date(lead.created_at)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase()

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#05080A] p-6 font-sans text-white">
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 z-0 opacity-[0.05]" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="absolute -inset-10 animate-pulse rounded-[3rem] bg-[#C8A45D]/10 opacity-20 blur-[100px]" />

        <div className="relative overflow-hidden border border-zinc-800 bg-[#0F172A]/80 shadow-[0_0_80px_-15px_rgba(200,164,93,0.1)] backdrop-blur-xl">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#C8A45D] to-transparent shadow-[0_0_15px_rgba(200,164,93,0.5)]" />

          <div className="p-10">
            <div className="mb-14 flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C8A45D]" />
                  <h2 className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-[#C8A45D]">
                    ACCESS_GRANTED
                  </h2>
                </div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                  SECURE_LAYER::JPV_V4.0
                </p>
              </div>
              <ShieldCheck size={30} strokeWidth={1} className="text-[#C8A45D]" />
            </div>

            <div className="mb-14 space-y-12">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-[#C8A45D] shadow-[0_0_10px_rgba(200,164,93,0.5)]" />
                <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
                  Holder_Identity
                </p>
                <h1 className="text-4xl font-black uppercase italic leading-none tracking-tighter text-white">
                  {customerName}
                </h1>
              </div>

              {/* 🛰️ HUD_DETAILS: นำตัวแปรที่ดึงออกมามาแสดงผลลด Error Lint */}
              <div className="grid grid-cols-2 gap-6 border-t border-zinc-800/50 pt-8">
                <div className="space-y-1">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-zinc-600">
                    Destination
                  </p>
                  <p className="font-mono text-[11px] font-black text-[#C8A45D]">{targetCountry}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-zinc-600">
                    Auth_Date
                  </p>
                  <p className="font-mono text-[11px] font-black text-white">{authDate}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-zinc-600">
                  Service_Type
                </p>
                <p className="font-mono text-[10px] font-black tracking-[0.2em] text-zinc-400">
                  {serviceType}
                </p>
              </div>
            </div>

            <div className="relative h-1.5 w-full bg-zinc-800">
              <div className="absolute left-0 h-full w-[100%] bg-[#C8A45D] shadow-[0_0_10px_rgba(200,164,93,0.4)]" />
            </div>

            <div className="mt-8 opacity-20 grayscale">
              <div className="flex h-12 w-full items-center justify-center border border-dashed border-zinc-700 bg-zinc-900 font-mono text-[10px] tracking-[1em]">
                {id}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
