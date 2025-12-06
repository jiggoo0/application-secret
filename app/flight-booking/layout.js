// app/flight-booking/layout.js
// นี่คือ React Server Component (RSC) โดยปริยาย (ไม่ต้องมี 'use client')

// Export metadata ที่ถูกต้อง
export const metadata = {
  title: 'สั่งซื้อเอกสารตั๋วเครื่องบินและโรงแรม | ดูตัวอย่างก่อนชำระเงิน',
};

// Component นี้ทำหน้าที่เป็น Layout Wrapper ให้กับ page.js
export default function FlightBookingLayout({ children }) {
  // ไม่ต้องมี UI ห่อหุ้มเพิ่มเติมก็ได้
  return <>{children}</>;
}
