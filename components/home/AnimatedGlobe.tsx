"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

// ── Marker verisi ──────────────────────────────────────────────────────────
const MARKERS = [
  { lat: 41.0082, lon: 28.9784, label: "İstanbul",  size: 0.10 },
  { lat: 48.8566, lon:  2.3522, label: "Paris",     size: 0.08 },
  { lat: 51.5074, lon: -0.1278, label: "London",    size: 0.08 },
  { lat: 52.5200, lon: 13.4050, label: "Berlin",    size: 0.07 },
  { lat: 41.9028, lon: 12.4964, label: "Roma",      size: 0.07 },
  { lat: 40.4168, lon: -3.7038, label: "Madrid",    size: 0.07 },
  { lat: 25.2048, lon: 55.2708, label: "Dubai",     size: 0.10 },
  { lat: 24.7136, lon: 46.6753, label: "Riyad",     size: 0.07 },
  { lat: 40.7128, lon:-74.0060, label: "New York",  size: 0.09 },
  { lat: 34.0522, lon:-118.243, label: "Los Angeles",size:0.07 },
  { lat: 35.6762, lon: 139.650, label: "Tokyo",     size: 0.09 },
  { lat:  1.3521, lon: 103.819, label: "Singapur",  size: 0.08 },
  { lat: 22.3193, lon: 114.169, label: "Hong Kong", size: 0.08 },
  { lat: 28.6139, lon:  77.209, label: "Delhi",     size: 0.07 },
  { lat:-33.8688, lon: 151.209, label: "Sydney",    size: 0.07 },
  { lat: 30.0444, lon:  31.235, label: "Kahire",    size: 0.07 },
  { lat:-23.5505, lon: -46.633, label: "São Paulo", size: 0.07 },
] as const;

// ── Projeksiyon sabitleri ──────────────────────────────────────────────────
const THETA  = 0.20;   // globe dikey eğimi (cobe theta parametresiyle eşleşmeli)
const GSCALE = 1.05;   // cobe scale parametresiyle eşleşmeli

/**
 * 3-D coğrafi koordinatı → 2-D canvas piksel koordinatına dönüştür.
 * cobe koordinat sistemi: lon=0, phi=0 → ön merkez
 */
function project(lat: number, lon: number, phi: number, cssSize: number) {
  const latR = lat * (Math.PI / 180);
  const lonR = lon * (Math.PI / 180);

  // 3-D birim vektör (cobe sistemi: z → izleyiciye)
  const x0 =  Math.cos(latR) * Math.sin(lonR);
  const y0 =  Math.sin(latR);
  const z0 =  Math.cos(latR) * Math.cos(lonR);

  // phi ile Y ekseni etrafında döndür
  const xr =  x0 * Math.cos(phi) - z0 * Math.sin(phi);
  const zr =  x0 * Math.sin(phi) + z0 * Math.cos(phi);

  // theta ile X ekseni etrafında eğ
  const yr =  y0 * Math.cos(THETA) - zr * Math.sin(THETA);
  const zrr = y0 * Math.sin(THETA) + zr * Math.cos(THETA);

  const r  = (cssSize / 2) * GSCALE;
  const cx = cssSize / 2;
  const cy = cssSize / 2;

  return {
    sx:      cx + xr * r,
    sy:      cy - yr * r,
    visible: zrr > 0.08,   // kürenin ön yarısında mı?
    depth:   zrr,           // ne kadar önde (opaklık için)
  };
}

export function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const labelsRef    = useRef<HTMLDivElement>(null);
  // Her marker için ayrı span ref
  const labelElemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    const labelsDiv = labelsRef.current;
    if (!canvas || !container || !labelsDiv) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let phi = 0;
    let rafId: number;
    let cssSize = container.offsetWidth;

    // Canvas boyutunu ayarla
    function resizeCanvas(size: number) {
      cssSize = size;
      canvas!.width  = size * dpr;
      canvas!.height = size * dpr;
      canvas!.style.width  = `${size}px`;
      canvas!.style.height = `${size}px`;
    }
    resizeCanvas(cssSize);

    // Globe oluştur
    const globe = createGlobe(canvas, {
      width:          cssSize * dpr,
      height:         cssSize * dpr,
      phi,
      theta:          THETA,
      dark:           1,
      diffuse:        0.9,
      mapSamples:     22000,
      mapBrightness:  4.5,           // kıta hatları belirgin
      baseColor:      [0.08, 0.09, 0.14],
      markerColor:    [1.0, 0.78, 0.25],  // altın sarısı marker
      glowColor:      [0.22, 0.24, 0.40], // hafif mavimsi parıltı
      devicePixelRatio: dpr,
      scale:          GSCALE,
      markers: MARKERS.map((m) => ({
        location: [m.lat, m.lon] as [number, number],
        size: m.size,
      })),
    });

    // Label güncelleme (doğrudan DOM — React state yok, her frame yeniden render yok)
    function updateLabels() {
      const elems = labelElemsRef.current;
      MARKERS.forEach((m, i) => {
        const el = elems[i];
        if (!el) return;
        const { sx, sy, visible, depth } = project(m.lat, m.lon, phi, cssSize);
        if (visible) {
          const alpha = Math.min(1, (depth - 0.08) * 4);   // kenardan merkeze doğru soluklaş
          el.style.transform   = `translate(${sx}px, ${sy}px) translate(-50%, -180%)`;
          el.style.opacity     = String(alpha.toFixed(2));
          el.style.visibility  = "visible";
        } else {
          el.style.visibility = "hidden";
        }
      });
    }

    function animate() {
      phi += 0.003;
      globe.update({ phi });
      updateLabels();
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    // Fade-in
    setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
      if (labelsDiv) labelsDiv.style.opacity = "1";
    }, 400);

    // ResizeObserver ile ekran döndürme / pencere boyutu değişimine dayan
    let prevSize = cssSize;
    const ro = new ResizeObserver((entries) => {
      const newSize = Math.round(entries[0].contentRect.width);
      if (Math.abs(newSize - prevSize) > 20) {
        prevSize = newSize;
        resizeCanvas(newSize);
        globe.update({ width: newSize * dpr, height: newSize * dpr });
      }
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      ro.disconnect();
    };
  }, []);

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage:
      "radial-gradient(ellipse 78% 78% at 64% 50%, black 40%, transparent 100%)",
    maskImage:
      "radial-gradient(ellipse 78% 78% at 64% 50%, black 40%, transparent 100%)",
  };

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={[
        "pointer-events-none absolute",
        // Mobilde altta soluk arka plan
        "bottom-0 left-1/2 -translate-x-1/2",
        "w-[min(100vw,520px)] opacity-50",
        // md+: sağda tam
        "md:bottom-auto md:top-0 md:left-auto md:translate-x-0",
        "md:right-0 md:w-[58%] lg:w-[54%] xl:w-[52%]",
        "md:h-full md:flex md:items-center md:opacity-100",
      ].join(" ")}
    >
      {/* Dönen küre */}
      <canvas
        ref={canvasRef}
        className="aspect-square w-full"
        style={{
          opacity: 0,
          transition: "opacity 1.6s ease",
          ...maskStyle,
        }}
      />

      {/* Şehir/ülke etiketleri — ayrı div, aynı boyut + aynı mask */}
      <div
        ref={labelsRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          transition: "opacity 1.6s ease",
          ...maskStyle,
        }}
      >
        {MARKERS.map((m, i) => (
          <span
            key={m.label}
            ref={(el) => { labelElemsRef.current[i] = el; }}
            style={{
              position:    "absolute",
              top:         0,
              left:        0,
              visibility:  "hidden",
              whiteSpace:  "nowrap",
              pointerEvents: "none",
              // Görünüm
              fontSize:    "9px",
              fontWeight:  "600",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:       "rgba(255,255,255,0.85)",
              textShadow:  "0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)",
              // Altın dot ile ayırıcı çizgi
              paddingBottom: "3px",
              borderBottom: "1px solid rgba(255,198,64,0.5)",
            }}
          >
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
