import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { googleMapsSearchUrl, telHref } from "@/lib/contact";

export async function generateStaticParams() {
  return ["tr", "en", "ru", "es"].map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const p = await params;
  const t = await getTranslations({ locale: p.locale, namespace: "contact" });

  const email = t("info.email");
  const phone = t("info.phone");
  const mapsUrl = googleMapsSearchUrl();

  const iconWrapClass =
    "w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0";

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

      {/* Form + Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              <div className="bg-zinc-950 rounded-3xl p-8 text-white">
                <h3 className="font-semibold text-lg mb-6">{t("infoSidebarTitle")}</h3>
                <div className="space-y-5">
                  {/* Adres + harita */}
                  <div className="flex items-start gap-4">
                    <div className={iconWrapClass}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2 pt-0.5">
                      <span className="text-sm leading-relaxed text-zinc-300">{t("info.address")}</span>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-zinc-200 transition-colors border-b border-white/40 pb-0.5 hover:border-white"
                      >
                        {t("info.directions")}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* E-posta */}
                  <div className="flex items-start gap-4">
                    <div className={iconWrapClass}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm text-zinc-300 hover:text-white transition-colors self-center break-all"
                    >
                      {email}
                    </a>
                  </div>

                  {/* Telefon */}
                  <div className="flex items-start gap-4">
                    <div className={iconWrapClass}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <a
                      href={telHref(phone)}
                      className="text-sm text-zinc-300 hover:text-white transition-colors self-center"
                    >
                      {phone}
                    </a>
                  </div>

                  {/* Çalışma saatleri */}
                  <div className="flex items-start gap-4">
                    <div className={iconWrapClass}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-zinc-300 self-center">{t("info.hours")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8">
                <h3 className="font-semibold text-zinc-900 mb-2">{t("quickReplyTitle")}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{t("quickReplyBody")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
