/** @format */
import { Resend } from "resend"
import { NextResponse } from "next/server"

/**
 * 🛰️ API_ROUTE: EMAIL_DISPATCH_SERVICE
 * @version 1.1.0 (Build-Safe)
 */

// ✅ FIX: สร้าง Client ภายใน Function Scope เพื่อป้องกัน Build Error
export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error("RESEND_API_KEY_NOT_FOUND")

    const resend = new Resend(apiKey)
    const body = await request.json()
    const { email, fullname, ticketId, type } = body

    if (!email || !ticketId) {
      return NextResponse.json(
        { success: false, message: "MISSING_REQUIRED_FIELDS" },
        { status: 400 }
      )
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://jpvisouldocs.online"
    const verifyUrl = `${baseUrl}/verify?id=${ticketId}&name=${encodeURIComponent(fullname)}&type=${type || "assessment"}`

    const { error: mailError } = await resend.emails.send({
      from: "JP-VISOUL&DOCS <concierge@jpvisouldocs.online>",
      to: [email],
      replyTo: "support@jpvisouldocs.online", // ✅ FIX: CamelCase 'replyTo'
      subject: `[ACTION REQUIRED] ยืนยันตัวตนเพื่อรับรหัส: ${ticketId}`,
      html: `
        <div style="font-family: sans-serif; background-color: #ffffff; padding: 40px 20px;">
          <div style="max-width: 500px; margin: 0 auto; border: 4px solid #020617;">
            <div style="background-color: #020617; padding: 30px; text-align: center;">
              <h1 style="color: #FCDE09; margin: 0; font-size: 24px; font-weight: 900; font-style: italic; text-transform: uppercase;">Identity_Check.</h1>
            </div>
            <div style="padding: 40px 30px; color: #020617;">
              <p style="font-weight: 800;">เรียนคุณ ${fullname},</p>
              <p style="font-size: 14px; line-height: 1.6;">โปรดยืนยันตัวตนเพื่อรับ QR Digital Pass ของคุณ</p>
              <div style="text-align: center; margin: 40px 0;">
                <a href="${verifyUrl}" style="background-color: #020617; color: #FCDE09; padding: 18px 30px; text-decoration: none; font-weight: 900; font-size: 12px; letter-spacing: 2px; display: inline-block;">VERIFY_NOW</a>
              </div>
            </div>
          </div>
        </div>
      `,
    })

    if (mailError) throw new Error(mailError.message)

    return NextResponse.json({
      success: true,
      message: "EMAIL_SENT_SUCCESSFULLY",
    })
  } catch (error: any) {
    console.error("🚨 API_VERIFY_ERROR:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
