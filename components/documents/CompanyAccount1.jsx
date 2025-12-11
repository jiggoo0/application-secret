'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/**
 * แสดงบัญชีบริษัทพร้อมสถานะเอกสาร
 */
export default function CompanyAccount() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/CompanyAccount1.json');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้');
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        console.error('❌ Failed to fetch CompanyAccount:', err);
        setError(err.message || 'เกิดข้อผิดพลาด');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case 'ผ่าน':
        return 'text-green-600';
      case 'ไม่ผ่าน':
        return 'text-red-600';
      case 'เอกสารมีปัญหา':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <p className="py-4 text-center text-gray-500 dark:text-gray-400">กำลังโหลดบัญชีบริษัท...</p>
    );
  }

  if (error) {
    return <p className="py-4 text-center text-red-500 dark:text-red-400">❌ {error}</p>;
  }

  if (!documents.length) {
    return <p className="py-4 text-center text-gray-500 dark:text-gray-400">ไม่พบเอกสาร</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
      <Table className="min-w-full">
        <TableCaption className="text-left">รายละเอียดผลดำเนินการเอกสารของบริษัท</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">รหัสเอกสาร</TableHead>
            <TableHead>ชื่อเอกสาร</TableHead>
            <TableHead>วันที่อัปโหลด</TableHead>
            <TableHead>สถานะ</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <TableCell className="font-medium">{doc.id}</TableCell>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.uploadedAt}</TableCell>
              <TableCell className={`font-semibold ${statusColor(doc.status)}`}>
                {doc.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>รวมเอกสารทั้งหมด</TableCell>
            <TableCell>{documents.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
