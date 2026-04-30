"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS = [
  { location: [41.0082,  28.9784] as [number, number], size: 0.10 }, // İstanbul
  { location: [48.8566,   2.3522] as [number, number], size: 0.07 }, // Paris
  { location: [51.5074,  -0.1278] as [number, number], size: 0.07 }, // Londra
  { location: [52.5200,  13.4050] as [number, number], size: 0.06 }, // Berlin
  { location: [41.9028,  12.4964] as [number, number], size: 0.07 }, // Roma
  { location: [40.4168,  -3.7038] as [number, number], size: 0.06 }, // Madrid
  { location: [25.2048,  55.2708] as [number, number], size: 0.09 }, // Dubai
  { location: [24.7136,  46.6753] as [number, number], size: 0.07 }, // Riyad
  { location: [40.7128, -74.0060] as [number, number], size: 0.08 }, // New York
  { location: [34.0522,-118.2437] as [number, number], size: 0.07 }, // LA
  { location: [35.6762, 139.6503] as [number, number], size: 0.08 }, // Tokyo
  { location: [ 1.3521, 103.8198] as [number, number], size: 0.07 }, // Singapur
  { location: [22.3193, 114.1694] as [number, number], size: 0.07 }, // Hong Kong
  { location: [28.6139,  77.2090] as [number, number], size: 0.06 }, // Delhi
  { location:[-33.8688, 151.2093] as [number, number], size: 0.06 }, // Sydney
  { location: [30.0444,  31.2357] as [number, number], size: 0.06 }, // Kahire
  { location:[-23.5505, -46.6333] as [number, number], size: 0.06 }, // São Paulo
] as const;

const THETA = 0.20;
const GSCALE = 1.05;

export function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let phi  = 0;
    let rafId: number;
    let cssSize = container.offsetWidth;

    function resizeCanvas(size: number) {
      cssSize = size;
      canvas!.width  = size * dpr;
      canvas!.height = size * dpr;
      canvas!.style.width  = `${size}px`;
      canvas!.style.height = `${size}px`;
    }
    resizeCanvas(cssSize);

    const globe = createGlobe(canvas, {
      width:           cssSize * dpr,
      height:          cssSize * dpr,
      phi,
      theta:           THETA,
      dark:            1,
      diffuse:         0.6,
      mapSamples:      22000,
      mapBrightness:   3.2,
      baseColor:       [0.06, 0.06, 0.06],   // çok koyu gri — siyah zemin
      markerColor:     [1.0,  1.0,  1.0],    // saf beyaz marker
      glowColor:       [0.18, 0.18, 0.18],   // nötr gri parıltı
      devicePixelRatio: dpr,
      scale:           GSCALE,
      markers:         MARKERS.map((m) => ({ location: m.location, size: m.size })),
    });

    function animate() {
      phi += 0.003;
      globe.update({ phi });
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    }, 300);

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

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={[
        "pointer-events-none absolute",
        // Mobil: alt orta, yarı saydam
        "bottom-0 left-1/2 -translate-x-1/2",
        "w-[min(100vw,520px)] opacity-45",
        // md+: sağda tam görünür
        "md:bottom-auto md:top-0 md:left-auto md:translate-x-0",
        "md:right-0 md:w-[58%] lg:w-[54%] xl:w-[52%]",
        "md:h-full md:flex md:items-center md:opacity-100",
      ].join(" ")}
    >
      <canvas
        ref={canvasRef}
        className="aspect-square w-full"
        style={{
          opacity: 0,
          transition: "opacity 1.6s ease",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 78% at 64% 50%, black 40%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 78% 78% at 64% 50%, black 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
