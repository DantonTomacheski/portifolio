// app/(portfolio_sections)/experiencias/page.tsx
import { portfolioData, Experience } from '../../../data/portfolioData';
import { FiBriefcase, FiCalendar, FiMapPin, FiTerminal, FiUsers, FiTool } from 'react-icons/fi'; // Ícones

// Componente para um item de Experiência
const ExperienceCard = ({ exp }: { exp: Experience }) => (
  <div className="pixel-box bg-game-bg mb-6 transform transition-all duration-300 hover:shadow-pixel-lg hover:-translate-y-1">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
      <h3 className="font-pixel text-xl text-game-accent">{exp.role}</h3>
      <span className="font-pixel text-sm text-game-text-dark mt-1 sm:mt-0 bg-game-bg-light px-2 py-1 border border-game-border shadow-pixel-sm">{exp.period}</span>
    </div>
    <p className="font-pixel text-md text-game-primary mb-1 flex items-center">
      <FiUsers className="mr-2 h-4 w-4" /> {exp.company}
    </p>
    <p className="text-xs text-game-text-dark mb-3 flex items-center">
      <FiMapPin className="mr-2 h-4 w-4" /> {exp.location}
    </p>
    <p className="text-game-text-dark leading-relaxed mb-3 whitespace-pre-line">{exp.description}</p>

    {exp.responsibilities && exp.responsibilities.length > 0 && (
      <div className="mb-3">
        <h4 className="font-pixel text-sm text-game-primary mb-1 flex items-center"><FiTool className="mr-2"/> Principais Tarefas:</h4>
        <ul className="list-disc list-inside text-game-text-dark text-sm space-y-1">
          {exp.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>
      </div>
    )}

    <div>
      <h4 className="font-pixel text-sm text-game-primary mb-2 flex items-center"><FiTerminal className="mr-2"/> Tecnologias Usadas:</h4>
      <div className="flex flex-wrap gap-2">
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="font-pixel text-xs bg-game-secondary text-game-bg-light px-2 py-1 border border-game-border shadow-sm hover:shadow-md transition-shadow"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function ExperienciasPage() {
  const { experience } = portfolioData;

  return (
    <section className="animate-fadeIn">
      <h2 className="section-title-game flex items-center">
        <FiBriefcase className="mr-3 h-7 w-7" />
        Experiências (Log de Aventuras)
      </h2>
      {experience.map((exp, index) => (
        <ExperienceCard key={index} exp={exp} />
      ))}
    </section>
  );
}
