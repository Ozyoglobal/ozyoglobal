import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("title"), description: t("subtitle") };
}

export async function generateStaticParams() {
  return ["tr", "en", "ru", "es"].map((locale) => ({ locale }));
}

const serviceKeys = [
  "flight",
  "visa",
  "transfer",
  "accommodation",
  "tours",
  "guide",
] as const;

const serviceIcons = [
  <svg key="flight" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>,
  <svg key="visa" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>,
  <svg key="transfer" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>,
  <svg key="accom" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>,
  <svg key="tours" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>,
  <svg key="guide" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const items = await getTranslations({ locale, namespace: "services.items" });
  const contact = await getTranslations({ locale, namespace: "contact" });
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

      {/* Services grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceKeys.map((key, i) => (
              <div
                key={key}
                id={`svc-${key}`}
                className="group relative rounded-3xl border border-zinc-200 bg-white p-8 hover:border-zinc-400 hover:shadow-lg transition-all duration-300 overflow-hidden scroll-mt-28"
              >
                <div className="absolute top-0 right-0 text-zinc-100 font-bold text-6xl leading-none select-none p-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 mb-6 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                    {serviceIcons[i]}
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                    {items(`${key}.title`)}
                  </h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">
                    {items(`${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            {contact("hero")}
          </h2>
          <p className="text-zinc-400 mb-8">{contact("subtitle")}</p>
          <Link
            href={`/${locale}/iletisim`}
            className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all duration-200"
          >
            {common("contactUs")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
