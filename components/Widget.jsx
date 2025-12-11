// components/Widget.js
'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  LineChart, // ใช้ LineChart แทน Line icon เนื่องจาก Lucide ไม่มี icon Line โดยตรง
  Mail,
  Facebook,
  MessageSquare,
  X,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// URL ของไฟล์ JSON สำหรับช่องทางการติดต่อ
const CONTACT_DATA_URL = '/data/contact.json';

// Mapping ประเภทช่องทางไปยังไอคอนที่เหมาะสม
const IconMap = {
  line: LineChart, // Line Official
  email: Mail, // Email Us
  facebook: Facebook, // Facebook Page Link
  messenger: MessageSquare, // Messenger Chat Link
};

/**
 * 📢 คอมโพเนนต์ Widget แสดงช่องทางการติดต่อ
 * * ดึงข้อมูลช่องทางการติดต่อจาก /public/data/contact.json
 */
export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactChannels, setContactChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContactData() {
      try {
        const response = await fetch(CONTACT_DATA_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch contact data');
        }
        const data = await response.json();
        // ตรวจสอบว่ามีคีย์ 'channels' และเป็น array หรือไม่
        if (data && Array.isArray(data.channels)) {
          setContactChannels(data.channels);
        } else {
          throw new Error('Invalid data structure in contact.json');
        }
      } catch (err) {
        console.error('Error loading contact data:', err);
        setError('ไม่สามารถโหลดข้อมูลช่องทางการติดต่อได้');
      } finally {
        setIsLoading(false);
      }
    }

    fetchContactData();
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ส่วนแสดงรายการช่องทางติดต่อ */}
      {isOpen && (
        <Card className="mb-4 w-64 rounded-xl shadow-2xl dark:bg-gray-800">
          <div className="p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
              ติดต่อเรา
            </h3>
            {isLoading && (
              <div className="flex items-center justify-center py-4 text-sm text-blue-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                กำลังโหลด...
              </div>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            {!isLoading && !error && contactChannels.length > 0 ? (
              <ul className="space-y-2">
                {contactChannels.map((channel) => {
                  const Icon = IconMap[channel.type] || MessageCircle;
                  return (
                    <li key={channel.type}>
                      <a
                        href={channel.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center rounded-lg p-2 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        title={channel.label}
                      >
                        <Icon className="mr-3 h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {channel.label}
                        </span>
                        {channel.id && (
                          <span className="ml-auto text-xs text-gray-400">{channel.id}</span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              !isLoading && <p className="text-sm text-gray-500">ไม่พบช่องทางการติดต่อ</p>
            )}
          </div>
        </Card>
      )}

      {/* ปุ่มเปิด/ปิด Widget */}
      <Button
        onClick={toggleWidget}
        className="h-14 w-14 rounded-full bg-blue-600 p-0 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        aria-label={isOpen ? 'ปิดช่องทางการติดต่อ' : 'เปิดช่องทางการติดต่อ'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
