'use client';

import { useEffect, useState } from 'react';

/**
 * Toast notification component
 * - Auto hide after duration
 * - Supports type: success, error, info
 * - Accessible, production-ready SPA
 */
export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (typeof onClose === 'function') {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) {
    return null;
  }

  const typeStyles = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  };

  const toastClass = typeStyles[type] || typeStyles.info;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-label={message}
      className={`fixed bottom-6 left-1/2 z-50 max-w-sm -translate-x-1/2 transform rounded px-4 py-3 text-white shadow-lg transition-opacity duration-300 ease-out ${toastClass}`}
    >
      <span className="block text-sm font-medium">{message}</span>
    </div>
  );
}

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  onClose: undefined,
};
