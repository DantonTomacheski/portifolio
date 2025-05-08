'use server';

import { FiAward, FiGithub, FiStar, FiEye, FiLink } from 'react-icons/fi';
import { portfolioData } from '../../../data/portfolioData'; // Para pegar o username do GitHub
import Link from 'next/link';
import type { ReactNode } from 'react';

// Interface para os dados do repositório do GitHub
interface GithubRepo {
  forks_count: number;
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  fork: boolean;
  pushed_at: string;
  topics: string[];
}

// Componente para um card de projeto do GitHub
const GithubProjectCard = ({ repo }: { repo: GithubRepo }) => {
  // Limita a descrição para aproximadamente 300 caracteres, preservando palavras.
  const truncateDescription = (text: string | null, maxLength: number = 280): string => {
    if (!text) return "Sem descrição fornecida.";
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    // Evita cortar uma palavra ao meio
    return truncated.substring(0, Math.min(truncated.length, truncated.lastIndexOf(" "))) + "...";
  };

  return (
    <div className="pixel-box bg-game-bg mb-6 p-6 flex flex-col h-full transform transition-all duration-300 hover:shadow-pixel-lg hover:-translate-y-1">
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
          <h3 className="font-pixel text-lg text-game-accent mb-1 sm:mb-0 break-all hover:text-game-primary transition-colors">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </h3>
          
        </div>
        {repo.language && (
            <span className="font-pixel text-xs text-game-bg-light bg-game-secondary px-2 py-1 border border-game-border shadow-pixel-sm">
              {repo.language}
            </span>
          )}
        <p className="text-game-text-dark leading-relaxed mb-4 text-sm h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-game-primary scrollbar-track-game-bg-light">
          {/* Usando a descrição do repositório, não do README por simplicidade inicial */}
          {truncateDescription(repo.description)}
        </p>
        {repo.topics && repo.topics.length > 0 && (
          <div className="mb-3">
            <h4 className="font-pixel text-xs text-game-primary mb-1">Tópicos:</h4>
            <div className="flex flex-wrap gap-1">
              {repo.topics.slice(0, 5).map(topic => ( // Limita a 5 tópicos para não poluir
                <span key={topic} className="font-pixel text-2xs bg-game-bg-light text-game-text-dark px-1.5 py-0.5 border border-game-border shadow-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-auto"> {/* Empurra os elementos abaixo para o final do card */}
        <div className="flex flex-wrap items-center text-xs text-game-text-dark mb-4 gap-x-3 gap-y-1">
          <span className="flex items-center" title="Stars">
            <FiStar className="mr-1 text-game-accent" /> {repo.stargazers_count}
          </span>
          <span className="flex items-center" title="Forks (como indicador de watchers/colaboração)">
            <FiGithub className="mr-1 text-game-accent" /> {repo.forks_count} Forks
          </span>
           <span className="text-xs text-game-text-dark">
            Último push: {new Date(repo.pushed_at).toLocaleDateString('pt-BR')}
          </span>
        </div>
        
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="pixel-button-secondary text-sm w-full flex items-center justify-center"
        >
          <FiGithub className="mr-2" /> Ver no GitHub
        </a>
      </div>
      
    </div>
  );
};


// Função para buscar repositórios do GitHub
async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Opcional, mas recomendado para evitar rate limit
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.mercy-preview+json', // Para obter tópicos
    };
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=12`,
      { headers, next: { revalidate: 3600 } } // Revalida a cada 1 hora
    );

    if (!response.ok) {
      console.error(`Erro ao buscar repositórios: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error("Corpo do erro:", errorBody);
      return [];
    }
    const data = await response.json();
    // Poderia filtrar forks aqui se desejado: .filter((repo: GithubRepo) => !repo.fork)
    return data;
  } catch (error) {
    console.error("Falha ao buscar repositórios do GitHub:", error);
    return [];
  }
}

export default async function ProjetosPage() {
  const githubUrlParts = portfolioData.contact.github.split('/');
  const githubUsername = githubUrlParts[githubUrlParts.length - 1] || "dantontomacheski";

  const githubRepos = await getGithubRepos(githubUsername);
  const staticProjects = portfolioData.projects; // Seus projetos definidos manualmente

  return (
    <section className="animate-fadeIn">
      <h2 className="section-title-game flex items-center mb-6">
        <FiAward className="mr-3 h-7 w-7" />
        Projetos (Conquistas & Artefatos)
      </h2>

      {githubRepos.length === 0 && staticProjects.length === 0 && (
         <div className="pixel-box bg-game-bg p-6 text-center">
            <p className="text-game-text-dark">Nenhum projeto encontrado.</p>
            {githubUsername && <p className="text-sm text-game-text-dark mt-2">Verifique o console para mais detalhes se for um desenvolvedor.</p>}
         </div>
      )}
      
      {githubRepos.length > 0 && (
        <>
          <h3 className="font-pixel text-xl text-game-primary mt-8 mb-4 flex items-center">
            <FiGithub className="mr-2 h-6 w-6" /> Repositórios Recentes no GitHub
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {githubRepos.map((repo) => (
              <GithubProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        </>
      )}

      {staticProjects.length > 0 && (
        <>
          <h3 className="font-pixel text-xl text-game-primary mt-10 mb-4 flex items-center">
            <FiLink className="mr-2 h-6 w-6" /> Outros Projetos Destacados
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticProjects.map((project, index) => (
              <div key={index} className="pixel-box bg-game-bg p-6 flex flex-col h-full transform transition-all duration-300 hover:shadow-pixel-lg hover:-translate-y-1">
                <div className="flex-grow">
                  <h3 className="font-pixel text-lg text-game-accent mb-2">{project.name} <span className="text-xs text-game-text-dark">({project.year})</span></h3>
                  <p className="text-game-text-dark leading-relaxed mb-3 text-sm h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-game-primary scrollbar-track-game-bg-light">
                    {project.description}
                  </p>
                  <div className="mb-3">
                    <h4 className="font-pixel text-xs text-game-primary mb-1">Tecnologias:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map(tech => (
                        <span key={tech} className="font-pixel text-2xs bg-game-secondary text-game-bg-light px-1.5 py-0.5 border border-game-border shadow-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="pixel-button-secondary text-sm flex items-center justify-center w-full mb-2">
                      <FiLink className="mr-2"/> Ver Projeto
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="pixel-button-secondary text-sm flex items-center justify-center w-full">
                      <FiGithub className="mr-2"/> Ver Repositório
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}