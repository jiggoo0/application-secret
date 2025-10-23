'use client';

import clsx from 'clsx';

/**
 * Input Component
 * - ใช้งานทั่วไป รองรับ label, error, placeholder
 * - TailwindCSS ready, accessible, responsive
 */
export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const inputId = `input-${name}`;

  return (
    <div className={clsx('mb-4', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={clsx(
          'w-full rounded-md border px-3 py-2 text-sm shadow-sm transition focus:outline-none',
          'bg-white text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary',
          'dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500',
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300',
        )}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  error: '',
  required: false,
  disabled: false,
  className: '',
};
