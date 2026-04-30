"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { AnimatedGlobe } from "@/components/home/AnimatedGlobe";

export function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black">
      {/* Dönen dünya — mobilde altta soluk arka plan, masaüstünde sağda */}
      <AnimatedGlobe />

      {/* Sol gradient: metin okunurluğu */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
      {/* Alt gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      {/* Üst gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />

      {/* İnce grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* ── İçerik ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-3">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
              {t("tagline")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-5 text-[clamp(2.2rem,5vw,4.5rem)] font-semibold leading-[1.1] tracking-tight text-white">
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
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/hizmetler`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100 active:scale-[0.97]"
            >
              {t("cta")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 active:scale-[0.97]"
            >
              {t("ctaSecondary")}
            </Link>
          </div>

          {/* İstatistik şeridi */}
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-8">
            {[
              { value: "10+", label: "Yıllık Deneyim" },
              { value: "50+", label: "Ülke" },
              { value: "4",   label: "Uzman Marka" },
              { value: "7/24", label: "Destek" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="text-xl font-bold text-white">{s.value}</span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-1.5 opacity-25">
        <div className="h-7 w-px bg-white" />
        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
