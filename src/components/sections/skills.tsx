import { Section } from "@/components/section";
import { TechIcon } from "@/components/tech-icon";

type SkillCategory = {
  id: string;
  title: string;
  items: string[];
};

type Props = {
  title: string;
  categories: SkillCategory[];
};

export function Skills({ title, categories }: Props) {
  return (
    <Section id="skills">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {category.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted"
                >
                  <TechIcon name={item} className="h-4 w-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
