import { createServer } from 'http';
import { Server } from 'socket.io';
import fakeChat from '@/lib/mock/fakeChat.js';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' }, // production: ระบุ origin ที่เชื่อถือได้
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);

  // Join room
  socket.on('join-room', (roomId) => {
    if (!roomId) return;
    socket.join(roomId);
    console.log(`Client ${socket.id} joined room ${roomId}`);
  });

  // Send message to room
  socket.on('send-message', (payload) => {
    const { roomId, text, sender } = payload || {};

    if (!roomId || !text?.trim() || !sender?.id || !sender?.name) {
      console.warn('⚠️ Invalid send-message payload:', payload);
      return;
    }

    const message = fakeChat.addMessage(roomId, { text, sender });
    if (!message) return;

    message.roomId = roomId;
    io.to(roomId).emit('new-message', message); // broadcast to all in room
    console.log(`📨 Message sent to room ${roomId}:`, message.text);
  });

  socket.on('disconnect', (reason) => {
    console.log(`❌ Client disconnected: ${socket.id} (${reason})`);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Socket.IO server running on port ${PORT}`);
});
