import Image from "next/image";
import { Section } from "@/components/section";
import type { Dictionary } from "@/i18n/dictionaries";

export function About({ about }: { about: Dictionary["about"] }) {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {about.title}
        </h2>
        <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-2xl border border-border bg-card sm:w-80 md:mx-0 md:w-[28rem] md:row-span-2 md:self-center">
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
    </Section>
  );
}
