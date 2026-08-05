import type { Metadata } from "next";
import { lang } from "next/root-params";
import { Geist, Geist_Mono } from "next/font/google";
import { LazyMotion, domAnimation } from "motion/react";
import { getDictionary } from "@/i18n/dictionaries";
import { locales } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashScreen } from "@/components/splash-screen";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[lang]">) {
  const current = await lang();
  return (
    <html
      lang={current}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <LazyMotion features={domAnimation} strict>
          <ThemeProvider>{children}</ThemeProvider>
          <SplashScreen />
        </LazyMotion>
      </body>
    </html>
  );
}
