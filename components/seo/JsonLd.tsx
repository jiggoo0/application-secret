/** * @format
 * @description JSON_LD: ปรับปรุงความปลอดภัยของข้อมูล (Runtime Safety)
 */

import { siteConfig } from '@/config/site'

export const JsonLd = () => {
  // ดึงข้อมูลออกมาพร้อมกำหนดค่าเริ่มต้นเพื่อความปลอดภัย
  const { social, url, name, description } = siteConfig

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name,
    url: url,
    description: description,
    // ✅ ใช้ Array filter เพื่อขจัดค่า undefined/null ออกจากรายการ
    sameAs: [social?.facebook, social?.line, social?.messenger].filter(Boolean) as string[],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
