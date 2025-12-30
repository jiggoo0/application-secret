/** @format */
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAssessmentEmail(email: string, name: string, ticketId: string) {
  if (!email) return { success: false, error: 'Missing email address' }

  try {
    const { data, error } = await resend.emails.send({
      from: 'JP Visual Docs <verification@jpvisouldocs.online>',
      to: [email],
      // หัวข้ออีเมล: สุภาพ ชัดเจน และระบุชื่อลูกค้าเพื่อกันสแปม
      subject: `ยืนยันตัวตนเพื่อรับสิทธิ์การประเมินของคุณ: ${name}`,
      html: `
        <div style="font-family: 'Prompt', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; padding: 40px; border-top: 8px solid #FCDE09;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000; margin: 0; font-size: 22px; letter-spacing: 1px;">ยืนยันข้อมูลการติดต่อ</h1>
            <p style="font-size: 12px; color: #999; margin-top: 5px; text-transform: uppercase;">Secure Verification System</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">เรียนคุณ <strong>${name}</strong>,</p>
          
          <p style="font-size: 15px; line-height: 1.6; color: #444;">
            ขอบคุณที่ให้ความสนใจใช้บริการประเมินเอกสารกับทาง <strong>JP Visual Docs</strong> ครับ เพื่อความปลอดภัยและเพื่อป้องกันความเป็นส่วนตัวของข้อมูลท่าน 
            โปรดคลิกปุ่มด้านล่างนี้เพื่อยืนยันตัวตนและรับรหัสอ้างอิง (Access Key) สำหรับเข้าดูรายงานครับ
          </p>
          
          <div style="margin: 40px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify?id=${ticketId}&name=${encodeURIComponent(name)}" 
               style="background: #000; color: #fff; padding: 18px 40px; text-decoration: none; font-weight: bold; display: inline-block; border-radius: 4px; font-size: 15px;">
              คลิกเพื่อยืนยันตัวตนและรับรหัส
            </a>
          </div>

          <div style="background: #fdfdfd; padding: 20px; border: 1px solid #eee; text-align: center; border-radius: 4px;">
            <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px;">รหัสอ้างอิงเบื้องต้น (Ref ID)</p>
            <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: bold; color: #000; font-family: monospace;">${ticketId}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px 0;" />
          
          <p style="font-size: 12px; color: #999; text-align: center; line-height: 1.5;">
            หากท่านไม่ได้เป็นผู้ลงทะเบียนผ่านเว็บไซต์ โปรดขออภัยและสามารถละเว้นอีเมลฉบับนี้ได้ทันทีครับ <br/>
            อีเมลฉบับนี้เป็นการส่งจากระบบอัตโนมัติ กรุณาอย่าตอบกลับ
          </p>
          
          <div style="text-align: center; margin-top: 20px;">
            <p style="font-size: 12px; font-weight: bold; color: #000;">© 2025 JP Visual Docs. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend Error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Mail Dispatch Error:', err)
    return { success: false, err }
  }
}
