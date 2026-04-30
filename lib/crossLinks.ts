/** Marka → ilgili hizmet detay slug’ları */
export const BRAND_RELATED_SERVICES = {
  dmc: ["flight", "visa", "transfer", "accommodation", "tours", "guide"],
  mice: ["flight", "visa", "transfer", "accommodation", "tours"],
  production: ["visa", "transfer", "accommodation", "flight"],
  location: ["accommodation", "transfer", "tours", "guide"],
} as const;

/** Hizmet → ilgili marka slug’ları */
export const SERVICE_RELATED_BRANDS = {
  flight: ["dmc", "mice", "production"],
  visa: ["production", "dmc"],
  transfer: ["dmc", "mice", "production", "location"],
  accommodation: ["dmc", "mice", "production", "location"],
  tours: ["dmc", "location"],
  guide: ["dmc"],
} as const;

export type BrandSlugForCrossLink = keyof typeof BRAND_RELATED_SERVICES;
export type ServiceKeyForCrossLink = keyof typeof SERVICE_RELATED_BRANDS;
