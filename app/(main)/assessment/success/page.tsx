/** * @format
 * @description ASSESSMENT_SUCCESS_PROTOCOL: Analysis Queue Manifest (V3.2.6)
 * ✅ FIXED: Escaped unescaped entities for "CONFIRM_DATA"
 * ✅ REFINED: Typography system mapping to font-sans
 */

'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Lock, ShieldCheck, Home, QrCode, Cpu, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

function SuccessContent() {
  const searchParams = useSearchParams()
  const isVerified = searchParams.get('verified') === 'true'
  const ticketId = searchParams.get('id') || 'WAITING'
  const name = searchParams.get('name') || 'ท่าน'

  const passUrl = `https://jpvisouldocs.online/pass/${ticketId}`
  const qrImage = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(passUrl)}`

  return (
    <div className="relative w-full max-w-md border-[4px] border-slate-950 bg-white p-10 shadow-sharp-brand transition-all duration-700 animate-in fade-in zoom-in-95">
      <div
        className={`absolute left-0 top-0 h-3 w-full transition-colors duration-1000 ${
          isVerified ? 'bg-emerald-500' : 'bg-brand'
        }`}
      />

      <div className="space-y-10 text-center">
        <div className="shadow-sharp relative inline-block border-[3px] border-slate-950 bg-slate-950 p-6 text-brand transition-transform hover:-translate-y-1">
          {isVerified ? (
            <ShieldCheck size={52} strokeWidth={2.5} className="duration-500 animate-in zoom-in" />
          ) : (
            <Lock size={52} strokeWidth={2.5} className="animate-pulse" />
          )}
          <div className="absolute -bottom-2 -right-2 bg-brand px-2 py-0.5 font-mono text-[9px] font-black text-slate-950">
            {isVerified ? 'SAFE' : 'LOCK'}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-6xl font-black uppercase italic leading-none tracking-tighter text-slate-950">
            {isVerified ? 'Ready' : 'Waiting'}
            <span className="not-italic text-brand">.</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <Cpu size={14} className={isVerified ? 'text-emerald-500' : 'text-slate-300'} />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              MANIFEST_ID: {isVerified ? 'AUTHORIZED' : 'PENDING_SCAN'}
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden border-2 border-slate-950 bg-slate-50 p-10 shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)]">
          <p className="mb-3 font-mono text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
            Internal_Reference
          </p>
          <p className="font-mono text-4xl font-black tracking-tighter text-slate-950">
            {isVerified ? ticketId : 'XXXX-XXXX'}
          </p>
          <div className="absolute right-0 top-0 bg-slate-950 px-3 py-1 font-mono text-[9px] font-black italic text-brand">
            V.2025_PROTO
          </div>
        </div>

        {isVerified && (
          <div className="py-4 duration-1000 animate-in fade-in slide-in-from-top-6">
            <div className="group/qr relative inline-block border-[5px] border-slate-950 bg-white p-4 shadow-sharp-brand transition-all hover:scale-105 active:scale-95">
              <Image
                src={qrImage}
                alt="Digital Pass QR"
                width={180}
                height={180}
                className="h-44 w-44 transition-all duration-700 group-hover/qr:rotate-2"
                unoptimized
                priority
              />
              <div className="absolute -left-3 -top-3 bg-brand p-1 shadow-sharp-sm">
                <QrCode size={18} className="text-slate-950" />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6 px-4">
          <div className="font-sans text-lg font-bold leading-relaxed text-slate-600">
            {isVerified ? (
              <div className="space-y-4">
                <p>
                  คุณ{' '}
                  <span className="text-slate-950 underline decoration-brand decoration-8 underline-offset-2">
                    {name}
                  </span>{' '}
                  ข้อมูลการประเมินของคุณ <br />
                  <span className="bg-slate-950 px-2 text-white">
                    ถูกจัดส่งเข้าคิววิเคราะห์แล้ว
                  </span>
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>
                  กรุณาเข้าสู่ <span className="italic text-slate-950">Email ของคุณ</span> <br />
                  และกดปุ่ม {/* ✅ FIXED: Use &quot; instead of " */}
                  <span className="shadow-sharp bg-brand px-1 text-slate-950">
                    &quot;CONFIRM_DATA&quot;
                  </span>{' '}
                  <br />
                  เพื่อเปิดการเข้าถึง Digital Reference ของคุณ
                </p>
              </div>
            )}
          </div>

          {!isVerified && (
            <div className="border-l-[6px] border-brand bg-slate-50 p-6 text-left shadow-sharp-sm">
              <p className="mb-1 font-sans text-[13px] font-black uppercase italic leading-tight text-slate-950">
                Architect_Note:
              </p>
              <p className="font-sans text-[13px] font-bold leading-relaxed text-slate-500">
                หากหาอีเมลไม่พบ โปรดตรวจสอบในแฟ้ม{' '}
                <span className="text-slate-950 underline decoration-brand decoration-2 underline-offset-2">
                  จดหมายขยะ (Spam)
                </span>
              </p>
            </div>
          )}
        </div>

        <div className="border-t-2 border-slate-100 pt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 font-mono text-[12px] font-black uppercase tracking-[0.4em] text-slate-400 transition-all hover:text-slate-950"
          >
            <div className="flex h-10 w-10 items-center justify-center border-2 border-slate-200 transition-all group-hover:border-slate-950 group-hover:bg-brand group-hover:text-slate-950">
              <Home size={18} />
            </div>
            <span>Return_To_Home</span>
            <ArrowRight
              size={16}
              className="text-brand transition-transform group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AssessmentSuccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-white p-6 font-sans selection:bg-brand selection:text-slate-950">
      <div className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      <Suspense
        fallback={<div className="animate-pulse font-mono text-slate-400">LOADING_MANIFEST...</div>}
      >
        <SuccessContent />
      </Suspense>
    </main>
  )
}
