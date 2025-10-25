'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner'; // ✅ ใช้ตรงจาก sonner
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function ChatRoom({ roomId, user }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // โหลดข้อความเริ่มต้น
  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('room_id', roomId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error('Failed to load messages:', err);
        toast.error('ไม่สามารถโหลดข้อความได้'); // ✅ ใช้ toast.error()
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [roomId]);

  // Subscription แบบ realtime
  useEffect(() => {
    const subscription = supabase
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

    return () => supabase.removeChannel(subscription);
  }, [roomId]);

  // Scroll ไปยังข้อความล่าสุด
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ส่งข้อความ
  const handleSend = async (text) => {
    if (!text.trim()) return;
    setSending(true);

    try {
      const { error } = await supabase.from('chat_messages').insert([
        {
          room_id: roomId,
          user_name: user.name,
          user_email: user.email,
          text,
        },
      ]);

      if (error) {
        console.error('Send message failed:', JSON.stringify(error));
        toast.error('ส่งข้อความไม่สำเร็จ');
      } else {
        toast.success('ส่งข้อความสำเร็จ');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('เกิดข้อผิดพลาดในการส่งข้อความ');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-[400px] flex-col rounded-xl border bg-white shadow-md transition-colors duration-300 dark:bg-gray-800 sm:h-[500px] md:h-[600px]">
      <ScrollArea className="flex-1 space-y-2 overflow-auto p-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-full rounded-md" />
          ))
        ) : (
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
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="border-t bg-gray-50 p-2 dark:bg-gray-700">
        <ChatInput onSend={handleSend} disabled={sending} />
      </div>
    </div>
  );
}
