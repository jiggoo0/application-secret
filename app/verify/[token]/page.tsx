// Document Verification Page (Server Component) – Next.js 15 compatible

import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface VerificationResult {
  document_id: string;
  status: 'pending' | 'paid' | 'verified' | 'revoked';
  ref_id: string;
  pdf_url: string | null;
  created_at: string;
  details: {
    passenger: string;
    fare: string;
    flights: Array<{
      date: string;
      from: string;
      to: string;
      time: string;
    }>;
  } | null;
}

/**
 * ✅ สำคัญมาก (Next.js 15)
 * params เป็น Promise
 */
interface VerifyPageProps {
  params: Promise<{
    token: string;
  }>;
}

/* -------------------------------------------------------------------------- */
/*                              HELPER COMPONENT                               */
/* -------------------------------------------------------------------------- */

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default async function VerifyPage({ params }: VerifyPageProps) {
  /* ----------------------------- FIX #1 params ----------------------------- */
  const { token } = await params;

  /* ---------------------------- FIX #2 headers ----------------------------- */
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  if (!host) {
    throw new Error('Cannot determine host');
  }

  const baseUrl = `${protocol}://${host}`;
  const apiUrl = `${baseUrl}/api/documents/verify/${token}`;

  let document: VerificationResult | null = null;

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' });

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error(`Verify failed (${res.status})`);
    }

    const json = await res.json();
    document = json.document as VerificationResult;
  } catch (err) {
    console.error(err);
  }

  if (!document) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">Unable to verify document</p>
      </div>
    );
  }

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-300 text-black',
    paid: 'bg-blue-500 text-white',
    verified: 'bg-green-600 text-white',
    revoked: 'bg-red-600 text-white',
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Document Verification</h1>

        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold">Status</span>
          <span
            className={`rounded-full px-4 py-1 text-sm font-semibold ${
              statusColor[document.status]
            }`}
          >
            {document.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailItem label="Token" value={token} />
          <DetailItem label="Document ID" value={document.document_id} />
          <DetailItem label="Reference ID" value={document.ref_id} />
          <DetailItem
            label="Issued At"
            value={new Date(document.created_at).toLocaleDateString()}
          />
        </div>

        {document.details && (
          <>
            <hr className="my-4" />
            <h2 className="mb-2 text-lg font-bold">Details</h2>

            <DetailItem label="Passenger" value={document.details.passenger} />
            <DetailItem label="Fare" value={document.details.fare} />

            <div className="mt-2">
              <p className="text-xs font-semibold uppercase text-gray-400">Flights</p>
              {document.details.flights.map((f, i) => (
                <div key={i} className="flex justify-between border-b py-1 text-sm">
                  <span>
                    {f.from} → {f.to}
                  </span>
                  <span>
                    {f.date} {f.time}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {document.status === 'verified' && document.pdf_url && (
          <a
            href={document.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block w-full rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white hover:bg-blue-700"
          >
            Download Verified PDF
          </a>
        )}

        {document.status === 'revoked' && (
          <p className="mt-4 text-center font-bold text-red-600">This document has been revoked</p>
        )}
      </div>
    </div>
  );
}
