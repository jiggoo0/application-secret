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
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };

    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
        className="animate-fadeIn w-full max-w-lg rounded-lg border border-border bg-background p-6 text-foreground shadow-xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <header>
            <h2 id="modal-title" className="mb-4 text-xl font-semibold text-foreground">
              {title}
            </h2>
          </header>
        )}

        <div className="text-sm text-muted-foreground">{children}</div>

        <footer className="mt-6 text-right">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-accent hover:text-accent-foreground"
            aria-label="ปิดหน้าต่าง"
          >
            ปิด
          </button>
        </footer>
      </div>
    </div>
  );
}
