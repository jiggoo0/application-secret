/** @format */
"use client"

import { useState } from "react"
import { createLead } from "@/app/actions/lead-actions"
import {
  Loader2,
  SendHorizontal,
  MailCheck,
  ShieldCheck,
  Search,
  Map,
  AlertCircle,
  Briefcase,
  CheckCircle2,
  QrCode,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * @description CONTACT_FORM_COMPONENT: ระบบจัดการข้อมูลผู้ติดต่อพร้อมการออก Ticket ID
 * @version 3.2.0 (Industrial Sharp Style)
 */

const SERVICE_OPTIONS = [
  {
    id: "GENERAL_INQUIRY",
    label: "สอบถามทั่วไป",
    icon: Search,
    desc: "ข้อมูลเบื้องต้นเกี่ยวกับบริการ",
  },
  {
    id: "STRATEGIC_PLANNING",
    label: "วางแผนกลยุทธ์",
    icon: Map,
    desc: "จัดเตรียมแผนยื่นวีซ่าความสำเร็จสูง",
  },
  {
    id: "APPEAL_CONSULT",
    label: "ปรึกษาเคสปฏิเสธ",
    icon: AlertCircle,
    desc: "วิเคราะห์และแก้ไขเคสที่ไม่ผ่าน",
  },
  {
    id: "CORPORATE_DOCUMENT",
    label: "เอกสารองค์กร",
    icon: Briefcase,
    desc: "รองรับการยื่นวีซ่าระดับธุรกิจ",
  },
]

export const ContactForm = () => {
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [selectedService, setSelectedService] = useState("GENERAL_INQUIRY")
  const [ticketData, setTicketData] = useState({ id: "", name: "" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service_type: selectedService,
      details: formData.get("details") as string,
    }

    try {
      const result = await createLead(payload as any)
      if (result.success) {
        setTicketData({
          id: result.ticketId || "PENDING",
          name: payload.full_name,
        })
        setIsSent(true)
      } else {
        // Handle failure if needed (e.g., toast notification)
        setLoading(false)
      }
    } catch (error) {
      console.error("❌ [CONTACT_ERROR]:", error)
      setLoading(false)
    }
  }

  // --- SUCCESS_VIEW: เมื่อส่งข้อมูลสำเร็จ ---
  if (isSent) {
    return (
      <div className="relative space-y-8 overflow-hidden rounded-none border-4 border-[#020617] bg-white px-8 py-16 text-center shadow-sharp duration-500 animate-in fade-in zoom-in">
        {/* Decorative corner accent */}
        <div className="clip-path-slant absolute right-0 top-0 h-12 w-12 bg-[#FCDE09]" />

        <div className="flex justify-center gap-6">
          <div className="flex h-20 w-20 -rotate-3 transform items-center justify-center border-2 border-[#020617] bg-[#FCDE09] shadow-sharp">
            <MailCheck className="text-[#020617]" size={40} />
          </div>
          <div className="flex h-20 w-20 rotate-3 transform items-center justify-center border-2 border-[#020617] bg-white shadow-sharp">
            <QrCode className="text-[#020617]" size={40} />
          </div>
        </div>

        <div className="mx-auto max-w-sm space-y-4 font-thai">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[#020617]">
            Verification_Required
          </h3>

          <div className="bg-[#020617] p-5 shadow-sharp">
            <p className="mb-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#FCDE09]/60">
              Reference_Ticket_ID
            </p>
            <p className="font-mono text-2xl font-black tracking-[0.2em] text-white">
              {ticketData.id}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-sm font-bold leading-relaxed text-slate-600">
              คุณ{" "}
              <span className="text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                {ticketData.name}
              </span>{" "}
              ระบบได้รับข้อมูลแล้ว
            </p>
            <p className="border-l-4 border-[#FCDE09] bg-slate-50 p-4 text-[12px] font-medium leading-relaxed text-slate-400">
              โปรดตรวจสอบอีเมลของคุณเพื่อกดยืนยันตัวตน <br />
              รหัสนี้จะถูกใช้เพื่อออก <strong>Digital Pass</strong>{" "}
              สำหรับติดตามเคส
            </p>
          </div>
        </div>
      </div>
    )
  }

  // --- FORM_VIEW: หน้าฟอร์มปกติ ---
  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-thai">
      {/* IDENTITY_SECTION */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Full_Name
          </label>
          <input
            required
            name="full_name"
            placeholder="ชื่อ-นามสกุล"
            className="w-full rounded-none border-2 border-slate-100 bg-slate-50 p-4 font-bold shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="ml-1 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Official_Email
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="EMAIL_ADDRESS"
            className="w-full rounded-none border-2 border-slate-100 bg-slate-50 p-4 font-mono text-sm shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Contact_Phone
          </label>
          <input
            required
            name="phone"
            placeholder="0XX-XXX-XXXX"
            className="w-full rounded-none border-2 border-slate-100 bg-slate-50 p-4 font-mono text-sm shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
          />
        </div>
        <div className="flex items-end">
          <div className="flex w-full items-center gap-3 border-2 border-transparent bg-slate-100 px-5 py-4 italic">
            <ShieldCheck size={18} className="text-slate-400" />
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400">
              Auth_Level: Secure_Access
            </span>
          </div>
        </div>
      </div>

      {/* SERVICE_SELECTION_GRID */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1.5 bg-[#FCDE09]" />
          <label className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#020617]">
            Service_Selection_Protocol
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((item) => {
            const Icon = item.icon
            const isActive = selectedService === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedService(item.id)}
                className={cn(
                  "group relative rounded-none border-2 p-5 text-left transition-all duration-300 active:scale-[0.97]",
                  isActive
                    ? "-translate-y-1 transform border-[#020617] bg-[#020617] text-white shadow-sharp"
                    : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                {isActive && (
                  <CheckCircle2
                    size={16}
                    className="absolute right-3 top-3 text-[#FCDE09] animate-in zoom-in"
                  />
                )}
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "border-2 p-3 transition-colors",
                      isActive
                        ? "border-[#FCDE09]/30 bg-[#FCDE09]/10"
                        : "border-slate-100 bg-slate-50"
                    )}
                  >
                    <Icon
                      size={22}
                      className={isActive ? "text-[#FCDE09]" : "text-slate-400"}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase leading-tight tracking-tight">
                      {item.label}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-[10px] font-bold italic",
                        isActive ? "text-slate-400" : "text-slate-300"
                      )}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* DETAIL_SECTION */}
      <div className="space-y-2">
        <label className="ml-1 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Transmission_Details
        </label>
        <textarea
          required
          name="details"
          rows={5}
          placeholder="ระบุรายละเอียดเคสหรือคำถามที่คุณต้องการความช่วยเหลือ..."
          className="w-full resize-none rounded-none border-2 border-slate-100 bg-slate-50 p-4 text-sm font-bold shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
        />
      </div>

      {/* ACTION_BUTTON */}
      <div className="pt-4">
        <button
          disabled={loading}
          className="group flex w-full items-center justify-center gap-4 rounded-none bg-[#020617] py-7 font-black uppercase tracking-[0.5em] text-white shadow-sharp transition-all hover:bg-[#FCDE09] hover:text-[#020617] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              <span>Syncing_Data...</span>
            </>
          ) : (
            <>
              Execute_Send
              <SendHorizontal
                size={22}
                className="transition-transform duration-300 group-hover:translate-x-3"
              />
            </>
          )}
        </button>
      </div>

      <div className="pointer-events-none flex items-center justify-center gap-4 opacity-30 grayscale">
        <div className="h-[1px] flex-1 bg-slate-300" />
        <p className="font-mono text-[8px] uppercase tracking-[0.8em] text-slate-500">
          Secure_Protocol_v3.2_Enabled
        </p>
        <div className="h-[1px] flex-1 bg-slate-300" />
      </div>
    </form>
  )
}
