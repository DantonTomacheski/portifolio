// app/(portfolio_sections)/sobre/page.tsx
import { portfolioData } from '../../../data/portfolioData';
import { FiUser, FiSmile, FiCode, FiHeart, FiMapPin, FiPhone, FiMail, FiLinkedin, FiGithub, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function SobrePage() {
  const { name, title, summary, contact, languages } = portfolioData;

  return (
    <section className="animate-fadeIn">
      <h2 className="section-title-game flex items-center mb-3">
        <FiUser className="mr-3 h-7 w-7" />
        Sobre Mim (Status do Personagem)
      </h2>

      <div className="pixel-box bg-game-bg mb-6 p-6">
        <div className="flex flex-col sm:flex-row items-center mb-6">
          {/* Avatar Placeholder */}
          <div className="w-24 h-24 bg-game-secondary rounded-full pixel-border flex items-center justify-center text-4xl font-pixel text-game-bg mr-0 sm:mr-6 mb-4 sm:mb-0">
            DT
          </div>
          <div>
            <h3 className="font-pixel text-2xl text-game-accent">{name}</h3>
            <p className="font-pixel text-lg text-game-primary">{title}</p>
          </div>
        </div>
        <p className="text-game-text leading-relaxed whitespace-pre-line">{summary}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="pixel-box bg-game-bg p-6">
          <h4 className="font-pixel text-xl text-game-primary mb-3 flex items-center">
            <FiCode className="mr-2 h-5 w-5" /> Minha Missão
          </h4>
          <p className="text-game-text-dark leading-relaxed">
            Desenvolvedor Full-Stack com foco em front-end, apaixonado por performance, UX e código limpo. Especialista em React, Next.js, TypeScript e Node.js. Atuo como full-stack desenvolvendo funcionalidades criticas com Node.js no backend e React no frontend, com integrações complexas de APIs e foco em performance e segurança. Já liderei migração de Vue.js para React e atuei também no backend com Node.js, integrando múltiplas seguradoras via APIs.
          </p>
        </div>

        <div className="pixel-box bg-game-bg  p-6">
          <h4 className="font-pixel text-xl text-game-primary mb-3 flex items-center">
            <FiHeart className="mr-2 h-5 w-5" /> Interesses
          </h4>
          <ul className="list-disc list-inside text-game-text-dark space-y-1">
            <li>Desenvolvimento Full-Stack (React, Next.js, Node.js, Java, Go)</li>
            <li>Arquitetura de Microsserviços e Sistemas Escaláveis</li>
            <li>Performance, Otimização e Segurança de Aplicações</li>
            <li>Desenvolvimento Mobile (React Native) e Soluções Web Modernas (PWAs)</li>
            <li>Integração de Sistemas e APIs (Open Finance, Pagamentos)</li>
            <li>Inteligência Artificial e Processamento de Linguagem Natural</li>
            <li>Qualidade de Software e Automação de Testes</li>
          </ul>
        </div>
      </div>

      <div className="pixel-box bg-game-bg mt-6  p-6">
          <h4 className="font-pixel text-xl text-game-primary mb-4 flex items-center">
            <FiMessageSquare className="mr-2 h-5 w-5" /> Informações de Contato
          </h4>
          <div className="space-y-3 text-game-text-dark">
            <p className="flex items-center"><FiMail className="mr-3 h-5 w-5 text-game-accent" /> <a href={`mailto:${contact.email}`} className="hover:text-game-accent">{contact.email}</a></p>
            <p className="flex items-center"><FiPhone className="mr-3 h-5 w-5 text-game-accent" /> <a href={`tel:${contact.phone}`} className="hover:text-game-accent">{contact.phone}</a></p>
            <p className="flex items-center"><FaWhatsapp className="mr-3 h-5 w-5 text-game-accent" /> <a href={contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-game-accent">WhatsApp</a></p>
            <p className="flex items-center"><FiLinkedin className="mr-3 h-5 w-5 text-game-accent" /> <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-game-accent">LinkedIn</a></p>
            <p className="flex items-center"><FiGithub className="mr-3 h-5 w-5 text-game-accent" /> <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-game-accent">GitHub</a></p>
            <p className="flex items-center"><FiMapPin className="mr-3 h-5 w-5 text-game-accent" /> {contact.location}</p>
          </div>
      </div>


      <div className="pixel-box bg-game-bg mt-6 p-6">
        <h4 className="font-pixel text-xl text-game-primary mb-3 flex items-center">
          <FiSmile className="mr-2 h-5 w-5" /> Idiomas (Pergaminhos Decifrados)
        </h4>
        <ul className="space-y-2">
          {languages.map((lang) => (
            <li key={lang.name} className="text-game-text-dark">
              <span className="font-pixel text-game-text">{lang.name}:</span> {lang.level}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
