import type { Localized } from "./projects";

export type ExperienceItem = {
  role: Localized;
  company: Localized;
  period: string;
  description: Localized;
};

export const experience: ExperienceItem[] = [
  {
    role: {
      pt: "Suporte Técnico de Computadores e Infraestrutura",
      en: "IT & Infrastructure Technical Support",
    },
    company: {
      pt: "Secretaria Municipal de Saúde de Parnamirim, RN",
      en: "Parnamirim Municipal Health Department, RN",
    },
    period: "06/2024 — 06/2025",
    description: {
      pt: "Investigação e resolução de falhas complexas de software, hardware e conectividade, com média de 120 chamados mensais. Raciocínio lógico estruturado para isolamento de gargalos em infraestrutura, desenvolvendo resiliência analítica aplicável à engenharia de sistemas.",
      en: "Investigation and resolution of complex software, hardware, and connectivity failures, handling an average of 120 monthly tickets. Structured logical reasoning to isolate infrastructure bottlenecks, building analytical resilience applicable to systems engineering.",
    },
  },
  {
    role: {
      pt: "Analista de Suporte e Manutenção (Freelancer)",
      en: "Support & Maintenance Analyst (Freelancer)",
    },
    company: {
      pt: "Autônomo",
      en: "Self-employed",
    },
    period: "2021 — 2025",
    description: {
      pt: "Alta taxa de resolução no primeiro contato, unindo agilidade técnica com excelência no atendimento ao usuário final. Atendimento a mais de 30 clientes corporativos e presenciais, com levantamento de requisitos operacionais e identificação de falhas sistêmicas.",
      en: "High first-contact resolution rate, combining technical agility with excellence in end-user support. Served 30+ corporate and on-site clients, gathering operational requirements and identifying systemic failures.",
    },
  },
];

export type SkillCategory = {
  id: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  { id: "languages", items: ["C++", "Python", "TypeScript", "JavaScript"] },
  {
    id: "frontend",
    items: ["Next.js", "React", "TailwindCSS", "HTML5", "CSS3"],
  },
  { id: "backend", items: ["Node.js", "FastAPI", "Supabase", "Google Cloud Platform"] },
  {
    id: "data-ai",
    items: ["PyTorch", "TensorFlow", "Pandas", "Scikit-Learn", "OpenRouter"],
  },
  {
    id: "data-storage",
    items: ["PostgreSQL", "SQLite", "SQL", "MongoDB"],
  },
  { id: "tools", items: ["Docker", "Git"] },
];
