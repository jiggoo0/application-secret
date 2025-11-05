'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';

/**
 * 💬 Widget - แชทเรียลไทม์เชื่อม Supabase
 * ----------------------------------------------------
 * ✅ รองรับ realtime insert
 * ✅ ตรวจสอบ error จาก Supabase อย่างละเอียด
 * ✅ ใช้ table: chat_messages (ไม่มีเครื่องหมาย -)
 * ✅ พร้อมใช้งาน production
 */
export default function Widget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);

  // ✅ โหลดข้อความ + เปิด realtime listener
  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel('realtime:chat_messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          if (payload.new) {
            setHistory((prev) => [...prev, payload.new]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✅ โหลดข้อความทั้งหมด
  async function loadMessages() {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ โหลดข้อความล้มเหลว:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return;
    }

    setHistory(data || []);
  }

  // ✅ ส่งข้อความใหม่
  async function sendMessage() {
    if (!message.trim()) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([
          {
            role: 'user',
            content: message.trim(),
          },
        ])
        .select('*');

      if (error) {
        console.error('❌ ส่งข้อความล้มเหลว:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        return;
      }

      setMessage('');
      console.log('✅ ส่งข้อความสำเร็จ:', data);
    } catch (err) {
      console.error('❌ เกิดข้อผิดพลาดขณะส่งข้อความ:', err);
    }
  }

  // ✅ Scroll อัตโนมัติเมื่อมีข้อความใหม่
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* ปุ่มเปิด/ปิด Widget */}
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg transition hover:bg-blue-700"
      >
        💬 แชทกับเรา
      </button>

      {/* กล่องแชท */}
      {open && (
        <div className="mt-3 flex h-[600px] w-96 flex-col rounded-xl border border-gray-200 bg-white shadow-2xl dark:bg-gray-900 dark:text-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-xl border-b bg-blue-600 p-3 text-white">
            <span className="font-semibold">ศูนย์แชทลูกค้า</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* พื้นที่แสดงข้อความ */}
          <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
            {history.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* กล่องพิมพ์ข้อความ */}
          <div className="flex gap-2 border-t p-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="พิมพ์ข้อความ..."
              className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
            >
              ส่ง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
