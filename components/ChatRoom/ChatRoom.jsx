'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Lock, Loader2, MessageCircleOff } from 'lucide-react';

export default function ChatRoom({ roomId, user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [checkingPassword, setCheckingPassword] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ ปลดล็อกทันทีเมื่อรหัสถูกต้อง
  const handleUnlock = () => {
    setCheckingPassword(true);
    const input = passwordInput.trim();
    const correctPassword = '999000'; // 🔒 รหัสห้องเดียวที่ใช้

    if (input === correctPassword) {
      setUnlocked(true);
    } else {
      toast.error('รหัสไม่ถูกต้อง');
    }

    setCheckingPassword(false);
  };

  // 📥 โหลดข้อความเมื่อปลดล็อกแล้ว
  useEffect(() => {
    if (!unlocked) return;

    const loadMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });

      if (error) {
        toast.error('ไม่สามารถโหลดข้อความได้');
      } else {
        setMessages(data || []);
      }
      setLoading(false);
    };

    loadMessages();
  }, [roomId, unlocked]);

  // 🔄 Subscribe realtime
  useEffect(() => {
    if (!unlocked) return;

    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new].slice(-50));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, unlocked]);

  // ⬇️ Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ✉️ ส่งข้อความ
  const handleSend = async (text) => {
    if (!text.trim()) return;
    if (!user?.name || !user?.email) {
      toast.error('ไม่พบข้อมูลผู้ใช้');
      return;
    }

    setSending(true);
    const { error } = await supabase.from('chat_messages').insert([
      {
        room_id: roomId,
        user_name: user.name,
        user_email: user.email,
        text,
      },
    ]);

    if (error) {
      toast.error('ส่งข้อความไม่สำเร็จ');
    }
    setSending(false);
  };

  // 🔒 UI ป้อนรหัส
  if (!unlocked) {
    return (
      <div className="mx-auto mt-10 max-w-md rounded-xl border bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-center gap-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
          <Lock className="h-5 w-5" />
          <span>ห้องนี้ถูกล็อก</span>
        </div>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full rounded border p-2"
          placeholder="กรอกรหัสเพื่อเข้าห้อง"
        />
        <button
          onClick={handleUnlock}
          disabled={checkingPassword}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          {checkingPassword ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>กำลังตรวจสอบ...</span>
            </>
          ) : (
            <span>ปลดล็อก</span>
          )}
        </button>
      </div>
    );
  }

  // 💬 UI แชท
  return (
    <div className="flex h-[500px] flex-col rounded-xl border bg-white shadow-md dark:bg-gray-800">
      <ScrollArea className="flex-1 space-y-2 overflow-auto p-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-full rounded-md" />
          ))
        ) : messages.length ? (
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ChatMessage message={msg} currentUser={user} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-6 text-gray-400 dark:text-gray-500">
            <MessageCircleOff className="h-6 w-6" />
            <p>ยังไม่มีข้อความในห้องนี้</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="border-t bg-gray-50 p-2 dark:bg-gray-700">
        <ChatInput onSend={handleSend} disabled={sending} />
      </div>
    </div>
  );
}
