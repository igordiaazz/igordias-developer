export type Localized = { pt: string; en: string };

export type Project = {
  slug: string;
  title: string;
  description: Localized;
  tech: Localized[];
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
    tech: [
      { pt: "Next.js", en: "Next.js" },
      { pt: "TypeScript", en: "TypeScript" },
      { pt: "React", en: "React" },
      { pt: "Supabase", en: "Supabase" },
      { pt: "PostgreSQL", en: "PostgreSQL" },
      { pt: "Tailwind CSS", en: "Tailwind CSS" },
      { pt: "OpenRouter API", en: "OpenRouter API" },
    ],
    liveUrl: "https://first-kodes.vercel.app/",
    image: "/projects/first-kodes.webp",
  },
  {
    slug: "umour",
    title: "Track de Humor - Umour",
    description: {
      pt: "App web de bem-estar para registrar múltiplos momentos de humor por dia e visualizar a média diária em um calendário mensal colorido por humor. Login com Google via Supabase e persistência em nuvem com isolamento por usuário (RLS).",
      en: "Wellness web app to log multiple mood moments per day and view the daily average on a color-coded monthly calendar. Google sign-in via Supabase with cloud persistence isolated per user (RLS).",
    },
    tech: [
      { pt: "Next.js", en: "Next.js" },
      { pt: "TypeScript", en: "TypeScript" },
      { pt: "React", en: "React" },
      { pt: "Tailwind CSS", en: "Tailwind CSS" },
      { pt: "Supabase", en: "Supabase" },
      { pt: "Google OAuth", en: "Google OAuth" },
    ],
    image: "/projects/umour.webp",
    repoUrl: "https://github.com/igordiaazz/humour-tracker-cloud",
  },
  {
    slug: "pdf-mind",
    title: "PDF Mind",
    description: {
      pt: "Sistema RAG em microsserviços para extração de dados de documentos. Front-end React/NestJS/PostgreSQL e inferência BERT isolada em FastAPI (Python), orquestrado com Docker.",
      en: "RAG microservices system for document data extraction. React/NestJS/PostgreSQL front-end with isolated BERT inference in FastAPI (Python), orchestrated via Docker.",
    },
    tech: [
      { pt: "React", en: "React" },
      { pt: "TypeScript", en: "TypeScript" },
      { pt: "Tailwind CSS", en: "Tailwind CSS" },
      { pt: "NestJS", en: "NestJS" },
      { pt: "Node.js", en: "Node.js" },
      { pt: "PostgreSQL", en: "PostgreSQL" },
      { pt: "Python", en: "Python" },
      { pt: "FastAPI", en: "FastAPI" },
      { pt: "Hugging Face", en: "Hugging Face" },
      { pt: "Docker", en: "Docker" },
    ],
    repoUrl: "https://github.com/igordiaazz/pdf-mind",
  },
  {
    slug: "classificationIA",
    title: "Classification IA",
    description: {
      pt: "Plataforma de visão computacional com upload e predição de imagens. Back-end Node.js/PostgreSQL e motor de IA em FastAPI servindo uma CNN PyTorch (CIFAR-10) exportada via TorchScript.",
      en: "Computer vision platform for image upload and prediction. Node.js/PostgreSQL back-end with an AI engine in FastAPI serving a PyTorch CNN (CIFAR-10) exported via TorchScript.",
    },
    tech: [
      { pt: "React", en: "React" },
      { pt: "TypeScript", en: "TypeScript" },
      { pt: "Tailwind CSS", en: "Tailwind CSS" },
      { pt: "Node.js", en: "Node.js" },
      { pt: "PostgreSQL", en: "PostgreSQL" },
      { pt: "PyTorch", en: "PyTorch" },
      { pt: "FastAPI", en: "FastAPI" },
      { pt: "Docker", en: "Docker" },
      { pt: "Visão Computacional", en: "Computer Vision" },
    ],
    repoUrl: "https://github.com/igordiaazz/classificationIA",
  },
];
