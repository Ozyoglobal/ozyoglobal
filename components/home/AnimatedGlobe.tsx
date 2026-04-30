"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let phi = 0;
    let rafId: number;
    let currentSize = 0;

    function initGlobe(size: number) {
      currentSize = size;
      const pixelSize = size * dpr;

      const globe = createGlobe(canvas!, {
        width: pixelSize,
        height: pixelSize,
        phi,
        theta: 0.2,
        dark: 1,
        diffuse: 0.5,
        mapSamples: 18000,
        mapBrightness: 2.0,
        baseColor: [0.07, 0.07, 0.07],
        markerColor: [1, 1, 1],
        glowColor: [0.14, 0.14, 0.14],
        devicePixelRatio: dpr,
        scale: 1.05,
        markers: [
          { location: [41.0082, 28.9784], size: 0.1 },   // İstanbul
          { location: [48.8566, 2.3522], size: 0.07 },    // Paris
          { location: [51.5074, -0.1278], size: 0.07 },   // Londra
          { location: [52.52, 13.405], size: 0.06 },      // Berlin
          { location: [41.9028, 12.4964], size: 0.07 },   // Roma
          { location: [40.4168, -3.7038], size: 0.06 },   // Madrid
          { location: [25.2048, 55.2708], size: 0.09 },   // Dubai
          { location: [24.7136, 46.6753], size: 0.07 },   // Riyad
          { location: [40.7128, -74.006], size: 0.08 },   // New York
          { location: [34.0522, -118.2437], size: 0.07 }, // LA
          { location: [35.6762, 139.6503], size: 0.08 },  // Tokyo
          { location: [1.3521, 103.8198], size: 0.07 },   // Singapur
          { location: [22.3193, 114.1694], size: 0.07 },  // Hong Kong
          { location: [28.6139, 77.209], size: 0.06 },    // Delhi
          { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
          { location: [30.0444, 31.2357], size: 0.06 },   // Kahire
          { location: [-23.5505, -46.6333], size: 0.06 }, // São Paulo
        ],
      });

      function animate() {
        phi += 0.003;
        globe.update({ phi });
        rafId = requestAnimationFrame(animate);
      }
      rafId = requestAnimationFrame(animate);

      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      }, 200);

      return globe;
    }

    const size = container.offsetWidth;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    let globe = initGlobe(size);

    // Ekran boyutu değişince yeniden başlat (ör. rotasyon)
    const ro = new ResizeObserver((entries) => {
      const newSize = entries[0].contentRect.width;
      if (Math.abs(newSize - currentSize) > 20) {
        cancelAnimationFrame(rafId);
        globe.destroy();
        canvas!.width = newSize * dpr;
        canvas!.height = newSize * dpr;
        canvas!.style.width = `${newSize}px`;
        canvas!.style.height = `${newSize}px`;
        globe = initGlobe(newSize);
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
        // Mobilde: altta ortada, içeriğin arkasında
        "bottom-0 left-1/2 -translate-x-1/2 w-[min(100vw,480px)]",
        "opacity-30",
        // md+: sağda ortalanmış, tam yükseklik
        "md:bottom-auto md:top-0 md:left-auto md:translate-x-0 md:right-0",
        "md:w-[55%] lg:w-[52%] xl:w-[50%]",
        "md:h-full md:flex md:items-center md:opacity-100",
      ].join(" ")}
    >
      <canvas
        ref={canvasRef}
        className="aspect-square w-full"
        style={{
          opacity: 0,
          transition: "opacity 1.4s ease",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 65% 50%, black 45%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 65% 50%, black 45%, transparent 100%)",
        }}
      />
    </div>
  );
}
