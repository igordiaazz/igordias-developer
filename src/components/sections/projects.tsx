import Image from "next/image";
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

export function ProjectCard({
  item,
  labels,
  locale,
  variant = "default",
}: {
  item: Project;
  labels: { live: string; code: string };
  locale: Locale;
  variant?: "default" | "featured";
}) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`group flex overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isFeatured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      {item.image ? (
        <div
          className={`w-full shrink-0 ${
            isFeatured ? "p-4 md:w-1/2" : "px-6 pt-6"
          }`}
        >
          <div
            className={`relative overflow-hidden rounded-2xl border-2 border-border ${
              isFeatured
                ? "aspect-video md:aspect-auto md:h-full"
                : "aspect-video"
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes={
                isFeatured
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
      <div
        className={`flex flex-1 flex-col ${
          isFeatured ? "p-6 sm:p-8" : "p-6"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight">
            {item.title}
          </h3>
          {item.featured ? (
            <span
              className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
              aria-label="Featured"
            >
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
              key={tech.en}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
            >
              {tech[locale]}
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
              className="text-foreground transition-opacity hover:opacity-80"
            >
              {labels.code} ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Projects({
  title,
  subtitle,
  viewLive,
  viewCode,
  items,
  locale,
}: Props) {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-muted">{subtitle}</p>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
