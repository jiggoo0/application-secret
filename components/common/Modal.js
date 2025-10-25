'use client';

import { useEffect, useRef } from 'react';

/**
 * Modal Component
 * - แสดง popup แบบ overlay
 * - รองรับ Escape key, backdrop click
 * - ป้องกัน scroll, รองรับ accessibility
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', handleKeyDown);

    // Focus trap (optional enhancement)
    modalRef.current?.focus();

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="animate-fadeIn w-full max-w-lg rounded-lg bg-base-100 p-6 shadow-xl transition-all dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header>
            <h2
              id="modal-title"
              className="mb-4 text-xl font-semibold text-base-content dark:text-white"
            >
              {title}
            </h2>
          </header>
        )}

        <div className="text-base-content dark:text-gray-300">{children}</div>

        <footer className="mt-6 text-right">
          <button
            type="button"
            onClick={onClose}
            className="btn-outline btn btn-sm"
            aria-label="ปิดหน้าต่าง"
          >
            ปิด
          </button>
        </footer>
      </div>
    </div>
  );
}
