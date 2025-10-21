'use client';

import React from 'react';

/**
 * แสดงรายการสินค้า
 * @param {Object} props
 * @param {Array<string>} props.data - รายชื่อสินค้า
 */
export default function ProductList({ data = [] }) {
  const isValidList = Array.isArray(data) && data.length > 0;

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          รายการสินค้า{' '}
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({isValidList ? data.length.toLocaleString() : '0'} รายการ)
          </span>
        </h3>
      </header>

      {!isValidList ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">ไม่มีข้อมูลสินค้า</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((name, index) => {
            const displayName = typeof name === 'string' && name.trim() !== '' ? name.trim() : '—';

            return (
              <li
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <span className="font-medium text-gray-800 dark:text-white">{displayName}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
