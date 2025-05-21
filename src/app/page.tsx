// app/page.tsx (Página Inicial - O "Lobby" do Jogo)
import Link from 'next/link';
import Image from 'next/image'; // Importar o componente Image do Next.js
import { portfolioData } from '../data/portfolioData';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiAward, FiBriefcase, FiStar, FiUser } from 'react-icons/fi'; // Ícones para contato e botões
import { FaWhatsapp } from 'react-icons/fa'; // Importar FaWhatsapp
import avatarDanton from '../images/solo-avatar.png';

// Componente para o "NPC" Danton
const DantonNPC = () => (
  <div className="relative mb-8 text-center">
    {/* Avatar pixelado do Danton usando next/image */}
    <div className="mx-auto mb-4 w-32 h-32 md:w-40 md:h-40 pixel-border rounded-full relative shadow-pixel-md bg-game-bg">
      <Image
        src={avatarDanton}
        alt={`Avatar de ${portfolioData.name}`}
        fill
        sizes="(max-width: 768px) 8rem, 10rem"
        className="rounded-full object-cover"
        priority
      />
    </div>
    <p className="text-sm text-game-text-dark mt-3 max-w-md mx-auto px-2 leading-relaxed">
      "Olá, aventureiro! Bem-vindo à minha jornada. Escolha sua quest para começar e explorar meu universo de código!"
    </p>
  </div>
);

// Interface para as props do QuestButton para incluir ícone
interface QuestButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactElement; // Ícone opcional
}

// Componente para os botões de navegação (Quests)
const QuestButton = ({ href, children, icon }: QuestButtonProps) => (
  <Link href={href} passHref>
    <button className="pixel-button w-full sm:w-auto text-base md:text-lg mb-3 sm:mb-4 transform hover:scale-105 transition-transform duration-150 ease-out flex items-center justify-center px-3 py-3">
      {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
      {children}
    </button>
  </Link>
);

// Página Inicial
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-game-bg-light pattern-dots pattern-game-bg pattern-bg-fixed pattern-opacity-20">
      <div className="pixel-box w-full max-w-3xl text-center shadow-pixel-lg animate-fadeIn bg-game-bg p-6" style={{ animationDelay: '0.1s' }}>
        <header className="my-6 md:my-8">
          <p className="font-pixel text-3xl md:text-4xl text-game-accent mb-2 tracking-wider">
            DANTON TOMACHESKI
          </p>
          <p className="text-md md:text-lg text-game-text-dark px-2 leading-relaxed font-pixel">
            Desenvolvedor Full-Stack Pleno
          </p>
        </header>

        <DantonNPC />

        {/* Seções como "Quests" ou "Áreas do Mapa" */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-8 px-4 md:px-6">
          <QuestButton href="/sobre" icon={<FiUser />}>Sobre Mim (Status)</QuestButton>
          <QuestButton href="/experiencias" icon={<FiBriefcase />}>Experiências (Log)</QuestButton>
          <QuestButton href="/projetos" icon={<FiAward />}>Projetos (Conquistas)</QuestButton>
          <QuestButton href="/habilidades" icon={<FiStar />}>Habilidades (Talentos)</QuestButton>
        </nav>

        {/* Contato Rápido */}
        <div className="mt-8 pt-6 border-t-2 border-game-border">
          <h3 className="font-pixel text-xl text-game-primary mb-4">Conecte-se:</h3>
          <div className="flex justify-center space-x-5 md:space-x-6">
            <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub de Danton Tomacheski" className="text-game-text hover:text-game-accent transition-colors transform hover:scale-110">
              <FiGithub size={30} />
            </a>
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Danton Tomacheski" className="text-game-text hover:text-game-accent transition-colors transform hover:scale-110">
              <FiLinkedin size={30} />
            </a>
            <a href={`mailto:${portfolioData.contact.email}`} aria-label="Email para Danton Tomacheski" className="text-game-text hover:text-game-accent transition-colors transform hover:scale-110">
              <FiMail size={30} />
            </a>
            <a href="https://wa.me/5542999689501" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Danton Tomacheski" className="text-game-text hover:text-game-accent transition-colors transform hover:scale-110">
              <FaWhatsapp size={30} />
            </a>
          </div>
           <p className="text-sm text-game-text-dark mt-4 flex items-center justify-center">
            <FiMapPin className="mr-2 h-4 w-4"/> {portfolioData.contact.location}
          </p>
        </div>
      </div>
      <footer className="mt-8 py-4 text-center text-sm text-game-text-dark font-pixel">
        <p>&copy; {new Date().getFullYear()} {portfolioData.name}. Todos os direitos reservados.</p>
        <p className="mt-1">Construído com Next.js, Tailwind CSS.</p>
      </footer>
    </div>
  );
}
