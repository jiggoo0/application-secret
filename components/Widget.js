'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import UserForm from './Chat/UserForm';
import ChatWindow from './Chat/ChatWindow';

export default function Widget() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('chatUser');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.fullName && parsed?.email && parsed?.sessionId) setUser(parsed);
      } catch {
        localStorage.removeItem('chatUser');
      }
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/chat');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setMessages(data.messages || []);
      } catch {
        console.error('โหลดข้อความไม่สำเร็จ');
      }
    };
    fetchMessages();

    const channel = supabase
      .channel('chat_messages_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload) => setMessages((prev) => [...prev, payload.new]),
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const payload = {
      session_id: user.sessionId,
      full_name: user.fullName,
      email: user.email,
      phone: user.phone,
      facebook: user.facebook,
      line_id: user.line,
      message_text: text.trim(),
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let result;
      try {
        result = raw ? JSON.parse(raw) : {};
      } catch {
        result = { error: raw || 'ไม่สามารถอ่านข้อมูลจากเซิร์ฟเวอร์ได้' };
      }

      if (!res.ok || result?.error) {
        console.error('ส่งข้อความไม่สำเร็จ:', result);
        alert(result.error || 'เกิดข้อผิดพลาดในการส่งข้อความ');
        return;
      }

      setText('');
    } catch (err) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อความ:', err);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  const handleUserSubmit = useCallback(async (formData) => {
    const sessionId = crypto.randomUUID();
    const payload = {
      session_id: sessionId,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      facebook: formData.facebook,
      line_id: formData.line,
    };

    try {
      const res = await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let json;
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = { error: text || 'ไม่สามารถอ่านข้อมูลจากเซิร์ฟเวอร์ได้' };
      }

      if (!res.ok || json?.error) {
        console.error('สร้าง session ไม่สำเร็จ:', json);
        alert(json.error || 'ไม่สามารถเริ่มต้น session ได้');
        return;
      }

      const userWithSession = { ...formData, sessionId };
      setUser(userWithSession);
      localStorage.setItem('chatUser', JSON.stringify(userWithSession));
    } catch (e) {
      console.error('เกิดข้อผิดพลาดในการสร้าง session:', e);
      alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900"
          style={{ width: '320px', height: '500px' }}
        >
          {user ? (
            <ChatWindow
              user={user}
              messages={messages}
              text={text}
              setText={setText}
              sendMessage={sendMessage}
            />
          ) : (
            <UserForm onSubmit={handleUserSubmit} />
          )}
        </div>
      )}
      <button
        onClick={() => setIsOpen((p) => !p)}
        aria-label="เปิด/ปิดหน้าต่างแชท"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg transition-all duration-150 hover:bg-blue-700 active:scale-95"
      >
        💬
      </button>
    </div>
  );
}
