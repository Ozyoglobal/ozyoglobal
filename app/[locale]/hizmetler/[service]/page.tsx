import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const validServices = ["flight", "visa", "transfer", "accommodation", "tours", "guide"] as const;
type ServiceKey = (typeof validServices)[number];

export async function generateStaticParams() {
  return validServices.flatMap((service) =>
    ["tr", "en", "ru", "es"].map((locale) => ({ locale, service }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}): Promise<Metadata> {
  const { locale, service } = await params;
  if (!validServices.includes(service as ServiceKey)) return {};
  const t = await getTranslations({ locale, namespace: "services.items" });
  return { title: t(`${service as ServiceKey}.title`) };
}

// Her hizmet için hero görseli + galeri fotoğrafları
const serviceData: Record<
  ServiceKey,
  { hero: string; gallery: { src: string; caption: string }[] }
> = {
  flight: {
    hero: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=900&q=80",
        caption: "Business Class",
      },
      {
        src: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=900&q=80",
        caption: "Uçuş Rotaları",
      },
      {
        src: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=900&q=80",
        caption: "Terminal & Lounge",
      },
      {
        src: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=900&q=80",
        caption: "Uçuş Operasyonları",
      },
      {
        src: "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=80",
        caption: "Küresel Destinasyonlar",
      },
      {
        src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80",
        caption: "Gökyüzü Manzaraları",
      },
    ],
  },
  visa: {
    hero: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1568383100259-8f2ef2c63fe4?auto=format&fit=crop&w=900&q=80",
        caption: "Pasaport & Belgeler",
      },
      {
        src: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&w=900&q=80",
        caption: "Vize Başvurusu",
      },
      {
        src: "https://images.unsplash.com/photo-1561347981-969c79f4aca2?auto=format&fit=crop&w=900&q=80",
        caption: "Danışmanlık Hizmeti",
      },
      {
        src: "https://images.unsplash.com/photo-1603816245457-5dcd57c1d965?auto=format&fit=crop&w=900&q=80",
        caption: "Schengen Vize",
      },
      {
        src: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=900&q=80",
        caption: "Avrupa Destinasyonları",
      },
      {
        src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
        caption: "Seyahat Sigortası",
      },
    ],
  },
  transfer: {
    hero: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80",
        caption: "VIP Araç Hizmeti",
      },
      {
        src: "https://images.unsplash.com/photo-1613521973937-efce74fa6b44?auto=format&fit=crop&w=900&q=80",
        caption: "Havalimanı Karşılama",
      },
      {
        src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
        caption: "Grup Transferleri",
      },
      {
        src: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80",
        caption: "Otobüs & Minibüs",
      },
      {
        src: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80",
        caption: "Şehir Transferleri",
      },
      {
        src: "https://images.unsplash.com/photo-1583467875263-d50decf7f447?auto=format&fit=crop&w=900&q=80",
        caption: "Lüks Araç Filosu",
      },
    ],
  },
  accommodation: {
    hero: "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
        caption: "Lüks Otel Odaları",
      },
      {
        src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80",
        caption: "Tatil Köyleri",
      },
      {
        src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80",
        caption: "Havuzlu Villalar",
      },
      {
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
        caption: "Premium Residence",
      },
      {
        src: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=900&q=80",
        caption: "Butik Oteller",
      },
      {
        src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
        caption: "Otel Lobisi",
      },
    ],
  },
  tours: {
    hero: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
        caption: "İstanbul Turu",
      },
      {
        src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
        caption: "Doğa & Maceralı Turlar",
      },
      {
        src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=900&q=80",
        caption: "Kültürel Turlar",
      },
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
        caption: "Dağ & Trekking Turları",
      },
      {
        src: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=900&q=80",
        caption: "Grup Turları",
      },
      {
        src: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=900&q=80",
        caption: "Deniz Turları",
      },
    ],
  },
  guide: {
    hero: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
        caption: "Rehber Eğitimleri",
      },
      {
        src: "https://images.unsplash.com/photo-1543013309-0d1f4edeb868?auto=format&fit=crop&w=900&q=80",
        caption: "Çok Dilli Rehberler",
      },
      {
        src: "https://images.unsplash.com/photo-1574084348-a0dc30786e9e?auto=format&fit=crop&w=900&q=80",
        caption: "Müze & Tarihi Mekan Turları",
      },
      {
        src: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80",
        caption: "Kültürel Deneyimler",
      },
      {
        src: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=900&q=80",
        caption: "Geceleri Şehir Turları",
      },
      {
        src: "https://images.unsplash.com/photo-1554581621-64532fcf7c7b?auto=format&fit=crop&w=900&q=80",
        caption: "Uzman Rehber Ekibi",
      },
    ],
  },
};

const serviceFeatures: Record<ServiceKey, string[]> = {
  flight: [
    "Dünya genelinde 500+ havayolu ile anlaşmalı",
    "Business & First Class rezervasyonları",
    "Grup ve charter uçuş organizasyonu",
    "Son dakika uçuş yönetimi",
    "Havalimanı lounge erişimi",
    "24/7 uçuş takip sistemi",
  ],
  visa: [
    "Schengen, ABD, UK ve 60+ ülke için vize",
    "Acele/Express vize başvurusu",
    "Gerekli belge hazırlama danışmanlığı",
    "Büyükelçilik randevu takibi",
    "İş ve turizm vizesi ayrımı",
    "Vize ret durumunda itiraz desteği",
  ],
  transfer: [
    "VIP ve standart araç alternatifleri",
    "Havalimanı karşılama ve uğurlama",
    "Grup transferi için lüks otobüsler",
    "Özel sürücü ve tercüman desteği",
    "7/24 araç takip sistemi",
    "Kapasite: 1 kişiden 500+ gruba",
  ],
  accommodation: [
    "5 yıldızlı otel anlaşmaları",
    "Butik ve resort otel seçenekleri",
    "Villa ve private residence kiralama",
    "Erken check-in / geç check-out kolaylığı",
    "MICE konaklamalarında özel fiyatlar",
    "Misafir VIP karşılama hizmetleri",
  ],
  tours: [
    "Kültürel ve tarihi tur programları",
    "Macera ve doğa turları",
    "Gastronomi ve şarap turları",
    "Fotografi turları",
    "Lüks yat ve tekne turları",
    "Özel küçük grup turları (max 8 kişi)",
  ],
  guide: [
    "15+ dil konuşabilen rehber kadrosu",
    "Sertifikalı kültür ve sanat rehberleri",
    "Müze & arkeolojik alan uzmanları",
    "Kulakiçi rehber sistemi (audio guide)",
    "Gastronomi rehberleri",
    "Özel gece turu rehberliği",
  ],
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { locale, service } = await params;

  if (!validServices.includes(service as ServiceKey)) {
    notFound();
  }

  const svc = service as ServiceKey;
  const t = await getTranslations({ locale, namespace: "services" });
  const items = await getTranslations({ locale, namespace: "services.items" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const contact = await getTranslations({ locale, namespace: "contact" });
  const common = await getTranslations({ locale, namespace: "common" });

  const data = serviceData[svc];
  const features = serviceFeatures[svc];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <Image
          src={data.hero}
          alt={items(`${svc}.title`)}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/40 mb-8">
            <Link href={`/${locale}`} className="hover:text-white/60">{nav("home")}</Link>
            <span>/</span>
            <Link href={`/${locale}/hizmetler`} className="hover:text-white/60">{t("title")}</Link>
            <span>/</span>
            <span className="text-white/60">{items(`${svc}.title`)}</span>
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
            {t("title")}
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            {items(`${svc}.title`)}
          </h1>
          <p className="text-white/65 text-lg max-w-2xl">
            {items(`${svc}.desc`)}
          </p>
        </div>
      </section>

      {/* Özellikler + Galeri */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sol: özellikler */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
                Neler Sunuyoruz?
              </h2>
              <ul className="space-y-3">
                {features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-sm text-zinc-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-10 bg-zinc-950 rounded-3xl p-8 text-white">
                <h3 className="text-lg font-semibold mb-2">{contact("hero")}</h3>
                <p className="text-zinc-400 text-sm mb-5">{contact("subtitle")}</p>
                <Link
                  href={`/${locale}/iletisim`}
                  className="block text-center bg-white text-zinc-900 font-semibold px-6 py-3 rounded-xl hover:bg-zinc-100 transition-all text-sm"
                >
                  {common("contactUs")}
                </Link>
              </div>
            </div>

            {/* Sağ: galeri */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-zinc-900 mb-6">
                Hizmet Galerisi
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data.gallery.map((photo) => (
                  <figure
                    key={photo.src}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 group"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 22vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-[11px] font-medium text-white/90 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diğer hizmetler */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">Diğer Hizmetlerimiz</h2>
          <div className="flex flex-wrap gap-3">
            {validServices
              .filter((s) => s !== svc)
              .map((s) => (
                <Link
                  key={s}
                  href={`/${locale}/hizmetler/${s}`}
                  className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 transition-all"
                >
                  {items(`${s}.title`)}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
