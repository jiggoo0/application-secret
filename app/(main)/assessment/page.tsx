/** @format */
"use client"

import React, { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createLead } from "@/app/actions/lead-actions"
import {
  ArrowRight,
  Loader2,
  ChevronLeft,
  ShieldCheck,
  Database,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AssessmentForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = Forward, -1 = Backward

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    service_type: "Visa_Assessment",
    details: "",
    assessment_profile: {
      target_country: "United Kingdom",
      denial_history: false,
      urgency_level: "standard" as const,
    },
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  // 🛡️ VALIDATION_LOGIC
  const canGoNext = useCallback(() => {
    if (step === 1)
      return formData.full_name.length > 2 && formData.phone.length > 8
    if (step === 3) return formData.details.length > 10
    return true
  }, [step, formData])

  const handleStepNavigation = (targetStep: number) => {
    setDirection(targetStep > step ? 1 : -1)
    setStep(targetStep)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < totalSteps) {
      handleStepNavigation(step + 1)
    } else {
      processFinalSubmission()
    }
  }

  const processFinalSubmission = async () => {
    setIsSubmitting(true)
    try {
      const result = await createLead({
        ...formData,
        template_id: "assessment_protocol_v1",
      })

      if (result.success) {
        router.push("/assessment/success")
      } else {
        alert("CRITICAL_SYSTEM_FAILURE: " + result.error)
      }
    } catch (_err) {
      console.error("Transmission Error:", _err)
      alert(
        "CONNECTION_INTERRUPTED: กรุณาตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden border-2 border-slate-950 bg-white p-10 shadow-[24px_24px_0px_0px_rgba(2,6,23,0.05)] md:p-14">
      {/* 🧩 Technical Background Infrastructure */}
      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-blueprint-grid opacity-[0.07] [mask-image:linear-gradient(to_bottom_left,black,transparent)]" />
      <div className="absolute left-0 top-0 h-1.5 w-full bg-slate-50">
        <div
          className="h-full bg-brand shadow-[0_0_12px_#FCDE09] transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 📊 PHASE_TRACKER_HEADER */}
      <header className="relative z-10 mb-14 flex items-end justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database size={12} className="text-brand" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Protocol_Deployment
            </span>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-950">
            Phase_0{step}
            <span className="text-brand">.</span>
          </h2>
        </div>
        <div className="text-right font-mono">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-950">
            <span className="animate-pulse">●</span>
            {progress.toFixed(0)}% SYNCHRONIZED
          </div>
          <p className="text-[8px] font-bold uppercase tracking-widest text-slate-300">
            System_Integrity: Optimal
          </p>
        </div>
      </header>

      <form onSubmit={handleFormSubmit} className="relative z-10">
        <div
          className={cn(
            "min-h-[320px] transition-all duration-500",
            direction === 1
              ? "animate-in fade-in slide-in-from-right-8"
              : "animate-in fade-in slide-in-from-left-8"
          )}
        >
          {/* STEP_01: PERSONAL_DATA */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="group space-y-3">
                <label className="audit-label transition-colors group-focus-within:text-brand">
                  Legal_Identity_Full_Name
                </label>
                <input
                  required
                  type="text"
                  className="audit-input focus:border-brand"
                  placeholder="e.g., SOMCHAI VISUAL"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />
              </div>
              <div className="group space-y-3">
                <label className="audit-label transition-colors group-focus-within:text-brand">
                  Contact_Phone_Node
                </label>
                <input
                  required
                  type="tel"
                  className="audit-input focus:border-brand"
                  placeholder="08X-XXX-XXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* STEP_02: CASE_ANALYSIS */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="audit-label">
                  Target_Destination_Protocol
                </label>
                <div className="relative">
                  <select
                    className="audit-input appearance-none pr-10 focus:border-brand"
                    value={formData.assessment_profile.target_country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assessment_profile: {
                          ...formData.assessment_profile,
                          target_country: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="United Kingdom">United Kingdom (UK)</option>
                    <option value="Schengen Area">Schengen Area (EU)</option>
                    <option value="USA / Canada">USA / Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <ArrowRight
                    size={14}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400"
                  />
                </div>
              </div>
              <div className="border-l-2 border-slate-900 bg-slate-50 p-8 transition-all hover:bg-slate-100/50">
                <div className="mb-6 flex items-center gap-3">
                  <ShieldCheck size={16} className="text-brand" />
                  <label className="audit-label mb-0 text-slate-900">
                    Security_Clearance / History
                  </label>
                </div>
                <div className="flex gap-4">
                  {[false, true].map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          assessment_profile: {
                            ...formData.assessment_profile,
                            denial_history: val,
                          },
                        })
                      }
                      className={cn(
                        "flex-1 border-2 py-5 font-mono text-[10px] font-black uppercase tracking-widest transition-all",
                        formData.assessment_profile.denial_history === val
                          ? "border-slate-950 bg-slate-950 text-brand shadow-[8px_8px_0px_0px_#FCDE09]"
                          : "border-slate-200 bg-white text-slate-400 hover:border-slate-400 hover:text-slate-600"
                      )}
                    >
                      {val ? "Refusal_Detected" : "Record_Clear"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP_03: FINALIZATION */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="audit-label">Case_Executive_Summary</label>
                <textarea
                  required
                  rows={6}
                  className="audit-input resize-none focus:border-brand"
                  placeholder="Describe your current status or specific concerns for our expert audit..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 border border-slate-100 bg-slate-50 p-5">
                <Zap size={16} className="shrink-0 text-brand" />
                <p className="font-mono text-[9px] uppercase leading-loose text-slate-400">
                  Data encrypted via{" "}
                  <span className="font-black text-slate-950">
                    256-bit protocol
                  </span>
                  . By executing, you authorize JP Visual.Docs to conduct a
                  technical eligibility assessment.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 🕹️ CONTROL_SYSTEM */}
        <div className="mt-14 flex items-center justify-between border-t-2 border-slate-950 pt-10">
          <button
            type="button"
            onClick={() => handleStepNavigation(step - 1)}
            disabled={step === 1 || isSubmitting}
            className={cn(
              "group flex items-center gap-2 font-mono text-[11px] font-black uppercase transition-all",
              step === 1
                ? "pointer-events-none opacity-0"
                : "text-slate-400 hover:text-slate-950"
            )}
          >
            <ChevronLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />{" "}
            Back_Phase
          </button>

          <button
            disabled={isSubmitting || !canGoNext()}
            className={cn(
              "group flex items-center gap-5 px-12 py-6 transition-all active:scale-95 disabled:opacity-30",
              step === totalSteps
                ? "bg-brand text-slate-950 shadow-[10px_10px_0px_0px_#020617] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                : "bg-slate-950 text-white shadow-[10px_10px_0px_0px_#FCDE09] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            )}
          >
            <span className="font-mono text-[12px] font-black uppercase tracking-[0.3em]">
              {isSubmitting
                ? "Syncing..."
                : step === totalSteps
                  ? "Execute_Audit"
                  : "Next_Phase"}
            </span>
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
