// components/admin/kbank/Sections/TransactionList.js
'use client'; // <--- ✅ ถูกต้อง: Container Component ต้องเป็น Client Component เพราะใช้ State และ Hook

import { useState } from 'react'; // ✅ ถูกต้อง: นำเข้า useState สำหรับจัดการ State ภายใน
import TransactionList from './TransactionList.jsx';
// 💡 Path ที่ถูกต้อง (แก้ไข Build Error ก่อนหน้า)
import { useFetchTransactions } from '../hooks/useKBankData'; // ✅ ถูกต้อง: Path Relative ถูกแก้ไขแล้ว

/**
 * TransactionListContainer
 * Container component: จัดการ State การกรอง (Filter) และ Pagination
 * ก่อนส่งข้อมูลไปยัง TransactionList (UI)
 */
export const TransactionListContainer = () => {
  // ✅ ถูกต้อง: State สำหรับ Filter และ Pagination (Source of Truth)
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    status: 'ALL', // Status filter: ALL, SUCCESS, FAILED
  });

  // 1. Logic: ใช้ Custom Hook ดึงข้อมูลตาม Filter State
  const { transactions, pagination, isLoading, error } = useFetchTransactions(filter); // ✅ ถูกต้อง: Hook ดึงข้อมูลถูกเรียกใช้บน Client

  // 2. Event Handler: จัดการการเปลี่ยนหน้า (Paging)
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setFilter((prev) => ({ ...prev, page: newPage })); // ✅ ถูกต้อง: Update State เพื่อ Trigger การดึงข้อมูลใหม่ (ใน Hook)
    }
  };

  // 3. Event Handler: จัดการการเปลี่ยน Filter (สถานะ)
  const handleStatusChange = (newStatus) => {
    setFilter((prev) => ({ ...prev, status: newStatus, page: 1 })); // ✅ ถูกต้อง: Update State และ Reset page เป็น 1
  };

  // 4. Presentation: ส่ง Props ที่จำเป็นไปยัง UI Component
  // ✅ ถูกต้อง: ส่งมอบข้อมูล (Data, State, Handlers) ที่จำเป็นไปยัง Presentation Component
  return (
    <TransactionList
      transactions={transactions}
      pagination={pagination}
      isLoading={isLoading}
      error={error}
      currentStatus={filter.status}
      onPageChange={handlePageChange}
      onStatusChange={handleStatusChange}
    />
  );
};
