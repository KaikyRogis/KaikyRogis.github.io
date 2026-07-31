"use client";

import { useEffect, useMemo, useState } from "react";

const projects = [
  {
    id: "01",
    title: "SintegraPro",
    type: "Sistema desktop fiscal",
    status: "Showcase público",
    summary:
      "Processamento, correção e validação de arquivos fiscais com operação em rede, histórico, backup e atualização distribuída.",
    tags: ["PostgreSQL", "Desktop", "Servidor/Estação", "Automação"],
    result: "Um fluxo fiscal mais padronizado, rastreável e seguro.",
    link: "https://github.com/KaikyRogis",
  },
  {
    id: "02",
    title: "OminiSafety",
    type: "SaaS B2B de segurança",
    status: "Em desenvolvimento",
    summary:
      "Plataforma multiempresa para treinamentos, conformidade, provas antifraude, certificados validáveis e evidências auditáveis.",
    tags: ["Next.js", "NestJS", "TypeScript", "Multi-tenant"],
    result: "Visão de produto aplicada a uma operação corporativa complexa.",
  },
  {
    id: "03",
    title: "Finance OS",
    type: "Ecossistema financeiro pessoal",
    status: "Em desenvolvimento",
    summary:
      "Uma experiência integrada para organizar despesas, objetivos, relatórios, wishlist e decisões financeiras.",
    tags: ["Monorepo", "Web", "API", "Mobile"],
    result: "Arquitetura em evolução — recursos planejados não são apresentados como concluídos.",
  },
  {
    id: "04",
    title: "WhatsApp Hub",
    type: "Atendimento multiempresa",
    status: "Arquitetura em evolução",
    summary:
      "Centralização de atendimentos, filas, departamentos e automação com evolução planejada para Meta API, IA e VoIP.",
    tags: ["Multiempresa", "Filas", "Chatbot", "Integrações"],
    result: "Uma base para transformar conversas dispersas em operação organizada.",
  },
];

const capabilities = [
  ["01", "Desenvolvimento de sistemas", "Aplicações web e desktop, interfaces, regras de negócio e integrações."],
  ["02", "Automação de processos", "Rotinas manuais transformadas em fluxos mais seguros, claros e rápidos."],
  ["03", "Banco de dados", "Modelagem, consultas, validações e manipulação de dados com SQL e PostgreSQL."],
  ["04", "Suporte técnico avançado", "Diagnóstico de sistemas, redes, ambientes operacionais e problemas críticos."],
  ["05", "Experiência do usuário", "Fluxos organizados e interfaces que as pessoas realmente conseguem utilizar."],
  ["06", "Análise e melhoria", "Investigação de causas e evolução contínua de processos e produtos."],
];

const skills = {
  Desenvolvimento: ["TypeScript · uso frequente", "JavaScript · uso frequente", "React / Next.js · experiência prática", "HTML / CSS · uso frequente", "Java · em evolução", "Tauri · experiência prática"],
  "Back-end & dados": ["Node.js · experiência prática", "NestJS · experiência prática", "PostgreSQL · uso frequente", "SQL · uso frequente", "APIs REST · experiência prática", "Prisma · experiência prática"],
  "Qualidade & ferramentas": ["Git / GitHub · uso frequente", "Testes · em evolução", "Selenium · experiência prática", "Power BI · experiência prática", "Documentação · uso frequente", "Análise de erros · uso frequente"],
  "Infraestrutura & suporte": ["Windows · uso frequente", "Redes / DNS / gateway · experiência prática", "Servidores locais · experiência prática", "Backup e restauração · experiência prática", "Acesso remoto · uso frequente", "Sistemas empresariais · uso frequente"],
};

const terminalResponses: Record<string, string> = {
  help: "about · experience · projects · skills · education · contact · clear",
  about: "Kaiky Rogis — desenvolvedor, problem solver e entusiasta de sistemas.",
  experience: "Stage Sistemas · Analista de Suporte e Sistemas · set/2024 — atual",
  projects: "SintegraPro · OminiSafety · Finance OS · WhatsApp Hub",
  skills: "TypeScript · Next.js · NestJS · PostgreSQL · automação · suporte avançado",
  education: "Ciência da Computação — UNILESTE · conclusão prevista: dez/2026",
  contact: "contato.kaikyrogis@gmail.com · linkedin.com/in/kaikyrogis",
  whoami: "Kaiky Rogis\nDeveloper, problem solver and systems enthusiast.\nBuilding tools that turn complex operations into clear experiences.",
  "system-status": "All systems operational. Portfolio v1.0.",
  coffee: "Café convertido em sistemas: 100% operacional.",
  fred: "🐾 Fred detectado no sistema. Border Collie, chief focus officer.",
  "sudo hire-kaiky": "Permissão concedida. Abrindo canal de contato…",
};

export default function Home() {
  const [experienceMode, setExperienceMode] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("Digite “help” para ver os comandos.");
  const stageTime = useMemo(() => "1 ano e 10 meses", []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visited = window.sessionStorage.getItem("kaiky-os-visited");
    if (!reduced && !visited) {
      setIntro(true);
      window.sessionStorage.setItem("kaiky-os-visited", "1");
      const timer = window.setTimeout(() => setIntro(false), 2800);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setTerminalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function runCommand(event: React.FormEvent) {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();
    if (normalized === "clear") setOutput("");
    else if (normalized === "open ominisafety") setOutput("OminiSafety · SaaS B2B em desenvolvimento.");
    else if (normalized === "open sintegrapro") setOutput("SintegraPro · abrindo o estudo de caso principal.");
    else setOutput(terminalResponses[normalized] ?? `Comando não encontrado: ${command}. Tente “help”.`);
    setCommand("");
  }

  function goTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setPaletteOpen(false);
  }

  return (
    <main className={experienceMode ? "experience-mode" : "professional-mode"}>
      {intro && (
        <div className="boot" role="dialog" aria-label="Inicialização do portfólio">
          <button onClick={() => setIntro(false)}>PULAR INTRO</button>
          <div className="boot-copy">
            <span>KR / SYSTEM BOOT</span>
            <strong>INITIALIZING KAIKY.OS</strong>
            <p>Loading experience…<br />Connecting projects…<br />Systems operational.</p>
            <i />
          </div>
        </div>
      )}

      <header className="nav">
        <a className="brand" href="#top" aria-label="Início">
          <span>KR</span><b>KAIKY.ROGIS</b>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#about">Sobre</a><a href="#projects">Projetos</a><a href="#experience">Experiência</a>
        </nav>
        <div className="nav-actions">
          <button className="mode" onClick={() => setExperienceMode((value) => !value)}>
            <i /> {experienceMode ? "MODO EXPERIÊNCIA" : "MODO PROFISSIONAL"}
          </button>
          <button className="key" onClick={() => setPaletteOpen(true)}>CTRL K</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="grid-plane" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span>SYS.001</span> DIGITAL SYSTEMS / BRAZIL</div>
          <h1><span>KAIKY</span><br />ROGIS.</h1>
          <p className="hero-lead">Eu transformo <em>problemas reais</em> em sistemas, automações e experiências digitais.</p>
          <p className="hero-sub">Desenvolvedor e estudante de Ciência da Computação, atuando com sistemas, suporte técnico, banco de dados e soluções para operações do mundo real.</p>
          <div className="hero-buttons">
            <a className="primary" href="#projects">EXPLORAR PROJETOS <span>↘</span></a>
            <button className="secondary" onClick={() => setTerminalOpen(true)}>ABRIR TERMINAL <span>_</span></button>
          </div>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-code">KR-DS / 2026</div>
          <img src="/kaiky-portrait.png" alt="Retrato profissional de Kaiky Rogis" />
          <div className="scan" />
          <div className="portrait-tag"><span>STATUS</span><b>● DISPONÍVEL PARA CONEXÕES</b></div>
        </div>
        <div className="hero-stats">
          <div><span>LOCALIZAÇÃO</span><b>CORONEL FABRICIANO — MG</b></div>
          <div><span>FOCO</span><b>SISTEMAS & AUTOMAÇÃO</b></div>
          <div><span>FORMAÇÃO</span><b>CIÊNCIA DA COMPUTAÇÃO</b></div>
          <div><span>STACK</span><b>TS · NEXT · NEST · POSTGRES</b></div>
        </div>
        <a className="scroll" href="#about"><span>SCROLL TO EXPLORE</span><i /></a>
      </section>

      <section className="manifesto" id="about">
        <div className="section-index">01 / MANIFESTO</div>
        <p className="kicker">COMO EU PENSO</p>
        <h2>Tecnologia, para mim,<br />começa com um <em>problema real.</em></h2>
        <div className="manifesto-grid">
          <p>Minha trajetória na tecnologia não foi construída apenas estudando código. Ela nasceu da necessidade de <strong>entender problemas</strong>, encontrar suas causas e criar soluções que realmente ajudem alguém.</p>
          <p>Hoje, transito entre desenvolvimento, suporte técnico, automação, banco de dados, interfaces e operações. Gosto de compreender o sistema inteiro — do usuário à regra implementada no código.</p>
        </div>
        <div className="process"><span>PROBLEMA</span><i>→</i><span>ANÁLISE</span><i>→</i><span>ARQUITETURA</span><i>→</i><span>DESENVOLVIMENTO</span><i>→</i><span>RESULTADO</span></div>
      </section>

      <section className="capabilities">
        <div className="section-heading"><div><p className="kicker">02 / CAPACIDADES</p><h2>O que eu faço<span>.</span></h2></div><p>Sistemas completos exigem mais do que código. Exigem visão do processo inteiro.</p></div>
        <div className="cap-grid">
          {capabilities.map(([id, title, text]) => <article key={id}><span>{id}</span><h3>{title}</h3><p>{text}</p><b>↗</b></article>)}
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="section-heading"><div><p className="kicker">03 / SISTEMAS EM CAMPO</p><h2>Projetos com<br /><em>problemas reais.</em></h2></div><p>Produtos e arquiteturas pensados para operações complexas — com status apresentado de forma honesta.</p></div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project" key={project.title}>
              <div className={`project-visual visual-${index + 1}`}>
                <span className="project-no">{project.id}</span>
                <div className="window">
                  <div className="window-bar"><i /><i /><i /><b>{project.title.toUpperCase()} / SYSTEM</b></div>
                  <div className="window-content">
                    <div className="mini-sidebar" />
                    <div className="mini-main"><span /><span /><div><i /><i /><i /></div><b /></div>
                  </div>
                </div>
                <div className="status-chip">● {project.status}</div>
              </div>
              <div className="project-copy">
                <p className="kicker">{project.id} / {project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="result"><span>RESULTADO / DIREÇÃO</span><p>{project.result}</p></div>
                {project.link && <a href={project.link} target="_blank" rel="noreferrer">VER SHOWCASE NO GITHUB ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="section-heading"><div><p className="kicker">04 / TRAJETÓRIA</p><h2>Experiência que<br /><em>vira repertório.</em></h2></div></div>
        <div className="timeline">
          <article className="current">
            <div className="time"><span>09/2024 — ATUAL</span><b>{stageTime}</b></div>
            <div><p className="kicker">STAGE SISTEMAS / IPATINGA — MG</p><h3>Analista de Suporte e Sistemas</h3><p>Atuação multidisciplinar com LinkPro, análise de problemas operacionais, arquivos fiscais, treinamento de usuários, infraestrutura e desenvolvimento de ferramentas internas.</p><div className="tags"><span>SINTEGRA & SPED</span><span>AUTOMAÇÃO</span><span>SUPORTE AVANÇADO</span><span>BANCO DE DADOS</span></div></div>
          </article>
          <article>
            <div className="time"><span>04/2022 — 08/2023</span><b>1 ano e 5 meses</b></div>
            <div><p className="kicker">FUNDAÇÃO SÃO FRANCISCO XAVIER</p><h3>Aprendiz de RH Pessoal</h3><p>Rotinas administrativas e sistemas corporativos, incluindo SAP, com foco em processos, dados, organização e eficiência operacional.</p></div>
          </article>
        </div>
      </section>

      <section className="skills">
        <div className="section-heading"><div><p className="kicker">05 / MAPA TÉCNICO</p><h2>Competência com<br /><em>contexto.</em></h2></div><p>Sem porcentagens arbitrárias. Cada tecnologia é apresentada pelo nível de contato real.</p></div>
        <div className="skill-grid">{Object.entries(skills).map(([group, items]) => <article key={group}><h3>{group}</h3>{items.map((item) => <p key={item}>{item}</p>)}</article>)}</div>
      </section>

      <section className="education">
        <p className="kicker">06 / FORMAÇÃO</p>
        <div className="education-lead"><h2>Aprender o sistema.<br /><em>Entender as pessoas.</em></h2><div><strong>Ciência da Computação — UNILESTE</strong><span>2023 — dezembro de 2026</span><p>Minha formação também passa por áreas administrativas e de pessoas. Isso amplia minha leitura de processos, usuários e necessidades empresariais além da parte técnica.</p></div></div>
        <div className="course-line"><span>Programação Web</span><span>Projeto de Sistemas Web</span><span>Recursos Humanos</span><span>Power BI</span><span>Gestão de Projetos</span><span>Mecânica Automotiva</span></div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
        <p className="kicker">07 / OPEN CHANNEL</p>
        <h2>Tem um problema que<br />pode virar <em>um sistema?</em></h2>
        <p>Estou aberto a projetos, oportunidades e desafios onde tecnologia possa simplificar processos e criar experiências melhores.</p>
        <div className="contact-actions">
          <a className="primary" href="mailto:contato.kaikyrogis@gmail.com">INICIAR CONVERSA ↗</a>
          <a href="https://linkedin.com/in/kaikyrogis" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
          <a href="https://github.com/KaikyRogis" target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="/curriculo-kaiky-rogis.pdf" download>BAIXAR CURRÍCULO ↓</a>
        </div>
      </section>

      <footer><div className="brand"><span>KR</span><b>KAIKY.ROGIS</b></div><p>© 2026 — DESIGNED TO SOLVE.</p><p><i /> ALL SYSTEMS OPERATIONAL</p></footer>

      {terminalOpen && <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && setTerminalOpen(false)}>
        <div className="terminal" role="dialog" aria-modal="true" aria-label="Terminal interativo">
          <div className="terminal-bar"><span>● ● ●</span><b>KAIKY.OS / TERMINAL</b><button onClick={() => setTerminalOpen(false)}>×</button></div>
          <pre>{output}</pre>
          <form onSubmit={runCommand}><label htmlFor="command">visitor@kaiky.os:~$</label><input id="command" autoFocus value={command} onChange={(e) => setCommand(e.target.value)} autoComplete="off" /></form>
        </div>
      </div>}

      {paletteOpen && <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && setPaletteOpen(false)}>
        <div className="palette" role="dialog" aria-modal="true" aria-label="Navegação rápida">
          <div className="palette-top"><span>⌘</span><input autoFocus placeholder="Navegar pelo sistema…" /><button onClick={() => setPaletteOpen(false)}>ESC</button></div>
          <p>NAVEGAÇÃO</p>
          <button onClick={() => goTo("#projects")}><span>↘</span> Explorar projetos <kbd>01</kbd></button>
          <button onClick={() => goTo("#experience")}><span>⌁</span> Ver experiência <kbd>02</kbd></button>
          <button onClick={() => goTo("#contact")}><span>✦</span> Abrir contato <kbd>03</kbd></button>
          <button onClick={() => { setPaletteOpen(false); setTerminalOpen(true); }}><span>_</span> Abrir terminal <kbd>04</kbd></button>
        </div>
      </div>}
    </main>
  );
}
