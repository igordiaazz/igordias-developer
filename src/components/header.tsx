"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaFolderOpen,
  FaBriefcase,
} from "react-icons/fa";
import {
  FiMenu,
  FiHome,
  FiUser,
  FiCode,
  FiBookOpen,
  FiFolder,
  FiMail,
  FiX,
} from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import type { Dictionary } from "@/i18n/dictionaries";

type MenuStatus = "closed" | "open" | "closing";

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
  const [menuStatus, setMenuStatus] = useState<MenuStatus>("closed");

  const menuOpen = menuStatus === "open" || menuStatus === "closing";

  const links = [
    { href: "#about", label: nav.about, icon: FaUser },
    { href: "#projects", label: nav.projects, icon: FaFolderOpen },
    { href: "#skills", label: skillsLabel ?? "Habilidades" },
    { href: "#languages", label: languagesLabel ?? "Idiomas" },
    { href: "#experience", label: nav.experience, icon: FaBriefcase },
    { href: "#contact", label: nav.contact },
  ];

  const menuLinks = [
    { href: "#top", label: nav.home ?? backToTopLabel ?? "Home" },
    { href: "#about", label: nav.about },
    { href: "#skills", label: skillsLabel ?? "Habilidades" },
    { href: "#languages", label: languagesLabel ?? "Idiomas" },
    { href: "#projects", label: nav.projects },
    { href: "#experience", label: nav.experience },
    { href: "#contact", label: nav.contact },
  ];

  const openMenu = () => setMenuStatus("open");
  const closeMenu = () => setMenuStatus("closing");
  const toggleMenu = () =>
    menuStatus === "closed" ? openMenu() : closeMenu();

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
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <LocaleToggle label={langLabel} />
            <ThemeToggle label={themeLabel} />
          </div>
        </div>
      </header>

      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border/60 bg-background/40 px-4 backdrop-blur-xl sm:hidden">
        <Link href="#top" className="text-sm font-semibold tracking-tight">
          Igor Dias
        </Link>
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="menu-icon-button relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-card"
        >
          <span
            className={`menu-icon-symbol absolute transition-all duration-500 ${
              menuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            }`}
          >
            <FiMenu className="h-5 w-5" />
          </span>
          <span
            className={`menu-icon-symbol absolute transition-all duration-500 ${
              menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            }`}
          >
            <FiX className="h-5 w-5" />
          </span>
        </button>
      </header>

      {menuOpen && (
        <div
          onAnimationEnd={() => {
            if (menuStatus === "closing") {
              setMenuStatus("closed");
            }
          }}
          className={`fixed inset-0 z-40 flex flex-col items-center justify-start gap-8 bg-background/90 backdrop-blur-xl sm:hidden ${
            menuStatus === "open" ? "menu-enter" : "menu-exit"
          }`}
        >
          <nav className="flex w-full flex-col items-start gap-4 px-8 pt-24">
            {menuLinks.map((link, linkIndex) => (
               <a
                 key={link.href}
                 href={link.href}
                 onClick={closeMenu}
                 className={`text-left text-3xl font-medium text-foreground transition-colors hover:text-accent ${
                   menuStatus === "open" ? "menu-option-enter" : ""
                 }`}
                 style={
                   menuStatus === "open"
                     ? { animationDelay: `${linkIndex * 60 + 180}ms` }
                     : undefined
                 }
               >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="absolute bottom-8 flex items-center gap-3">
            <LocaleToggle label={langLabel} />
            <ThemeToggle label={themeLabel} />
          </div>
        </div>
      )}
    </>
  );
}
