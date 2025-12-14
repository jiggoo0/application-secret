// app/admin/issue-form/ClientIssueForm.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
// 💡 Import Server Actions: ใช้ fetchBookingDetails (จาก bookings) และ issueDocument (จาก documents)
import { fetchBookingDetails } from '@/app/actions/bookings';
import { issueDocument } from '@/app/actions/documents';
// 💡 Assumed types (อ้างอิงจาก actions/bookings.ts)
import type { BookingSchema } from '@/app/actions/bookings';

// ----------------------------------------------------
// 1. TYPES AND INTERFACES
// ----------------------------------------------------
interface IssueStatus {
  message: string;
  type: 'idle' | 'loading' | 'success' | 'error';
}

// 💡 FIX: นำ 'adminApiKey' ออกจาก Props interface
interface ClientIssueFormProps {
  // ไม่รับ Props ใด ๆ อีกต่อไป (เนื่องจาก Server Actions ใช้ Key โดยตรง)
}

// ----------------------------------------------------
// 2. UTILITY FUNCTIONS (PDF Download Logic)
// ----------------------------------------------------

/**
 * @description แปลง Base64 String ที่ได้จาก Server Action เป็น Blob และ Force Download เป็นไฟล์ PDF
 */
const downloadPdfFromBase64 = (base64String: string, pnr: string, projectId: string) => {
  try {
    // ทำความสะอาด Base64 string หากมี prefix
    const base64Cleaned = base64String.replace(/^data:application\/pdf;base64,/, '');

    // แปลง Base64 เป็น ArrayBuffer และ Blob
    const binaryString = atob(base64Cleaned);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });

    // Force download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const safePnr = pnr.replace(/[^a-zA-Z0-9-]/g, '_');
    a.download = `${projectId}-${safePnr}.pdf`; // ตั้งชื่อไฟล์ตาม Project ID และ PNR
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (e) {
    console.error('Error during PDF download:', e);
    return false;
  }
};

// ----------------------------------------------------
// 3. SUB-COMPONENTS
// ----------------------------------------------------

/**
 * @component BookingDetailsView
 * @description แสดงรายละเอียดการจองที่ดึงมาเพื่อ Preview
 */
const BookingDetailsView = ({ data }: { data: BookingSchema }) => {
  if (!data) return null;

  // 💡 ใช้ข้อมูลจาก BookingSchema
  const voucher_id = data.pnr_code || 'N/A';
  // 💡 ProjectType อาจมีค่าเป็น '' (Empty String) สำหรับ Initial State
  const display_type = (data.project_id || 'UNKNOWN').toUpperCase();

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-indigo-600">Booking Preview: {voucher_id}</h2>
      <div className="grid grid-cols-2 gap-4">
        <p>
          <span className="font-semibold">Type:</span>{' '}
          <span className="uppercase text-green-700">{display_type}</span>
        </p>
        <p>
          <span className="font-semibold">Customer:</span> {data.traveller_name || 'N/A'}
        </p>
        <p>
          <span className="font-semibold">Total Paid:</span> {data.fare_summary?.total_paid}{' '}
          {data.fare_summary?.currency || 'THB'}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {data.booking_status || 'N/A'}
        </p>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 4. MAIN COMPONENT
// ----------------------------------------------------

// ✅ FIX: ลบ Empty Object Pattern ({}) ออกจาก Destructuring เพื่อแก้ Error: Unexpected empty object pattern
export function ClientIssueForm() {
  const [pnrInput, setPnrInput] = useState('');
  const [bookingData, setBookingData] = useState<BookingSchema | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [status, setStatus] = useState<IssueStatus>({
    message: 'Enter a PNR or Voucher ID to search.',
    type: 'idle',
  });

  const statusStyle = useMemo(() => {
    switch (status.type) {
      case 'loading':
        return 'bg-blue-50 border-blue-400 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-400 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-400 text-red-800';
      case 'idle':
      default:
        return 'bg-gray-50 border-gray-400 text-gray-800';
    }
  }, [status.type]);

  /**
   * @description Handle PNR search via Server Action (fetchBookingDetails)
   */
  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const pnrClean = pnrInput.toUpperCase().trim();
      if (!pnrClean) return;

      setIsSearching(true);
      setBookingData(null);
      setStatus({ message: `Searching for PNR: ${pnrClean}...`, type: 'loading' });

      try {
        // 💡 Call Server Action: fetchBookingDetails (จัดการ Key บน Server)
        const result = await fetchBookingDetails(pnrClean);

        if (result.success && result.data) {
          // หากข้อมูลถูกดึงมาแล้ว ให้ set BookingData เพื่อใช้ในการ Issue ต่อไป
          setBookingData(result.data);
          setStatus({
            message: `Found booking for ${result.data.traveller_name || 'N/A'}. Ready to issue document.`,
            type: 'success',
          });
        } else {
          setStatus({
            message: result.error || `Error: PNR ${pnrClean} not found or data is incomplete.`,
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Search error:', error);
        setStatus({
          message: 'An internal error occurred during search.',
          type: 'error',
        });
      } finally {
        setIsSearching(false);
      }
    },
    [pnrInput],
  );

  /**
   * @description Handle PDF issuance via Server Action (issueDocument)
   * 💡 Action นี้จะใช้ข้อมูลที่ Fetch มาได้ (bookingData) แล้วส่งไปสร้าง PDF
   */
  const handleIssueDocument = useCallback(async () => {
    if (!bookingData) return;

    setIsIssuing(true);
    // 💡 Status เปลี่ยนเป็น 'Issuing'
    setStatus({ message: 'Generating PDF document...', type: 'loading' });

    try {
      // 💡 Call the DEDICATED issueDocument Server Action
      const result = await issueDocument(bookingData);

      if (result.success && result.pdf_base64 && result.pnr_code && result.project_id) {
        // 💡 Trigger client-side download
        const isSuccess = downloadPdfFromBase64(
          result.pdf_base64,
          result.pnr_code,
          result.project_id,
        );

        if (isSuccess) {
          setStatus({
            message: `Successfully generated and downloaded Voucher: ${result.pnr_code}.`,
            type: 'success',
          });
        } else {
          setStatus({
            message: 'Generated PDF but failed to trigger download on the browser.',
            type: 'error',
          });
        }
      } else {
        setStatus({
          message: result.error || 'Failed to generate PDF. Check PNR and server logs.',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Issue error:', error);
      setStatus({
        message: 'An internal error occurred during document generation.',
        type: 'error',
      });
    } finally {
      setIsIssuing(false);
    }
  }, [bookingData]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="mb-6 text-center text-3xl font-bold text-indigo-700">
        Issue Verified Documents
      </h1>

      {/* 1. Search Form */}
      <form
        onSubmit={handleSearch}
        className="mb-6 flex space-x-3 rounded-lg border bg-gray-50 p-4"
      >
        <input
          type="text"
          value={pnrInput}
          onChange={(e) => setPnrInput(e.target.value.toUpperCase())}
          className="flex-grow rounded-lg border border-gray-300 px-4 py-2 text-lg font-bold uppercase"
          placeholder="ใส่ PNR หรือ Booking Reference Code"
          required
          disabled={isSearching || isIssuing}
        />
        <button
          type="submit"
          disabled={isSearching || isIssuing}
          className={`rounded-lg px-6 py-2 font-semibold text-white transition ${
            isSearching ? 'cursor-not-allowed bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isSearching ? 'ค้นหา...' : '🔎 ค้นหา'}
        </button>
      </form>

      {/* 2. Status Alert */}
      <div className={`mb-6 rounded border-l-4 p-4 ${statusStyle}`}>
        <p className="font-medium">{status.message}</p>
      </div>

      {/* 3. Booking Details View */}
      {bookingData && <BookingDetailsView data={bookingData} />}

      {/* 4. Issue Button */}
      {bookingData && (
        <div className="mt-8 text-center">
          <button
            onClick={handleIssueDocument}
            disabled={isIssuing || isSearching}
            className={`w-full rounded-lg px-8 py-4 text-xl font-bold text-white shadow-xl transition ${
              isIssuing ? 'cursor-not-allowed bg-green-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isIssuing ? '✅ Generating PDF...' : '⬇️ Issue & Download Document'}
          </button>
        </div>
      )}

      {/* 5. Fallback for no data found */}
      {!bookingData && status.type === 'success' && (
        <div className="rounded border border-gray-300 bg-gray-50 p-6 text-center">
          <p className="text-lg font-medium text-gray-600">
            No active booking data to display for PNR: {pnrInput}
          </p>
        </div>
      )}
    </div>
  );
}
