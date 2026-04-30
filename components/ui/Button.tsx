import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900",
      outline:
        "border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white focus-visible:ring-zinc-900",
      ghost: "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-900",
      white:
        "bg-white text-zinc-900 hover:bg-zinc-100 focus-visible:ring-white",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-md",
      md: "h-11 px-6 text-sm rounded-lg",
      lg: "h-14 px-8 text-base rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
