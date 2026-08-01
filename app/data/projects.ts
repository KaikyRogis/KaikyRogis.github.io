export type ProjectShot = {
  src: string;
  alt: { pt: string; en: string };
  caption: { pt: string; en: string };
  width: number;
  height: number;
};

type Localized = { pt: string; en: string };

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  category: Localized;
  status: Localized;
  accent: string;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  role: Localized;
  scope: Localized;
  stack: string[];
  contribution: Localized;
  implemented: string[];
  developing: string[];
  roadmap: string[];
  statusLabels?: { developing?: Localized };
  screenshots: ProjectShot[];
  note: Localized;
  collaboration?: {
    backend: Localized;
    frontend: Localized;
    url: string;
  };
};

export const projects: PortfolioProject[] = [
  {
    id: "01",
    slug: "sintegrapro",
    title: "SintegraPro",
    accent: "#00d9ff",
    category: { pt: "Sistema desktop fiscal", en: "Fiscal desktop system" },
    status: { pt: "SHOWCASE PÚBLICO", en: "PUBLIC SHOWCASE" },
    summary: {
      pt: "Processamento, correção e validação de arquivos fiscais com operação em rede, histórico, backup e atualização distribuída.",
      en: "Processing, correction and validation of fiscal files with network operation, history, backup and distributed updates.",
    },
    problem: {
      pt: "Processos fiscais complexos, sujeitos a erros e que exigem rastreabilidade, padronização e validação.",
      en: "Complex, error-prone fiscal workflows that require traceability, standardization and validation.",
    },
    solution: {
      pt: "Sistema desktop com fluxo guiado, histórico operacional e administração de servidor e estações.",
      en: "A desktop system with guided workflows, operational history, and server and workstation administration.",
    },
    role: {
      pt: "Arquitetura, desenvolvimento, testes, interface, documentação e evolução",
      en: "Architecture, development, testing, interface, documentation and evolution",
    },
    scope: {
      pt: "Operação fiscal interna em rede local",
      en: "Internal fiscal operation on a local network",
    },
    stack: ["Electron", "Node.js", "PostgreSQL", "NSIS", "PowerShell"],
    contribution: {
      pt: "Transformei regras operacionais em um fluxo rastreável, com persistência, backup e distribuição de atualizações.",
      en: "I turned operational rules into a traceable workflow with persistence, backup and distributed updates.",
    },
    implemented: [
      "Desktop",
      "Servidor + estações",
      "PostgreSQL",
      "Backup",
      "Atualizações",
    ],
    developing: ["Evolução contínua"],
    roadmap: [],
    screenshots: [
      ["dashboard-overview.webp", "Dashboard operacional"],
      ["processar-sintegra.webp", "Processamento SINTEGRA"],
      ["historico-operacional.webp", "Histórico e rastreabilidade"],
      ["configuracao-estacao.webp", "Configuração da estação"],
      ["backup-atualizacoes-servidor.webp", "Backup e atualizações"],
      ["ajuda-guia-rapido.webp", "Guia rápido do sistema"],
    ].map(([file, caption]) => ({
      src: `/projects/sintegra/${file}`,
      alt: {
        pt: `Captura real do SintegraPro: ${caption}`,
        en: `Real SintegraPro screen: ${caption}`,
      },
      caption: { pt: caption, en: caption },
      width: 1920,
      height: 1032,
    })),
    note: {
      pt: "Capturas reais do showcase público, com informações sensíveis removidas.",
      en: "Real public showcase screens with sensitive information removed.",
    },
  },
  {
    id: "02",
    slug: "ominisafety",
    title: "OminiSafety",
    accent: "#30e88a",
    category: {
      pt: "SaaS B2B de segurança do trabalho",
      en: "B2B occupational safety SaaS",
    },
    status: { pt: "HOMOLOGAÇÃO INTERNA", en: "INTERNAL VALIDATION" },
    summary: {
      pt: "SaaS multiempresa para treinamentos e conformidade, em homologação interna.",
      en: "Multi-company SaaS for training and compliance, under internal validation.",
    },
    problem: {
      pt: "Planilhas dispersas, certificados, vencimentos, treinamentos e auditorias sem uma visão central.",
      en: "Scattered spreadsheets, certificates, expirations, training and audits without a central view.",
    },
    solution: {
      pt: "Gestão centralizada de treinamentos, conformidade, evidências e certificados validáveis.",
      en: "Centralized management of training, compliance, evidence and verifiable certificates.",
    },
    role: {
      pt: "Sócio e Desenvolvedor Full Stack",
      en: "Partner and Full Stack Developer",
    },
    scope: {
      pt: "SaaS multiempresa para treinamentos e conformidade",
      en: "Multi-company SaaS for training and compliance",
    },
    stack: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Redis", "S3"],
    contribution: {
      pt: "Produto, arquitetura, backend, frontend, modelagem multiempresa e fluxos de conformidade.",
      en: "Product, architecture, backend, frontend, multi-company modeling and compliance workflows.",
    },
    implemented: [
      "Multiempresa",
      "Perfis de acesso",
      "Cursos",
      "Treinamentos",
      "Certificados",
      "Auditoria",
    ],
    developing: ["Homologação interna", "Ajustes de produto"],
    statusLabels: {
      developing: { pt: "EM VALIDAÇÃO", en: "IN VALIDATION" },
    },
    roadmap: ["Assistente inteligente", "Evolução mobile"],
    screenshots: [
      {
        src: "/projects/ominisafety/dashboard-plataforma.webp",
        alt: {
          pt: "Dashboard administrativo demonstrativo da OminiSafety",
          en: "OminiSafety demonstration admin dashboard",
        },
        caption: {
          pt: "Dashboard multiempresa e alertas operacionais",
          en: "Multi-company dashboard and operational alerts",
        },
        width: 1920,
        height: 1080,
      },
      {
        src: "/projects/ominisafety/gestao-empresas.webp",
        alt: {
          pt: "Gestão demonstrativa de empresas na OminiSafety",
          en: "OminiSafety demonstration company management",
        },
        caption: {
          pt: "Gestão de empresas, contratos e status",
          en: "Company, contract and status management",
        },
        width: 1920,
        height: 1080,
      },
      {
        src: "/projects/ominisafety/catalogo-ehs.webp",
        alt: {
          pt: "Catálogo EHS demonstrativo da OminiSafety",
          en: "OminiSafety demonstration EHS catalog",
        },
        caption: {
          pt: "Catálogo legal de treinamentos EHS",
          en: "Legal EHS training catalog",
        },
        width: 1920,
        height: 1080,
      },
    ],
    note: {
      pt: "Capturas do produto em ambiente local com dados totalmente demonstrativos.",
      en: "Product screens from a local environment with fully demonstrative data.",
    },
  },
  {
    id: "03",
    slug: "finance-os",
    title: "Finance OS",
    accent: "#ff9d2e",
    category: {
      pt: "Ecossistema financeiro pessoal",
      en: "Personal finance ecosystem",
    },
    status: {
      pt: "EM DESENVOLVIMENTO PARA USO PESSOAL",
      en: "IN DEVELOPMENT FOR PERSONAL USE",
    },
    summary: {
      pt: "Sistema pessoal para despesas, cartões, objetivos, planejamento e decisões financeiras.",
      en: "Personal system for expenses, cards, goals, planning and financial decisions.",
    },
    problem: {
      pt: "Informações financeiras pessoais distribuídas entre diferentes controles.",
      en: "Personal financial information spread across different controls.",
    },
    solution: {
      pt: "Uma visão integrada de saldo, cartões, faturas, planejamento e wishlist.",
      en: "An integrated view of balance, cards, invoices, planning and wishlist.",
    },
    role: {
      pt: "Idealização, arquitetura e desenvolvimento Full Stack",
      en: "Concept, architecture and Full Stack development",
    },
    scope: {
      pt: "Ferramenta privada para organização financeira pessoal",
      en: "Private tool for personal financial organization",
    },
    stack: ["Monorepo", "Web", "API", "PostgreSQL"],
    contribution: {
      pt: "Modelei os domínios financeiros e conectei frontend, API e PostgreSQL em uma experiência única.",
      en: "I modeled the financial domains and connected frontend, API and PostgreSQL into one experience.",
    },
    implemented: [
      "Frontend",
      "API",
      "PostgreSQL",
      "Dashboard",
      "Cartões e faturas",
      "Planejamento",
      "Wishlist",
    ],
    developing: ["Relatórios", "Refinamento de fluxos"],
    roadmap: [
      "Aplicativo mobile",
      "Assistente inteligente",
      "Automações adicionais",
    ],
    screenshots: [
      {
        src: "/projects/finance-os/dashboard-financeiro.webp",
        alt: {
          pt: "Dashboard demonstrativo do Finance OS",
          en: "Finance OS demonstration dashboard",
        },
        caption: {
          pt: "Dashboard, saldo e projeção financeira",
          en: "Dashboard, balance and financial projection",
        },
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/finance-os/planejamento-wishlist.webp",
        alt: {
          pt: "Wishlist demonstrativa do Finance OS",
          en: "Finance OS demonstration wishlist",
        },
        caption: {
          pt: "Wishlist, prioridade e progresso financeiro",
          en: "Wishlist, priority and financial progress",
        },
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/finance-os/faturas-cartoes.webp",
        alt: {
          pt: "Cartões e faturas demonstrativos do Finance OS",
          en: "Finance OS demonstration cards and invoices",
        },
        caption: {
          pt: "Cartões, faturas, pagamentos e limites",
          en: "Cards, invoices, payments and limits",
        },
        width: 1265,
        height: 712,
      },
    ],
    note: {
      pt: "Capturas do sistema pessoal executado com frontend, API e PostgreSQL locais. Valores são demonstrativos.",
      en: "Screens from the personal system running with local frontend, API and PostgreSQL. Values are demonstrative.",
    },
  },
  {
    id: "04",
    slug: "omnichat",
    title: "OmniChat",
    accent: "#8b7cff",
    category: {
      pt: "Atendimento multidepartamental",
      en: "Multi-department customer service",
    },
    status: {
      pt: "EM DESENVOLVIMENTO COLABORATIVO",
      en: "COLLABORATIVE DEVELOPMENT",
    },
    summary: {
      pt: "Plataforma colaborativa de atendimento com central, filas, conversas e agenda.",
      en: "Collaborative service platform with an inbox, queues, conversations and schedule.",
    },
    problem: {
      pt: "Atendimentos, departamentos e retornos precisam compartilhar contexto em uma operação central.",
      en: "Customer interactions, departments and follow-ups need shared context in one central operation.",
    },
    solution: {
      pt: "Central de atendimento com filas, conversas, agenda e base para integrações futuras.",
      en: "Service inbox with queues, conversations, schedule and a foundation for future integrations.",
    },
    role: {
      pt: "Backend e arquitetura — em desenvolvimento",
      en: "Backend and architecture — in development",
    },
    scope: {
      pt: "Projeto colaborativo de atendimento empresarial",
      en: "Collaborative business service project",
    },
    stack: ["Backend", "Frontend colaborativo", "Filas", "Departamentos"],
    contribution: {
      pt: "Sou responsável pelo backend e pela arquitetura. O frontend mostrado foi desenvolvido por Hauan Felipe.",
      en: "I am responsible for the backend and architecture. The frontend shown was developed by Hauan Felipe.",
    },
    implemented: [
      "Frontend colaborativo",
      "Filas",
      "Departamentos",
      "Conversas",
      "Agenda",
    ],
    developing: ["Backend", "Integração frontend/backend"],
    roadmap: ["Meta API", "IA", "VoIP", "Automações"],
    collaboration: {
      backend: {
        pt: "Kaiky Rogis — backend e arquitetura em desenvolvimento",
        en: "Kaiky Rogis — backend and architecture in development",
      },
      frontend: {
        pt: "Hauan Felipe — frontend apresentado neste case",
        en: "Hauan Felipe — frontend shown in this case",
      },
      url: "https://github.com/HauanFelipe/Chat/tree/frontend-hauan",
    },
    screenshots: [
      {
        src: "/projects/omnichat/central-atendimento.webp",
        alt: {
          pt: "Central demonstrativa de atendimento do OmniChat",
          en: "OmniChat demonstration service inbox",
        },
        caption: {
          pt: "Filas, conversas e comentários internos",
          en: "Queues, conversations and internal comments",
        },
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/omnichat/agenda.webp",
        alt: {
          pt: "Agenda demonstrativa do OmniChat",
          en: "OmniChat demonstration schedule",
        },
        caption: {
          pt: "Agenda de compromissos e retornos",
          en: "Schedule for appointments and follow-ups",
        },
        width: 1280,
        height: 720,
      },
      {
        src: "/projects/omnichat/login.webp",
        alt: {
          pt: "Login demonstrativo do OmniChat",
          en: "OmniChat demonstration login",
        },
        caption: {
          pt: "Acesso corporativo ao painel",
          en: "Corporate dashboard access",
        },
        width: 1265,
        height: 712,
      },
    ],
    note: {
      pt: "Capturas do frontend colaborativo com conteúdo demonstrativo e sem métricas de adoção.",
      en: "Screens from the collaborative frontend with demonstration content and no adoption metrics.",
    },
  },
];
