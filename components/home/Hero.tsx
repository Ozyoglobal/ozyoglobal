"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { AnimatedGlobe } from "@/components/home/AnimatedGlobe";

export function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* ── Dönen dünya ── */}
      <AnimatedGlobe />

      {/* Soldan gelen gradient (metin okunurluğu için globe üzerinde) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />

      {/* Alt gradient (geçiş pürüzsüzlüğü) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      {/* İnce grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── İçerik ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-8 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              {t("tagline")}
            </span>
          </div>

          {/* Headline — sola hizalı */}
          <h1 className="mb-6 text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")
              .split("\n")
              .map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={`/${locale}/hizmetler`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100"
            >
              {t("cta")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          {/* Küçük istatistik şeridi */}
          <div className="mt-16 flex flex-wrap gap-8">
            {[
              { value: "10+", label: "Yıllık Deneyim" },
              { value: "50+", label: "Ülke" },
              { value: "7/24", label: "Destek" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-1.5 opacity-30">
        <div className="h-8 w-px bg-white" />
        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
