"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { m } from "motion/react";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    let globe: ReturnType<typeof createGlobe> | undefined;
    let frame = 0;
    let started = false;

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const start = () => {
      if (started || !canvasRef.current) return;
      started = true;
      width = canvasRef.current.offsetWidth;
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 8000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [{ location: [-23.55, -46.63], size: 0.08 }],
      });

      const animate = () => {
        if (!pointerInteracting.current) phi += 0.005;
        globe!.update({
          phi: phi + pointerInteractionMovement.current,
          width: width * 2,
          height: width * 2,
        });
        frame = requestAnimationFrame(animate);
      };
      animate();

      setTimeout(() => {
        if (canvasRef.current) canvasRef.current.style.opacity = "1";
      }, 0);
    };

    const stop = () => {
      if (!started) return;
      started = false;
      cancelAnimationFrame(frame);
      globe?.destroy();
      globe = undefined;
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { threshold: 0.1 }
    );
    if (canvasRef.current) io.observe(canvasRef.current);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      stop();
    };
  }, []);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: "1 / 1",
        margin: "auto",
        position: "relative",
      }}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          maskImage:
            "radial-gradient(circle at 50% 50%, white 90%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, white 90%, transparent 100%)",
        }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta / 200;
            }
          }}
          style={{
            width: "100%",
            height: "100%",
            cursor: "grab",
            contain: "layout paint size",
            opacity: 0,
            transition: "opacity 1s ease",
          }}
        />
      </m.div>
    </div>
  );
}
