"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n/routing";

export function LocaleToggle({ label }: { label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/");
  const current = segments[1];

  function pathFor(locale: string) {
    const rest = segments.slice(2).join("/");
    return `/${locale}${rest ? `/${rest}` : ""}`;
  }

  return (
    <nav className="flex items-center gap-2 text-sm" aria-label={label}>
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={pathFor(locale)}
            aria-current={active ? "true" : undefined}
            onClick={(e) => {
              if (!active) {
                e.preventDefault();
                router.replace(pathFor(locale), { scroll: false });
              }
            }}
            className={`px-1.5 py-1 uppercase transition-colors ${
              active
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
