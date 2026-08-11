import type { Localized } from "./projects";

export type ExperienceItem = {
  id: string;
  role: Localized;
  company: Localized;
  period: Localized;
  description: Localized;
};

export const experience: ExperienceItem[] = [
  {
    id: "metropole-digital",
    role: {
      pt: "Desenvolvedor Full-Stack",
      en: "Full-Stack Developer",
    },
    company: {
      pt: "Instituto Metrópole Digital, UFRN",
      en: "Metrópole Digital Institute, UFRN",
    },
    period: {
      pt: "06/2026 — Presente",
      en: "06/2026 — Present",
    },
    description: {
      pt: "Desenvolvi aplicações web educacionais de matemática com Next.js, React e TypeScript, traduzindo conceitos lógicos complexos em soluções funcionais para os usuários finais. Construí interfaces responsivas e acessíveis com Tailwind CSS, elevando a consistência visual e a fluidez da experiência de uso da plataforma. Atuei no ciclo completo do projeto — do levantamento de requisitos com a equipe até a entrega das telas — garantindo alinhamento entre necessidade pedagógica e implementação técnica.",
      en: "Developed educational mathematics web applications with Next.js, React, and TypeScript, translating complex logical concepts into functional solutions for end users. Built responsive and accessible interfaces with Tailwind CSS, elevating the platform's visual consistency and experience fluidity. Worked across the full project cycle — from requirements gathering with the team to screen delivery — ensuring alignment between pedagogical needs and technical implementation.",
    },
  },
  {
    id: "sms-parnamirim",
    role: {
      pt: "Suporte Técnico de Computadores e Infraestrutura",
      en: "IT & Infrastructure Technical Support",
    },
    company: {
      pt: "Secretaria Municipal de Saúde de Parnamirim, RN",
      en: "Parnamirim Municipal Health Department, RN",
    },
    period: {
      pt: "06/2024 — 06/2025",
      en: "06/2024 — 06/2025",
    },
    description: {
      pt: "Investigação e resolução de falhas complexas de software, hardware e conectividade, com média de 120 chamados mensais. Raciocínio lógico estruturado para isolamento de gargalos em infraestrutura, desenvolvendo resiliência analítica aplicável à engenharia de sistemas.",
      en: "Investigation and resolution of complex software, hardware, and connectivity failures, handling an average of 120 monthly tickets. Structured logical reasoning to isolate infrastructure bottlenecks, building analytical resilience applicable to systems engineering.",
    },
  },
  {
    id: "freelancer",
    role: {
      pt: "Analista de Suporte e Manutenção (Freelancer)",
      en: "Support & Maintenance Analyst (Freelancer)",
    },
    company: {
      pt: "Autônomo",
      en: "Self-employed",
    },
    period: {
      pt: "2021 — 2025",
      en: "2021 — 2025",
    },
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
