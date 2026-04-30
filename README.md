# Ozyo Global DMC – Kurumsal Website

Modern, çok dilli (TR/EN/RU/ES) Next.js kurumsal web sitesi.

## Özellikler

- **4 dil desteği**: Türkçe (varsayılan), İngilizce, Rusça, İspanyolca
- **4 alt marka sayfası**: DMC, MICE, Production, Location
- **Sayfalar**: Anasayfa, Hakkımızda, Hizmetler, Markalar, İletişim
- **SEO**: sitemap.xml, robots.txt, hreflang, Open Graph
- **Modern UI**: Siyah-beyaz minimal kimlik, responsive, Tailwind CSS 4
- **Statik ağırlıklı**: Next.js App Router + next-intl

## Kurulum

```bash
npm install
npm run dev        # Geliştirme: http://localhost:3000
npm run build      # Production build
npm run start      # Production sunucu
```

## Proje Yapısı

```
ozyo-global/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Locale layout (Header + Footer)
│   │   ├── page.tsx            # Anasayfa
│   │   ├── hakkimizda/         # Hakkımızda sayfası
│   │   ├── hizmetler/          # Hizmetler sayfası
│   │   ├── markalar/           # Alt markalar listesi
│   │   │   └── [slug]/         # Alt marka detay (dmc/mice/production/location)
│   │   └── iletisim/           # İletişim formu
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header + dil seçici
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── StatsSection.tsx
│   │   ├── BrandsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   └── CtaSection.tsx
│   └── ContactForm.tsx
├── messages/
│   ├── tr.json                 # Türkçe (kaynak)
│   ├── en.json
│   ├── ru.json
│   └── es.json
├── i18n/
│   ├── routing.ts
│   └── request.ts
└── proxy.ts                    # next-intl routing proxy
```

## İçerik Güncellemesi

Tüm metinler `messages/*.json` dosyalarından yönetilir. Türkçe ana dil olduğu için `tr.json`'dan başlanmalıdır.

## İletişim Formu (Backend Entegrasyonu)

`components/ContactForm.tsx` içindeki `handleSubmit` fonksiyonunu gerçek bir API endpoint'i ile bağlayabilirsiniz. Önerilen: [Resend](https://resend.com) (paket zaten kurulu).

## GitHub

- **Organizasyon / kullanıcı**: [Ozyoglobal](https://github.com/Ozyoglobal)
- **Depo**: [Ozyoglobal/ozyoglobal](https://github.com/Ozyoglobal/ozyoglobal)

Depo kökü `ozyo-global/`. `origin` genelde şu adrestir:

```bash
cd ozyo-global
git remote add origin https://github.com/Ozyoglobal/ozyoglobal.git   # yoksa
git push -u origin main
```

SSH: `git@github.com:Ozyoglobal/ozyoglobal.git`

Push için GitHub’da bu repoya yazma yetkisi olan hesap ile giriş yapılmalıdır (HTTPS’te yanlış kayıtlı kimlik 403 verir; gerekirse [kişisel erişim belirteci](https://github.com/settings/tokens) veya SSH anahtarı kullanın).

## Dağıtım (Deploy)

[Vercel](https://vercel.com) ile en kolay deploy edilir:
```bash
npm i -g vercel
vercel
```
