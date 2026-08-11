import { Section } from "@/components/section";
import type { ExperienceItem } from "@/content/experience";
import type { Locale } from "@/i18n/routing";

type Props = {
  title: string;
  subtitle: string;
  items: ExperienceItem[];
  locale: Locale;
};

export function Experience({ title, subtitle, items, locale }: Props) {
  return (
    <Section id="experience">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-xl text-muted">{subtitle}</p>

      <ol className="mt-10 space-y-8 border-l border-border pl-6">
        {items.map((item) => (
          <li key={item.id} className="relative">
            <span className="absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-medium">
                {item.role[locale]}{" "}
                <span className="text-muted">· {item.company[locale]}</span>
              </h3>
              <span className="text-sm text-muted">{item.period[locale]}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.description[locale]}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
