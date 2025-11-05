'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function Widget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  // ✅ สร้าง session หรือโหลดจาก localStorage
  useEffect(() => {
    const stored = localStorage.getItem('chat_session_id');
    if (stored) {
      setSessionId(stored);
    } else {
      createSession();
    }
  }, []);

  // ✅ สร้าง session ใหม่
  async function createSession() {
    try {
      const user_name = `Guest-${Math.floor(Math.random() * 9999)}`;
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_name }),
      });
      const data = await res.json();
      if (data.session_id) {
        localStorage.setItem('chat_session_id', data.session_id);
        setSessionId(data.session_id);
      }
    } catch (error) {
      console.error('❌ สร้าง session ล้มเหลว:', error);
    }
  }

  // ✅ โหลดข้อความย้อนหลัง
  const loadMessages = useCallback(async () => {
    if (!sessionId) return;
    try {
      const res = await fetch(`/api/chat/message?session_id=${sessionId}`);
      const data = await res.json();
      if (data.messages) setHistory(data.messages);
    } catch (error) {
      console.error('❌ โหลดข้อความล้มเหลว:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    loadMessages();

    const channel = supabase
      .channel('realtime:chat_messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          if (payload.new?.session_id === sessionId) {
            setHistory((prev) => [...prev, payload.new]);
          }
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [sessionId, loadMessages]);

  // ✅ ส่งข้อความ
  async function sendMessage() {
    if (!message.trim() || !sessionId) return;

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, role: 'user', content: message }),
      });
      const data = await res.json();
      if (!data.success) throw data.error;
      setMessage('');
    } catch (error) {
      console.error('❌ ส่งข้อความล้มเหลว:', error);
    }
  }

  // ✅ Scroll อัตโนมัติ
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg hover:bg-blue-700"
      >
        💬 แชท
      </button>

      {open && (
        <div className="mt-3 flex h-[600px] w-96 flex-col rounded-xl border border-gray-200 bg-white shadow-2xl dark:bg-gray-900 dark:text-gray-100">
          <div className="flex items-center justify-between rounded-t-xl border-b bg-blue-600 p-3 text-white">
            <span>ศูนย์แชทลูกค้า</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

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
