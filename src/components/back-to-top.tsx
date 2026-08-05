"use client";

import { FaArrowUp } from "react-icons/fa";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
    >
      <FaArrowUp className="h-3 w-3" />
      {label}
    </button>
  );
}
