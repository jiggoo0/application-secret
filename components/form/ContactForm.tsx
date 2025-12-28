/** @format */
"use client"

import React, { useState } from "react"
import { createLead } from "@/app/actions/lead-actions"
import { Send, Loader2, CheckCircle } from "lucide-react"

/**
 * 🛰️ COMPONENT: ContactForm
 * ฟอร์มติดต่อสอบถามมาตรฐาน (Contact_Standard_V1)
 * แก้ไข: ลบ Unused Import 'cn' เพื่อให้ผ่าน Lint Check
 */
export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    service_type: "General_Inquiry",
    details: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await createLead({
      ...formData,
      template_id: "contact_standard_v1",
      status: "new_inquiry",
    })

    if (result.success) {
      setIsSuccess(true)
    } else {
      alert("SYSTEM_ERROR: " + result.error)
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center py-12 text-center duration-500 animate-in fade-in zoom-in">
        <div className="mb-6 flex h-16 w-16 items-center justify-center bg-brand">
          <CheckCircle className="text-slate-950" size={32} />
        </div>
        <h3 className="text-2xl font-black uppercase italic text-slate-950">
          Message_Received
        </h3>
        <p className="mt-2 max-w-xs font-thai text-slate-500">
          ได้รับข้อมูลการติดต่อเรียบร้อยแล้ว <br />
          เจ้าหน้าที่จะดำเนินการติดต่อกลับโดยเร็วที่สุด
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-8 font-mono text-[10px] font-black uppercase tracking-widest text-slate-400 underline underline-offset-4 hover:text-slate-950"
        >
          Send_Another_Transmission
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* IDENTIFIER_GROUP */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="audit-label">Identifier (Name)</label>
          <input
            required
            className="audit-input"
            placeholder="NAME SURNAME"
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="audit-label">Contact_Number</label>
          <input
            required
            className="audit-input"
            placeholder="+66 00 000 0000"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
      </div>

      {/* EMAIL_COMMUNICATION */}
      <div className="space-y-2">
        <label className="audit-label">Email_Protocol</label>
        <input
          type="email"
          className="audit-input"
          placeholder="OPERATIONS@DOMAIN.COM"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {/* INQUIRY_PAYLOAD */}
      <div className="space-y-2">
        <label className="audit-label">Inquiry_Details</label>
        <textarea
          required
          rows={4}
          className="audit-input"
          placeholder="พิมพ์ข้อความที่ต้องการสอบถาม..."
          onChange={(e) =>
            setFormData({ ...formData, details: e.target.value })
          }
        />
      </div>

      {/* EXECUTION_TRIGGER */}
      <button
        disabled={isSubmitting}
        className="group flex w-full items-center justify-center gap-4 bg-slate-950 py-4 text-white transition-all hover:bg-brand hover:text-slate-950 active:scale-[0.98] disabled:opacity-50"
      >
        <span className="font-mono text-xs font-black uppercase tracking-[0.2em]">
          {isSubmitting ? "Transmitting..." : "Execute_Send"}
        </span>
        {isSubmitting ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send
            size={18}
            className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        )}
      </button>
    </form>
  )
}
