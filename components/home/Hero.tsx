"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const heroBgImages = [
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=75",
  },
  {
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=75",
  },
  {
    src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=75",
  },
];

export function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden hero-gradient">
      {/* Turizm fotoğrafları — çok düşük opaklık + karışım ile ton uyumu */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 mix-blend-soft-light opacity-[0.35]">
          <Image
            src={heroBgImages[0].src}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
        </div>
        <div className="absolute inset-y-0 right-0 w-[48%] mix-blend-soft-light opacity-[0.22] max-md:hidden">
          <Image
            src={heroBgImages[1].src}
            alt=""
            aria-hidden
            fill
            sizes="50vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-y-0 left-0 w-[42%] mix-blend-soft-light opacity-[0.18] max-md:hidden">
          <Image
            src={heroBgImages[2].src}
            alt=""
            aria-hidden
            fill
            sizes="45vw"
            className="object-cover object-[center_60%]"
          />
        </div>
      </div>

      {/* Okuma kontrastı için katman */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-[#050505]/88 to-[#0a0a0a]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="mb-8 inline-flex items-center gap-2">
          <div className="h-px w-10 bg-white/30" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
            {t("tagline")}
          </span>
          <div className="h-px w-10 bg-white/30" />
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {t("title")
            .split("\n")
            .map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {t("subtitle")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/hizmetler`}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-zinc-900 transition-all duration-200 hover:bg-zinc-100"
          >
            {t("cta")}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href={`/${locale}/iletisim`}
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 animate-bounce opacity-40">
        <div className="h-8 w-px bg-white/50" />
        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
