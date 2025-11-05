'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function AdminChatPage() {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const chatEndRef = useRef(null);

  // ✅ โหลดข้อความจาก Supabase + ตั้งค่า realtime
  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel('realtime:chat_messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          if (payload.new) {
            setMessages((prev) => [...prev, payload.new]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadMessages() {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('id', { ascending: true });

    if (error) console.error('โหลดข้อความล้มเหลว:', error);
    else setMessages(data);
  }

  // ✅ ฟังก์ชันตอบกลับลูกค้า
  async function sendReply() {
    if (!reply.trim()) return;

    const { error } = await supabase.from('chat_messages').insert([
      {
        role: 'admin',
        content: reply.trim(),
      },
    ]);

    if (error) {
      console.error('❌ ส่งข้อความล้มเหลว:', error);
      return;
    }

    setReply('');
  }

  // ✅ scroll อัตโนมัติ
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <h1 className="mb-4 text-xl font-semibold text-blue-600 dark:text-blue-400">
          🧑‍💻 แอดมินตอบแชทลูกค้า
        </h1>

        <div className="flex h-[500px] flex-col space-y-2 overflow-y-auto rounded-lg border bg-gray-50 p-3 dark:bg-gray-900">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === 'admin'
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

        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="ตอบกลับลูกค้า..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && sendReply()}
          />
          <button
            onClick={sendReply}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
}
