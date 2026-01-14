import Link from "next/link";
import { SITE_CONFIG } from "@/constants/theme";
import { FOOTER_LINKS } from "@/constants/navigation";
import { Icons } from "./Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-primary">
                <Icons.visa size={20} />
              </div>
              <span className="font-bold text-xl tracking-tighter text-white">
                JP-VISOUL<span className="text-secondary">.DOCS</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {SITE_CONFIG.description}{" "}
              มุ่งมั่นให้บริการด้วยความเป็นมืออาชีพและโปร่งใส
              เพื่อความสำเร็จของลูกค้าทุกท่าน
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholder */}
              <Link href="#" className="hover:text-secondary transition-colors">
                <Icons.contact size={20} />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Icons.user size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">บริษัท</h3>
            <ul className="space-y-4 text-sm">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold mb-6">ช่วยเหลือ</h3>
            <ul className="space-y-4 text-sm">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">ติดต่อเรา</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Icons.contact size={18} className="text-secondary shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icons.contact size={18} className="text-secondary shrink-0" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icons.contact size={18} className="text-secondary shrink-0" />
                <span className="text-secondary font-bold">
                  {SITE_CONFIG.contact.line}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
