/** * 🛰️ AI-CONTEXT: JP-VisualDocs – Verify Portal
 * @version 2026.1.12
 * @status PRODUCTION_READY: Resolved ESLint Effect-State Cascade
 * @description หน้าจำลองการตรวจสอบข้อมูลก่อนเข้าสู่หน้าขอบคุณ (Deferred Execution Mode)
 */
'use client'

import React, { useState, useEffect, useCallback, Suspense, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, ShieldCheck, Lock, Activity, Cpu, Database, Fingerprint } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE')
  const [currentStep, setCurrentStep] = useState(0)

  // 🛡️ Integrity Protection: ใช้ Ref เพื่อคุมไม่ให้เกิดการ Execute ซ้ำซ้อน
  const hasInitiated = useRef(false)

  const id = searchParams.get('id')
  const verified = searchParams.get('verified')

  const verificationSteps = React.useMemo(
    () => [
      { label: 'RECEIVING_DATA', icon: <Activity size={14} /> },
      { label: 'IDENTITY_CHECK', icon: <Database size={14} /> },
      { label: 'SECURITY_ENCRYPTION', icon: <Lock size={14} /> },
      { label: 'COMPLETING_REQUEST', icon: <Fingerprint size={14} /> },
    ],
    [],
  )

  const performHandshake = useCallback(
    async (targetId: string) => {
      // ⚡ DEFERRED EXECUTION: ให้ React จบรอบการเรนเดอร์ปัจจุบันก่อนเริ่ม Side Effect
      setStatus('PROCESSING')

      try {
        for (let i = 0; i < verificationSteps.length; i++) {
          setCurrentStep(i)
          await new Promise((res) => setTimeout(res, 600))
        }

        setStatus('SUCCESS')
        // Seamless Transition
        setTimeout(() => router.push(`/contact/success?id=${targetId}&final=true`), 800)
      } catch {
        setStatus('ERROR')
      }
    },
    [router, verificationSteps.length],
  )

  useEffect(() => {
    // 🔍 DIGITAL INTEGRITY CHECK:
    // ใช้ requestAnimationFrame เพื่อให้แน่ใจว่า setState จะไม่ขัดขวางกระบวนการ Render หลัก
    if (id && verified === 'true' && !hasInitiated.current) {
      hasInitiated.current = true
      const frameId = requestAnimationFrame(() => {
        performHandshake(id)
      })
      return () => cancelAnimationFrame(frameId)
    }
  }, [id, verified, performHandshake])

  return (
    <Card className="shadow-sharp relative w-full max-w-lg overflow-hidden border-[4px] border-[#020617] bg-white p-10 md:p-14">
      <div className="relative z-10">
        <div className="mb-10 flex justify-center">
          <div className="shadow-sharp-sm relative flex h-20 w-20 items-center justify-center border-[3px] border-[#020617] bg-white">
            {status === 'PROCESSING' || status === 'IDLE' ? (
              <Loader2 size={32} className="animate-spin text-[#020617]" />
            ) : status === 'SUCCESS' ? (
              <ShieldCheck size={40} className="text-emerald-500" />
            ) : (
              <Lock size={32} className="text-rose-600" />
            )}
            <div className="absolute -right-2 -top-2 bg-[#020617] p-1 text-[#FCDE09]">
              <Cpu size={14} />
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-2 text-center">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-[#020617]">
            {status === 'SUCCESS' ? 'Verified' : 'Verifying'}
            <span className="text-[#FCDE09]">.</span>
          </h2>
          <p className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
            System_Handshake_Active
          </p>
        </div>

        <div className="shadow-sharp-sm space-y-3 bg-[#020617] p-6">
          {verificationSteps.map((step, idx) => (
            <div key={idx} className="flex items-center justify-between font-mono text-[10px]">
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
      </div>
    </Card>
  )
}

export default function SuccessVerifyPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020617] p-6">
      <Suspense fallback={<Loader2 className="animate-spin text-[#FCDE09]" />}>
        <VerifyContent />
      </Suspense>
    </main>
  )
}
