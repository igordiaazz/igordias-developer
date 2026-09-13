"use client";

import { useEffect, useState } from "react";
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
import { useTheme } from "@/components/theme-provider";
import type { Dictionary } from "@/i18n/dictionaries";

type MenuStatus = "closed" | "open" | "closing";

function NavbarLogo({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      width="24"
      height="24"
      preserveAspectRatio="xMidYMid meet"
      shape-rendering="crispEdges"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <rect x="109" y="64" width="7" height="1" />
        <rect x="140" y="64" width="7" height="1" />
        <rect x="105" y="65" width="11" height="1" />
        <rect x="140" y="65" width="11" height="1" />
        <rect x="103" y="66" width="13" height="1" />
        <rect x="140" y="66" width="13" height="1" />
        <rect x="101" y="67" width="15" height="1" />
        <rect x="140" y="67" width="15" height="1" />
        <rect x="99" y="68" width="17" height="1" />
        <rect x="140" y="68" width="17" height="1" />
        <rect x="98" y="69" width="18" height="1" />
        <rect x="140" y="69" width="18" height="1" />
        <rect x="97" y="70" width="19" height="1" />
        <rect x="140" y="70" width="19" height="1" />
        <rect x="96" y="71" width="20" height="1" />
        <rect x="140" y="71" width="20" height="1" />
        <rect x="95" y="72" width="21" height="1" />
        <rect x="140" y="72" width="21" height="1" />
        <rect x="94" y="73" width="22" height="1" />
        <rect x="140" y="73" width="22" height="1" />
        <rect x="93" y="74" width="23" height="1" />
        <rect x="140" y="74" width="23" height="1" />
        <rect x="93" y="75" width="22" height="1" />
        <rect x="141" y="75" width="22" height="1" />
        <rect x="92" y="76" width="19" height="1" />
        <rect x="145" y="76" width="19" height="1" />
        <rect x="92" y="77" width="17" height="1" />
        <rect x="147" y="77" width="17" height="1" />
        <rect x="91" y="78" width="16" height="1" />
        <rect x="149" y="78" width="16" height="1" />
        <rect x="91" y="79" width="15" height="1" />
        <rect x="150" y="79" width="15" height="1" />
        <rect x="90" y="80" width="16" height="1" />
        <rect x="151" y="80" width="15" height="1" />
        <rect x="90" y="81" width="15" height="1" />
        <rect x="151" y="81" width="15" height="1" />
        <rect x="90" y="82" width="14" height="2" />
        <rect x="152" y="82" width="14" height="2" />
        <rect x="89" y="84" width="15" height="1" />
        <rect x="152" y="84" width="15" height="1" />
        <rect x="89" y="85" width="15" height="1" />
        <rect x="153" y="85" width="14" height="1" />
        <rect x="89" y="86" width="14" height="2" />
        <rect x="153" y="86" width="14" height="2" />
        <rect x="89" y="88" width="14" height="2" />
        <rect x="153" y="88" width="14" height="2" />
        <rect x="89" y="90" width="14" height="2" />
        <rect x="153" y="90" width="14" height="2" />
        <rect x="89" y="92" width="14" height="1" />
        <rect x="153" y="92" width="14" height="1" />
        <rect x="89" y="93" width="14" height="2" />
        <rect x="153" y="93" width="15" height="2" />
        <rect x="89" y="95" width="14" height="2" />
        <rect x="153" y="95" width="15" height="2" />
        <rect x="89" y="97" width="14" height="1" />
        <rect x="153" y="97" width="15" height="1" />
        <rect x="88" y="98" width="15" height="2" />
        <rect x="153" y="98" width="15" height="2" />
        <rect x="88" y="100" width="15" height="2" />
        <rect x="153" y="100" width="15" height="2" />
        <rect x="88" y="102" width="15" height="2" />
        <rect x="153" y="102" width="15" height="2" />
        <rect x="88" y="104" width="15" height="2" />
        <rect x="153" y="104" width="15" height="2" />
        <rect x="88" y="106" width="15" height="1" />
        <rect x="154" y="106" width="14" height="1" />
        <rect x="88" y="107" width="14" height="2" />
        <rect x="154" y="107" width="14" height="2" />
        <rect x="88" y="109" width="14" height="2" />
        <rect x="154" y="109" width="14" height="2" />
        <rect x="88" y="111" width="14" height="1" />
        <rect x="154" y="111" width="14" height="1" />
        <rect x="87" y="112" width="15" height="1" />
        <rect x="154" y="112" width="15" height="1" />
        <rect x="87" y="113" width="15" height="1" />
        <rect x="155" y="113" width="14" height="1" />
        <rect x="87" y="114" width="14" height="1" />
        <rect x="155" y="114" width="14" height="1" />
        <rect x="86" y="115" width="15" height="2" />
        <rect x="155" y="115" width="15" height="2" />
        <rect x="85" y="117" width="15" height="1" />
        <rect x="156" y="117" width="15" height="1" />
        <rect x="84" y="118" width="16" height="1" />
        <rect x="156" y="118" width="16" height="1" />
        <rect x="83" y="119" width="16" height="1" />
        <rect x="157" y="119" width="16" height="1" />
        <rect x="81" y="120" width="18" height="1" />
        <rect x="158" y="120" width="17" height="1" />
        <rect x="79" y="121" width="19" height="1" />
        <rect x="158" y="121" width="19" height="1" />
        <rect x="73" y="122" width="24" height="1" />
        <rect x="159" y="122" width="24" height="1" />
        <rect x="73" y="123" width="23" height="1" />
        <rect x="160" y="123" width="23" height="1" />
        <rect x="73" y="124" width="22" height="1" />
        <rect x="161" y="124" width="22" height="1" />
        <rect x="73" y="125" width="21" height="1" />
        <rect x="162" y="125" width="21" height="1" />
        <rect x="73" y="126" width="20" height="1" />
        <rect x="163" y="126" width="20" height="1" />
        <rect x="73" y="127" width="18" height="2" />
        <rect x="165" y="127" width="18" height="2" />
        <rect x="73" y="129" width="19" height="1" />
        <rect x="164" y="129" width="19" height="1" />
        <rect x="73" y="130" width="21" height="1" />
        <rect x="162" y="130" width="21" height="1" />
        <rect x="73" y="131" width="22" height="1" />
        <rect x="161" y="131" width="22" height="1" />
        <rect x="73" y="132" width="23" height="1" />
        <rect x="160" y="132" width="23" height="1" />
        <rect x="73" y="133" width="24" height="1" />
        <rect x="159" y="133" width="24" height="1" />
        <rect x="79" y="134" width="19" height="1" />
        <rect x="158" y="134" width="20" height="1" />
        <rect x="81" y="135" width="17" height="1" />
        <rect x="158" y="135" width="17" height="1" />
        <rect x="83" y="136" width="16" height="1" />
        <rect x="157" y="136" width="16" height="1" />
        <rect x="84" y="137" width="16" height="1" />
        <rect x="156" y="137" width="16" height="1" />
        <rect x="85" y="138" width="15" height="1" />
        <rect x="156" y="138" width="15" height="1" />
        <rect x="86" y="139" width="14" height="1" />
        <rect x="156" y="139" width="14" height="1" />
        <rect x="86" y="140" width="15" height="1" />
        <rect x="155" y="140" width="15" height="1" />
        <rect x="87" y="141" width="14" height="2" />
        <rect x="155" y="141" width="14" height="2" />
        <rect x="87" y="143" width="15" height="1" />
        <rect x="154" y="143" width="15" height="1" />
        <rect x="88" y="144" width="14" height="1" />
        <rect x="154" y="144" width="15" height="1" />
        <rect x="88" y="145" width="14" height="2" />
        <rect x="154" y="145" width="14" height="2" />
        <rect x="88" y="147" width="14" height="2" />
        <rect x="154" y="147" width="14" height="2" />
        <rect x="88" y="149" width="14" height="2" />
        <rect x="154" y="149" width="14" height="2" />
        <rect x="88" y="151" width="15" height="1" />
        <rect x="154" y="151" width="14" height="1" />
        <rect x="88" y="152" width="15" height="2" />
        <rect x="153" y="152" width="15" height="2" />
        <rect x="88" y="154" width="15" height="2" />
        <rect x="153" y="154" width="15" height="2" />
        <rect x="88" y="156" width="15" height="2" />
        <rect x="153" y="156" width="15" height="2" />
        <rect x="88" y="158" width="15" height="2" />
        <rect x="153" y="158" width="15" height="2" />
        <rect x="88" y="160" width="15" height="2" />
        <rect x="153" y="160" width="15" height="2" />
        <rect x="88" y="162" width="15" height="2" />
        <rect x="153" y="162" width="15" height="2" />
        <rect x="88" y="164" width="15" height="2" />
        <rect x="153" y="164" width="15" height="2" />
        <rect x="88" y="166" width="15" height="2" />
        <rect x="153" y="166" width="15" height="2" />
        <rect x="89" y="168" width="14" height="1" />
        <rect x="153" y="168" width="15" height="1" />
        <rect x="89" y="169" width="14" height="2" />
        <rect x="153" y="169" width="14" height="2" />
        <rect x="89" y="171" width="14" height="2" />
        <rect x="153" y="171" width="14" height="2" />
        <rect x="89" y="173" width="15" height="1" />
        <rect x="153" y="173" width="14" height="1" />
        <rect x="89" y="174" width="15" height="1" />
        <rect x="152" y="174" width="15" height="1" />
        <rect x="90" y="175" width="14" height="1" />
        <rect x="152" y="175" width="15" height="1" />
        <rect x="90" y="176" width="15" height="1" />
        <rect x="151" y="176" width="15" height="1" />
        <rect x="90" y="177" width="16" height="1" />
        <rect x="150" y="177" width="16" height="1" />
        <rect x="90" y="178" width="17" height="1" />
        <rect x="149" y="178" width="17" height="1" />
        <rect x="91" y="179" width="18" height="1" />
        <rect x="147" y="179" width="18" height="1" />
        <rect x="91" y="180" width="24" height="1" />
        <rect x="141" y="180" width="24" height="1" />
        <rect x="92" y="181" width="24" height="2" />
        <rect x="140" y="181" width="24" height="2" />
        <rect x="93" y="183" width="23" height="1" />
        <rect x="140" y="183" width="23" height="1" />
        <rect x="94" y="184" width="22" height="1" />
        <rect x="140" y="184" width="22" height="1" />
        <rect x="95" y="185" width="21" height="1" />
        <rect x="140" y="185" width="21" height="1" />
        <rect x="96" y="186" width="20" height="1" />
        <rect x="140" y="186" width="20" height="1" />
        <rect x="97" y="187" width="19" height="1" />
        <rect x="140" y="187" width="19" height="1" />
        <rect x="98" y="188" width="18" height="1" />
        <rect x="140" y="188" width="18" height="1" />
        <rect x="100" y="189" width="16" height="1" />
        <rect x="140" y="189" width="16" height="1" />
        <rect x="102" y="190" width="14" height="1" />
        <rect x="140" y="190" width="14" height="1" />
        <rect x="106" y="191" width="10" height="1" />
        <rect x="140" y="191" width="11" height="1" />
      </g>
    </svg>
  );
}

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

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const menuOpen = menuStatus === "open" || menuStatus === "closing";

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

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
        <div className="flex items-center gap-2">
          <Link href="#top" className={`flex items-center ${isDark ? "navbar-logo-dark" : "navbar-logo-light"}`}>
            <NavbarLogo className="h-6 w-6" />
          </Link>
          <span className="text-sm font-semibold tracking-tight text-foreground">Igor Developer</span>
        </div>
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
