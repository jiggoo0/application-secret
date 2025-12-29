/** @format */
"use client"

import { useState } from "react"
import { createLead } from "@/app/actions/lead-actions"
import {
  Loader2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe2,
  History,
  ClipboardCheck,
  QrCode,
} from "lucide-react"

/**
 * @description ASSESSMENT_FORM_COMPONENT: ระบบประเมินโอกาสและออก Ticket อัตโนมัติ
 * @version 3.2.1 (Security-Focused)
 */

export const AssessmentForm = () => {
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [ticketData, setTicketData] = useState({ id: "", name: "" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const payload = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service_type: "DIGITAL_ASSESSMENT",
      details: `เป้าหมาย: ${formData.get("target_country")} | วัตถุประสงค์: ${formData.get("objective")}`,
      assessment_profile: {
        target_country: formData.get("target_country") as string,
        travel_history: formData.get("travel_history") as string,
        objective: formData.get("objective") as string,
      },
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
        throw new Error("Submission Failed")
      }
    } catch (error) {
      console.error("❌ [FORM_ERROR]:", error)
      alert("ระบบขัดข้องชั่วคราว กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง")
    } finally {
      setLoading(false)
    }
  }

  // --- SUCCESS_STATE: แสดงเมื่อส่งข้อมูลและออกรหัสสำเร็จ ---
  if (isSent) {
    return (
      <div className="space-y-8 rounded-none border-4 border-[#020617] bg-white p-10 text-center shadow-sharp duration-500 animate-in fade-in zoom-in">
        <div className="flex justify-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center border-2 border-[#020617] bg-[#FCDE09] shadow-sharp transition-transform hover:-rotate-6">
            <ShieldCheck className="text-[#020617]" size={40} />
          </div>
          <div className="flex h-20 w-20 items-center justify-center border-2 border-[#020617] bg-white shadow-sharp transition-transform hover:rotate-6">
            <QrCode className="text-[#020617]" size={40} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[#020617]">
            Data_Received.
          </h3>

          <div className="relative border-4 border-[#020617] bg-slate-50 p-6 shadow-sharp">
            <p className="mb-2 font-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Identity_Reference_Ticket
            </p>
            <p className="font-mono text-3xl font-black tracking-widest text-[#020617]">
              {ticketData.id}
            </p>
            <div className="absolute -right-3 -top-3 bg-[#020617] px-3 py-1 text-[10px] font-black italic text-[#FCDE09]">
              V.2025_AUTH
            </div>
          </div>

          <div className="space-y-4 px-2 pt-4">
            <p className="font-thai text-base font-bold leading-relaxed text-slate-600">
              คุณ{" "}
              <span className="text-[#020617] underline decoration-[#FCDE09] decoration-4 underline-offset-4">
                {ticketData.name}
              </span>
            </p>
            <p className="border-l-4 border-[#FCDE09] bg-slate-50 p-4 text-left font-thai text-sm leading-relaxed text-slate-500">
              ระบบกำลังส่ง{" "}
              <span className="font-black text-[#020617]">
                ลิงก์ยืนยันตัวตน
              </span>{" "}
              ไปยังอีเมลของคุณ โปรดคลิกยืนยันเพื่อรับ{" "}
              <strong>Digital Identity Pass</strong> และคิวรับคำปรึกษาทันที
            </p>
          </div>
        </div>
      </div>
    )
  }

  // --- FORM_STATE: สถานะกรอกข้อมูล ---
  return (
    <form onSubmit={handleSubmit} className="relative space-y-8 font-thai">
      {/* ⚡ PROTOCOL_NOTICE */}
      <div className="border-l-4 border-[#FCDE09] bg-slate-50 p-5 shadow-sharp">
        <div className="mb-1 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#020617]">
            System_Notice
          </span>
        </div>
        <p className="text-[12px] font-bold italic leading-relaxed text-[#020617]">
          ข้อมูลนี้จะถูกประมวลผลผ่านระบบ Secure Protocol v3.2 <br />
          เพื่อสร้าง Digital Identity Pass เฉพาะบุคคลสำหรับคุณเท่านั้น
        </p>
      </div>

      {/* INPUT_GRID_A: Identity & Comm */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <ClipboardCheck size={14} /> Full_Legal_Name
          </label>
          <input
            required
            name="full_name"
            placeholder="ชื่อ-นามสกุล (ภาษาไทย/อังกฤษ)"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-4 font-bold shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Communication_Link
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="EMAIL_ADDRESS"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-4 font-mono text-sm shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
          />
        </div>
      </div>

      {/* INPUT_GRID_B: Contact & Destination */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Contact_Registry
          </label>
          <input
            required
            name="phone"
            placeholder="0XX-XXX-XXXX"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-4 font-mono text-sm shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
          />
        </div>
        <div className="space-y-2">
          <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Globe2 size={14} /> Dest_Deployment
          </label>
          <input
            required
            name="target_country"
            placeholder="ระบุประเทศเป้าหมาย"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-4 font-bold shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
          />
        </div>
      </div>

      {/* SELECTION_AREA */}
      <div className="space-y-2">
        <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Strategic_Objective
        </label>
        <div className="relative">
          <select
            name="objective"
            className="w-full cursor-pointer appearance-none rounded-none border-2 border-slate-100 bg-white p-4 text-sm font-black shadow-sm outline-none transition-all focus:border-[#020617]"
          >
            <option value="TOURIST">TOURIST_ENTRY // ท่องเที่ยว</option>
            <option value="BUSINESS">BUSINESS_PROTOCOL // ธุรกิจ</option>
            <option value="WORK">PROFESSIONAL_DEPLOY // ทำงาน</option>
            <option value="OTHER">SPECIAL_REQUEST // อื่นๆ</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <ChevronRight className="rotate-90 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      {/* TEXT_AREA: History */}
      <div className="space-y-2">
        <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <History size={14} /> Relevant_History_Logs
        </label>
        <textarea
          name="travel_history"
          rows={4}
          placeholder="ระบุประวัติการเดินทางหรือข้อมูลเคสที่สำคัญ..."
          className="w-full resize-none rounded-none border-2 border-slate-100 bg-white p-4 text-sm font-bold shadow-sm outline-none transition-all focus:border-[#020617] focus:bg-white"
        />
      </div>

      {/* ACTION_EXECUTE */}
      <div className="pt-4">
        <button
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-4 rounded-none bg-[#020617] py-7 font-black uppercase tracking-[0.6em] text-white shadow-sharp transition-all hover:bg-[#FCDE09] hover:text-[#020617] active:scale-[0.99] disabled:opacity-70"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin" size={20} />
              <span className="animate-pulse">Syncing_Data...</span>
            </div>
          ) : (
            <>
              <Zap
                size={20}
                className="fill-[#FCDE09] transition-colors group-hover:fill-[#020617]"
              />
              Execute_Entry
              <ChevronRight
                size={20}
                className="transition-transform group-hover:translate-x-2"
              />
            </>
          )}
        </button>
      </div>

      {/* FOOTER_PROTOCOL */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-6 opacity-40">
        <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
          <div className="h-1.5 w-1.5 bg-[#10B981]" />
          Connection: Encrypted
        </div>
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
          JPV-DAP-V3.2 // {new Date().getFullYear()}
        </p>
      </div>
    </form>
  )
}
