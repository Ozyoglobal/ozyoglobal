import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "ru", "es"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
      ru: "/o-nas",
      es: "/sobre-nosotros",
    },
    "/hizmetler": {
      tr: "/hizmetler",
      en: "/services",
      ru: "/uslugi",
      es: "/servicios",
    },
    "/markalar": {
      tr: "/markalar",
      en: "/brands",
      ru: "/brendy",
      es: "/marcas",
    },
    "/markalar/[slug]": {
      tr: "/markalar/[slug]",
      en: "/brands/[slug]",
      ru: "/brendy/[slug]",
      es: "/marcas/[slug]",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
      ru: "/kontakt",
      es: "/contacto",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
