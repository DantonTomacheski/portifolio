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
  github: string; // Adicione o link completo do seu GitHub
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
  category: "Frontend" | "Backend" | "Mobile" | "DevOps" | "Testing" | "Outras";
  icon?: string; // Opcional: nome de um ícone ou emoji
  level: number;
}

// Portuguese (Brazil) - Original data
export const portfolioDataPtBR: PortfolioData = {
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
        "React.js",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Styled Components",
        "Tailwind CSS",
        "Axios",
        "Jest",
        "React Testing Library",
        "React Context API",
        "Redux",
        "Zustand",
        "Azure DevOps",
        "SonarQube",
        "Formik",
        "Yup",
        "GTM",
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
        "Desenvolvimento de funcionalidades para validação de identidade e lógicas de negócio financeiro.",
      ],
    },
    {
      role: "Full-stack Developer",
      company: "Wipro",
      period: "09/2021 - 04/2022",
      location: "Brazil",
      description:
        "Desenvolvimento e integração de Microsserviços backend para a Inteligência Artificial BIA do Bradesco, utilizando Java e Spring Boot. Implementação da funcionalidade de transações Pix via WhatsApp.",
      technologies: [
        "Java",
        "Spring Boot",
        "Microsserviços",
        "APIs REST",
        "API do WhatsApp",
        "Pix",
      ],
      responsibilities: [
        "Desenvolvimento de microsserviços para a IA BIA do Bradesco.",
        "Implementação de transações Pix via WhatsApp.",
        "Otimização de sistemas de Perguntas e Respostas (Q&A).",
        "Aplicação de design patterns para sistemas escaláveis e seguros.",
      ],
    },
    {
      role: "Mobile Developer",
      company: "Madalozzo Seguros",
      period: "12/2020 - 09/2021",
      location: "Ponta Grossa, Brazil",
      description:
        "Liderança técnica no desenvolvimento do portal madaseg.com.br. Migração de Vue.js para React.js. Desenvolvimento de aplicativo móvel multiplataforma com React Native e Expo.",
      technologies: [
        "React.js",
        "React Native",
        "Expo",
        "Vue.js (migração)",
        "Node.js",
        "Docker",
        "APIs (Open Finance)",
        "Jira",
        "Bitbucket",
      ],
      responsibilities: [
        "Liderança técnica da equipe de desenvolvimento.",
        "Desenvolvimento e lançamento do portal madaseg.com.br.",
        "Migração da stack frontend de Vue.js para React.js.",
        "Desenvolvimento de aplicativo móvel para abertura de sinistros.",
        "Criação de dashboards e aplicativos para corretores.",
      ],
    },
    {
      role: "Programador FullStack",
      company: "Agencia Alper",
      period: "05/2020 - 12/2020",
      location: "Curitiba, Brazil",
      description:
        "Desenvolvimento completo de websites utilizando WordPress e PHP, com foco em performance, design responsivo e otimização SEO. Gerenciamento técnico de servidores e infraestrutura web.",
      technologies: [
        "WordPress",
        "PHP",
        "HTML",
        "CSS",
        "JavaScript",
        "SEO Avançado",
        "Yoast SEO",
        "Shell Script",
        "Linux",
        "DNS",
        "Cloudflare",
      ],
      responsibilities: [
        "Desenvolvimento de websites com WordPress e PHP.",
        "Implementação de estratégias de SEO avançado.",
        "Gerenciamento técnico de servidores e infraestrutura web.",
        "Configuração e manutenção de DNS.",
      ],
    },
  ],
  projects: [
    {
      name: "Complex To-Do List App",
      year: "2025",
      description:
        "Aplicação web/mobile-first para gerenciamento de tarefas diárias e projetos pessoais, utilizando React.js, Zustand e Tailwind CSS. Design responsivo, organização por projetos, calendário, suporte multilingue, testes automatizados e deploy otimizado no Netlify como PWA.",
      technologies: [
        "React.js",
        "Zustand",
        "Tailwind CSS",
        "Styled Components",
        "Jest",
        "Playwright",
        "i18next",
        "Netlify",
        "PWA",
      ],
      link: "https://github.com/DantonTomacheski/to-do-list",
      repo: "https://github.com/DantonTomacheski/to-do-list",
    },
    {
      name: "Github scrap documentation",
      year: "05/2025 - Presente",
      description:
        "API em Go para extração recursiva de documentação de repositórios GitHub. O objetivo é garantir que o contexto fornecido às LLMs seja sempre atual e preciso. Utiliza Gin Framework, Worker pools, MongoDB, e GitHub API Client.",
      technologies: [
        "Go",
        "Gin Framework",
        "Worker pools",
        "MongoDB",
        "GitHub API",
      ],
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
    {
      name: "Generative AI for Software Development",
      issuer: "DeepLearning.AI",
    },
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
    {
      name: "React Testing Library",
      category: "Testing",
      icon: "🎭",
      level: 4,
    },
    { name: "Playwright", category: "Testing", icon: "▶️", level: 2 },
    { name: "MongoDB", category: "Backend", icon: "🍃", level: 3 },
    { name: "SQL", category: "Backend", icon: "🗃️", level: 3 },
  ],
};

// English (US) - Translated data
export const portfolioDataEnUS: PortfolioData = {
  name: "Danton Tomacheski",
  title: "Mid-Level Full-Stack Developer",
  contact: {
    phone: "+55 (42) 9.99968-9501",
    email: "danton_tomacheski@outlook.com",
    linkedin: "https://www.linkedin.com/in/danton-tomacheski/",
    whatsappLink: "https://wa.me/5542999689501",
    github: "https://github.com/dantontomacheski",
    location: "Ponta Grossa, Paraná",
  },
  summary:
    "Full-Stack Developer with a focus on front-end, passionate about performance, UX, and clean code. Specialist in React, Next.js, TypeScript, and Node.js. I work as a full-stack developer building critical features with Node.js on the backend and React on the frontend, with complex API integrations and focus on performance and security. I led the stack migration to React and also worked on the backend with Node.js, integrating multiple insurance companies via APIs.",
  experience: [
    {
      role: "Front-end Specialist Developer",
      company: "Paraná Banco S/A",
      period: "05/2022 - Present",
      location: "Curitiba, Brazil",
      description:
        "Development and maintenance of applications with React.js, Next.js, TypeScript, and Node.js. Implementation of responsive interfaces, modernization of legacy projects, API integration, testing, CI/CD, and more.",
      technologies: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Styled Components",
        "Tailwind CSS",
        "Axios",
        "Jest",
        "React Testing Library",
        "React Context API",
        "Redux",
        "Zustand",
        "Azure DevOps",
        "SonarQube",
        "Formik",
        "Yup",
        "GTM",
      ],
      responsibilities: [
        "Development and maintenance of web applications.",
        "Implementation of responsive and modern interfaces.",
        "Modernization of legacy codebases (React classes to functions with Hooks).",
        "Integration with REST APIs for various functionalities.",
        "Creation and maintenance of unit and integration tests.",
        "Global application state management.",
        "Configuration and maintenance of CI/CD pipelines in Azure DevOps.",
        "Implementation of complex forms with validation.",
        "Development of features for identity validation and financial business logic.",
      ],
    },
    {
      role: "Full-stack Developer",
      company: "Wipro",
      period: "09/2021 - 04/2022",
      location: "Brazil",
      description:
        "Development and integration of backend Microservices for Bradesco's BIA Artificial Intelligence, using Java and Spring Boot. Implementation of Pix transactions via WhatsApp.",
      technologies: [
        "Java",
        "Spring Boot",
        "Microservices",
        "REST APIs",
        "WhatsApp API",
        "Pix",
      ],
      responsibilities: [
        "Development of microservices for Bradesco's BIA AI.",
        "Implementation of Pix transactions via WhatsApp.",
        "Optimization of Question and Answer (Q&A) systems.",
        "Application of design patterns for scalable and secure systems.",
      ],
    },
    {
      role: "Mobile Developer",
      company: "Madalozzo Seguros",
      period: "12/2020 - 09/2021",
      location: "Ponta Grossa, Brazil",
      description:
        "Technical leadership in the development of the madaseg.com.br portal. Migration from Vue.js to React.js. Development of cross-platform mobile application with React Native and Expo.",
      technologies: [
        "React.js",
        "React Native",
        "Expo",
        "Vue.js (migration)",
        "Node.js",
        "Docker",
        "APIs (Open Finance)",
        "Jira",
        "Bitbucket",
      ],
      responsibilities: [
        "Technical leadership of the development team.",
        "Development and launch of the madaseg.com.br portal.",
        "Frontend stack migration from Vue.js to React.js.",
        "Mobile application development for claims filing.",
        "Creation of dashboards and applications for brokers.",
      ],
    },
    {
      role: "FullStack Programmer",
      company: "Agencia Alper",
      period: "05/2020 - 12/2020",
      location: "Curitiba, Brazil",
      description:
        "Complete website development using WordPress and PHP, focusing on performance, responsive design, and SEO optimization. Technical management of servers and web infrastructure.",
      technologies: [
        "WordPress",
        "PHP",
        "HTML",
        "CSS",
        "JavaScript",
        "Advanced SEO",
        "Yoast SEO",
        "Shell Script",
        "Linux",
        "DNS",
        "Cloudflare",
      ],
      responsibilities: [
        "Website development with WordPress and PHP.",
        "Implementation of advanced SEO strategies.",
        "Technical management of servers and web infrastructure.",
        "DNS configuration and maintenance.",
      ],
    },
  ],
  projects: [
    {
      name: "Complex To-Do List App",
      year: "2025",
      description:
        "Web/mobile-first application for managing daily tasks and personal projects, using React.js, Zustand, and Tailwind CSS. Responsive design, project organization, calendar, multilingual support, automated testing, and optimized deployment on Netlify as PWA.",
      technologies: [
        "React.js",
        "Zustand",
        "Tailwind CSS",
        "Styled Components",
        "Jest",
        "Playwright",
        "i18next",
        "Netlify",
        "PWA",
      ],
      link: "https://github.com/DantonTomacheski/to-do-list",
      repo: "https://github.com/DantonTomacheski/to-do-list",
    },
    {
      name: "Github scrap documentation",
      year: "05/2025 - Present",
      description:
        "Go API for recursive extraction of GitHub repository documentation. The goal is to ensure that the context provided to LLMs is always current and accurate. Uses Gin Framework, Worker pools, MongoDB, and GitHub API Client.",
      technologies: [
        "Go",
        "Gin Framework",
        "Worker pools",
        "MongoDB",
        "GitHub API",
      ],
      repo: "https://github.com/DantonTomacheski/go-mcpdocs",
    },
  ],
  education: [
    {
      degree: "Bachelor's Degree in Software Engineering",
      institution: "Universidade Positivo",
      period: "01/2024 - Present",
    },
  ],
  certifications: [
    { name: "Vue.js: Building an Interface", issuer: "LinkedIn" },
    {
      name: "Generative AI for Software Development",
      issuer: "DeepLearning.AI",
    },
  ],
  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Advanced" },
    { name: "Spanish", level: "Proficient" },
    { name: "German", level: "Beginner" },
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
    { name: "Microservices", category: "Backend", icon: "🧩", level: 4 },
    { name: "React Native", category: "Mobile", icon: "📱", level: 3 },
    { name: "Expo", category: "Mobile", icon: "🛠️", level: 3 },
    { name: "Docker", category: "DevOps", icon: "🐳", level: 3 },
    { name: "Azure CI/CD", category: "DevOps", icon: "☁️", level: 4 },
    { name: "Bitbucket Pipelines", category: "DevOps", icon: "🚀", level: 3 },
    { name: "Git", category: "Outras", icon: "🌿", level: 5 },
    { name: "Jest", category: "Testing", icon: "🧪", level: 4 },
    {
      name: "React Testing Library",
      category: "Testing",
      icon: "🎭",
      level: 4,
    },
    { name: "Playwright", category: "Testing", icon: "▶️", level: 2 },
    { name: "MongoDB", category: "Backend", icon: "🍃", level: 3 },
    { name: "SQL", category: "Backend", icon: "🗃️", level: 3 },
  ],
};

// Spanish (Spain) - Translated data
export const portfolioDataEsES: PortfolioData = {
  name: "Danton Tomacheski",
  title: "Desarrollador Full-Stack Semi-Senior",
  contact: {
    phone: "+55 (42) 9.99968-9501",
    email: "danton_tomacheski@outlook.com",
    linkedin: "https://www.linkedin.com/in/danton-tomacheski/",
    whatsappLink: "https://wa.me/5542999689501",
    github: "https://github.com/dantontomacheski",
    location: "Ponta Grossa, Paraná",
  },
  summary:
    "Desarrollador Full-Stack con enfoque en front-end, apasionado por el rendimiento, UX y código limpio. Especialista en React, Next.js, TypeScript y Node.js. Trabajo como desarrollador full-stack construyendo funcionalidades críticas con Node.js en el backend y React en el frontend, con integraciones complejas de APIs y enfoque en rendimiento y seguridad. Lideré la migración de stack a React y también trabajé en el backend con Node.js, integrando múltiples aseguradoras vía APIs.",
  experience: [
    {
      role: "Desarrollador Especialista Front-end",
      company: "Paraná Banco S/A",
      period: "05/2022 - Presente",
      location: "Curitiba, Brasil",
      description:
        "Desarrollo y mantenimiento de aplicaciones con React.js, Next.js, TypeScript y Node.js. Implementación de interfaces responsivas, modernización de proyectos legacy, integración con APIs, pruebas, CI/CD y más.",
      technologies: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Styled Components",
        "Tailwind CSS",
        "Axios",
        "Jest",
        "React Testing Library",
        "React Context API",
        "Redux",
        "Zustand",
        "Azure DevOps",
        "SonarQube",
        "Formik",
        "Yup",
        "GTM",
      ],
      responsibilities: [
        "Desarrollo y mantenimiento de aplicaciones web.",
        "Implementación de interfaces responsivas y modernas.",
        "Modernización de bases de código legacy (clases React a funciones con Hooks).",
        "Integración con APIs REST para diversas funcionalidades.",
        "Creación y mantenimiento de pruebas unitarias y de integración.",
        "Gestión del estado global de la aplicación.",
        "Configuración y mantenimiento de pipelines CI/CD en Azure DevOps.",
        "Implementación de formularios complejos con validación.",
        "Desarrollo de funcionalidades para validación de identidad y lógicas de negocio financiero.",
      ],
    },
    {
      role: "Desarrollador Full-stack",
      company: "Wipro",
      period: "09/2021 - 04/2022",
      location: "Brasil",
      description:
        "Desarrollo e integración de Microservicios backend para la Inteligencia Artificial BIA de Bradesco, utilizando Java y Spring Boot. Implementación de la funcionalidad de transacciones Pix vía WhatsApp.",
      technologies: [
        "Java",
        "Spring Boot",
        "Microservicios",
        "APIs REST",
        "API de WhatsApp",
        "Pix",
      ],
      responsibilities: [
        "Desarrollo de microservicios para la IA BIA de Bradesco.",
        "Implementación de transacciones Pix vía WhatsApp.",
        "Optimización de sistemas de Preguntas y Respuestas (Q&A).",
        "Aplicación de patrones de diseño para sistemas escalables y seguros.",
      ],
    },
    {
      role: "Desarrollador Mobile",
      company: "Madalozzo Seguros",
      period: "12/2020 - 09/2021",
      location: "Ponta Grossa, Brasil",
      description:
        "Liderazgo técnico en el desarrollo del portal madaseg.com.br. Migración de Vue.js a React.js. Desarrollo de aplicación móvil multiplataforma con React Native y Expo.",
      technologies: [
        "React.js",
        "React Native",
        "Expo",
        "Vue.js (migración)",
        "Node.js",
        "Docker",
        "APIs (Open Finance)",
        "Jira",
        "Bitbucket",
      ],
      responsibilities: [
        "Liderazgo técnico del equipo de desarrollo.",
        "Desarrollo y lanzamiento del portal madaseg.com.br.",
        "Migración del stack frontend de Vue.js a React.js.",
        "Desarrollo de aplicación móvil para apertura de siniestros.",
        "Creación de dashboards y aplicaciones para corredores.",
      ],
    },
    {
      role: "Programador FullStack",
      company: "Agencia Alper",
      period: "05/2020 - 12/2020",
      location: "Curitiba, Brasil",
      description:
        "Desarrollo completo de sitios web utilizando WordPress y PHP, con enfoque en rendimiento, diseño responsivo y optimización SEO. Gestión técnica de servidores e infraestructura web.",
      technologies: [
        "WordPress",
        "PHP",
        "HTML",
        "CSS",
        "JavaScript",
        "SEO Avanzado",
        "Yoast SEO",
        "Shell Script",
        "Linux",
        "DNS",
        "Cloudflare",
      ],
      responsibilities: [
        "Desarrollo de sitios web con WordPress y PHP.",
        "Implementación de estrategias de SEO avanzado.",
        "Gestión técnica de servidores e infraestructura web.",
        "Configuración y mantenimiento de DNS.",
      ],
    },
  ],
  projects: [
    {
      name: "Complex To-Do List App",
      year: "2025",
      description:
        "Aplicación web/mobile-first para gestión de tareas diarias y proyectos personales, utilizando React.js, Zustand y Tailwind CSS. Diseño responsivo, organización por proyectos, calendario, soporte multilingüe, pruebas automatizadas y despliegue optimizado en Netlify como PWA.",
      technologies: [
        "React.js",
        "Zustand",
        "Tailwind CSS",
        "Styled Components",
        "Jest",
        "Playwright",
        "i18next",
        "Netlify",
        "PWA",
      ],
      link: "https://github.com/DantonTomacheski/to-do-list",
      repo: "https://github.com/DantonTomacheski/to-do-list",
    },
    {
      name: "Github scrap documentation",
      year: "05/2025 - Presente",
      description:
        "API en Go para extracción recursiva de documentación de repositorios GitHub. El objetivo es garantizar que el contexto proporcionado a las LLMs sea siempre actual y preciso. Utiliza Gin Framework, Worker pools, MongoDB y GitHub API Client.",
      technologies: [
        "Go",
        "Gin Framework",
        "Worker pools",
        "MongoDB",
        "GitHub API",
      ],
      repo: "https://github.com/DantonTomacheski/go-mcpdocs",
    },
  ],
  education: [
    {
      degree: "Licenciatura en Ingeniería de Software",
      institution: "Universidade Positivo",
      period: "01/2024 - Presente",
    },
  ],
  certifications: [
    { name: "Vue.js: Building an Interface", issuer: "LinkedIn" },
    {
      name: "Generative AI for Software Development",
      issuer: "DeepLearning.AI",
    },
  ],
  languages: [
    { name: "Portugués", level: "Nativo" },
    { name: "Inglés", level: "Avanzado" },
    { name: "Español", level: "Competente" },
    { name: "Alemán", level: "Principiante" },
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
    { name: "Microservicios", category: "Backend", icon: "🧩", level: 4 },
    { name: "React Native", category: "Mobile", icon: "📱", level: 3 },
    { name: "Expo", category: "Mobile", icon: "🛠️", level: 3 },
    { name: "Docker", category: "DevOps", icon: "🐳", level: 3 },
    { name: "Azure CI/CD", category: "DevOps", icon: "☁️", level: 4 },
    { name: "Bitbucket Pipelines", category: "DevOps", icon: "🚀", level: 3 },
    { name: "Git", category: "Outras", icon: "🌿", level: 5 },
    { name: "Jest", category: "Testing", icon: "🧪", level: 4 },
    {
      name: "React Testing Library",
      category: "Testing",
      icon: "🎭",
      level: 4,
    },
    { name: "Playwright", category: "Testing", icon: "▶️", level: 2 },
    { name: "MongoDB", category: "Backend", icon: "🍃", level: 3 },
    { name: "SQL", category: "Backend", icon: "🗃️", level: 3 },
  ],
};

// Helper function to get portfolio data based on locale
export function getPortfolioData(
  locale: "pt-BR" | "en-US" | "es-ES"
): PortfolioData {
  switch (locale) {
    case "en-US":
      return portfolioDataEnUS;
    case "es-ES":
      return portfolioDataEsES;
    case "pt-BR":
    default:
      return portfolioDataPtBR;
  }
}

// Keep the default export for backward compatibility
export const portfolioData = portfolioDataPtBR;
