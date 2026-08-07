"use client";

import { Section } from "@/components/section";
import dynamic from "next/dynamic";

const Cobe = dynamic(
  () => import("@/components/eldoraui/cobe-globe").then((m) => m.Cobe),
  { ssr: false }
);

type Language = {
  name: string;
  level: string;
  highlight?: boolean;
};

type Props = {
  title: string;
  items: Language[];
};

export function Languages({ title, items }: Props) {
  return (
    <Section id="languages">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="mx-auto w-full max-w-sm">
          <Cobe variant="default" markers={[]} />
        </div>
        <ul className="space-y-4">
          {items.map((lang) => (
            <li
              key={lang.name}
              className="flex items-baseline justify-between gap-4 border-b border-border pb-3"
            >
              <span className="flex items-center gap-1.5 text-lg font-medium">
                {lang.name}
                {lang.highlight ? (
                  <span className="text-accent" aria-label="Proficiência alta">
                    ★
                  </span>
                ) : null}
              </span>
              <span className="text-sm text-muted">{lang.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
