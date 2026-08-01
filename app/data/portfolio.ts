export const capabilities = [
  [
    "Code2",
    "Desenvolvimento de sistemas",
    "Aplicações web e desktop, interfaces, regras de negócio e integrações.",
  ],
  [
    "Zap",
    "Automação de processos",
    "Rotinas manuais e repetitivas convertidas em fluxos seguros, claros e rápidos.",
  ],
  [
    "Database",
    "Banco de dados",
    "Modelagem, consultas, validações e manipulação de dados com SQL e PostgreSQL.",
  ],
  [
    "MonitorCog",
    "Suporte técnico avançado",
    "Diagnóstico de sistemas, redes, ambientes operacionais e incidentes críticos.",
  ],
  [
    "Sparkles",
    "Experiência do usuário",
    "Fluxos claros, interfaces organizadas e produtos que as pessoas conseguem utilizar.",
  ],
  [
    "Settings2",
    "Análise e melhoria",
    "Investigação de causas, documentação e evolução contínua de processos e produtos.",
  ],
] as const;

export const projectCards = [
  {
    id: "01",
    slug: "sintegrapro",
    title: "SintegraPro",
    type: "Sistema desktop fiscal",
    status: "SHOWCASE PÚBLICO",
    accent: "#00d9ff",
    summary:
      "Processamento, correção e validação de arquivos fiscais com operação em rede, histórico, backup e atualização distribuída.",
    tech: ["Electron", "Node.js", "PostgreSQL", "NSIS", "PowerShell"],
  },
  {
    id: "02",
    slug: "ominisafety",
    title: "OminiSafety",
    type: "SaaS B2B de segurança do trabalho",
    status: "AJUSTES FINAIS / HOMOLOGAÇÃO",
    accent: "#30e88a",
    summary:
      "Produto multiempresa em homologação, com treinamentos, conformidade, provas antifraude, certificados validáveis e evidências auditáveis.",
    tech: ["Next.js", "React", "NestJS", "Prisma", "Redis", "S3"],
  },
  {
    id: "03",
    slug: "finance-os",
    title: "Finance OS",
    type: "Ecossistema financeiro pessoal",
    status: "PROJETO EM DESENVOLVIMENTO",
    accent: "#ff9d2e",
    summary:
      "Arquitetura monorepo para despesas, objetivos, relatórios, wishlist e decisões financeiras com web, API e mobile.",
    tech: ["Monorepo", "Web", "API", "Mobile", "IA"],
  },
  {
    id: "04",
    slug: "omnichat",
    title: "OmniChat",
    type: "Atendimento multidepartamental",
    status: "FRONTEND EM DESENVOLVIMENTO",
    accent: "#8b7cff",
    summary:
      "Plataforma colaborativa de atendimento com frontend desenvolvido por Hauan Felipe e backend em desenvolvimento por Kaiky Rogis.",
    tech: ["WhatsApp", "Filas", "Chatbot", "Meta API", "VoIP"],
  },
] as const;

export const skills = {
  Desenvolvimento: [
    "JavaScript · uso frequente",
    "TypeScript · uso frequente",
    "HTML / CSS · uso frequente",
    "React / Next.js · experiência prática",
    "Java · em evolução",
    "APIs REST · experiência prática",
    "Aplicações desktop / Tauri · experiência prática",
  ],
  "Back-end e dados": [
    "Node.js · experiência prática",
    "NestJS · experiência prática",
    "SQL / PostgreSQL · uso frequente",
    "Prisma · experiência prática",
    "Modelagem de dados · experiência prática",
    "Validações e regras de negócio · uso frequente",
  ],
  "Qualidade e ferramentas": [
    "Git / GitHub · uso frequente",
    "Testes · em evolução",
    "Selenium · experiência prática",
    "Documentação · uso frequente",
    "Power BI · experiência prática",
    "Análise de erros · uso frequente",
    "Acesso remoto · uso frequente",
  ],
  "Infraestrutura e suporte": [
    "Windows · uso frequente",
    "Redes / DNS / gateway · experiência prática",
    "Cabeamento / switches · experiência prática",
    "Servidores locais · experiência prática",
    "Backup e restauração · experiência prática",
    "Sistemas empresariais · uso frequente",
  ],
} as const;

export const layers = [
  ["Interface", "Shell desktop, fluxos guiados e feedback operacional."],
  ["Processamento", "Motor local para leitura, correção e validação SINTEGRA."],
  ["API", "Comunicação local entre servidor, estações e serviços auxiliares."],
  [
    "Banco de dados",
    "PostgreSQL como persistência principal e histórico rastreável.",
  ],
  ["Servidor", "API local, backup, restauração e publicação de atualizações."],
  ["Estação", "Processamento local, sincronização e consumo de updates."],
  ["Atualização", "Rollout distribuído por versão alvo na rede local."],
  ["Backup", "Proteção e restauração coordenada do ambiente."],
] as const;

export const courses = [
  "Técnico em Informática",
  "Programador Web",
  "Projeto de Sistemas Web",
  "Técnico em Recursos Humanos",
  "Assistente Administrativo",
  "Mecânica Automotiva",
  "Power BI",
  "Gestão de Projetos",
] as const;

export const labs = [
  ["Interfaces", "Explorações de fluxos, componentes e sistemas visuais."],
  ["Automações", "Ferramentas internas para eliminar etapas repetitivas."],
  ["IA aplicada", "Provas de conceito, assistentes e análise de dados."],
  [
    "Hardware & redes",
    "Experimentos com ambientes locais, diagnóstico e conectividade.",
  ],
  ["Power BI", "Dashboards e leitura visual de informação operacional."],
  [
    "Acadêmico",
    "Estruturas de dados, Java e projetos de Ciência da Computação.",
  ],
] as const;

export const sintegraImages = [
  ["dashboard-overview.webp", "Dashboard operacional"],
  ["processar-sintegra.webp", "Processamento SINTEGRA"],
  ["historico-operacional.webp", "Histórico e rastreabilidade"],
  ["configuracao-estacao.webp", "Configuração da estação"],
  ["backup-atualizacoes-servidor.webp", "Backup e atualizações"],
  ["ajuda-guia-rapido.webp", "Guia rápido do sistema"],
] as const;
