// components/utils/ChunkErrorBoundary.jsx
'use client';

import React, { Component } from 'react';

/**
 * @description React Error Boundary สำหรับดักจับข้อผิดพลาดระหว่างการ Render และ Dynamic Import
 */
// 1. ลบ Generic Type (<Readonly<Props>, State>) ออก
export default class ChunkErrorBoundary extends Component {
  // 2. ลบ Type Annotation ใน Props/Constructor ออก
  constructor(props) {
    super(props);
  }

  // 3. ลบ Type Annotation ใน State ออก
  state = { hasError: false };

  static getDerivedStateFromError() {
    // อัปเดต state เพื่อเข้าสู่โหมด error UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ChunkErrorBoundary] Component Failed:', error, errorInfo);
    // [TODO] Integration: ส่ง error ไปยัง Sentry หรือ Monitoring Service
  }

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;

      // Fallback UI
      return (
        <div className="bg-card flex min-h-[60vh] items-center justify-center rounded-lg border border-border p-8 shadow-lg">
          <div className="p-4 text-center">
            <h2 className="text-2xl font-extrabold text-destructive dark:text-red-400">
              🚨 ข้อมูลส่วนนี้ไม่พร้อมใช้งาน
            </h2>
            <p className="text-muted-foreground mt-2 text-base">
              เราไม่สามารถโหลดส่วนประกอบนี้ได้สำเร็จ โปรดลองดำเนินการต่อไปนี้
            </p>

            <button
              onClick={() => window.location.reload()}
              className="hover:bg-primary-dark mt-6 inline-flex transform items-center justify-center rounded-full border border-transparent bg-primary px-6 py-2.5 text-base font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              🔄 รีโหลดหน้า
            </button>

            {fallback}
          </div>
        </div>
      );
    }

    // 4. Return children ตามปกติ (JSX Nesting)
    return this.props.children;
  }
}
