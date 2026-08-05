import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import type { Dictionary } from "@/i18n/dictionaries";
import { BackToTop } from "@/components/back-to-top";

const socials = [
  { label: "GitHub", href: "https://github.com/igordiaazz", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/igordiaazz/", icon: FaLinkedin },
  { label: "Instagram", href: "https://instagram.com/igordiaazz", icon: FaInstagram },
];

export function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer
      id="contact"
      className="border-t border-border/60 scroll-mt-24"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center">
        <p className="text-lg font-medium">{footer.heading}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {social.label}
              </a>
            );
          })}
        </div>
        <BackToTop label={footer.backToTop} />
      </div>
    </footer>
  );
}
