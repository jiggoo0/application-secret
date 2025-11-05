'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function ChatAdmin() {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [loadingSessions, setLoadingSessions] = useState(false);

  // ✅ โหลด list ของ chat sessions
  const loadSessions = useCallback(async () => {
    setLoadingSessions(true);
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setSessions(data || []);
    } finally {
      setLoadingSessions(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();

    const channel = supabase
      .channel('realtime:chat_sessions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_sessions' },
        () => {
          loadSessions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadSessions]);

  // ✅ โหลดข้อความของ session ที่เลือก
  const loadMessages = useCallback(async () => {
    if (!activeSession) return;
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', activeSession.id)
      .order('created_at', { ascending: true });
    if (!error) setMessages(data || []);
  }, [activeSession]);

  useEffect(() => {
    if (!activeSession) return;

    loadMessages();

    const channel = supabase
      .channel(`realtime:chat_messages:${activeSession.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${activeSession.id}`,
        },
        (payload) => {
          if (payload.new) setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [activeSession, loadMessages]);

  // ✅ ส่งข้อความ
  const sendMessage = async () => {
    if (!newMessage.trim() || !activeSession) return;

    await supabase
      .from('chat_messages')
      .insert([{ session_id: activeSession.id, role: 'admin', content: newMessage }]);

    setNewMessage('');
    loadMessages();
  };

  // ✅ scroll อัตโนมัติ
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-100px)] gap-4 p-4">
      {/* Sidebar: List of sessions */}
      <Card className="w-80 flex-shrink-0 overflow-auto">
        <h2 className="mb-2 font-semibold">Chat Sessions</h2>
        {loadingSessions && (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" />
            กำลังโหลด...
          </div>
        )}
        {sessions.length === 0 && !loadingSessions && <p>ไม่มี session</p>}
        <ul>
          {sessions.map((s) => (
            <li
              key={s.id}
              className={`cursor-pointer rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                activeSession?.id === s.id ? 'bg-blue-100 dark:bg-blue-800' : ''
              }`}
              onClick={() => setActiveSession(s)}
            >
              {s.user_name || 'Guest'} {s.phone ? `(${s.phone})` : ''}
            </li>
          ))}
        </ul>
      </Card>

      {/* Main Chat */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        {!activeSession ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            เลือก session เพื่อดูข้อความ
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-1 ${msg.role === 'user' ? 'text-left' : 'text-right'}`}
                >
                  <span
                    className={`inline-block rounded px-2 py-1 ${
                      msg.role === 'user'
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2 border-t p-2">
              <input
                type="text"
                placeholder="พิมพ์ข้อความ..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 rounded border px-2 py-1"
              />
              <button
                onClick={sendMessage}
                className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
              >
                ส่ง
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}