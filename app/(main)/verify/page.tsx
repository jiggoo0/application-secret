/** * 🛰️ AI-CONTEXT: JP-VisualDocs – Global Page Template
 * @version 2026.1.12
 * @status PRODUCTION_READY: Fixed Effect Cascade & Seamless Process
 * @description หน้าจอจำลองกระบวนการตรวจสอบข้อมูล (Verification Handshake)
 */

'use client'

import React, { useEffect, useState, Suspense, useMemo } from 'react'
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
 * 🛠️ COMPONENT: VerifyContent
 * ✅ Role: Security Gateway Interface
 * ✅ Concept: Seamless Process with Evidence-Based Progress
 */
function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'PROCESSING' | 'SUCCESS' | 'ERROR'>('PROCESSING')
  const [currentStep, setCurrentStep] = useState(0)

  // Standardized Registry: ขั้นตอนการตรวจสอบระบบความปลอดภัย
  const verificationSteps = useMemo(
    () => [
      { label: 'RECEIVING_DATA', icon: <Activity size={14} /> },
      { label: 'IDENTITY_CHECK', icon: <Database size={14} /> },
      { label: 'SECURITY_ENCRYPTION', icon: <Lock size={14} /> },
      { label: 'COMPLETING_REQUEST', icon: <Fingerprint size={14} /> },
    ],
    [],
  )

  useEffect(() => {
    const id = searchParams.get('id')
    const name = searchParams.get('name')
    const verified = searchParams.get('verified')
    const type = searchParams.get('type') || 'contact'

    let isMounted = true

    const performHandshake = async () => {
      // Identity Check: ตรวจสอบความถูกต้องของสิทธิ์เข้าถึง
      if (!id || verified !== 'true') {
        if (isMounted) setStatus('ERROR')
        return
      }

      // Evidence-Based Progress Simulation
      for (let i = 0; i < verificationSteps.length; i++) {
        if (!isMounted) return
        setCurrentStep(i)
        await new Promise((r) => setTimeout(r, 700))
      }

      if (isMounted) setStatus('SUCCESS')

      const redirectPath = type === 'assessment' ? '/assessment/success' : '/contact/success'

      // Seamless Transition to Success State
      setTimeout(() => {
        if (isMounted) {
          router.push(
            `${redirectPath}?id=${id}&name=${encodeURIComponent(name || '')}&verified=true`,
          )
        }
      }, 1000)
    }

    performHandshake()

    return () => {
      isMounted = false
    }
  }, [searchParams, router, verificationSteps.length])

  return (
    <Card className="shadow-sharp relative w-full max-w-lg overflow-hidden border-[4px] border-slate-950 bg-white p-0">
      {/* Progress Integrity Bar */}
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
          <div className="shadow-sharp-sm relative flex h-24 w-24 items-center justify-center border-[3px] border-slate-950 bg-white">
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
            {status === 'PROCESSING' && 'Verifying'}
            {status === 'SUCCESS' && 'Verified'}
            {status === 'ERROR' && 'Denied'}
            <span className="text-[#FCDE09]">.</span>
          </h2>
          <Badge
            variant="outline"
            className="border-slate-950 font-mono text-[10px] tracking-widest"
          >
            SYSTEM_STATUS:{' '}
            {status === 'SUCCESS' ? 'สำเร็จ' : status === 'ERROR' ? 'ขัดข้อง' : 'กำลังดำเนินการ'}
          </Badge>
        </div>

        {/* Diagnostic Monitor Console */}
        <div className="shadow-sharp-sm space-y-3 bg-slate-950 p-6">
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
                {idx < currentStep ? '[DONE]' : idx === currentStep ? '[LOAD]' : '[WAIT]'}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-slate-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase text-slate-400">
            <Terminal size={12} /> Secure_Gateway
          </div>
          <div className="font-mono text-[9px] font-bold text-slate-400">VERSION_2026.1.12</div>
        </div>
      </div>
    </Card>
  )
}

/**
 * 🏗️ PAGE: VerifyPage
 */
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
