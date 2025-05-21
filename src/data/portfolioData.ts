// data/portfolioData.ts

// Define a interface para os dados do portfólio para garantir a tipagem
export interface PortfolioData {
    name: string;
    title: string;
    contact: PortfolioContact;
    summary: string;
    experience: Experience[];
    projects: Project[];
    education: Education[];
    certifications: Certification[];
    languages: Language[];
    skills: Skill[];
  }
  
  export interface PortfolioContact {
    phone: string;
    email: string;
    linkedin: string; // Adicione o link completo do seu LinkedIn
    whatsappLink: string; // Adicione o link do seu WhatsApp
    github: string;   // Adicione o link completo do seu GitHub
    location: string;
  }

  export interface Experience {
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    technologies: string[];
    responsibilities?: string[]; // Opcional
  }
  
  export interface Project {
    name: string;
    year: string;
    description: string;
    technologies: string[];
    link?: string; // Link para o projeto (GitHub, deploy, etc.)
    repo?: string; // Link específico para o repositório
  }
  
  export interface Education {
    degree: string;
    institution: string;
    period: string;
  }
  
  export interface Certification {
    name: string;
    issuer: string;
  }
  
  export interface Language {
    name: string;
    level: string;
  }
  
  export interface Skill {
    name: string;
    category: 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'Testing' | 'Outras';
    icon?: string; // Opcional: nome de um ícone ou emoji
    level: number; 
  }
  
  // Preencha com seus dados extraídos do currículo
  export const portfolioData: PortfolioData = {
    name: "Danton Tomacheski",
    title: "Desenvolvedor Full-Stack Pleno",
    contact: {
      phone: "+55 (42) 9.99968-9501",
      email: "danton_tomacheski@outlook.com",
      linkedin: "https://www.linkedin.com/in/danton-tomacheski/",
      whatsappLink: "https://wa.me/5542999689501",
      github: "https://github.com/dantontomacheski",
      location: "Ponta Grossa, Paraná",
    },
    summary:
      "Desenvolvedor Full-Stack com foco em front-end, apaixonado por performance, UX e código limpo. Especialista em React, Next.js, TypeScript e Node.js. Atuo como full-stack desenvolvendo funcionalidades críticas com Node.js no backend e React no frontend, com integrações complexas de APIs e foco em performance e segurança. Liderei a migração de stack para React e atuei também no backend com Node.js, integrando múltiplas seguradoras via APIs.",
    experience: [
      {
        role: "Desenvolvedor especialista Front-end",
        company: "Paraná Banco S/A",
        period: "05/2022 - Presente",
        location: "Curitiba, Brazil",
        description:
          "Desenvolvimento e manutenção de aplicações com React.js, Next.js, TypeScript e Node.js. Implementação de interfaces responsivas, modernização de projetos legados, integração com APIs, testes, CI/CD e mais.",
        technologies: [
          "React.js", "Next.js", "TypeScript", "Node.js", "Styled Components",
          "Tailwind CSS", "Axios", "Jest", "React Testing Library", "React Context API",
          "Redux", "Zustand", "Azure DevOps", "SonarQube", "Formik", "Yup", "GTM",
        ],
        responsibilities: [
          "Desenvolvimento e manutenção de aplicações web.",
          "Implementação de interfaces responsivas e modernas.",
          "Modernização de bases de código legadas (React classes para funções com Hooks).",
          "Integração com APIs REST para diversas funcionalidades.",
          "Criação e manutenção de testes unitários e de integração.",
          "Gerenciamento de estado global da aplicação.",
          "Configuração e manutenção de pipelines CI/CD no Azure DevOps.",
          "Implementação de formulários complexos com validação.",
          "Desenvolvimento de funcionalidades para validação de identidade e lógicas de negócio financeiro."
        ]
      },
      {
        role: "Full-stack Developer",
        company: "Wipro",
        period: "09/2021 - 04/2022",
        location: "Brazil",
        description:
          "Desenvolvimento e integração de Microsserviços backend para a Inteligência Artificial BIA do Bradesco, utilizando Java e Spring Boot. Implementação da funcionalidade de transações Pix via WhatsApp.",
        technologies: ["Java", "Spring Boot", "Microsserviços", "APIs REST", "API do WhatsApp", "Pix"],
        responsibilities: [
          "Desenvolvimento de microsserviços para a IA BIA do Bradesco.",
          "Implementação de transações Pix via WhatsApp.",
          "Otimização de sistemas de Perguntas e Respostas (Q&A).",
          "Aplicação de design patterns para sistemas escaláveis e seguros."
        ]
      },
      {
        role: "Mobile Developer",
        company: "Madalozzo Seguros",
        period: "12/2020 - 09/2021",
        location: "Ponta Grossa, Brazil",
        description:
          "Liderança técnica no desenvolvimento do portal madaseg.com.br. Migração de Vue.js para React.js. Desenvolvimento de aplicativo móvel multiplataforma com React Native e Expo.",
        technologies: [
          "React.js", "React Native", "Expo", "Vue.js (migração)", "Node.js",
          "Docker", "APIs (Open Finance)", "Jira", "Bitbucket",
        ],
         responsibilities: [
          "Liderança técnica da equipe de desenvolvimento.",
          "Desenvolvimento e lançamento do portal madaseg.com.br.",
          "Migração da stack frontend de Vue.js para React.js.",
          "Desenvolvimento de aplicativo móvel para abertura de sinistros.",
          "Criação de dashboards e aplicativos para corretores."
        ]
      },
      {
        role: "Programador FullStack",
        company: "Agencia Alper",
        period: "05/2020 - 12/2020",
        location: "Curitiba, Brazil",
        description:
          "Desenvolvimento completo de websites utilizando WordPress e PHP, com foco em performance, design responsivo e otimização SEO. Gerenciamento técnico de servidores e infraestrutura web.",
        technologies: [
          "WordPress", "PHP", "HTML", "CSS", "JavaScript", "SEO Avançado",
          "Yoast SEO", "Shell Script", "Linux", "DNS", "Cloudflare",
        ],
        responsibilities: [
          "Desenvolvimento de websites com WordPress e PHP.",
          "Implementação de estratégias de SEO avançado.",
          "Gerenciamento técnico de servidores e infraestrutura web.",
          "Configuração e manutenção de DNS."
        ]
      },
    ],
    projects: [
      {
        name: "Complex To-Do List App",
        year: "2025",
        description:
          "Aplicação web/mobile-first para gerenciamento de tarefas diárias e projetos pessoais, utilizando React.js, Zustand e Tailwind CSS. Design responsivo, organização por projetos, calendário, suporte multilingue, testes automatizados e deploy otimizado no Netlify como PWA.",
        technologies: [
          "React.js", "Zustand", "Tailwind CSS", "Styled Components", "Jest",
          "Playwright", "i18next", "Netlify", "PWA",
        ],
        link: "https://github.com/DantonTomacheski/to-do-list",
        repo: "https://github.com/DantonTomacheski/to-do-list",
      },
      {
        name: "Github scrap documentation",
        year: "05/2025 - Presente",
        description:
          "API em Go para extração recursiva de documentação de repositórios GitHub. O objetivo é garantir que o contexto fornecido às LLMs seja sempre atual e preciso. Utiliza Gin Framework, Worker pools, MongoDB, e GitHub API Client.",
        technologies: ["Go", "Gin Framework", "Worker pools", "MongoDB", "GitHub API"],
        repo: "https://github.com/DantonTomacheski/go-mcpdocs",
      },
    ],
    education: [
      {
        degree: "Bacharelado em Engenharia de Software",
        institution: "Universidade Positivo",
        period: "01/2024 - Presente",
      },
    ],
    certifications: [
      { name: "Vue.js: Building an Interface", issuer: "LinkedIn" },
      { name: "Generative AI for Software Development", issuer: "DeepLearning.AI" },
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Avançado" },
      { name: "Espanhol", level: "Proficiente" },
      { name: "Alemão", level: "Iniciante" },
    ],
    skills: [
      { name: "React.js", category: "Frontend", icon: "⚛️", level: 5 },
      { name: "Next.js", category: "Frontend", icon: "⚫", level: 5 },
      { name: "TypeScript", category: "Frontend", icon: "TS", level: 5 },
      { name: "JavaScript", category: "Frontend", icon: "JS", level: 5 },
      { name: "HTML5", category: "Frontend", icon: "🌐", level: 5 },
      { name: "CSS3", category: "Frontend", icon: "🎨", level: 5 },
      { name: "Tailwind CSS", category: "Frontend", icon: "💨", level: 4 },
      { name: "Styled Components", category: "Frontend", icon: "💅", level: 4 },
      { name: "Node.js", category: "Backend", icon: "🔩", level: 4 },
      { name: "Java", category: "Backend", icon: "☕", level: 3 },
      { name: "Spring Boot", category: "Backend", icon: "🍃", level: 3 },
      { name: "PHP", category: "Backend", icon: "🐘", level: 2 },
      { name: "Go", category: "Backend", icon: "🐹", level: 3 },
      { name: "REST APIs", category: "Backend", icon: "🔗", level: 5 },
      { name: "Microsserviços", category: "Backend", icon: "🧩", level: 4 },
      { name: "React Native", category: "Mobile", icon: "📱", level: 3 },
      { name: "Expo", category: "Mobile", icon: "🛠️", level: 3 },
      { name: "Docker", category: "DevOps", icon: "🐳", level: 3 },
      { name: "Azure CI/CD", category: "DevOps", icon: "☁️", level: 4 },
      { name: "Bitbucket Pipelines", category: "DevOps", icon: "🚀", level: 3 },
      { name: "Git", category: "Outras", icon: "🌿", level: 5 },
      { name: "Jest", category: "Testing", icon: "🧪", level: 4 },
      { name: "React Testing Library", category: "Testing", icon: "🎭", level: 4 },
      { name: "Playwright", category: "Testing", icon: "▶️", level: 2 },
      { name: "MongoDB", category: "Backend", icon: "🍃", level: 3}, 
      { name: "SQL", category: "Backend", icon: "🗃️", level: 3}, 
    ],
  };
  