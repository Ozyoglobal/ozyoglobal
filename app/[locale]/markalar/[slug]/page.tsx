import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
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

// ── Görsel Veri ──────────────────────────────────────────────────────────────
const brandData: Record<
  BrandSlug,
  {
    hero: string;
    stats: { value: string; label: string }[];
    gallery: { src: string; caption: string }[];
    highlights: { title: string; body: string }[];
  }
> = {
  dmc: {
    hero: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "10+", label: "Yıllık Deneyim" },
      { value: "50+", label: "Destinasyon" },
      { value: "300+", label: "Yıllık Tur" },
      { value: "7/24", label: "Saha Desteği" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80",
        caption: "Tokyo'da Şehir Turu",
      },
      {
        src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
        caption: "Bali Aktivite Programı",
      },
      {
        src: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=900&q=80",
        caption: "Lüks Konaklama Paketi",
      },
      {
        src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
        caption: "Dubai Destinasyon Yönetimi",
      },
      {
        src: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=900&q=80",
        caption: "Avrupa Tur Rotaları",
      },
      {
        src: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=900&q=80",
        caption: "Deniz Turları",
      },
    ],
    highlights: [
      {
        title: "Neden Ozyo Global DMC?",
        body: "15 yılı aşkın destinasyon yönetimi deneyimimizle, dünyanın dört bir yanında güvenilir ve yetkin bir partner olarak öne çıkıyoruz. Yerel bilgimizi global operasyon standardlarıyla birleştirerek seyahat acenteleri ve tur operatörlerine rekabet avantajı sunuyoruz.",
      },
      {
        title: "Global Ağımız",
        body: "Asya'dan Avrupa'ya, Orta Doğu'dan Amerika'ya 50+ ülkede güçlü yerel ortaklarla çalışıyoruz. Her destinasyonda sahaya yerleşik ekiplerimiz, olası aksaklıkları anında çözüme kavuşturuyor.",
      },
      {
        title: "Kişiselleştirilmiş Hizmet",
        body: "Her müşteri benzersizdir. Birebir ihtiyaç analiziyle tasarladığımız tur programları, standart paket dışına çıkarak gerçekten unutulmaz deneyimler yaratır. Butik gruptan büyük kitle turizmlerine kadar her ölçeği başarıyla yönetiyoruz.",
      },
    ],
  },
  mice: {
    hero: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "500+", label: "Etkinlik Düzenlendi" },
      { value: "120+", label: "Kurumsal Müşteri" },
      { value: "30+", label: "Ülkede Organizasyon" },
      { value: "50k+", label: "Toplam Katılımcı" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
        caption: "Uluslararası Kongre",
      },
      {
        src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
        caption: "Kurumsal Gala Gecesi",
      },
      {
        src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
        caption: "Düğün & Özel Etkinlik",
      },
      {
        src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
        caption: "Konferans Salonu Kurulumu",
      },
      {
        src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
        caption: "Team Building Aktivitesi",
      },
      {
        src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=900&q=80",
        caption: "Incentive Tur Grubu",
      },
    ],
    highlights: [
      {
        title: "Kurumsal Etkinliklerde Uzman",
        body: "Şirket toplantılarından uluslararası kongrelere, takım gecelerinden teşvik turlarına kadar tüm MICE süreçlerini uçtan uca yönetiyoruz. Her etkinlik, markanızın değerleriyle örtüşen özel bir kurgu içinde hayata geçirilir.",
      },
      {
        title: "Incentive Programları",
        body: "Çalışan motivasyonunu en üst seviyeye taşıyacak incentive tur programları tasarlıyoruz. Egzotik destinasyonlar, VIP deneyimler ve özel aktiviteler ile ekibinizi ödüllendiriyoruz.",
      },
      {
        title: "Teknik Altyapı & Lojistik",
        body: "Ses ve ışık sistemlerinden simultane çeviri ekipmanlarına, sahneleme ve dekorasyondan canlı yayın alt yapısına kadar her teknik detayı titizlikle planlıyoruz.",
      },
    ],
  },
  production: {
    hero: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "200+", label: "Prodüksiyon Projesi" },
      { value: "40+", label: "Film & Reklam" },
      { value: "15+", label: "Ülkede Çekim Desteği" },
      { value: "72h", label: "Maks. Yanıt Süresi" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=900&q=80",
        caption: "Film Set Lojistiği",
      },
      {
        src: "https://images.unsplash.com/photo-1567593810070-7a3d471af022?auto=format&fit=crop&w=900&q=80",
        caption: "Çekim Lokasyonu Scouting",
      },
      {
        src: "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?auto=format&fit=crop&w=900&q=80",
        caption: "Ekip Konaklaması",
      },
      {
        src: "https://images.unsplash.com/photo-1574717024453-354056aff6fc?auto=format&fit=crop&w=900&q=80",
        caption: "Reklam Film Çekimi",
      },
      {
        src: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=900&q=80",
        caption: "Sahne Dekorasyon & Set",
      },
      {
        src: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=900&q=80",
        caption: "Gece Çekim Organizasyonu",
      },
    ],
    highlights: [
      {
        title: "Prodüksiyon Ekiplerine Kesintisiz Destek",
        body: "Film, dizi ve reklam prodüksiyonlarında çekim ekibinin tüm seyahat ve lojistik ihtiyaçlarını karşılıyoruz. Yoğun çekim takvimlerinde bile zamanında, esnek ve güvenilir hizmet sunuyoruz.",
      },
      {
        title: "Lokasyon & İzin Yönetimi",
        body: "Türkiye'nin en eşsiz çekim mekânlarına erişim sağlıyor, çekim izinleri ve resmi prosedürler konusunda eksiksiz danışmanlık veriyoruz. Tarihi yapılar, doğal güzellikler ve özel mülkler için hızlı lokasyon scouting yapıyoruz.",
      },
      {
        title: "Visa & Ekipman Lojistiği",
        body: "Yabancı ekipler için vize başvurusu, gümrük işlemleri ve ekipman ithalatı konularında uzmanlık sunuyoruz. Sınır ötesi çekim projelerinde bürokratik engelleri ortadan kaldırıyoruz.",
      },
    ],
  },
  location: {
    hero: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "1000+", label: "Mekan Portföyü" },
      { value: "20+", label: "Şehir" },
      { value: "8+", label: "Yıllık Deneyim" },
      { value: "98%", label: "Müşteri Memnuniyeti" },
    ],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        caption: "Lüks Otel Toplantı Salonu",
      },
      {
        src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",
        caption: "Açık Hava Etkinlik Alanı",
      },
      {
        src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
        caption: "Premium Restoran",
      },
      {
        src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80",
        caption: "İstanbul Tarihi Yarımada",
      },
      {
        src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
        caption: "Özel Villa & Havuz",
      },
      {
        src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
        caption: "Resort & Tatil Kompleksi",
      },
    ],
    highlights: [
      {
        title: "Türkiye'nin En Geniş Mekan Ağı",
        body: "İstanbul'dan Kapadokya'ya, Bodrum'dan Antalya'ya Türkiye genelinde 1.000'i aşkın seçkin mekan portföyüyle çalışıyoruz. Etkinliğinizin büyüklüğü ve konseptine göre en uygun mekânı kısa sürede belirliyoruz.",
      },
      {
        title: "Çekim Lokasyonları",
        body: "Film ve fotoğraf prodüksiyonları için eşsiz mekânlar: Osmanlı dönemi yalılar, tarihi hanlar, çarşılar, boğaz manzaralı çatı terasları ve el değmemiş doğal güzellikler. Her prodüksiyona özgün görsel dil yaratıyoruz.",
      },
      {
        title: "Dekorasyon & Kurulum",
        body: "Sadece mekân bulmakla kalmıyor; dekorasyon, teknik donanım kurulumu, ikram ve mekân yönetimi hizmetleriyle etkinliğinizi başından sonuna kadar sahipleniyoruz.",
      },
    ],
  },
};

// ── İkon ─────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
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
  const data = brandData[brandSlug];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-28 overflow-hidden min-h-[60vh] flex items-end">
        <Image
          src={data.hero}
          alt={t(`${brandSlug}.name`)}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/80" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/40 mb-8">
            <Link href={`/${locale}`} className="hover:text-white/60">{nav("home")}</Link>
            <span>/</span>
            <Link href={`/${locale}/markalar`} className="hover:text-white/60">{nav("brands")}</Link>
            <span>/</span>
            <span className="text-white/70">{t(`${brandSlug}.name`)}</span>
          </div>

          <div className="flex items-end gap-6 flex-wrap">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0 border border-white/20">
              {brandIcons[brandSlug]}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold text-white mb-2">
                {t(`${brandSlug}.name`)}
              </h1>
              <p className="text-white/55 italic text-lg">{t(`${brandSlug}.tagline`)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── İstatistikler ── */}
      <section className="bg-zinc-950 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-400 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Açıklama + Hizmetler + Sidebar ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Ana İçerik */}
            <div className="lg:col-span-2 space-y-12">
              {/* Genel Açıklama */}
              <div>
                <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
                  {t(`${brandSlug}.name`)} Hakkında
                </h2>
                <p className="text-zinc-600 leading-relaxed text-lg">
                  {t(`${brandSlug}.description`)}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-8">
                {data.highlights.map((h) => (
                  <div key={h.title} className="border-l-2 border-zinc-200 pl-6">
                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">{h.title}</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed">{h.body}</p>
                  </div>
                ))}
              </div>

              {/* Hizmetler */}
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-5">
                  Sunduğumuz Hizmetler
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <div
                      key={service}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-zinc-200 hover:border-zinc-400 hover:shadow-sm transition-all"
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
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
                        className="flex items-center justify-between py-2.5 text-sm text-zinc-600 hover:text-zinc-900 border-b border-zinc-200 last:border-0"
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

      {/* ── Galeri ── */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-8">Fotoğraf Galerisi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {data.gallery.map((photo) => (
              <figure
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200 group"
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-600 group-hover:scale-[1.07]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[11px] font-semibold text-white/95 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">{contact("hero")}</h2>
          <p className="text-zinc-400 mb-8">{contact("subtitle")}</p>
          <Link
            href={`/${locale}/iletisim`}
            className="inline-flex items-center gap-2 bg-white text-zinc-900 font-semibold px-8 py-4 rounded-xl hover:bg-zinc-100 transition-all"
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
