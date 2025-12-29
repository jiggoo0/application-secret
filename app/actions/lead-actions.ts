/** @format */
"use server"

import { supabaseServer } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { Resend } from "resend"

/**
 * 🛰️ ACTION_PROTOCOL: CREATE_LEAD_WITH_VERIFICATION
 * STATUS: PRODUCTION_READY [jpvisouldocs.online]
 * UPDATE: v3.2.1 - Enhanced Response Payload & QR Ready
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

    if (!supabaseServer) throw new Error("DB_INIT_FAILED")
    if (!process.env.RESEND_API_KEY) throw new Error("MAIL_KEY_MISSING")
    if (!process.env.NEXT_PUBLIC_APP_URL)
      throw new Error("APP_URL_NOT_CONFIGURED")

    // 🔑 2. TICKET_GENERATION (4-Digit Secure Suffix)
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
          protocol_version: "v3.2.1-secure-sharp",
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

    // 📧 4. EMAIL_DISPATCH (Official Domain: jpvisouldocs.online)
    if (formData.email) {
      const typeKey =
        formData.service_type === "DIGITAL_ASSESSMENT"
          ? "assessment"
          : "contact"
      const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?id=${ticketId}&name=${encodeURIComponent(formData.full_name)}&type=${typeKey}`

      await resend.emails.send({
        from: "JP-VISOUL&DOCS <noreply@jpvisouldocs.online>",
        to: [formData.email],
        subject: `[ACTION REQUIRED] ยืนยันตัวตนรหัสอ้างอิง: ${ticketId}`,
        html: `
          <div style="font-family: sans-serif; background-color: #f8fafc; padding: 40px 10px;">
            <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 2px solid #020617; box-shadow: 15px 15px 0px #e2e8f0;">
              
              <div style="background: #020617; padding: 30px; text-align: center;">
                <h1 style="color: #FCDE09; margin: 0; font-style: italic; font-weight: 900; letter-spacing: -1px;">IDENTITY_CHECK</h1>
                <p style="color: #64748b; font-size: 10px; letter-spacing: 2px; margin-top: 5px;">SECURE_TRANSMISSION_PROTOCOL</p>
              </div>

              <div style="padding: 40px 30px;">
                <p style="font-weight: bold; color: #020617;">เรียนคุณ ${formData.full_name},</p>
                <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                  ระบบได้รับข้อมูลการประเมินของคุณแล้ว เพื่อความปลอดภัย โปรดกดปุ่มด้านล่างเพื่อยืนยันตัวตนและรับ <strong>QR Code Digital Pass</strong> ของคุณ
                </p>

                <div style="text-align: center; margin: 40px 0;">
                  <a href="${verifyUrl}" style="background: #020617; color: #FCDE09; padding: 18px 35px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block; letter-spacing: 2px;">
                    VERIFY_IDENTITY_NOW
                  </a>
                </div>

                <div style="background: #f1f5f9; padding: 15px; border-left: 4px solid #FCDE09; font-size: 12px; color: #64748b;">
                  Ticket ID: <strong>${ticketId}</strong><br/>
                  IP Address: ${ip}
                </div>
              </div>

              <div style="padding: 15px 30px; background: #fafafa; border-top: 1px solid #f1f5f9; text-align: center;">
                <p style="font-size: 9px; color: #cbd5e1; margin: 0;">© 2025 JP-VISOUL&DOCS. LEGAL_PROTECTED_MODE</p>
              </div>

            </div>
          </div>
        `,
      })
    }

    // 🔄 5. CACHE_REVALIDATION
    revalidatePath("/admin/leads")

    // 🎯 6. FINAL_SUCCESS_RESPONSE
    return {
      success: true,
      ticketId: ticketId, // ส่งค่ากลับเพื่อให้ Frontend (AssessmentForm) นำไปโชว์
      name: formData.full_name,
      message: "PROTOCOL_SUCCESS: VERIFICATION_LINK_SENT",
    }
  } catch (error: any) {
    console.error("🚨 [ACTION_FAILURE]:", error.message)
    return {
      success: false,
      error: error.message || "INTERNAL_SYSTEM_FAILURE",
    }
  }
}
