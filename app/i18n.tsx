"use client";

import {
  cloneElement,
  createContext,
  isValidElement,
  ReactNode,
  useContext,
} from "react";

export type Locale = "pt" | "en";

const LocaleContext = createContext<Locale>("pt");

const english: Record<string, string> = {
  "Pular para o conteúdo": "Skip to content",
  "Inicialização do portfólio": "Portfolio initialization",
  "PULAR INTRO": "SKIP INTRO",
  "DESENVOLVEDOR DE SISTEMAS, AUTOMAÇÃO E": "SYSTEMS, AUTOMATION AND",
  "EXPERIÊNCIAS DIGITAIS": "DIGITAL EXPERIENCES DEVELOPER",
  "Eu transformo ": "I turn ",
  "problemas reais": "real problems",
  " em sistemas, automações e": " into systems, automation and",
  "experiências digitais.": "digital experiences.",
  "Desenvolvedor e estudante de Ciência da Computação, atuando com":
    "Developer and Computer Science student working with",
  "sistemas, suporte técnico, banco de dados e soluções que facilitam":
    "systems, technical support, databases and solutions that improve",
  "operações do mundo real.": "real-world operations.",
  "EXPLORAR PROJETOS": "EXPLORE PROJECTS",
  "ABRIR TERMINAL": "OPEN TERMINAL",
  "Baixar currículo": "Download résumé",
  "Retrato profissional de Kaiky Rogis": "Professional portrait of Kaiky Rogis",
  "DISPONÍVEL PARA CONEXÕES": "OPEN TO CONNECTIONS",
  LOCALIZAÇÃO: "LOCATION",
  FOCO: "FOCUS",
  "SISTEMAS & AUTOMAÇÃO": "SYSTEMS & AUTOMATION",
  "CIÊNCIA DA COMPUTAÇÃO": "COMPUTER SCIENCE",
  "COMO EU PENSO": "HOW I THINK",
  "Tecnologia, para mim,": "Technology, to me,",
  "começa com um ": "starts with a ",
  "problema real.": "real problem.",
  "Minha trajetória na tecnologia não foi construída apenas estudando código. Ela nasceu da necessidade de entender problemas, encontrar suas causas e criar soluções que realmente ajudem alguém.":
    "My path in technology was not built by studying code alone. It grew from the need to understand problems, find their causes and create solutions that genuinely help people.",
  "Hoje, transito entre desenvolvimento, suporte técnico, automação, banco de dados, interfaces e operações. Gosto de compreender o sistema inteiro — do usuário que precisa de ajuda até a regra implementada no código.":
    "Today I work across development, technical support, automation, databases, interfaces and operations. I like understanding the whole system — from the user who needs help to the rule implemented in code.",
  PROBLEMA: "PROBLEM",
  ANÁLISE: "ANALYSIS",
  ARQUITETURA: "ARCHITECTURE",
  DESENVOLVIMENTO: "DEVELOPMENT",
  RESULTADO: "OUTCOME",
  CAPACIDADES: "CAPABILITIES",
  Capacidades: "Capabilities",
  Trajetória: "Experience",
  Formação: "Education",
  Contato: "Contact",
  "O que eu faço": "What I do",
  "Sistemas completos exigem mais do que código. Exigem visão do processo inteiro.":
    "Complete systems demand more than code. They demand a view of the entire process.",
  "Desenvolvimento de sistemas": "Systems development",
  "Aplicações web e desktop, interfaces, regras de negócio e integrações.":
    "Web and desktop applications, interfaces, business rules and integrations.",
  "Automação de processos": "Process automation",
  "Rotinas manuais e repetitivas convertidas em fluxos seguros, claros e rápidos.":
    "Manual and repetitive routines converted into safe, clear and fast workflows.",
  "Banco de dados": "Databases",
  "Modelagem, consultas, validações e manipulação de dados com SQL e PostgreSQL.":
    "Data modeling, queries, validation and manipulation with SQL and PostgreSQL.",
  "Suporte técnico avançado": "Advanced technical support",
  "Diagnóstico de sistemas, redes, ambientes operacionais e incidentes críticos.":
    "Diagnosis of systems, networks, operating environments and critical incidents.",
  "Experiência do usuário": "User experience",
  "Fluxos claros, interfaces organizadas e produtos que as pessoas conseguem utilizar.":
    "Clear flows, organized interfaces and products people can actually use.",
  "Análise e melhoria": "Analysis and improvement",
  "Investigação de causas, documentação e evolução contínua de processos e produtos.":
    "Root-cause investigation, documentation and continuous product and process improvement.",
  "SISTEMAS EM CAMPO": "SYSTEMS IN THE FIELD",
  "Projetos com": "Projects built around",
  "Role para atravessar uma sequência de produtos reais, arquiteturas em evolução e decisões técnicas.":
    "Scroll through real products, evolving architectures and technical decisions.",
  "Deslize para explorar os projetos.": "Swipe to explore the projects.",
  "Agora, entre": "Now, enter",
  "nos sistemas.": "the systems.",
  CONTINUAR: "CONTINUE",
  "PRODUTO REAL": "REAL PRODUCT",
  "Sistema desktop fiscal": "Desktop tax system",
  "Processamento, correção e validação de arquivos fiscais com operação em rede, histórico, backup e atualização distribuída.":
    "Tax-file processing, correction and validation with network operation, history, backup and distributed updates.",
  "SHOWCASE PÚBLICO": "PUBLIC SHOWCASE",
  AMBIENTE: "ENVIRONMENT",
  "REDE LOCAL": "LOCAL NETWORK",
  "SERVIDOR + ESTAÇÕES": "SERVER + WORKSTATIONS",
  PERSISTÊNCIA: "PERSISTENCE",
  "EVOLUÇÃO CONTÍNUA": "CONTINUOUS EVOLUTION",
  SOLUÇÃO: "SOLUTION",
  "MINHA ATUAÇÃO": "MY ROLE",
  "Processos fiscais complexos, sujeitos a erros e com necessidade de rastreabilidade, padronização e validação.":
    "Complex tax processes prone to errors and requiring traceability, standardization and validation.",
  "Sistema desktop com fluxo guiado de processamento, correção, validação, histórico e administração do ambiente.":
    "Desktop system with guided processing, correction, validation, history and environment administration.",
  "Levantamento de regras, arquitetura, implementação, testes, interface, documentação e evolução do produto.":
    "Requirements analysis, architecture, implementation, testing, interface, documentation and product evolution.",
  "Um processo mais padronizado, rastreável e seguro, preparado para operação real em rede.":
    "A more standardized, traceable and secure process, ready for real network operations.",
  "Captura real do SintegraPro": "Real SintegraPro screenshot",
  "Imagem anterior": "Previous image",
  "Próxima imagem": "Next image",
  "Capturas reais do showcase público, com informações sensíveis previamente removidas.":
    "Real screenshots from the public showcase, with sensitive information removed beforehand.",
  "ARQUITETURA DESMONTÁVEL": "EXPLODED ARCHITECTURE",
  "Veja o sistema": "See the system",
  "por camadas.": "layer by layer.",
  "Selecione uma camada para isolar sua responsabilidade dentro da arquitetura servidor/estação.":
    "Select a layer to isolate its responsibility within the server/workstation architecture.",
  Interface: "Interface",
  "Shell desktop, fluxos guiados e feedback operacional.":
    "Desktop shell, guided flows and operational feedback.",
  Processamento: "Processing",
  "Motor local para leitura, correção e validação SINTEGRA.":
    "Local engine for SINTEGRA reading, correction and validation.",
  "Comunicação local entre servidor, estações e serviços auxiliares.":
    "Local communication between server, workstations and supporting services.",
  "PostgreSQL como persistência principal e histórico rastreável.":
    "PostgreSQL as the main persistence layer with traceable history.",
  Servidor: "Server",
  "API local, backup, restauração e publicação de atualizações.":
    "Local API, backup, restoration and update publishing.",
  Estação: "Workstation",
  "Processamento local, sincronização e consumo de updates.":
    "Local processing, synchronization and update consumption.",
  Atualização: "Updates",
  "Rollout distribuído por versão alvo na rede local.":
    "Distributed rollout by target version across the local network.",
  "Proteção e restauração coordenada do ambiente.":
    "Coordinated environment protection and recovery.",
  "PRODUTO EM DESENVOLVIMENTO": "PRODUCT IN DEVELOPMENT",
  "PROJETO EM DESENVOLVIMENTO": "PROJECT IN DEVELOPMENT",
  "SaaS B2B de segurança do trabalho": "B2B workplace safety SaaS",
  "Treinamentos, conformidade, provas antifraude, certificados validáveis e evidências auditáveis em uma plataforma multiempresa.":
    "Training, compliance, anti-fraud assessments, verifiable certificates and auditable evidence in a multi-company platform.",
  "EM DESENVOLVIMENTO": "IN DEVELOPMENT",
  Planilhas: "Spreadsheets",
  Certificados: "Certificates",
  Vencimentos: "Expirations",
  Treinamentos: "Training",
  Auditorias: "Audits",
  CONFORMIDADE: "COMPLIANCE",
  CERTIFICADOS: "CERTIFICATES",
  VALIDÁVEIS: "VERIFIABLE",
  "VISÃO MULTIEMPRESA": "MULTI-COMPANY VIEW",
  "Gestão multiempresa": "Multi-company management",
  "Perfis de acesso": "Access roles",
  "Cursos teóricos": "Theory courses",
  "Treinamentos práticos": "Practical training",
  Matrículas: "Enrollments",
  Agendamentos: "Scheduling",
  Auditoria: "Audit",
  "Assistente inteligente": "Intelligent assistant",
  "Experiência mobile": "Mobile experience",
  "O que este projeto demonstra": "What this project demonstrates",
  "Telas reais da interface administrativa do OminiSafety":
    "Real screens from the OminiSafety administrative interface",
  "Interface real do frontend em desenvolvimento, apresentada com dados demonstrativos.":
    "Real interface from the frontend under development, shown with demonstration data.",
  "Visão de produto, arquitetura de sistemas, experiência do usuário, modelagem de processos e capacidade de construir uma solução empresarial além do código.":
    "Product vision, systems architecture, user experience, process modeling and the ability to build a business solution beyond the code.",
  "ARQUITETURA EM EVOLUÇÃO": "EVOLVING ARCHITECTURE",
  "Ecossistema financeiro pessoal": "Personal finance ecosystem",
  "Arquitetura monorepo para despesas, objetivos, relatórios, wishlist e decisões financeiras com web, API e mobile.":
    "Monorepo architecture for expenses, goals, reports, wishlists and financial decisions across web, API and mobile.",
  "Atendimento multidepartamental": "Multi-department customer service",
  "FRONTEND EM DESENVOLVIMENTO": "FRONTEND IN DEVELOPMENT",
  "Plataforma colaborativa de atendimento com frontend desenvolvido por Hauan Felipe e backend em desenvolvimento por Kaiky Rogis.":
    "Collaborative customer-service platform with a frontend developed by Hauan Felipe and a backend under development by Kaiky Rogis.",
  "PROJETO COLABORATIVO": "COLLABORATIVE PROJECT",
  "Plataforma multidepartamental de atendimento. Kaiky Rogis desenvolve o backend; Hauan Felipe é responsável pelo frontend apresentado neste case.":
    "Multi-department customer-service platform. Kaiky Rogis develops the backend; Hauan Felipe is responsible for the frontend presented in this case.",
  "FRONTEND POR HAUAN FELIPE": "FRONTEND BY HAUAN FELIPE",
  "Ecossistema pessoal para organizar despesas, objetivos, relatórios, wishlist e decisões financeiras.":
    "Personal ecosystem for organizing expenses, goals, reports, wishlists and financial decisions.",
  "SALDO PROJETADO": "PROJECTED BALANCE",
  Objetivos: "Goals",
  Relatórios: "Reports",
  "Recursos planejados não são apresentados como concluídos.":
    "Planned features are not presented as completed.",
  "Plataforma multiempresa para centralização de atendimentos, automação e evolução futura para telefonia e inteligência artificial.":
    "Multi-company platform for centralized customer service, automation and future evolution toward telephony and artificial intelligence.",
  "Olá! Como posso ajudar?": "Hello! How can I help?",
  "Preciso falar com o financeiro.": "I need to speak with finance.",
  "Transferindo para a fila correta…": "Transferring you to the right queue…",
  FILAS: "QUEUES",
  DEPARTAMENTOS: "DEPARTMENTS",
  "Experimentos que": "Experiments that",
  "alimentam sistemas.": "fuel systems.",
  "Um espaço para estudos, ferramentas internas, protótipos e curiosidade técnica.":
    "A space for studies, internal tools, prototypes and technical curiosity.",
  "Explorações de fluxos, componentes e sistemas visuais.":
    "Explorations of flows, components and visual systems.",
  Automações: "Automation",
  "Ferramentas internas para eliminar etapas repetitivas.":
    "Internal tools that eliminate repetitive steps.",
  "IA aplicada": "Applied AI",
  "Provas de conceito, assistentes e análise de dados.":
    "Proofs of concept, assistants and data analysis.",
  "Hardware & redes": "Hardware & networks",
  "Experimentos com ambientes locais, diagnóstico e conectividade.":
    "Experiments with local environments, diagnostics and connectivity.",
  "Dashboards e leitura visual de informação operacional.":
    "Dashboards and visual reading of operational information.",
  Acadêmico: "Academic",
  "Estruturas de dados, Java e projetos de Ciência da Computação.":
    "Data structures, Java and Computer Science projects.",
  TRAJETÓRIA: "EXPERIENCE",
  "Experiência que": "Experience that",
  "vira repertório.": "becomes perspective.",
  "SETEMBRO DE 2024 — PRESENTE": "SEPTEMBER 2024 — PRESENT",
  "Analista de Suporte e Sistemas": "Support and Systems Analyst",
  "Atuação multidisciplinar envolvendo suporte técnico ao LinkPro, análise de problemas operacionais, processamento e correção de arquivos fiscais, treinamento de usuários, acesso remoto, infraestrutura e desenvolvimento de ferramentas internas.":
    "Multidisciplinary work involving LinkPro technical support, operational problem analysis, tax-file processing and correction, user training, remote access, infrastructure and internal tool development.",
  "Também participo da melhoria de processos, construção de sistemas, evolução de interfaces e apoio em decisões técnicas da empresa.":
    "I also contribute to process improvement, systems development, interface evolution and the company's technical decisions.",
  "SUPORTE A CLIENTES": "CUSTOMER SUPPORT",
  AUTOMAÇÃO: "AUTOMATION",
  TREINAMENTOS: "TRAINING",
  REDES: "NETWORKS",
  "BANCO DE DADOS": "DATABASES",
  "1 ano e 5 meses": "1 year and 5 months",
  "Aprendiz de RH Pessoal": "HR Operations Apprentice",
  "Rotinas administrativas e sistemas corporativos com SAP Logon 750, organização de processos, controle de dados e suporte a operações internas.":
    "Administrative routines and corporate systems using SAP Logon 750, process organization, data control and internal operations support.",
  "EXPERIÊNCIAS COMPLEMENTARES": "ADDITIONAL EXPERIENCE",
  "Estágio na RB1/RB4 Inox · atuação administrativa e tecnológica · experiências com SAP, Tasy e Ronda · projetos sociais e trabalhos independentes.":
    "Internship at RB1/RB4 Inox · administrative and technology work · experience with SAP, Tasy and Ronda · social projects and independent work.",
  "MAPA TÉCNICO": "TECHNICAL MAP",
  "Competência com": "Skills with",
  "contexto.": "context.",
  "Sem porcentagens arbitrárias: cada tecnologia aparece pelo nível de contato real.":
    "No arbitrary percentages: each technology is shown according to real hands-on experience.",
  Desenvolvimento: "Development",
  "Back-end e dados": "Back end and data",
  "Qualidade e ferramentas": "Quality and tools",
  "Infraestrutura e suporte": "Infrastructure and support",
  "uso frequente": "frequent use",
  "experiência prática": "hands-on experience",
  "em evolução": "developing",
  "Aplicações desktop / Tauri": "Desktop applications / Tauri",
  "Modelagem de dados": "Data modeling",
  "Validações e regras de negócio": "Validation and business rules",
  Documentação: "Documentation",
  "Análise de erros": "Error analysis",
  "Servidores locais": "Local servers",
  "Backup e restauração": "Backup and recovery",
  "Sistemas empresariais": "Enterprise systems",
  FORMAÇÃO: "EDUCATION",
  "Aprender o sistema.": "Learn the system.",
  "Entender as pessoas.": "Understand people.",
  "Ciência da Computação — UNILESTE": "Computer Science — UNILESTE",
  "DEZEMBRO DE 2026": "DECEMBER 2026",
  "Minha formação também passa por áreas administrativas e de pessoas, o que me ajuda a compreender processos, usuários e necessidades empresariais além da parte técnica.":
    "My education also includes administrative and people-focused fields, helping me understand processes, users and business needs beyond the technical side.",
  "Gosto de entender como sistemas funcionam — seja em software, hardware ou mecânica.":
    "I enjoy understanding how systems work — whether in software, hardware or mechanics.",
  "Técnico em Informática": "IT Technician",
  "Programador Web": "Web Developer",
  "Projeto de Sistemas Web": "Web Systems Design",
  "Técnico em Recursos Humanos": "Human Resources Technician",
  "Assistente Administrativo": "Administrative Assistant",
  "Mecânica Automotiva": "Automotive Mechanics",
  "Gestão de Projetos": "Project Management",
  "Tem um problema que": "Have a problem that",
  "pode virar ": "could become ",
  "um sistema?": "a system?",
  "Estou sempre aberto a conhecer projetos, oportunidades e desafios onde tecnologia possa simplificar processos e criar experiências melhores.":
    "I am always open to projects, opportunities and challenges where technology can simplify processes and create better experiences.",
  CURRÍCULO: "RÉSUMÉ",
  "E-MAIL": "EMAIL",
  "Desativar animações": "Disable animations",
  "Ativar animações": "Enable animations",
  "Desativar sons": "Disable sounds",
  "Ativar sons": "Enable sounds",
  "Abrir terminal": "Open terminal",
  "Kaiky Rogis — início": "Kaiky Rogis — home",
  "Navegação principal": "Main navigation",
  Sobre: "About",
  Projetos: "Projects",
  "Alternar modo de visualização": "Switch viewing mode",
  EXPERIÊNCIA: "EXPERIENCE",
  PROFISSIONAL: "PROFESSIONAL",
  "Abrir central de comandos": "Open command center",
  "Fechar menu": "Close menu",
  "Abrir menu": "Open menu",
  "Navegação móvel": "Mobile navigation",
  "Controles da experiência": "Experience controls",
  "Alternar para modo Profissional": "Switch to Professional mode",
  "Alternar para modo Experiência": "Switch to Experience mode",
  "Explorar projetos": "Explore projects",
  "Ver experiência": "View experience",
  "Abrir formação": "Open education",
  "Copiar e-mail": "Copy email",
  "Pesquisar ações": "Search actions",
  "Navegar pelo sistema…": "Navigate the system…",
  "NAVEGAÇÃO E AÇÕES · USE ↑ ↓ E ENTER":
    "NAVIGATION AND ACTIONS · USE ↑ ↓ AND ENTER",
  "Resultados da busca": "Search results",
  "Nenhuma ação encontrada.": "No actions found.",
  Nome: "Name",
  "Como posso te chamar?": "How should I address you?",
  Assunto: "Subject",
  "Projeto, oportunidade ou conversa": "Project, opportunity or conversation",
  Mensagem: "Message",
  "Conte um pouco sobre o desafio…": "Tell me a little about the challenge…",
  "ABRIR E-MAIL": "OPEN EMAIL",
  "MENSAGEM COPIADA": "MESSAGE COPIED",
  "COPIAR MENSAGEM": "COPY MESSAGE",
  "Ao continuar, abriremos o aplicativo de e-mail do seu dispositivo. Se ele não estiver configurado, use “Copiar mensagem”.":
    "When you continue, your device's email application will open. If it is not configured, use “Copy message”.",
  "Fechar terminal": "Close terminal",
  "Comando do terminal": "Terminal command",
  "Executar comando": "Run command",
  "digite “help” para listar os comandos.": "type “help” to list commands.",
  "desenvolvedor, problem solver e entusiasta de sistemas.":
    "developer, problem solver and systems enthusiast.",
  "setembro/2024 — presente.": "September 2024 — present.",
  "Ciência da Computação — UNILESTE · conclusão prevista: dez/2026.":
    "Computer Science — UNILESTE · expected completion: Dec 2026.",
  "Permissão concedida. Canal de contato desbloqueado.":
    "Permission granted. Contact channel unlocked.",
  "Café convertido em sistemas. Operação estável.":
    "Coffee converted into systems. Stable operation.",
  "Fred detectado. Border Collie · Chief Focus Officer.":
    "Fred detected. Border Collie · Chief Focus Officer.",
  "Modo secreto alternado. Bem-vindo ao terminal de 1984.":
    "Secret mode toggled. Welcome to the 1984 terminal.",
  "Abrindo o showcase público do SintegraPro…":
    "Opening the public SintegraPro showcase…",
  "Navegando para OminiSafety…": "Navigating to OminiSafety…",
  "Comando não encontrado": "Command not found",
  "Tente “help”.": "Try “help”.",
};

const entries = Object.entries(english).sort(([a], [b]) => b.length - a.length);

export function translateText(value: string, locale: Locale) {
  if (locale === "pt") return value;
  return entries.reduce(
    (translated, [source, target]) => translated.split(source).join(target),
    value,
  );
}

function translateNode(node: ReactNode, locale: Locale): ReactNode {
  if (typeof node === "string") return translateText(node, locale);
  if (Array.isArray(node))
    return node.map((item) => translateNode(item, locale));
  if (!isValidElement<Record<string, unknown>>(node)) return node;

  const props: Record<string, unknown> = {};
  for (const key of ["aria-label", "alt", "placeholder", "title"]) {
    if (typeof node.props[key] === "string")
      props[key] = translateText(node.props[key] as string, locale);
  }
  if ("children" in node.props)
    props.children = translateNode(node.props.children as ReactNode, locale);
  return cloneElement(node, props);
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function Localized({ children }: { children: ReactNode }) {
  const locale = useContext(LocaleContext);
  return <>{translateNode(children, locale)}</>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
