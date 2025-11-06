'use client';

import Widget from '@/components/Widget';

/**
 * หน้าแชทหลัก
 * - โหลด Widget แชท
 * - รองรับ Dark mode / Responsive
 */
export default function ChatPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* วาง Widget แชท */}
      <Widget />
    </div>
  );
}
