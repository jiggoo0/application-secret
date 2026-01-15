// mdx-components.tsx

import * as React from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { H1, H2, H3, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * MDX Component Registry
 * ------------------------------------
 * Single Source of Truth สำหรับการ map:
 * - Typography
 * - Custom Components
 * - Image / Link Handling
 *
 * ✅ แก้ปัญหา TypeScript:
 *    src: string | Blob ❌
 *    next/image รองรับเฉพาะ string | StaticImport
 */
export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    /* ==================================================
     * Typography
     * ================================================== */
    h1: ({ className, children, ...props }) => (
      <H1 className={cn("mt-12 mb-6 border-none", className)} {...props}>
        {children}
      </H1>
    ),

    h2: ({ className, children, ...props }) => (
      <H2
        className={cn(
          "mt-10 mb-4 border-none text-2xl md:text-3xl",
          className,
        )}
        {...props}
      >
        {children}
      </H2>
    ),

    h3: ({ className, children, ...props }) => (
      <H3
        className={cn("mt-8 mb-4 text-xl md:text-2xl", className)}
        {...props}
      >
        {children}
      </H3>
    ),

    p: ({ className, children, ...props }) => (
      <P
        className={cn(
          "mb-6 leading-relaxed text-slate-600 dark:text-slate-300",
          className,
        )}
        {...props}
      >
        {children}
      </P>
    ),

    /* ==================================================
     * Button (MDX Custom Component)
     * ================================================== */
    Button: ({
      className,
      ...props
    }: React.ComponentProps<typeof Button>) => (
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

    /* ==================================================
     * Image Handling (MDX <img />)
     * ================================================== */
    img: ({
      src,
      alt,
    }: React.ImgHTMLAttributes<HTMLImageElement>) => {
      // ป้องกันกรณี src เป็น Blob หรือ undefined
      if (typeof src !== "string") return null;

      return (
        <span className="my-10 block overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <Image
            src={src}
            alt={alt ?? "JP-VISOUL content image"}
            width={1200}
            height={630}
            sizes="100vw"
            className="h-auto w-full object-cover"
          />
        </span>
      );
    },

    /* ==================================================
     * Link Handling
     * ================================================== */
    a: ({
      href,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
      if (!href) return <span>{children}</span>;

      const isInternal = href.startsWith("/") || href.startsWith("#");

      const linkClass =
        "font-semibold text-secondary underline-offset-4 transition hover:underline";

      if (isInternal) {
        return (
          <Link href={href} className={linkClass}>
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

    /* ==================================================
     * User Overrides
     * ================================================== */
    ...components,
  };
}