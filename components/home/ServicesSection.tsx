"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const serviceKeys = [
  "flight",
  "visa",
  "transfer",
  "accommodation",
  "tours",
  "guide",
] as const;

const serviceIcons = [
  <svg key="flight" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>,
  <svg key="visa" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>,
  <svg key="transfer" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>,
  <svg key="accom" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>,
  <svg key="tours" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>,
  <svg key="guide" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
];

export function ServicesSection() {
  const t = useTranslations("home.services");
  const items = useTranslations("services.items");
  const common = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="py-24 section-pattern bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-3">
            {t("title")}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 text-balance">
            {t("subtitle")}
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, i) => (
            <Link
              key={key}
              href={`/${locale}/hizmetler/${key}`}
              className="group bg-white rounded-2xl border border-zinc-200 p-6 hover:border-zinc-900 hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 mb-5 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-200">
                {serviceIcons[i]}
              </div>
              <h3 className="font-semibold text-zinc-900 mb-2">
                {items(`${key}.title`)}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                {items(`${key}.desc`)}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-zinc-400 group-hover:text-zinc-900 group-hover:gap-2 transition-all duration-200">
                {common("learnMore")}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Tüm hizmetler linki */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/hizmetler`}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-all duration-200"
          >
            {t("viewAll") ?? "Tüm Hizmetleri Gör"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
