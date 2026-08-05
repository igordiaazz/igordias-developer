"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/section";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/theme-provider";

const Cobe = dynamic(
  () => import("@/components/eldoraui/cobe-globe").then((m) => m.Cobe),
  { ssr: false }
);

type Language = {
  name: string;
  level: string;
};

type Props = {
  title: string;
  items: Language[];
};

export function Languages({ title, items }: Props) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? theme === "dark" : true;

  return (
    <Section id="languages">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="mx-auto w-full max-w-sm">
          <Cobe
            variant="default"
            baseColor={isDark ? "#ffffff" : "#1d1d1f"}
            glowColor={isDark ? "#ffffff" : "#1d1d1f"}
            dark={isDark ? 1 : 0}
            markers={[]}
          />
        </div>
        <ul className="space-y-4">
          {items.map((lang) => (
            <li
              key={lang.name}
              className="flex items-baseline justify-between gap-4 border-b border-border pb-3"
            >
              <span className="text-lg font-medium">{lang.name}</span>
              <span className="text-sm text-muted">{lang.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
