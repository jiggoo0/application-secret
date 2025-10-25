'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, Toaster } from 'sonner';
import { getTransactions, getBalance, addTransaction } from '@/lib/services/mock/MockKbank';
import { motion } from 'framer-motion';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  HomeIcon,
  CreditCardIcon,
  BarChart2Icon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { KBankTheme } from '@/config/themeKbank';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const transactionSchema = z.object({
  description: z.string().min(1, 'กรุณากรอกรายละเอียด'),
  amount: z.number().positive('จำนวนเงินต้องมากกว่า 0'),
  type: z.enum(['debit', 'credit']),
});

export default function KbankLive() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: { description: '', amount: 0, type: 'debit' },
  });

  const type = watch('type');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [txs, bal] = await Promise.all([getTransactions(), getBalance()]);
        setTransactions(txs || []);
        setBalance(bal || 0);
      } catch (err) {
        console.error(err);
        toast.error('ไม่สามารถโหลดข้อมูลได้');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const { newTx, newBalance } = await addTransaction(data);
      setTransactions((prev) => [newTx, ...prev]);
      setBalance(newBalance);
      reset({ description: '', amount: 0, type: data.type });
      toast.success('ทำรายการสำเร็จ');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'เกิดข้อผิดพลาด');
    } finally {
      setSubmitting(false);
    }
  };

  const bottomNav = [
    { tab: 'home', Icon: HomeIcon, label: 'Home' },
    { tab: 'transactions', Icon: CreditCardIcon, label: 'Transactions' },
    { tab: 'analytics', Icon: BarChart2Icon, label: 'Analytics' },
    { tab: 'more', Icon: MoreHorizontalIcon, label: 'More' },
  ];

  return (
    <div
      className="mx-auto flex min-h-screen w-full max-w-md flex-col p-4"
      style={{
        backgroundColor: KBankTheme.colors.background,
        fontFamily: KBankTheme.font.sans.join(','),
      }}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold" style={{ color: KBankTheme.colors.primary }}>
          KBank
        </h1>
        <div className="h-8 w-8 rounded-full bg-gray-300" />
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 p-6 text-center"
        style={{
          backgroundColor: KBankTheme.colors.primaryLight,
          borderRadius: KBankTheme.borderRadius.card,
          boxShadow: KBankTheme.shadow.card,
        }}
      >
        <p className="text-sm" style={{ color: KBankTheme.colors.textSecondary }}>
          ยอดเงินคงเหลือ
        </p>
        <p className="text-3xl font-extrabold" style={{ color: KBankTheme.colors.textPrimary }}>
          ฿ {balance.toLocaleString()}
        </p>
        <p className="mt-1 text-xs" style={{ color: KBankTheme.colors.textSecondary }}>
          อัปเดตล่าสุด: {new Date().toLocaleTimeString()}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <div className="mb-4 flex justify-between gap-2">
        <Button
          variant={type === 'debit' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => setValue('type', 'debit')}
        >
          <ArrowUpIcon className="h-5 w-5" /> โอนเงิน
        </Button>
        <Button
          variant={type === 'credit' ? 'default' : 'outline'}
          className="flex-1"
          onClick={() => setValue('type', 'credit')}
        >
          <ArrowDownIcon className="h-5 w-5" /> เติมเงิน
        </Button>
      </div>

      {/* Transaction Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 flex flex-col gap-2 p-4"
        style={{
          borderRadius: KBankTheme.borderRadius.card,
          backgroundColor: KBankTheme.colors.cardBg,
          boxShadow: KBankTheme.shadow.card,
        }}
      >
        <Input placeholder="รายละเอียด" {...register('description')} variant="outline" />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

        <Input
          type="number"
          placeholder="จำนวนเงิน"
          {...register('amount', { valueAsNumber: true })}
          variant="outline"
        />
        {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}

        <Button type="submit" isLoading={submitting} className="mt-2">
          ทำรายการ
        </Button>
      </form>

      {/* Transaction List */}
      <h2 className="mb-2 font-semibold">รายการล่าสุด</h2>
      {loading ? (
        <p className="py-4 text-center">กำลังโหลด...</p>
      ) : transactions.length === 0 ? (
        <p className="py-4 text-center">ยังไม่มีรายการ</p>
      ) : (
        <div
          className="mb-16 h-64 overflow-y-auto"
          style={{
            borderRadius: KBankTheme.borderRadius.card,
            backgroundColor: KBankTheme.colors.cardBg,
            boxShadow: KBankTheme.shadow.card,
          }}
        >
          <ul>
            {transactions.map((tx, index) => (
              <motion.li
                key={tx.id ?? index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm">{tx.date ? new Date(tx.date).toLocaleString() : '-'}</p>
                </div>
                <p
                  className="flex items-center gap-1 font-semibold"
                  style={{
                    color:
                      tx.type === 'credit' ? KBankTheme.colors.credit : KBankTheme.colors.debit,
                  }}
                >
                  {tx.type === 'credit' ? (
                    <ArrowDownIcon className="h-4 w-4" />
                  ) : (
                    <ArrowUpIcon className="h-4 w-4" />
                  )}
                  {tx.type === 'credit' ? '+' : '-'}฿ {Math.abs(tx.amount).toLocaleString()}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 flex w-full justify-around py-2"
        style={{ backgroundColor: KBankTheme.colors.cardBg, borderTop: '1px solid #E5E7EB' }}
      >
        {bottomNav.map(({ tab, Icon, label }) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex flex-col items-center text-sm"
            style={{ color: activeTab === tab ? KBankTheme.colors.primary : '#9CA3AF' }}
          >
            <Icon className="h-6 w-6" /> {label}
          </button>
        ))}
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}
