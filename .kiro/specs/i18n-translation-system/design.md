# Design Document - Sistema de Tradução i18n

## Overview

O sistema de tradução será implementado usando React Context API para gerenciamento de estado global do idioma, com arquivos JSON para armazenar traduções. A solução é leve, não requer bibliotecas externas pesadas, e se integra perfeitamente com Next.js 15 App Router mantendo a estética retro-gaming do portfolio.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│                      (layout.tsx)                        │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              TranslationProvider (Context)               │
│  - Current Locale State                                  │
│  - Change Language Function                              │
│  - Translation Function (t)                              │
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Translation  │ │ Translation  │ │ Translation  │
│ Files (JSON) │ │ Files (JSON) │ │ Files (JSON) │
│  pt-BR.json  │ │  en-US.json  │ │  es-ES.json  │
└──────────────┘ └──────────────┘ └──────────────┘
        │               │               │
        └───────────────┼───────────────┘
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  React Components                        │
│  - useTranslation() hook                                 │
│  - LanguageSelector component                            │
│  - Translated content                                    │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Initialization**: App carrega → TranslationProvider detecta idioma (localStorage ou navegador) → Carrega arquivo JSON correspondente
2. **User Interaction**: Usuário clica em LanguageSelector → Chama changeLanguage() → Atualiza Context → Salva no localStorage → Re-render automático
3. **Translation**: Componente chama t('key') → Hook busca no objeto de traduções → Retorna string traduzida

## Components and Interfaces

### 1. TranslationProvider (Context Provider)

**Localização**: `src/contexts/TranslationContext.tsx`

**Responsabilidades**:

- Gerenciar estado global do idioma atual
- Fornecer função de tradução `t(key)`
- Fornecer função para trocar idioma `changeLanguage(locale)`
- Persistir idioma selecionado no localStorage
- Detectar idioma do navegador na primeira visita

**Interface**:

```typescript
interface TranslationContextType {
  locale: Locale;
  changeLanguage: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

type Locale = "pt-BR" | "en-US" | "es-ES";
```

**Implementação**:

- Client Component ('use client')
- useState para locale atual
- useEffect para carregar do localStorage e detectar idioma do navegador
- Função t() que faz lookup nas traduções com fallback para chave se não encontrar
- Suporte para interpolação de variáveis (ex: "Hello {name}")

### 2. useTranslation Hook

**Localização**: `src/hooks/useTranslation.ts`

**Responsabilidades**:

- Fornecer acesso fácil ao contexto de tradução
- Simplificar uso em componentes

**Interface**:

```typescript
function useTranslation(): TranslationContextType;
```

**Uso**:

```typescript
const { t, locale, changeLanguage } = useTranslation();
```

### 3. LanguageSelector Component

**Localização**: `src/components/LanguageSelector.tsx`

**Responsabilidades**:

- Exibir idioma atual
- Permitir seleção de novo idioma
- Aplicar estética retro-gaming

**Props**:

```typescript
interface LanguageSelectorProps {
  className?: string;
  variant?: "dropdown" | "buttons";
}
```

**Design Visual**:

- Dropdown com bandeiras/ícones de idiomas
- Estilo pixel-border e shadow-pixel-md
- Cores do tema game
- Fonte Press Start 2P para labels
- Animações hover consistentes com botões do site

**Estados**:

- Closed: Mostra idioma atual com ícone dropdown
- Open: Lista de idiomas disponíveis
- Hover: Highlight do idioma sob o cursor

### 4. Translation Files Structure

**Localização**: `src/locales/`

**Estrutura de Diretórios**:

```
src/locales/
├── pt-BR.json
├── en-US.json
├── es-ES.json
└── index.ts (exports e types)
```

**Estrutura JSON** (hierárquica e semântica):

```json
{
  "common": {
    "loading": "Carregando...",
    "error": "Erro",
    "back": "Voltar"
  },
  "nav": {
    "about": "Sobre Mim",
    "experiences": "Experiências",
    "projects": "Projetos",
    "skills": "Habilidades"
  },
  "home": {
    "title": "DANTON TOMACHESKI",
    "subtitle": "Desenvolvedor Full-Stack Pleno",
    "npcMessage": "Olá, aventureiro! Bem-vindo à minha jornada...",
    "connectTitle": "Conecte-se:",
    "questButtons": {
      "about": "Sobre Mim (Status)",
      "experiences": "Experiências (Log)",
      "projects": "Projetos (Conquistas)",
      "skills": "Habilidades (Talentos)"
    }
  },
  "about": { ... },
  "experiences": { ... },
  "projects": { ... },
  "skills": { ... },
  "footer": {
    "copyright": "© {year} {name}. Todos os direitos reservados.",
    "builtWith": "Construído com Next.js, Tailwind CSS."
  }
}
```

### 5. Translated Portfolio Data

**Localização**: `src/data/portfolioData.ts` (modificado)

**Abordagem**:

- Manter estrutura atual de `portfolioData`
- Criar versões traduzidas: `portfolioDataPtBR`, `portfolioDataEnUS`, `portfolioDataEsES`
- Função helper `getPortfolioData(locale)` que retorna dados no idioma correto

**Alternativa** (mais escalável):

- Mover conteúdo dinâmico para arquivos de tradução
- Usar translation keys para referenciar conteúdo
- Exemplo: `t('experiences.0.role')` ao invés de hardcoded

**Decisão**: Usar abordagem de múltiplos objetos portfolioData por ser mais simples e manter tipagem forte.

## Data Models

### Locale Type

```typescript
type Locale = "pt-BR" | "en-US" | "es-ES";

const LOCALES: Record<Locale, { name: string; flag: string }> = {
  "pt-BR": { name: "Português", flag: "🇧🇷" },
  "en-US": { name: "English", flag: "🇺🇸" },
  "es-ES": { name: "Español", flag: "🇪🇸" },
};
```

### Translation Dictionary Type

```typescript
type TranslationDictionary = {
  [key: string]: string | TranslationDictionary;
};

// Type-safe translation keys
type TranslationKeys = "common.loading" | "home.title" | "nav.about";
// ... (gerado automaticamente de pt-BR.json)
```

### Translation Context State

```typescript
interface TranslationState {
  locale: Locale;
  translations: TranslationDictionary;
  isLoading: boolean;
}
```

## Error Handling

### Missing Translation Keys

- **Problema**: Translation key não existe no arquivo JSON
- **Solução**: Retornar a própria key como fallback + log warning no console (apenas dev)
- **Exemplo**: `t('missing.key')` → retorna `'missing.key'` + console.warn

### Missing Translation File

- **Problema**: Arquivo JSON de idioma não carrega
- **Solução**: Fallback para pt-BR (idioma padrão) + toast notification para usuário
- **Implementação**: Try-catch no carregamento com fallback gracioso

### Invalid Locale

- **Problema**: Usuário tenta selecionar locale não suportado
- **Solução**: Validar locale antes de aplicar, usar pt-BR como default
- **Implementação**: Type guard e validação em changeLanguage()

### localStorage Unavailable

- **Problema**: localStorage bloqueado ou indisponível (modo privado)
- **Solução**: Funcionar normalmente sem persistência, usar apenas session state
- **Implementação**: Try-catch em operações de localStorage

### Interpolation Errors

- **Problema**: Parâmetros faltando em string com interpolação
- **Solução**: Manter placeholder se parâmetro não fornecido
- **Exemplo**: `t('welcome', { name: 'João' })` → "Bem-vindo, João!"
- **Exemplo erro**: `t('welcome')` → "Bem-vindo, {name}!" (mantém placeholder)

## Testing Strategy

### Unit Tests

**TranslationProvider**:

- ✓ Deve inicializar com idioma do navegador
- ✓ Deve carregar idioma do localStorage se existir
- ✓ Deve trocar idioma corretamente
- ✓ Deve persistir idioma no localStorage
- ✓ Deve fazer fallback para pt-BR se idioma inválido

**useTranslation Hook**:

- ✓ Deve retornar locale atual
- ✓ Deve retornar função t() funcional
- ✓ Deve retornar função changeLanguage() funcional
- ✓ Deve lançar erro se usado fora do Provider

**Translation Function (t)**:

- ✓ Deve traduzir keys simples corretamente
- ✓ Deve traduzir keys aninhadas (dot notation)
- ✓ Deve fazer interpolação de variáveis
- ✓ Deve retornar key como fallback se tradução não existir
- ✓ Deve lidar com parâmetros faltando em interpolação

**LanguageSelector Component**:

- ✓ Deve renderizar idioma atual
- ✓ Deve abrir dropdown ao clicar
- ✓ Deve trocar idioma ao selecionar opção
- ✓ Deve fechar dropdown após seleção
- ✓ Deve aplicar estilos pixel corretos

### Integration Tests

**Page Translation**:

- ✓ Home page deve traduzir todo conteúdo ao trocar idioma
- ✓ Sobre page deve traduzir todo conteúdo ao trocar idioma
- ✓ Experiências page deve traduzir todo conteúdo ao trocar idioma
- ✓ Projetos page deve traduzir todo conteúdo ao trocar idioma
- ✓ Habilidades page deve traduzir todo conteúdo ao trocar idioma

**Persistence**:

- ✓ Idioma selecionado deve persistir após reload
- ✓ Idioma deve ser restaurado ao retornar ao site

**Performance**:

- ✓ Troca de idioma deve ocorrer em menos de 500ms
- ✓ Bundle size de traduções deve ser menor que 50KB

### Manual Testing Checklist

- [ ] Testar detecção automática de idioma do navegador
- [ ] Testar seleção de cada idioma via LanguageSelector
- [ ] Verificar que todas as strings são traduzidas em todas as páginas
- [ ] Testar persistência após fechar e reabrir navegador
- [ ] Verificar que scroll position é mantido ao trocar idioma
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Safari)
- [ ] Testar em mobile e desktop
- [ ] Verificar acessibilidade do LanguageSelector (keyboard navigation)
- [ ] Verificar que não há console errors ou warnings
- [ ] Testar com localStorage desabilitado (modo privado)

## Implementation Notes

### Next.js 15 Compatibility

**Client vs Server Components**:

- TranslationProvider deve ser Client Component ('use client')
- Pode ser usado em Server Components através de children pattern
- Layout.tsx envolve children com TranslationProvider

**App Router Integration**:

```typescript
// src/app/layout.tsx
import { TranslationProvider } from "@/contexts/TranslationContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TranslationProvider>{children}</TranslationProvider>
      </body>
    </html>
  );
}
```

### Performance Optimizations

1. **Lazy Loading**: Carregar apenas idioma ativo (não todos de uma vez)
2. **Memoization**: Usar useMemo para objeto de traduções
3. **Code Splitting**: Arquivos JSON separados por idioma
4. **Tree Shaking**: Importar apenas traduções necessárias por página (futuro)

### Accessibility

- LanguageSelector deve ter aria-label descritivo
- Dropdown deve ser navegável por teclado (Tab, Enter, Escape)
- Idioma atual deve ser anunciado para screen readers
- Usar lang attribute no HTML tag baseado no locale atual

### SEO Considerations

- Atualizar `<html lang="">` attribute ao trocar idioma
- Considerar hreflang tags para SEO multi-idioma (futuro)
- Meta tags (title, description) devem ser traduzidas

## Migration Path

### Phase 1: Setup Infrastructure

1. Criar TranslationContext e Provider
2. Criar arquivos JSON de tradução (começar com pt-BR)
3. Implementar useTranslation hook
4. Integrar Provider no layout.tsx

### Phase 2: Translate UI

1. Traduzir home page
2. Criar LanguageSelector component
3. Traduzir demais páginas (sobre, experiências, projetos, habilidades)
4. Traduzir footer e elementos comuns

### Phase 3: Translate Data

1. Criar versões traduzidas de portfolioData
2. Implementar getPortfolioData(locale) helper
3. Atualizar componentes para usar dados traduzidos

### Phase 4: Additional Languages

1. Criar en-US.json com traduções em inglês
2. Criar es-ES.json com traduções em espanhol
3. Traduzir portfolioData para inglês e espanhol

### Phase 5: Polish & Testing

1. Adicionar testes unitários
2. Adicionar testes de integração
3. Testar em diferentes dispositivos e navegadores
4. Ajustes finais de UX e performance

## Design Decisions & Rationale

### Por que não usar next-intl ou react-i18next?

**Decisão**: Implementar solução custom com Context API

**Rationale**:

- Projeto é relativamente pequeno (5 páginas)
- Evita dependências externas pesadas (next-intl ~100KB)
- Maior controle sobre implementação e performance
- Aprendizado e customização total
- Bundle size menor
- Integração mais simples com estética retro-gaming

### Por que JSON ao invés de TypeScript para traduções?

**Decisão**: Usar arquivos JSON

**Rationale**:

- Formato padrão da indústria para i18n
- Fácil de editar por não-desenvolvedores
- Possibilidade de usar ferramentas de tradução externas
- Carregamento dinâmico mais simples
- Geração de types TypeScript a partir do JSON

### Por que múltiplos portfolioData ao invés de translation keys?

**Decisão**: Criar portfolioDataPtBR, portfolioDataEnUS, portfolioDataEsES

**Rationale**:

- Mantém tipagem forte do TypeScript
- Mais simples de implementar inicialmente
- Conteúdo dinâmico é complexo e estruturado
- Evita poluir arquivos de tradução com muito conteúdo
- Facilita manutenção de dados específicos por idioma

### Por que Context API ao invés de Zustand/Redux?

**Decisão**: Usar React Context API

**Rationale**:

- Estado de idioma é simples (apenas uma string)
- Não precisa de middleware ou devtools complexos
- Context API é suficiente para este caso de uso
- Evita adicionar outra dependência
- Performance adequada (re-renders controlados)
