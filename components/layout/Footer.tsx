'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaLine, FaEnvelope, FaFacebook, FaFacebookMessenger } from 'react-icons/fa';

// ----------------------------------------------------
// ⚙️ Configurations & Types
// ----------------------------------------------------
const socialLinks = [
  { type: 'line', label: 'Line_Official', uri: 'https://lin.ee/G8s8rKp', icon: FaLine },
  {
    type: 'messenger',
    label: 'Direct_Messenger',
    uri: 'https://m.me/547760041764856?source=qr_link_share',
    icon: FaFacebookMessenger,
  },
  {
    type: 'facebook',
    label: 'Facebook_Page',
    uri: 'https://www.facebook.com/share/1BvXE1cCvo/',
    icon: FaFacebook,
  },
  {
    type: 'email',
    label: 'Email_Internal',
    uri: 'mailto:application-secret@zohomail.com',
    icon: FaEnvelope,
  },
];

/**
 * 🛠️ JP-VISOUL: Footer Component
 * เน้นความหนักแน่นแบบ Industrial Neobrutalism
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t-4 border-slate-900 bg-white font-sans text-slate-900"
      aria-labelledby="footer-heading"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* 1️⃣ Brand Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="border-2 border-slate-900 bg-white p-1 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-0.5"
              >
                <Image
                  src="/logo.webp"
                  alt="JP-VISOUL LOGO"
                  width={48}
                  height={48}
                  className="grayscale transition-all duration-300 hover:grayscale-0"
                />
              </Link>
              <div>
                <h2
                  id="footer-heading"
                  className="font-heading text-2xl font-black uppercase italic leading-none tracking-tighter"
                >
                  JP-VISOUL
                </h2>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                  OPERATED_BY_JAOPA
                </p>
              </div>
            </div>
            <p className="max-w-xs text-sm font-bold leading-relaxed text-slate-600">
              คนเบื้องหลังการจัดการเอกสารและโปรไฟล์ธุรกิจ เน้นความกริบ แม่นยำ และความลับระดับสูงสุด
              ชื่อที่คนในวงการให้การยอมรับมาตลอด 8 ปี
            </p>
          </div>

          {/* 2️⃣ Navigation Section */}
          <nav aria-label="Quick Links" className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="border-b-2 border-slate-100 pb-2 text-xs font-black uppercase tracking-widest text-slate-900">
                Archives
              </h3>
              <ul className="space-y-2 text-sm font-bold uppercase italic tracking-tighter">
                <li>
                  <Link href="/blog" className="transition-colors hover:text-primary">
                    Data_Vault
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-primary">
                    Contact_Direct
                  </Link>
                </li>
                <li>
                  {/* ✅ ใส่ as any เพื่อหลบ Type Check ของ Next.js Route กรณีหน้าเพจยังไม่ถูกสร้าง */}
                  <Link
                    href={'/privacy' as any}
                    className="text-slate-400 transition-colors hover:text-primary"
                  >
                    Privacy_Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="border-b-2 border-slate-100 pb-2 text-xs font-black uppercase tracking-widest text-slate-900">
                Deployments
              </h3>
              <ul className="space-y-2 text-sm font-bold uppercase italic tracking-tighter text-slate-400">
                <li className="cursor-default transition-colors hover:text-slate-600">
                  DTI_EVALUATION
                </li>
                <li className="cursor-default transition-colors hover:text-slate-600">
                  TOKEN_VERIFICATION
                </li>
                <li className="cursor-default transition-colors hover:text-slate-600">
                  DOC_GENERATION
                </li>
              </ul>
            </div>
          </nav>

          {/* 3️⃣ Social Connect */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">
              Communication_Channels
            </h3>
            <address className="not-italic">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {socialLinks.map(({ type, label, uri, icon: Icon }) => (
                  <li key={type}>
                    <a
                      href={uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 border-2 border-slate-900 bg-white p-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-slate-900 hover:text-white hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                      <Icon className="text-lg transition-transform group-hover:scale-110" />
                      <span className="text-[10px] font-black uppercase tracking-tighter">
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>
        </div>

        {/* ⚙️ Footer Bottom Metadata */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t-4 border-slate-900 pt-8 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              © {currentYear} JP-VISOUL // SECURITY_PROTOCOL_ACTIVE // จบงานลบทิ้ง 100%
            </p>
          </div>
          <div className="group relative flex items-center gap-2 border-2 border-slate-900 bg-slate-900 px-6 py-2 text-white shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] transition-all hover:shadow-none">
            <span className="font-heading text-xs font-black uppercase italic tracking-tighter text-primary">
              The Real Dealer in Document Industry
            </span>
            <div className="absolute -right-1 -top-1 h-2 w-2 animate-ping bg-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
