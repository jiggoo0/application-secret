/** @format */
"use server"

import { supabaseServer } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { Resend } from "resend"

/**
 * 🛰️ ACTION_PROTOCOL: CREATE_LEAD_WITH_VERIFICATION
 * @version 3.2.3 (Build-Safe Edition)
 */

// ✅ FIX: สร้างฟังก์ชันเพื่อเรียกใช้ Resend เฉพาะตอนใช้งานจริง (ป้องกัน Build Error)
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY is missing. Email dispatch will fail.")
    return null
  }
  return new Resend(apiKey)
}

interface LeadData {
  full_name: string
  phone: string
  email?: string
  line_id?: string
  service_type: string
  details: string
  assessment_profile?: {
    travel_history?: string
    denial_history?: boolean
    financial_status?: string
    target_country?: string
    urgency_level?: "standard" | "express" | "critical"
    objective?: string
  }
}

export async function createLead(formData: LeadData) {
  try {
    const headerList = await headers()
    const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "unknown"
    const userAgent = headerList.get("user-agent") || "unknown"

    if (!supabaseServer) throw new Error("CRITICAL_DB_UNAVAILABLE")
    if (!process.env.NEXT_PUBLIC_APP_URL)
      throw new Error("SYSTEM_URL_MISCONFIGURED")

    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase()
    const ticketId = `JPV-${randomCode}`

    const { error: dbError } = await supabaseServer.from("leads").insert([
      {
        name: formData.full_name,
        phone: formData.phone,
        email: formData.email || null,
        message: formData.details,
        category: formData.service_type,
        status: "pending_verification",
        metadata: {
          transmitted_at: new Date().toISOString(),
          protocol_version: "v3.2.3-secure-sharp",
          ticket_id: ticketId,
          verification_level: 0,
          line_id: formData.line_id || "N/A",
          case_profile: formData.assessment_profile || null,
          network_context: { ip_address: ip, user_agent: userAgent },
        },
      },
    ])

    if (dbError) throw new Error(`DATABASE_REJECTED: ${dbError.message}`)

    // 📧 EMAIL_DISPATCH_LOGIC
    if (formData.email) {
      const resend = getResendClient()
      if (!resend) throw new Error("MAIL_PROTOCOL_HALTED: MISSING_KEY")

      const typeKey = formData.service_type.includes("ASSESSMENT")
        ? "assessment"
        : "contact"
      const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?id=${ticketId}&name=${encodeURIComponent(formData.full_name)}&type=${typeKey}`

      await resend.emails.send({
        from: "JP-VISOUL&DOCS <noreply@jpvisouldocs.online>",
        to: [formData.email],
        subject: `[ACTION REQUIRED] ยืนยันข้อมูลรหัสอ้างอิง: ${ticketId}`,
        html: `
          <div style="font-family: 'Courier New', Courier, monospace; background-color: #ffffff; padding: 40px 20px;">
            <div style="max-width: 500px; margin: 0 auto; border: 4px solid #020617; box-shadow: 20px 20px 0px #f1f5f9;">
              <div style="background: #020617; padding: 25px; text-align: left;">
                <span style="background: #FCDE09; color: #020617; padding: 2px 8px; font-size: 10px; font-weight: 900; letter-spacing: 2px;">SECURE_MAIL_v3.2</span>
                <h1 style="color: #ffffff; margin: 15px 0 0 0; font-size: 24px; font-weight: 900; text-transform: uppercase; font-style: italic;">Identity Check.</h1>
              </div>
              <div style="padding: 40px 30px; color: #020617;">
                <p style="font-size: 14px; font-weight: 900;">เรียน คุณ ${formData.full_name},</p>
                <p style="font-size: 13px; line-height: 1.8; color: #475569;">
                  โปรดยืนยันตัวตนผ่านปุ่มด้านล่าง เพื่อเปิดใช้งาน <strong>Digital Pass</strong> ของคุณ:
                </p>
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${verifyUrl}" style="background: #020617; color: #FCDE09; padding: 20px 40px; text-decoration: none; font-weight: 900; font-size: 14px; display: inline-block; letter-spacing: 3px; box-shadow: 8px 8px 0px #FCDE09;">
                    VERIFY_IDENTITY
                  </a>
                </div>
                <div style="background: #f8fafc; border-left: 8px solid #FCDE09; padding: 20px;">
                   <span style="font-size: 11px; color: #94a3b8;">TICKET_ID: <strong>${ticketId}</strong></span>
                </div>
              </div>
            </div>
          </div>
        `,
      })
    }

    revalidatePath("/admin/leads")
    return { success: true, ticketId, name: formData.full_name }
  } catch (error: any) {
    console.error("🚨 [ACTION_FAILURE]:", error.message)
    return { success: false, error: error.message }
  }
}
