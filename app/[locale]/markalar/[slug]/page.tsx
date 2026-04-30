import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

const validSlugs = ["dmc", "mice", "production", "location"] as const;
type BrandSlug = (typeof validSlugs)[number];

export async function generateStaticParams() {
  return validSlugs.flatMap((slug) =>
    ["tr", "en", "ru", "es"].map((locale) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!validSlugs.includes(slug as BrandSlug)) return {};
  const t = await getTranslations({ locale, namespace: "brands" });
  return {
    title: t(`${slug as BrandSlug}.name`),
    description: t(`${slug as BrandSlug}.description`),
  };
}

const brandIcons: Record<BrandSlug, React.ReactNode> = {
  dmc: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  mice: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  production: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  location: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug as BrandSlug)) {
    notFound();
  }

  const brandSlug = slug as BrandSlug;
  const t = await getTranslations({ locale, namespace: "brands" });
  const contact = await getTranslations({ locale, namespace: "contact" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const common = await getTranslations({ locale, namespace: "common" });

  const services = t.raw(`${brandSlug}.services`) as string[];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
            <Link href={`/${locale}`} className="hover:text-white/60">
              {nav("home")}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/markalar`} className="hover:text-white/60">
              {nav("brands")}
            </Link>
            <span>/</span>
            <span className="text-white/60">{t(`${brandSlug}.name`)}</span>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
              {brandIcons[brandSlug]}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-3">
                {t(`${brandSlug}.name`)}
              </h1>
              <p className="text-white/50 italic">{t(`${brandSlug}.tagline`)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Description + Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
                {t(`${brandSlug}.name`)} Hakkında
              </h2>
              <p className="text-zinc-600 leading-relaxed text-lg mb-12">
                {t(`${brandSlug}.description`)}
              </p>

              {/* Services list */}
              <h3 className="text-lg font-semibold text-zinc-900 mb-6">
                Sunduğumuz Hizmetler
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 hover:border-zinc-400 hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-zinc-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA card */}
              <div className="bg-zinc-950 rounded-3xl p-8 text-white">
                <h3 className="text-lg font-semibold mb-3">{contact("hero")}</h3>
                <p className="text-zinc-400 text-sm mb-6">{contact("subtitle")}</p>
                <Link
                  href={`/${locale}/iletisim`}
                  className="block text-center bg-white text-zinc-900 font-semibold px-6 py-3 rounded-xl hover:bg-zinc-100 transition-all text-sm"
                >
                  {common("contactUs")}
                </Link>
              </div>

              {/* Other brands */}
              <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200">
                <h3 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wide">
                  Diğer Markalarımız
                </h3>
                <div className="space-y-3">
                  {validSlugs
                    .filter((s) => s !== brandSlug)
                    .map((s) => (
                      <Link
                        key={s}
                        href={`/${locale}/markalar/${s}`}
                        className="flex items-center justify-between py-2 text-sm text-zinc-600 hover:text-zinc-900 border-b border-zinc-200 last:border-0"
                      >
                        {t(`${s}.name`)}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
