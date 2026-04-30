import type { MetadataRoute } from "next";

const baseUrl = "https://ozyoglobal.com";
const locales = ["tr", "en", "ru", "es"];
const brandSlugs = ["dmc", "mice", "production", "location"];

const staticPaths = ["", "/hakkimizda", "/hizmetler", "/markalar", "/iletisim"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
          ),
        },
      });
    }

    for (const slug of brandSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/markalar/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
