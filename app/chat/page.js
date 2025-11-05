'use client';

import React, { useEffect, useState } from 'react';
import { ChatSection } from '@llamaindex/chat-ui';
import { useChat } from '@ai-sdk/react';
import { supabase } from '@/lib/supabase/client';

// ✅ import style ของ LlamaIndex
import '@llamaindex/chat-ui/styles/markdown.css';
import '@llamaindex/chat-ui/styles/pdf.css';
import '@llamaindex/chat-ui/styles/editor.css';

export default function ChatPage() {
  const handler = useChat({
    transport: { api: '/api/chat' }, // จะใช้ API ต่อกับ AI ด้านล่าง
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data) {
        setHistory(data);
      }
    }
    loadHistory();
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-4">
        {history.map((m) => (
          <div key={m.id} className="mb-2">
            <b>{m.role === 'user' ? 'คุณ:' : 'บอท:'}</b> {m.content}
          </div>
        ))}
      </div>

      <ChatSection handler={handler} />
    </div>
  );
}
