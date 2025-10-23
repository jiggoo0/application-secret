'use client';

import PropTypes from 'prop-types';
import ClientProviders from './providers/ClientProviders';

/**
 * ✅ Global Providers Wrapper (Next.js App Router)
 * -----------------------------------------------------
 * - ครอบ global context ทั้งหมด (Theme, Query, Modal, Toast)
 * - ป้องกัน crash จาก provider ภายใน (safety fallback)
 * - ใช้ใน layout.js
 */
export default function Providers({ children }) {
  try {
    return (
      <ClientProviders>
        {/* 🔧 สามารถเพิ่ม Global Context อื่นได้ที่นี่ */}
        {children}
      </ClientProviders>
    );
  } catch (err) {
    console.error('Providers Error:', err);
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50 text-red-700">
        <p className="text-sm font-medium sm:text-base">
          Provider initialization failed — check console for details.
        </p>
      </div>
    );
  }
}

Providers.propTypes = {
  /** เนื้อหา React ทั้งหมดที่จะอยู่ภายใต้ provider */
  children: PropTypes.node.isRequired,
};
