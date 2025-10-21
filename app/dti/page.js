import SEO from '@/components/SEO';
import DtiClientWrapper from '@/components/DtiClientWrapper';

export const metadata = {
  title: 'แบบประเมิน DTI',
  description: 'ประเมินสัดส่วนหนี้ต่อรายได้ (DTI) และให้คำแนะนำเบื้องต้น',
  openGraph: {
    title: 'แบบประเมิน DTI',
    description: 'ใช้เครื่องมือคำนวณ DTI เพื่อวางแผนการเงินอย่างมั่นใจ',
    url: 'https://application-secret.vercel.app/dti',
    images: [
      {
        url: '/images/og-image.webp',
        alt: 'DTI Assessment Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'แบบประเมิน DTI',
    description: 'ใช้เครื่องมือคำนวณ DTI เพื่อวางแผนการเงินอย่างมั่นใจ',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function DtiPage() {
  const saveEnabled = process.env.NEXT_PUBLIC_DTI_SAVE === 'true';

  return (
    <>
      <SEO title="ประเมิน DTI" description="เครื่องมือคำนวณ DTI เพื่อวางแผนการเงิน" />

      <main
        className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8"
        aria-label="แบบฟอร์มประเมิน DTI"
      >
        {/* Page Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-primary sm:text-3xl">
            แบบประเมินความสามารถชำระหนี้ (DTI)
          </h1>
          <p className="mt-2 text-sm text-muted sm:text-base">
            กรอกข้อมูลรายได้และภาระหนี้เพื่อตรวจสอบความเสี่ยงทางการเงินของคุณ
          </p>
        </header>

        {/* Disclaimer Section */}
        <section
          role="note"
          aria-label="ประกาศคำเตือน"
          className="mb-6 rounded-md border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800"
        >
          <strong className="mb-1 block font-semibold">หมายเหตุ:</strong>
          แบบฟอร์มประเมินใช้เทคนิคการคำนวณ DTI (Debt-to-Income Ratio)
          ซึ่งข้อมูลเป็นปัจจุบันและเชื่อถือได้
          ผลลัพธ์เป็นเพียงการประเมินเพื่อช่วยให้คุณวางแผนการเงิน โดยไม่เสียค่าใช้จ่ายใด ๆ
          <div className="mt-3">
            <span className="font-semibold">สูตรการคำนวณ DTI:</span>
            <div className="mt-1">DTI = (ภาระหนี้รวมต่อเดือน ÷ รายได้รวมต่อเดือน) × 100</div>
            <div className="mt-1 text-muted">
              ตัวอย่าง: หากคุณมีรายได้ 25,000 บาท และภาระหนี้รวม 10,000 บาทต่อเดือน DTI จะเท่ากับ
              (10,000 ÷ 25,000) × 100 = 40%
            </div>
          </div>
          <div className="mt-3">
            <span className="font-semibold">เกณฑ์ทั่วไป:</span>
            <ul className="ml-5 mt-1 list-disc">
              <li>DTI ≤ 35%: อยู่ในระดับปลอดภัย</li>
              <li>DTI 36–50%: ควรระมัดระวังและวางแผนการเงินเพิ่มเติม</li>
              <li>DTI &gt; 50%: เสี่ยงสูง ควรลดภาระหนี้หรือเพิ่มรายได้</li>
            </ul>
          </div>
        </section>

        {/* DTI Form */}
        <DtiClientWrapper saveEnabled={saveEnabled} />
      </main>
    </>
  );
}
