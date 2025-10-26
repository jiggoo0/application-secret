import { createRoot } from 'react-dom/client';

/**
 * showToast
 * - Displays a temporary toast message
 * - Supports 'success', 'error', and 'info' types
 * - Uses Tailwind and theme-based styles
 */
function showToast(message, type = 'info', duration = 3000) {
  if (typeof document === 'undefined') return;

  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);

  const baseClass =
    'fixed bottom-6 left-1/2 z-toast -translate-x-1/2 rounded-md px-4 py-3 text-sm font-medium text-white shadow-lg transition-opacity duration-300';

  const typeClass = {
    success: 'bg-success text-success-foreground',
    error: 'bg-destructive text-destructive-foreground',
    info: 'bg-primary text-primary-foreground',
  };

  root.render(
    <div
      role="alert"
      aria-live="assertive"
      className={`${baseClass} ${typeClass[type] || typeClass.info}`}
    >
      {message}
    </div>,
  );

  setTimeout(() => {
    root.unmount();
    container.remove();
  }, duration);
}

export const toast = {
  success: (msg, duration) => showToast(msg, 'success', duration),
  error: (msg, duration) => showToast(msg, 'error', duration),
  info: (msg, duration) => showToast(msg, 'info', duration),
};

export default toast;
