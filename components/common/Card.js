'use client';

import clsx from 'clsx';

/**
 * Card Component
 * - กล่องข้อมูลแบบ flexible slot
 * - รองรับ title, children, className
 * - Production-ready, accessible
 */
export default function Card({ title, children, className = '' }) {
  const hasTitle = typeof title === 'string' && title.trim().length > 0;
  const titleId = hasTitle ? `card-title-${Math.random().toString(36).slice(2, 8)}` : undefined;

  const baseClass = clsx(
    'bg-base-100 ring-1 ring-base-300 dark:ring-base-700',
    'rounded-xl p-6 shadow-md transition-shadow hover:shadow-lg',
    'flex flex-col justify-between',
    className,
  );

  return (
    <article
      className={baseClass}
      role="group"
      {...(hasTitle ? { 'aria-labelledby': titleId } : { 'aria-label': 'กล่องข้อมูล' })}
    >
      {hasTitle && (
        <header>
          <h3 id={titleId} className="mb-4 text-lg font-semibold text-primary dark:text-white">
            {title}
          </h3>
        </header>
      )}
      <div className="flex-1 text-base-content">{children}</div>
    </article>
  );
}

Card.defaultProps = {
  title: undefined,
  className: '',
};
