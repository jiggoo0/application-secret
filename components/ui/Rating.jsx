'use client';

/**
 * Rating Component
 * - ใช้สำหรับให้คะแนน (1–5)
 * - รองรับ controlled value, accessibility, DaisyUI
 * - Production-ready
 */
export default function Rating({ value, onChange, max, readOnly }) {
  const handleSelect = (score) => {
    if (!readOnly && typeof onChange === 'function') {
      onChange(score);
    }
  };

  return (
    <div role="radiogroup" aria-label="ให้คะแนน" className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => {
        const score = i + 1;
        const isActive = score <= value;

        return (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`ให้คะแนน ${score} ดาว`}
            disabled={readOnly}
            onClick={() => handleSelect(score)}
            className={`text-xl transition ${
              isActive ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
            } ${
              !readOnly
                ? 'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                : 'cursor-default'
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

Rating.defaultProps = {
  onChange: undefined,
  max: 5,
  readOnly: false,
};
