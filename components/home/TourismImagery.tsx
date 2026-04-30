"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const tourismPhotos = [
  {
    // İstanbul — Galata Kulesi ve Boğaz
    src: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=80",
    altKey: "cap1" as const,
  },
  {
    // Dubai gece silüeti
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    altKey: "cap2" as const,
  },
  {
    // Paris — Eyfel Kulesi
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    altKey: "cap3" as const,
  },
  {
    // Tokyo — şehir panoraması
    src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
    altKey: "cap4" as const,
  },
] as const;

export function TourismImagery() {
  const t = useTranslations("home.imagery");

  return (
    <section className="border-y border-zinc-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">{t("subtitle")}</p>
        </div>

        {/* Masaüstü: flex row + geniş alt şerit | Mobil: dikey liste */}
        <div className="flex flex-col gap-4 md:h-[540px]">
          <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
            {/* Büyük sol panel */}
            <figure className="relative min-h-[260px] flex-[2] overflow-hidden rounded-2xl bg-zinc-100 md:min-h-0">
              <Image
                src={tourismPhotos[0].src}
                alt={t(`captions.${tourismPhotos[0].altKey}`)}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                priority
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 pt-16 text-left text-xs font-semibold text-white/95">
                {t(`captions.${tourismPhotos[0].altKey}`)}
              </figcaption>
            </figure>

            {/* Sağ iki küçük panel */}
            <div className="flex min-h-0 flex-1 flex-col gap-4">
              <figure className="relative min-h-[180px] flex-1 overflow-hidden rounded-2xl bg-zinc-100 md:min-h-0">
                <Image
                  src={tourismPhotos[1].src}
                  alt={t(`captions.${tourismPhotos[1].altKey}`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 text-left text-[11px] font-semibold text-white/95">
                  {t(`captions.${tourismPhotos[1].altKey}`)}
                </figcaption>
              </figure>

              <figure className="relative min-h-[180px] flex-1 overflow-hidden rounded-2xl bg-zinc-100 md:min-h-0">
                <Image
                  src={tourismPhotos[2].src}
                  alt={t(`captions.${tourismPhotos[2].altKey}`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 text-left text-[11px] font-semibold text-white/95">
                  {t(`captions.${tourismPhotos[2].altKey}`)}
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Altta geniş şerit */}
          <figure className="relative h-[220px] shrink-0 overflow-hidden rounded-2xl bg-zinc-100 md:h-[38%]">
            <Image
              src={tourismPhotos[3].src}
              alt={t(`captions.${tourismPhotos[3].altKey}`)}
              fill
              sizes="100vw"
              className="object-cover object-[center_40%] transition-transform duration-700 hover:scale-[1.02]"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 pt-14 text-left text-xs font-semibold text-white/95">
              {t(`captions.${tourismPhotos[3].altKey}`)}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
