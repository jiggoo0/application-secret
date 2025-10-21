'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function MobileMenu({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  const navLinks = [
    { label: 'บริการ', href: '#services' },
    { label: 'เกี่ยวกับเรา', href: '#about' },
    { label: 'รีวิว', href: '#reviews' },
    { label: 'บทความ', href: '#blog' },
    { label: 'ประเมิน DTI', href: '/dti' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-[80%] bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 sm:w-[400px]"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-primary">เมนูหลัก</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 flex flex-col gap-4">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`text-lg transition-colors ${
                  isActive
                    ? 'font-semibold text-primary'
                    : 'text-gray-600 hover:text-primary dark:text-gray-300'
                }`}
              >
                {label}
              </Link>
            );
          })}

          <div className="mt-8 flex flex-col gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
            <Button
              asChild
              className="w-full bg-primary text-white hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/login">เข้าสู่ระบบ</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/register">สมัครสมาชิก</Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
