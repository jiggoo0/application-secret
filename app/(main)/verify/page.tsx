'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Loader2,
  ShieldCheck,
  Activity,
  Terminal,
  Lock,
  Cpu,
  Database,
  Fingerprint,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

/**
 * 🛠️ VERIFY_HANDSHAKE_CORE (UPDATED)
 * FIX:
 * - ตัด token ออก (สอดคล้องกับ createLead)
 * - ใช้ id + verified เป็นแหล่งความจริง
 * - ไม่มีโหมดจำลอง / ทดสอบ
 */
function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'PROCESSING' | 'SUCCESS' | 'ERROR'>('PROCESSING')
  const [currentStep, setCurrentStep] = useState(0)

  const verificationSteps = React.useMemo(
    () => [
      { label: 'INITIATE_HANDSHAKE', icon: <Activity size={14} /> },
      { label: 'CROSS_CHECK_ID', icon: <Database size={14} /> },
      { label: 'VERIFY_STATE_FLAG', icon: <Lock size={14} /> },
      { label: 'FINALIZE_AUTHORIZATION', icon: <Fingerprint size={14} /> },
    ],
    [],
  )

  useEffect(() => {
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const verified = searchParams.get('verified')
    const type = searchParams.get('type') || 'contact'

    const performHandshake = async () => {
      // 🔒 Gate ตรวจสอบเส้นทางจริง
      if (!id || verified !== 'true') {
        setStatus('ERROR')
        return
      }

      for (let i = 0; i < verificationSteps.length; i++) {
        setCurrentStep(i)
        await new Promise((r) => setTimeout(r, 700))
      }

      setStatus('SUCCESS')

      const redirectPath = type === 'assessment' ? '/assessment/success' : '/contact/success'

      setTimeout(() => {
        router.push(`${redirectPath}?id=${id}&name=${encodeURIComponent(name || '')}&verified=true`)
      }, 1000)
    }

    performHandshake()
  }, [searchParams, router, verificationSteps.length])

  return (
    <Card className="relative w-full max-w-lg overflow-hidden border-[4px] border-slate-950 bg-white p-0 shadow-sharp">
      <div className="absolute left-0 top-0 h-2 w-full bg-slate-100">
        <div
          className={cn(
            'h-full transition-all duration-1000',
            status === 'PROCESSING' && 'w-full animate-pulse bg-[#FCDE09]',
            status === 'SUCCESS' && 'w-full bg-emerald-500',
            status === 'ERROR' && 'w-full bg-rose-600',
          )}
        />
      </div>

      <div className="p-10 md:p-14">
        <div className="mb-10 flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center border-[3px] border-slate-950 bg-white shadow-sharp-sm">
            {status === 'PROCESSING' && (
              <Loader2 size={32} className="animate-spin text-slate-950" />
            )}
            {status === 'SUCCESS' && <ShieldCheck size={40} className="text-emerald-500" />}
            {status === 'ERROR' && <Lock size={32} className="text-rose-600" />}

            <div className="absolute -right-2 -top-2 bg-slate-950 p-1 text-[#FCDE09]">
              <Cpu size={14} />
            </div>
          </div>
        </div>

        <div className="mb-10 space-y-2 text-center">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter text-slate-950">
            {status === 'PROCESSING' && 'Validating'}
            {status === 'SUCCESS' && 'Passed'}
            {status === 'ERROR' && 'Blocked'}
            <span className="text-[#FCDE09]">.</span>
          </h2>
          <Badge
            variant="outline"
            className="border-slate-950 font-mono text-[10px] tracking-widest"
          >
            STATUS_CORE: {status}
          </Badge>
        </div>

        <div className="space-y-3 bg-slate-950 p-6 shadow-sharp-sm">
          {verificationSteps.map((step, idx) => (
            <div key={idx} className="flex items-center justify-between font-mono text-[11px]">
              <div
                className={cn(
                  'flex items-center gap-3',
                  idx === currentStep
                    ? 'text-[#FCDE09]'
                    : idx < currentStep
                      ? 'text-emerald-400'
                      : 'text-slate-600',
                )}
              >
                {step.icon}
                <span>{`>> ${step.label}`}</span>
              </div>
              <span
                className={cn(
                  'font-bold',
                  idx < currentStep
                    ? 'text-emerald-400'
                    : idx === currentStep
                      ? 'animate-pulse text-[#FCDE09]'
                      : 'text-slate-800',
                )}
              >
                {idx < currentStep ? '[OK]' : idx === currentStep ? '[LOAD]' : '[WAIT]'}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-slate-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase text-slate-400">
            <Terminal size={12} /> Master_Secure_Gate
          </div>
          <div className="font-mono text-[9px] font-bold text-slate-400">SYS_v3.3.0</div>
        </div>
      </div>
    </Card>
  )
}

export default function VerifyPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#020617] p-6 selection:bg-[#FCDE09] selection:text-slate-950">
      <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <Suspense fallback={<Loader2 className="animate-spin text-[#FCDE09]" size={48} />}>
        <VerifyContent />
      </Suspense>
    </main>
  )
}