'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function Widget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  // ✅ โหลด session_id จาก localStorage หรือสร้างใหม่
  useEffect(() => {
    const storedSession = localStorage.getItem('chat_session_id');
    if (storedSession) {
      setSessionId(storedSession);
      loadMessages(storedSession);
      subscribeMessages(storedSession);
    } else {
      createSession();
    }
  }, []);

  // สร้าง session ใหม่
  async function createSession() {
    const res = await fetch('/api/chat/session', { method: 'POST' });
    const data = await res.json();
    if (data.session_id) {
      localStorage.setItem('chat_session_id', data.session_id);
      setSessionId(data.session_id);
      loadMessages(data.session_id);
      subscribeMessages(data.session_id);
    }
  }

  // โหลดข้อความทั้งหมด
  async function loadMessages(session_id) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', session_id)
      .order('created_at', { ascending: true });

    if (!error && data) setHistory(data);
  }

  // ตั้งค่า Realtime listener
  function subscribeMessages(session_id) {
    const channel = supabase
      .channel(`realtime:chat_messages:${session_id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${session_id}`,
        },
        (payload) => {
          if (payload.new) setHistory((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }

  // ส่งข้อความ
  async function sendMessage() {
    if (!message.trim() || !sessionId) return;

    const res = await fetch('/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, role: 'user', content: message }),
    });

    const data = await res.json();
    if (data.success) setMessage('');
    else console.error('❌ ส่งข้อความล้มเหลว:', data.error);
  }

  // Scroll ลงอัตโนมัติ
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg transition hover:bg-blue-700"
      >
        💬 แชท
      </button>

      {open && (
        <div className="mt-3 flex h-[600px] w-96 flex-col rounded-xl border bg-white shadow-2xl dark:bg-gray-900 dark:text-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b bg-blue-600 p-3 text-white">
            <span>แชทกับเรา</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* ข้อความ */}
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

          {/* พิมพ์ข้อความ */}
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
