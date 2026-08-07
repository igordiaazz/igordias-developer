import type { ComponentType, SVGProps } from "react";
import {
  SiCplusplus,
  SiCss,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenrouter,
  SiPandas,
  SiPostgresql,
  SiPytorch,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<string, IconType> = {
  "C++": SiCplusplus,
  "Python": SiPython,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Next.js": SiNextdotjs,
  "React": SiReact,
  "TailwindCSS": SiTailwindcss,
  "HTML5": SiHtml5,
  "CSS3": SiCss,
  "Node.js": SiNodedotjs,
  "FastAPI": SiFastapi,
  "Supabase": SiSupabase,
  "PyTorch": SiPytorch,
  "TensorFlow": SiTensorflow,
  "Pandas": SiPandas,
  "Scikit-Learn": SiScikitlearn,
  "OpenRouter": SiOpenrouter,
  "PostgreSQL": SiPostgresql,
  "SQLite": SiSqlite,
  "MongoDB": SiMongodb,
  "Docker": SiDocker,
  "Git": SiGit,
  "Google Cloud Platform": SiGooglecloud,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
