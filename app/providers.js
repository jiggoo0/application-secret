'use client';

import PropTypes from 'prop-types';
import ClientProviders from './providers/ClientProviders';

/**
 * Global Providers wrapper สำหรับ Next.js App Router
 * ใช้ใน layout.js เพื่อครอบทุกหน้า
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export default function Providers({ children }) {
  return (
    <ClientProviders>
      {/* เพิ่ม GlobalToastProvider, ModalProvider, QueryClientProvider ได้ที่นี่ */}
      {children}
    </ClientProviders>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
