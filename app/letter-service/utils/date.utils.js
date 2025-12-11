// 🚀 File: app/letter-service/utils/date.utils.js

/**
 * Utility: Format Date Object or ISO string to Long Date Format (e.g., December 11, 2025)
 * @param {Date|string} dateInput
 * @returns {string} Formatted date string
 */
export const formatLongDate = (dateInput) => {
  if (!dateInput) return '[Date Placeholder]';

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  try {
    const date = new Date(dateInput);
    if (isNaN(date)) return '[Invalid Date]';
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    return '[Formatting Error]';
  }
};

/**
 * Utility: Calculates duration between two dates and formats it as text.
 * @param {string} startDate
 * @param {string} endDate
 * @returns {string} Duration text (e.g., "14 days")
 */
export const getDurationText = (startDate, endDate) => {
  if (!startDate || !endDate) return '[Number of days/weeks]';

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate difference in milliseconds
    const diffTime = Math.abs(end - start);
    // Convert to days (add 1 for inclusive count)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays <= 0) return 'less than a day';
    if (diffDays < 7) return `${diffDays} days`;

    const weeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;

    if (remainingDays === 0) return `${weeks} weeks`;
    return `${weeks} weeks and ${remainingDays} days`;
  } catch (e) {
    return '[Duration Error]';
  }
};
