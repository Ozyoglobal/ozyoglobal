import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return ["tr", "en", "ru", "es"].map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title"), description: t("hero") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const values = [
    {
      key: "reliability",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      key: "innovation",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      key: "service",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      key: "global",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ] as const;

  const regions = [
    "Avrupa",
    "Amerika",
    "Uzak Doğu",
    "Orta Doğu",
    "Balkanlar",
    "BDT Ülkeleri",
  ];

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-balance">
            {t("hero")}
          </h1>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-950 rounded-3xl p-10 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-4">{t("mission.title")}</h2>
              <p className="text-zinc-400 leading-relaxed">{t("mission.text")}</p>
            </div>
            <div className="bg-zinc-100 rounded-3xl p-10">
              <div className="w-12 h-12 rounded-xl bg-zinc-200 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 mb-4">{t("vision.title")}</h2>
              <p className="text-zinc-600 leading-relaxed">{t("vision.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 section-pattern bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900">
              {t("values.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.key}
                className="bg-white rounded-2xl border border-zinc-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700 mb-4">
                  {v.icon}
                </div>
                <h3 className="font-semibold text-zinc-900">
                  {t(`values.${v.key}`)}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-3">
                Global Ağımız
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-6">
                Dünya Genelinde Hizmet
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-8">
                Avrupa'dan Uzak Doğu'ya, Amerika'dan BDT ülkelerine kadar geniş
                coğrafyada yerel ortaklıklarımız ve deneyimli ekibimizle
                kesintisiz hizmet sunuyoruz.
              </p>
              <div className="flex flex-wrap gap-3">
                {regions.map((region) => (
                  <span
                    key={region}
                    className="px-4 py-2 bg-zinc-100 text-zinc-700 text-sm font-medium rounded-full border border-zinc-200"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "10+", label: "Yıllık Deneyim" },
                { num: "50+", label: "Aktif Ülke" },
                { num: "500+", label: "Mutlu Müşteri" },
                { num: "7/24", label: "Destek" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-zinc-950 rounded-2xl p-6 text-white text-center"
                >
                  <div className="text-3xl font-bold mb-1">{item.num}</div>
                  <div className="text-xs text-zinc-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 hero-gradient relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {t("team.title")}
          </h2>
          <p className="text-white/60 text-lg">{t("team.text")}</p>
        </div>
      </section>
    </>
  );
}
