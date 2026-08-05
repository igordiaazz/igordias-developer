import type { Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

type Props = {
  title: string;
  subtitle: string;
  viewLive: string;
  viewCode: string;
  items: Project[];
  locale: Locale;
};

export function ProjectCard({ item, labels, locale }: {
  item: Project;
  labels: { live: string; code: string };
  locale: Locale;
}) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
        {item.featured ? (
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            ★
          </span>
        ) : null}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {item.description[locale]}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {item.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex gap-4 text-sm font-medium">
        {item.liveUrl ? (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-opacity hover:opacity-80"
          >
            {labels.live} ↗
          </a>
        ) : null}
        {item.repoUrl ? (
          <a
            href={item.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-opacity hover:opacity-80"
          >
            {labels.code} ↗
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function Projects({ title, subtitle, viewLive, viewCode, items, locale }: Props) {
  return (
    <section id="projects" className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-24 sm:py-32">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 max-w-xl text-muted">{subtitle}</p>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProjectCard
            key={item.slug}
            item={item}
            locale={locale}
            labels={{ live: viewLive, code: viewCode }}
          />
        ))}
      </div>
    </section>
  );
}
