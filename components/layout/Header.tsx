"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { telHref } from "@/lib/contact";

const localeLabels: Record<string, string> = {
  tr: "TR",
  en: "EN",
  ru: "RU",
  es: "ES",
};

const serviceKeys = ["flight", "visa", "transfer", "accommodation", "tours", "guide"] as const;

const brandSlugs = ["dmc", "mice", "production", "location"] as const;

export function Header() {
  const t = useTranslations("nav");
  const tServices = useTranslations("services");
  const tItems = useTranslations("services.items");
  const tBrands = useTranslations("brands");
  const tContact = useTranslations("contact");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const locales = ["tr", "en", "ru", "es"];

  const getLocalePath = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    return "/" + segments.join("/");
  };

  const servicesHref = `/${locale}/hizmetler`;
  const brandsHref = `/${locale}/markalar`;

  const isHomePage = pathname === `/${locale}` || pathname === "/";
  const isDark = isHomePage && !scrolled;

  const navMuted = isDark ? "text-white/80 hover:text-white" : "text-zinc-600 hover:text-zinc-900";

  const megaSurface =
    "rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-black/[0.04]";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-sm"
          : isHomePage
          ? "bg-transparent"
          : "bg-white border-b border-zinc-200"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href={`/${locale}`} className="flex shrink-0 items-center">
            <BrandLogo variant={isDark ? "onDark" : "onLight"} priority />
          </Link>

          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link href={`/${locale}`} className={cn("text-sm font-medium tracking-wide px-2 py-2", navMuted)}>
              {t("home")}
            </Link>
            <Link href={`/${locale}/hakkimizda`} className={cn("text-sm font-medium tracking-wide px-2 py-2", navMuted)}>
              {t("about")}
            </Link>

            <div className="group/nav-services relative">
              <Link
                href={servicesHref}
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium tracking-wide px-2 py-2 rounded-lg",
                  navMuted
                )}
              >
                {t("services")}
                <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-200 group-hover/nav-services:rotate-180" />
              </Link>
              <div
                className={cn(
                  "pointer-events-none invisible opacity-0 transition-all duration-200",
                  "group-hover/nav-services:pointer-events-auto group-hover/nav-services:visible group-hover/nav-services:opacity-100",
                  "absolute left-1/2 top-full z-50 w-[min(92vw,640px)] -translate-x-1/2 pt-3"
                )}
              >
                <div className={cn(megaSurface, "p-6 lg:p-8")}>
                  <div className="flex items-start justify-between gap-6 border-b border-zinc-100 pb-5 mb-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        {tServices("title")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">{tServices("hero")}</p>
                      <p className="mt-1 max-w-sm text-xs text-zinc-500 leading-relaxed">{tServices("subtitle")}</p>
                    </div>
                    <Link
                      href={servicesHref}
                      className="shrink-0 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-700"
                    >
                      {tServices("title")}
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {serviceKeys.map((key) => (
                      <Link
                        key={key}
                        href={`${servicesHref}#svc-${key}`}
                        className="group/item rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 transition-colors hover:border-zinc-300 hover:bg-white"
                      >
                        <div className="text-sm font-semibold text-zinc-900 group-hover/item:text-zinc-950">
                          {tItems(`${key}.title`)}
                        </div>
                        <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                          {tItems(`${key}.desc`)}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="group/nav-brands relative">
              <Link
                href={brandsHref}
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium tracking-wide px-2 py-2 rounded-lg",
                  navMuted
                )}
              >
                {t("brands")}
                <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-200 group-hover/nav-brands:rotate-180" />
              </Link>
              <div
                className={cn(
                  "pointer-events-none invisible opacity-0 transition-all duration-200",
                  "group-hover/nav-brands:pointer-events-auto group-hover/nav-brands:visible group-hover/nav-brands:opacity-100",
                  "absolute left-1/2 top-full z-50 w-[min(92vw,720px)] -translate-x-1/2 pt-3"
                )}
              >
                <div className={cn(megaSurface, "p-6 lg:p-8")}>
                  <div className="flex items-start justify-between gap-6 border-b border-zinc-100 pb-5 mb-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        {tBrands("title")}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">{tBrands("hero")}</p>
                      <p className="mt-1 max-w-md text-xs text-zinc-500 leading-relaxed">{tBrands("subtitle")}</p>
                    </div>
                    <Link
                      href={brandsHref}
                      className="shrink-0 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-700"
                    >
                      {tBrands("title")}
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {brandSlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/${locale}/markalar/${slug}`}
                        className="group/card flex gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-5 transition-colors hover:border-zinc-300 hover:bg-white"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-xs font-bold text-white">
                          {slug.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-zinc-900">{tBrands(`${slug}.name`)}</div>
                          <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                            {tBrands(`${slug}.tagline`)}
                          </div>
                          <div className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                            {tBrands(`${slug}.short`)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href={`/${locale}/iletisim`} className={cn("text-sm font-medium tracking-wide px-2 py-2", navMuted)}>
              {t("contact")}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={telHref(tContact("info.phone"))}
              className={cn("text-sm font-medium tracking-wide whitespace-nowrap", navMuted)}
            >
              {tContact("info.phone")}
            </a>
            <a
              href={`mailto:${tContact("info.email")}`}
              className={cn("text-sm font-medium", navMuted)}
              aria-label={tContact("info.email")}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  "text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors",
                  isDark
                    ? "border-white/30 text-white hover:bg-white/10"
                    : "border-zinc-300 text-zinc-600 hover:bg-zinc-50"
                )}
              >
                {localeLabels[locale]} ▾
              </button>
              {langOpen && (
                <div className="absolute right-0 z-50 mt-2 w-28 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
                  {locales.map((loc) => (
                    <Link
                      key={loc}
                      href={getLocalePath(loc)}
                      onClick={() => setLangOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-zinc-50",
                        loc === locale ? "font-semibold text-zinc-900" : "text-zinc-600"
                      )}
                    >
                      {localeLabels[loc]}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/iletisim`}
              className={cn(
                "text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200",
                isDark ? "bg-white text-zinc-900 hover:bg-zinc-100" : "bg-zinc-900 text-white hover:bg-zinc-700"
              )}
            >
              {t("getQuote")}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn("md:hidden p-2 rounded-lg", isDark ? "text-white" : "text-zinc-700")}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden max-h-[85vh] overflow-y-auto border-t border-zinc-200 bg-white shadow-lg">
          <div className="space-y-1 px-4 py-4">
            <Link
              href={`/${locale}`}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/hakkimizda`}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              {t("about")}
            </Link>

            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              {t("services")}
              <ChevronDown className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-2 space-y-1 border-l border-zinc-200 pl-3">
                <Link
                  href={servicesHref}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-xs font-semibold text-zinc-900"
                >
                  {tServices("title")}
                </Link>
                {serviceKeys.map((key) => (
                  <Link
                    key={key}
                    href={`${servicesHref}#svc-${key}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-xs text-zinc-600 hover:text-zinc-900"
                  >
                    {tItems(`${key}.title`)}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileBrandsOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              {t("brands")}
              <ChevronDown className={cn("h-4 w-4 transition-transform", mobileBrandsOpen && "rotate-180")} />
            </button>
            {mobileBrandsOpen && (
              <div className="ml-2 space-y-1 border-l border-zinc-200 pl-3">
                <Link
                  href={brandsHref}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-xs font-semibold text-zinc-900"
                >
                  {tBrands("title")}
                </Link>
                {brandSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/${locale}/markalar/${slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-xs text-zinc-600 hover:text-zinc-900"
                  >
                    {tBrands(`${slug}.name`)}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href={`/${locale}/iletisim`}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              {t("contact")}
            </Link>

            <a
              href={telHref(tContact("info.phone"))}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              {tContact("info.phone")}
            </a>
            <a
              href={`mailto:${tContact("info.email")}`}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 break-all"
            >
              {tContact("info.email")}
            </a>

            <div className="flex flex-wrap gap-3 border-t border-zinc-100 pt-3 mt-3">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={getLocalePath(loc)}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-semibold",
                    loc === locale ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 text-zinc-500 hover:bg-zinc-50"
                  )}
                >
                  {localeLabels[loc]}
                </Link>
              ))}
            </div>
            <Link
              href={`/${locale}/iletisim`}
              onClick={() => setMenuOpen(false)}
              className="mt-3 block rounded-xl bg-zinc-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-700"
            >
              {t("getQuote")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
