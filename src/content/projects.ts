export type Localized = { pt: string; en: string };

export type Project = {
  slug: string;
  title: string;
  description: Localized;
  tech: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "first-kodes",
    title: "First Kodes",
    description: {
      pt: "Plataforma full-stack de ensino de lógica em Python com gamificação e tutoria adaptativa por IA. Autenticação OAuth e persistência em tempo real via Supabase; tutor IA via OpenRouter gera desafios e feedback conforme a performance.",
      en: "Full-stack Python logic-teaching platform with gamification and AI adaptive tutoring. OAuth auth and real-time persistence via Supabase; an OpenRouter AI tutor generates challenges and feedback based on performance.",
    },
    tech: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "Tailwind CSS", "OpenRouter API"],
    liveUrl: "https://first-kodes.vercel.app/",
  },
  {
    slug: "pdf-mind",
    title: "PDF Mind",
    description: {
      pt: "Sistema RAG em microsserviços para extração de dados de documentos. Front-end React/NestJS/PostgreSQL e inferência BERT isolada em FastAPI (Python), orquestrado com Docker.",
      en: "RAG microservices system for document data extraction. React/NestJS/PostgreSQL front-end with isolated BERT inference in FastAPI (Python), orchestrated via Docker.",
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "NestJS", "Node.js", "PostgreSQL", "Python", "FastAPI", "Hugging Face", "Docker"],
    repoUrl: "https://github.com/igordiaazz/pdf-mind",
  },
  {
    slug: "classificationIA",
    title: "Classification IA",
    description: {
      pt: "Plataforma de visão computacional com upload e predição de imagens. Back-end Node.js/PostgreSQL e motor de IA em FastAPI servindo uma CNN PyTorch (CIFAR-10) exportada via TorchScript.",
      en: "Computer vision platform for image upload and prediction. Node.js/PostgreSQL back-end with an AI engine in FastAPI serving a PyTorch CNN (CIFAR-10) exported via TorchScript.",
    },
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "PyTorch", "FastAPI", "Docker", "Visão Computacional"],
    repoUrl: "https://github.com/igordiaazz/classificationIA",
  },
];
