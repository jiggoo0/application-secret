'use client';

import { useState, useCallback } from 'react';
import clsx from 'clsx';
import { AlertCircle, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateDTIWithThresholds, suggestIncomeOrDebtAdjustment } from '@/lib/dti';

// Helper: แปลงค่า input string เป็นตัวเลข (รับมือกับคอมมา)
const parseNumber = (v) => {
  if (!v) return 0;
  // ลบ comma และ space ออก
  const n = Number(String(v).replace(/[, ]+/g, ''));
  return Number.isFinite(n) ? n : 0;
};

// Helper: จัดรูปแบบตัวเลขให้มี comma สำหรับแสดงผลใน input
const formatForInput = (v) => {
  const num = parseNumber(v);
  // หากค่าเป็น 0 หรือว่าง ให้คืนค่าว่างเพื่อไม่ให้ input แสดง "0"
  if (num === 0) return '';

  // ใช้ toLocaleString เพื่อเพิ่ม comma
  // เนื่องจากเราไม่ต้องการให้มีการพิมพ์ comma อัตโนมัติขณะพิมพ์ (ซึ่งทำให้ cursor กระโดด)
  // เราจึงใช้ค่าที่ไม่ได้จัดรูปแบบใน state และจัดรูปแบบเพื่อแสดงผล (หากต้องการ)
  // แต่สำหรับโค้ดนี้ เราจะใช้ค่า raw ใน state เพื่อความเรียบง่ายและอนุญาตให้ผู้ใช้พิมพ์ comma ได้เอง
  return String(v);
};

export default function DtiForm({ saveEnabled = false }) {
  const [income, setIncome] = useState('');
  const [debts, setDebts] = useState({
    house: '',
    car: '',
    credit: '',
    personal: '',
  });
  const [dependents, setDependents] = useState('');
  const [contributors, setContributors] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [adjustment, setAdjustment] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handler สำหรับ Input ที่ต้องการให้รับค่าตัวเลขและคอมมาเท่านั้น
  const handleNumericInputChange = useCallback(
    (setter, isDebt = false, debtKey = null) =>
      (e) => {
        const rawValue = e.target.value;
        // อนุญาตให้มีตัวเลข, คอมมา, และจุดทศนิยม
        // เนื่องจากสินเชื่อส่วนใหญ่ใช้ตัวเลขเต็ม เราจึงอนุญาตแค่ตัวเลขและคอมมา
        const sanitizedValue = rawValue.replace(/[^\d,]/g, '');

        if (isDebt && debtKey) {
          setter((prev) => ({ ...prev, [debtKey]: sanitizedValue }));
        } else {
          setter(sanitizedValue);
        }
      },
    [],
  );

  const validateInputs = useCallback(() => {
    if (!income || parseNumber(income) <= 0) {
      return 'กรุณากรอก รายได้รวมต่อเดือน (ต้องมากกว่า 0)';
    }
    return null;
  }, [income]);

  const handleCalculate = useCallback(async () => {
    setError('');
    setResult(null);
    setAdjustment(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const debtValues = Object.values(debts).map(parseNumber);
      const parsedIncome = parseNumber(income);

      // 1. คำนวณ DTI
      const res = calculateDTIWithThresholds(parsedIncome, debtValues, {
        minIncome: 5000,
        maxDTI: 50,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      setResult(res);

      // 2. คำนวณคำแนะนำ
      if (res.risk === 'overlimit' || res.risk === 'caution') {
        const adj = suggestIncomeOrDebtAdjustment(parsedIncome, debtValues, {
          maxDTI: res.thresholds?.maxDTI ?? 50,
        });
        setAdjustment(adj);
      } else {
        setAdjustment(null);
      }

      // 3. บันทึกข้อมูล (ถ้าเปิดใช้งาน)
      if (saveEnabled) {
        setLoading(true);
        try {
          // 💡 Note: ในโลกจริง ควรใช้ Server Action หรือ Fetcher ที่ปลอดภัยกว่า
          await fetch('/api/dti/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              income: parsedIncome,
              debts: debtValues,
              dependents: Number(dependents || 0),
              contributors: Number(contributors || 0),
              consentSave: true,
            }),
          });
        } catch (saveError) {
          // การบันทึกข้อมูลล้มเหลว (เป็น Non-fatal error)
          console.error('Failed to save DTI evaluation:', saveError);
        } finally {
          setLoading(false);
        }
      }
    } catch (e) {
      setError(e?.message || 'เกิดข้อผิดพลาดในการคำนวณ');
    }
  }, [income, debts, dependents, contributors, validateInputs, saveEnabled]);

  const handleReset = useCallback(() => {
    setIncome('');
    setDebts({ house: '', car: '', credit: '', personal: '' });
    setDependents('');
    setContributors('');
    setResult(null);
    setAdjustment(null);
    setError('');
  }, []);

  // Helper: สำหรับการแสดงผลตัวเลขที่มี comma ในส่วน Result
  const formatResultNumber = (num) => num.toLocaleString('th-TH');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCalculate();
      }}
      className="space-y-6"
      aria-labelledby="dti-form-title"
    >
      <h3 id="dti-form-title" className="sr-only">
        แบบฟอร์มประเมิน DTI
      </h3>

      {/* รายได้รวม */}
      <fieldset>
        <label htmlFor="income" className="mb-1 block font-medium text-foreground">
          รายได้รวมต่อเดือน (บาท)
        </label>
        <input
          id="income"
          name="income"
          inputMode="numeric"
          pattern="[0-9,]*"
          // ใช้ formatForInput เพื่อแสดงค่าใน input (อนุญาตให้พิมพ์ comma)
          className="input-bordered input w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
          value={formatForInput(income)}
          onChange={handleNumericInputChange(setIncome)}
          placeholder="เช่น 25,000"
          aria-describedby="income-help"
          required
        />
        <div id="income-help" className="mt-1 text-xs text-muted-foreground">
          ใส่เฉพาะตัวเลข สามารถใส่ comma เพื่ออ่านง่าย
        </div>
      </fieldset>

      {/* หนี้สิน */}
      <fieldset className="space-y-4">
        <legend className="mb-2 font-semibold text-foreground">
          ประเภทของหนี้ (จำนวนชำระ/เดือน)
        </legend>
        {[
          { key: 'house', label: 'หนี้บ้าน' },
          { key: 'car', label: 'หนี้รถ' },
          { key: 'credit', label: 'หนี้บัตรเครดิต' },
          { key: 'personal', label: 'หนี้สินเชื่อส่วนบุคคล' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label
              htmlFor={`debt-${key}`}
              className="mb-1 block text-sm font-medium text-foreground"
            >
              {label}
            </label>
            <input
              id={`debt-${key}`}
              name={key}
              inputMode="numeric"
              pattern="[0-9,]*"
              className="input-bordered input w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
              value={formatForInput(debts[key])}
              onChange={handleNumericInputChange(setDebts, true, key)}
              placeholder="เช่น 3,500"
              aria-label={label}
            />
          </div>
        ))}
      </fieldset>

      {/* จำนวนสมาชิกครอบครัว */}
      <fieldset className="space-y-4">
        <legend className="mb-2 font-semibold text-foreground">จำนวนสมาชิกในครอบครัว</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dependents" className="mb-1 block text-sm font-medium text-foreground">
              ผู้พึ่งพิง (เช่น บุตร, ผู้สูงอายุ)
            </label>
            <input
              id="dependents"
              name="dependents"
              type="number"
              min={0}
              className="input-bordered input w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
              placeholder="เช่น 2"
            />
          </div>
          <div>
            <label
              htmlFor="contributors"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              ผู้หารายได้ร่วม
            </label>
            <input
              id="contributors"
              name="contributors"
              type="number"
              min={0}
              className="input-bordered input w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
              value={contributors}
              onChange={(e) => setContributors(e.target.value)}
              placeholder="เช่น 1"
            />
          </div>
        </div>
      </fieldset>

      {/* ปุ่ม */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          type="submit"
          className="btn-primary btn rounded-md bg-primary px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={loading}
          aria-label="คำนวณ DTI"
        >
          {loading ? 'กำลังบันทึก...' : 'คำนวณ'}
        </button>

        <button
          type="button"
          className="btn rounded-md border border-input bg-background px-6 py-3 font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
          onClick={handleReset}
          aria-label="รีเซ็ตข้อมูล"
        >
          รีเซ็ต
        </button>
      </div>

      {/* แจ้งเตือน error */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-md border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ✅ ผลลัพธ์ DTI */}
      {result && (
        <div
          aria-live="polite"
          className={clsx(
            'mt-6 rounded-md border p-4 transition-all',
            // กำหนดสีตามผลลัพธ์ DTI
            result.dti <= 35
              ? 'border-green-500 bg-green-50 text-green-700' // Safe
              : result.dti <= 50
                ? 'border-yellow-500 bg-yellow-50 text-yellow-700' // Caution
                : 'border-red-500 bg-red-50 text-red-700', // High Risk
          )}
        >
          <div className="text-lg font-semibold">DTI: {formatResultNumber(result.dti)}%</div>
          <div>รวมภาระหนี้ต่อเดือน: {formatResultNumber(result.totalDebt)} บาท</div>

          <div className="mt-2 font-medium">
            {result.risk === 'safe'
              ? '✅ ระดับปลอดภัย'
              : result.risk === 'caution'
                ? '⚠️ ต้องระวัง'
                : '🛑 เสี่ยงสูง'}
          </div>

          <div className="mt-2 text-sm text-muted-foreground">
            หนี้ที่ควรไม่เกิน: {formatResultNumber(result.maxAcceptableDebt)} บาท (ตามเกณฑ์ DTI{' '}
            {result.thresholds?.maxDTI ?? 50}%)
          </div>

          {result.warning && (
            <div className="mt-2 flex items-center gap-2 text-sm font-medium text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span>{result.warning}</span>
            </div>
          )}

          {adjustment && (
            <div className="border-current/20 mt-4 border-t pt-3">
              <div className="flex items-center gap-2 font-medium text-foreground/80">
                <Lightbulb className="h-4 w-4" />
                <span>คำแนะนำเพื่อปรับให้อยู่ในเกณฑ์ปลอดภัย:</span>
              </div>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                {adjustment.needMoreIncome > 0 && (
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-foreground">
                      ควรเพิ่มรายได้อย่างน้อย {formatResultNumber(adjustment.needMoreIncome)}{' '}
                      บาทต่อเดือน
                    </span>
                  </li>
                )}
                {adjustment.needLessDebt > 0 && (
                  <li className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-foreground">
                      หรือควรลดภาระหนี้ลงอย่างน้อย {formatResultNumber(adjustment.needLessDebt)}{' '}
                      บาทต่อเดือน
                    </span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
