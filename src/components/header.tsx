import Link from "next/link";
import {
  FaUser,
  FaFolderOpen,
  FaBriefcase,
  FaFileDownload,
} from "react-icons/fa";
import {
  FiArrowUp,
  FiUser,
  FiCode,
  FiBookOpen,
  FiFolder,
  FiMail,
} from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import type { Dictionary } from "@/i18n/dictionaries";

export function Header({
  nav,
  themeLabel,
  langLabel,
  skillsLabel,
  languagesLabel,
  backToTopLabel,
}: {
  nav: Dictionary["nav"];
  themeLabel: string;
  langLabel: string;
  skillsLabel?: string;
  languagesLabel?: string;
  backToTopLabel?: string;
}) {
  const links = [
    { href: "#about", label: nav.about, icon: FaUser },
    { href: "#projects", label: nav.projects, icon: FaFolderOpen },
    { href: "#experience", label: nav.experience, icon: FaBriefcase },
    { href: "#contact", label: nav.contact },
    {
      href: "/cv/igor-dias-curriculum.pdf",
      label: "Download",
      download: true,
      icon: FaFileDownload,
    },
  ];

  const dockLinks = [
    { href: "#top", label: backToTopLabel ?? "Back to top", icon: FiArrowUp },
    { href: "#about", label: nav.about, icon: FiUser },
    { href: "#skills", label: skillsLabel ?? "Skills", icon: FiCode },
    { href: "#languages", label: languagesLabel ?? "Languages", icon: FiBookOpen },
    { href: "#projects", label: nav.projects, icon: FiFolder },
    { href: "#contact", label: nav.contact, icon: FiMail },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 hidden border-b border-border/60 bg-background/70 backdrop-blur-xl sm:block">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
          <Link href="#top" className="text-sm font-semibold tracking-tight">
            Igor Dias
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-muted sm:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.download ? { download: true } : {})}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LocaleToggle label={langLabel} />
            <ThemeToggle label={themeLabel} />
          </div>
        </div>
      </header>

      <div className="fixed right-4 top-4 z-50 flex items-center gap-2 sm:hidden">
        <LocaleToggle label={langLabel} />
        <ThemeToggle label={themeLabel} />
      </div>

      <nav
        aria-label="Menu"
        className="fixed bottom-4 left-1/2 z-50 flex w-fit -translate-x-1/2 items-center gap-1 rounded-2xl border border-border/60 bg-background/70 px-5 py-3 shadow-lg backdrop-blur-xl sm:hidden"
      >
        {dockLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-card"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </nav>
    </>
  );
}
