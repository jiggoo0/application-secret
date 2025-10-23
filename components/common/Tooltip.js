'use client';

/**
 * Tooltip component
 * - แสดงข้อความเมื่อ hover หรือ focus
 * - รองรับ accessibility และ responsive
 * - Production-ready
 */
export default function Tooltip({ children, content }) {
  const tooltipId =
    typeof content === 'string'
      ? `tooltip-${content.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      : undefined;

  return (
    <div className="group relative inline-block">
      {/* Focusable wrapper for accessibility */}
      <span tabIndex={0} className="outline-none focus:outline-none" aria-describedby={tooltipId}>
        {children}
      </span>

      {/* Tooltip content */}
      {content && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white shadow-md transition-opacity duration-200 ease-in-out group-hover:block group-focus:block dark:bg-gray-700"
        >
          {content}
        </span>
      )}
    </div>
  );
}

Tooltip;
