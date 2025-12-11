// components/admin/kbank/UI/ReportCard.jsx

// 💡 Color Map: แปลง Semantic Color (Prop) เป็น Tailwind Classes ที่กำหนดไว้ใน Theme/Tokens
const colorMap = {
  // Primary (KBank Green/Blue)
  primary: {
    valueText: 'text-primary',
    border: 'border-primary',
    shadow: 'shadow-primary/20',
  },
  // Secondary (Alternative Accent)
  secondary: {
    valueText: 'text-secondary',
    border: 'border-secondary',
    shadow: 'shadow-secondary/20',
  },
  // Success (Green)
  success: {
    valueText: 'text-success-foreground', // ใช้ Foreground เพื่อให้โดดเด่น
    border: 'border-success',
    shadow: 'shadow-success/20',
  },
  // Warning (Yellow/Orange)
  warning: {
    valueText: 'text-warning-foreground',
    border: 'border-warning',
    shadow: 'shadow-warning/20',
  },
  // Destructive (Red)
  destructive: {
    valueText: 'text-destructive-foreground',
    border: 'border-destructive',
    shadow: 'shadow-destructive/20',
  },
};

/**
 * ReportCard
 * Atomic UI component สำหรับแสดงตัวเลขสรุป
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.value
 * @param {string} props.unit
 * @param {'primary' | 'secondary' | 'success' | 'warning' | 'destructive'} props.color - สีเชิงความหมาย
 */
export default function ReportCard({ title, value, unit, color = 'primary' }) {
  // 1. เลือกคลาสจาก Color Map (Fallback to Primary)
  const styles = colorMap[color] || colorMap.primary;

  return (
    // ใช้ bg-card เป็นพื้นหลัง และ border-l-4 เพื่อเน้นความสำคัญด้วยสีของแบรนด์/สถานะ
    // ✅ Theming: ใช้ bg-card, text-muted-foreground
    <div
      className={`rounded-lg border-l-4 bg-card p-6 shadow-subtle transition-shadow ${styles.border} ${styles.shadow} hover:shadow-lg`}
    >
      {/* ใช้ text-muted-foreground สำหรับข้อความรอง */}
      <p className="text-sm uppercase tracking-wider text-muted-foreground">{title}</p>

      <div className="mt-2 flex items-end justify-between">
        {/* ✅ ใช้คลาสจาก Mapping Object เพื่อแก้ปัญหา Dynamic Class */}
        <p className={`text-4xl font-extrabold ${styles.valueText}`}>{value}</p>
        {/* ใช้ text-muted-foreground สำหรับหน่วย */}
        <p className="mb-1 text-sm text-muted-foreground">{unit}</p>
      </div>
    </div>
  );
}
