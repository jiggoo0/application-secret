// app/verify/[token]/page.tsx
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

/* -------------------------------------------------------------------------- */
/* TYPES                                    */
/* -------------------------------------------------------------------------- */

interface VerificationResult {
  document_id: string;
  status: 'pending' | 'paid' | 'verified' | 'revoked';
  type: 'E_TICKET' | 'JPVISOUL_SALARY_CERT' | 'HOTEL_VOUCHER'; // 💡 เพิ่มประเภทเอกสาร
  ref_id: string;
  pdf_url: string | null;
  created_at: string;
  data: any; // 💡 ใช้ data ก้อนเดียวกับที่ส่งมาจาก Generator
}

interface VerifyPageProps {
  params: Promise<{ token: string }>;
}

/* -------------------------------------------------------------------------- */
/* HELPER COMPONENT                               */
/* -------------------------------------------------------------------------- */

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-gray-100 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value || '-'}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGE                                     */
/* -------------------------------------------------------------------------- */

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { token } = await params;
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  const baseUrl = `${protocol}://${host}`;
  const apiUrl = `${baseUrl}/api/documents/verify/${token}`;

  let document: VerificationResult | null = null;

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (res.status === 404) notFound();
    if (!res.ok) throw new Error(`Verify failed (${res.status})`);

    const json = await res.json();
    document = json.document as VerificationResult;
  } catch (err) {
    console.error('Verification Error:', err);
  }

  if (!document) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 text-4xl">⚠️</div>
          <p className="font-medium text-gray-600">Unable to verify this document at the moment.</p>
        </div>
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    paid: 'bg-blue-100 text-blue-700 border-blue-200',
    verified: 'bg-green-100 text-green-700 border-green-200',
    revoked: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f7f9] p-4 font-sans">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header Section */}
        <div className="bg-[#003366] p-6 text-center text-white">
          <h1 className="text-xl font-bold tracking-tight">JP VISOUL DOCS</h1>
          <p className="mt-1 text-xs uppercase opacity-80">Official Document Verification</p>
        </div>

        <div className="p-8">
          <div className="mb-8 flex flex-col items-center">
            <div
              className={`mb-2 rounded-full border px-6 py-1 text-xs font-bold uppercase ${statusColor[document.status]}`}
            >
              {document.status}
            </div>
            <p className="text-xs text-gray-400">Ref ID: {document.ref_id}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <DetailItem label="Document Type" value={document.type?.replace(/_/g, ' ')} />
            <DetailItem
              label="Issued Date"
              value={new Date(document.created_at).toLocaleDateString('th-TH', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            />

            {/* 💡 Dynamic Rendering based on Document Type */}

            {/* CASE: Salary Certificate */}
            {document.type === 'JPVISOUL_SALARY_CERT' && (
              <>
                <DetailItem label="Employee Name" value={document.data.employee.name} />
                <DetailItem
                  label="Total Monthly Income"
                  value={`${document.data.salary.total} ${document.data.salary.currency}`}
                />
              </>
            )}

            {/* CASE: Hotel Voucher */}
            {document.type === 'HOTEL_VOUCHER' && (
              <>
                <DetailItem label="Hotel Name" value={document.data.hotel.name} />
                <DetailItem label="Check-In" value={document.data.stay.checkIn} />
                <DetailItem label="Check-Out" value={document.data.stay.checkOut} />
                <DetailItem label="Guest Name" value={document.data.guest.name} />
              </>
            )}

            {/* CASE: E-Ticket */}
            {document.type === 'E_TICKET' && (
              <>
                <DetailItem label="Passenger" value={document.data.passenger.name} />
                <DetailItem label="PNR" value={document.data.booking.pnr} />
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-10 space-y-3">
            {document.status === 'verified' && document.pdf_url ? (
              <a
                href={document.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-xl bg-[#003366] py-3 text-sm font-bold text-white transition hover:bg-[#002244]"
              >
                📥 DOWNLOAD VERIFIED PDF
              </a>
            ) : (
              <div className="rounded-xl bg-gray-100 py-3 text-center text-xs font-bold uppercase text-gray-400">
                Download Unavailable
              </div>
            )}

            <p className="text-center text-[10px] text-gray-400">
              Security Token: {token.substring(0, 8)}...{token.slice(-8)}
            </p>
          </div>
        </div>

        {/* Revoked Banner */}
        {document.status === 'revoked' && (
          <div className="bg-red-600 p-3 text-center text-xs font-bold uppercase tracking-widest text-white">
            This document has been invalidated
          </div>
        )}
      </div>
    </div>
  );
}
