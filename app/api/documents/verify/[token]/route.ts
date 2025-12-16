// /app/api/documents/verify/[token]/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/* ===== Metadata Structures ===== */

interface ETicketMetadata {
  passenger?: { name: string };
  fareDetails?: { totalPaid: string };
  flights?: Array<{
    date: string;
    from: string;
    to: string;
    depTime: string;
  }>;
}

interface FrontendDetails {
  passenger: string;
  fare: string;
  flights: Array<{
    date: string;
    from: string;
    to: string;
    time: string;
  }>;
}

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const supabase = supabaseServer;

  if (!supabase) {
    return NextResponse.json(
      { status: 'error', message: 'Database connection failed' },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from('documents')
    .select('id, type, status, ref_id, pdf_url, created_at, metadata')
    .eq('qr_token', token)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { status: 'invalid', message: 'Invalid or expired token' },
      { status: 404 },
    );
  }

  let details: FrontendDetails | null = null;
  const meta = data.metadata as ETicketMetadata | null;

  if (meta?.passenger?.name && meta?.fareDetails?.totalPaid && Array.isArray(meta?.flights)) {
    details = {
      passenger: meta.passenger.name,
      fare: meta.fareDetails.totalPaid,
      flights: meta.flights.map((f) => ({
        date: f.date,
        from: f.from,
        to: f.to,
        time: f.depTime,
      })),
    };
  }

  const { id, metadata, ...rest } = data;

  return NextResponse.json({
    status: data.status,
    document: {
      ...rest,
      document_id: id,
      details,
    },
  });
}
