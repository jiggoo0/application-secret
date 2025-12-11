// /app/flight-booking/page.jsx
// PURE SERVER COMPONENT (NO 'use client')
import { Suspense } from 'react';
import FlightBookingClient from '@/components/FlightBookingClient'; // Import Client Component ใหม่

// Server Component โดยค่าเริ่มต้น
export default function FlightBookingPage() {
  return (
    // ✅ FIX: ใช้ Suspense ห่อหุ้ม Client Component ที่ใช้ useSearchParams
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <p className="text-xl text-gray-600">Loading form...</p>
        </div>
      }
    >
      <FlightBookingClient />
    </Suspense>
  );
}
