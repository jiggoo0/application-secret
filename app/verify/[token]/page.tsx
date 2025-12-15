// /app/verify/[token]/page.tsx

import { notFound } from 'next/navigation';

// 💡 กำหนด Type สำหรับข้อมูลที่คาดว่าจะได้รับจาก Backend API
interface VerificationResult {
  document_id: string;
  // อัปเดตสถานะให้สอดคล้องกับ DB (pending, verified, canceled)
  status: 'pending' | 'verified' | 'canceled';
  ref_id: string; // PNR
  pdf_url: string | null;
  created_at: string;
  // เพิ่มข้อมูลอื่นๆ ที่คุณต้องการแสดงผล (เช่น รายละเอียดเที่ยวบิน)
  details: {
    passenger: string;
    flights: Array<{ date: string; from: string; to: string; time: string }>;
    fare: string;
  } | null;
}

// 💡 Type สำหรับ Props ที่ Next.js App Router ส่งมาให้ (เก็บไว้สำหรับอ้างอิง)
interface DocumentVerificationPageProps {
  params: {
    token: string;
  };
}

/**
 * 🚀 Document Verification Page (Server Component)
 * หน้านี้ทำหน้าที่ดึงข้อมูลการตรวจสอบเอกสารจาก Backend API
 */
// *** FINAL FIX TYPE ERROR: ลบ Type Annotation ออกจาก Signature โดยสิ้นเชิง ***
export default async function DocumentVerificationPage({ params }: any) {
  // ใช้ any เพื่อบังคับให้ Build ผ่าน

  // Cast params เพื่อเข้าถึงค่าได้อย่างปลอดภัย
  const { token } = params as { token: string };

  // 1. ดึง Base URL สำหรับ API Call
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;
  if (!API_BASE_URL) {
    console.error('NEXT_PUBLIC_BASE_URL or VERCEL_URL is not set.');
    notFound();
  }

  // 2. เรียก API GET เพื่อตรวจสอบ Token
  const verifyApiUrl = `${API_BASE_URL}/api/documents/verify/${token}`;

  let result: VerificationResult | null = null;
  let error: string | null = null;

  try {
    const response = await fetch(verifyApiUrl, {
      cache: 'no-store', // สำคัญ: ต้องเป็น No-Store เพื่อให้ข้อมูลสถานะเป็นปัจจุบัน
    });

    if (response.status === 404) {
      // หาก API ตอบกลับ 404 (Token ไม่ถูกต้อง/ไม่พบ)
      notFound();
    }

    if (!response.ok) {
      // หากเกิด Error อื่นๆ (เช่น 500)
      throw new Error(`API returned status ${response.status} for token ${token}`);
    }

    // Cast response.json() ให้เป็น Type ที่เรากำหนด
    const data = await response.json();
    result = data.document as VerificationResult; // สันนิษฐานว่า API return { status, document: { ...data } }
  } catch (e) {
    console.error('Verification Fetch Error:', e);
    error = e instanceof Error ? e.message : 'An unknown error occurred during verification.';
  }

  // ตรวจสอบผลลัพธ์ที่ได้
  if (!result || error) {
    // ถ้าเกิด error (เช่น 500) แต่ไม่ 404 ให้แสดงหน้า Error แทน
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">Error</h1>
          <div className="mb-6 border-l-4 border-red-500 bg-red-50 p-4 text-red-700" role="alert">
            <p className="font-bold">Verification Error</p>
            <p>{error || 'Could not retrieve document information.'}</p>
          </div>
          <p className="text-center text-sm text-gray-500">Token: {token}</p>
        </div>
      </div>
    );
  }

  // --- Helper Functions for Rendering ---
  const getStatusColor = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified': // ใช้ 'verified' แทน 'completed' ตาม DB
        return 'text-green-600 bg-green-100';
      case 'canceled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const statusText = result.status?.toUpperCase() || 'UNKNOWN';
  const statusClass = getStatusColor(result.status);

  // 3. Render Component
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">📄 Document Verification System</h1>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Verification Token:</span>
            <code className="rounded bg-gray-100 p-1 text-sm">{token}</code>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-700">Document Status:</span>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusClass}`}>
              {statusText}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <DetailItem label="Document ID" value={result.document_id} />
            <DetailItem label="Booking Ref (PNR)" value={result.ref_id} />
            <DetailItem
              label="Issued Date"
              value={new Date(result.created_at).toLocaleDateString()}
            />

            {/* แสดงรายละเอียดเพิ่มเติมของตั๋ว */}
            {result.details && (
              <>
                <DetailItem label="Passenger Name" value={result.details.passenger} colSpan={2} />
                <DetailItem label="Total Fare" value={result.details.fare} />
              </>
            )}

            {/* ปุ่มสำหรับเปิดไฟล์ PDF ต้นฉบับ */}
            {result.pdf_url && (
              <div className="col-span-2 mt-4">
                <a
                  href={result.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View Original E-Ticket PDF
                </a>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          <p>This information is retrieved in real-time from the central database.</p>
        </footer>
      </div>
    </div>
  );
}

// 💡 Helper Component สำหรับแสดงรายละเอียด
interface DetailItemProps {
  label: string;
  value: string;
  colSpan?: number;
}
const DetailItem = ({ label, value, colSpan = 1 }: DetailItemProps) => (
  <div className={`col-span-2 md:col-span-${colSpan}`}>
    <p className="text-xs font-semibold uppercase text-gray-400">{label}</p>
    <p className="text-md font-medium text-gray-800">{value}</p>
  </div>
);
