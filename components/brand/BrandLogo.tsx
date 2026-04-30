import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant: "onDark" | "onLight";
  size?: "header" | "footer";
  /**
   * Beyaz / #000 zemilli PNG:
   * - Üst çubuk + hero: true → üst sarmalayıcıda `mix-blend-screen` (siyah kutu zemine karışır).
   * - Footer `bg-black`: false → kaynak dosya olduğu gibi, ton kayması yok.
   */
  blendOnDark?: boolean;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant,
  size = "header",
  blendOnDark = true,
  className,
  priority,
}: BrandLogoProps) {
  const sizeClass =
    size === "footer" ? "h-12 w-auto md:h-14" : "h-10 w-auto md:h-12";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        variant === "onDark" && blendOnDark && "mix-blend-screen",
        className
      )}
    >
      <Image
        src="/logo-ozy.png"
        alt="Ozyo Global DMC"
        width={260}
        height={104}
        sizes={size === "footer" ? "220px" : "200px"}
        priority={priority}
        className={cn(
          "block object-contain object-left",
          sizeClass,
          variant === "onLight" && "invert"
        )}
      />
    </span>
  );
}
