/** @format */
import { supabaseServer } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ShieldCheck, Globe, Cpu, Fingerprint } from "lucide-react"

/**
 * @description DIGITAL_PASS_VIEW: หน้าบัตรประจำตัวดิจิทัล (Verified Holder)
 * @fix Resolved ESLint 'Math.random' impurity & removed unused 'Barcode'
 */

export default async function PassPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // 1. ASYNC_PARAMS: Extract ID safely for Next.js 15
  const { id } = await params

  // 2. DATABASE_FETCH: Fetch using metadata JSON pointer
  const { data: lead } = await supabaseServer
    .from("leads")
    .select("*")
    .eq("metadata->>ticket_id", id)
    .single()

  if (!lead) return notFound()

  // 3. DATA_PREPARATION
  const customerName = lead.full_name || "VALUED_HOLDER"
  const targetCountry =
    lead.metadata?.assessment_profile?.target_country || "GLOBAL"

  const authDate = new Date(lead.created_at)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase()

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-black p-6 font-sans text-white">
      {/* 🧩 AMBIENT_BACKGROUND: Matrix-style grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#22c55e 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* ⚡ RADIAL_GLOW */}
        <div className="absolute -inset-4 animate-pulse rounded-[3rem] bg-green-500/10 opacity-40 blur-3xl" />

        <div className="relative overflow-hidden rounded-[2.5rem] border-[1.5px] border-zinc-800 bg-zinc-950 shadow-2xl">
          {/* 🟢 STATUS_BAR */}
          <div className="h-1.5 w-full bg-gradient-to-r from-green-600 via-emerald-400 to-green-600 shadow-[0_0_20px_rgba(34,197,94,0.4)]" />

          <div className="p-9">
            {/* 🏷️ HEADER */}
            <div className="mb-14 flex items-start justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 animate-ping rounded-full bg-green-500" />
                  <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-green-500">
                    Verified_Identity
                  </h2>
                </div>
                <p className="font-mono text-[9px] uppercase italic tracking-widest text-zinc-600">
                  Auth_Level: JPV_S_Tier
                </p>
              </div>
              <ShieldCheck
                className="text-zinc-700 transition-colors hover:text-green-500"
                size={32}
                strokeWidth={1.5}
              />
            </div>

            {/* 👤 IDENTITY_SECTION */}
            <div className="mb-14 space-y-10">
              <div className="relative">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  Pass_Holder_Name
                </p>
                <p className="text-3xl font-black uppercase italic leading-none tracking-tighter text-zinc-100">
                  {customerName}
                </p>
                <div className="absolute -left-5 top-1/2 h-10 w-1.5 -translate-y-1/2 bg-green-500/40 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
              </div>

              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-1">
                  <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    <Fingerprint size={12} className="text-zinc-600" />{" "}
                    Reference
                  </p>
                  <p className="font-mono text-[13px] font-bold tracking-widest text-zinc-300">
                    {id}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    <Globe size={12} className="text-zinc-600" /> Target
                  </p>
                  <p className="text-[13px] font-black uppercase italic text-zinc-300">
                    {targetCountry}
                  </p>
                </div>
              </div>
            </div>

            {/* ⚙️ DATA_DECODER */}
            <div className="group mb-12 rounded-xl border border-zinc-800/40 bg-zinc-900/40 p-5 transition-all hover:bg-zinc-900/60">
              <div className="mb-3 flex items-center justify-between opacity-60">
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-zinc-500">
                  Auth_Stamp: {authDate}
                </span>
                <Cpu
                  size={14}
                  className="text-zinc-500 transition-transform duration-500 group-hover:rotate-90"
                />
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[85%] animate-[pulse_3s_infinite] bg-green-500/40" />
              </div>
              <p className="mt-2 text-right font-mono text-[7px] uppercase tracking-[0.2em] text-zinc-700">
                Transmission_Clearance: 100%
              </p>
            </div>

            {/* 🛡️ AUTH_FOOTER */}
            <div className="relative border-t border-zinc-800/60 pt-8 text-center">
              <div className="mb-5 font-mono text-[9px] font-black uppercase italic tracking-[0.5em] text-zinc-500 opacity-40">
                Secure Digital Document
              </div>

              {/* DETERMINISTIC BARCODE DECORATION (NO MATH.RANDOM) */}
              <div className="flex items-center justify-center gap-[3px] opacity-15 grayscale">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-400"
                    style={{
                      width: i % 4 === 0 ? "3px" : "1px",
                      // ✅ แก้ไข: ใช้ index (i) เพื่อคำนวณความสูงให้ดูเหมือนสุ่มแต่คงเดิมทุกครั้งที่ render
                      height: `${((i * 7) % 20) + 15}px`,
                    }}
                  />
                ))}
              </div>

              <p className="mt-6 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-700">
                Authorized by JP-VISOUL&DOCS Global
              </p>
            </div>
          </div>
        </div>

        {/* 🖼️ CARD_REFRACTION */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/[0.07] via-transparent to-transparent opacity-40" />
      </div>

      {/* 🛰️ SYSTEM_STATUS */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3 opacity-20 transition-opacity hover:opacity-100">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          System_Online
        </p>
        <div className="h-2 w-2 rounded-none bg-green-500 shadow-[0_0_10px_#22c55e]" />
      </div>
    </div>
  )
}
