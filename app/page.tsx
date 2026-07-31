"use client";

import dynamic from "next/dynamic";
import { FormEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Check, ChevronLeft, ChevronRight,
  CircleDot, Code2, Command, Copy, Database, Download, ExternalLink, GraduationCap,
  Layers3, Mail, Menu, MessageCircle, MonitorCog, Network, Pause, Play, Send,
  Settings2, Sparkles, Volume2, VolumeX, X, Zap,
} from "lucide-react";

const SystemScene = dynamic(() => import("./SystemScene"), { ssr: false });

type Language = "pt" | "en";
type Mode = "professional" | "experience";

const content = {
  pt: {
    nav: ["Sobre", "Capacidades", "Projetos", "Trajetória", "Formação", "Contato"],
    heroRole: "DESENVOLVEDOR DE SISTEMAS, AUTOMAÇÃO E EXPERIÊNCIAS DIGITAIS",
    hero: <>Eu transformo <em>problemas reais</em> em sistemas, automações e experiências digitais.</>,
    heroSub: "Desenvolvedor e estudante de Ciência da Computação, atuando com sistemas, suporte técnico, banco de dados e soluções que facilitam operações do mundo real.",
    explore: "EXPLORAR PROJETOS",
    terminal: "ABRIR TERMINAL",
    manifestoTitle: <>Tecnologia, para mim,<br />começa com um <em>problema real.</em></>,
    manifestoA: "Minha trajetória na tecnologia não foi construída apenas estudando código. Ela nasceu da necessidade de entender problemas, encontrar suas causas e criar soluções que realmente ajudem alguém.",
    manifestoB: "Hoje, transito entre desenvolvimento, suporte técnico, automação, banco de dados, interfaces e operações. Gosto de compreender o sistema inteiro — do usuário que precisa de ajuda até a regra implementada no código.",
  },
  en: {
    nav: ["About", "Capabilities", "Projects", "Journey", "Education", "Contact"],
    heroRole: "SYSTEMS, AUTOMATION & DIGITAL EXPERIENCE DEVELOPER",
    hero: <>I turn <em>real problems</em> into systems, automation and digital experiences.</>,
    heroSub: "Developer and Computer Science student working across systems, advanced technical support, databases and solutions for real-world operations.",
    explore: "EXPLORE PROJECTS",
    terminal: "OPEN TERMINAL",
    manifestoTitle: <>Technology, to me,<br />starts with a <em>real problem.</em></>,
    manifestoA: "My path in technology was not built by studying code alone. It began with the need to understand problems, find their causes and build solutions that genuinely help someone.",
    manifestoB: "Today I move between development, advanced support, automation, databases, interfaces and operations. I like understanding the whole system — from the user who needs help to the rule implemented in code.",
  },
};

const capabilities = [
  ["Code2", "Desenvolvimento de sistemas", "Aplicações web e desktop, interfaces, regras de negócio e integrações."],
  ["Zap", "Automação de processos", "Rotinas manuais e repetitivas convertidas em fluxos seguros, claros e rápidos."],
  ["Database", "Banco de dados", "Modelagem, consultas, validações e manipulação de dados com SQL e PostgreSQL."],
  ["MonitorCog", "Suporte técnico avançado", "Diagnóstico de sistemas, redes, ambientes operacionais e incidentes críticos."],
  ["Sparkles", "Experiência do usuário", "Fluxos claros, interfaces organizadas e produtos que as pessoas conseguem utilizar."],
  ["Settings2", "Análise e melhoria", "Investigação de causas, documentação e evolução contínua de processos e produtos."],
];

const projectCards = [
  {
    id: "01", slug: "sintegrapro", title: "SintegraPro", type: "Sistema desktop fiscal",
    status: "SHOWCASE PÚBLICO", accent: "#00d9ff",
    summary: "Processamento, correção e validação de arquivos fiscais com operação em rede, histórico, backup e atualização distribuída.",
    tech: ["Electron", "Node.js", "PostgreSQL", "NSIS", "PowerShell"],
  },
  {
    id: "02", slug: "ominisafety", title: "OminiSafety", type: "SaaS B2B de segurança do trabalho",
    status: "EM DESENVOLVIMENTO", accent: "#30e88a",
    summary: "Treinamentos, conformidade, provas antifraude, certificados validáveis e evidências auditáveis em uma plataforma multiempresa.",
    tech: ["Next.js", "React", "NestJS", "Prisma", "Redis", "S3"],
  },
  {
    id: "03", slug: "finance-os", title: "Finance OS", type: "Ecossistema financeiro pessoal",
    status: "PROJETO EM DESENVOLVIMENTO", accent: "#ff9d2e",
    summary: "Arquitetura monorepo para despesas, objetivos, relatórios, wishlist e decisões financeiras com web, API e mobile.",
    tech: ["Monorepo", "Web", "API", "Mobile", "IA"],
  },
  {
    id: "04", slug: "whatsapp-hub", title: "WhatsApp Hub", type: "Atendimento multiempresa",
    status: "ARQUITETURA EM EVOLUÇÃO", accent: "#8b7cff",
    summary: "Centralização de conversas, departamentos, filas e automação, com evolução planejada para Meta API, IA e VoIP.",
    tech: ["WhatsApp", "Filas", "Chatbot", "Meta API", "VoIP"],
  },
];

const skills = {
  "Desenvolvimento": ["JavaScript · uso frequente", "TypeScript · uso frequente", "HTML / CSS · uso frequente", "React / Next.js · experiência prática", "Java · em evolução", "APIs REST · experiência prática", "Aplicações desktop / Tauri · experiência prática"],
  "Back-end e dados": ["Node.js · experiência prática", "NestJS · experiência prática", "SQL / PostgreSQL · uso frequente", "Prisma · experiência prática", "Modelagem de dados · experiência prática", "Validações e regras de negócio · uso frequente"],
  "Qualidade e ferramentas": ["Git / GitHub · uso frequente", "Testes · em evolução", "Selenium · experiência prática", "Documentação · uso frequente", "Power BI · experiência prática", "Análise de erros · uso frequente", "Acesso remoto · uso frequente"],
  "Infraestrutura e suporte": ["Windows · uso frequente", "Redes / DNS / gateway · experiência prática", "Cabeamento / switches · experiência prática", "Servidores locais · experiência prática", "Backup e restauração · experiência prática", "Sistemas empresariais · uso frequente"],
};

const layers = [
  ["Interface", "Shell desktop, fluxos guiados e feedback operacional."],
  ["Processamento", "Motor local para leitura, correção e validação SINTEGRA."],
  ["API", "Comunicação local entre servidor, estações e serviços auxiliares."],
  ["Banco de dados", "PostgreSQL como persistência principal e histórico rastreável."],
  ["Servidor", "API local, backup, restauração e publicação de atualizações."],
  ["Estação", "Processamento local, sincronização e consumo de updates."],
  ["Atualização", "Rollout distribuído por versão alvo na rede local."],
  ["Backup", "Proteção e restauração coordenada do ambiente."],
];

const courses = ["Técnico em Informática", "Programador Web", "Projeto de Sistemas Web", "Técnico em Recursos Humanos", "Assistente Administrativo", "Mecânica Automotiva", "Power BI", "Gestão de Projetos"];
const labs = [
  ["Interfaces", "Explorações de fluxos, componentes e sistemas visuais."],
  ["Automações", "Ferramentas internas para eliminar etapas repetitivas."],
  ["IA aplicada", "Provas de conceito, assistentes e análise de dados."],
  ["Hardware & redes", "Experimentos com ambientes locais, diagnóstico e conectividade."],
  ["Power BI", "Dashboards e leitura visual de informação operacional."],
  ["Acadêmico", "Estruturas de dados, Java e projetos de Ciência da Computação."],
];

const terminalHelp = ["help", "about", "experience", "projects", "skills", "education", "contact", "open sintegrapro", "open ominisafety", "system-status", "whoami", "sudo hire-kaiky", "coffee", "fred", "retro", "clear"];

function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (event: MouseEvent<HTMLSpanElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;
    ref.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .14}px, ${(event.clientY - rect.top - rect.height / 2) * .14}px)`;
  };
  return <span ref={ref} className={`magnetic ${className}`} onMouseMove={move} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}>{children}</span>;
}

export default function Home() {
  const reducedSystem = useReducedMotion();
  const [mode, setMode] = useState<Mode>("experience");
  const [language, setLanguage] = useState<Language>("pt");
  const [motionEnabled, setMotionEnabled] = useState(!reducedSystem);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [intro, setIntro] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>(["Kaiky.OS 1.0 — digite “help” para listar os comandos."]);
  const [gallery, setGallery] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [retro, setRetro] = useState(false);
  const [cursor, setCursor] = useState({ x: -50, y: -50, label: "" });
  const projectPin = useRef<HTMLElement>(null);
  const projectRail = useRef<HTMLDivElement>(null);
  const t = content[language];
  const stageTime = useMemo(() => "1 ano e 10 meses", []);
  const sintegraImages = [
    ["dashboard-overview.png", "Dashboard operacional"],
    ["processar-sintegra.png", "Processamento SINTEGRA"],
    ["historico-operacional.png", "Histórico e rastreabilidade"],
    ["configuracao-estacao.png", "Configuração da estação"],
    ["backup-atualizacoes-servidor.png", "Backup e atualizações"],
    ["ajuda-guia-rapido.png", "Guia rápido do sistema"],
  ];

  useEffect(() => {
    const visited = sessionStorage.getItem("kaiky-os-visited");
    if (!visited && !reducedSystem) {
      setIntro(true);
      sessionStorage.setItem("kaiky-os-visited", "1");
      const timer = window.setTimeout(() => setIntro(false), 3200);
      return () => window.clearTimeout(timer);
    }
  }, [reducedSystem]);

  useEffect(() => setMotionEnabled(!reducedSystem), [reducedSystem]);

  useEffect(() => {
    const pointer = (event: PointerEvent) => setCursor((old) => ({ ...old, x: event.clientX, y: event.clientY }));
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") { setPaletteOpen(false); setTerminalOpen(false); setMenuOpen(false); }
    };
    let sequence = "";
    const konami = (event: KeyboardEvent) => {
      sequence = (sequence + event.key).slice(-40);
      if (sequence.includes("ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba")) setRetro(true);
    };
    window.addEventListener("pointermove", pointer);
    window.addEventListener("keydown", key);
    window.addEventListener("keydown", konami);
    return () => { window.removeEventListener("pointermove", pointer); window.removeEventListener("keydown", key); window.removeEventListener("keydown", konami); };
  }, []);

  useEffect(() => {
    if (!motionEnabled || mode !== "experience" || window.innerWidth < 900) return;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const cards = projectRail.current;
      const container = projectPin.current;
      if (!cards || !container) return;
      const distance = () => Math.max(0, cards.scrollWidth - window.innerWidth + 80);
      const tween = gsap.to(cards, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: container, start: "top top", end: () => `+=${distance() + 700}`, scrub: 1, pin: true, invalidateOnRefresh: true },
      });
      const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
      const wordTweens = words.map((word) => gsap.fromTo(word, { color: "#87928c" }, { color: "#07100c", scrollTrigger: { trigger: word, start: "top 75%", end: "bottom 40%", scrub: true } }));
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        wordTweens.forEach((wordTween) => {
          wordTween.scrollTrigger?.kill();
          wordTween.kill();
        });
        gsap.set(cards, { clearProps: "transform" });
      };
    });
    return () => cleanup();
  }, [mode, motionEnabled]);

  function beep() {
    if (!soundEnabled) return;
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audio = new AudioContextClass();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.frequency.value = 520;
    gain.gain.setValueAtTime(.035, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .08);
    oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + .08);
  }

  function goTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: motionEnabled ? "smooth" : "auto" });
    setPaletteOpen(false); setMenuOpen(false); beep();
  }

  function runCommand(event: FormEvent) {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    if (!value) return;
    if (value === "clear") setHistory([]);
    else {
      const responses: Record<string, string> = {
        help: terminalHelp.join(" · "),
        about: "Kaiky Rogis — desenvolvedor, problem solver e entusiasta de sistemas.",
        experience: "Stage Sistemas · Analista de Suporte e Sistemas · set/2024 — atual.",
        projects: "SintegraPro · OminiSafety · Finance OS · WhatsApp Hub · Kaiky Labs.",
        skills: "TypeScript · Next.js · NestJS · PostgreSQL · automação · suporte técnico avançado.",
        education: "Ciência da Computação — UNILESTE · conclusão prevista: dez/2026.",
        contact: "contato.kaikyrogis@gmail.com · LinkedIn · GitHub · WhatsApp.",
        whoami: "Kaiky Rogis\nDeveloper, problem solver and systems enthusiast.\nCurrently building tools that turn complex operations into clear experiences.",
        "system-status": "All systems operational.\nPortfolio version 2.0 · GitHub Pages online.",
        "sudo hire-kaiky": "Permissão concedida. Canal de contato desbloqueado.",
        coffee: "☕ Café convertido em sistemas. Operação estável.",
        fred: "🐾 Fred detectado. Border Collie · Chief Focus Officer.",
        retro: "Modo secreto ativado. Bem-vindo ao terminal de 1984.",
      };
      if (value === "open sintegrapro") { window.open("https://github.com/KaikyRogis/SintegraPro-Showcase", "_blank"); responses[value] = "Abrindo o showcase público do SintegraPro…"; }
      if (value === "open ominisafety") { goTo("#ominisafety"); responses[value] = "Navegando para OminiSafety…"; }
      if (value === "sudo hire-kaiky") goTo("#contact");
      if (value === "retro") setRetro((current) => !current);
      setHistory((old) => [...old, `> ${command}`, responses[value] ?? `Comando não encontrado: ${command}. Tente “help”.`]);
    }
    setCommand(""); beep();
  }

  return (
    <main className={`${mode}-mode ${motionEnabled ? "" : "motion-off"} ${retro ? "retro-mode" : ""}`} id="top">
      <a className="skip-link" href="#content">Pular para o conteúdo</a>
      <div className="cursor" style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }}><span>{cursor.label}</span></div>

      <AnimatePresence>
        {intro && <motion.div className="boot" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }} role="dialog" aria-label="Inicialização do portfólio">
          <button onClick={() => setIntro(false)}>PULAR INTRO</button>
          <div className="boot-copy"><span>KR / SYSTEM BOOT</span><strong>INITIALIZING KAIKY.OS</strong><p>Loading experience…<br />Connecting projects…<br />Systems operational.</p><i /></div>
        </motion.div>}
      </AnimatePresence>

      <header className="nav">
        <a className="brand" href="#top" aria-label="Kaiky Rogis — início"><span>KR</span><b>KAIKY.ROGIS</b></a>
        <nav aria-label="Navegação principal">{["#about", "#capabilities", "#projects", "#experience", "#education", "#contact"].map((id, index) => <button key={id} onClick={() => goTo(id)}>{t.nav[index]}</button>)}</nav>
        <div className="nav-actions">
          <button className="language" onClick={() => setLanguage(language === "pt" ? "en" : "pt")} aria-label="Alternar idioma">{language.toUpperCase()}</button>
          <button className="mode" onClick={() => setMode(mode === "experience" ? "professional" : "experience")}><i />{mode === "experience" ? "EXPERIÊNCIA" : "PROFISSIONAL"}</button>
          <button className="key" onClick={() => setPaletteOpen(true)}><Command size={13} /> K</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>{["#about", "#capabilities", "#projects", "#experience", "#education", "#contact"].map((id, index) => <button key={id} onClick={() => goTo(id)}>{String(index + 1).padStart(2, "0")} / {t.nav[index]}</button>)}</motion.div>}</AnimatePresence>

      <section className="hero" id="content">
        <div className="hero-scene" aria-hidden="true">{motionEnabled && <SystemScene />}</div>
        <div className="grid-plane" aria-hidden="true" />
        <div className="orbital-labels" aria-hidden="true"><span>TS</span><span>SQL</span><span>API</span><span>UX</span><span>DB</span></div>
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <div className="eyebrow"><span>SYS.001</span> {t.heroRole}</div>
          <h1><span>KAIKY</span><br />ROGIS.</h1>
          <p className="hero-lead">{t.hero}</p>
          <p className="hero-sub">{t.heroSub}</p>
          <div className="hero-buttons">
            <Magnetic><button className="primary" onClick={() => goTo("#projects")} onMouseEnter={() => setCursor((v) => ({ ...v, label: "VIEW" }))} onMouseLeave={() => setCursor((v) => ({ ...v, label: "" }))}>{t.explore}<ArrowDownRight size={16} /></button></Magnetic>
            <Magnetic><button className="secondary" onClick={() => setTerminalOpen(true)}>{t.terminal}<Code2 size={16} /></button></Magnetic>
            <a className="icon-button" href="/curriculo-kaiky-rogis.pdf" download aria-label="Baixar currículo"><Download size={17} /></a>
          </div>
        </motion.div>
        <div className="portrait-wrap">
          <div className="portrait-code">KR-DS / 2026</div><img src="/kaiky-portrait.png" alt="Retrato profissional de Kaiky Rogis" /><div className="scan" />
          <div className="portrait-tag"><span>STATUS</span><b>● DISPONÍVEL PARA CONEXÕES</b></div>
        </div>
        <div className="hero-stats">
          <div><span>LOCALIZAÇÃO</span><b>CORONEL FABRICIANO — MG</b></div><div><span>FOCO</span><b>SISTEMAS & AUTOMAÇÃO</b></div><div><span>FORMAÇÃO</span><b>CIÊNCIA DA COMPUTAÇÃO</b></div><div><span>STACK</span><b>TS · NEXT · NEST · POSTGRES</b></div>
        </div>
        <button className="scroll" onClick={() => goTo("#about")}><span>SCROLL TO EXPLORE</span><i /></button>
      </section>

      <section className="manifesto" id="about">
        <div className="section-index">01 / MANIFESTO</div><p className="kicker">COMO EU PENSO</p><h2>{t.manifestoTitle}</h2>
        <div className="manifesto-grid"><p className="manifesto-word">{t.manifestoA}</p><p className="manifesto-word">{t.manifestoB}</p></div>
        <div className="process"><span>PROBLEMA</span><i>→</i><span>ANÁLISE</span><i>→</i><span>ARQUITETURA</span><i>→</i><span>DESENVOLVIMENTO</span><i>→</i><span>RESULTADO</span></div>
      </section>

      <section className="capabilities" id="capabilities">
        <div className="section-heading"><div><p className="kicker">02 / CAPACIDADES</p><h2>O que eu faço<span>.</span></h2></div><p>Sistemas completos exigem mais do que código. Exigem visão do processo inteiro.</p></div>
        <div className="cap-grid">{capabilities.map(([icon, title, text], index) => <motion.article key={title} whileHover={{ y: -8 }}><span>{String(index + 1).padStart(2, "0")}</span><div className="cap-icon">{icon === "Database" ? <Database /> : icon === "Zap" ? <Zap /> : icon === "MonitorCog" ? <MonitorCog /> : icon === "Sparkles" ? <Sparkles /> : icon === "Settings2" ? <Settings2 /> : <Code2 />}</div><h3>{title}</h3><p>{text}</p><b>↗</b></motion.article>)}</div>
      </section>

      <section className="projects-cinema" id="projects" ref={projectPin}>
        <div className="projects-intro"><p className="kicker">03 / SISTEMAS EM CAMPO</p><h2>Projetos com<br /><em>problemas reais.</em></h2><p>Role para atravessar uma sequência de produtos reais, arquiteturas em evolução e decisões técnicas.</p></div>
        <div className="project-rail" ref={projectRail}>
          {projectCards.map((project, index) => <article className={`project-card project-${index + 1}`} key={project.title} style={{ "--accent": project.accent } as React.CSSProperties}>
            <div className="project-card-top"><span>{project.id}</span><b>● {project.status}</b></div>
            <div className="project-system"><div className="system-bar"><i /><i /><i /><span>{project.slug}.system</span></div><div className="system-content"><aside /><div><span /><span /><div><i /><i /><i /></div></div></div></div>
            <p className="kicker">{project.type}</p><h3>{project.title}</h3><p>{project.summary}</p><div className="tags">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
            <button onClick={() => goTo(`#${project.slug}`)}>ABRIR ESTUDO <ArrowDownRight size={15} /></button>
          </article>)}
          <div className="rail-end"><span>04 / 04</span><strong>Agora, entre<br />nos sistemas.</strong><button onClick={() => goTo("#sintegrapro")}>CONTINUAR <ArrowDownRight /></button></div>
        </div>
      </section>

      <section className="case-study sintegra-case" id="sintegrapro">
        <div className="case-head"><div><p className="kicker">CASE 01 / PRODUTO REAL</p><h2>SintegraPro<span>.</span></h2></div><a href="https://github.com/KaikyRogis/SintegraPro-Showcase" target="_blank" rel="noreferrer">SHOWCASE PÚBLICO <ExternalLink size={15} /></a></div>
        <div className="case-metrics"><div><span>AMBIENTE</span><b>WINDOWS / REDE LOCAL</b></div><div><span>ARQUITETURA</span><b>SERVIDOR + ESTAÇÕES</b></div><div><span>PERSISTÊNCIA</span><b>POSTGRESQL</b></div><div><span>STATUS</span><b>EVOLUÇÃO CONTÍNUA</b></div></div>
        <div className="case-story"><article><span>01 / PROBLEMA</span><p>Processos fiscais complexos, sujeitos a erros e com necessidade de rastreabilidade, padronização e validação.</p></article><article><span>02 / SOLUÇÃO</span><p>Sistema desktop com fluxo guiado de processamento, correção, validação, histórico e administração do ambiente.</p></article><article><span>03 / MINHA ATUAÇÃO</span><p>Levantamento de regras, arquitetura, implementação, testes, interface, documentação e evolução do produto.</p></article><article><span>04 / RESULTADO</span><p>Um processo mais padronizado, rastreável e seguro, preparado para operação real em rede.</p></article></div>
        <div className="product-gallery">
          <div className="gallery-frame"><div className="gallery-browser"><span>● ● ●</span><b>SINTEGRAPRO / {sintegraImages[gallery][1].toUpperCase()}</b></div><img src={`/projects/sintegra/${sintegraImages[gallery][0]}`} alt={`Captura real do SintegraPro: ${sintegraImages[gallery][1]}`} /></div>
          <div className="gallery-nav"><button onClick={() => setGallery((gallery - 1 + sintegraImages.length) % sintegraImages.length)} aria-label="Imagem anterior"><ChevronLeft /></button><span>{String(gallery + 1).padStart(2, "0")} / {String(sintegraImages.length).padStart(2, "0")}</span><button onClick={() => setGallery((gallery + 1) % sintegraImages.length)} aria-label="Próxima imagem"><ChevronRight /></button></div>
          <p>Capturas reais do showcase público, com informações sensíveis previamente removidas.</p>
        </div>
        <div className="architecture">
          <div className="architecture-copy"><p className="kicker">ARQUITETURA DESMONTÁVEL</p><h3>Veja o sistema<br />por camadas.</h3><p>Selecione uma camada para isolar sua responsabilidade dentro da arquitetura servidor/estação.</p></div>
          <div className="layer-stack">{layers.map(([title], index) => <button key={title} className={activeLayer === index ? "active" : ""} onClick={() => setActiveLayer(index)} style={{ transform: `translateY(${index * 11}px) translateX(${index * 4}px)` }}><span>{String(index + 1).padStart(2, "0")}</span><b>{title}</b></button>)}</div>
          <div className="layer-detail"><span>LAYER {String(activeLayer + 1).padStart(2, "0")}</span><h4>{layers[activeLayer][0]}</h4><p>{layers[activeLayer][1]}</p><div className="layer-flow"><i /> <i /> <i /></div></div>
        </div>
      </section>

      <section className="case-study omini-case" id="ominisafety">
        <div className="case-head"><div><p className="kicker">CASE 02 / PRODUTO EM DESENVOLVIMENTO</p><h2>OminiSafety<span>.</span></h2></div><b className="status-badge">● EM DESENVOLVIMENTO</b></div>
        <div className="omini-transform">
          <div className="chaos"><span>Planilhas</span><span>Certificados</span><span>Vencimentos</span><span>Treinamentos</span><span>Auditorias</span></div>
          <div className="transform-arrow"><ArrowDownRight /></div>
          <div className="omini-dashboard"><div className="dashboard-nav"><b>OMINI<span>SAFETY</span></b><i /><i /><i /></div><div className="dashboard-grid"><article><span>CONFORMIDADE</span><strong>92%</strong></article><article><span>TREINAMENTOS</span><strong>128</strong></article><article><span>CERTIFICADOS</span><strong>VALIDÁVEIS</strong></article><article className="wide"><span>VISÃO MULTIEMPRESA</span><div className="bars"><i /><i /><i /><i /><i /></div></article></div></div>
        </div>
        <div className="feature-grid">{["Gestão multiempresa", "Perfis de acesso", "Cursos teóricos", "Treinamentos práticos", "Matrículas", "Certificados", "Vencimentos", "Agendamentos", "Auditoria", "Dashboards", "Assistente inteligente", "Experiência mobile"].map((feature) => <span key={feature}><Check size={13} />{feature}</span>)}</div>
        <div className="case-note"><strong>O que este projeto demonstra</strong><p>Visão de produto, arquitetura de sistemas, experiência do usuário, modelagem de processos e capacidade de construir uma solução empresarial além do código.</p></div>
      </section>

      <section className="dual-cases">
        <article id="finance-os"><p className="kicker">CASE 03 / EM DESENVOLVIMENTO</p><h2>Finance OS</h2><p>Ecossistema pessoal para organizar despesas, objetivos, relatórios, wishlist e decisões financeiras.</p><div className="finance-ui"><div><span>SALDO PROJETADO</span><b>R$ •••••</b></div><div className="chart"><i /><i /><i /><i /><i /><i /></div><div className="finance-list"><span>Objetivos <b>06</b></span><span>Relatórios <b>12</b></span><span>Wishlist <b>08</b></span></div></div><div className="tags"><span>MONOREPO</span><span>WEB</span><span>API</span><span>MOBILE</span><span>IA</span></div><small>Recursos planejados não são apresentados como concluídos.</small></article>
        <article id="whatsapp-hub"><p className="kicker">CASE 04 / ARQUITETURA EM EVOLUÇÃO</p><h2>WhatsApp Hub</h2><p>Plataforma multiempresa para centralização de atendimentos, automação e evolução futura para telefonia e inteligência artificial.</p><div className="chat-ui"><aside><i /><i /><i /><i /></aside><div><span className="bubble left">Olá! Como posso ajudar?</span><span className="bubble right">Preciso falar com o financeiro.</span><span className="bubble left">Transferindo para a fila correta…</span></div></div><div className="tags"><span>QR CODE</span><span>FILAS</span><span>DEPARTAMENTOS</span><span>CHATBOT</span><span>META API</span><span>VOIP</span></div></article>
      </section>

      <section className="labs" id="labs">
        <div className="section-heading"><div><p className="kicker">04 / KAIKY LABS</p><h2>Experimentos que<br /><em>alimentam sistemas.</em></h2></div><p>Um espaço para estudos, ferramentas internas, protótipos e curiosidade técnica.</p></div>
        <div className="labs-grid">{labs.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p><div className="lab-signal"><i /><i /><i /></div></article>)}</div>
      </section>

      <section className="experience" id="experience">
        <div className="section-heading"><div><p className="kicker">05 / TRAJETÓRIA</p><h2>Experiência que<br /><em>vira repertório.</em></h2></div></div>
        <div className="timeline">
          <article className="current"><div className="time"><span>09/2024 — ATUAL</span><b>{stageTime}</b></div><div><p className="kicker">STAGE SISTEMAS / IPATINGA — MG</p><h3>Analista de Suporte e Sistemas</h3><p>Atuação multidisciplinar envolvendo suporte técnico ao LinkPro, análise de problemas operacionais, processamento e correção de arquivos fiscais, treinamento de usuários, acesso remoto, infraestrutura e desenvolvimento de ferramentas internas.</p><p>Também participo da melhoria de processos, construção de sistemas, evolução de interfaces e apoio em decisões técnicas da empresa.</p><div className="tags"><span>SUPORTE A CLIENTES</span><span>SINTEGRA E SPED</span><span>AUTOMAÇÃO</span><span>TREINAMENTOS</span><span>WINDOWS</span><span>REDES</span><span>BANCO DE DADOS</span></div></div></article>
          <article><div className="time"><span>04/2022 — 08/2023</span><b>1 ano e 5 meses</b></div><div><p className="kicker">FUNDAÇÃO SÃO FRANCISCO XAVIER</p><h3>Aprendiz de RH Pessoal</h3><p>Rotinas administrativas e sistemas corporativos com SAP Logon 750, organização de processos, controle de dados e suporte a operações internas.</p></div></article>
          <article className="compact"><div className="time"><span>EXPERIÊNCIAS COMPLEMENTARES</span></div><div><p>Estágio na RB1/RB4 Inox · atuação administrativa e tecnológica · experiências com SAP, Tasy e Ronda · projetos sociais e trabalhos independentes.</p></div></article>
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="section-heading"><div><p className="kicker">06 / MAPA TÉCNICO</p><h2>Competência com<br /><em>contexto.</em></h2></div><p>Sem porcentagens arbitrárias: cada tecnologia aparece pelo nível de contato real.</p></div>
        <div className="skill-grid">{Object.entries(skills).map(([group, items]) => <article key={group}><h3>{group}</h3>{items.map((item) => <p key={item}>{item}</p>)}</article>)}</div>
      </section>

      <section className="education" id="education">
        <p className="kicker">07 / FORMAÇÃO</p><div className="education-lead"><h2>Aprender o sistema.<br /><em>Entender as pessoas.</em></h2><div><strong>Ciência da Computação — UNILESTE</strong><span>2023 — DEZEMBRO DE 2026</span><p>Minha formação também passa por áreas administrativas e de pessoas, o que me ajuda a compreender processos, usuários e necessidades empresariais além da parte técnica.</p><blockquote>“Gosto de entender como sistemas funcionam — seja em software, hardware ou mecânica.”</blockquote></div></div>
        <div className="course-line">{courses.map((course) => <span key={course}>{course}</span>)}</div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div><p className="kicker">08 / OPEN CHANNEL</p><h2>Tem um problema que<br />pode virar <em>um sistema?</em></h2><p>Estou sempre aberto a conhecer projetos, oportunidades e desafios onde tecnologia possa simplificar processos e criar experiências melhores.</p>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); window.location.href = `mailto:contato.kaikyrogis@gmail.com?subject=${encodeURIComponent(String(data.get("subject")))}&body=${encodeURIComponent(`Nome: ${data.get("name")}\nE-mail: ${data.get("email")}\n\n${data.get("message")}`)}`; }}>
          <label>Nome<input name="name" required placeholder="Como posso te chamar?" /></label><label>E-mail<input name="email" type="email" required placeholder="voce@empresa.com" /></label><label>Assunto<input name="subject" required placeholder="Projeto, oportunidade ou conversa" /></label><label className="full">Mensagem<textarea name="message" required rows={4} placeholder="Conte um pouco sobre o desafio…" /></label><button className="primary" type="submit">PREPARAR E-MAIL <Send size={15} /></button>
        </form>
        <div className="contact-actions"><a href="mailto:contato.kaikyrogis@gmail.com"><Mail /> E-MAIL</a><a href="https://wa.me/5531973135206" target="_blank" rel="noreferrer"><MessageCircle /> WHATSAPP</a><a href="https://linkedin.com/in/kaikyrogis" target="_blank" rel="noreferrer"><BriefcaseBusiness /> LINKEDIN</a><a href="https://github.com/KaikyRogis" target="_blank" rel="noreferrer"><Code2 /> GITHUB</a><a href="/curriculo-kaiky-rogis.pdf" download><Download /> CURRÍCULO</a></div>
      </section>

      <footer><div className="brand"><span>KR</span><b>KAIKY.ROGIS</b></div><p>KAIKY.OS · PORTFOLIO VERSION 2.0 · LAST UPDATE 31/07/2026</p><p><i /> ALL SYSTEMS OPERATIONAL</p></footer>

      <div className="utility-dock">
        <button onClick={() => setMotionEnabled(!motionEnabled)} aria-label={motionEnabled ? "Desativar animações" : "Ativar animações"}>{motionEnabled ? <Pause /> : <Play />}</button>
        <button onClick={() => { setSoundEnabled(!soundEnabled); if (!soundEnabled) setTimeout(beep, 0); }} aria-label={soundEnabled ? "Desativar sons" : "Ativar sons"}>{soundEnabled ? <Volume2 /> : <VolumeX />}</button>
        <button onClick={() => setTerminalOpen(true)} aria-label="Abrir terminal"><Code2 /></button>
      </div>

      <AnimatePresence>{terminalOpen && <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setTerminalOpen(false)}>
        <motion.div className="terminal" role="dialog" aria-modal="true" aria-label="Terminal interativo" initial={{ scale: .96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96, y: 20 }}><div className="terminal-bar"><span>● ● ●</span><b>KAIKY.OS / TERMINAL</b><button onClick={() => setTerminalOpen(false)} aria-label="Fechar terminal"><X /></button></div><div className="terminal-output">{history.map((line, index) => <pre key={`${line}-${index}`}>{line}</pre>)}</div><form onSubmit={runCommand}><label htmlFor="command">visitor@kaiky.os:~$</label><input id="command" autoFocus value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" /><button type="submit" aria-label="Executar comando"><ArrowUpRight /></button></form></motion.div>
      </motion.div>}</AnimatePresence>

      <AnimatePresence>{paletteOpen && <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && setPaletteOpen(false)}>
        <motion.div className="palette" role="dialog" aria-modal="true" aria-label="Central de navegação" initial={{ scale: .96, y: -15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96, y: -15 }}><div className="palette-top"><Command /><input autoFocus placeholder="Navegar pelo sistema…" /><button onClick={() => setPaletteOpen(false)}>ESC</button></div><p>NAVEGAÇÃO E AÇÕES</p>
          <button onClick={() => goTo("#projects")}><Layers3 /> Explorar projetos <kbd>01</kbd></button><button onClick={() => goTo("#experience")}><BriefcaseBusiness /> Ver experiência <kbd>02</kbd></button><button onClick={() => goTo("#education")}><GraduationCap /> Abrir formação <kbd>03</kbd></button><button onClick={() => { navigator.clipboard.writeText("contato.kaikyrogis@gmail.com"); setPaletteOpen(false); }}><Copy /> Copiar e-mail <kbd>04</kbd></button><button onClick={() => { setPaletteOpen(false); setTerminalOpen(true); }}><Code2 /> Abrir terminal <kbd>05</kbd></button><button onClick={() => setMotionEnabled(!motionEnabled)}>{motionEnabled ? <Pause /> : <Play />} {motionEnabled ? "Desativar" : "Ativar"} animações <kbd>06</kbd></button><a href="/curriculo-kaiky-rogis.pdf" download><Download /> Baixar currículo <kbd>07</kbd></a>
        </motion.div>
      </motion.div>}</AnimatePresence>
    </main>
  );
}
