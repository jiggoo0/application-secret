/** @format */
'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { Resend } from 'resend'

/**
 * 🛰️ ACTION_PROTOCOL: CREATE_UNIFIED_LEAD
 * VERSION: 3.3.0 (Unified Edition)
 * PURPOSE: รองรับการบันทึกข้อมูลแบบ All-in-one (Contact + Assessment Profile)
 */

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('⚠️ RESEND_API_KEY is missing. Email dispatch will fail.')
    return null
  }
  return new Resend(apiKey)
}

// 🟢 ปรับปรุง Interface ให้รับข้อมูลที่ยืดหยุ่นขึ้นตาม Unified Form
interface LeadData {
  full_name: string
  phone: string
  email: string
  service_type: string
  details: string // ข้อมูลรวมที่ถูก stringify มาจากหน้าฟอร์ม หรือรายละเอียดเพิ่มเติม
  line_id?: string
  // รองรับข้อมูลเชิงลึกจากการประเมิน (ถ้ามี)
  assessment_data?: {
    country?: string
    occupation?: string
    history?: string
    target_date?: string
  }
}

interface ActionResponse {
  success: boolean
  ticketId?: string
  name?: string
  error?: string
}

export async function createLead(formData: LeadData): Promise<ActionResponse> {
  try {
    const headerList = await headers()
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = headerList.get('user-agent') || 'unknown'

    if (!supabaseServer) throw new Error('CRITICAL_DB_UNAVAILABLE')
    if (!process.env.NEXT_PUBLIC_APP_URL) throw new Error('SYSTEM_URL_MISCONFIGURED')

    // 🟢 สร้าง Ticket ID ที่เป็นมาตรฐาน Unified
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    const ticketId = `JPV-${randomCode}`

    const { error: dbError } = await supabaseServer.from('leads').insert([
      {
        name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        message: formData.details,
        category: formData.service_type,
        status: 'pending_verification',
        metadata: {
          transmitted_at: new Date().toISOString(),
          protocol_version: 'v3.3.0-unified-sharp',
          ticket_id: ticketId,
          verification_level: 0,
          source_type: 'UNIFIED_CONTACT_PORTAL',
          // บันทึกข้อมูลประเมินลงใน Metadata เพื่อให้ Admin ดูได้ง่าย
          case_profile: formData.assessment_data || null,
          network_context: { ip_address: ip, user_agent: userAgent },
        },
      },
    ])

    if (dbError) throw new Error(`DATABASE_REJECTED: ${dbError.message}`)

    // 🟢 กระบวนการส่งอีเมลยืนยัน (Identity Verification)
    if (formData.email) {
      const resend = getResendClient()
      if (!resend) throw new Error('MAIL_PROTOCOL_HALTED: MISSING_KEY')

      // ปรับปรุง Verify URL ให้ชี้ไปที่จุดเดียว
      const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/contact/success?id=${ticketId}&name=${encodeURIComponent(formData.full_name)}&verified=true`

      await resend.emails.send({
        from: 'JP-VISOUL&DOCS <noreply@jpvisouldocs.online>',
        to: [formData.email],
        subject: `[ACTION REQUIRED] ยืนยันรหัสการขอประเมินเคส: ${ticketId}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding: 40px 20px;">
            <div style="max-width: 500px; margin: 0 auto; border: 4px solid #020617; background: #ffffff;">
              <div style="background: #020617; padding: 25px;">
                <span style="background: #FCDE09; color: #020617; padding: 2px 8px; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">System_Auth_v3.3</span>
                <h1 style="color: #ffffff; margin: 15px 0 0 0; font-size: 22px; font-weight: 900; text-transform: uppercase; font-style: italic;">Inquiry Verification.</h1>
              </div>
              <div style="padding: 40px 30px; color: #020617;">
                <p style="font-size: 15px; font-weight: 800;">เรียน คุณ ${formData.full_name},</p>
                <p style="font-size: 13px; line-height: 1.6; color: #475569;">
                  ขอบคุณที่ส่งข้อมูลเพื่อขอรับการประเมินโปรไฟล์เบื้องต้น โปรดยืนยันตัวตนเพื่อนำข้อมูลของคุณเข้าสู่ขั้นตอนการวิเคราะห์ (Case Analysis) โดยที่ปรึกษาเทคนิค:
                </p>
                <div style="text-align: center; margin: 35px 0;">
                  <a href="${verifyUrl}" style="background: #020617; color: #FCDE09; padding: 18px 35px; text-decoration: none; font-weight: 900; font-size: 13px; display: inline-block; letter-spacing: 2px; border: 2px solid #020617;">
                    VERIFY_AND_SUBMIT
                  </a>
                </div>
                <div style="background: #f8fafc; border-left: 6px solid #FCDE09; padding: 15px;">
                   <p style="margin: 0; font-size: 11px; color: #94a3b8; font-weight: bold;">TICKET_REFERENCE: ${ticketId}</p>
                </div>
                <p style="font-size: 11px; color: #94a3b8; margin-top: 25px; font-style: italic;">
                  *หากคุณไม่ได้ทำรายการนี้ โปรดละเว้นอีเมลฉบับนี้ ระบบจะทำลายข้อมูลที่ไม่ได้รับการยืนยันภายใน 24 ชม.
                </p>
              </div>
            </div>
          </div>
        `,
      })
    }

    revalidatePath('/admin/leads')
    return { success: true, ticketId, name: formData.full_name }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'UNKNOWN_SYSTEM_ERROR'
    console.error('🚨 [UNIFIED_ACTION_FAILURE]:', errorMessage)
    return { success: false, error: errorMessage }
  }
}
