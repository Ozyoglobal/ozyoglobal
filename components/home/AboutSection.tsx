import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function AboutSection() {
  const t = useTranslations("home.about");
  const locale = useLocale();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-3xl bg-zinc-950 flex items-center justify-center overflow-hidden">
              {/* Decorative inner pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative z-10 text-center p-12">
                <div className="text-5xl font-bold text-white mb-2">Ozyo</div>
                <div className="text-sm font-medium text-zinc-400 tracking-[0.3em] uppercase">
                  Global DMC
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">10+</div>
                    <div className="text-xs text-zinc-500 mt-1">Yıl Deneyim</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-xs text-zinc-500 mt-1">Ülke</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">4</div>
                    <div className="text-xs text-zinc-500 mt-1">Uzman Marka</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">7/24</div>
                    <div className="text-xs text-zinc-500 mt-1">Destek</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-white rounded-2xl shadow-lg border border-zinc-200 px-5 py-4">
              <div className="text-xs text-zinc-400 font-medium">Est.</div>
              <div className="text-2xl font-bold text-zinc-900">2014</div>
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-3">
              {t("title")}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 leading-tight mb-6 text-balance">
              Turizmde Güvenilir Küresel Ortağınız
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-8">{t("text")}</p>

            <div className="space-y-4 mb-10">
              {[
                { icon: "✓", text: "Avrupa, Amerika, Uzak Doğu ve Orta Doğu'da aktif hizmet" },
                { icon: "✓", text: "7/24 ulaşılabilir profesyonel ekip" },
                { icon: "✓", text: "4 uzmanlaşmış marka, tek güvenilir çatı" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-zinc-600">{item.text}</span>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/hakkimizda`}
              className="inline-flex items-center gap-2 bg-zinc-900 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-zinc-700 transition-all duration-200 text-sm"
            >
              {t("learnMore")}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
