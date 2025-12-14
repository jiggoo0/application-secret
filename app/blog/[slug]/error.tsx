// /app/blog/[slug]/error.tsx
'use client'; // ต้องมีสำหรับ Error Boundary Component

import { useEffect } from 'react';
// import { Button } from '@/components/ui/button'; // [FIX] ลบ Import นี้ออก

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl font-bold text-red-600">เกิดข้อผิดพลาดในการโหลดเนื้อหาบทความ</h2>
      <p className="mt-2 text-gray-500">**Error**: {error.message}</p>
      <button
        className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        ลองโหลดใหม่อีกครั้ง
      </button>
    </div>
  );
}
