'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Mail,
  Facebook,
  MessageSquare,
  X,
  Loader2,
  Terminal,
  Zap,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// URL ข้อมูลช่องทางการติดต่อ
const CONTACT_DATA_URL = '/data/contact.json';

// Mapping ไอคอนให้ดูเป็นหน่วยปฏิบัติการ
const IconMap = {
  line: Zap, // สายฟ้า = ช่องทางที่ไวที่สุด
  email: Mail, // จดหมายลับ
  facebook: Facebook, // เพจหลัก
  messenger: MessageSquare, // ข้อความส่วนตัว
};

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactChannels, setContactChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContactData() {
      try {
        const response = await fetch(CONTACT_DATA_URL);
        if (!response.ok) throw new Error('Failed to fetch contact data');
        const data = await response.json();
        if (data && Array.isArray(data.channels)) {
          setContactChannels(data.channels);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('OFFLINE_ERROR');
      } finally {
        setIsLoading(false);
      }
    }
    fetchContactData();
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* 🧾 Contact Menu: รายการช่องทางสไตล์ Tactical */}
      {isOpen && (
        <Card className="mb-4 w-72 overflow-hidden rounded-none border-4 border-slate-900 bg-white p-0 shadow-neo duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 text-white">
            <h3 className="flex items-center gap-2 font-heading text-sm font-black uppercase italic tracking-widest">
              <Terminal size={16} className="text-primary" />
              Direct_Hotline
            </h3>
          </div>

          <div className="bg-white p-4">
            {isLoading && (
              <div className="flex items-center justify-center py-6 font-bold italic text-slate-900">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                CONNECTING...
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 border-2 border-red-500 p-2 text-xs font-black text-red-600">
                <ShieldAlert size={16} /> {error}
              </div>
            )}

            {!isLoading && !error && (
              <ul className="space-y-3">
                {contactChannels.map((channel) => {
                  const Icon = IconMap[channel.type] || MessageCircle;
                  return (
                    <li key={channel.type}>
                      <a
                        href={channel.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border-2 border-slate-200 bg-white p-3 transition-all hover:border-slate-900 hover:bg-slate-50 active:translate-x-1 active:translate-y-1 active:shadow-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-900 p-1.5 text-white transition-colors group-hover:bg-primary">
                            <Icon size={18} strokeWidth={3} />
                          </div>
                          <span className="font-heading text-xs font-black uppercase tracking-tighter text-slate-900">
                            {channel.label}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] font-bold uppercase text-slate-400 group-hover:text-slate-900">
                          {channel.type === 'line' ? 'Recommended' : 'Link'}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Footer Tag */}
            <p className="mt-4 text-center font-mono text-[8px] font-black uppercase tracking-[0.3em] text-slate-300">
              JP_SYSTEM_SECURE_LINK
            </p>
          </div>
        </Card>
      )}

      {/* 🔘 Main Toggle Button: ปุ่มสัญญาณเจ้าป่า */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-16 w-16 rounded-none border-4 border-slate-900 shadow-neo transition-all duration-300 ${
          isOpen
            ? 'translate-x-1 translate-y-1 bg-slate-900 text-white shadow-none'
            : 'bg-primary text-white hover:-translate-x-1 hover:-translate-y-1 hover:bg-primary/90 active:translate-x-0 active:translate-y-0 active:shadow-none'
        }`}
        aria-label="ติดต่อเจ้าป่า"
      >
        {isOpen ? <X size={32} strokeWidth={4} /> : <MessageCircle size={32} strokeWidth={3} />}
      </Button>
    </div>
  );
}
