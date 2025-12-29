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
 * 🛰️ COMPONENT: ASSESSMENT_FORM_PROTOCOL
 * @version 3.2.2 (Human-Friendly Update)
 * ปรับปรุงให้หาช่องกรอกอีเมลได้ง่ายขึ้น และใช้ภาษาที่เป็นมิตร
 */
export const AssessmentForm = () => {
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [ticketData, setTicketData] = useState({ id: "", name: "" })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loading) return
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
      alert("ระบบขัดข้องชั่วคราว โปรดตรวจสอบข้อมูลและลองใหม่อีกครั้ง")
    } finally {
      setLoading(false)
    }
  }

  if (isSent) {
    return (
      <div className="space-y-8 border-4 border-[#020617] bg-white p-10 text-center shadow-sharp duration-500 animate-in fade-in zoom-in">
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
              เราได้รับข้อมูลแล้ว โปรดตรวจสอบ{" "}
              <span className="font-black text-[#020617]">
                กล่องจดหมายของคุณ
              </span>{" "}
              เพื่อกดรับผลประเมินและคิวปรึกษาเบื้องต้นทันที
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-8 font-thai">
      <div className="border-l-4 border-[#FCDE09] bg-slate-50 p-5 shadow-sharp">
        <div className="mb-1 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#020617]">
            Important_Notice
          </span>
        </div>
        <p className="text-[12px] font-bold italic leading-relaxed text-[#020617]">
          กรุณากรอกข้อมูลตามจริง
          เพื่อให้ที่ปรึกษาประเมินโอกาสของคุณได้อย่างแม่นยำที่สุด
        </p>
      </div>

      {/* INPUT_GRID_A: IDENTITY & EMAIL (🚩 ช่องอีเมลอยู่ทางขวา) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <ClipboardCheck size={14} /> ชื่อ-นามสกุล
          </label>
          <input
            required
            name="full_name"
            placeholder="ระบุชื่อจริง-นามสกุล"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-4 font-bold shadow-sm outline-none transition-all focus:border-[#020617]"
          />
        </div>

        {/* 🚩 ช่องสำหรับส่งจดหมาย (เน้นสีพิเศษให้หาเจอง่าย) */}
        <div className="space-y-2">
          <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#020617]">
            อีเมลสำหรับรับผลประเมิน (สำคัญ)
          </label>
          <input
            required
            type="email"
            name="email"
            placeholder="กรอกอีเมลที่ใช้งานปัจจุบัน"
            className="w-full rounded-none border-2 border-[#FCDE09] bg-white p-4 font-mono text-sm shadow-sm outline-none transition-all focus:border-[#020617]"
          />
        </div>
      </div>

      {/* INPUT_GRID_B: CONTACT & DESTINATION */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            เบอร์โทรศัพท์ติดต่อ
          </label>
          <input
            required
            name="phone"
            placeholder="0XX-XXX-XXXX"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-4 font-mono text-sm shadow-sm outline-none transition-all focus:border-[#020617]"
          />
        </div>
        <div className="space-y-2">
          <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Globe2 size={14} /> ประเทศที่ต้องการไป
          </label>
          <input
            required
            name="target_country"
            placeholder="เช่น อเมริกา, อังกฤษ, ญี่ปุ่น"
            className="w-full rounded-none border-2 border-slate-100 bg-white p-4 font-bold shadow-sm outline-none transition-all focus:border-[#020617]"
          />
        </div>
      </div>

      {/* SELECTION_AREA */}
      <div className="space-y-2">
        <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          วัตถุประสงค์การเดินทาง
        </label>
        <div className="relative">
          <select
            name="objective"
            className="w-full cursor-pointer appearance-none rounded-none border-2 border-slate-100 bg-white p-4 text-sm font-black shadow-sm outline-none transition-all focus:border-[#020617]"
          >
            <option value="TOURIST">ท่องเที่ยว</option>
            <option value="BUSINESS">ทำธุรกิจ / ประชุม</option>
            <option value="WORK">ทำงาน / ย้ายถิ่นฐาน</option>
            <option value="OTHER">อื่นๆ</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <ChevronRight className="rotate-90 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      {/* TEXT_AREA: HISTORY */}
      <div className="space-y-2">
        <label className="ml-1 flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <History size={14} /> ข้อมูลประวัติโดยย่อ
        </label>
        <textarea
          name="travel_history"
          rows={4}
          placeholder="ระบุประวัติการเดินทาง หรือข้อมูลเคสเดิม (ถ้ามี)..."
          className="w-full resize-none rounded-none border-2 border-slate-100 bg-white p-4 text-sm font-bold shadow-sm outline-none transition-all focus:border-[#020617]"
        />
      </div>

      {/* ACTION_EXECUTE */}
      <div className="pt-4">
        <button
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-4 rounded-none bg-[#020617] py-7 font-black uppercase tracking-[0.4em] text-white shadow-sharp transition-all hover:bg-[#FCDE09] hover:text-[#020617] active:scale-[0.99] disabled:opacity-70"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin" size={20} />
              <span className="animate-pulse tracking-widest">
                ประมวลผลข้อมูล...
              </span>
            </div>
          ) : (
            <>
              <Zap
                size={20}
                className="fill-[#FCDE09] transition-colors group-hover:fill-[#020617]"
              />
              ตรวจสอบข้อมูลฟรี
              <ChevronRight
                size={20}
                className="transition-transform group-hover:translate-x-2"
              />
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-6 opacity-40">
        <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-500">
          <div className="h-1.5 w-1.5 bg-[#10B981]" />
          Secure_Connection
        </div>
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
          JPV-DAP-V3.2 // {new Date().getFullYear()}
        </p>
      </div>
    </form>
  )
}
