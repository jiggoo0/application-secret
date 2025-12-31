/** @format */
'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { Resend } from 'resend'

/**

🛰️ ACTION_PROTOCOL: CREATE_UNIFIED_LEAD

VERSION: 3.3.1

วัตถุประสงค์

บันทึกข้อมูลลูกค้าจากฟอร์มติดต่อ / ประเมินเคส แบบรวมศูนย์


สร้าง Ticket ID กลางสำหรับอ้างอิงทั้งระบบ


ส่งอีเมลยืนยันตัวตนเพื่อนำเข้าสู่ขั้นตอนวิเคราะห์เคส


NOTE_FOR_AI:

ไม่มีโหมดทดสอบ


ทุกข้อมูลที่ถูกบันทึกถือเป็นข้อมูลจริงจากผู้ใช้


ticket_id คือกุญแจหลักในการเชื่อมทุกระบบ
*/

// ---------------------------------------------------------------------
// Email Client (Resend)
// ---------------------------------------------------------------------
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('⚠️ ไม่พบ RESEND_API_KEY ระบบส่งอีเมลจะไม่ทำงาน')
    return null
  }
  return new Resend(apiKey)
}

// ---------------------------------------------------------------------
// โครงสร้างข้อมูลที่รับจากฟอร์ม (Unified)
// ---------------------------------------------------------------------
interface LeadData {
  full_name: string
  phone: string
  email: string
  service_type: string
  details: string // รายละเอียดรวมจากฟอร์ม (ผ่านการ stringify แล้ว)
  line_id?: string

  // ข้อมูลการประเมินเชิงลึก (ถ้ามี)
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

// ---------------------------------------------------------------------
// ACTION: createLead
// ---------------------------------------------------------------------
export async function createLead(formData: LeadData): Promise<ActionResponse> {
  try {
    const headerList = await headers()
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const userAgent = headerList.get('user-agent') || 'unknown'

    if (!supabaseServer) throw new Error('DATABASE_NOT_AVAILABLE')
    if (!process.env.NEXT_PUBLIC_APP_URL) throw new Error('APP_URL_NOT_CONFIGURED')

    /**
     * สร้าง Ticket ID กลาง
     * รูปแบบ: JPV-XXXXXX
     */
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    const ticketId = `JPV-${randomCode}`

    /**
     * บันทึกข้อมูลลงตาราง leads
     */
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

          // ข้อมูลประเมินเคส (สำหรับ Admin / ระบบวิเคราะห์)
          case_profile: formData.assessment_data || null,

          // ข้อมูลสภาพแวดล้อมเครือข่าย
          network_context: {
            ip_address: ip,
            user_agent: userAgent,
          },
        },
      },
    ])

    if (dbError) throw new Error(`DATABASE_INSERT_FAILED: ${dbError.message}`)

    /**
     * ส่งอีเมลยืนยันตัวตน
     */
    if (formData.email) {
      const resend = getResendClient()
      if (!resend) throw new Error('EMAIL_SYSTEM_DISABLED')

      const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/contact/success?id=${ticketId}&name=${encodeURIComponent(
        formData.full_name,
      )}&verified=true`

      await resend.emails.send({
        from: 'JP-VISOUL&DOCS <noreply@jpvisouldocs.online>',
        to: [formData.email],
        subject: `กรุณายืนยันคำขอประเมินเคส | รหัส ${ticketId}`,
        html: `  
      <div style="font-family: Arial, sans-serif; background:#ffffff; padding:40px 20px;">  
        <div style="max-width:500px; margin:0 auto; border:4px solid #020617;">  
          <div style="background:#020617; padding:25px;">  
            <span style="background:#FCDE09; color:#020617; padding:2px 8px; font-size:10px; font-weight:900; letter-spacing:2px;">  
              SYSTEM_VERIFICATION  
            </span>  
            <h1 style="color:#ffffff; margin-top:15px; font-size:22px; font-weight:900;">  
              ยืนยันตัวตนเพื่อเข้าสู่ขั้นตอนวิเคราะห์เคส  
            </h1>  
          </div>  

          <div style="padding:40px 30px; color:#020617;">  
            <p style="font-size:15px; font-weight:800;">  
              เรียน คุณ ${formData.full_name}  
            </p>  

            <p style="font-size:13px; line-height:1.6; color:#475569;">  
              ระบบได้รับข้อมูลของคุณเรียบร้อยแล้ว  
              กรุณายืนยันตัวตนเพื่อให้ทีมงานสามารถนำข้อมูลเข้าสู่กระบวนการวิเคราะห์และวางกลยุทธ์ได้  
            </p>  

            <div style="text-align:center; margin:35px 0;">  
              <a href="${verifyUrl}"  
                 style="background:#020617; color:#FCDE09; padding:18px 35px;  
                        text-decoration:none; font-weight:900; font-size:13px;  
                        letter-spacing:2px; border:2px solid #020617;">  
                ยืนยันและส่งข้อมูล  
              </a>  
            </div>  

            <div style="background:#f8fafc; border-left:6px solid #FCDE09; padding:15px;">  
              <p style="margin:0; font-size:11px; color:#64748b; font-weight:bold;">  
                รหัสอ้างอิง: ${ticketId}  
              </p>  
            </div>  

            <p style="font-size:11px; color:#94a3b8; margin-top:25px; font-style:italic;">  
              หากคุณไม่ได้เป็นผู้ส่งคำขอนี้ สามารถละเว้นอีเมลฉบับนี้ได้  
              ระบบจะลบข้อมูลที่ไม่ได้รับการยืนยันภายใน 24 ชั่วโมง  
            </p>  
          </div>  
        </div>  
      </div>  
    `,
      })
    }

    revalidatePath('/admin/leads')

    return {
      success: true,
      ticketId,
      name: formData.full_name,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SYSTEM_ERROR'
    console.error('🚨 CREATE_LEAD_FAILED:', message)

    return {
      success: false,
      error: message,
    }
  }
}
