/** @format */
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { createLead } from "@/app/actions/lead-actions"
import { ArrowRight, Loader2, ChevronLeft, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * 🛰️ COMPONENT: AssessmentForm
 * ฟอร์มประเมินโอกาสได้รับวีซ่าแบบแบ่งเป็นลำดับขั้น (Multi-step Protocol)
 * แก้ไข: เปลี่ยน 'err' เป็น '_err' เพื่อกำจัด Lint Warning (Unused Variable)
 */
export default function AssessmentForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // 🛡️ VALIDATION_LOGIC: ตรวจสอบข้อมูลก่อนไปขั้นถัดไป
  const canGoNext = () => {
    if (step === 1)
      return formData.full_name.length > 2 && formData.phone.length > 8
    if (step === 3)
      return formData.details.length > 10 // บังคับใส่รายละเอียดอย่างน้อย 10 ตัวอักษร
    return true
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < totalSteps) {
      setStep((prev) => prev + 1)
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
      // ✅ FIXED: ใช้ _err เพื่อบอก ESLint ว่าตั้งใจไม่เรียกใช้ตัวแปรนี้
      console.error("Transmission Error:", _err)
      alert("CONNECTION_INTERRUPTED: กรุณาตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl overflow-hidden border border-slate-950 bg-white p-8 shadow-sharp-sm md:p-12">
      {/* 🧩 Decorative Background Grid */}
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 bg-blueprint-grid opacity-5" />

      {/* 📊 PROGRESS_TRACKER */}
      <div className="relative z-10 mb-12">
        <div className="mb-3 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-brand">
              Phase_Registry
            </span>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-950">
              Phase_0{step}
            </h2>
          </div>
          <span className="font-mono text-[10px] font-bold text-slate-400">
            {progress.toFixed(0)}% SYNCHRONIZED
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-slate-950 transition-all duration-700 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleNextStep} className="relative z-10">
        <div className="min-h-[300px]">
          {/* STEP_01: PERSONAL_DATA */}
          {step === 1 && (
            <div className="space-y-6 duration-500 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="audit-label">Full_Name (Legal ID)</label>
                  <input
                    required
                    type="text"
                    className="audit-input"
                    placeholder="สมชาย วิชวล"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="audit-label">Contact_Phone_Node</label>
                  <input
                    required
                    type="tel"
                    className="audit-input"
                    placeholder="08X-XXX-XXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP_02: CASE_ANALYSIS */}
          {step === 2 && (
            <div className="space-y-6 duration-500 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="audit-label">
                  Target_Destination_Protocol
                </label>
                <select
                  className="audit-input appearance-none"
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
              </div>
              <div className="border border-slate-200 bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-slate-400" />
                  <label className="audit-label mb-0">
                    Security_Clearance / Denial_History
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
                        "flex-1 border-2 py-4 font-mono text-[10px] font-black uppercase transition-all",
                        formData.assessment_profile.denial_history === val
                          ? "border-slate-950 bg-slate-950 text-brand shadow-sharp-sm"
                          : "border-slate-100 bg-white text-slate-400 hover:border-slate-300"
                      )}
                    >
                      {val ? "Confirmed_Refusal" : "Clear_Record"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP_03: FINALIZATION */}
          {step === 3 && (
            <div className="space-y-6 duration-500 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="audit-label">Brief_Case_Details</label>
                <textarea
                  required
                  rows={5}
                  className="audit-input resize-none"
                  placeholder="Describe your current status or specific concerns..."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                />
              </div>
              <p className="font-mono text-[9px] uppercase leading-relaxed text-slate-400">
                By executing this commit, you authorize JP Visual.Docs to
                process your data for legal assessment purposes under the
                privacy_protocol_v2.
              </p>
            </div>
          )}
        </div>

        {/* 🕹️ CONTROLS */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-10">
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 1 || isSubmitting}
            className={cn(
              "flex items-center gap-2 font-mono text-[10px] font-black uppercase transition-all",
              step === 1
                ? "pointer-events-none opacity-0"
                : "text-slate-400 hover:text-slate-950"
            )}
          >
            <ChevronLeft size={14} /> Back_Phase
          </button>

          <button
            disabled={isSubmitting || !canGoNext()}
            className={cn(
              "flex items-center gap-4 px-10 py-5 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale",
              step === totalSteps
                ? "bg-brand text-slate-950 shadow-sharp"
                : "bg-slate-950 text-white shadow-sharp-brand"
            )}
          >
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em]">
              {isSubmitting
                ? "Encrypting"
                : step === totalSteps
                  ? "Confirm_&_Execute"
                  : "Proceed_Phase"}
            </span>
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
