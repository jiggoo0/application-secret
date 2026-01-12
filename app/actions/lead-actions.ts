/** @format */
'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { Resend } from 'resend'

/**
 * 🛰️ ACTION_PROTOCOL: CREATE_UNIFIED_LEAD
 * VERSION: 3.3.1 (Production Ready)
 * ✅ Strategic Keywords: Digital Integrity, Trust by Design, Seamless Process
 */

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('⚠️ EMAIL_SYSTEM_OFFLINE: Missing RESEND_API_KEY')
    return null
  }
  return new Resend(apiKey)
}

interface LeadData {
  full_name: string
  phone: string
  email: string
  service_type: string
  details: string
  line_id?: string
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

    // Evidence-Based Validation
    if (!supabaseServer) throw new Error('DATABASE_NOT_AVAILABLE')
    if (!process.env.NEXT_PUBLIC_APP_URL) throw new Error('APP_URL_NOT_CONFIGURED')

    // 🎫 TICKET_GENERATION: สร้างรหัสอ้างอิงภายใต้มาตรฐานระบบ
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
          protocol_version: 'v3.3.1-unified',
          ticket_id: ticketId,
          verification_level: 0,
          source_type: 'UNIFIED_CONTACT_PORTAL',
          case_profile: formData.assessment_data || null,
          network_context: {
            ip_address: ip,
            user_agent: userAgent,
          },
        },
      },
    ])

    if (dbError) throw new Error(`DATABASE_INSERT_FAILED: ${dbError.message}`)

    /**
     * 📧 EMAIL_DISPATCH_SYSTEM (Trust by Design)
     */
    if (formData.email) {
      const resend = getResendClient()

      // เราจะไม่ขัดขวาง Process หลักหากระบบอีเมลขัดข้อง แต่จะบันทึก Log แทน
      if (resend) {
        const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?id=${ticketId}&name=${encodeURIComponent(
          formData.full_name,
        )}&verified=true`

        await resend.emails.send({
          from: 'JP Visual & Docs <noreply@jpvisouldocs.online>',
          to: [formData.email],
          subject: `ยืนยันข้อมูลเพื่อเริ่มการประเมินเคส | รหัสอ้างอิง ${ticketId}`,
          html: `  
            <div style="font-family: sans-serif; background:#ffffff; padding:40px 20px; color:#020617;">  
              <div style="max-width:500px; margin:0 auto; border:4px solid #020617; padding:40px;">  
                <h1 style="font-size:24px; font-weight:900; text-transform:uppercase; font-style:italic; margin-bottom:20px;">Verification_Required</h1>
                <p style="font-size:14px; line-height:1.6;">เรียน คุณ ${formData.full_name}</p>
                <p style="font-size:14px; line-height:1.6;">โปรดยืนยันข้อมูลผ่านลิงก์ด้านล่างเพื่อเริ่มกระบวนการวิเคราะห์เคส:</p>
                <div style="margin:30px 0;">
                  <a href="${verifyUrl}" style="background:#020617; color:#FCDE09; padding:15px 25px; text-decoration:none; font-weight:bold; display:inline-block;">CONFIRM_IDENTITY</a>
                </div>
                <p style="font-size:12px; color:#64748b;">Ticket ID: ${ticketId}</p>
              </div>
            </div>  
          `,
        })
      }
    }

    revalidatePath('/admin/leads')

    return {
      success: true,
      ticketId,
      name: formData.full_name,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_SYSTEM_ERROR'
    console.error('🚨 ACTION_CRITICAL_FAILURE:', message)

    return {
      success: false,
      error: message,
    }
  }
}
