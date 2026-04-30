"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = canvas.offsetWidth * (window.devicePixelRatio || 1);
    let phi = 0;
    let rafId: number;

    const globe = createGlobe(canvas, {
      width: size,
      height: size,
      phi,
      theta: 0.22,
      dark: 1,
      diffuse: 0.5,
      mapSamples: 22000,
      mapBrightness: 2.0,
      baseColor: [0.08, 0.08, 0.08],
      markerColor: [1, 1, 1],
      glowColor: [0.15, 0.15, 0.15],
      devicePixelRatio: window.devicePixelRatio || 1,
      scale: 1.08,
      markers: [
        // Avrupa
        { location: [48.8566, 2.3522], size: 0.07 },
        { location: [51.5074, -0.1278], size: 0.07 },
        { location: [41.0082, 28.9784], size: 0.1 },
        { location: [52.52, 13.405], size: 0.06 },
        { location: [41.9028, 12.4964], size: 0.07 },
        { location: [40.4168, -3.7038], size: 0.06 },
        { location: [37.9838, 23.7275], size: 0.05 },
        // Orta Doğu
        { location: [25.2048, 55.2708], size: 0.09 },
        { location: [24.7136, 46.6753], size: 0.07 },
        { location: [31.7683, 35.2137], size: 0.05 },
        // Amerika
        { location: [40.7128, -74.006], size: 0.08 },
        { location: [34.0522, -118.2437], size: 0.07 },
        { location: [-23.5505, -46.6333], size: 0.06 },
        // Uzak Doğu
        { location: [35.6762, 139.6503], size: 0.08 },
        { location: [1.3521, 103.8198], size: 0.07 },
        { location: [22.3193, 114.1694], size: 0.07 },
        { location: [37.5665, 126.978], size: 0.06 },
        { location: [28.6139, 77.209], size: 0.06 },
        // Afrika
        { location: [-33.9249, 18.4241], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.06 },
        // Avustralya
        { location: [-33.8688, 151.2093], size: 0.06 },
      ],
    });

    function animate() {
      phi += 0.003;
      globe.update({ phi });
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    // Fade-in
    setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    }, 200);

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 flex
                 items-center justify-end
                 w-full md:w-[65%] lg:w-[58%]"
    >
      <canvas
        ref={canvasRef}
        className="aspect-square w-full max-w-[750px]"
        style={{
          opacity: 0,
          transition: "opacity 1.4s ease",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 78% at 68% 50%, black 50%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 78% 78% at 68% 50%, black 50%, transparent 100%)",
        }}
      />
    </div>
  );
}
