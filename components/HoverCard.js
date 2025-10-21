'use client';

import { useState } from 'react';

/**
 * HoverCard component
 * - Interactive card with hover & click/touch support
 * - Accessible (keyboard focus + ARIA)
 * - Production-ready SPA
 */
export default function HoverCard({ title, description, icon }) {
  const [active, setActive] = useState(false);

  const handleToggle = () => setActive((prev) => !prev);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const baseClass =
    'relative cursor-pointer rounded-xl p-6 shadow-md transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary';
  const hoverClass = 'hover:scale-105 hover:shadow-lg';
  const activeClass = active
    ? 'scale-105 bg-blue-50 shadow-lg dark:bg-blue-900'
    : 'bg-base-100 dark:bg-gray-800';

  return (
    <div
      tabIndex={0}
      role="button"
      aria-pressed={active ? 'true' : 'false'}
      aria-label={`การ์ด ${title}`}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`${baseClass} ${hoverClass} ${activeClass}`}
    >
      {/* Icon */}
      {icon && <div className="mb-4 text-4xl text-primary">{icon}</div>}

      {/* Title */}
      {title && (
        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      )}

      {/* Description */}
      {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
    </div>
  );
}
