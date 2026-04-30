/** Harita araması için sabit adres (Latin karakterler tüm bölgelerde çalışır) */
export const MAPS_SEARCH_QUERY =
  "Caferağa, Moda Cd. Yasemin Apt No:79 D1, 34722 Kadıköy, Istanbul, Turkey";

export function googleMapsSearchUrl(query = MAPS_SEARCH_QUERY): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Gösterim biçiminden tel: URI üretir */
export function telHref(phoneDisplay: string): string {
  const digits = phoneDisplay.replace(/\s/g, "");
  return `tel:${digits}`;
}
