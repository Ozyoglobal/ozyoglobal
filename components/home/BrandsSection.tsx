import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const brandData = [
  {
    slug: "dmc",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    slug: "mice",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    slug: "production",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    slug: "location",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function BrandsSection() {
  const t = useTranslations("home.brands");
  const brands = useTranslations("brands");
  const locale = useLocale();

  return (
    <section className="py-24 bg-white">
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

        {/* Brand cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brandData.map((brand, i) => {
            const slug = brand.slug as "dmc" | "mice" | "production" | "location";
            return (
              <Link
                key={brand.slug}
                href={`/${locale}/markalar/${brand.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 hover:border-zinc-400 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                    {brand.icon}
                  </div>
                  <span className="text-xs font-medium text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-200">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  {brands(`${slug}.name`)}
                </h3>
                <p className="text-xs font-medium text-zinc-400 mb-3 tracking-wide italic">
                  {brands(`${slug}.tagline`)}
                </p>
                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {brands(`${slug}.short`)}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-zinc-900 group-hover:gap-3 transition-all">
                  {t("learnMore")}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
