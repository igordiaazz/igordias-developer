"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Section({ id, children, className, delay = 0 }: SectionProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <m.section
      id={id}
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={`mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-24 sm:py-32 ${className ?? ""}`}
    >
      {children}
    </m.section>
  );
}
