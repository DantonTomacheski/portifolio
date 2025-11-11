// app/(portfolio_sections)/habilidades/page.tsx
"use client";

import { getPortfolioData, Skill } from "../../../data/portfolioData";
import {
  FiCpu,
  FiTerminal,
  FiSmartphone,
  FiCloud,
  FiCheckSquare,
  FiStar,
} from "react-icons/fi"; // Ícones para categorias
import { useTranslation } from "@/hooks/useTranslation";

// Mapeamento de categorias para ícones
const categoryIcons = {
  Frontend: <FiCpu className="mr-2 h-5 w-5" />,
  Backend: <FiTerminal className="mr-2 h-5 w-5" />,
  Mobile: <FiSmartphone className="mr-2 h-5 w-5" />,
  DevOps: <FiCloud className="mr-2 h-5 w-5" />,
  Testing: <FiCheckSquare className="mr-2 h-5 w-5" />,
  Outras: <FiStar className="mr-2 h-5 w-5" />,
};

// Componente para um card de habilidade individual
const SkillCard = ({ skill }: { skill: Skill }) => {
  const stars = "★".repeat(skill.level) + "☆".repeat(5 - skill.level); // Create stars based on level

  return (
    <div className="font-pixel bg-game-secondary text-game-bg-light border border-game-border shadow-pixel-sm hover:shadow-pixel-md transform transition-all duration-200 hover:bg-game-primary flex flex-col text-xs px-2 py-2 min-h-[4.5rem] w-[calc(50%-0.5rem)] sm:text-sm sm:px-3 sm:py-3 sm:min-h-[5.5rem] sm:w-auto">
      <div className="flex items-center mb-1">
        {skill.icon && <span className="mr-2 text-lg">{skill.icon}</span>}
        <span className="flex-1 min-w-0 break-words">{skill.name}</span>
      </div>
      <div className="text-game-accent text-base mt-1">
        {" "}
        {/* Increased star size and added small top margin */}
        {stars}
      </div>
    </div>
  );
};

export default function HabilidadesPage() {
  const { t, locale } = useTranslation();
  const { skills } = getPortfolioData(locale);

  // Agrupar habilidades por categoria
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Outras"; // Garante uma categoria padrão
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section className="animate-fadeIn">
      <h2 className="section-title-game flex items-center mb-6">
        <FiStar className="mr-3 h-7 w-7" />
        {t("skills.title")}
      </h2>

      {Object.entries(groupedSkills).map(([category, skillList]) => {
        const icon =
          categoryIcons[category as keyof typeof categoryIcons] ||
          categoryIcons.Outras;
        const title = t(`skills.categories.${category}`);
        return (
          <div key={category} className="pixel-box bg-game-bg mb-8 p-6">
            <h3 className="font-pixel text-xl text-game-accent mb-4 flex items-center">
              {icon}
              {title}
            </h3>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              {skillList.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
