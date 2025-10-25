// lib/services/mock/MockKbank.js

let mockTransactions = [
  {
    id: crypto.randomUUID(),
    date: '2025-10-22T10:00:00Z',
    description: 'โอนเงินเข้าบัญชี',
    amount: 1200,
    type: 'credit',
  },
  {
    id: crypto.randomUUID(),
    date: '2025-10-21T14:30:00Z',
    description: 'ชำระบิลค่าน้ำ',
    amount: -450,
    type: 'debit',
  },
  {
    id: crypto.randomUUID(),
    date: '2025-10-20T08:00:00Z',
    description: 'รับเงินเดือน',
    amount: 15000,
    type: 'credit',
  },
];

let mockBalance = 25750;

export async function getTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockTransactions].sort((a, b) => b.id.localeCompare(a.id)));
    }, 300);
  });
}

export async function getBalance() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBalance), 200);
  });
}

export async function addTransaction({ description, amount, type }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount <= 0) return reject(new Error('จำนวนเงินต้องมากกว่า 0'));
      if (type === 'debit' && amount > mockBalance) return reject(new Error('ยอดเงินไม่เพียงพอ'));

      const newTx = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        description,
        amount: type === 'debit' ? -amount : amount,
        type,
      };

      mockTransactions = [newTx, ...mockTransactions];
      mockBalance += type === 'debit' ? -amount : amount;

      resolve({ newTx, newBalance: mockBalance });
    }, 500);
  });
}
