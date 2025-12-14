// app/api/issue-document/route.js

import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { generatePdfDocument } from '@/lib/pdf/generate_pdf';

const ADMIN_API_KEY_HEADER = 'x-admin-api-key';
const PNR_FIELD = 'pnr_code';

export async function POST(request) {
  const reqHeaders = request.headers;

  // 1. Authorization Safety Check
  const providedKey = reqHeaders.get(ADMIN_API_KEY_HEADER);
  if (!providedKey || providedKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Invalid or missing API Key' },
      { status: 401 },
    );
  }

  // 2. Request Body Validation
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body format' },
      { status: 400 },
    );
  }

  const pnr_code = body[PNR_FIELD]?.toUpperCase();

  if (!pnr_code) {
    return NextResponse.json(
      { success: false, error: `Missing required field: ${PNR_FIELD}` },
      { status: 400 },
    );
  }

  // 3. Database Fetch (ใช้ Service Role)
  let bookingData;
  try {
    const supabase = supabaseServer(); // 🚨 ถูกแก้ไขให้เรียกใช้ฟังก์ชันแล้ว
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('pnr_code', pnr_code)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase Query Error:', error);
      throw new Error('Database query failed.');
    }

    bookingData = data;
  } catch (err) {
    console.error('Database Fetch Failed:', err.message);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error during data retrieval' },
      { status: 500 },
    );
  }

  // 4. Data Not Found
  if (!bookingData) {
    return NextResponse.json(
      { success: false, error: `PNR Code '${pnr_code}' not found in the database.` },
      { status: 404 },
    );
  }

  // 5. PDF Generation
  let pdfBuffer;
  try {
    pdfBuffer = await generatePdfDocument(bookingData);
  } catch (pdfError) {
    console.error('PDF Generation Failed:', pdfError);
    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF document.' },
      { status: 500 },
    );
  }

  // 6. Success Response (PDF Buffer)
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pnr_code}_confirmation.pdf"`,
      'Content-Length': pdfBuffer.length.toString(),
    },
  });
}
