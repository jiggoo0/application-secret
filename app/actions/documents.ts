// app/actions/documents.ts
'use server';

// ❌ ลบ import Buffer ออก เนื่องจากมันเป็น Global ใน Node/Next.js Server Environment
// import { Buffer } from 'buffer';
// ✅ แก้ไข Warning: 'Buffer' is defined but never used

// 💡 NEW: Import Logic การสร้าง PDF จริง
import { generatePdfDocument } from '@/lib/pdf/generate_pdf';

// 💡 อ้างอิง Type จากไฟล์ Bookings
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
  const pnr = booking.pnr_code?.toUpperCase().trim();
  const projectId = booking.project_id;

  if (!pnr || !projectId) {
    return { success: false, error: 'PNR code or Project ID is missing.' };
  }

  try {
    // 💡 [PRODUCTION]: เปิดใช้งาน Logic การสร้าง PDF จริง
    // 1. สร้าง PDF Buffer จาก HTML Template
    const pdfBuffer = await generatePdfDocument(booking);

    // 2. แปลง Buffer เป็น Base64 String เพื่อส่งไปยัง Client
    // pdfBuffer เป็น Buffer object ที่ได้จาก generatePdfDocument
    const pdfBase64 = pdfBuffer.toString('base64');

    return {
      success: true,
      pdf_base64: pdfBase64,
      pnr_code: pnr,
      project_id: projectId,
    };
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown internal error';
    console.error(`Error issuing document for PNR ${pnr}:`, e);

    return {
      success: false,
      error: `ไม่สามารถสร้างเอกสาร PDF ได้: ${errorMsg}`,
      pnr_code: pnr,
      project_id: projectId,
    };
  }
}
