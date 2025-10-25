export default function ErrorFallback({
  message = 'เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณารีเฟรชหน้านี้อีกครั้ง',
}) {
  return (
    <main className="flex h-screen items-center justify-center bg-white dark:bg-gray-900">
      <p className="text-sm text-red-500">{message}</p>
    </main>
  );
}
