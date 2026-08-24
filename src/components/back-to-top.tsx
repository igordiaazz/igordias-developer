"use client";

import { FaArrowUp } from "react-icons/fa";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="hidden items-center gap-2 text-xs text-muted transition-colors hover:text-foreground sm:inline-flex"
    >
      <FaArrowUp className="h-3 w-3" />
      {label}
    </button>
  );
}
