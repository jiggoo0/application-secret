/** @format */
'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { Resend } from 'resend'

/**
 * 🛰️ ACTION_PROTOCOL: CREATE_UNIFIED_LEAD
 * VERSION: 3.3.1
 * * วัตถุประสงค์:
 * - บันทึกข้อมูลผู้ติดต่อเข้าสู่ระบบฐานข้อมูลกลาง
 * - สร้าง Ticket ID สำหรับติดตามสถานะงาน (Tracking)
 * - ส่งอีเมลแจ้งเตือนลูกค้าเพื่อยืนยันข้อมูลก่อนนำส่งให้ทีมงาน
 */

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('⚠️ ไม่พบ RESEND_API_KEY ระบบส่งอีเมลจะไม่ทำงาน')
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

    if (!supabaseServer) throw new Error('DATABASE_NOT_AVAILABLE')
    if (!process.env.NEXT_PUBLIC_APP_URL) throw new Error('APP_URL_NOT_CONFIGURED')

    // สร้าง Ticket ID สำหรับอ้างอิงงาน
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
     * ระบบส่งอีเมลยืนยัน (Email Confirmation)
     */
    if (formData.email) {
      const resend = getResendClient()
      if (!resend) throw new Error('EMAIL_SYSTEM_DISABLED')

      const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/contact/success?id=${ticketId}&name=${encodeURIComponent(
        formData.full_name,
      )}&verified=true`

      await resend.emails.send({
        from: 'JP Visual & Docs <noreply@jpvisouldocs.online>',
        to: [formData.email],
        subject: `ยืนยันข้อมูลเพื่อเริ่มการประเมินเคส | รหัสอ้างอิง ${ticketId}`,
        html: `  
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background:#ffffff; padding:40px 20px;">  
        <div style="max-width:500px; margin:0 auto; border:4px solid #020617;">  
          <div style="background:#020617; padding:25px;">  
            <span style="background:#FCDE09; color:#020617; padding:2px 8px; font-size:10px; font-weight:900; letter-spacing:2px; text-transform:uppercase;">  
              Verification Required  
            </span>  
            <h1 style="color:#ffffff; margin-top:15px; font-size:22px; font-weight:900; line-height:1.2;">  
              ยืนยันตัวตนเพื่อส่งต่อข้อมูลให้ทีมงาน  
            </h1>  
          </div>  

          <div style="padding:40px 30px; color:#020617;">  
            <p style="font-size:16px; font-weight:800; margin-bottom:20px;">  
              เรียน คุณ ${formData.full_name}  
            </p>  

            <p style="font-size:14px; line-height:1.6; color:#334155;">  
              ทีมงานได้รับข้อมูลเบื้องต้นของคุณเรียบร้อยแล้ว 
              รบกวนคุณยืนยันความถูกต้องของข้อมูลผ่านลิงก์ด้านล่าง เพื่อให้ที่ปรึกษาสามารถเริ่มขั้นตอนการตรวจสอบและวิเคราะห์เคสของคุณได้ทันที
            </p>  

            <div style="text-align:center; margin:40px 0;">  
              <a href="${verifyUrl}"  
                 style="background:#020617; color:#FCDE09; padding:18px 35px;  
                        text-decoration:none; font-weight:900; font-size:13px;  
                        letter-spacing:1px; border:2px solid #020617; display:inline-block;">  
                คลิกเพื่อยืนยันข้อมูล  
              </a>  
            </div>  

            <div style="background:#f1f5f9; border-left:6px solid #FCDE09; padding:15px; margin-bottom:25px;">  
              <p style="margin:0; font-size:11px; color:#475569; font-weight:bold;">  
                Ticket ID สำหรับอ้างอิง: ${ticketId}  
              </p>  
            </div>  

            <p style="font-size:11px; color:#94a3b8; line-height:1.5;">  
              *หากคุณไม่ได้เป็นผู้ทำรายการนี้ สามารถละเว้นอีเมลฉบับนี้ได้ 
              ข้อมูลที่ไม่ได้รับการยืนยันภายใน 24 ชม. จะถูกนำออกจากระบบเพื่อความเป็นส่วนตัว
            </p>  
          </div>  
          
          <div style="background:#f8fafc; padding:20px; border-top:1px solid #e2e8f0; text-align:center;">
            <p style="font-size:10px; color:#64748b; margin:0; font-weight:bold;">JP Visual & Docs Management System</p>
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
