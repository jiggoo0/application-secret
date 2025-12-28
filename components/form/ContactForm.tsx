/** @format */

"use client"

import React, { useState, useId } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createLead } from "@/app/actions/lead-actions"
import {
  Send,
  Loader2,
  CheckCircle,
  Database,
  MessageSquare,
} from "lucide-react"
import { toast } from "sonner"

/**
 * 🛰️ SCHEMA: Contact_Validation_V1
 */
const contactSchema = z.object({
  full_name: z.string().min(2, "REQUIRED_FIELD"),
  phone: z.string().min(9, "INVALID_FORMAT"),
  email: z.string().email("INVALID_EMAIL_PROTOCOL"),
  details: z.string().min(10, "MIN_10_CHAR_REQUIRED"),
})

type ContactFormData = z.infer<typeof contactSchema>

/**
 * 🛰️ COMPONENT: ContactForm
 * 🛡️ ENFORCEMENT: Named Export, Rounded-None, Zero Unused Vars
 */
export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const transmissionId = useId().replace(/:/g, "").toUpperCase()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onExecuteSubmission = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const result = await createLead({
        ...data,
        service_type: "General_Inquiry",
        template_id: "contact_standard_v1",
        status: "new_inquiry",
      })

      if (result.success) {
        setIsSuccess(true)
        toast.success("TRANSMISSION_SUCCESS: Data received.")
      } else {
        toast.error(`SYSTEM_ERROR: ${result.error}`)
      }
    } catch {
      // 🛰️ FIX: Removed unused '_err' variable completely to satisfy strict ESLint rules
      toast.error("CRITICAL_FAILURE: Connection lost.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center py-16 text-center duration-700 animate-in fade-in zoom-in-95">
        <div className="relative mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-none border-2 border-slate-950 bg-slate-950 shadow-[10px_10px_0px_0px_#FCDE09]">
            <CheckCircle className="text-brand" size={40} strokeWidth={1.5} />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-slate-950">
            Message_Received
          </h3>
          <p className="mx-auto max-w-xs font-thai text-[15px] font-medium leading-relaxed text-slate-500">
            ได้รับข้อมูลการติดต่อเรียบร้อยแล้ว <br />
            เจ้าหน้าที่จะดำเนินการติดต่อกลับโดยเร็วที่สุด
          </p>
        </div>
        <button
          onClick={() => setIsSuccess(false)}
          className="group mt-12 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-slate-950"
        >
          <Database size={12} className="group-hover:text-brand" />
          Establish_New_Transmission
        </button>
      </div>
    )
  }

  return (
    <div className="relative selection:bg-brand selection:text-slate-950">
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-none border-2 border-slate-950 bg-white shadow-[4px_4px_0px_0px_#020617]">
          <MessageSquare size={20} className="text-slate-950" />
        </div>
        <div>
          <span className="mb-1 block font-mono text-[10px] font-black uppercase leading-none tracking-[0.3em] text-brand">
            Terminal_Inquiry_V1
          </span>
          <span className="block font-mono text-[9px] font-bold text-slate-400">
            STABLE_CONNECTION_ACTIVE // ID_{transmissionId}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onExecuteSubmission)} className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Full Name Field */}
          <div className="group space-y-2">
            <label className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-focus-within:text-brand">
              Identifier_Node (Name)
            </label>
            <input
              {...register("full_name")}
              className={`w-full rounded-none border-2 bg-slate-50 p-4 font-thai text-sm outline-none transition-all focus:bg-white ${
                errors.full_name
                  ? "border-red-500 bg-red-50"
                  : "border-slate-200 focus:border-slate-950"
              }`}
              placeholder="e.g. SOMCHAI VISUAL"
            />
          </div>

          {/* Phone Field */}
          <div className="group space-y-2">
            <label className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-focus-within:text-brand">
              Contact_Sequence (Phone)
            </label>
            <input
              {...register("phone")}
              className={`w-full rounded-none border-2 bg-slate-50 p-4 font-mono text-sm outline-none transition-all focus:bg-white ${
                errors.phone
                  ? "border-red-500 bg-red-50"
                  : "border-slate-200 focus:border-slate-950"
              }`}
              placeholder="+66 00 000 0000"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="group space-y-2">
          <label className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-focus-within:text-brand">
            Data_Protocol (Email)
          </label>
          <input
            {...register("email")}
            className={`w-full rounded-none border-2 bg-slate-50 p-4 font-mono text-sm outline-none transition-all focus:bg-white ${
              errors.email
                ? "border-red-500 bg-red-50"
                : "border-slate-200 focus:border-slate-950"
            }`}
            placeholder="OPERATIONS@DOMAIN.COM"
          />
        </div>

        {/* Details Field */}
        <div className="group space-y-2">
          <label className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 transition-colors group-focus-within:text-brand">
            Inquiry_Payload_Details
          </label>
          <textarea
            {...register("details")}
            rows={5}
            className={`w-full resize-none rounded-none border-2 bg-slate-50 p-4 font-thai text-sm outline-none transition-all focus:bg-white ${
              errors.details
                ? "border-red-500 bg-red-50"
                : "border-slate-200 focus:border-slate-950"
            }`}
            placeholder="กรุณาระบุรายละเอียดที่ต้องการสอบถามอย่างถี่ถ้วน..."
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center gap-6 overflow-hidden rounded-none border-2 border-slate-950 bg-slate-950 py-6 shadow-[10px_10px_0px_0px_#FCDE09] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="relative z-10 font-mono text-xs font-black uppercase tracking-[0.4em] text-white">
              {isSubmitting
                ? "Transmitting_Payload..."
                : "Execute_Send_Request"}
            </span>
            {isSubmitting ? (
              <Loader2
                size={18}
                className="relative z-10 animate-spin text-brand"
              />
            ) : (
              <Send
                size={18}
                className="relative z-10 text-brand transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            )}
            <div className="absolute inset-0 z-0 translate-y-full bg-slate-900 transition-transform duration-300 group-hover:translate-y-0" />
          </button>

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            <p className="font-mono text-[9px] uppercase tracking-widest text-slate-300">
              Encryption: RSA_4096_ACTIVE
            </p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-slate-300">
              Session_ID: {transmissionId}
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
