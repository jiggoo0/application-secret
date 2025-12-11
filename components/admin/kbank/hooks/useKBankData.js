// components/admin/kbank/hooks/useKBankData.js
'use client'; // <--- ✅ ถูกต้อง: ประกาศเป็น Client Logic เนื่องจากใช้ Hooks ภายใน

import { useState, useEffect } from 'react';

// --- Interface Data Structures (Simulated) ---
/*
 * interface Transaction {
 * transactionId: string;
 * amount: number;
 * status: 'SUCCESS' | 'FAILED' | 'PENDING';
 * timestamp: Date;
 * details: string;
 * }
 */

// Function to simulate API fetch delay
const simulateApiCall = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

/**
 * Custom Hook: useFetchReportSummary
 * ดึงข้อมูลสรุป Dashboard
 */
export function useFetchReportSummary() {
  // ✅ ถูกต้อง: ใช้ useState/useEffect จัดการ State และ Side Effects ของการดึงข้อมูลสรุป
  const [summaryData, setSummaryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        // In production, this would call a real API: const response = await api.get('/kbank/summary');
        const mockData = {
          totalTransactions: 1250,
          totalAmount: 987500.55,
          successRate: 98.7,
        };

        const data = await simulateApiCall(mockData);
        setSummaryData(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summaryData, isLoading, error };
}

/**
 * Custom Hook: useFetchTransactions
 * ดึงข้อมูลรายการธุรกรรมพร้อม Pagination
 * @param {object} filter - current filter/pagination state
 */
export function useFetchTransactions(filter) {
  // ✅ ถูกต้อง: ใช้ useState จัดการ Transaction Data, Pagination State
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTxs = async () => {
      setIsLoading(true);
      try {
        // In production, this would use filter params: await api.get('/kbank/transactions', { params: filter });
        const mockTransactions = Array.from({ length: filter.limit }, (_, i) => ({
          transactionId: `TXN-${i + 1 + (filter.page - 1) * filter.limit}`,
          amount: Math.floor(Math.random() * 10000) + 100,
          status: i % 3 === 0 ? 'FAILED' : 'SUCCESS',
          timestamp: new Date(Date.now() - (i + 1) * 3600 * 1000),
          details: `Payment reference ${i + 1 + (filter.page - 1) * filter.limit}`,
        }));

        await simulateApiCall(null, 300); // Simulate API delay

        setTransactions(mockTransactions);
        setPagination({
          page: filter.page,
          limit: filter.limit,
          totalPages: 5, // Simulated total pages
          totalItems: 50, // Simulated total items
        });
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTxs();
  }, [filter.page, filter.limit, filter.status]); // ✅ ถูกต้อง: Dependency Array ควบคุมการ Rerun เมื่อ Filter/Pagination เปลี่ยน

  return { transactions, pagination, isLoading, error };
}
