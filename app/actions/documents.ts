// app/actions/documents.ts
'use server';

// 💡 ต้องมีการ Import Supabase Client ที่ตั้งค่าด้วย Service Role Key
// import { supabaseServer } from '@/lib/supabase/server';
import type { BookingSchema } from '@/app/actions/bookings';

// ----------------------------------------------------
// UTILITY INTERFACE
// ----------------------------------------------------
interface IssueDocumentResult {
  success: boolean;
  pdf_base64?: string;
  error?: string;
  pnr_code?: string;
  project_id?: string;
}

// ----------------------------------------------------
// SERVER ACTION
// ----------------------------------------------------

/**
 * @title issueDocument
 * @description Server Action สำหรับสร้างเอกสาร PDF และส่ง Base64 กลับไปยัง Client
 */
export async function issueDocument(booking: BookingSchema): Promise<IssueDocumentResult> {
  const pnr = booking.pnr_code;
  const projectId = booking.project_id;

  if (!pnr) {
    return { success: false, error: 'PNR code is missing.' };
  }

  try {
    // 💡 [PRODUCTION]: แทนที่โค้ด Mock นี้ด้วย Logic การสร้าง PDF จริง
    // const pdfBase64 = await generatePdfFromBooking(booking);

    // 🔥 Mock Base64 (ใช้สำหรับการทดสอบว่า Client Side Download Logic ทำงานได้)
    const mockPdfContent = `PNR: ${pnr} - Document Type: ${projectId} - Issued successfully on ${new Date().toISOString()}`;
    const pdfBase64 = Buffer.from(mockPdfContent, 'utf-8').toString('base64');

    return {
      success: true,
      pdf_base64: pdfBase64,
      pnr_code: pnr,
      project_id: projectId,
    };
  } catch (e) {
    console.error(`Error issuing document for PNR ${pnr}:`, e);
    return { success: false, error: 'Internal Server Error during PDF generation or logging.' };
  }
}
