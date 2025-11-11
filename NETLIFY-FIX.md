# 🔧 Fix para Internal Server Error na Netlify

## Problema Identificado

O erro "Internal Server Error" ocorre porque você está usando:

- **Next.js 16.0.2-canary.15** (versão canary/experimental)
- **React 19.0.0** (versão estável mas muito recente)

A Netlify ainda não tem suporte completo para essas versões.

---

## ✅ Solução Rápida (Recomendada)

### Opção 1: Downgrade para Versões Estáveis

Atualize o `package.json`:

```json
{
  "dependencies": {
    "@tailwindcss/postcss": "^4.1.5",
    "next": "15.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "tailwindcss-patterns": "^0.1.2"
  }
}
```

Depois execute:

```bash
# Remover node_modules e package-lock
rm -rf node_modules package-lock.json

# Reinstalar dependências
npm install

# Testar build local
npm run build

# Commit e push
git add .
git commit -m "fix: Downgrade to stable Next.js and React versions for Netlify"
git push origin main
```

---

## Opção 2: Manter Versões Canary (Mais Complexo)

Se você quer manter Next.js 16 e React 19, precisa configurar para usar Netlify Edge Functions:

### 1. Atualizar `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"
  external_node_modules = ["sharp"]

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 2. Atualizar plugin Netlify:

```bash
npm install @netlify/plugin-nextjs@latest
```

### 3. Commit e push:

```bash
git add .
git commit -m "fix: Update Netlify config for Next.js 16"
git push origin main
```

---

## 🎯 Recomendação

**Use a Opção 1** (downgrade para versões estáveis). Motivos:

1. ✅ Next.js 15.1.0 é estável e totalmente suportado
2. ✅ React 18.3.1 é estável e testado
3. ✅ Funciona perfeitamente na Netlify
4. ✅ Todas as features do seu portfólio funcionam igual
5. ✅ Sistema i18n funciona perfeitamente

Next.js 16 e React 19 são versões muito recentes e podem ter problemas de compatibilidade com plataformas de deploy.

---

## Comandos Completos (Opção 1)

```bash
# 1. Backup do package.json atual (opcional)
cp package.json package.json.backup

# 2. Editar package.json manualmente ou usar estes comandos:
npm install next@15.1.0 react@18.3.1 react-dom@18.3.1

# 3. Remover node_modules e reinstalar tudo
rm -rf node_modules package-lock.json
npm install

# 4. Testar build local
npm run build

# 5. Se funcionar, commit e push
git add .
git commit -m "fix: Use stable Next.js 15 and React 18 for Netlify compatibility"
git push origin main
```

---

## Verificação Pós-Deploy

Após o novo deploy, verifique:

1. ✅ Site carrega sem erro 500
2. ✅ Seletor de idioma funciona
3. ✅ Todas as páginas acessíveis
4. ✅ Traduções funcionando
5. ✅ Menu traduzido

---

## Alternativa: Usar Vercel

Se preferir manter Next.js 16 e React 19, considere usar a Vercel (criadores do Next.js):

1. Acesse [vercel.com](https://vercel.com)
2. Importe seu repositório
3. Deploy automático

A Vercel tem suporte nativo para todas as versões do Next.js, incluindo canary.

---

## Logs de Erro

Se ainda tiver problemas, verifique os logs da Netlify:

1. Acesse: https://app.netlify.com
2. Vá em: Deploys > [último deploy] > Functions
3. Procure por erros específicos

---

**Status Atual**: Configuração atualizada para tentar resolver o erro.

**Próximo Passo**: Escolha a Opção 1 (recomendada) ou Opção 2 e faça novo deploy.
