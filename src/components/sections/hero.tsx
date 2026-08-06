"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { m, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/routing";
import { useTheme } from "@/components/theme-provider";

const Particles = dynamic(
  () => import("@/components/magicui/particles").then((m) => m.Particles),
  { ssr: false }
);

export function Hero({
  hero,
  locale,
}: {
  hero: Dictionary["hero"];
  locale: Locale;
}) {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const color = mounted && theme === "light" ? "#000000" : "#888888";

  return (
      <section
        id="top"
        className="relative flex min-h-[88vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center sm:py-24"
      >
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl">
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
          className="mt-4 text-sm font-medium uppercase tracking-widest text-muted"
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
            href="#contact"
            aria-label={locale === "en" ? "Contact" : "Contato"}
            className={`inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors ${
              mounted && theme === "light"
                ? "bg-black text-white hover:bg-black/90"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {locale === "en" ? "Contact" : "Contato"}
          </a>
          <a
            href="/cv/igor-dias-curriculum.pdf"
            download
            aria-label={hero.ctaCv}
            className="inline-flex h-11 items-center rounded-full border border-border bg-background/40 px-5 backdrop-blur-md text-sm font-medium transition-colors hover:bg-card"
          >
            Download
          </a>
        </m.div>
      </div>
    </section>
  );
}
