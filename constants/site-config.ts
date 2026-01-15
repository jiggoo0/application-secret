/**
 * Global Site Configuration
 * ------------------------------------
 * Single Source of Truth สำหรับ:
 * - Metadata / SEO
 * - Footer / Header
 * - Contact / Social
 * - Static Routes
 */

export const SITE_CONFIG = {
  /* =====================
   * Identity
   * ===================== */
  name: "JP-VISOUL Professional Docs",
  shortName: "JP-VISOUL",
  description:
    "ผู้เชี่ยวชาญด้านเอกสาร วีซ่า และโครงสร้างทางการเงิน สำหรับบุคคลและองค์กร",
  url: "https://jp-visoul.com",

  /* =====================
   * Routes (Global)
   * ===================== */
  routes: {
    home: "/",
    services: "/services",
    blog: "/blog",
    faq: "/faq",
    contact: "/contact",
    about: "/about",
    support: "/support",
    privacy: "/privacy",
  },

  /* =====================
   * Contact Information
   * ===================== */
  contact: {
    email: "contact@jp-visoul.com",
    phone: "+66-xx-xxx-xxxx",

    /**
     * LINE Official Account ID
     * ใช้ร่วมกับ lib/utils/line-link.ts
     * รูปแบบ: @jpvisoul
     */
    line: "@jpvisoul",

    /**
     * Physical / Office Address
     * ใช้แสดงผลในหน้า Contact / Footer / Schema.org
     */
    address: "Bangkok, Thailand",
  },

  /* =====================
   * Organization / Legal
   * ===================== */
  legal: {
    companyName: "JP-VISOUL Co., Ltd.",
    country: "Thailand",
  },
} as const;