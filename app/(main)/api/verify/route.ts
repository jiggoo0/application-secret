/** @format */

import { Resend } from "resend"
import { NextResponse } from "next/server"

/**
 * 🛰️ API_ROUTE: EMAIL_DISPATCH_SERVICE
 * PURPOSE: จัดการการส่งอีเมลยืนยันตัวตนผ่านทาง API (Server-side Only)
 * FIX: เปลี่ยน reply_to เป็น replyTo เพื่อให้ตรงกับ Resend SDK Type Definitions
 */

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // 🛡️ 1. DATA_INTEGRITY_CHECK
    const body = await request.json()
    const { email, fullname, ticketId, type } = body

    if (!email || !ticketId) {
      return NextResponse.json(
        { success: false, message: "MISSING_REQUIRED_FIELDS" },
        { status: 400 }
      )
    }

    // 🔗 2. CONSTRUCT_VERIFICATION_LINK
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://jpvisouldocs.online"

    const verifyUrl = `${baseUrl}/verify?id=${ticketId}&name=${encodeURIComponent(
      fullname
    )}&type=${type || "assessment"}`

    // 📧 3. EXECUTE_EMAIL_DISPATCH
    const { data: _data, error: mailError } = await resend.emails.send({
      from: "JP-VISOUL&DOCS <concierge@jpvisouldocs.online>",
      to: [email],
      // ✅ FIX: เปลี่ยนจาก reply_to เป็น replyTo ตาม TS Error ที่แจ้ง (CamelCase)
      replyTo: "support@jpvisouldocs.online",
      subject: `[ACTION REQUIRED] ยืนยันตัวตนเพื่อรับรหัส: ${ticketId}`,
      html: `
        <div style="font-family: sans-serif; background-color: #ffffff; padding: 40px 20px;">
          <div style="max-width: 500px; margin: 0 auto; border: 4px solid #020617;">
            <div style="background-color: #020617; padding: 30px; text-align: center;">
              <h1 style="color: #FCDE09; margin: 0; font-size: 24px; font-weight: 900; font-style: italic; text-transform: uppercase;">Identity_Check.</h1>
            </div>
            <div style="padding: 40px 30px; color: #020617;">
              <p style="font-weight: 800; font-size: 16px;">เรียนคุณ ${fullname},</p>
              <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                โปรดยืนยันตัวตนเพื่อรับรหัสอ้างอิงและ <strong>QR Digital Pass</strong> สำหรับใช้ในการติดตามผลการดำเนินงานของคุณ
              </p>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${verifyUrl}" style="background-color: #020617; color: #FCDE09; padding: 18px 30px; text-decoration: none; font-weight: 900; font-size: 12px; letter-spacing: 2px; display: inline-block; text-transform: uppercase;">
                  VERIFY_IDENTITY_NOW
                </a>
              </div>

              <div style="border-left: 4px solid #FCDE09; padding-left: 15px; font-size: 11px; color: #94a3b8;">
                Reference_ID: <strong>${ticketId}</strong><br/>
                * ลิงก์นี้มีอายุการใช้งาน 24 ชั่วโมง
              </div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px; font-size: 10px; color: #cbd5e1; text-transform: uppercase; letter-spacing: 1px;">
            © JP-VISOUL&DOCS Protocol 2025
          </div>
        </div>
      `,
    })

    // 🛡️ 4. POST_DISPATCH_HANDLING
    if (mailError) {
      throw new Error(mailError.message)
    }

    return NextResponse.json({
      success: true,
      message: "EMAIL_SENT_SUCCESSFULLY",
      payload: { ticketId },
    })
  } catch (error: any) {
    console.error("🚨 API_VERIFY_ERROR:", error)
    return NextResponse.json(
      { success: false, error: error.message || "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    )
  }
}
