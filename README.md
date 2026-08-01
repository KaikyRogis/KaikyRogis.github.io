# Kaiky Rogis — Digital Systems

Portfólio profissional de Kaiky Rogis, desenvolvido para apresentar experiências reais em sistemas, automação, suporte técnico, banco de dados e produtos digitais.

![Prévia do portfólio Kaiky Rogis — Digital Systems](./public/portfolio-preview.webp)

## Site

[kaikyrogis.github.io](https://kaikyrogis.github.io) · [English version](https://kaikyrogis.github.io/en/)

## Destaques

- apresentação cinematográfica com versão de movimento reduzido;
- terminal interativo e central de navegação com `Ctrl + K`;
- estudos de caso de SintegraPro, OminiSafety, Finance OS e OmniChat, com
  capturas reais das interfaces e status apresentados de forma transparente;
- trajetória profissional, formação e mapa de competências;
- currículo atualizado para download com o nome original do arquivo;
- layout responsivo e navegação por teclado;
- publicação automática no GitHub Pages.
- versão integral em inglês na rota `/en/`, com metadados próprios;
- monitoramento diário de build, links internos e disponibilidade pública.

## Arquitetura

```text
app/
├── components/   # interface, diálogos, contato e cursor isolado
├── data/         # conteúdo estruturado do portfólio
├── hooks/        # comportamento acessível compartilhado
├── layout.tsx    # SEO, metadados e dados estruturados
└── page.tsx      # composição das seções e experiência
```

O site usa exportação estática do Next.js para o GitHub Pages. A integração mínima com Vinext/Cloudflare é mantida exclusivamente para a cópia privada de revisão; não há banco de dados, migrações ou infraestrutura D1 no portfólio.

## Desenvolvimento

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev
```

## Qualidade

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run check:links
npm run monitor
```

O build estático é gerado em `out/`. A versão 2.4.1 mantém a experiência orientada por evidências, corrige grids de status incompletos e adiciona uma rotina estável de captura visual por seção para desktop e mobile.

## Validação local

```bash
npm ci
npm run quality
npm run build:sites
npm audit --omit=dev
npm run test:visual
npm run capture:qa
```

## Licença e conteúdo

O código-fonte é disponibilizado sob a [licença MIT](./LICENSE). Textos autorais, currículo, retrato e demais imagens pessoais permanecem protegidos conforme a [licença de conteúdo](./CONTENT-LICENSE.md).
