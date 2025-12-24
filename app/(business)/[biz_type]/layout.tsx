// app/(business)/[biz_type]/layout.tsx
// ----------------------------------------------------
// 🏗️ JP-VISOUL: Business Dynamic Layout
// Role: Layout Provider for Business Units (Visa, Loan, etc.)
// ----------------------------------------------------

import React from 'react'; // ✅ เพิ่มเพื่อแก้ Error: 'React' is not defined

export default async function BusinessLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ biz_type: string }>;
}) {
  const { biz_type } = await params;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 🏗️ Header ธุรกิจแยก (Industrial Style) */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-slate-900 bg-white p-6 shadow-sm">
        <div className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">
          {biz_type}
          <span className="text-blue-600">_UNIT</span>
        </div>
        <div className="bg-slate-900 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-white">
          SECURE_PORTAL
        </div>
      </header>

      {/* 🚀 Main Content Area */}
      <main className="flex-grow">{children}</main>

      {/* 🛠️ Footer ธุรกิจแยก (Terminal Style) */}
      <footer className="border-t-4 border-slate-900 bg-slate-50 p-10 text-center font-mono text-[9px] uppercase tracking-widest text-slate-500">
        © 2025 JP-VISOUL // {biz_type.toUpperCase()} DIVISION // ALL_RIGHTS_RESERVED
      </footer>
    </div>
  );
}
