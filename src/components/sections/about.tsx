"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { m } from "motion/react";
import { Section } from "@/components/section";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/routing";

export function About({
  about,
  locale,
}: {
  about: Dictionary["about"];
  locale: Locale;
}) {
  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const lastClick = useRef(0);

  const handlePhotoClick = () => {
    const now = Date.now();
    const next = now - lastClick.current > 1500 ? 1 : count + 1;
    lastClick.current = now;
    if (next >= 5) {
      setShowPopup(true);
      setCount(0);
    } else {
      setCount(next);
    }
  };

  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {about.title}
        </h2>
        <div
          onClick={handlePhotoClick}
          role="button"
          tabIndex={0}
          aria-label="Foto de Igor Dias"
          className="relative mx-auto aspect-square w-64 cursor-pointer overflow-hidden rounded-2xl border border-border bg-card sm:w-80 md:mx-0 md:w-[28rem] md:row-span-2 md:self-center"
        >
          <Image
            src="/about/igor.webp"
            alt="Foto de Igor Dias"
            fill
            sizes="(max-width: 768px) 14rem, 18rem"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="shine absolute inset-y-0 left-[-60%] w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        </div>
        <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-muted text-justify">
          {about.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <m.div
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-2xl border border-border bg-card px-8 py-10 text-center shadow-xl"
          >
            <p className="text-3xl font-semibold text-foreground">
              {locale === "en" ? "Hello !" : "Oi :)"}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-6 inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-background"
            >
              Fechar
            </button>
          </m.div>
        </div>
      )}
    </Section>
  );
}
