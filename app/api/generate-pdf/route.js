// 💡 File: app/api/generate-pdf/route.js (Server Component / API Route)
import { PDFRenderer, CoverLetterDocument } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';

// 💡 หมายเหตุ: CoverLetterDocument ในไฟล์นี้ต้องเป็น Component ที่สร้างด้วย @react-pdf/renderer ไม่ใช่ HTML/Tailwind Component เดิม

export async function POST(request) {
  try {
    const data = await request.json(); // รับ LetterData จาก Client-Side

    // 1. สร้างเอกสาร PDF
    const pdfStream = await PDFRenderer.renderToStream(
      // CoverLetterDocument component ที่สร้างด้วย @react-pdf
      <CoverLetterDocument data={data} isDraft={false} />,
    );

    // 2. แปลง Stream เป็น Buffer
    const chunks = [];
    for await (const chunk of pdfStream) {
      chunks.push(chunk);
    }
    const pdfBuffer = Buffer.concat(chunks);

    // 3. ส่งคืน Response เป็นไฟล์ PDF
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CoverLetter.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF document' }, { status: 500 });
  }
}
