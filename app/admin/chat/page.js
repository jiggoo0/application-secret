'use client';

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Loader2, MessageSquare } from 'lucide-react';

export default function AdminChatPage() {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  // โหลด session list
  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setSessions(data);
  }

  // เลือก session
  async function selectSession(session) {
    setSelectedSession(session);
    await loadMessages(session.id);
    subscribeMessages(session.id);
  }

  // โหลดข้อความ session ที่เลือก
  async function loadMessages(session_id) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', session_id)
      .order('created_at', { ascending: true });
    if (!error && data) setMessages(data);
  }

  // Realtime listener
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
          if (payload.new) setMessages((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }

  // ส่งข้อความ admin
  async function sendMessage() {
    if (!message.trim() || !selectedSession) return;
    const res = await fetch('/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: selectedSession.id,
        role: 'admin',
        content: message.trim(),
      }),
    });
    const data = await res.json();
    if (data.success) setMessage('');
    else console.error('❌ ส่งข้อความล้มเหลว:', data.error);
  }

  // Scroll ลงล่าง
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar: Session List */}
      <div className="w-80 overflow-y-auto border-r border-gray-200 dark:border-gray-800">
        <h2 className="flex items-center gap-2 p-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
          <MessageSquare className="h-5 w-5" /> ห้องแชททั้งหมด
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => selectSession(s)}
              className={`w-full p-3 text-left transition hover:bg-gray-100 dark:hover:bg-gray-800 ${
                selectedSession?.id === s.id ? 'bg-blue-100 dark:bg-blue-900' : ''
              }`}
            >
              {s.user_name || 'ผู้ใช้ไม่ระบุ'} <br />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(s.created_at).toLocaleString('th-TH')}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex flex-1 flex-col">
        {selectedSession ? (
          <>
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-3 py-2 ${
                      msg.role === 'user'
                        ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 border-t border-gray-300 p-3 dark:border-gray-700">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="พิมพ์ข้อความตอบกลับ..."
                className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                onClick={sendMessage}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                ส่ง
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" /> เลือกห้องแชทเพื่อดูข้อความ
          </div>
        )}
      </div>
    </div>
  );
}
