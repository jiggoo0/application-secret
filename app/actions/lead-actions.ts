/** @format */
"use server"

import { supabaseServer } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { Resend } from "resend"

/**
 * 🛰️ ACTION_PROTOCOL: CREATE_LEAD_WITH_VERIFICATION
 * @version 3.2.2 (Industrial Sharp Edition)
 * STATUS: PRODUCTION_READY [jpvisouldocs.online]
 */

const resend = new Resend(process.env.RESEND_API_KEY)

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
    // 🛡️ 1. INFRASTRUCTURE_VALIDATION
    const headerList = await headers()
    const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "unknown"
    const userAgent = headerList.get("user-agent") || "unknown"

    if (!supabaseServer) throw new Error("CRITICAL_DB_UNAVAILABLE")
    if (!process.env.RESEND_API_KEY) throw new Error("MAIL_PROTOCOL_HALTED")
    if (!process.env.NEXT_PUBLIC_APP_URL)
      throw new Error("SYSTEM_URL_MISCONFIGURED")

    // 🔑 2. TICKET_GENERATION (Sharp Reference Logic)
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase()
    const ticketId = `JPV-${randomCode}`

    // 🛰️ 3. DATABASE_ENTRY (Sync with Supabase)
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
          protocol_version: "v3.2.2-secure-sharp",
          ticket_id: ticketId,
          verification_level: 0,
          line_id: formData.line_id || "N/A",
          case_profile: formData.assessment_profile || null,
          network_context: {
            ip_address: ip,
            user_agent: userAgent,
          },
        },
      },
    ])

    if (dbError) throw new Error(`DATABASE_REJECTED: ${dbError.message}`)

    // 📧 4. EMAIL_DISPATCH (Industrial Template)
    if (formData.email) {
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
            <div style="max-width: 500px; margin: 0 auto; border: 4px solid #020617; padding: 0; box-shadow: 20px 20px 0px #f1f5f9;">
              
              <div style="background: #020617; padding: 25px; text-align: left;">
                <span style="background: #FCDE09; color: #020617; padding: 2px 8px; font-size: 10px; font-weight: 900; letter-spacing: 2px;">SECURE_MAIL_v3.2</span>
                <h1 style="color: #ffffff; margin: 15px 0 0 0; font-size: 24px; font-weight: 900; text-transform: uppercase; font-style: italic;">Identity Check.</h1>
              </div>

              <div style="padding: 40px 30px; color: #020617;">
                <p style="font-size: 14px; font-weight: 900; margin-bottom: 20px;">เรียน คุณ ${formData.full_name},</p>
                <p style="font-size: 13px; line-height: 1.8; color: #475569; margin-bottom: 30px;">
                  ระบบได้รับข้อมูลการขอรับคำปรึกษาของคุณเรียบร้อยแล้ว เพื่อเปิดใช้งาน <strong style="color: #020617;">Digital Pass</strong> และจัดลำดับคิวในระบบ โปรดยืนยันตัวตนผ่านปุ่มด้านล่าง:
                </p>

                <div style="text-align: center; margin: 40px 0;">
                  <a href="${verifyUrl}" style="background: #020617; color: #FCDE09; padding: 20px 40px; text-decoration: none; font-weight: 900; font-size: 14px; border: none; display: inline-block; letter-spacing: 3px; box-shadow: 8px 8px 0px #FCDE09;">
                    VERIFY_IDENTITY
                  </a>
                </div>

                <div style="background: #f8fafc; border-left: 8px solid #FCDE09; padding: 20px; margin-top: 40px;">
                  <table style="width: 100%; font-size: 11px; font-weight: bold;">
                    <tr>
                      <td style="color: #94a3b8; width: 100px;">TICKET_ID:</td>
                      <td style="color: #020617;">${ticketId}</td>
                    </tr>
                    <tr>
                      <td style="color: #94a3b8;">TRANSMIT_IP:</td>
                      <td style="color: #020617;">${ip}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div style="background: #020617; padding: 15px; text-align: center;">
                <p style="font-size: 9px; color: #475569; margin: 0; letter-spacing: 2px;">© 2025 JP-VISOUL&DOCS | SECURE_ENCRYPTED_DATA</p>
              </div>

            </div>
          </div>
        `,
      })
    }

    // 🔄 5. CACHE_REVALIDATION
    revalidatePath("/admin/leads")
    revalidatePath("/assessment/success")

    // 🎯 6. FINAL_SUCCESS_RESPONSE
    return {
      success: true,
      ticketId: ticketId,
      name: formData.full_name,
      message: "PROTOCOL_SUCCESS: VERIFICATION_LINK_DISPATCHED",
    }
  } catch (error: any) {
    console.error("🚨 [ACTION_FAILURE]:", error.message)
    return {
      success: false,
      error: error.message || "INTERNAL_SYSTEM_FAILURE",
    }
  }
}
