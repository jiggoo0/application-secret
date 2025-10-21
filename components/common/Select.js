'use client';

/**
 * Textarea Component
 * - ใช้สำหรับข้อความหลายบรรทัด
 * - รองรับ label, error, required
 * - Production-ready & accessible
 */
export default function Textarea({ label, value, onChange, placeholder, error, required, rows }) {
  const safeLabel = typeof label === 'string' ? label.trim() : '';
  const inputId = safeLabel
    ? `textarea-${safeLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const baseClass = `textarea textarea-bordered w-full resize-y transition focus:outline-none focus:ring-2 ${
    error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary'
  } dark:bg-base-200 dark:text-white`;

  return (
    <div className="form-control w-full">
      {/* Label */}
      {safeLabel && (
        <label htmlFor={inputId} className="label">
          <span className="label-text font-medium">
            {safeLabel}
            {required && <span className="ml-1 text-red-500">*</span>}
          </span>
        </label>
      )}

      {/* Textarea Field */}
      <textarea
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={baseClass}
      />

      {/* Error Message */}
      {error && (
        <span id={errorId} className="mt-1 text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}

Textarea.defaultProps = {
  label: '',
  placeholder: '',
  error: '',
  required: false,
  rows: 4,
};
