/**
 * @format
 * @description ACTION_PROTOCOL: CREATE_LEAD_WITH_VERIFICATION (V3.3.1)
 * ✅ FIXED: Removed potential unused variables & strictly typed Next.js 15 Headers
 * ✅ OPTIMIZED: Cleaned up HTML template logic for production build
 */

'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { Resend } from 'resend'
import { createServerClient } from '@/lib/supabase/server'

// 🛡️ VALIDATION_SCHEMA
const AssessmentProfileSchema = z.object({
  travel_history: z.string().optional(),
  denial_history: z.boolean().optional(),
  financial_status: z.string().optional(),
  target_country: z.string().optional(),
  urgency_level: z.enum(['standard', 'express', 'critical']).optional(),
  objective: z.string().optional(),
})

const CreateLeadSchema = z.object({
  full_name: z.string().min(2, 'REQUIRED_NAME_MIN_2'),
  phone: z.string().min(9, 'INVALID_PHONE_FORMAT'),
  email: z.string().email('INVALID_EMAIL').optional().or(z.literal('')),
  line_id: z.string().optional(),
  service_type: z.string(),
  details: z.string().min(5, 'REQUIRED_DETAILS_MIN_5'),
  assessment_profile: AssessmentProfileSchema.optional(),
})

type CreateLeadInput = z.infer<typeof CreateLeadSchema>

export async function createLead(rawInput: CreateLeadInput) {
  try {
    // 1. VALIDATION_PHASE
    const validatedData = CreateLeadSchema.parse(rawInput)

    // Next.js 15: headers() is now async
    const headerList = await headers()
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const agent = headerList.get('user-agent') || 'unknown'

    const supabase = await createServerClient()
    const resendKey = process.env.RESEND_API_KEY

    // 2. IDENTIFIER_GENERATION
    const ticketId = `JPV-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // 3. DATABASE_TRANSACTION
    const { error: dbError } = await supabase.from('leads').insert([
      {
        name: validatedData.full_name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        message: validatedData.details,
        category: validatedData.service_type,
        status: 'pending_verification',
        metadata: {
          transmitted_at: new Date().toISOString(),
          protocol_version: 'v3.3.1-production',
          ticket_id: ticketId,
          line_id: validatedData.line_id || 'N/A',
          case_profile: validatedData.assessment_profile || null,
          network_context: { ip_address: ip, user_agent: agent },
        },
      },
    ])

    if (dbError) throw new Error(`DB_REJECTED: ${dbError.message}`)

    // 4. NOTIFICATION_PHASE
    if (validatedData.email && resendKey) {
      const resend = new Resend(resendKey)
      const isAssessmentMode = validatedData.service_type.includes('ASSESSMENT')
      const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?id=${ticketId}&type=${isAssessmentMode ? 'assessment' : 'contact'}`

      await resend.emails.send({
        from: 'JP-VISUAL&DOCS <noreply@jpvisualdocs.online>',
        to: [validatedData.email],
        subject: `[ACTION_REQUIRED] :: ${ticketId} :: Identity Verification`,
        html: generateIndustrialEmail(validatedData.full_name, ticketId, verifyUrl),
      })
    }

    revalidatePath('/admin/leads')
    return { success: true, ticketId, name: validatedData.full_name }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_PROTOCOL_ERROR'
    console.error('🚨 [CRITICAL_FAILURE]:', message)
    return { success: false, error: message }
  }
}

// 🎨 HELPER: Industrial Sharp Email Template
function generateIndustrialEmail(name: string, ticketId: string, url: string) {
  return `
    <div style="font-family: monospace; background-color: #020617; color: #f8fafc; padding: 40px; border-top: 4px solid #c8a45d;">
      <h2 style="color: #c8a45d; text-transform: uppercase; font-style: italic;">System_Verification_Required</h2>
      <p style="font-size: 14px; color: #94a3b8;">CLIENT_NAME: ${name}</p>
      <p style="font-size: 14px; color: #94a3b8;">TICKET_ID: ${ticketId}</p>
      <div style="margin: 30px 0;">
        <a href="${url}" style="background-color: #c8a45d; color: #020617; padding: 15px 30px; text-decoration: none; font-weight: bold; display: inline-block;">EXECUTE_VERIFICATION</a>
      </div>
      <p style="font-size: 10px; color: #475569;">ID_HASH: ${Buffer.from(ticketId).toString('base64')}</p>
    </div>
  `
}
