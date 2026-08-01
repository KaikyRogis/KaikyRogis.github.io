"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDownRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  Mail,
  MonitorCog,
  Pause,
  Play,
  Settings2,
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { CommandPalette } from "./components/CommandPalette";
import { ContactForm } from "./components/ContactForm";
import { CustomCursor } from "./components/CustomCursor";
import { Header, PortfolioMode } from "./components/Header";
import { Magnetic } from "./components/Magnetic";
import { Terminal } from "./components/Terminal";
import { SkillsAccordion } from "./components/SkillsAccordion";
import { ProjectCase } from "./components/projects/ProjectCase";
import { ProjectRail } from "./components/projects/ProjectRail";
import { capabilities, courses, labs, skills } from "./data/portfolio";
import { projects } from "./data/projects";
import { Locale, LocaleProvider, Localized } from "./i18n";

const SystemScene = dynamic(() => import("./SystemScene"), { ssr: false });

export function PortfolioPage({ locale = "pt" }: { locale?: Locale }) {
  const reducedSystem = useReducedMotion();
  const [mode, setMode] = useState<PortfolioMode>("experience");
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [intro, setIntro] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [retro, setRetro] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("about");
  const [pageProgress, setPageProgress] = useState(0);
  const projectPin = useRef<HTMLElement>(null);
  const projectRail = useRef<HTMLDivElement>(null);
  const projectIntro = useRef<HTMLDivElement>(null);
  const projectProgressVisible =
    activeSection === "projects" && Boolean(activeProject);

  useEffect(() => {
    if (!reducedSystem) return;
    const timer = window.setTimeout(() => setMotionEnabled(false), 0);
    return () => window.clearTimeout(timer);
  }, [reducedSystem]);

  useEffect(() => {
    const updateProgress = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      setPageProgress(
        available > 0 ? Math.round((window.scrollY / available) * 100) : 0,
      );
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveProject((visible.target as HTMLElement).id);
          setActiveSection("projects");
        }
      },
      { rootMargin: "-34% 0px -52%", threshold: [0, 0.2, 0.5] },
    );
    projects.forEach((project) => {
      const node = document.getElementById(project.slug);
      if (node) observer.observe(node);
    });
    const navigationObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection((visible.target as HTMLElement).id);
      },
      { rootMargin: "-28% 0px -60%", threshold: [0, 0.15, 0.4] },
    );
    [
      "about",
      "capabilities",
      "projects",
      "labs",
      "experience",
      "skills",
      "education",
      "contact",
    ].forEach((id) => {
      const node = document.getElementById(id);
      if (node) navigationObserver.observe(node);
    });
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      observer.disconnect();
      navigationObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  useEffect(() => {
    const visited = sessionStorage.getItem("kaiky-os-visited");
    if (!visited && !reducedSystem) {
      sessionStorage.setItem("kaiky-os-visited", "1");
      const startTimer = window.setTimeout(() => setIntro(true), 0);
      const endTimer = window.setTimeout(() => setIntro(false), 3200);
      return () => {
        window.clearTimeout(startTimer);
        window.clearTimeout(endTimer);
      };
    }
  }, [reducedSystem]);

  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setTerminalOpen(false);
        setMenuOpen(false);
      }
    };
    let sequence = "";
    const konami = (event: KeyboardEvent) => {
      sequence = (sequence + event.key).slice(-40);
      if (
        sequence.includes(
          "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba",
        )
      )
        setRetro(true);
    };
    window.addEventListener("keydown", key);
    window.addEventListener("keydown", konami);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("keydown", konami);
    };
  }, []);

  useEffect(() => {
    if (intro || !motionEnabled || mode !== "experience") return;
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (idleWindow.requestIdleCallback) {
      const id = idleWindow.requestIdleCallback(() => setSceneReady(true), {
        timeout: 1600,
      });
      return () => idleWindow.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(() => setSceneReady(true), 500);
    return () => window.clearTimeout(timer);
  }, [intro, mode, motionEnabled]);

  useEffect(() => {
    if (!motionEnabled || mode !== "experience" || window.innerWidth < 900)
      return;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapModule, triggerModule]) => {
        const gsap = gsapModule.default;
        const ScrollTrigger = triggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        const cards = projectRail.current;
        const container = projectPin.current;
        const introElement = projectIntro.current;
        if (!cards || !container || !introElement) return;
        const distance = () =>
          Math.max(0, cards.scrollWidth - window.innerWidth + 80);
        const tween = gsap.to(cards, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${distance() + 700}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        const introTween = gsap.fromTo(
          introElement,
          { autoAlpha: 1, scale: 1, x: 0 },
          {
            autoAlpha: 0,
            scale: 0.82,
            x: -120,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=35%",
              scrub: true,
            },
          },
        );
        const words = gsap.utils.toArray<HTMLElement>(".manifesto-word");
        const wordTweens = words.map((word) =>
          gsap.fromTo(
            word,
            { color: "#59645e" },
            {
              color: "#07100c",
              scrollTrigger: {
                trigger: word,
                start: "top 75%",
                end: "bottom 40%",
                scrub: true,
              },
            },
          ),
        );
        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          introTween.scrollTrigger?.kill();
          introTween.kill();
          wordTweens.forEach((wordTween) => {
            wordTween.scrollTrigger?.kill();
            wordTween.kill();
          });
          gsap.set(cards, { clearProps: "transform" });
          gsap.set(introElement, { clearProps: "all" });
        };
      },
    );
    return () => cleanup();
  }, [mode, motionEnabled]);

  const beep = useCallback(() => {
    if (!soundEnabled) return;
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const audio = new AudioContextClass();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.frequency.value = 520;
    gain.gain.setValueAtTime(0.035, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.08);
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 0.08);
  }, [soundEnabled]);

  const goTo = useCallback(
    (id: string) => {
      document
        .querySelector(id)
        ?.scrollIntoView({ behavior: motionEnabled ? "smooth" : "auto" });
      setPaletteOpen(false);
      setMenuOpen(false);
      beep();
    },
    [beep, motionEnabled],
  );

  const closeTerminal = useCallback(() => setTerminalOpen(false), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  return (
    <LocaleProvider locale={locale}>
      <Localized>
        <MotionConfig reducedMotion={motionEnabled ? "never" : "always"}>
          <a className="skip-link" href="#content">
            Pular para o conteúdo
          </a>
          <CustomCursor />
          <Header
            locale={locale}
            activeSection={activeSection}
            menuOpen={menuOpen}
            mode={mode}
            motionEnabled={motionEnabled}
            soundEnabled={soundEnabled}
            onNavigate={goTo}
            onMenuToggle={() => setMenuOpen((value) => !value)}
            onModeToggle={() =>
              setMode((value) =>
                value === "experience" ? "professional" : "experience",
              )
            }
            onMotionToggle={() => setMotionEnabled((value) => !value)}
            onPaletteOpen={() => {
              setMenuOpen(false);
              setPaletteOpen(true);
            }}
            onSoundToggle={() => setSoundEnabled((value) => !value)}
          />
          <aside
            className={`section-progress ${projectProgressVisible ? "visible" : ""}`}
            aria-live="polite"
          >
            <span className="desktop-progress">
              PROJETOS /{" "}
              {projects
                .find((project) => project.slug === activeProject)
                ?.title.toUpperCase() ?? ""}
            </span>
            <span className="mobile-progress">
              CASE{" "}
              {projects.find((project) => project.slug === activeProject)?.id ??
                "--"}{" "}
              / 04
            </span>
            <i>
              <b style={{ width: `${pageProgress}%` }} />
            </i>
            <em>{pageProgress}%</em>
            <details className="mobile-dock-menu">
              <summary aria-label="Abrir controles da experiência">•••</summary>
              <div>
                <button
                  onClick={() => setMotionEnabled(!motionEnabled)}
                  aria-pressed={!motionEnabled}
                >
                  {motionEnabled ? <Pause /> : <Play />} Movimento
                </button>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  aria-pressed={soundEnabled}
                >
                  {soundEnabled ? <Volume2 /> : <VolumeX />} Som
                </button>
                <button onClick={() => setTerminalOpen(true)}>
                  <Code2 /> Terminal
                </button>
              </div>
            </details>
          </aside>

          <main
            className={`${mode}-mode ${motionEnabled ? "" : "motion-off"} ${retro ? "retro-mode" : ""}`}
            id="top"
          >
            <AnimatePresence>
              {intro && (
                <motion.div
                  className="boot"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                  role="dialog"
                  aria-label="Inicialização do portfólio"
                >
                  <button onClick={() => setIntro(false)}>PULAR INTRO</button>
                  <div className="boot-copy">
                    <span>KR / SYSTEM BOOT</span>
                    <strong>INITIALIZING KAIKY.OS</strong>
                    <p>
                      Loading experience…
                      <br />
                      Connecting projects…
                      <br />
                      Systems operational.
                    </p>
                    <i />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <section className="hero" id="content">
              <div className="hero-scene" aria-hidden="true">
                {sceneReady && motionEnabled && mode === "experience" && (
                  <SystemScene />
                )}
              </div>
              <div className="grid-plane" aria-hidden="true" />
              <div className="orbital-labels" aria-hidden="true">
                <span>TS</span>
                <span>SQL</span>
                <span>API</span>
                <span>UX</span>
                <span>DB</span>
              </div>
              <motion.div
                className="hero-copy"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="eyebrow">
                  <span>SYS.001</span> DESENVOLVEDOR DE SISTEMAS, AUTOMAÇÃO E
                  EXPERIÊNCIAS DIGITAIS
                </div>
                <h1>
                  <span>KAIKY</span>
                  <br />
                  ROGIS.
                </h1>
                <p className="hero-lead">
                  Eu transformo <em>problemas reais</em> em sistemas, automações
                  e experiências digitais.
                </p>
                <p className="hero-sub">
                  Desenvolvedor e estudante de Ciência da Computação, atuando
                  com sistemas, suporte técnico, banco de dados e soluções que
                  facilitam operações do mundo real.
                </p>
                <div className="hero-buttons">
                  <Magnetic>
                    <button
                      className="primary"
                      data-cursor="VIEW"
                      onClick={() => goTo("#projects")}
                    >
                      EXPLORAR PROJETOS
                      <ArrowDownRight size={16} />
                    </button>
                  </Magnetic>
                  <Magnetic>
                    <button
                      className="secondary"
                      onClick={() => setTerminalOpen(true)}
                    >
                      ABRIR TERMINAL
                      <Code2 size={16} />
                    </button>
                  </Magnetic>
                  <a
                    className="icon-button"
                    href="/Currículo - Kaiky Rogis Vieira De Jesus.pdf"
                    download="Currículo - Kaiky Rogis Vieira De Jesus.pdf"
                    aria-label="Baixar currículo"
                  >
                    <Download size={17} />
                  </a>
                </div>
              </motion.div>
              <div className="portrait-wrap">
                <div className="portrait-code">KR-DS / 2026</div>
                <Image
                  src="/kaiky-portrait.webp"
                  alt="Retrato profissional de Kaiky Rogis"
                  width={1022}
                  height={898}
                  preload
                />
                <div className="scan" />
                <div className="portrait-tag">
                  <span>STATUS</span>
                  <b>● DISPONÍVEL PARA CONEXÕES</b>
                </div>
              </div>
              <div className="hero-stats">
                <div>
                  <span>LOCALIZAÇÃO</span>
                  <b>CORONEL FABRICIANO — MG</b>
                </div>
                <div>
                  <span>FOCO</span>
                  <b>SISTEMAS & AUTOMAÇÃO</b>
                </div>
                <div>
                  <span>FORMAÇÃO</span>
                  <b>CIÊNCIA DA COMPUTAÇÃO</b>
                </div>
                <div>
                  <span>STACK</span>
                  <b>TS · NEXT · NEST · POSTGRES</b>
                </div>
              </div>
              <button className="scroll" onClick={() => goTo("#about")}>
                <span>SCROLL TO EXPLORE</span>
                <i />
              </button>
            </section>

            <section className="manifesto" id="about">
              <div className="section-index">01 / MANIFESTO</div>
              <p className="kicker">COMO EU PENSO</p>
              <h2>
                Tecnologia, para mim,
                <br />
                começa com um <em>problema real.</em>
              </h2>
              <div className="manifesto-grid">
                <p className="manifesto-word">
                  Minha trajetória na tecnologia não foi construída apenas
                  estudando código. Ela nasceu da necessidade de entender
                  problemas, encontrar suas causas e criar soluções que
                  realmente ajudem alguém.
                </p>
                <p className="manifesto-word">
                  Hoje, transito entre desenvolvimento, suporte técnico,
                  automação, banco de dados, interfaces e operações. Gosto de
                  compreender o sistema inteiro — do usuário que precisa de
                  ajuda até a regra implementada no código.
                </p>
              </div>
              <div className="process">
                <span>PROBLEMA</span>
                <i>→</i>
                <span>ANÁLISE</span>
                <i>→</i>
                <span>ARQUITETURA</span>
                <i>→</i>
                <span>DESENVOLVIMENTO</span>
                <i>→</i>
                <span>RESULTADO</span>
              </div>
            </section>

            <section className="capabilities" id="capabilities">
              <div className="section-heading">
                <div>
                  <p className="kicker">02 / CAPACIDADES</p>
                  <h2>
                    O que eu faço<span>.</span>
                  </h2>
                </div>
                <p>
                  Sistemas completos exigem mais do que código. Exigem visão do
                  processo inteiro.
                </p>
              </div>
              <div className="cap-grid">
                {capabilities.map(([icon, title, text], index) => (
                  <motion.article
                    key={title}
                    whileHover={motionEnabled ? { y: -8 } : undefined}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div className="cap-icon">
                      {icon === "Database" ? (
                        <Database />
                      ) : icon === "Zap" ? (
                        <Zap />
                      ) : icon === "MonitorCog" ? (
                        <MonitorCog />
                      ) : icon === "Sparkles" ? (
                        <Sparkles />
                      ) : icon === "Settings2" ? (
                        <Settings2 />
                      ) : (
                        <Code2 />
                      )}
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <b>↗</b>
                  </motion.article>
                ))}
              </div>
            </section>

            <ProjectRail
              locale={locale}
              sectionRef={projectPin}
              railRef={projectRail}
              introRef={projectIntro}
              onNavigate={goTo}
            />
            <div className="evidence-cases">
              {projects.map((project) => (
                <ProjectCase
                  key={project.slug}
                  project={project}
                  locale={locale}
                />
              ))}
            </div>

            <section className="labs" id="labs">
              <div className="section-heading">
                <div>
                  <p className="kicker">04 / KAIKY LABS</p>
                  <h2>
                    Experimentos que
                    <br />
                    <em>alimentam sistemas.</em>
                  </h2>
                </div>
                <p>
                  Um espaço para estudos, ferramentas internas, protótipos e
                  curiosidade técnica.
                </p>
              </div>
              <div className="labs-grid">
                {labs.map(([title, text], index) => (
                  <article key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <div className="lab-signal">
                      <i />
                      <i />
                      <i />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="experience" id="experience">
              <div className="section-heading">
                <div>
                  <p className="kicker">05 / TRAJETÓRIA</p>
                  <h2>
                    Experiência que
                    <br />
                    <em>vira repertório.</em>
                  </h2>
                </div>
              </div>
              <div className="timeline">
                <article className="current">
                  <div className="time">
                    <span>SETEMBRO DE 2024 — PRESENTE</span>
                  </div>
                  <div>
                    <p className="kicker">STAGE SISTEMAS / IPATINGA — MG</p>
                    <h3>Analista de Suporte e Sistemas</h3>
                    <p>
                      Atuação multidisciplinar envolvendo suporte técnico ao
                      LinkPro, análise de problemas operacionais, processamento
                      e correção de arquivos fiscais, treinamento de usuários,
                      acesso remoto, infraestrutura e desenvolvimento de
                      ferramentas internas.
                    </p>
                    <p>
                      Também participo da melhoria de processos, construção de
                      sistemas, evolução de interfaces e apoio em decisões
                      técnicas da empresa.
                    </p>
                    <div className="tags">
                      <span>SUPORTE A CLIENTES</span>
                      <span>SINTEGRA E SPED</span>
                      <span>AUTOMAÇÃO</span>
                      <span>TREINAMENTOS</span>
                      <span>WINDOWS</span>
                      <span>REDES</span>
                      <span>BANCO DE DADOS</span>
                    </div>
                  </div>
                </article>
                <article>
                  <div className="time">
                    <span>04/2022 — 08/2023</span>
                    <b>1 ano e 5 meses</b>
                  </div>
                  <div>
                    <p className="kicker">FUNDAÇÃO SÃO FRANCISCO XAVIER</p>
                    <h3>Aprendiz de RH Pessoal</h3>
                    <p>
                      Rotinas administrativas e sistemas corporativos com SAP
                      Logon 750, organização de processos, controle de dados e
                      suporte a operações internas.
                    </p>
                  </div>
                </article>
                <article className="compact">
                  <div className="time">
                    <span>EXPERIÊNCIAS COMPLEMENTARES</span>
                  </div>
                  <div>
                    <p>
                      Estágio na RB1/RB4 Inox · atuação administrativa e
                      tecnológica · experiências com SAP, Tasy e Ronda ·
                      projetos sociais e trabalhos independentes.
                    </p>
                  </div>
                </article>
              </div>
            </section>

            <section className="skills" id="skills">
              <div className="section-heading">
                <div>
                  <p className="kicker">06 / MAPA TÉCNICO</p>
                  <h2>
                    Competência com
                    <br />
                    <em>contexto.</em>
                  </h2>
                </div>
                <p>
                  Sem porcentagens arbitrárias: cada tecnologia aparece pelo
                  nível de contato real.
                </p>
              </div>
              <SkillsAccordion groups={skills} />
            </section>

            <section className="education" id="education">
              <p className="kicker">07 / FORMAÇÃO</p>
              <div className="education-lead">
                <h2>
                  Aprender o sistema.
                  <br />
                  <em>Entender as pessoas.</em>
                </h2>
                <div>
                  <strong>Ciência da Computação — UNILESTE</strong>
                  <span>2023 — DEZEMBRO DE 2026</span>
                  <p>
                    Minha formação também passa por áreas administrativas e de
                    pessoas, o que me ajuda a compreender processos, usuários e
                    necessidades empresariais além da parte técnica.
                  </p>
                  <blockquote>
                    “Gosto de entender como sistemas funcionam — seja em
                    software, hardware ou mecânica.”
                  </blockquote>
                </div>
              </div>
              <div className="course-line">
                {courses.map((course) => (
                  <span key={course}>{course}</span>
                ))}
              </div>
            </section>

            <section className="contact" id="contact">
              <div className="contact-orbit" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <p className="kicker">08 / OPEN CHANNEL</p>
              <h2>
                Tem um problema que
                <br />
                pode virar <em>um sistema?</em>
              </h2>
              <p>
                Estou sempre aberto a conhecer projetos, oportunidades e
                desafios onde tecnologia possa simplificar processos e criar
                experiências melhores.
              </p>
              <ContactForm />
              <div className="contact-actions">
                <a href="mailto:contato.kaikyrogis@gmail.com">
                  <Mail /> E-MAIL
                </a>
                <a
                  href="https://linkedin.com/in/kaikyrogis"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BriefcaseBusiness /> LINKEDIN
                </a>
                <a
                  href="https://github.com/KaikyRogis"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Code2 /> GITHUB
                </a>
                <a
                  href="/Currículo - Kaiky Rogis Vieira De Jesus.pdf"
                  download="Currículo - Kaiky Rogis Vieira De Jesus.pdf"
                >
                  <Download /> CURRÍCULO
                </a>
              </div>
            </section>

            <footer>
              <div className="brand">
                <span>KR</span>
                <b>KAIKY.ROGIS</b>
              </div>
              <p>KAIKY.OS · PORTFOLIO VERSION 2.4</p>
              <p>
                <i /> ALL SYSTEMS OPERATIONAL
              </p>
            </footer>

            <div
              className={`utility-dock ${activeSection === "contact" ? "dock-suppressed" : ""}`}
            >
              <button
                onClick={() => setMotionEnabled(!motionEnabled)}
                aria-label={
                  motionEnabled ? "Desativar animações" : "Ativar animações"
                }
                aria-pressed={!motionEnabled}
              >
                {motionEnabled ? <Pause /> : <Play />}
              </button>
              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  if (!soundEnabled) setTimeout(beep, 0);
                }}
                aria-label={soundEnabled ? "Desativar sons" : "Ativar sons"}
                aria-pressed={soundEnabled}
              >
                {soundEnabled ? <Volume2 /> : <VolumeX />}
              </button>
              <button
                onClick={() => setTerminalOpen(true)}
                aria-label="Abrir terminal"
              >
                <Code2 />
              </button>
            </div>

            <AnimatePresence>
              {terminalOpen && (
                <Terminal
                  onClose={closeTerminal}
                  onNavigate={goTo}
                  onRetroToggle={() => setRetro((value) => !value)}
                  onBeep={beep}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {paletteOpen && (
                <CommandPalette
                  motionEnabled={motionEnabled}
                  onClose={closePalette}
                  onMotionToggle={() => setMotionEnabled((value) => !value)}
                  onNavigate={goTo}
                  onTerminalOpen={() => setTerminalOpen(true)}
                />
              )}
            </AnimatePresence>
          </main>
        </MotionConfig>
      </Localized>
    </LocaleProvider>
  );
}

export default function Home() {
  return <PortfolioPage locale="pt" />;
}
