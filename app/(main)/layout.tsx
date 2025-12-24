// app/(main)/layout.tsx
import React from 'react'; // ✅ เพิ่มบรรทัดนี้เพื่อแก้ Error: 'React' is not defined
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" className="mx-auto w-full flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
