'use client';

/**
 * Loader Component
 * แสดงสถานะกำลังโหลด พร้อมข้อความและขนาดปรับได้
 * - รองรับ animation ด้วย DaisyUI / Tailwind
 * - รองรับ accessibility
 */
export default function Loader({ message = 'กำลังโหลด...', size = 'md' }) {
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const spinnerSize = sizeClass[size] || sizeClass.md;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className="flex flex-col items-center justify-center gap-2 py-8 text-center text-base-content"
    >
      <span className={`loading loading-spinner ${spinnerSize} text-primary`} aria-hidden="true" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}

Loader.defaultProps = {
  message: 'กำลังโหลด...',
  size: 'md',
};
