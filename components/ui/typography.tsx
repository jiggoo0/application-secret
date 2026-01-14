import { cn } from "@/lib/utils";

export function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 font-heading text-4xl font-extrabold tracking-tight lg:text-5xl text-primary",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 font-heading text-3xl font-semibold tracking-tight first:mt-0 text-primary",
        className,
      )}
    >
      {children}
    </h2>
  );
}

// เพิ่ม H3 ที่ขาดไปเพื่อให้ Footer และหน้าอื่นๆ ใช้งานได้
export function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-heading text-2xl font-semibold tracking-tight text-primary",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function P({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-body leading-7 [&:not(:first-child)]:mt-6 text-primary/90",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Lead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xl text-muted-foreground font-body", className)}>
      {children}
    </p>
  );
}

export function Muted({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-sm text-muted-foreground font-body", className)}>
      {children}
    </span>
  );
}

// เพิ่ม Large (สำหรับเน้นข้อความตัวหนาใน Footer หรือ Card)
export function Large({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-lg font-semibold text-primary font-heading",
        className,
      )}
    >
      {children}
    </div>
  );
}
