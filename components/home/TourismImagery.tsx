"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const tourismPhotos = [
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    altKey: "cap1" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    altKey: "cap2" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    altKey: "cap3" as const,
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
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

        <div className="flex flex-col gap-4 md:h-[560px]">
          <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
            <figure className="relative min-h-[280px] flex-[2] overflow-hidden rounded-2xl bg-zinc-100 md:min-h-0">
              <Image
                src={tourismPhotos[0].src}
                alt={t(`captions.${tourismPhotos[0].altKey}`)}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                priority
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-16 text-left text-xs font-medium text-white/95">
                {t(`captions.${tourismPhotos[0].altKey}`)}
              </figcaption>
            </figure>

            <div className="flex min-h-0 flex-1 flex-col gap-4">
              <figure className="relative min-h-[180px] flex-1 overflow-hidden rounded-2xl bg-zinc-100 md:min-h-0">
                <Image
                  src={tourismPhotos[1].src}
                  alt={t(`captions.${tourismPhotos[1].altKey}`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-12 text-left text-[11px] font-medium text-white/95">
                  {t(`captions.${tourismPhotos[1].altKey}`)}
                </figcaption>
              </figure>

              <figure className="relative min-h-[180px] flex-1 overflow-hidden rounded-2xl bg-zinc-100 md:min-h-0">
                <Image
                  src={tourismPhotos[2].src}
                  alt={t(`captions.${tourismPhotos[2].altKey}`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-12 text-left text-[11px] font-medium text-white/95">
                  {t(`captions.${tourismPhotos[2].altKey}`)}
                </figcaption>
              </figure>
            </div>
          </div>

          <figure className="relative min-h-[220px] h-[240px] shrink-0 overflow-hidden rounded-2xl bg-zinc-100 md:h-[42%] md:max-h-[240px]">
            <Image
              src={tourismPhotos[3].src}
              alt={t(`captions.${tourismPhotos[3].altKey}`)}
              fill
              sizes="100vw"
              className="object-cover object-[center_42%] transition-transform duration-700 hover:scale-[1.015]"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-5 pt-14 text-left text-xs font-medium text-white/95">
              {t(`captions.${tourismPhotos[3].altKey}`)}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
