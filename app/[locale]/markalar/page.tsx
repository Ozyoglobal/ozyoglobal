import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });
  return { title: t("title"), description: t("subtitle") };
}

export async function generateStaticParams() {
  return ["tr", "en", "ru", "es"].map((locale) => ({ locale }));
}

const brandSlugs = ["dmc", "mice", "production", "location"] as const;

const brandIcons = {
  dmc: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  mice: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  production: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  location: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export default async function BrandsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });
  const common = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-4">
            {t("title")}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-balance mb-4">
            {t("hero")}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>
      </section>

      {/* Brand cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {brandSlugs.map((slug, i) => (
              <div
                key={slug}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl border border-zinc-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Left: Dark block */}
                <div
                  className={`p-10 md:p-12 flex flex-col justify-between ${
                    i % 2 === 0 ? "bg-zinc-950" : "bg-zinc-800"
                  }`}
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                      {brandIcons[slug]}
                    </div>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 mb-2">
                      0{i + 1}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                      {t(`${slug}.name`)}
                    </h2>
                    <p className="text-sm italic text-zinc-400 mb-6">
                      {t(`${slug}.tagline`)}
                    </p>
                  </div>
                  <Link
                    href={`/${locale}/markalar/${slug}`}
                    className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-6 py-3 rounded-xl hover:bg-zinc-100 transition-all text-sm self-start"
                  >
                    {common("learnMore")}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Right: Light block */}
                <div className="p-10 md:p-12 bg-zinc-50 flex flex-col justify-center">
                  <p className="text-zinc-600 leading-relaxed mb-8 text-sm">
                    {t(`${slug}.description`)}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(t.raw(`${slug}.services`) as string[]).map((service: string) => (
                      <div key={service} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 flex-shrink-0" />
                        <span className="text-xs text-zinc-600 font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
