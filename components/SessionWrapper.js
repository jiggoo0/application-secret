'use client'; // <-- ต้องมีบรรทัดนี้

import { SessionProvider } from 'next-auth/react';

export default function SessionWrapper({ children }) {
  // SessionProvider ต้องเป็น Client Component
  // และห่อหุ้มคอมโพเนนต์ลูกทั้งหมดที่ต้องการใช้ useSession()
  return <SessionProvider>{children}</SessionProvider>;
}
