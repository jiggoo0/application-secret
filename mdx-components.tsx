import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H1, H2, H3, P } from "@/components/ui/typography"; // ✅ ลบ Lead ออกเนื่องจากไม่ได้ใช้งาน
import { cn } from "@/lib/utils";

/**
 * ฟังก์ชันสำหรับลงทะเบียน Components ให้กับ MDX
 * ช่วยให้คุณสามารถใช้คอมโพเนนต์อย่าง <Button /> ภายในไฟล์ .mdx ได้ทันที
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 1. Map HTML Elements มาเป็น UI Components (Typography)
    h1: ({ className, ...props }) => (
      <H1 className={cn("mt-12 mb-6 border-none", className)} {...props} />
    ),
    h2: ({ className, ...props }) => (
      <H2
        className={cn("mt-10 mb-4 border-none text-2xl md:text-3xl", className)}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <H3
        className={cn("mt-8 mb-4 text-xl md:text-2xl", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <P
        className={cn("leading-relaxed mb-6 text-slate-600", className)}
        {...props}
      />
    ),

    // 2. Custom Components สำหรับการใช้งานในเนื้อหา
    Button: ({ className, ...props }: React.ComponentProps<typeof Button>) => (
      <div className="my-8 flex justify-center md:justify-start">
        <Button
          {...props}
          className={cn(
            "rounded-full px-8 font-bold shadow-lg shadow-primary/20",
            className,
          )}
        />
      </div>
    ),

    // 3. ปรับแต่งรูปภาพให้เป็น Responsive Image อัตโนมัติ
    img: (props) => (
      <span className="block my-10 overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
        <Image
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          width={1200}
          height={630}
          {...(props as ImageProps)}
          alt={props.alt || "JP-VISOUL content image"}
        />
      </span>
    ),

    // 4. ปรับแต่ง Link ให้ใช้ Next.js Link (Client-side Routing)
    a: ({ href, children, ...props }) => {
      const isInternal = href?.startsWith("/") || href?.startsWith("#");

      const linkClass =
        "text-secondary font-bold hover:underline underline-offset-4 transition-all";

      if (isInternal && href) {
        return (
          <Link href={href} className={linkClass} {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          {...props}
        >
          {children}
        </a>
      );
    },

    // รวมคอมโพเนนต์อื่นๆ ที่ส่งผ่านมา
    ...components,
  };
}
