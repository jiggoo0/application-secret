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
 * @typedef {Object} Document
 * @property {string} id
 * @property {string} name
 * @property {string} uploadedAt
 * @property {'ผ่าน'|'ไม่ผ่าน'|'เอกสารมีปัญหา'|string} status
 */

export default function CompanyAccount() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/CompanyAccount.json');
        if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลได้');
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        console.error('❌ Failed to fetch documents:', err);
        setError(err.message || 'เกิดข้อผิดพลาด');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statusLabel = (status) => {
    switch (status) {
      case 'ผ่าน':
        return 'ตรวจสอบแล้ว';
      case 'ไม่ผ่าน':
        return 'ไม่ผ่าน';
      case 'เอกสารมีปัญหา':
        return 'เอกสารมีปัญหา';
      default:
        return status;
    }
  };

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

  if (loading) return <p>Loading documents...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!documents.length) return <p>ไม่พบเอกสาร</p>;

  return (
    <Table>
      <TableCaption>รายละเอียดผลดำเนินการเอกสารของบริษัท</TableCaption>
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
          <TableRow key={doc.id}>
            <TableCell className="font-medium">{doc.id}</TableCell>
            <TableCell>{doc.name}</TableCell>
            <TableCell>{doc.uploadedAt}</TableCell>
            <TableCell className={`font-semibold ${statusColor(doc.status)}`}>
              {statusLabel(doc.status)}
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
  );
}
