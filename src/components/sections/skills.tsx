import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { TechIcon } from "@/components/tech-icon";

type SkillCategory = {
  id: string;
  title: string;
  items: string[];
};

type Props = {
  title: string;
  categories: SkillCategory[];
  delay?: number;
};

export function Skills({ title, categories, delay = 0 }: Props) {
  return (
    <Section id="skills" delay={delay}>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, catIndex) => {
          const globalStart = categories
            .slice(0, catIndex)
            .reduce((sum, cat) => sum + cat.items.length, 0);
          return (
            <div key={category.id}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                {category.title}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {category.items.map((item, itemIndex) => (
                  <Reveal
                    key={item}
                    as="li"
                    delay={0.1 + (globalStart + itemIndex) * 0.05}
                    className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted"
                  >
                    <TechIcon name={item} className="h-4 w-4" />
                    <span>{item}</span>
                  </Reveal>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
