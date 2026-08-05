import { lang } from "next/root-params";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Languages } from "@/components/sections/languages";
import { projects } from "@/content/projects";
import { experience, skillCategories } from "@/content/experience";

export default async function Home() {
  const dict = await getDictionary();
  const locale = (await lang()) as Locale;

  return (
    <>
      <Header
        nav={dict.nav}
        themeLabel={dict.theme.toggle}
        langLabel={dict.language.label}
        skillsLabel={dict.experience.skillsTitle}
        languagesLabel={dict.languages.title}
        backToTopLabel={dict.footer.backToTop}
        locale={locale}
      />
      <main className="pb-24 sm:pb-0">
        <Hero hero={dict.hero} locale={locale} />
        <About about={dict.about} />
        <Skills
          title={dict.experience.skillsTitle}
          categories={skillCategories.map((category) => ({
            ...category,
            title:
              (dict.experience.skillCategories as Record<string, string>)[
                category.id
              ] ?? category.id,
          }))}
        />
        <Languages title={dict.languages.title} items={dict.languages.items} />
        <Projects
          title={dict.projects.title}
          subtitle={dict.projects.subtitle}
          viewLive={dict.projects.viewLive}
          viewCode={dict.projects.viewCode}
          items={projects}
          locale={locale}
        />
        <Experience
          title={dict.experience.title}
          subtitle={dict.experience.subtitle}
          items={experience}
          locale={locale}
        />
      </main>
      <Reveal>
        <Footer footer={dict.footer} />
      </Reveal>
    </>
  );
}
