'use client';

import { useParams } from 'next/navigation';
import ChatRoom from '@/components/ChatRoom/ChatRoom';
import { useSession } from 'next-auth/react';

export default function ChatRoomPage() {
  const { roomId } = useParams();
  const { data: session } = useSession();

  if (!session?.user) {
    return <p>กรุณาล็อกอินเพื่อเข้าใช้งาน</p>;
  }

  return (
    <div className="h-full p-4">
      <ChatRoom user={session.user} roomId={roomId} />
    </div>
  );
}
