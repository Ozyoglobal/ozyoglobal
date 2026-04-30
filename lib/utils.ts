import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const brandSlugs = ["dmc", "mice", "production", "location"] as const;
export type BrandSlug = (typeof brandSlugs)[number];

export const brandColors: Record<BrandSlug, { bg: string; text: string; border: string }> = {
  dmc: { bg: "bg-zinc-900", text: "text-white", border: "border-zinc-800" },
  mice: { bg: "bg-zinc-800", text: "text-white", border: "border-zinc-700" },
  production: { bg: "bg-zinc-700", text: "text-white", border: "border-zinc-600" },
  location: { bg: "bg-zinc-600", text: "text-white", border: "border-zinc-500" },
};

export const brandIcons: Record<BrandSlug, string> = {
  dmc: "🌍",
  mice: "🎯",
  production: "🎬",
  location: "📍",
};
