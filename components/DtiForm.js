'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { AlertCircle, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateDTIWithThresholds, suggestIncomeOrDebtAdjustment } from '@/lib/dti';

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

  const parseNumber = (v) => {
    if (!v) return 0;
    const n = Number(String(v).replace(/[, ]+/g, ''));
    return Number.isFinite(n) ? n : 0;
  };

  const validateInputs = () => {
    if (!income || parseNumber(income) <= 0) {
      return 'กรุณากรอก รายได้รวมต่อเดือน (ต้องมากกว่า 0)';
    }
    return null;
  };

  const handleCalculate = async () => {
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

      const res = calculateDTIWithThresholds(parsedIncome, debtValues, {
        minIncome: 5000,
        maxDTI: 50,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      setResult(res);

      if (res.risk === 'overlimit') {
        const adj = suggestIncomeOrDebtAdjustment(parsedIncome, debtValues, {
          maxDTI: res.thresholds?.maxDTI ?? 50,
        });
        setAdjustment(adj);
      }

      if (saveEnabled) {
        setLoading(true);
        try {
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
        } catch {
          // non-fatal
        } finally {
          setLoading(false);
        }
      }
    } catch (e) {
      setError(e?.message || 'เกิดข้อผิดพลาดในการคำนวณ');
    }
  };

  const handleReset = () => {
    setIncome('');
    setDebts({ house: '', car: '', credit: '', personal: '' });
    setDependents('');
    setContributors('');
    setResult(null);
    setAdjustment(null);
    setError('');
  };

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
        <label htmlFor="income" className="mb-1 block font-medium">
          รายได้รวมต่อเดือน (บาท)
        </label>
        <input
          id="income"
          name="income"
          inputMode="numeric"
          pattern="[0-9,]*"
          className="input-bordered input w-full"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
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
        <legend className="mb-2 font-semibold">ประเภทของหนี้ (จำนวนชำระ/เดือน)</legend>
        {[
          { key: 'house', label: 'หนี้บ้าน' },
          { key: 'car', label: 'หนี้รถ' },
          { key: 'credit', label: 'หนี้บัตรเครดิต' },
          { key: 'personal', label: 'หนี้สินเชื่อส่วนบุคคล' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label htmlFor={`debt-${key}`} className="mb-1 block text-sm font-medium">
              {label}
            </label>
            <input
              id={`debt-${key}`}
              name={key}
              inputMode="numeric"
              pattern="[0-9,]*"
              className="input-bordered input w-full"
              value={debts[key]}
              onChange={(e) => setDebts((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder="เช่น 3,500"
              aria-label={label}
            />
          </div>
        ))}
      </fieldset>

      {/* จำนวนสมาชิกครอบครัว */}
      <fieldset className="space-y-4">
        <legend className="mb-2 font-semibold">จำนวนสมาชิกในครอบครัว</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dependents" className="mb-1 block text-sm font-medium">
              ผู้พึ่งพิง (เช่น บุตร, ผู้สูงอายุ)
            </label>
            <input
              id="dependents"
              name="dependents"
              type="number"
              min={0}
              className="input-bordered input w-full"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
              placeholder="เช่น 2"
            />
          </div>
          <div>
            <label htmlFor="contributors" className="mb-1 block text-sm font-medium">
              ผู้หารายได้ร่วม
            </label>
            <input
              id="contributors"
              name="contributors"
              type="number"
              min={0}
              className="input-bordered input w-full"
              value={contributors}
              onChange={(e) => setContributors(e.target.value)}
              placeholder="เช่น 1"
            />
          </div>
        </div>
      </fieldset>

      {/* ปุ่ม */}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button type="submit" className="btn-primary btn" disabled={loading} aria-label="คำนวณ DTI">
          {loading ? 'กำลังบันทึก...' : 'คำนวณ'}
        </button>

        <button type="button" className="btn" onClick={handleReset} aria-label="รีเซ็ตข้อมูล">
          รีเซ็ต
        </button>
      </div>

      {/* แจ้งเตือน error */}
      {error && (
        <div
          role="alert"
          className="bg-destructive/10 mt-4 flex items-start gap-2 rounded-md border-l-4 border-destructive p-3 text-sm text-destructive"
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
            result.dti <= 35
              ? 'bg-success/10 border-success text-success'
              : result.dti <= 50
                ? 'bg-warning/10 border-warning text-warning'
                : 'bg-destructive/10 border-destructive text-destructive',
          )}
        >
          <div className="text-lg font-semibold">DTI: {result.dti}%</div>
          <div>รวมภาระหนี้ต่อเดือน: {result.totalDebt.toLocaleString()} บาท</div>

          <div className="mt-2 font-medium">
            {result.risk === 'safe'
              ? 'ระดับปลอดภัย'
              : result.risk === 'caution'
                ? 'ต้องระวัง'
                : 'เสี่ยงสูง'}
          </div>

          {result.warning && (
            <div className="mt-2 flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{result.warning}</span>
            </div>
          )}

          <div className="mt-2 text-sm text-muted-foreground">
            หนี้ที่ควรไม่เกิน: {result.maxAcceptableDebt.toLocaleString()} บาท (ตามเกณฑ์ DTI{' '}
            {result.thresholds?.maxDTI ?? 50}%)
          </div>

          {adjustment && (
            <div className="mt-4 text-sm text-destructive">
              <div className="flex items-center gap-2 font-medium">
                <Lightbulb className="h-4 w-4" />
                <span>เพื่อให้ DTI อยู่ในเกณฑ์:</span>
              </div>
              <ul className="ml-6 mt-2 list-disc space-y-1">
                {adjustment.needMoreIncome > 0 && (
                  <li className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span>
                      ควรเพิ่มรายได้อย่างน้อย {adjustment.needMoreIncome.toLocaleString()}{' '}
                      บาทต่อเดือน
                    </span>
                  </li>
                )}
                {adjustment.needLessDebt > 0 && (
                  <li className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-warning" />
                    <span>
                      หรือควรลดภาระหนี้ลงอย่างน้อย {adjustment.needLessDebt.toLocaleString()}{' '}
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
