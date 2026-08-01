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
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
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
import { ProjectCase } from "./components/projects/ProjectCase";
import { ProjectRail } from "./components/projects/ProjectRail";
import {
  capabilities,
  courses,
  labs,
  layers,
  projectCards,
  sintegraImages,
  skills,
} from "./data/portfolio";
import { projects } from "./data/projects";
import { Locale, LocaleProvider, Localized } from "./i18n";

const SystemScene = dynamic(() => import("./SystemScene"), { ssr: false });

type LegacyShot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};
const legacyShots = (slug: string): LegacyShot[] =>
  (projects.find((project) => project.slug === slug)?.screenshots ?? []).map(
    (shot) => ({ ...shot, alt: shot.alt.pt, caption: shot.caption.pt }),
  );
const ominiSafetyScreenshots = legacyShots("ominisafety");
const financeOsScreenshots = legacyShots("finance-os");
const omniChatScreenshots = legacyShots("omnichat");
function ProjectGallery({
  screenshots,
  note,
}: {
  screenshots: LegacyShot[];
  note: string;
}) {
  return (
    <div>
      {screenshots.map((shot) => (
        <span key={shot.src}>{shot.caption}</span>
      ))}
      <p>{note}</p>
    </div>
  );
}

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
  const [gallery, setGallery] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);
  const [retro, setRetro] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [pageProgress, setPageProgress] = useState(0);
  const projectPin = useRef<HTMLElement>(null);
  const projectRail = useRef<HTMLDivElement>(null);
  const projectIntro = useRef<HTMLDivElement>(null);

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
        if (visible) setActiveProject((visible.target as HTMLElement).id);
      },
      { rootMargin: "-34% 0px -52%", threshold: [0, 0.2, 0.5] },
    );
    projects.forEach((project) => {
      const node = document.getElementById(project.slug);
      if (node) observer.observe(node);
    });
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => {
      observer.disconnect();
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
            className={`section-progress ${activeProject ? "visible" : ""}`}
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
            <div className="legacy-projects" aria-hidden="true">
              <section className="projects-cinema" id="projects-legacy">
                <div className="projects-intro">
                  <p className="kicker">03 / SISTEMAS EM CAMPO</p>
                  <h2>
                    Projetos com
                    <br />
                    <em>problemas reais.</em>
                  </h2>
                  <p>
                    <span className="desktop-copy">
                      Role para atravessar uma sequência de produtos reais,
                      arquiteturas em evolução e decisões técnicas.
                    </span>
                    <span className="mobile-copy">
                      Deslize para explorar os projetos.
                    </span>
                  </p>
                </div>
                <div className="project-rail" ref={projectRail}>
                  {projectCards.map((project, index) => (
                    <article
                      className={`project-card project-${index + 1}`}
                      key={project.title}
                      style={
                        { "--accent": project.accent } as React.CSSProperties
                      }
                    >
                      <div className="project-card-top">
                        <span>{project.id}</span>
                        <b>● {project.status}</b>
                      </div>
                      <div className="project-system">
                        <div className="system-bar">
                          <i />
                          <i />
                          <i />
                          <span>{project.slug}.system</span>
                        </div>
                        <div className="system-content">
                          <aside />
                          <div>
                            <span />
                            <span />
                            <div>
                              <i />
                              <i />
                              <i />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="kicker">{project.type}</p>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <div className="tags">
                        {project.tech.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                      <button onClick={() => goTo(`#${project.slug}`)}>
                        ABRIR ESTUDO <ArrowDownRight size={15} />
                      </button>
                    </article>
                  ))}
                  <div className="rail-end">
                    <span>04 / 04</span>
                    <strong>
                      Agora, entre
                      <br />
                      nos sistemas.
                    </strong>
                    <button onClick={() => goTo("#sintegrapro")}>
                      CONTINUAR <ArrowDownRight />
                    </button>
                  </div>
                </div>
              </section>

              <section
                className="case-study sintegra-case"
                id="sintegrapro-legacy"
              >
                <div className="case-head">
                  <div>
                    <p className="kicker">CASE 01 / PRODUTO REAL</p>
                    <h2>
                      SintegraPro<span>.</span>
                    </h2>
                  </div>
                  <a
                    href="https://github.com/KaikyRogis/SintegraPro-Showcase"
                    target="_blank"
                    rel="noreferrer"
                  >
                    SHOWCASE PÚBLICO <ExternalLink size={15} />
                  </a>
                </div>
                <div className="case-metrics">
                  <div>
                    <span>AMBIENTE</span>
                    <b>WINDOWS / REDE LOCAL</b>
                  </div>
                  <div>
                    <span>ARQUITETURA</span>
                    <b>SERVIDOR + ESTAÇÕES</b>
                  </div>
                  <div>
                    <span>PERSISTÊNCIA</span>
                    <b>POSTGRESQL</b>
                  </div>
                  <div>
                    <span>STATUS</span>
                    <b>EVOLUÇÃO CONTÍNUA</b>
                  </div>
                </div>
                <div className="case-story">
                  <article>
                    <span>01 / PROBLEMA</span>
                    <p>
                      Processos fiscais complexos, sujeitos a erros e com
                      necessidade de rastreabilidade, padronização e validação.
                    </p>
                  </article>
                  <article>
                    <span>02 / SOLUÇÃO</span>
                    <p>
                      Sistema desktop com fluxo guiado de processamento,
                      correção, validação, histórico e administração do
                      ambiente.
                    </p>
                  </article>
                  <article>
                    <span>03 / MINHA ATUAÇÃO</span>
                    <p>
                      Levantamento de regras, arquitetura, implementação,
                      testes, interface, documentação e evolução do produto.
                    </p>
                  </article>
                  <article>
                    <span>04 / RESULTADO</span>
                    <p>
                      Um processo mais padronizado, rastreável e seguro,
                      preparado para operação real em rede.
                    </p>
                  </article>
                </div>
                <div className="product-gallery">
                  <div className="gallery-frame">
                    <div className="gallery-browser">
                      <span>● ● ●</span>
                      <b>
                        SINTEGRAPRO / {sintegraImages[gallery][1].toUpperCase()}
                      </b>
                    </div>
                    <Image
                      src={`/projects/sintegra/${sintegraImages[gallery][0]}`}
                      alt={`Captura real do SintegraPro: ${sintegraImages[gallery][1]}`}
                      width={1920}
                      height={1032}
                      loading="lazy"
                    />
                  </div>
                  <div className="gallery-nav">
                    <button
                      onClick={() =>
                        setGallery(
                          (gallery - 1 + sintegraImages.length) %
                            sintegraImages.length,
                        )
                      }
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft />
                    </button>
                    <span>
                      {String(gallery + 1).padStart(2, "0")} /{" "}
                      {String(sintegraImages.length).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() =>
                        setGallery((gallery + 1) % sintegraImages.length)
                      }
                      aria-label="Próxima imagem"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                  <p>
                    Capturas reais do showcase público, com informações
                    sensíveis previamente removidas.
                  </p>
                </div>
                <div className="architecture">
                  <div className="architecture-copy">
                    <p className="kicker">ARQUITETURA DESMONTÁVEL</p>
                    <h3>
                      Veja o sistema
                      <br />
                      por camadas.
                    </h3>
                    <p>
                      Selecione uma camada para isolar sua responsabilidade
                      dentro da arquitetura servidor/estação.
                    </p>
                  </div>
                  <div className="layer-stack">
                    {layers.map(([title], index) => (
                      <button
                        key={title}
                        className={activeLayer === index ? "active" : ""}
                        aria-pressed={activeLayer === index}
                        onClick={() => setActiveLayer(index)}
                        style={{
                          transform: `translateY(${index * 11}px) translateX(${index * 4}px)`,
                        }}
                      >
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <b>{title}</b>
                      </button>
                    ))}
                  </div>
                  <div className="layer-detail">
                    <span>
                      LAYER {String(activeLayer + 1).padStart(2, "0")}
                    </span>
                    <h4>{layers[activeLayer][0]}</h4>
                    <p>{layers[activeLayer][1]}</p>
                    <div className="layer-flow">
                      <i /> <i /> <i />
                    </div>
                  </div>
                </div>
              </section>

              <section
                className="case-study omini-case"
                id="ominisafety-legacy"
              >
                <div className="case-head">
                  <div>
                    <p className="kicker">CASE 02 / PRODUTO EM HOMOLOGAÇÃO</p>
                    <h2>
                      OminiSafety<span>.</span>
                    </h2>
                  </div>
                <b className="status-badge">● HOMOLOGAÇÃO INTERNA</b>
                </div>
                <div className="omini-transform">
                  <div className="chaos">
                    <span>Planilhas</span>
                    <span>Certificados</span>
                    <span>Vencimentos</span>
                    <span>Treinamentos</span>
                    <span>Auditorias</span>
                  </div>
                  <div className="transform-arrow">
                    <ArrowDownRight />
                  </div>
                  <div className="omini-dashboard">
                    <div className="dashboard-nav">
                      <b>
                        OMINI<span>SAFETY</span>
                      </b>
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="dashboard-grid">
                      <article>
                        <span>CONFORMIDADE</span>
                        <strong>DEMO</strong>
                      </article>
                      <article>
                        <span>TREINAMENTOS</span>
                        <strong>128</strong>
                      </article>
                      <article>
                        <span>CERTIFICADOS</span>
                        <strong>VALIDÁVEIS</strong>
                      </article>
                      <article className="wide">
                        <span>VISÃO MULTIEMPRESA</span>
                        <div className="bars">
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
                <div className="feature-grid">
                  {[
                    "Gestão multiempresa",
                    "Perfis de acesso",
                    "Cursos teóricos",
                    "Treinamentos práticos",
                    "Matrículas",
                    "Certificados",
                    "Vencimentos",
                    "Agendamentos",
                    "Auditoria",
                    "Dashboards",
                    "Assistente inteligente",
                    "Experiência mobile",
                  ].map((feature) => (
                    <span key={feature}>
                      <Check size={13} />
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="case-note">
                  <strong>O que este projeto demonstra</strong>
                  <p>
                    Visão de produto, arquitetura de sistemas, experiência do
                    usuário, modelagem de processos e capacidade de construir
                    uma solução empresarial além do código.
                  </p>
                </div>
                <ProjectGallery
                  screenshots={ominiSafetyScreenshots}
                  note="Capturas reais do produto em homologação local, com API, PostgreSQL e dados demonstrativos."
                />
              </section>

              <section className="dual-cases">
                <article id="finance-os-legacy">
                  <p className="kicker">CASE 03 / EM DESENVOLVIMENTO</p>
                  <h2>Finance OS</h2>
                  <p>
                    Ecossistema pessoal para organizar despesas, objetivos,
                    relatórios, wishlist e decisões financeiras.
                  </p>
                  <div className="finance-ui">
                    <div>
                      <span>SALDO PROJETADO</span>
                      <b>R$ •••••</b>
                    </div>
                    <div className="chart">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="finance-list">
                      <span>
                        Objetivos <b>DEMO</b>
                      </span>
                      <span>
                        Relatórios <b>12</b>
                      </span>
                      <span>
                        Wishlist <b>08</b>
                      </span>
                    </div>
                  </div>
                  <div className="tags">
                    <span>MONOREPO</span>
                    <span>WEB</span>
                    <span>API</span>
                    <span>MOBILE</span>
                    <span>IA</span>
                  </div>
                  <small>
                    Sistema de uso pessoal, não apresentado como produto
                    comercial. Recursos planejados não aparecem como concluídos.
                  </small>
                  <ProjectGallery
                    screenshots={financeOsScreenshots}
                    note="Capturas reais do sistema pessoal executado com frontend, API e PostgreSQL locais. Valores e registros são demonstrativos."
                  />
                </article>
                <article id="omnichat-legacy">
                  <p className="kicker">CASE 04 / PROJETO COLABORATIVO</p>
                  <h2>OmniChat</h2>
                  <p>
                    Plataforma multidepartamental de atendimento. Kaiky Rogis
                    desenvolve o backend; Hauan Felipe é responsável pelo
                    frontend apresentado neste case.
                  </p>
                  <div className="chat-ui">
                    <aside>
                      <i />
                      <i />
                      <i />
                      <i />
                    </aside>
                    <div>
                      <span className="bubble left">
                        Olá! Como posso ajudar?
                      </span>
                      <span className="bubble right">
                        Preciso falar com o financeiro.
                      </span>
                      <span className="bubble left">
                        Transferindo para a fila correta…
                      </span>
                    </div>
                  </div>
                  <div className="tags">
                    <span>QR CODE</span>
                    <span>FILAS</span>
                    <span>DEPARTAMENTOS</span>
                    <span>CHATBOT</span>
                    <span>META API</span>
                    <span>VOIP</span>
                  </div>
                  <a
                    className="project-source"
                    href="https://github.com/HauanFelipe/Chat/tree/frontend-hauan"
                    target="_blank"
                    rel="noreferrer"
                  >
                    CONHEÇA A IMPLEMENTAÇÃO DO FRONTEND — HAUAN FELIPE{" "}
                    <ExternalLink size={14} />
                  </a>
                  <ProjectGallery
                    screenshots={omniChatScreenshots}
                    note="Capturas reais do frontend colaborativo em desenvolvimento, usando conteúdo demonstrativo e sem métricas de adoção."
                  />
                </article>
              </section>
            </div>

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
              <div className="skill-grid">
                {Object.entries(skills).map(([group, items]) => (
                  <article key={group}>
                    <h3>{group}</h3>
                    {items.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </article>
                ))}
              </div>
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
              <p>KAIKY.OS · PORTFOLIO VERSION 2.3</p>
              <p>
                <i /> ALL SYSTEMS OPERATIONAL
              </p>
            </footer>

            <div className="utility-dock">
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
