import { createServer } from 'http';
import { Server } from 'socket.io';
import fake from '@/lib/mock/fakeChat.js';

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('✅ Client connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Client ${socket.id} joined room ${roomId}`);
  });

  socket.on('send-message', ({ roomId, text, sender }) => {
    const message = fake.addMessage(roomId, { text, sender });
    if (!message) return;
    message.roomId = roomId;
    io.to(roomId).emit('new-message', message);
  });

  socket.on('disconnect', () => console.log('❌ Client disconnected:', socket.id));
});

const PORT = 3001;
httpServer.listen(PORT, () => console.log(`Socket.IO server running on port ${PORT}`));
