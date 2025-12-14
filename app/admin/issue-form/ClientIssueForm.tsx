// app/admin/issue-form/ClientIssueForm.tsx
'use client';

import React, { useState, useCallback, useMemo } from 'react';
// 💡 Import Server Actions
import { fetchBookingDetails } from '@/app/actions/bookings';
import { issueDocument } from '@/app/actions/documents';
// 💡 Assumed types
import type { BookingSchema } from '@/app/actions/bookings';

// ----------------------------------------------------
// 1. TYPES AND INTERFACES
// ----------------------------------------------------
interface IssueStatus {
  message: string;
  type: 'idle' | 'loading' | 'success' | 'error';
}

interface FetchedBooking extends BookingSchema {
  id: number;
  created_at: string;
}

// ----------------------------------------------------
// 2. UTILITY FUNCTIONS (PDF Download Logic)
// ----------------------------------------------------

/**
 * @description แปลง Base64 String ที่ได้จาก Server Action เป็น Blob และ Force Download เป็นไฟล์ PDF
 */
const downloadPdfFromBase64 = (base64String: string, pnr: string, projectId: string) => {
  const base64Cleaned = base64String.replace(/^data:application\/pdf;base64,/, '');

  const binaryString = atob(base64Cleaned);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: 'application/pdf' });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', `${projectId}_${pnr}.pdf`);
  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

// ----------------------------------------------------
// 3. MAIN COMPONENT
// ----------------------------------------------------

export const ClientIssueForm: React.FC = () => {
  const [pnrInput, setPnrInput] = useState<string>('');
  const [bookingData, setBookingData] = useState<FetchedBooking | null>(null);
  const [status, setStatus] = useState<IssueStatus>({
    message: 'กรอก PNR Code เพื่อค้นหาการจอง',
    type: 'idle',
  });
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isIssuing, setIsIssuing] = useState<boolean>(false);

  // ----------------------------------------------------
  // HANDLER: Search Booking Data by PNR (Unchanged)
  // ----------------------------------------------------
  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const pnr = pnrInput.trim().toUpperCase();
      if (!pnr) {
        setStatus({ message: 'โปรดระบุ PNR Code', type: 'error' });
        return;
      }

      setIsSearching(true);
      setStatus({ message: `กำลังค้นหา PNR: ${pnr}...`, type: 'loading' });
      setBookingData(null);

      try {
        const result = await fetchBookingDetails(pnr);

        if (result.success && result.data) {
          setBookingData(result.data as FetchedBooking);
          setStatus({
            message: `✅ พบข้อมูลการจอง PNR: ${pnr} (ประเภท: ${result.data.project_id})`,
            type: 'success',
          });
        } else {
          setStatus({
            message: `❌ ไม่พบข้อมูลการจอง PNR: ${pnr}`,
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Search Error:', error);
        setStatus({
          message: `❌ เกิดข้อผิดพลาดในการเชื่อมต่อ: ${(error as Error).message}`,
          type: 'error',
        });
      } finally {
        setIsSearching(false);
      }
    },
    [pnrInput],
  );

  // ----------------------------------------------------
  // HANDLER: Generate and Download PDF (Using Server Action)
  // ----------------------------------------------------
  const handleIssueDocument = async () => {
    if (!bookingData) return;

    setIsIssuing(true);
    setStatus({ message: 'กำลังสร้างเอกสาร PDF...', type: 'loading' });

    try {
      const result = await issueDocument(bookingData);

      if (!result.success || !result.pdf_base64) {
        throw new Error(
          result.error || `Server failed to generate document for ${bookingData.pnr_code}`,
        );
      }

      downloadPdfFromBase64(
        result.pdf_base64,
        result.pnr_code || bookingData.pnr_code,
        result.project_id || bookingData.project_id,
      );

      setStatus({
        message: `🎉 สร้างและดาวน์โหลดเอกสารสำเร็จ: ${bookingData.pnr_code}.pdf`,
        type: 'success',
      });
    } catch (error) {
      console.error('PDF Issue Error:', error);
      setStatus({
        message: `❌ ไม่สามารถสร้างเอกสารได้: ${(error as Error).message}`,
        type: 'error',
      });
    } finally {
      setIsIssuing(false);
    }
  };

  // ----------------------------------------------------
  // UI UTILITIES (Memoized for better Performance)
  // ----------------------------------------------------

  // 🔥 FIX: getStatusStyle ถูกกำหนดให้เป็นค่า (value) โดย useMemo ไม่ใช่ฟังก์ชัน
  const statusStyle = useMemo(() => {
    switch (status.type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'loading':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  }, [status.type]);

  // Component ย่อยสำหรับการแสดงรายละเอียดที่ดึงมา
  const BookingDetailsView = ({ data }: { data: FetchedBooking }) => (
    <div className="space-y-6">
      <h3 className="border-b pb-2 text-2xl font-bold text-indigo-700">
        รายละเอียดการจอง: {data.pnr_code}
        <span
          className={`ml-4 rounded p-1 text-sm font-semibold ${data.booking_status === 'CONFIRMED' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-900'}`}
        >
          {data.booking_status}
        </span>
      </h3>
      {/* Traveller and Booking Info */}
      <div className="grid grid-cols-3 gap-4 rounded-lg bg-white p-4 shadow-inner">
        <div className="font-semibold text-gray-700">ผู้เดินทางหลัก:</div>
        <div className="col-span-2">
          {data.traveller_name} (Passport: {data.traveller_details?.passport_no || 'N/A'})
        </div>
        <div className="font-semibold text-gray-700">ประเภทเอกสาร:</div>
        <div className="col-span-2">{data.project_id}</div>
        <div className="font-semibold text-gray-700">วันที่บันทึก:</div>
        <div className="col-span-2">{new Date(data.created_at).toLocaleDateString('th-TH')}</div>
      </div>
      {/* Flight Details */}
      {data.project_id === 'FLIGHT' && data.flight_details && data.flight_details.length > 0 && (
        <div className="rounded-lg border bg-blue-50 p-4">
          <h4 className="mb-3 font-semibold text-blue-800">
            ✈️ Flight Itinerary ({data.flight_details.length} Segment(s))
          </h4>
          {data.flight_details.map((f, i) => (
            <p key={i} className="border-b py-1 text-sm">
              **{f.airline_name}** ({f.flight_no}) | {f.route} | {f.date}
            </p>
          ))}
        </div>
      )}
      {/* Hotel Details */}
      {data.project_id === 'HOTEL' && data.hotel_details && (
        <div className="rounded-lg border bg-green-50 p-4">
          <h4 className="mb-3 font-semibold text-green-800">🏨 Accommodation Details</h4>
          <p className="text-sm">**{data.hotel_details.hotel_name}**</p>
          <p className="text-xs text-gray-600">{data.hotel_details.location}</p>
          <p className="text-sm">
            Check-in: {data.hotel_details.check_in_date} / Check-out:{' '}
            {data.hotel_details.check_out_date}
          </p>
        </div>
      )}
      {/* Fare Summary */}
      {data.fare_summary && (
        <div className="rounded-lg border bg-gray-50 p-4 text-right">
          <span className="text-lg font-bold text-indigo-800">
            Total Paid: {data.fare_summary.total_paid.toLocaleString()} {data.fare_summary.currency}
          </span>
        </div>
      )}
      {/* Issue Button */}
      <button
        type="button"
        onClick={handleIssueDocument}
        disabled={isIssuing || isSearching}
        className={`w-full rounded-lg px-4 py-3 text-lg font-semibold text-white transition duration-150 ${
          isIssuing
            ? 'cursor-not-allowed bg-purple-400'
            : 'bg-purple-600 shadow-xl hover:bg-purple-700'
        }`}
      >
        {isIssuing ? '⏳ กำลังสร้าง PDF...' : '⬇️ สร้างและดาวน์โหลดเอกสาร (PDF)'}
      </button>
    </div>
  );

  // ----------------------------------------------------
  // RENDER
  // ----------------------------------------------------

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-2xl">
      <h2 className="mb-8 border-b pb-4 text-3xl font-bold text-gray-800">
        <span className="text-purple-600">Admin</span>: ออกเอกสารยืนยันการจอง
      </h2>
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
      {/* 🔥 FIX: เปลี่ยนการเรียก getStatusStyle() เป็นการเข้าถึงค่า statusStyle โดยตรง */}
      <div className={`mb-6 rounded border-l-4 p-4 ${statusStyle}`}>
        <p className="font-medium">{status.message}</p>
      </div>

      {/* 3. Booking Details View */}
      {bookingData && <BookingDetailsView data={bookingData} />}

      {!bookingData && status.type === 'success' && (
        <div className="rounded-lg border border-dashed bg-white p-6 text-center text-gray-500">
          โปรดกรอก PNR เพื่อเริ่มต้นค้นหาและออกเอกสาร
        </div>
      )}
    </div>
  );
};
