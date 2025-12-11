// components/admin/kbank/Layout/KBankAdminLayout.jsx
// 💡 Client Component: ใช้สำหรับการจัดการ Active State ของ Sidebar

'use client';

import KBankAdminSidebar from './KBankAdminSidebar';
import { usePathname } from 'next/navigation';

/**
 * KBankAdminLayout
 * Layout หลักสำหรับ KBank Feature
 */
export default function KBankAdminLayout({ title, children }) {
  const pathname = usePathname();
  const activeSection = pathname.split('/').pop(); // ดึงส่วนสุดท้ายของ URL มาเป็น active key

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 overflow-y-auto p-4">
        <KBankAdminSidebar activeSection={activeSection} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        </header>

        {/* Content */}
        <section>{children}</section>
      </main>
    </div>
  );
}
