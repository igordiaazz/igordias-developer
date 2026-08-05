"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { m, useReducedMotion } from "motion/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import type { Dictionary } from "@/i18n/dictionaries";
import { useTheme } from "@/components/theme-provider";

const PixelBlast = dynamic(() => import("@/components/pixel-blast"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
});

export function Hero({ hero }: { hero: Dictionary["hero"] }) {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : true;

  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      <div className="pointer-events-none absolute -top-14 inset-x-0 bottom-0 -z-10">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color={isDark ? "#374151" : "#9ca3af"}
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
        {isDark && <div className="absolute inset-0 bg-black/60" />}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      <div className="relative z-10 mx-auto w-full max-w-5xl pt-10 sm:pt-0">
        <p className="text-sm font-medium uppercase tracking-widest text-muted">
          {hero.greeting}
        </p>
        <m.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="mt-2 text-7xl font-semibold tracking-tight text-foreground sm:text-9xl"
        >
          {hero.name}
        </m.h1>
        <m.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
          className="mt-4 text-4xl font-light text-muted sm:text-6xl"
        >
          {hero.role}
        </m.p>
        <m.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <a
            href="https://github.com/igordiaazz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 backdrop-blur-md text-sm font-medium transition-colors hover:bg-card"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/igordiaazz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 backdrop-blur-md text-sm font-medium transition-colors hover:bg-card"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href="/cv/igor-dias-curriculum.pdf"
            download
            aria-label={hero.ctaCv}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/40 backdrop-blur-md text-sm font-medium transition-colors hover:bg-card"
          >
            <FiDownload className="h-5 w-5" />
          </a>
        </m.div>
        <div className="relative mx-auto mt-24 w-80 overflow-hidden rounded-2xl sm:hidden">
          <Image
            src="/about/igor.webp"
            alt="Foto de Igor Dias"
            width={320}
            height={320}
            className="h-auto w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        </div>
      </div>
    </section>
  );
}
