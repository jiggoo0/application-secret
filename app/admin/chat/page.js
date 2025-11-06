'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

/**
 * ✅ หน้า Admin Chat (ดูข้อความลูกค้าทั้งหมดแบบเรียลไทม์)
 * - แสดงรายชื่อผู้ใช้งานที่เคยเริ่มแชท
 * - คลิกเลือกผู้ใช้เพื่อเปิดดูข้อความสนทนาแบบเรียลไทม์
 * - แอดมินสามารถตอบกลับได้ในช่องแชท
 */

export default function AdminChatPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');

  // โหลดรายชื่อผู้ใช้งานที่เคยแชท
  useEffect(() => {
    const loadUsers = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('user_id, user_name, user_email')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const uniqueUsers = Object.values(
          data.reduce((acc, cur) => {
            if (!acc[cur.user_id]) acc[cur.user_id] = cur;
            return acc;
          }, {}),
        );
        setUsers(uniqueUsers);
      }
    };

    loadUsers();
  }, []);

  // โหลดข้อความของผู้ใช้ที่เลือก
  useEffect(() => {
    if (!selectedUser) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', selectedUser.user_id)
        .order('created_at', { ascending: true });
      if (!error && data) setMessages(data);
    };

    loadMessages();

    // ฟังข้อความใหม่แบบเรียลไทม์
    const channel = supabase
      .channel(`admin_chat:${selectedUser.user_id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `user_id=eq.${selectedUser.user_id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUser]);

  // ส่งข้อความตอบกลับลูกค้า
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedUser) return;

    const { error } = await supabase.from('chat_messages').insert({
      user_id: selectedUser.user_id,
      user_name: 'Admin',
      user_email: 'admin@system.local',
      message: reply.trim(),
    });

    if (!error) setReply('');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar — รายชื่อผู้ใช้ */}
      <div className="w-1/3 overflow-y-auto border-r border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="border-b border-gray-200 p-4 text-xl font-semibold dark:border-gray-700">
          รายชื่อผู้ใช้งาน
        </h2>
        {users.map((u) => (
          <button
            key={u.user_id}
            onClick={() => setSelectedUser(u)}
            className={`w-full px-4 py-3 text-left hover:bg-blue-100 dark:hover:bg-gray-800 ${
              selectedUser?.user_id === u.user_id ? 'bg-blue-200 dark:bg-gray-700' : ''
            }`}
          >
            <div className="font-medium">{u.user_name}</div>
            <div className="text-xs text-gray-500">{u.user_email}</div>
          </button>
        ))}
      </div>

      {/* กล่องแชท */}
      <div className="flex flex-1 flex-col bg-white dark:bg-gray-950">
        {selectedUser ? (
          <>
            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
              <h3 className="text-lg font-semibold">
                {selectedUser.user_name} ({selectedUser.user_email})
              </h3>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-900">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.user_name === 'Admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-2 text-sm shadow ${
                      msg.user_name === 'Admin'
                        ? 'rounded-br-none bg-blue-600 text-white'
                        : 'rounded-bl-none bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                    }`}
                  >
                    {msg.message}
                    <div className="mt-1 text-right text-[10px] opacity-70">
                      {new Date(msg.created_at).toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendReply}
              className="flex gap-2 border-t border-gray-200 p-4 dark:border-gray-700"
            >
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="พิมพ์ข้อความตอบกลับ..."
                className="flex-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                ส่ง
              </button>
            </form>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            เลือกผู้ใช้งานเพื่อดูข้อความ
          </div>
        )}
      </div>
    </div>
  );
}
