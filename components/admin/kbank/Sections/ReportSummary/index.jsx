// components/admin/kbank/Sections/ReportSummary/index.jsx
// 'use client' // หากมีการโต้ตอบ UI (เช่น Filter/Tooltip)

/**
 * @typedef {object} ReportSummaryData
 * @property {number} totalRevenue
 * @property {number} totalTransactions
 */

// Component นี้จะถูกส่งออกเป็น Default Export เพื่อให้สอดคล้องกับ page.jsx ที่แก้ไข
export default function ReportSummary({ data }) {
  // ... UI/UX Logic
  return (
    <div className="grid grid-cols-1 gap-6 rounded-xl bg-white p-6 shadow-lg md:grid-cols-3">
      <SummaryCard title="รายได้รวม" value={data.totalRevenue} unit="THB" />
      <SummaryCard title="จำนวนรายการ" value={data.totalTransactions} unit="รายการ" />
      <SummaryCard title="...อื่นๆ" value={0} unit="..." />
    </div>
  );
}

// Sub-Component
const SummaryCard = ({ title, value, unit }) => (
  <div className="rounded-lg border p-4 transition hover:shadow-md">
    <p className="text-sm font-medium text-gray-500">{title}</p>
    <p className="mt-1 text-3xl font-bold text-indigo-600">
      {value.toLocaleString()} <span className="text-lg font-normal">{unit}</span>
    </p>
  </div>
);
