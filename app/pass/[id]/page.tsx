/** @format */

import React from "react"
import { supabaseServer } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ShieldCheck, Globe, Cpu, Fingerprint, Activity } from "lucide-react"

/**
 * 🛰️ PAGE: DIGITAL_PASS_CORE
 * @version 3.2.6 (Cyber Sharp Edition)
 * PURPOSE: แสดงบัตรประจำตัวดิจิทัลสำหรับลูกค้าที่ผ่านการยืนยันตัวตนแล้ว
 */

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PassPage({ params }: PageProps) {
  // 1. ASYNC_PARAMS_RESOLUTION (Next.js 15 Protocol)
  const { id } = await params

  // 2. DATA_EXTRACTION: Fetch using JSONB pointer
  const { data: lead, error } = await supabaseServer
    .from("leads")
    .select("*")
    .eq("metadata->>ticket_id", id)
    .single()

  if (error || !lead) return notFound()

  // 3. PARAMETER_MAPPING
  const customerName = lead.name || "VALUED_HOLDER"
  const targetCountry = lead.metadata?.case_profile?.target_country || "GLOBAL"
  const serviceType = lead.category || "CONSULTATION"

  const authDate = new Date(lead.created_at)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase()

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-black p-6 font-sans text-white selection:bg-green-500 selection:text-black">
      {/* 🧩 AMBIENT_GRID: Tactical Overlay (Mode B) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(#22c55e 0.5px, transparent 0.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* ⚡ CYBER_GLOW_EFFECT */}
        <div className="absolute -inset-6 animate-pulse rounded-[3rem] bg-green-500/10 opacity-30 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2rem] border-2 border-zinc-800 bg-zinc-950 shadow-[0_0_50px_-12px_rgba(34,197,94,0.2)]">
          {/* 🟢 TOP_LASER_LINE */}
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.6)]" />

          <div className="p-10">
            {/* 🏷️ HEADER_PROTOCOL */}
            <div className="mb-12 flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-green-500">
                    Identity_Verified
                  </h2>
                </div>
                <p className="font-mono text-[8px] uppercase tracking-widest text-zinc-600">
                  Secured by: JPV_PROTOCOL_v3
                </p>
              </div>
              <div className="rounded-none border-2 border-zinc-800 p-2 text-zinc-700 transition-colors hover:border-green-500 hover:text-green-500">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
            </div>

            {/* 👤 HOLDER_IDENTITY (Mode C: Advisor Tone) */}
            <div className="mb-12 space-y-10">
              <div className="relative pl-6">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
                  Pass_Holder
                </p>
                <h1 className="text-3xl font-black uppercase italic leading-none tracking-tighter text-zinc-100 md:text-4xl">
                  {customerName}
                </h1>
                <div className="absolute left-0 top-1/2 h-full w-1 -translate-y-1/2 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </div>

              <div className="grid grid-cols-2 gap-8 border-y border-zinc-900 py-8">
                <div className="space-y-2">
                  <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    <Fingerprint size={12} className="text-green-500/50" />{" "}
                    Ref_ID
                  </p>
                  <p className="font-mono text-[12px] font-black tracking-widest text-zinc-300">
                    {id}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    <Globe size={12} className="text-green-500/50" /> Target
                  </p>
                  <p className="text-[12px] font-black uppercase italic text-zinc-300">
                    {targetCountry}
                  </p>
                </div>
              </div>
            </div>

            {/* ⚙️ SCAN_PROGRESS_DECOR */}
            <div className="group mb-10 border border-zinc-800/60 bg-zinc-900/30 p-5 transition-all hover:bg-zinc-900/60">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Class: {serviceType}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] italic text-zinc-600">
                    SYNC_OK
                  </span>
                  <Cpu
                    size={14}
                    className="text-green-500 transition-transform duration-700 group-hover:rotate-180"
                  />
                </div>
              </div>
              <div className="h-1 w-full bg-zinc-800">
                <div className="h-full w-[92%] animate-pulse bg-green-500/60" />
              </div>
              <p className="mt-2 text-left font-mono text-[7px] uppercase tracking-[0.4em] text-zinc-700">
                Issued_At: {authDate}
              </p>
            </div>

            {/* 🛡️ SECURITY_BARCODE: Deterministic Style */}
            <div className="relative pt-6 text-center">
              <div className="mb-6 flex items-center justify-center gap-[3px] opacity-20 grayscale transition-all group-hover:opacity-40">
                {[...Array(32)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-300"
                    style={{
                      width: i % 6 === 0 ? "4px" : "1.5px",
                      height: `${((i * 13) % 25) + 15}px`,
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center gap-2">
                <Activity size={16} className="text-green-500/20" />
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.5em] text-zinc-600">
                  JPV_GLOBAL_ACCESS_GRANT
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🖼️ CARD_REFRACTION: Glass Overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/[0.03] via-transparent to-transparent opacity-50" />
      </div>

      {/* 🛰️ SYSTEM_STATUS_INDICATOR */}
      <footer className="fixed bottom-10 flex w-full justify-center opacity-30">
        <div className="flex items-center gap-4 rounded-none border border-zinc-800 bg-black/50 px-6 py-2 backdrop-blur-md">
          <div className="h-1.5 w-1.5 animate-pulse bg-green-500" />
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.5em] text-zinc-500">
            Official_Pass_Node: {id.split("-")[1]}
          </p>
        </div>
      </footer>
    </div>
  )
}
