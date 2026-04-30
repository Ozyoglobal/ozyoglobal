import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-zinc-900", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children }: CardProps) {
  return (
    <p className={cn("text-sm text-zinc-500 leading-relaxed", className)}>
      {children}
    </p>
  );
}
