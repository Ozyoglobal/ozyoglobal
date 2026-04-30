import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function CtaSection() {
  const t = useTranslations("home.contact");
  const locale = useLocale();

  return (
    <section className="py-24 hero-gradient relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 text-balance">
          {t("title")}
        </h2>
        <p className="text-white/60 text-lg mb-10">{t("subtitle")}</p>
        <Link
          href={`/${locale}/iletisim`}
          className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all duration-200"
        >
          {t("cta")}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
