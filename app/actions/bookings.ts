// app/actions/bookings.ts
'use server';

import { createClient } from '@supabase/supabase-js';
import { generatePdfDocument } from '@/lib/pdf/generate_pdf';
import type { BookingSchema } from '@/types/booking-types';

// ----------------------------------------------------
// 0. RE-EXPORT TYPES (FOR CLIENT USAGE)
// ----------------------------------------------------
export type { BookingSchema };

// ----------------------------------------------------
// 1. SUPABASE SERVER CLIENT CONFIGURATION
// ----------------------------------------------------
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase Server Error: SUPABASE_URL หรือ SUPABASE_SERVICE_ROLE_KEY ขาดหายไป');
}

// สร้าง Supabase Client ด้วย Service Role Key (ทำงานบน Server เท่านั้น)
const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    headers: {
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
    },
  },
});

// ----------------------------------------------------
// 2. SERVER ACTION: FETCH BOOKING DETAILS
// ----------------------------------------------------

interface FetchResult {
  success: boolean;
  data?: BookingSchema;
  error?: string;
}

/**
 * @title fetchBookingDetails
 * @description ดึงข้อมูลการจองจากฐานข้อมูลโดยใช้ PNR Code (ใช้ Service Role Key)
 */
export async function fetchBookingDetails(pnr: string): Promise<FetchResult> {
  if (!pnr) {
    return { success: false, error: 'Validation Error: PNR Code ต้องระบุ' };
  }

  try {
    const { data, error } = await supabaseServer
      .from('bookings')
      .select('*')
      .eq('pnr_code', pnr.toUpperCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No Rows Found
        return { success: false, error: `ไม่พบ PNR: ${pnr.toUpperCase()}` };
      }

      console.error('Supabase fetch error:', error.message);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: data as BookingSchema,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown fetch error';
    console.error('Fetch execution failed:', message);
    return { success: false, error: message };
  }
}

// ----------------------------------------------------
// 3. SERVER ACTION: SAVE / UPDATE BOOKING + GENERATE PDF
// ----------------------------------------------------

interface SaveResult {
  success: boolean;
  message?: string;
  pdf_base64?: string;
  pnr_code?: string;
  project_id?: string;
  error?: string;
}

/**
 * @title saveBooking
 * @description บันทึก/อัปเดตข้อมูลการจองในฐานข้อมูล และสร้าง PDF Document (ส่ง Base64 กลับ)
 */
export async function saveBooking(data: BookingSchema): Promise<SaveResult> {
  const pnr = data.pnr_code?.toUpperCase().trim();
  const projectId = data.project_id;

  if (!pnr || !projectId) {
    return {
      success: false,
      error: 'Validation Error: PNR Code และ Project ID ต้องระบุ',
    };
  }

  try {
    // 3.1. Destructuring และเตรียม Payload สำหรับ Upsert
    const {
      pnr_code,
      project_id,
      traveller_name,
      booking_status,
      is_active,
      eticket_no,
      payment_method,
      traveller_details,
      fare_summary,
      flight_details,
      hotel_details,
      tour_details, // รองรับ ProjectType: TOUR
      // ฟิลด์อื่น ๆ ที่ไม่ได้ระบุใน Schema จะถูกละเว้น
    } = data;

    const payload = {
      pnr_code: pnr, // ใช้ pnr ที่ถูก UpperCase/Trim แล้ว
      project_id: projectId,
      traveller_name: traveller_name?.toUpperCase().trim() || 'N/A',
      booking_status: booking_status ?? 'CONFIRMED',
      is_active: is_active ?? true,

      // Optional DB Fields
      eticket_no: eticket_no || null,
      payment_method: payment_method || null,

      // JSONB fields
      traveller_details: traveller_details,
      fare_summary: fare_summary,
      flight_details: flight_details,
      hotel_details: hotel_details,
      tour_details: tour_details,
    };

    // 3.2. Upsert ข้อมูล (Insert หรือ Update ถ้า PNR ซ้ำ)
    const { error: dbError } = await supabaseServer.from('bookings').upsert(payload, {
      onConflict: 'pnr_code',
    });

    if (dbError) {
      console.error('Supabase save error:', dbError.message);
      return { success: false, error: dbError.message };
    }

    // 3.3. สร้าง PDF Document
    const pdfBuffer = await generatePdfDocument(data);
    const pdfBase64 = pdfBuffer.toString('base64');

    // 3.4. ตอบกลับด้วย Base64 String เพื่อให้ Client Component ดาวน์โหลด
    return {
      success: true,
      message: `บันทึก/อัปเดต PNR: ${pnr} และสร้างเอกสารสำเร็จ`,
      pdf_base64: pdfBase64,
      pnr_code: pnr,
      project_id: projectId,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown save error (PDF or DB)';
    console.error('Save booking failed:', message);
    return { success: false, error: `สร้างเอกสาร PDF ล้มเหลว: ${message}` };
  }
}
