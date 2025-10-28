'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();

  useEffect(() => {
    // redirect ไปหน้า chat room แรก (สามารถปรับเป็นห้อง default ของคุณ)
    router.replace('/chat/admin-contact');
  }, [router]);

  return <p>Loading chat...</p>;
}
