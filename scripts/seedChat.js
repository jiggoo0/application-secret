// /scripts/seedChatFull.js
// run: node ./scripts/seedChatFull.js
import fs from 'fs';
import path from 'path';
import fake from '../lib/mock/fakeChat.js';

const NUM_ROOMS = 5; // จำนวนห้องเพิ่ม
const MAX_MEMBERS = 5; // สมาชิกสูงสุดต่อห้อง
const MAX_MESSAGES = 10; // ข้อความสูงสุดต่อห้อง

// สร้างห้องใหม่
for (let i = 0; i < NUM_ROOMS; i++) {
  const room = fake.createRoom({
    name: `Room ${i + 1}`,
    description: `Description for Room ${i + 1}`,
    members: Array.from({ length: Math.floor(Math.random() * MAX_MEMBERS) + 1 }).map((_, j) => ({
      id: `u_${Math.random().toString(36).slice(2, 6)}`,
      name: `User${j + 1}`,
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
    })),
  });

  // สร้าง message ตัวอย่าง
  const members = room.members;
  const numMessages = Math.floor(Math.random() * MAX_MESSAGES) + 1;
  for (let m = 0; m < numMessages; m++) {
    const sender = members[Math.floor(Math.random() * members.length)];
    fake.addMessage(room.id, { text: `Sample message ${m + 1} in ${room.name}`, sender });
  }
}

// เตรียม data export
const data = fake._store.rooms.map((room) => ({
  id: room.id,
  name: room.name,
  description: room.description,
  members: room.members,
  messages: room.messages,
}));

// เขียนเป็น JSON
const outPath = path.join(process.cwd(), 'data', 'chatRooms.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');

console.log(`✅ Generated ${data.length} rooms with messages!`);
console.log(`📂 JSON saved to: ${outPath}`);
