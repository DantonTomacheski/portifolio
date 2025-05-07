// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css' // Importa os estilos globais

// Metadata para SEO e título da aba do navegador
export const metadata: Metadata = {
  title: "Danton Tomacheski - Dev Portfolio Quest",
  description: "A jornada de Danton Tomacheski pelo mundo do desenvolvimento. Explore suas habilidades, projetos e experiências.",
  // Você pode adicionar mais metadados aqui, como open graph images
};

// Layout Raiz da Aplicação
// Este componente envolve todas as páginas da sua aplicação
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/*
        A tag <head> é gerenciada pelo Next.js através do `metadata`
        e de componentes como <Head> do `next/head` (para o Pages Router)
        ou através da exportação `metadata` (para o App Router).
      */}
      <body>
        {/* Efeito CRT para dar um toque retrô à tela inteira */}
        <div className="crt-effect"></div>
        {/* Conteúdo principal da aplicação */}
        <main className="min-h-screen antialiased">
          {children}
        </main>
      </body>
    </html>
  );
}
