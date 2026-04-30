import { routing } from "@/i18n/routing";
import { Hero } from "@/components/home/Hero";
import { TourismImagery } from "@/components/home/TourismImagery";
import { StatsSection } from "@/components/home/StatsSection";
import { BrandsSection } from "@/components/home/BrandsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CtaSection } from "@/components/home/CtaSection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: "Ozyo Global DMC – Global Turizm Çözümleri",
    description: t("hero.subtitle"),
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TourismImagery />
      <StatsSection />
      <BrandsSection />
      <ServicesSection />
      <AboutSection />
      <CtaSection />
    </>
  );
}
