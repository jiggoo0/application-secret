'use client';

import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
      <SheetContent side="right" className="w-[80%] bg-background text-foreground sm:w-[400px]">
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
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
